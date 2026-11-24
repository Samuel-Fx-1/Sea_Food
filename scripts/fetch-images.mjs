#!/usr/bin/env node
/**
 * Fetch Pixabay photos for every missing image referenced in src/data.
 *
 * Setup:
 *   1. Add a local .env file in the repo root:
 *        PIXABAY_API_KEY=your_key_here
 *      (.env is gitignored and must never be committed.)
 *   2. npm install
 *   3. npm run fetch-images
 *
 * Optional:
 *   node scripts/fetch-images.mjs --list        # list missing files + search terms
 *   node scripts/fetch-images.mjs --limit 2     # smoke test with two images
 *   node scripts/fetch-images.mjs --refresh     # re-pick known poor matches (overwrites only those)
 *   node scripts/fetch-images.mjs --refresh --only /images/gallery/oyster-bar.jpg
 *
 * Photographer credits are written to public/images/CREDITS.md.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = process.env.SEAFOOD_DATA_DIR
  ? path.resolve(process.env.SEAFOOD_DATA_DIR)
  : path.join(ROOT, 'src', 'data');
const PUBLIC_DIR = path.join(ROOT, 'public');
const CREDITS_FILE = path.join(PUBLIC_DIR, 'images', 'CREDITS.md');
const API_URL = 'https://pixabay.com/api/';
const MAX_WIDTH = 1600;
const PER_PAGE = 20;
const REQUEST_DELAY_MS = 700;
const MAX_ATTEMPTS = 3;

const EVENT_TERMS = {
  'sunset-beach-dinner.jpg': 'beach dinner',
  'seaside-wedding.jpg': 'beach wedding',
  'family-weekend.jpg': 'beach dinner family',
  'live-music-night.jpg': 'beach dinner live music',
};

const IMPROVED_TERMS = {
  'beach-dinner.jpg': 'romantic beach dinner table sunset',
  'classic-blue-crab-boil.jpg': 'blue crab boil pot',
  'coastal-king-room.jpg': 'luxury hotel bedroom ocean view king bed',
  'family-loft.jpg': 'family hotel suite room interior',
  'morning-shoreline.jpg': 'morning beach shoreline waves',
  'ocean-suite.jpg': 'hotel suite ocean view bedroom',
  'oyster-bar.jpg': 'oyster bar seafood restaurant',
  'rocky-cove.jpg': 'rocky coastal cove sea',
  'sunset-terrace.jpg': 'hotel terrace sunset sea view',
  'atlantic-turbot.jpg': 'turbot flatfish seafood',
  'carabineiro-rice.jpg': 'shrimp rice paella dish',
  'clams-a-bulhao-pato.jpg': 'clams garlic seafood dish',
  'couples-bag-boil.jpg': 'seafood boil dinner for two',
  'crab-cakes.jpg': 'crab cakes plate',
  'crisp-cod-cheeks.jpg': 'cod fish fillet dish',
  'garlic-butter-crab-boil.jpg': 'crab boil garlic butter',
  'grilled-prawns-with-chili-butter.jpg': 'grilled prawns chili',
  'grilled-scallops.jpg': 'seared scallops dish',
  'lobster-and-prawn-platter.jpg': 'lobster prawn seafood platter',
  'monkfish-cataplana.jpg': 'monkfish seafood stew',
  'olive-oil-cake.jpg': 'olive oil cake dessert',
  'oyster-and-mussel-platter.jpg': 'oysters mussels seafood platter',
  'percebes.jpg': 'goose barnacles seafood',
  'royal-seafood-platter.jpg': 'luxury seafood platter lobster',
  'scarlet-prawn-tartare.jpg': 'prawn tartare dish',
  'seafood-chowder.jpg': 'seafood chowder soup',
  'snow-crab-legs-boil.jpg': 'snow crab legs seafood boil',
  'wild-sea-bass.jpg': 'sea bass fish dish',
};

// Files fetched on the first pass whose Pixabay result did not match the dish/place.
// `--refresh` re-fetches only these; it never touches photos that shipped with the repo.
const REFRESH_FILES = new Set(
  [
    'gallery/beach-dinner.jpg',
    'gallery/coastal-king-room.jpg',
    'gallery/family-loft.jpg',
    'gallery/morning-shoreline.jpg',
    'gallery/ocean-suite.jpg',
    'gallery/oyster-bar.jpg',
    'gallery/rocky-cove.jpg',
    'gallery/sunset-terrace.jpg',
    'seafood/atlantic-turbot.jpg',
    'seafood/carabineiro-rice.jpg',
    'seafood/classic-blue-crab-boil.jpg',
    'seafood/clams-a-bulhao-pato.jpg',
    'seafood/couples-bag-boil.jpg',
    'seafood/crab-cakes.jpg',
    'seafood/crisp-cod-cheeks.jpg',
    'seafood/garlic-butter-crab-boil.jpg',
    'seafood/grilled-prawns-with-chili-butter.jpg',
    'seafood/grilled-scallops.jpg',
    'seafood/lobster-and-prawn-platter.jpg',
    'seafood/monkfish-cataplana.jpg',
    'seafood/olive-oil-cake.jpg',
    'seafood/oyster-and-mussel-platter.jpg',
    'seafood/scarlet-prawn-tartare.jpg',
    'seafood/seafood-chowder.jpg',
    'seafood/snow-crab-legs-boil.jpg',
    'seafood/wild-sea-bass.jpg',
  ].map((relative) => `/images/${relative}`),
);

// A few Pixabay searches are too noisy to rank reliably; these IDs were verified
// from the search results and are used when refreshing the matching file.
const PINNED_PHOTOS = {
  'gallery/beach-dinner.jpg': { term: 'beach dinner table', id: 3226467 },
  'gallery/sunset-terrace.jpg': { term: 'sunset terrace restaurant sea', id: 962156 },
  'seafood/atlantic-turbot.jpg': { term: 'grilled turbot fish', id: 526197 },
  'seafood/classic-blue-crab-boil.jpg': { term: 'blue crab boiled crabs', id: 4089340 },
  'seafood/crab-cakes.jpg': { term: 'crab cake appetizer', id: 6814961 },
  'seafood/garlic-butter-crab-boil.jpg': { term: 'crab boil butter garlic shrimp', id: 3940279 },
  'seafood/grilled-prawns-with-chili-butter.jpg': { term: 'grilled prawns butter', id: 6492587 },
  'seafood/olive-oil-cake.jpg': { term: 'cake slice dessert', id: 8274419 },
  'seafood/scarlet-prawn-tartare.jpg': { term: 'shrimp ceviche', id: 3308292 },
  'seafood/wild-sea-bass.jpg': { term: 'sea bass fillet cooked dish', id: 716691 },
};

const STOP_WORDS = new Set(['and', 'with', 'the', 'for', 'from', 'a', 'of', 'by', 'in', 'on']);

function slugToWords(fileName) {
  return fileName.replace(/\.[^.]+$/, '').replace(/-/g, ' ').trim();
}

function searchTermFor(publicPath) {
  const relative = publicPath.replace(/^\/images\//, '');
  const group = relative.split('/')[0];
  const fileName = path.basename(relative);
  const withoutPrefix = relative.replace(/^images\//, '');

  if (PINNED_PHOTOS[withoutPrefix]) return PINNED_PHOTOS[withoutPrefix].term;
  if (IMPROVED_TERMS[fileName]) return IMPROVED_TERMS[fileName];

  if (fileName === 'seafood-platter.jpg') {
    return 'seafood platter prawns oysters lobster';
  }

  switch (group) {
    case 'seafood': {
      const stem = fileName.replace(/\.[^.]+$/, '');
      if (/crab/.test(stem) && /boil/.test(stem)) return 'crab boil seafood';
      if (/bag-boil|seafood-boil/.test(stem)) return 'seafood boil';
      if (/platter|feast/.test(stem)) return 'seafood platter';
      if (/prawn|shrimp/.test(stem)) return 'prawns seafood';
      if (/(cake|cremeux|mille|pear|squash|chocolate|nata)/.test(stem)) return slugToWords(stem);
      return `${slugToWords(stem)} seafood`;
    }
    case 'rooms':
      return 'luxury hotel room';
    case 'events':
      return EVENT_TERMS[fileName] ?? slugToWords(fileName);
    case 'gallery':
      return slugToWords(fileName);
    default:
      return slugToWords(fileName);
  }
}

async function readApiKey() {
  const envPath = path.join(ROOT, '.env');
  let contents;
  try {
    contents = await fs.readFile(envPath, 'utf8');
  } catch {
    throw new Error(`No .env file found at ${envPath}. Add a line: PIXABAY_API_KEY=your_key`);
  }

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator === -1) continue;
    if (line.slice(0, separator).trim() === 'PIXABAY_API_KEY') {
      const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
      if (value) return value;
    }
  }

  throw new Error('PIXABAY_API_KEY is missing or empty in .env');
}

async function findReferencedImages() {
  const entries = await fs.readdir(DATA_DIR, { withFileTypes: true });
  const referenced = new Set();

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.ts')) continue;
    const source = await fs.readFile(path.join(DATA_DIR, entry.name), 'utf8');
    const pattern = /(['"`])(\/images\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp))\1/g;
    for (const match of source.matchAll(pattern)) {
      referenced.add(match[2]);
    }
  }
  return referenced;
}

function toFetchItem(publicPath) {
  return {
    publicPath,
    target: path.join(PUBLIC_DIR, publicPath.replace(/^\//, '')),
    searchTerm: searchTermFor(publicPath),
  };
}

async function findMissingImages() {
  const referenced = await findReferencedImages();
  const missing = [];
  for (const publicPath of [...referenced].sort()) {
    if (!/\.jpe?g$/i.test(publicPath)) continue;
    const target = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''));
    try {
      await fs.access(target);
    } catch {
      missing.push(toFetchItem(publicPath));
    }
  }

  // The Seafood Platter replaced a wrong screenshot, so fetch it first.
  return missing.sort((a, b) => {
    const aFirst = path.basename(a.publicPath) === 'seafood-platter.jpg' ? 0 : 1;
    const bFirst = path.basename(b.publicPath) === 'seafood-platter.jpg' ? 0 : 1;
    return aFirst - bFirst;
  });
}

async function findRefreshImages() {
  const referenced = await findReferencedImages();
  return [...REFRESH_FILES]
    .filter((publicPath) => referenced.has(publicPath))
    .sort()
    .map(toFetchItem);
}

function tokenize(term) {
  return term
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function matchesToken(haystack, token) {
  // Pixabay captions use both singular and plural forms ("scallop" / "scallops").
  return (
    haystack.includes(token) ||
    (token.endsWith('s') && haystack.includes(token.slice(0, -1))) ||
    (!token.endsWith('s') && haystack.includes(`${token}s`))
  );
}

function pickBestPhoto(hits, searchTerm, usedIds) {
  const tokens = tokenize(searchTerm);
  const ranked = hits
    .filter(
      (hit) =>
        !usedIds.has(hit.id) &&
        hit.imageWidth > hit.imageHeight &&
        hit.imageWidth >= 1000 &&
        hit.largeImageURL,
    )
    .map((hit) => {
      const haystack = `${hit.tags ?? ''} ${hit.pageURL ?? ''}`.toLowerCase();
      const score = tokens.reduce(
        (total, token) => total + (matchesToken(haystack, token) ? 1 : 0),
        0,
      );
      const ratio = hit.imageWidth / hit.imageHeight;
      return { hit, score, rank: score * 10 - Math.abs(ratio - 1.6) + hit.imageWidth / 100000 };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.rank - a.rank);

  if (ranked.length === 0) return null;
  // Prefer a result matching at least two search words over a loose one-word match.
  const strong = ranked.find((candidate) => candidate.score >= 2);
  return (strong ?? ranked[0]).hit;
}

async function searchPixabay(apiKey, term) {
  const url = new URL(API_URL);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', term);
  url.searchParams.set('image_type', 'photo');
  url.searchParams.set('orientation', 'horizontal');
  url.searchParams.set('safesearch', 'true');
  url.searchParams.set('per_page', String(PER_PAGE));

  let lastError;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Sea_Food-image-fetcher/1.0' },
    });

    if (response.status === 429 || response.status >= 500) {
      lastError = new Error(`Pixabay search returned ${response.status}`);
      const retryAfter = Number(response.headers.get('retry-after') ?? '0');
      const delay = retryAfter > 0 ? retryAfter * 1000 : 4000 * (attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, Math.min(delay, 15000)));
      continue;
    }

    if (!response.ok) {
      throw new Error(`Pixabay search failed (${response.status} ${response.statusText})`);
    }

    const data = await response.json();
    if (data.error) throw new Error(`Pixabay search rejected the request: ${data.error}`);
    return Array.isArray(data.hits) ? data.hits : [];
  }

  throw lastError ?? new Error('Pixabay search failed after retries');
}

async function downloadAndResize(imageUrl) {
  const response = await fetch(imageUrl, {
    headers: { 'User-Agent': 'Sea_Food-image-fetcher/1.0' },
  });
  if (!response.ok || !response.body) {
    throw new Error(`download failed (${response.status})`);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`unexpected content-type ${contentType}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  return sharp(buffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
}

async function readExistingCredits() {
  try {
    const contents = await fs.readFile(CREDITS_FILE, 'utf8');
    const lines = new Map();
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^- `([^`]+)` — ([^—]+) — (\S+)$/);
      if (match) lines.set(match[1], { photographer: match[2].trim(), url: match[3] });
    }
    return lines;
  } catch {
    return new Map();
  }
}

async function writeCredits(entries) {
  const header = [
    '# Photo credits',
    '',
    'Photos downloaded by `scripts/fetch-images.mjs` are from [Pixabay](https://pixabay.com/)',
    'under the [Pixabay License](https://pixabay.com/service/license/). Each line lists the',
    'saved file, the photographer and the original Pixabay photo page.',
    '',
    'The pre-existing `.png` dish photos in this folder were sourced separately.',
    '',
  ];
  const lines = [...entries.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([file, info]) => `- \`${file}\` — ${info.photographer} — ${info.url}`);
  await fs.mkdir(path.dirname(CREDITS_FILE), { recursive: true });
  await fs.writeFile(CREDITS_FILE, `${[...header, ...lines].join('\n')}\n`, 'utf8');
}

function printTable(rows) {
  if (rows.length === 0) {
    console.log('No images fetched.');
    return;
  }
  const header = ['file', 'search term used', 'Pixabay URL'];
  const widths = header.map((label, column) =>
    Math.max(label.length, ...rows.map((row) => row[column].length)),
  );
  const render = (cells) => `| ${cells.map((cell, i) => cell.padEnd(widths[i])).join(' | ')} |`;
  console.log(render(header));
  console.log(`| ${widths.map((width) => '-'.repeat(width)).join(' | ')} |`);
  for (const row of rows) console.log(render(row));
}

async function main() {
  const listOnly = process.argv.includes('--list');
  const refresh = process.argv.includes('--refresh');
  const limitArg = process.argv.indexOf('--limit');
  const limit = limitArg === -1 ? Infinity : Number(process.argv[limitArg + 1]);
  const onlyArg = process.argv.indexOf('--only');
  const only =
    onlyArg === -1
      ? null
      : new Set(
          process.argv[onlyArg + 1]
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean),
        );

  const found = refresh ? await findRefreshImages() : await findMissingImages();
  const targets = only ? found.filter((item) => only.has(item.publicPath)) : found;
  console.log(
    `Found ${targets.length} ${refresh ? 'refresh' : 'missing'} image(s) referenced by src/data/*.ts.\n`,
  );
  if (targets.length === 0) return;

  if (listOnly) {
    printTable(
      targets.map((item) => [path.posix.normalize(item.publicPath), item.searchTerm, '(not fetched)']),
    );
    return;
  }

  const apiKey = await readApiKey();
  const credits = await readExistingCredits();
  const cache = new Map();
  const usedIds = new Set();

  if (refresh) {
    // Do not re-use any photo already credited, including the ones being replaced.
    for (const info of credits.values()) {
      const idMatch = info.url.match(/-(\d+)\/?$/);
      if (idMatch) usedIds.add(Number(idMatch[1]));
    }
  }

  const fetched = [];
  const skipped = [];

  for (const item of targets) {
    if (fetched.length >= limit) break;

    const relative = item.publicPath.replace(/^\//, '');
    const pinned = refresh ? PINNED_PHOTOS[relative.replace(/^images\//, '')] : undefined;
    let photo;
    let searchError;
    try {
      const hits = cache.has(item.searchTerm)
        ? cache.get(item.searchTerm)
        : await searchPixabay(apiKey, item.searchTerm);
      cache.set(item.searchTerm, hits);
      photo = pinned
        ? (hits.find((hit) => hit.id === pinned.id) ?? pickBestPhoto(hits, item.searchTerm, usedIds))
        : pickBestPhoto(hits, item.searchTerm, usedIds);
    } catch (error) {
      searchError = error instanceof Error ? error.message : String(error);
    }

    if (!photo) {
      const reason = searchError ?? 'no suitable landscape result';
      skipped.push({ file: item.publicPath, reason });
      console.warn(`SKIP ${item.publicPath}: ${reason}`);
      await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY_MS));
      continue;
    }

    try {
      const jpeg = await downloadAndResize(photo.largeImageURL);
      await fs.mkdir(path.dirname(item.target), { recursive: true });
      await fs.writeFile(item.target, jpeg, { flag: refresh ? 'w' : 'wx' });
      usedIds.add(photo.id);

      const pageUrl = photo.pageURL ?? 'https://pixabay.com/';
      credits.set(relative, { photographer: photo.user ?? 'Unknown', url: pageUrl });
      fetched.push([relative, item.searchTerm, pageUrl]);
      console.log(`OK   ${relative}`);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      skipped.push({ file: item.publicPath, reason });
      console.warn(`SKIP ${item.publicPath}: ${reason}`);
    }

    await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY_MS));
  }

  await writeCredits(credits);

  console.log(`\nFetched ${fetched.length} image(s), skipped ${skipped.length}.\n`);
  printTable(fetched);

  if (skipped.length > 0) {
    console.log('\nSkipped files:');
    for (const item of skipped) console.log(`- ${item.file} (${item.reason})`);
  }
}

main().catch((error) => {
  console.error(`fetch-images failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

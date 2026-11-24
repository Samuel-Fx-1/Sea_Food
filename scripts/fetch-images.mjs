#!/usr/bin/env node
/**
 * Fetch free-license Pexels photos for every missing image referenced in src/data.
 *
 * Setup:
 *   1. Create a local .env file in the repo root:
 *        PEXELS_API_KEY=your_key_here
 *      (.env is gitignored and must never be committed.)
 *   2. npm install
 *   3. node scripts/fetch-images.mjs
 *
 * Optional:
 *   node scripts/fetch-images.mjs --list   # just list missing files + search terms
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
const API_URL = 'https://api.pexels.com/v1/search';
const MAX_WIDTH = 1600;
const PER_PAGE = 15;
const REQUEST_DELAY_MS = 250;

const EVENT_TERMS = {
  'sunset-beach-dinner.jpg': 'beach dinner sunset',
  'seaside-wedding.jpg': 'beach wedding',
  'family-weekend.jpg': 'family beach resort',
  'live-music-night.jpg': 'live music night',
};

const GALLERY_TERMS = {
  'sunset-terrace.jpg': 'hotel terrace sunset sea',
  'coastal-king-room.jpg': 'coastal king hotel room sea view',
  'ocean-suite.jpg': 'ocean suite hotel room sea view',
  'family-loft.jpg': 'family loft hotel room sea view',
  'oyster-bar.jpg': 'oyster bar seafood',
  'wedding-by-sea.jpg': 'beach wedding by the sea',
};

const DISH_TERMS = {
  'whole-shabang-bag-boil.jpg': 'seafood boil feast',
  'couples-bag-boil.jpg': 'romantic seafood boil for two',
  'family-bag-boil.jpg': 'family seafood boil',
  'chefs-sea-feast.jpg': 'chef seafood feast platter',
  'royal-seafood-platter.jpg': 'royal seafood platter',
  'lobster-and-prawn-platter.jpg': 'lobster prawn seafood platter',
  'oyster-and-mussel-platter.jpg': 'oyster mussel seafood platter',
};

const STOP_WORDS = new Set(['and', 'with', 'the', 'for', 'a', 'of']);

function slugToWords(fileName) {
  return fileName.replace(/\.[^.]+$/, '').replace(/-/g, ' ').trim();
}

function dishSearchTerm(fileName) {
  if (DISH_TERMS[fileName]) return DISH_TERMS[fileName];

  let words = slugToWords(fileName)
    .replace(/\bwhole shabang\b/g, 'seafood boil')
    .replace(/\bbag boil\b/g, 'seafood boil')
    .replace(/\bcrab and corn\b/g, 'crab corn')
    .replace(/\bwith potatoes\b/g, 'potatoes')
    .replace(/\bclassic\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (words.includes('seafood boil seafood boil')) {
    words = words.replace('seafood boil seafood boil', 'seafood boil');
  }

  if (/\bseafood\b/.test(words)) return words;
  return `${words} seafood`.replace(/\s+/g, ' ').trim();
}

function searchTermFor(publicPath) {
  const relative = publicPath.replace(/^\/images\//, '');
  const group = relative.split('/')[0];
  const fileName = path.basename(relative);

  switch (group) {
    case 'seafood':
      return dishSearchTerm(fileName);
    case 'rooms':
      return 'luxury hotel room sea view';
    case 'events':
      return EVENT_TERMS[fileName] ?? slugToWords(fileName);
    case 'gallery':
      return GALLERY_TERMS[fileName] ?? `${slugToWords(fileName)} sea`;
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
    throw new Error(
      `No .env file found at ${envPath}. Create it with a line: PEXELS_API_KEY=your_key`,
    );
  }

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    if (key === 'PEXELS_API_KEY') {
      const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
      if (!value) break;
      return value;
    }
  }

  throw new Error('PEXELS_API_KEY is missing or empty in .env');
}

async function findMissingImages() {
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

  const missing = [];
  for (const publicPath of [...referenced].sort()) {
    if (!/\.jpe?g$/i.test(publicPath)) continue;
    const target = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''));
    try {
      await fs.access(target);
    } catch {
      missing.push({ publicPath, target, searchTerm: searchTermFor(publicPath) });
    }
  }

  return missing;
}

function tokenize(term) {
  return term
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function pickBestPhoto(photos, searchTerm) {
  const tokens = tokenize(searchTerm);

  const ranked = photos
    .filter((photo) => photo.width > photo.height && photo.width >= 1200)
    .map((photo) => {
      const haystack = `${photo.alt ?? ''} ${photo.url ?? ''}`.toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      const ratio = photo.width / photo.height;
      const ratioPenalty = Math.abs(ratio - 1.6);
      return { photo, score, rank: score * 10 - ratioPenalty + photo.width / 100000 };
    })
    .sort((a, b) => b.rank - a.rank);

  if (ranked.length === 0) return null;
  if (tokens.length === 0) return ranked[0].photo;
  return ranked.find((candidate) => candidate.score > 0)?.photo ?? null;
}

async function searchPexels(apiKey, term) {
  const url = new URL(API_URL);
  url.searchParams.set('query', term);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('size', 'large');
  url.searchParams.set('per_page', String(PER_PAGE));

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(url, {
      headers: { Authorization: apiKey, 'User-Agent': 'Sea_Food-image-fetcher/1.0' },
    });
    if (response.status === 429 && attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      continue;
    }
    if (!response.ok) {
      throw new Error(`Pexels search failed (${response.status} ${response.statusText})`);
    }
    const data = await response.json();
    return Array.isArray(data.photos) ? data.photos : [];
  }

  return [];
}

async function downloadAndResize(imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok || !response.body) {
    throw new Error(`download failed (${response.status})`);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`unexpected content-type ${contentType}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  return sharp(buffer).resize({ width: MAX_WIDTH, withoutEnlargement: true }).jpeg({
    quality: 84,
    mozjpeg: true,
  }).toBuffer();
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
    'All photos below are from [Pexels](https://www.pexels.com/) under the Pexels License.',
    'Each line lists the saved file, the photographer and the original photo page.',
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
  const header = ['file', 'search term used', 'Pexels URL'];
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
  const missing = await findMissingImages();

  console.log(`Found ${missing.length} missing image(s) referenced by src/data/*.ts.\n`);
  if (missing.length === 0) return;

  if (listOnly) {
    printTable(
      missing.map((item) => [
        path.posix.normalize(item.publicPath),
        item.searchTerm,
        '(not fetched)',
      ]),
    );
    return;
  }

  const apiKey = await readApiKey();
  const credits = await readExistingCredits();
  const fetched = [];
  const skipped = [];

  for (const item of missing) {
    let photo;
    let searchError;
    try {
      const photos = await searchPexels(apiKey, item.searchTerm);
      photo = pickBestPhoto(photos, item.searchTerm);
    } catch (error) {
      searchError = error instanceof Error ? error.message : String(error);
    }

    if (!photo) {
      skipped.push({ file: item.publicPath, reason: searchError ?? 'no suitable landscape result' });
      console.warn(`SKIP ${item.publicPath}: ${searchError ?? 'no suitable landscape result'}`);
      await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY_MS));
      continue;
    }

    const imageUrl =
      photo.src?.large2x ?? photo.src?.large ?? photo.src?.original ?? photo.src?.medium;
    if (!imageUrl) {
      skipped.push({ file: item.publicPath, reason: 'photo has no downloadable source' });
      continue;
    }

    try {
      const jpeg = await downloadAndResize(imageUrl);
      await fs.mkdir(path.dirname(item.target), { recursive: true });
      await fs.writeFile(item.target, jpeg, { flag: 'wx' });
      const relative = item.publicPath.replace(/^\//, '');
      credits.set(relative, {
        photographer: photo.photographer ?? 'Unknown',
        url: photo.url ?? 'https://www.pexels.com/',
      });
      fetched.push([
        relative,
        item.searchTerm,
        photo.url ?? 'https://www.pexels.com/',
      ]);
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

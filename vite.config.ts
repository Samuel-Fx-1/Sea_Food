import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Vercel supplies VERCEL_URL for every deployment and
// VERCEL_PROJECT_PRODUCTION_URL for the production alias. Set VITE_SITE_URL
// (e.g. a custom domain) to override either one.
const configuredSiteUrl =
  process.env.VITE_SITE_URL ??
  (process.env.VERCEL_ENV === 'production'
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : process.env.VERCEL_URL) ??
  'http://localhost:5173';

const siteUrl = configuredSiteUrl.startsWith('http')
  ? configuredSiteUrl.replace(/\/+$/, '')
  : `https://${configuredSiteUrl.replace(/\/+$/, '')}`;

const staticRoutes = [
  '/',
  '/menu',
  '/build-your-boil',
  '/rooms',
  '/reservations',
  '/gallery',
  '/experiences',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

const dishSource = readFileSync(new URL('./src/data/dishes.ts', import.meta.url), 'utf8');
const dishSlugs = Array.from(dishSource.matchAll(/^\s*slug: '([^']+)'/gm), (match) => match[1]);
const sitemapRoutes = [...staticRoutes, ...dishSlugs.map((slug) => `/menu/${slug}`)];

function siteMetadata(): Plugin {
  return {
    name: 'site-metadata',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl);
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          sitemapRoutes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n') +
          '\n</urlset>\n',
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), siteMetadata()],
  optimizeDeps: {
    entries: ['index.html'],
  },
});

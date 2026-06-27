// astro.config.mjs — config Astro 6 SSG para INFLAFI / renta-de-inflables.com
// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

/** @param {string} p */
const r = (p) => fileURLToPath(new URL(p, import.meta.url));

/** @type {import('@astrojs/sitemap').SitemapOptions} */
const sitemapOptions = {
  filter: (page) =>
    !page.includes('/404') &&
    !page.includes('/_') &&
    !page.includes('/admin'),
  serialize(item) {
    const url = item.url;
    if (url === 'https://renta-de-inflables.com/') {
      item.priority = 1.0;
      item.changefreq = /** @type {any} */ ('weekly');
    } else if (/\/(renta-de-inflables-|pantalla-inflable|mobiliario|decoracion|pintacaritas|palomitas|dulces|paquetes)/.test(url)) {
      item.priority = 0.9;
      item.changefreq = /** @type {any} */ ('monthly');
    } else {
      item.priority = 0.7;
      item.changefreq = /** @type {any} */ ('monthly');
    }
    return item;
  },
};

export default defineConfig({
  site: 'https://renta-de-inflables.com',
  output: 'static',
  trailingSlash: 'never',
  prefetch: { defaultStrategy: 'hover' },

  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-body',
      provider: fontProviders.fontsource(),
      weights: ['400', '500', '600', '700'],
      subsets: ['latin', 'latin-ext'],
      display: 'swap',
    },
    {
      name: 'Outfit',
      cssVariable: '--font-heading',
      provider: fontProviders.fontsource(),
      weights: ['600', '700', '800'],
      subsets: ['latin', 'latin-ext'],
      display: 'swap',
    },
  ],

  integrations: [sitemap(sitemapOptions), mdx()],

  vite: {
    cacheDir: 'node_modules/.vite',
    resolve: {
      alias: {
        '@config': r('./src/config'),
        '@lib': r('./src/lib'),
        '@layouts': r('./src/layouts'),
        '@components': r('./src/components'),
        '@content': r('./src/content'),
      },
    },
  },
});

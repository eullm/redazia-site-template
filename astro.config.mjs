// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import site from './src/lib/config.mjs';

const LOCALES = { it: 'it-IT', en: 'en-GB', de: 'de-DE', fr: 'fr-FR', es: 'es-ES' };
const languages = site.languages.length ? site.languages : ['it'];

export default defineConfig({
  site: site.url,
  base: site.base || undefined,
  integrations: [
    sitemap({
      i18n: { defaultLocale: languages[0], locales: Object.fromEntries(languages.map((l) => [l, LOCALES[l]])) },
    }),
  ],
});

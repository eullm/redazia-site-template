// @ts-check
// Everything that makes this site yours is in this file. Change it, commit,
// and the site rebuilds. The articles themselves arrive from Redazia in
// src/content/articles/<language>/.

/** @type {import('./src/lib/types').SiteConfig} */
export default {
  // The site's name, shown in the header, the browser tab and the feeds.
  name: 'Il Notiziario',
  // One line under the name. One per language; a missing one uses the first.
  tagline: {
    it: 'Notizie e approfondimenti, ogni giorno',
    en: 'News and analysis, every day',
    de: 'Nachrichten und Hintergründe, jeden Tag',
    fr: 'Actualités et analyses, chaque jour',
    es: 'Noticias y análisis, cada día',
  },
  // The public address, without a final slash. With `base` set (see below)
  // this is still the domain only: https://example.com, not .../news.
  url: 'https://example.com',
  // Serve the site under a folder of another site, e.g. '/news' for
  // example.com/news (see README, "Under a folder of your site"). '' for the root.
  base: '',

  // The languages, the first is the main one and lives at the root (/),
  // the others under /en/, /de/… Supported: it, en, de, fr, es.
  languages: ['it', 'en'],

  // One of: quotidiano, magazine, tech, blog, minimal, locale, finanza,
  // scienza, lifestyle, notte. The environment variable SITE_THEME, if set
  // (e.g. in Vercel), wins over this line: handy to try them all.
  theme: 'quotidiano',
  // Your own colour for links, sections and highlights; '' keeps the theme's.
  accent: '',

  // The sections. `name` is how Redazia files an article (the "section" of
  // its front matter, as written in the automatic newsroom's settings); the
  // rest is how each language shows it and the address of its page.
  sections: [
    { name: 'Attualità', it: { slug: 'attualita', label: 'Attualità' }, en: { slug: 'news', label: 'News' }, de: { slug: 'aktuelles', label: 'Aktuelles' }, fr: { slug: 'actualite', label: 'Actualité' }, es: { slug: 'actualidad', label: 'Actualidad' } },
    { name: 'Economia', it: { slug: 'economia', label: 'Economia' }, en: { slug: 'economy', label: 'Economy' }, de: { slug: 'wirtschaft', label: 'Wirtschaft' }, fr: { slug: 'economie', label: 'Économie' }, es: { slug: 'economia', label: 'Economía' } },
    { name: 'Tecnologia', it: { slug: 'tecnologia', label: 'Tecnologia' }, en: { slug: 'technology', label: 'Technology' }, de: { slug: 'technik', label: 'Technik' }, fr: { slug: 'technologie', label: 'Technologie' }, es: { slug: 'tecnologia', label: 'Tecnología' } },
    { name: 'Scienza', it: { slug: 'scienza', label: 'Scienza' }, en: { slug: 'science', label: 'Science' }, de: { slug: 'wissenschaft', label: 'Wissenschaft' }, fr: { slug: 'sciences', label: 'Sciences' }, es: { slug: 'ciencia', label: 'Ciencia' } },
    { name: 'Cultura', it: { slug: 'cultura', label: 'Cultura' }, en: { slug: 'culture', label: 'Culture' }, de: { slug: 'kultur', label: 'Kultur' }, fr: { slug: 'culture', label: 'Culture' }, es: { slug: 'cultura', label: 'Cultura' } },
  ],

  // How the articles are written, said to readers on every article:
  // 'automatic': published by the AI with no human review (Redazia's
  //   automatic newsroom). A banner on every page says so, as the EU AI Act
  //   (art. 50) asks for text published to inform the public.
  // 'assisted': written with AI, reviewed and published by people.
  ai: 'assisted',
  // A small "Redazia" link in the AI notes. Free to switch off.
  credit: true,

  // Who publishes the site, shown in the footer and the "About" page.
  publisher: {
    name: 'Example Media Srl',
    address: 'Via Roma 1, 00100 Roma',
    vat: 'P.IVA IT00000000000',
    url: 'https://example.com',
  },
  // Where readers report a mistake.
  contact: 'redazione@example.com',

  // Sample articles shown only while the site has none of its own, so the
  // design can be seen before the first publication. They disappear by
  // themselves with the first real article of each language.
  demo: true,
  // The time zone of the dates shown on the site.
  timezone: 'Europe/Rome',

  // The words in the addresses, per language. Leave out to use the defaults
  // (it: /articoli/ /rubriche/ /chi-siamo, en: /articles/ /sections/ /about…).
  // paths: { it: { article: 'notizie', section: 'rubriche', about: 'redazione' } },
};

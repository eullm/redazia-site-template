// Builds the live preview of every theme into previews/: each theme in its
// own folder (/quotidiano/, /magazine/…), in all five languages, with the
// sample articles, plus a page that lists them. It is how
// https://demo.redazia.com is made; a site made from this template does not
// need it.
//
//   node scripts/previews.mjs              (PREVIEW_URL changes the address)
//
// On Vercel: Build Command `node scripts/previews.mjs`, Output Directory
// `previews`.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { THEME_NAMES } from '../src/lib/theme-names.mjs';

const out = 'previews';
const url = (process.env.PREVIEW_URL || 'https://demo.redazia.com').replace(/\/+$/, '');
const languages = ['it', 'en', 'de', 'fr', 'es'];

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const theme of Object.keys(THEME_NAMES)) {
  console.log(`\n=== ${theme}`);
  execFileSync(process.execPath, ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', `${out}/${theme}`], {
    stdio: 'inherit',
    env: { ...process.env, SITE_THEME: theme, SITE_BASE: `/${theme}`, SITE_LANGUAGES: languages.join(','), SITE_URL: url },
  });
}
const words = {
  it: { title: 'Modello di sito Redazia: i dieci stili', lead: 'Ogni stile con gli articoli di esempio, in cinque lingue. Gratuito, licenza MIT.', get: 'Prendi il modello su GitHub', other: 'Anche in' },
  en: { title: 'Redazia site template: the ten styles', lead: 'Every style with sample articles, in five languages. Free, MIT licence.', get: 'Get the template on GitHub', other: 'Also in' },
  de: { title: 'Redazia-Websitevorlage: die zehn Stile', lead: 'Jeder Stil mit Beispielartikeln, in fünf Sprachen. Kostenlos, MIT-Lizenz.', get: 'Vorlage auf GitHub holen', other: 'Auch auf' },
  fr: { title: 'Modèle de site Redazia : les dix styles', lead: 'Chaque style avec des articles d’exemple, en cinq langues. Gratuit, licence MIT.', get: 'Obtenir le modèle sur GitHub', other: 'Aussi en' },
  es: { title: 'Plantilla de sitio Redazia: los diez estilos', lead: 'Cada estilo con artículos de ejemplo, en cinco idiomas. Gratis, licencia MIT.', get: 'Consigue la plantilla en GitHub', other: 'También en' },
};
const names = { it: 'Italiano', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español' };
const home = (key, l) => `/${key}/${l === 'it' ? '' : `${l}/`}`;

// The page for one language: its words, its screenshots, its links.
function page(lang) {
  const w = words[lang];
  const cards = Object.entries(THEME_NAMES).map(([key, t]) => `
    <article>
      <a href="${home(key, lang)}"><img src="/shots/${lang}/${key}.jpg" alt="${t.label}" loading="lazy" width="647" height="400"></a>
      <h2><a href="${home(key, lang)}">${t.label}</a></h2>
      <p>${t.description[lang]}</p>
      <p class="langs">${w.other} ${languages.filter((l) => l !== lang).map((l) => `<a href="${home(key, l)}" hreflang="${l}">${names[l]}</a>`).join(' · ')}</p>
    </article>`).join('');
  const switcher = languages.map((l) => l === lang ? `<b>${names[l]}</b>` : `<a href="/${l}/" hreflang="${l}">${names[l]}</a>`).join(' ');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${w.title}</title>
<link rel="icon" href="/quotidiano/favicon.svg">
${languages.map((l) => `<link rel="alternate" hreflang="${l}" href="${url}/${l}/">`).join('\n')}
<style>
  :root { color-scheme: light dark; --paper: #fbfaf7; --ink: #1d2730; --ink-2: #4a5661; --line: #e2ded4; --accent: #1f6f63; }
  @media (prefers-color-scheme: dark) { :root { --paper: #12181d; --ink: #e8ecee; --ink-2: #a9b4bc; --line: #2c3740; --accent: #5fb3a3; } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--ink); font: 17px/1.55 system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
  main { max-width: 72rem; margin: 0 auto; padding: 24px 16px 64px; }
  nav { display: flex; flex-wrap: wrap; gap: 6px 14px; justify-content: flex-end; font-size: 0.95rem; margin-bottom: 24px; }
  h1 { font-family: Georgia, serif; font-size: clamp(1.8rem, 4vw, 2.6rem); margin: 0 0 8px; }
  .lead { color: var(--ink-2); margin: 0 0 12px; }
  a { color: var(--accent); }
  .grid { display: grid; gap: 28px; grid-template-columns: repeat(auto-fill, minmax(min(18rem, 100%), 1fr)); margin-top: 32px; }
  article img { width: 100%; height: auto; border-radius: 10px; border: 1px solid var(--line); display: block; }
  article h2 { font-size: 1.2rem; margin: 12px 0 4px; }
  article h2 a { color: inherit; text-decoration: none; }
  article p { margin: 0 0 6px; color: var(--ink-2); }
  .langs { font-size: 0.92rem; }
</style>
</head>
<body>
<main>
  <nav aria-label="Language">${switcher}</nav>
  <h1>${w.title}</h1>
  <p class="lead">${w.lead}</p>
  <p><a href="https://github.com/eullm/redazia-site-template">${w.get}</a></p>
  <div class="grid">${cards}
  </div>
</main>
</body>
</html>
`;
}

// The address without a language: the browser's language if we have it,
// English otherwise.
function chooser() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${words.en.title}</title>
<script>
  var l = (navigator.language || 'en').slice(0, 2).toLowerCase();
  location.replace('/' + (${JSON.stringify(languages)}.indexOf(l) >= 0 ? l : 'en') + '/');
</script>
</head>
<body>
<p>${languages.map((l) => `<a href="/${l}/">${names[l]}</a>`).join(' · ')}</p>
</body>
</html>
`;
}

cpSync('docs/themes', `${out}/shots`, { recursive: true });
// One page per language at /<lang>/, and / sends the visitor to theirs.
for (const lang of languages) {
  mkdirSync(`${out}/${lang}`, { recursive: true });
  writeFileSync(`${out}/${lang}/index.html`, page(lang));
}
writeFileSync(`${out}/index.html`, chooser());
writeFileSync(`${out}/robots.txt`, 'User-agent: *\nDisallow: /\n');
console.log(`\nPreviews in ${out}/`);

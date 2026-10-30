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
cpSync('docs/themes', `${out}/shots`, { recursive: true });
writeFileSync(`${out}/index.html`, page());
writeFileSync(`${out}/robots.txt`, 'User-agent: *\nDisallow: /\n');
console.log(`\nPreviews in ${out}/`);

function page() {
  const words = {
    en: { title: 'Redazia site template: the ten styles', lead: 'Every style with sample articles, in five languages. Free, MIT licence.', get: 'Get the template on GitHub' },
    it: { title: 'Modello di sito Redazia: i dieci stili', lead: 'Ogni stile con gli articoli di esempio, in cinque lingue. Gratuito, licenza MIT.', get: 'Prendi il modello su GitHub' },
    de: { title: 'Redazia-Websitevorlage: die zehn Stile', lead: 'Jeder Stil mit Beispielartikeln, in fünf Sprachen. Kostenlos, MIT-Lizenz.', get: 'Vorlage auf GitHub holen' },
    fr: { title: 'Modèle de site Redazia : les dix styles', lead: 'Chaque style avec des articles d’exemple, en cinq langues. Gratuit, licence MIT.', get: 'Obtenir le modèle sur GitHub' },
    es: { title: 'Plantilla de sitio Redazia: los diez estilos', lead: 'Cada estilo con artículos de ejemplo, en cinco idiomas. Gratis, licencia MIT.', get: 'Consigue la plantilla en GitHub' },
  };
  const names = { it: 'Italiano', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español' };
  const cards = Object.entries(THEME_NAMES).map(([key, t]) => `
    <article>
      <a href="/${key}/"><img src="/shots/${key}.jpg" alt="${t.label}" loading="lazy" width="640" height="400"></a>
      <h2>${t.label}</h2>
      <p data-desc='${JSON.stringify(t.description).replace(/'/g, '&#39;')}'>${t.description.en}</p>
      <p class="langs">${languages.map((l) => `<a href="/${key}/${l === 'it' ? '' : `${l}/`}">${names[l]}</a>`).join(' · ')}</p>
    </article>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${words.en.title}</title>
<link rel="icon" href="/quotidiano/favicon.svg">
<style>
  :root { color-scheme: light dark; --paper: #fbfaf7; --ink: #1d2730; --ink-2: #4a5661; --line: #e2ded4; --accent: #1f6f63; }
  @media (prefers-color-scheme: dark) { :root { --paper: #12181d; --ink: #e8ecee; --ink-2: #a9b4bc; --line: #2c3740; --accent: #5fb3a3; } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--ink); font: 17px/1.55 system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
  main { max-width: 72rem; margin: 0 auto; padding: 48px 16px 64px; }
  h1 { font-family: Georgia, serif; font-size: clamp(1.8rem, 4vw, 2.6rem); margin: 0 0 8px; }
  .lead { color: var(--ink-2); margin: 0 0 12px; }
  a { color: var(--accent); }
  .grid { display: grid; gap: 28px; grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr)); margin-top: 32px; }
  article img { width: 100%; height: auto; border-radius: 10px; border: 1px solid var(--line); display: block; }
  article h2 { font-size: 1.2rem; margin: 12px 0 4px; }
  article p { margin: 0 0 6px; color: var(--ink-2); }
  .langs { font-size: 0.92rem; }
</style>
</head>
<body>
<main>
  <h1 data-w="title">${words.en.title}</h1>
  <p class="lead" data-w="lead">${words.en.lead}</p>
  <p><a data-w="get" href="https://github.com/eullm/redazia-site-template">${words.en.get}</a></p>
  <div class="grid">${cards}
  </div>
</main>
<script>
  var words = ${JSON.stringify(words)};
  var lang = (navigator.language || 'en').slice(0, 2);
  if (words[lang]) {
    document.documentElement.lang = lang;
    document.title = words[lang].title;
    document.querySelectorAll('[data-w]').forEach(function (e) { e.textContent = words[lang][e.dataset.w]; });
    document.querySelectorAll('[data-desc]').forEach(function (e) { e.textContent = JSON.parse(e.dataset.desc)[lang]; });
  }
</script>
</body>
</html>
`;
}

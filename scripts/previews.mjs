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
  it: { title: 'Modello di sito Redazia: i dieci stili', lead: 'Ogni stile con gli articoli di esempio, in cinque lingue. Gratuito, licenza MIT.', get: 'Usa questo modello', how: 'Come metterlo online', code: 'Codice su GitHub', site: 'Cos’è Redazia', other: 'Anche in' },
  en: { title: 'Redazia site template: the ten styles', lead: 'Every style with sample articles, in five languages. Free, MIT licence.', get: 'Use this template', how: 'How to put it online', code: 'Source on GitHub', site: 'What is Redazia', other: 'Also in' },
  de: { title: 'Redazia-Websitevorlage: die zehn Stile', lead: 'Jeder Stil mit Beispielartikeln, in fünf Sprachen. Kostenlos, MIT-Lizenz.', get: 'Diese Vorlage verwenden', how: 'So geht sie online', code: 'Quellcode auf GitHub', site: 'Was ist Redazia', other: 'Auch auf' },
  fr: { title: 'Modèle de site Redazia : les dix styles', lead: 'Chaque style avec des articles d’exemple, en cinq langues. Gratuit, licence MIT.', get: 'Utiliser ce modèle', how: 'Le mettre en ligne', code: 'Code source sur GitHub', site: 'Qu’est-ce que Redazia', other: 'Aussi en' },
  es: { title: 'Plantilla de sitio Redazia: los diez estilos', lead: 'Cada estilo con artículos de ejemplo, en cinco idiomas. Gratis, licencia MIT.', get: 'Usar esta plantilla', how: 'Cómo ponerla en línea', code: 'Código en GitHub', site: 'Qué es Redazia', other: 'También en' },
};
const names = { it: 'Italiano', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español' };
// redazia.com in the same language: English at the root, the others under /<lang>/.
const redazia = (l) => `https://redazia.com/${l === 'en' ? '' : `${l}/`}`;
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
<link rel="icon" href="/brand/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png">
${languages.map((l) => `<link rel="alternate" hreflang="${l}" href="${url}/${l}/">`).join('\n')}
<style>
  :root { color-scheme: light dark; --paper: #fbfaf7; --ink: #1d2730; --ink-2: #4a5661; --line: #e2ded4; --accent: #1f6f63; }
  @media (prefers-color-scheme: dark) { :root { --paper: #12181d; --ink: #e8ecee; --ink-2: #a9b4bc; --line: #2c3740; --accent: #5fb3a3; } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--ink); font: 17px/1.55 system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; }
  main { max-width: 72rem; margin: 0 auto; padding: 24px 16px 64px; }
  header { display: flex; flex-wrap: wrap; gap: 8px 24px; justify-content: space-between; align-items: center; font-size: 0.95rem; margin-bottom: 24px; }
  nav { display: flex; flex-wrap: wrap; gap: 6px 14px; }
  .brand { display: inline-flex; line-height: 0; }
  .brand img { height: 34px; width: auto; }
  .cta { display: flex; flex-wrap: wrap; gap: 12px 16px; align-items: center; margin: 20px 0 0; }
  .btn { display: inline-block; padding: 10px 18px; border-radius: 8px; background: var(--accent); color: var(--paper); font-weight: 600; text-decoration: none; }
  .btn.ghost { background: transparent; color: var(--accent); border: 1px solid var(--accent); }
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
  <header><a class="brand" href="${redazia(lang)}" title="${w.site}"><picture>
    <source srcset="/brand/redazia-logo-dark-64.webp 1x, /brand/redazia-logo-dark-128.webp 2x" media="(prefers-color-scheme: dark)">
    <img src="/brand/redazia-logo-64.webp" srcset="/brand/redazia-logo-64.webp 1x, /brand/redazia-logo-128.webp 2x" alt="Redazia" width="198" height="64">
  </picture></a><nav aria-label="Language">${switcher}</nav></header>
  <h1>${w.title}</h1>
  <p class="lead">${w.lead}</p>
  <p class="cta">
    <a class="btn" href="https://github.com/eullm/redazia-site-template/generate">${w.get}</a>
    <a class="btn ghost" href="${redazia(lang)}guide#template">${w.how}</a>
    <a href="https://github.com/eullm/redazia-site-template">${w.code}</a>
  </p>
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
cpSync('docs/brand', `${out}/brand`, { recursive: true });
cpSync('docs/brand/favicon.ico', `${out}/favicon.ico`);
// One page per language at /<lang>/, and / sends the visitor to theirs.
for (const lang of languages) {
  mkdirSync(`${out}/${lang}`, { recursive: true });
  writeFileSync(`${out}/${lang}/index.html`, page(lang));
}
writeFileSync(`${out}/index.html`, chooser());
writeFileSync(`${out}/robots.txt`, 'User-agent: *\nDisallow: /\n');
console.log(`\nPreviews in ${out}/`);

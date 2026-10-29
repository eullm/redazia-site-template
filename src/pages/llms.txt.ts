import { LANGS, SITE, absolute, articleUrl, articles, href, paths, t, tagline } from '../lib/site';

// A plain list of the site's articles for AI search engines (llmstxt.org).
// Redazia also adds a line here when it publishes, if the file is kept in
// the repository; generated, it is always complete.
export async function GET() {
  const lines = [`# ${SITE.name}`, '', `> ${tagline(LANGS[0]) || SITE.name}`, ''];
  for (const lang of LANGS) {
    const { list, demo } = await articles(lang);
    lines.push(`## ${t(lang).latest} (${lang})`, '');
    if (!demo) for (const a of list.slice(0, 200)) {
      lines.push(`- [${a.data.title}](${absolute(articleUrl(a))})${a.data.description ? `: ${a.data.description}` : ''}`);
    }
    lines.push(`- [${t(lang).about}](${absolute(href(lang, paths(lang).about))})`, '');
  }
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}

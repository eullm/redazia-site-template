import rss from '@astrojs/rss';
import { LOCALES } from './i18n';
import { SITE, absolute, articleUrl, articles, href, tagline, type Lang } from './site';

export async function feed(lang: Lang) {
  const { list, demo } = await articles(lang);
  return rss({
    title: SITE.name,
    description: tagline(lang) || SITE.name,
    site: absolute(href(lang)),
    items: (demo ? [] : list.slice(0, 50)).map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.date,
      link: absolute(articleUrl(a)),
      categories: a.data.section ? [a.data.section] : [],
    })),
    customData: `<language>${LOCALES[lang].toLowerCase()}</language>`,
  });
}

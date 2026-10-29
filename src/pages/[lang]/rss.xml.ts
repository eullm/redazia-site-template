import type { APIContext } from 'astro';
import { feed } from '../../lib/feeds';
import { LANGS, MAIN, type Lang } from '../../lib/site';

// The feed of each language other than the main one: /en/rss.xml…
export function getStaticPaths() {
  return LANGS.filter((l) => l !== MAIN).map((lang) => ({ params: { lang } }));
}

export const GET = ({ params }: APIContext) => feed(params.lang as Lang);

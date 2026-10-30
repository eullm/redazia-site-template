import { getCollection, type CollectionEntry } from 'astro:content';
import config from './config.mjs';
import { DEFAULT_PATHS, LOCALES, STRINGS } from './i18n';
import { themeNamed } from './themes';
import type { Lang, Paths, SectionConfig, SiteConfig } from './types';

export type { Lang } from './types';
export type Article = CollectionEntry<'articles'>;
export type Section = SectionConfig;

export const SITE = config as SiteConfig;
export const LANGS: Lang[] = SITE.languages.length ? SITE.languages : ['it'];
export const MAIN: Lang = LANGS[0];
export const THEME = themeNamed(SITE.theme);
export const BASE = (SITE.base || '').replace(/\/+$/, '');

export function t(lang: Lang) {
  return STRINGS[lang] || STRINGS.en;
}

export function tagline(lang: Lang): string {
  return SITE.tagline[lang] || SITE.tagline[MAIN] || '';
}

export function paths(lang: Lang): Paths {
  return { ...DEFAULT_PATHS[lang], ...(SITE.paths?.[lang] || {}) };
}

/** An address inside the site, with the base folder and the language. */
export function href(lang: Lang, ...parts: string[]): string {
  const prefix = lang === MAIN ? '' : `/${lang}`;
  const rest = parts.filter(Boolean).join('/');
  return `${BASE}${prefix}/${rest}`;
}

export function absolute(path: string): string {
  return new URL(path, SITE.url).href;
}

/** A picture of an article: "/images/x.webp" lives under the base folder. */
export function asset(path: string | undefined): string | undefined {
  if (!path || !path.startsWith('/') || path.startsWith('//') || (BASE && path.startsWith(`${BASE}/`))) return path;
  return `${BASE}${path}`;
}

export function slugOf(a: Article): string {
  return a.data.slug || a.id.split('/').pop()!.replace(/\.mdx?$/, '');
}

export function langOf(a: Article): Lang {
  return a.id.split('/')[0] as Lang;
}

export function articleUrl(a: Article): string {
  const lang = langOf(a);
  return href(lang, paths(lang).article, slugOf(a));
}

export function sectionLabel(s: Section, lang: Lang): string {
  return s[lang]?.label || s.name;
}

export function sectionSlug(s: Section, lang: Lang): string {
  return s[lang]?.slug || slugify(s.name);
}

export function sectionUrl(s: Section, lang: Lang): string {
  return href(lang, paths(lang).section, sectionSlug(s, lang));
}

export function sectionOf(a: Article): Section | undefined {
  const v = (a.data.section || '').trim().toLowerCase();
  if (!v) return undefined;
  return SITE.sections.find((s) =>
    [s.name, ...LANGS.flatMap((l) => [s[l]?.slug, s[l]?.label])].some((x) => x && x.toLowerCase() === v));
}

/** The articles of a language, newest first. Without any, the samples
 * (when `demo` is on), so the design shows before the first publication. */
export async function articles(lang: Lang): Promise<{ list: Article[]; demo: boolean }> {
  const all = await getCollection('articles', (a) => langOf(a) === lang && !a.data.draft);
  if (all.length || SITE.demo === false) return { list: sorted(all), demo: false };
  const samples = await getCollection('demo', (a) => langOf(a as unknown as Article) === lang);
  return { list: sorted(samples as unknown as Article[]), demo: samples.length > 0 };
}

function sorted(list: Article[]): Article[] {
  return [...list].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(d: Date, lang: Lang, time = true): string {
  return new Intl.DateTimeFormat(LOCALES[lang], {
    day: 'numeric', month: 'long', year: 'numeric', ...(time ? { hour: '2-digit', minute: '2-digit' } : {}),
    timeZone: SITE.timezone || 'Europe/Rome',
  }).format(d);
}

export function slugify(s: string): string {
  return s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

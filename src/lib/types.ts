export type Lang = 'it' | 'en' | 'de' | 'fr' | 'es';

export interface SectionConfig {
  /** How Redazia files the article: the `section` of its front matter. */
  name: string;
  it?: { slug: string; label: string };
  en?: { slug: string; label: string };
  de?: { slug: string; label: string };
  fr?: { slug: string; label: string };
  es?: { slug: string; label: string };
}

export interface Paths {
  article: string;
  section: string;
  about: string;
}

export interface SiteConfig {
  name: string;
  tagline: Partial<Record<Lang, string>>;
  url: string;
  base?: string;
  languages: Lang[];
  theme: string;
  accent?: string;
  sections: SectionConfig[];
  ai: 'automatic' | 'assisted';
  credit?: boolean;
  publisher: { name: string; address?: string; vat?: string; url?: string };
  contact: string;
  demo?: boolean;
  timezone?: string;
  paths?: Partial<Record<Lang, Partial<Paths>>>;
}

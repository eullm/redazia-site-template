import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The articles arrive from Redazia as Markdown, one file per article, in
// src/content/articles/<language>/ (e.g. src/content/articles/it/). The
// keys below are those Redazia writes; articles written by hand can use
// them too.
const article = z.object({
  title: z.string(),
  description: z.string().optional(),
  slug: z.string().optional(),
  date: z.coerce.date(),
  lang: z.string().optional(),
  section: z.string().optional(),
  keywords: z.union([z.array(z.string()), z.string().transform((s) => s.split(',').map((x) => x.trim()).filter(Boolean))]).optional(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
  author: z.string().optional(),
  draft: z.boolean().optional(),
});

// The id keeps the language folder ("it/my-article"), even when the article
// has its own slug.
const id = ({ entry }: { entry: string }) => entry.replace(/\.md$/, '');

export const collections = {
  articles: defineCollection({ loader: glob({ pattern: '*/*.md', base: './src/content/articles', generateId: id }), schema: article }),
  demo: defineCollection({ loader: glob({ pattern: '*/*.md', base: './src/content/demo', generateId: id }), schema: article }),
};

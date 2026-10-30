// site.config.mjs, with a few values that environment variables can change
// without touching the file: the theme (SITE_THEME), the languages
// (SITE_LANGUAGES=it,en,de), the folder (SITE_BASE=/news) and the address
// (SITE_URL). Handy on Vercel, and how the preview of every theme is built
// (scripts/previews.mjs).
import config from '../../site.config.mjs';

const env = typeof process !== 'undefined' ? process.env : {};
const list = (v) => v.split(',').map((x) => x.trim()).filter(Boolean);

export default {
  ...config,
  ...(env.SITE_THEME ? { theme: env.SITE_THEME } : {}),
  ...(env.SITE_LANGUAGES ? { languages: list(env.SITE_LANGUAGES) } : {}),
  ...(env.SITE_BASE !== undefined ? { base: env.SITE_BASE } : {}),
  ...(env.SITE_URL ? { url: env.SITE_URL } : {}),
};

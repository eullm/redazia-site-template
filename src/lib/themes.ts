// The ten looks. Each is a home page layout, a header and a set of colours
// and fonts. Only system fonts: nothing is loaded from other servers, so no
// reader's address goes to a font provider and the site needs no consent.

export type Home = 'front' | 'grid' | 'list' | 'stream';
export type Header = 'masthead' | 'bar';

export interface Theme {
  label: string;
  description: string;
  home: Home;
  header: Header;
  /** In the grid home, the first article: image beside the title or title over the image. */
  hero?: 'split' | 'overlay';
  dark?: boolean;
  colors: {
    bg: string; paper: string; ink: string; ink2: string; muted: string; line: string;
    accent: string; ai: string; aiBg: string; onAccent: string;
  };
  heading: string;
  body: string;
  articleBody: string;
  radius: string;
  uppercaseNav?: boolean;
}

const SERIF = "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, Georgia, serif";
const DIDONE = "Didot, 'Bodoni MT', 'Noto Serif Display', 'Times New Roman', serif";
const SANS = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const GROTESK = "'Avenir Next', Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif";
const MONO = "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace";
const HUMANIST = "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif";

const light = {
  bg: '#ffffff', paper: '#f5f5f2', ink: '#14171a', ink2: '#3d434b', muted: '#6b717a', line: '#e2e4e7',
  ai: '#1c47c9', aiBg: '#eef2fc', onAccent: '#ffffff',
};

export const THEMES: Record<string, Theme> = {
  quotidiano: {
    label: 'Quotidiano', description: 'Testata classica: apertura grande, colonne, rubriche in home.',
    home: 'front', header: 'masthead', heading: SERIF, body: SANS, articleBody: SERIF, radius: '2px',
    colors: { ...light, accent: '#c8102e' },
  },
  magazine: {
    label: 'Magazine', description: 'Copertina a tutta pagina e griglia di immagini grandi.',
    home: 'grid', header: 'bar', hero: 'overlay', heading: GROTESK, body: SANS, articleBody: SERIF, radius: '10px', uppercaseNav: true,
    colors: { ...light, paper: '#f7f3f8', accent: '#8a2be2' },
  },
  tech: {
    label: 'Tech', description: 'Scuro, griglia, dettagli in monospace: per tecnologia e startup.',
    home: 'grid', header: 'bar', dark: true, heading: SANS, body: SANS, articleBody: SANS, radius: '8px',
    colors: {
      bg: '#0d1117', paper: '#161b22', ink: '#e6edf3', ink2: '#b8c1cc', muted: '#8b949e', line: '#30363d',
      accent: '#2fd4c4', ai: '#79a7ff', aiBg: '#152036', onAccent: '#0d1117',
    },
  },
  blog: {
    label: 'Blog', description: 'Una colonna, immagine accanto al titolo: per un blog aziendale.',
    home: 'list', header: 'bar', heading: SERIF, body: SANS, articleBody: SERIF, radius: '6px',
    colors: { ...light, accent: '#1f7a4d' },
  },
  minimal: {
    label: 'Minimal', description: 'Solo testo, date e titoli: veloce e sobrio.',
    home: 'stream', header: 'bar', heading: SANS, body: SANS, articleBody: SERIF, radius: '0',
    colors: { ...light, accent: '#111111', paper: '#fafafa' },
  },
  locale: {
    label: 'Locale', description: 'Giornale di città: apertura, notizie brevi e rubriche, colori chiari.',
    home: 'front', header: 'masthead', heading: HUMANIST, body: HUMANIST, articleBody: SERIF, radius: '6px', uppercaseNav: true,
    colors: { ...light, paper: '#f1f6fb', accent: '#0b63b6' },
  },
  finanza: {
    label: 'Finanza', description: 'Carta salmone e serif: economia, mercati, professioni.',
    home: 'front', header: 'masthead', heading: DIDONE, body: SANS, articleBody: SERIF, radius: '0',
    colors: {
      ...light, bg: '#fff1e5', paper: '#f2dfce', line: '#e6cfbb', ink: '#1a1817', ink2: '#3f3a36', muted: '#6e655d',
      accent: '#0d7680', aiBg: '#f6e6d7',
    },
  },
  scienza: {
    label: 'Scienza', description: 'Griglia ariosa e tinte fredde: scienza, salute, ambiente.',
    home: 'grid', header: 'bar', heading: HUMANIST, body: SANS, articleBody: SERIF, radius: '12px',
    colors: { ...light, paper: '#eef7f6', accent: '#00796b' },
  },
  lifestyle: {
    label: 'Lifestyle', description: 'Elegante e caldo: viaggi, cibo, moda, benessere.',
    home: 'grid', header: 'masthead', hero: 'overlay', heading: DIDONE, body: GROTESK, articleBody: SERIF, radius: '14px', uppercaseNav: true,
    colors: { ...light, bg: '#fffaf6', paper: '#f8ece4', line: '#eddcd0', accent: '#c4513a' },
  },
  notte: {
    label: 'Notte', description: 'Quotidiano in versione scura, per chi legge di sera.',
    home: 'front', header: 'masthead', dark: true, heading: SERIF, body: SANS, articleBody: SERIF, radius: '2px',
    colors: {
      bg: '#121212', paper: '#1c1c1c', ink: '#ececec', ink2: '#c4c4c4', muted: '#9a9a9a', line: '#2e2e2e',
      accent: '#ff6b5a', ai: '#8fb0ff', aiBg: '#1b2235', onAccent: '#121212',
    },
  },
};

export const MONO_FONT = MONO;

export function themeNamed(name: string | undefined): Theme {
  return THEMES[(name || '').trim().toLowerCase()] || THEMES.quotidiano;
}

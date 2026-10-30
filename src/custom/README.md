# Your changes

This folder is yours: the weekly template update (`.github/workflows/template-update.yml`)
never touches it, nor `site.config.mjs`, `src/content/articles/`, `public/images/`
and `public/brand/`.

| File | What it does |
|---|---|
| `custom.css` | Your styles, loaded after the theme's. CSS variables: `--accent`, `--bg`, `--ink`, `--heading`, `--body`… |
| `Head.astro` | Added inside `<head>` on every page. |
| `Header.astro` | If you create it, it replaces the site's header. Props: `lang`. |
| `Footer.astro` | If you create it, it replaces the site's footer. Props: `lang`. |

Put your logo and other pictures in `public/brand/` and use them as `/brand/logo.svg`.

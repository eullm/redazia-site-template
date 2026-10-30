# Modello di sito per Redazia

Un sito di notizie pronto a ricevere gli articoli da [Redazia](https://redazia.com), la redazione AI: a mano, quando premi **Pubblica** su una bozza approvata, o da solo con la **redazione automatica**. Fatto con [Astro](https://astro.build): statico, veloce, senza cookie, in una o più lingue, con dieci stili pronti (anteprime nel [README in inglese](README.md)).

## Cosa contiene

- Home, una pagina per rubrica, pagine degli articoli, "Chi siamo" con la dichiarazione sull'AI, pagina 404.
- Fino a cinque lingue (italiano, inglese, tedesco, francese, spagnolo): la prima su `/`, le altre sotto `/en/`, `/de/`…, ognuna con il suo feed.
- SEO già fatta: canonical e `hreflang`, Open Graph, dati strutturati `NewsArticle`, sitemap, RSS, `llms.txt` per i motori AI, `robots.txt`.
- Niente cookie, niente tracciamento, niente font da altri server: nessun consenso da chiedere.
- Ogni articolo dice come è stato scritto (AI Act, art. 50). Con `ai: 'automatic'` un banner su ogni pagina dice che il sito è gestito dall'AI.
- Articoli di esempio finché non arriva il primo vero, così il sito si vede dal primo giorno.

## Partire in cinque minuti

1. Premi **Use this template** › **Create a new repository** (può essere privato).
2. Modifica `site.config.mjs`: nome, indirizzo, lingue, rubriche, stile, editore. Fai il commit.
3. Importa il repository su [Vercel](https://vercel.com/new) o [Netlify](https://app.netlify.com/start): riconoscono Astro da soli. Aggiungi il tuo dominio.
4. Collegalo a Redazia (sotto).

In locale: `npm install` e poi `npm run dev` (Node 22.23.4 o successivo).

## Collegarlo a Redazia

Crea un token "fine-grained" su GitHub › Settings › Developer settings › Personal access tokens, solo per questo repository, con **Contents: read and write**, **Pull requests: read and write** e **Commit statuses: read**.

In Redazia › **Pubblicazioni** aggiungi una destinazione **GitHub** per lingua:

| Campo | Lingua principale (es. italiano) | Altra lingua (es. inglese) |
|---|---|---|
| Repository | `tu/il-tuo-sito` | `tu/il-tuo-sito` |
| Cartella degli articoli | `src/content/articles/it` | `src/content/articles/en` |
| Indirizzo degli articoli | `https://il-tuo-sito.it/articoli/{slug}` | `https://il-tuo-sito.it/en/articles/{slug}` |
| Lingua | Italiano | Inglese |
| Token | il token creato sopra | lo stesso token |

Le parole negli indirizzi seguono `paths` in `site.config.mjs`. Le copertine finiscono in `public/images`.

Ogni articolo è un solo commit, quindi un solo deploy. Redazia apre una pull request e la unisce solo quando l'anteprima di Vercel o Netlify è verde: un articolo che romperebbe il sito non ci arriva mai.

Pubblica un articolo a mano e controllalo sul sito prima di accendere la redazione automatica.

## Rubriche

`name` è il nome con cui Redazia archivia l'articolo: usa gli stessi nomi nelle rubriche della redazione automatica (Sito e profilo › Redazione automatica). Ogni lingua ha la sua etichetta e il suo indirizzo. Un articolo con una rubrica che non è nell'elenco compare comunque in home.

## Stili

`theme` in `site.config.mjs`, oppure la variabile d'ambiente `SITE_THEME` (in Vercel › Settings › Environment Variables) per provarne uno senza commit. `accent` mette il tuo colore su qualsiasi stile. Gli stili: `quotidiano`, `magazine`, `tech`, `blog`, `minimal`, `locale`, `finanza`, `scienza`, `lifestyle`, `notte`. Si vedono tutti dal vivo, in cinque lingue, su [demo.redazia.com](https://demo.redazia.com).

Allo stesso modo `SITE_LANGUAGES` (es. `it,en,de`), `SITE_BASE` (es. `/news`) e `SITE_URL` cambiano lingue, cartella e indirizzo.

## Accanto a un sito che c'è già

Se il tuo sito non può ricevere articoli (Squarespace, molti costruttori di siti), tienilo e metti questo accanto:

- **Sottodominio** `news.il-tuo-sito.it`: un record CNAME verso Vercel o Netlify. È il più semplice.
- **Cartella** `il-tuo-sito.it/news`: metti `base: '/news'` in `site.config.mjs` e fai girare dal sito principale le richieste di `/news/…` alla radice di questo sito (regola di rewrite su Cloudflare, Nginx, Apache, Vercel o Netlify; esempio per Nginx nel [README in inglese](README.md#next-to-an-existing-site)). Per Google gli articoli fanno parte del sito principale. L'indirizzo degli articoli in Redazia diventa `https://il-tuo-sito.it/news/articoli/{slug}`.

## Licenza

[MIT](LICENSE): usalo, modificalo, vendi siti fatti con questo modello. Redazia è un servizio a parte.

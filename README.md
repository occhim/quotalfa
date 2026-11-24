# Quotalfa

Sito bilingue (IT/EN) di finanza personale e trading. Next.js 15 (App Router) + Tailwind CSS, contenuti in Markdown.

## Comandi

    npm install
    npm run dev      # sviluppo su http://localhost:3000
    npm run build    # genera le immagini SVG e compila

## Pubblicare un articolo

1. Crea `content/it/<slug>.md` e `content/en/<slug>.md` con lo stesso `id` nel frontmatter.
2. Campi: `id`, `order`, `title`, `description` (meta description), `date` (AAAA-MM-GG), `pillar` (`fp`, `trading`, `macro`), `cover`, `coverAlt`.
3. Gli articoli con data futura vanno online al primo deploy successivo a quella data.
4. Cover e figure: aggiungi un generatore in `scripts/gen-images.mjs` oppure metti un file in `public/images/`.

## Variabili d'ambiente (Vercel → Settings → Environment Variables)

| Variabile | A cosa serve |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Dominio definitivo (es. `https://quotalfa.com`) per canonical, sitemap e hreflang |
| `BREVO_API_KEY`, `BREVO_LIST_ID` | Salvano in Brevo le email raccolte dal modulo della checklist |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Recapitano i messaggi del modulo contatti |

## Affiliazioni

Tutti i link partner sono in `lib/partners.js`. Quando un programma ti approva, sostituisci `url` con il link tracciato e imposta `affiliate: true`: il link esce con `rel="sponsored"` e l'etichetta «Link affiliato».
Le schede broker sono in `lib/brokers.js`.

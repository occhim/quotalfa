import Link from 'next/link';
import PostCard from '@/components/PostCard';
import LeadBand from '@/components/LeadBand';
import Newsletter from '@/components/Newsletter';
import { getPosts, card } from '@/lib/posts';
import { meta } from '@/lib/seo';
import { pillars, site } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang,
    title: lang === 'it' ? 'QuotAlfa — Finanza personale, trading ed Expert Advisor misurati sul rischio' : 'QuotAlfa — Personal finance, trading and Expert Advisors, measured by risk',
    description: lang === 'it'
      ? 'Guide, calcolatori e schede di Expert Advisor per investire e fare trading con metodo: gestione del rischio, price action, investimenti passivi, dati macro e sistemi automatici.'
      : 'Guides, calculators and Expert Advisor fact sheets for investing and trading with method: risk management, price action, passive investing, macro data and automated systems.',
  });
}

function Curve() {
  const pts = [0, 8, 5, 14, 11, 22, 17, 15, 26, 34, 29, 41, 37, 52, 46, 44, 58, 69, 63, 78, 74, 92];
  const d = pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${20 + i * 22},${250 - y * 2.2}`).join(' ');
  return (
    <svg viewBox="0 0 520 290" className="w-full" role="img" aria-label="Equity curve">
      {[0, 1, 2, 3, 4].map((i) => <line key={i} x1="20" x2="500" y1={40 + i * 52.5} y2={40 + i * 52.5} stroke="#1C3558" />)}
      <path d={`${d} L482,250 L20,250 Z`} fill="#1FD1A5" opacity="0.08" />
      <path d={d} fill="none" stroke="#1FD1A5" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M306,174 L328,153" stroke="#FF6B6B" strokeWidth="2.5" />
      <text x="20" y="24" fill="#8FA6C2" fontFamily="ui-monospace,monospace" fontSize="11">EQUITY · R</text>
      <text x="500" y="24" textAnchor="end" fill="#2BD68F" fontFamily="ui-monospace,monospace" fontSize="11">+92R</text>
      <text x="330" y="196" fill="#FF6B6B" fontFamily="ui-monospace,monospace" fontSize="11">max DD −8R</text>
    </svg>
  );
}

export default async function Home({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const posts = getPosts(lang).map(card);
  const [lead, ...rest] = posts;
  const blocks = it
    ? [
        ['fp', 'Costruisci la base', 'Fondo di emergenza, piani di accumulo, costi e diversificazione. Prima si mette in sicurezza il patrimonio, poi si cerca rendimento.'],
        ['trading', 'Opera con un sistema', 'Price action, dimensionamento della posizione, expectancy. Regole scritte e numeri verificabili al posto delle opinioni.'],
        ['macro', 'Leggi il contesto', 'Inflazione, lavoro, banche centrali. Quali dati contano davvero e come cambiano il rischio della tua settimana.'],
      ]
    : [
        ['fp', 'Build the base', 'Emergency fund, savings plans, costs and diversification. Secure the wealth first, then look for return.'],
        ['trading', 'Trade a system', 'Price action, position sizing, expectancy. Written rules and checkable numbers instead of opinions.'],
        ['macro', 'Read the context', 'Inflation, jobs, central banks. Which releases matter and how they change your week’s risk.'],
      ];
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${site.url}/${lang}`, inLanguage: lang };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-line">
        <div className="wrap grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="eyebrow">{it ? 'Finanza personale · Trading · Expert Advisor' : 'Personal finance · Trading · Expert Advisors'}</p>
            <h1 className="h1 mt-5">
              {it ? <>Prima il rischio.<br /><span className="text-brand">Poi il rendimento.</span></> : <>Risk first.<br /><span className="text-brand">Return second.</span></>}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-soft">
              {it
                ? 'QuotAlfa spiega come proteggere il capitale, investirlo con metodo e fare trading con regole misurabili, manuali o automatiche. Niente segnali, niente promesse: numeri, procedure e strumenti che puoi verificare.'
                : 'QuotAlfa explains how to protect capital, invest it with method and trade by measurable rules, manual or automated. No signals, no promises: numbers, procedures and tools you can check.'}
            </p>
            <div className="mt-8 max-w-xl">
              <p className="mb-3 text-sm text-text">
                {it ? 'Scarica gratis la Checklist Pre-Trade in 21 punti:' : 'Download the free 21-Point Pre-Trade Checklist:'}
              </p>
              <Newsletter lang={lang} />
            </div>
          </div>
          <div className="card p-5"><Curve /></div>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map(([k, title, text], i) => (
            <div key={k} className="card p-6">
              <p className="num text-sm text-brand">0{i + 1}</p>
              <p className="eyebrow mt-4">{pillars[k][lang]}</p>
              <h2 className="mt-2 font-display text-2xl tracking-tight">{title}</h2>
              <p className="mt-3 text-sm text-mute">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="h2">{it ? 'Ultimi articoli' : 'Latest articles'}</h2>
          <Link href={`/${lang}/blog`} className="text-sm text-brand hover:underline">{it ? 'Tutti gli articoli →' : 'All articles →'}</Link>
        </div>
        {lead && <div className="mb-6"><PostCard post={lead} lang={lang} wide /></div>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 6).map((p) => <PostCard key={p.slug} post={p} lang={lang} />)}
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col p-7 sm:p-10">
            <p className="eyebrow">Expert Advisor</p>
            <h2 className="h2 mt-3">{it ? 'Sistemi automatici, letti con i numeri' : 'Automated systems, read by the numbers'}</h2>
            <p className="mt-3 max-w-2xl text-sm text-soft">
              {it
                ? 'Schede di Expert Advisor per MetaTrader con backtest, forward test e limiti dichiarati, più i sei criteri per valutarne uno.'
                : 'MetaTrader Expert Advisor fact sheets with backtests, forward tests and stated limits, plus six criteria for assessing one.'}
            </p>
            <Link href={`/${lang}/ea`} className="btn-ghost mt-6 self-start">{it ? 'Vai agli EA' : 'See the EAs'} →</Link>
          </div>
          <div className="card flex flex-col p-7 sm:p-10">
            <p className="eyebrow">{it ? 'Strumenti' : 'Tools'}</p>
            <h2 className="h2 mt-3">{it ? 'Quattro calcolatori per decidere con i numeri' : 'Four calculators to decide by the numbers'}</h2>
            <p className="mt-3 max-w-2xl text-sm text-soft">
              {it
                ? 'Dimensione della posizione, expectancy, interesse composto e recupero dal drawdown. Gratuiti, senza registrazione.'
                : 'Position size, expectancy, compound interest and drawdown recovery. Free, no sign-up.'}
            </p>
            <Link href={`/${lang}/tools`} className="btn-ghost mt-6 self-start">{it ? 'Apri gli strumenti' : 'Open the tools'} →</Link>
          </div>
        </div>
      </section>

      <section className="wrap"><LeadBand lang={lang} /></section>
    </>
  );
}

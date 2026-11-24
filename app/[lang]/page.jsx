import Link from 'next/link';
import PostCard from '@/components/PostCard';
import LeadBand from '@/components/LeadBand';
import HeroCalc from '@/components/HeroCalc';
import { getPosts, card } from '@/lib/posts';
import { getEAs } from '@/lib/ea';
import { meta } from '@/lib/seo';
import { site } from '@/lib/site';

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

const PATHS = [
  {
    key: 'start',
    it: ['Inizia da qui', 'Le basi da mettere in ordine prima di investire un euro.'],
    en: ['Start here', 'The groundwork to get right before you invest a single euro.'],
    ids: ['emergency-fund', 'budget-50-30-20', 'deposit-account-fixed-vs-easy-access', 'etf-savings-plan'],
  },
  {
    key: 'risk',
    it: ['Gestione del rischio', 'Quanto rischiare, dove uscire e come capire se un sistema regge.'],
    en: ['Risk management', 'How much to risk, where to get out and whether a system holds up.'],
    ids: ['position-sizing', 'stop-loss-placement', 'atr-stop-loss-volatility', 'expectancy'],
  },
  {
    key: 'market',
    it: ['Mercati e mentalità', 'Leggere il grafico e il calendario, e tenere sotto controllo te stesso.'],
    en: ['Markets and mindset', 'Reading the chart and the calendar, and keeping yourself in check.'],
    ids: ['price-action', 'macro-calendar', 'trading-journal-weekly-review', 'money-biases'],
  },
];

export default async function Home({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const posts = getPosts(lang).map(card);
  const byId = Object.fromEntries(posts.map((p) => [p.id, p]));
  const href = (id, fallback) => (byId[id] ? `/${lang}/blog/${byId[id].slug}` : fallback);
  const [lead, ...rest] = posts;
  const hasEAs = getEAs(lang).length > 0;

  const formulas = [
    {
      name: it ? 'Dimensione della posizione' : 'Position size',
      f: it ? 'Unità = (C × r%) ÷ |ingresso − stop|' : 'Units = (A × r%) ÷ |entry − stop|',
      vars: it ? 'C = capitale, r% = rischio per trade' : 'A = account, r% = risk per trade',
      note: it ? 'Il rischio lo decidi tu; la size è una conseguenza.' : 'You choose the risk; the size follows from it.',
      link: href('position-sizing', `/${lang}/tools#position-size`),
    },
    {
      name: 'Expectancy',
      f: 'E = W × G − (1 − W) × L',
      vars: it ? 'W = % vincenti, G = guadagno medio, L = perdita media (in R)' : 'W = win rate, G = average win, L = average loss (in R)',
      note: it ? 'Un win rate alto non basta se le perdite pesano di più.' : 'A high win rate is not enough if losses weigh more.',
      link: href('expectancy', `/${lang}/tools#expectancy`),
    },
    {
      name: it ? 'Stop sulla volatilità' : 'Volatility stop',
      f: it ? 'Stop = ingresso − k × ATR' : 'Stop = entry − k × ATR',
      vars: it ? 'k = moltiplicatore, ATR = Average True Range' : 'k = multiplier, ATR = Average True Range',
      note: it ? 'Lo stop si adatta a quanto si muove davvero il mercato.' : 'The stop adapts to how much the market actually moves.',
      link: href('atr-stop-loss-volatility', `/${lang}/blog`),
    },
    {
      name: it ? 'Recupero dal drawdown' : 'Drawdown recovery',
      f: it ? 'Rialzo necessario = DD ÷ (1 − DD)' : 'Gain needed = DD ÷ (1 − DD)',
      vars: it ? 'DD = drawdown in decimali (0,20 = 20%)' : 'DD = drawdown as a decimal (0.20 = 20%)',
      note: it ? 'Perdere il 20% richiede un +25% per tornare in pari.' : 'Losing 20% takes a 25% gain to get back to even.',
      link: `/${lang}/tools#drawdown`,
    },
  ];

  const paths = PATHS.map((p) => ({ ...p, items: p.ids.map((id) => byId[id]).filter(Boolean) })).filter((p) => p.items.length);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: `${site.url}/${lang}`, inLanguage: lang };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line">
        <div className="wrap grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="eyebrow">{it ? 'Finanza personale · Trading · Expert Advisor' : 'Personal finance · Trading · Expert Advisors'}</p>
            <h1 className="h1 mt-5">
              {it ? <>Prima il rischio.<br /><span className="text-grad">Poi il rendimento.</span></> : <>Risk first.<br /><span className="text-grad">Return second.</span></>}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-soft">
              {it
                ? 'Guide, formule e calcolatori per proteggere il capitale, investirlo con metodo e fare trading con regole misurabili. Niente segnali, niente promesse: numeri che puoi verificare da solo.'
                : 'Guides, formulas and calculators to protect capital, invest it with method and trade by measurable rules. No signals, no promises: numbers you can check yourself.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#paths" className="btn">{it ? 'Da dove iniziare' : 'Where to start'} ↓</a>
              <Link href={`/${lang}/checklist`} className="btn-ghost">{it ? 'Checklist pre-trade gratuita' : 'Free pre-trade checklist'}</Link>
            </div>
            <ul className="num mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-mute">
              <li><span className="text-text">{posts.length}</span> {it ? 'guide' : 'guides'}</li>
              <li><span className="text-text">4</span> {it ? 'calcolatori' : 'calculators'}</li>
              <li><span className="text-text">0</span> {it ? 'link di affiliazione' : 'affiliate links'}</li>
            </ul>
          </div>
          <HeroCalc lang={lang} />
        </div>
      </section>

      <section className="wrap py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">{it ? 'Il metodo in quattro righe' : 'The method in four lines'}</p>
          <h2 className="h2 mt-3">{it ? 'Le formule dietro ogni decisione' : 'The formulas behind every decision'}</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formulas.map((x) => (
            <Link key={x.name} href={x.link} className="card group flex flex-col p-5">
              <p className="text-sm font-semibold text-text group-hover:text-brand">{x.name}</p>
              <p className="num mt-4 rounded-md border border-line bg-ink px-3 py-3 text-[13px] leading-relaxed text-brand">{x.f}</p>
              <p className="num mt-2 text-[11px] leading-relaxed text-mute">{x.vars}</p>
              <p className="mt-4 text-sm text-mute">{x.note}</p>
              <p className="mt-auto pt-4 text-xs text-mute group-hover:text-brand">{it ? 'Approfondisci →' : 'Learn more →'}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="paths" className="scroll-mt-24 border-y border-line bg-panel/40">
        <div className="wrap py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">{it ? 'Percorsi di lettura' : 'Reading paths'}</p>
            <h2 className="h2 mt-3">{it ? 'Leggi nell’ordine giusto' : 'Read in the right order'}</h2>
            <p className="mt-3 text-soft">
              {it ? 'Ogni percorso è una sequenza breve: ogni guida prepara la successiva.' : 'Each path is a short sequence: every guide sets up the next one.'}
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {paths.map((p) => (
              <div key={p.key} className="card flex flex-col p-6">
                <h3 className="font-display text-xl font-bold tracking-tight">{p[lang][0]}</h3>
                <p className="mt-2 text-sm text-mute">{p[lang][1]}</p>
                <ol className="mt-6 space-y-1">
                  {p.items.map((post, i) => (
                    <li key={post.slug}>
                      <Link href={`/${lang}/blog/${post.slug}`} className="group flex gap-4 rounded-md px-2 py-2.5 hover:bg-ink/60">
                        <span className="num pt-0.5 text-sm text-brand">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-sm leading-snug text-soft group-hover:text-text">{post.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="h2">{it ? 'Ultimi articoli' : 'Latest articles'}</h2>
          <Link href={`/${lang}/blog`} className="text-sm text-brand hover:underline">{it ? 'Tutti gli articoli →' : 'All articles →'}</Link>
        </div>
        {lead && <div className="mb-6"><PostCard post={lead} lang={lang} wide /></div>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} lang={lang} />)}
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card flex flex-col p-7 sm:p-10">
            <p className="eyebrow">Expert Advisor</p>
            <h2 className="h2 mt-3">{it ? 'Sistemi automatici, letti con i numeri' : 'Automated systems, read by the numbers'}</h2>
            <p className="mt-3 max-w-2xl text-sm text-soft">
              {hasEAs
                ? (it
                  ? 'Schede di Expert Advisor per MetaTrader con backtest, forward test e limiti dichiarati, più i sei criteri per valutarne uno.'
                  : 'MetaTrader Expert Advisor fact sheets with backtests, forward tests and stated limits, plus six criteria for assessing one.')
                : (it
                  ? 'I sei criteri per valutare un Expert Advisor per MetaTrader. Le prime schede, con backtest, forward test e limiti dichiarati, sono in preparazione.'
                  : 'Six criteria for assessing a MetaTrader Expert Advisor. The first fact sheets, with backtests, forward tests and stated limits, are in preparation.')}
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
            <ul className="mt-6 grid grid-cols-2 gap-2 border-t border-line pt-5 text-sm">
              {[['position-size', it ? 'Position size' : 'Position size'], ['expectancy', 'Expectancy'], ['compound', it ? 'Interesse composto' : 'Compound interest'], ['drawdown', 'Drawdown']].map(([a, l]) => (
                <li key={a}><Link href={`/${lang}/tools#${a}`} className="text-soft hover:text-brand">→ {l}</Link></li>
              ))}
            </ul>
            <Link href={`/${lang}/tools`} className="btn-ghost mt-6 self-start">{it ? 'Apri gli strumenti' : 'Open the tools'} →</Link>
          </div>
        </div>
      </section>

      <section className="wrap"><LeadBand lang={lang} /></section>
    </>
  );
}

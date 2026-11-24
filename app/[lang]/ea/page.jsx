import Link from 'next/link';
import LeadBand from '@/components/LeadBand';
import { getEAs, statusLabel } from '@/lib/ea';
import { meta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/ea',
    title: lang === 'it' ? 'Expert Advisor per MetaTrader: schede, test e metodo di valutazione' : 'MetaTrader Expert Advisors: fact sheets, tests and how we assess them',
    description: lang === 'it'
      ? 'Expert Advisor per MetaTrader 5 presentati con backtest, forward test e limiti dichiarati. Più i sei criteri per valutare qualsiasi EA prima di usarlo.'
      : 'MetaTrader 5 Expert Advisors presented with backtests, forward tests and stated limits. Plus six criteria for assessing any EA before you run it.',
  });
}

export default async function EAHub({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const eas = getEAs(lang);
  const criteria = it
    ? [
        ['Periodo e regimi di mercato', 'Un backtest di pochi mesi descrive un solo tipo di mercato. Cerchiamo anni di dati, con fasi di trend, laterali e alta volatilità.'],
        ['Qualità dei dati e costi', 'Tick reali, spread variabile, commissioni e swap inclusi. Senza costi realistici il risultato di uno scalper non significa nulla.'],
        ['Numero di operazioni', 'Poche decine di trade possono essere fortuna. Più operazioni ci sono, più le statistiche diventano leggibili.'],
        ['Drawdown prima del profitto', 'Guardiamo per primo il drawdown massimo e la serie peggiore di perdite consecutive: sono ciò che dovrai sopportare davvero.'],
        ['Robustezza dei parametri', 'Se il risultato crolla cambiando di poco un parametro, l’EA è adattato al passato (overfitting), non al mercato.'],
        ['Forward test', 'Il backtest va confermato su dati che l’EA non ha mai visto: prima fuori campione, poi su conto demo, per settimane.'],
      ]
    : [
        ['Period and market regimes', 'A backtest of a few months describes a single kind of market. We look for years of data covering trends, ranges and high volatility.'],
        ['Data quality and costs', 'Real ticks, variable spread, commissions and swaps included. Without realistic costs, a scalper’s result means nothing.'],
        ['Number of trades', 'A few dozen trades can be luck. The more trades there are, the more readable the statistics become.'],
        ['Drawdown before profit', 'We look at maximum drawdown and the worst losing streak first: that is what you will actually have to sit through.'],
        ['Parameter robustness', 'If the result collapses when a parameter moves slightly, the EA is fitted to the past (overfitting), not to the market.'],
        ['Forward test', 'A backtest must be confirmed on data the EA has never seen: out of sample first, then on a demo account, for weeks.'],
      ];

  return (
    <div className="wrap py-14">
      <p className="eyebrow">Expert Advisor · MetaTrader</p>
      <h1 className="h1 mt-4 max-w-3xl !text-4xl sm:!text-5xl">
        {it ? 'Sistemi automatici, letti con i numeri' : 'Automated systems, read by the numbers'}
      </h1>
      <p className="mt-4 max-w-2xl text-soft">
        {it
          ? 'Un Expert Advisor è un programma che apre e chiude operazioni su MetaTrader seguendo regole fisse. Qui trovi le schede degli EA che presentiamo, con test e limiti dichiarati, e il metodo con cui valutiamo qualsiasi EA.'
          : 'An Expert Advisor is a program that opens and closes trades on MetaTrader by fixed rules. Here you will find the EAs we present, with their tests and limits stated, and the method we use to assess any EA.'}
      </p>

      <section className="mt-12">
        <h2 className="h2">{it ? 'Le schede' : 'Fact sheets'}</h2>
        {eas.length ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eas.map((e) => (
              <Link key={e.slug} href={`/${lang}/ea/${e.slug}`} className="card flex flex-col p-6 transition hover:border-brand">
                <p className="eyebrow">{[e.platform, e.symbol, e.timeframe].filter(Boolean).join(' · ')}</p>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{e.name}</h3>
                <p className="mt-2 text-sm text-mute">{e.description}</p>
                <p className="num mt-auto pt-4 text-xs text-mute">
                  {statusLabel[e.status]?.[lang] || ''}{e.author ? ` · ${it ? 'sviluppato dall’autore del sito' : 'built by the site’s author'}` : ''}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card mt-6 p-7">
            <p className="text-soft">
              {it
                ? 'Le prime schede sono in preparazione: le pubblicheremo solo quando backtest e forward test saranno completi. Iscriviti qui sotto per sapere quando escono.'
                : 'The first fact sheets are being prepared: we will publish them only once backtests and forward tests are complete. Sign up below to hear when they go live.'}
            </p>
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="h2">{it ? 'Come valutiamo un EA' : 'How we assess an EA'}</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {criteria.map(([t, d], i) => (
            <li key={t} className="card p-5">
              <p className="num text-sm text-brand">0{i + 1}</p>
              <p className="mt-2 font-display text-lg">{t}</p>
              <p className="mt-1.5 text-sm text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 rounded-md border border-line bg-panel p-5 text-sm leading-relaxed text-mute">
        <p>
          {it
            ? 'Trasparenza: alcuni EA presentati sono sviluppati dall’autore del sito, e la scheda lo indica. Backtest e test su demo sono simulazioni e non garantiscono risultati futuri; un EA può perdere tutto il capitale assegnato. Se opera su CFD o forex con leva, ricorda che la maggior parte dei conti retail perde denaro.'
            : 'Transparency: some EAs presented here are built by the site’s author, and the page says so. Backtests and demo tests are simulations and guarantee no future result; an EA can lose all the capital assigned to it. If it trades leveraged CFDs or forex, remember that most retail accounts lose money.'}
          {' '}
          <Link href={`/${lang}/legal#ea`} className="text-brand hover:underline">{it ? 'Dettagli' : 'Details'}</Link>
        </p>
      </section>

      <div className="mt-16"><LeadBand lang={lang} /></div>
    </div>
  );
}

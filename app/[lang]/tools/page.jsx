import Link from 'next/link';
import { PositionSize, Expectancy, Compound, Drawdown } from '@/components/Calculators';
import { meta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/tools',
    title: lang === 'it' ? 'Strumenti: calcolatori di rischio per trader e investitori' : 'Tools: risk calculators for traders and investors',
    description: lang === 'it'
      ? 'Calcolatori gratuiti di position sizing, expectancy, interesse composto e drawdown. Nessuna registrazione, formule visibili.'
      : 'Free position sizing, expectancy, compound interest and drawdown calculators. No sign-up, formulas in plain view.',
  });
}

export default async function Tools({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const jump = it
    ? [['#position-size', 'Posizione'], ['#expectancy', 'Expectancy'], ['#compound', 'Interesse composto'], ['#drawdown', 'Drawdown']]
    : [['#position-size', 'Position size'], ['#expectancy', 'Expectancy'], ['#compound', 'Compound interest'], ['#drawdown', 'Drawdown']];
  return (
    <div className="wrap py-14">
      <p className="eyebrow">{it ? 'Strumenti' : 'Tools'}</p>
      <h1 className="h1 mt-4 max-w-3xl !text-4xl sm:!text-5xl">{it ? 'Calcola prima di cliccare' : 'Calculate before you click'}</h1>
      <p className="mt-4 max-w-2xl text-soft">
        {it ? 'Quattro calcolatori per le decisioni che contano di più. Funzionano con qualsiasi valuta: inserisci gli importi nella valuta del tuo conto.' : 'Four calculators for the decisions that matter most. They work in any currency: enter amounts in your account currency.'}
      </p>
      <nav className="mt-8 flex flex-wrap gap-2" aria-label={it ? 'Sezioni' : 'Sections'}>
        {jump.map(([h, l]) => <a key={h} href={h} className="rounded-full border border-line px-4 py-1.5 text-sm text-soft hover:border-brand hover:text-brand">{l}</a>)}
      </nav>

      <div className="mt-10 space-y-6">
        <PositionSize lang={lang} />
        <Expectancy lang={lang} />
        <Compound lang={lang} />
        <Drawdown lang={lang} />
      </div>

      <section className="card mt-16 grid gap-6 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="eyebrow">Expert Advisor</p>
          <h2 className="h2 mt-3">{it ? 'Stessi numeri, applicati ai sistemi automatici' : 'The same numbers, applied to automated systems'}</h2>
          <p className="mt-3 max-w-2xl text-sm text-soft">
            {it
              ? 'Expectancy, drawdown e dimensionamento sono anche i criteri con cui leggiamo i report degli Expert Advisor per MetaTrader.'
              : 'Expectancy, drawdown and sizing are also the criteria we use to read MetaTrader Expert Advisor reports.'}
          </p>
        </div>
        <Link href={`/${lang}/ea`} className="btn-ghost">{it ? 'Vai alla sezione EA' : 'Go to the EA section'} →</Link>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { meta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/about',
    title: lang === 'it' ? 'Metodo editoriale: come lavora QuotAlfa' : 'Editorial method: how QuotAlfa works',
    description: lang === 'it'
      ? 'Chi siamo, cosa pubblichiamo e cosa no: niente segnali, niente rendimenti promessi, niente affiliazioni, calcoli verificabili e conflitti dichiarati.'
      : 'Who we are, what we publish and what we don’t: no signals, no promised returns, no affiliate links, checkable maths and declared conflicts.',
  });
}

export default async function About({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const rules = it
    ? [
        ['Il rischio viene prima', 'Ogni contenuto parte dalla domanda «quanto posso perdere?» prima di «quanto posso guadagnare?». È l’unica variabile che un investitore controlla davvero.'],
        ['Numeri che puoi rifare', 'Ogni esempio riporta formula e dati di partenza. Se un calcolo non torna, scrivici: lo correggiamo e lo segnaliamo nell’articolo.'],
        ['Nessun segnale, nessuna promessa', 'Non pubblichiamo segnali operativi, non vendiamo corsi miracolosi e non mostriamo screenshot di profitti. Insegniamo procedure.'],
        ['Fonti dichiarate', 'Dati macro e normativa vengono dalle fonti primarie: banche centrali, istituti di statistica, autorità di vigilanza.'],
        ['Conflitti in chiaro', 'Il sito non usa link di affiliazione. Quando presentiamo un Expert Advisor sviluppato dall’autore, la scheda lo dice e mostra i limiti dei test insieme ai risultati.'],
        ['Informazione, non consulenza', 'QuotAlfa non conosce la tua situazione né le regole fiscali del tuo paese. Per decisioni importanti rivolgiti a un consulente abilitato.'],
      ]
    : [
        ['Risk comes first', 'Every piece starts from “how much can I lose?” before “how much can I make?”. It is the only variable an investor truly controls.'],
        ['Numbers you can redo', 'Every example shows its formula and inputs. If a calculation is off, write to us: we fix it and flag the correction in the article.'],
        ['No signals, no promises', 'We publish no trade signals, sell no miracle courses and show no profit screenshots. We teach procedures.'],
        ['Stated sources', 'Macro data and regulation come from primary sources: central banks, statistics offices and supervisors.'],
        ['Conflicts in the open', 'The site uses no affiliate links. When we present an Expert Advisor built by the author, the page says so and shows the limits of the tests alongside the results.'],
        ['Information, not advice', 'QuotAlfa does not know your situation or your country’s tax rules. For important decisions, consult a licensed financial adviser.'],
      ];
  return (
    <div className="wrap py-14">
      <p className="eyebrow">{it ? 'Metodo' : 'About'}</p>
      <h1 className="h1 mt-4 max-w-3xl !text-4xl sm:!text-5xl">
        {it ? 'Un sito di finanza che ti dice anche quando non operare' : 'A finance site that also tells you when not to trade'}
      </h1>
      <div className="mt-6 max-w-3xl space-y-4 text-lg text-soft">
        <p>
          {it
            ? 'QuotAlfa è una pubblicazione indipendente su finanza personale, trading ed Expert Advisor. Il nome unisce quota — la parte di capitale che decidi di esporre — e alfa, il rendimento che resta dopo aver tolto quello del mercato. In mezzo c’è il lavoro vero: decidere quanto rischiare, e rispettarlo.'
            : 'QuotAlfa is an independent publication on personal finance, trading and Expert Advisors. The name joins quota — the share of capital you decide to expose — and alpha, the return left once the market’s is removed. In between sits the real work: deciding how much to risk, and sticking to it.'}
        </p>
        <p>
          {it
            ? 'Scriviamo per chi lavora, risparmia e vuole gestire il proprio denaro con metodo, in qualunque paese viva: prima la base (liquidità, investimenti a basso costo), poi — per chi vuole — il trading, manuale o automatico, trattato come un’attività statistica e non come una scommessa.'
            : 'We write for people who work, save and want to manage their money with method, wherever they live: first the base (cash, low-cost investing), then — for those who want it — trading, manual or automated, treated as a statistical activity rather than a bet.'}
        </p>
      </div>

      <h2 className="h2 mt-16">{it ? 'Sei regole editoriali' : 'Six editorial rules'}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rules.map(([t, d], i) => (
          <div key={t} className="card p-6">
            <p className="num text-sm text-brand">0{i + 1}</p>
            <h3 className="mt-3 font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm text-mute">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-4">
        <Link href={`/${lang}/resources`} className="btn">{it ? 'Inizia dal percorso' : 'Start the path'}</Link>
        <Link href={`/${lang}/contact`} className="btn-ghost">{it ? 'Scrivici' : 'Get in touch'}</Link>
      </div>
    </div>
  );
}

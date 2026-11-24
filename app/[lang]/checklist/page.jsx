import Newsletter from '@/components/Newsletter';
import { checklist } from '@/lib/checklist';
import { meta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/checklist',
    title: lang === 'it' ? 'Checklist Pre-Trade in 21 punti (PDF gratuito)' : '21-Point Pre-Trade Checklist (free PDF)',
    description: lang === 'it'
      ? 'Scarica gratis la checklist da usare prima di ogni operazione: contesto, setup, rischio, esecuzione e revisione. Con piano di rischio e modello di diario.'
      : 'Download the free checklist to run before every trade: context, setup, risk, execution and review. With a risk plan and journal template.',
  });
}

export default async function ChecklistLanding({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const c = checklist[lang];
  const gets = it
    ? ['21 controlli in 5 blocchi, da spuntare prima di ogni ordine', 'Il piano di rischio in una pagina, da compilare una volta sola', 'Il modello di diario per misurare la tua expectancy reale', 'Formato stampabile A4, italiano e inglese']
    : ['21 checks in 5 blocks, to tick before every order', 'A one-page risk plan you fill in once', 'A journal template to measure your real expectancy', 'Printable A4 format, English and Italian'];
  return (
    <div className="wrap grid items-start gap-12 py-14 lg:grid-cols-2">
      <div>
        <p className="eyebrow">{it ? 'Download gratuito' : 'Free download'}</p>
        <h1 className="h1 mt-4 !text-4xl sm:!text-5xl">{c.title}</h1>
        <p className="mt-5 text-lg text-soft">
          {it
            ? 'La maggior parte delle perdite evitabili nasce prima dell’ordine: uno stop messo a caso, una posizione troppo grande, un ingresso fatto per noia. Questa checklist chiude quelle falle in novanta secondi.'
            : 'Most avoidable losses are born before the order: a random stop, an oversized position, an entry made out of boredom. This checklist closes those gaps in ninety seconds.'}
        </p>
        <ul className="mt-6 space-y-3 text-soft">
          {gets.map((g) => <li key={g} className="flex gap-3"><span className="text-brand" aria-hidden="true">✓</span>{g}</li>)}
        </ul>
        <div className="card mt-8 p-6"><Newsletter lang={lang} /></div>
      </div>
      <div className="card p-6 sm:p-8" aria-hidden="true">
        <p className="eyebrow">{it ? 'Anteprima' : 'Preview'}</p>
        {c.sections.slice(0, 3).map(([title, items]) => (
          <div key={title} className="mt-5">
            <p className="font-display text-lg">{title}</p>
            <ul className="mt-2 space-y-2 text-sm text-mute">
              {items.slice(0, 2).map((x) => <li key={x} className="flex gap-3"><span className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-line" />{x}</li>)}
              <li className="text-xs text-mute">…</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

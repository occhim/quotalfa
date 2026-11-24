import PrintButton from '@/components/PrintButton';
import { checklist } from '@/lib/checklist';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return { title: checklist[lang].title, robots: { index: false, follow: false } };
}

export default async function ChecklistDownload({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const c = checklist[lang];
  let k = 0;
  return (
    <div className="wrap max-w-4xl py-12">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 rounded-md border border-line bg-panel p-4">
        <p className="text-sm text-soft">{it ? 'Ecco la tua checklist. Stampala o salvala in PDF dal browser.' : 'Here is your checklist. Print it or save it as a PDF from your browser.'}</p>
        <PrintButton label={it ? 'Stampa / Salva PDF' : 'Print / Save PDF'} />
      </div>
      <div className="print-sheet">
        <p className="font-mono text-xs uppercase tracking-widest text-brand">QuotAlfa</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">{c.title}</h1>
        <p className="mt-3 text-lg text-soft">{c.sub}</p>
        <p className="mt-4 text-sm text-mute">{c.how}</p>

        {c.sections.map(([title, items]) => (
          <section key={title} className="mt-8 break-inside-avoid">
            <h2 className="border-b border-line pb-2 font-display text-2xl">{title}</h2>
            <ul className="mt-3 space-y-2.5">
              {items.map((x) => {
                k += 1;
                return (
                  <li key={x} className="flex gap-3 text-sm text-soft">
                    <span className="mt-0.5 h-4 w-4 shrink-0 rounded-sm border border-mute" aria-hidden="true" />
                    <span><span className="num mr-2 text-mute">{String(k).padStart(2, '0')}</span>{x}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="mt-12 break-before-page">
          <h2 className="border-b border-line pb-2 font-display text-2xl">{c.planTitle}</h2>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {c.plan.map(([a, b]) => (
                <tr key={a} className="border-b border-line align-top">
                  <th className="w-2/5 py-3 pr-4 text-left font-normal text-text">{a}</th>
                  <td className="num py-3 text-soft">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-12 break-inside-avoid">
          <h2 className="border-b border-line pb-2 font-display text-2xl">{c.journalTitle}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-xs">
              <thead>
                <tr>{c.journal.map((h) => <th key={h} className="border border-line px-2 py-2 text-left font-normal text-mute">{h}</th>)}</tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, r) => (
                  <tr key={r}>{c.journal.map((h) => <td key={h} className="h-9 border border-line" />)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-mute">{c.journalNote}</p>
        </section>
        <p className="mt-10 text-xs text-mute">{c.disclaimer} · quotalfa</p>
      </div>
    </div>
  );
}

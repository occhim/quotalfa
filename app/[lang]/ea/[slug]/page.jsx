import Link from 'next/link';
import { notFound } from 'next/navigation';
import LeadBand from '@/components/LeadBand';
import { getEAs, getEA, renderEA, statusLabel, backtestRows, forwardRows } from '@/lib/ea';
import { meta } from '@/lib/seo';
import { site } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return site.langs.flatMap((lang) => getEAs(lang).map((e) => ({ lang, slug: e.slug })));
}

const twin = (ea) => getEAs(ea.lang === 'it' ? 'en' : 'it').find((e) => e.id === ea.id);

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const ea = getEA(lang, slug);
  if (!ea) return {};
  const t = twin(ea);
  return meta({
    lang, path: `/ea/${slug}`, alt: t ? `/ea/${t.slug}` : '/ea',
    title: ea.title || ea.name, description: ea.description,
  });
}

function Table({ title, rows, data, lang }) {
  const shown = rows.filter(([k]) => data && data[k] != null && data[k] !== '');
  if (!shown.length) return null;
  return (
    <div className="card p-5">
      <p className="eyebrow mb-3">{title}</p>
      <dl className="divide-y divide-line text-sm">
        {shown.map(([k, itL, enL]) => (
          <div key={k} className="flex justify-between gap-4 py-2">
            <dt className="text-mute">{lang === 'it' ? itL : enL}</dt>
            <dd className="num text-right text-text">{String(data[k])}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function EAPage({ params }) {
  const { lang, slug } = await params;
  const ea = getEA(lang, slug);
  if (!ea) notFound();
  const it = lang === 'it';
  const facts = [
    [it ? 'Piattaforma' : 'Platform', ea.platform],
    [it ? 'Strumento' : 'Instrument', ea.symbol],
    ['Timeframe', ea.timeframe],
    [it ? 'Versione' : 'Version', ea.version],
    [it ? 'Stato' : 'Status', statusLabel[ea.status]?.[lang]],
    [it ? 'Disponibilità' : 'Availability', ea.availability],
    [it ? 'Aggiornato' : 'Updated', ea.updated],
  ].filter(([, v]) => v);

  return (
    <article>
      <header className="wrap pt-12">
        <nav className="text-sm text-mute" aria-label="Breadcrumb">
          <Link href={`/${lang}/ea`} className="hover:text-brand">Expert Advisor</Link> / <span>{ea.name}</span>
        </nav>
        <h1 className="h1 mt-5 max-w-4xl !text-4xl sm:!text-5xl">{ea.title || ea.name}</h1>
        <p className="mt-5 max-w-3xl text-lg text-soft">{ea.description}</p>
        {ea.author && (
          <p className="mt-5 max-w-3xl rounded-md border border-brand/40 bg-panel p-4 text-sm text-soft">
            {it
              ? 'Questo EA è sviluppato dall’autore del sito, Marco Occhipinti. Leggi i risultati tenendo conto del conflitto di interessi.'
              : 'This EA is built by the site’s author, Marco Occhipinti. Read the results with that conflict of interest in mind.'}
          </p>
        )}
      </header>

      <div className="wrap mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0">
          <div className="article" dangerouslySetInnerHTML={{ __html: renderEA(ea) }} />
          <p className="mt-10 rounded-md border border-line bg-panel p-4 text-xs leading-relaxed text-mute">
            {it
              ? 'Backtest e test su conto demo sono simulazioni: non includono tutte le condizioni del mercato reale e non garantiscono risultati futuri. Un EA può perdere tutto il capitale assegnato. I CFD e il forex con leva sono strumenti complessi: la maggior parte dei conti retail perde denaro. Contenuto informativo, non è consulenza finanziaria.'
              : 'Backtests and demo-account tests are simulations: they do not capture every real-market condition and guarantee no future result. An EA can lose all the capital assigned to it. Leveraged CFDs and forex are complex instruments: most retail accounts lose money. Information only, not financial advice.'}
          </p>
        </div>
        <aside className="space-y-6">
          <div className="card p-5">
            <p className="eyebrow mb-3">{it ? 'Scheda' : 'Overview'}</p>
            <dl className="divide-y divide-line text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2">
                  <dt className="text-mute">{k}</dt>
                  <dd className="text-right text-text">{String(v)}</dd>
                </div>
              ))}
            </dl>
            {ea.link && (
              <a href={ea.link} target="_blank" rel="nofollow noopener" className="btn-ghost mt-5 w-full justify-center">
                {ea.linkLabel || (it ? 'Pagina dell’EA' : 'EA page')} →
              </a>
            )}
          </div>
          <Table title="Backtest" rows={backtestRows} data={ea.backtest} lang={lang} />
          <Table title="Forward test" rows={forwardRows} data={ea.forward} lang={lang} />
        </aside>
      </div>

      <div className="wrap mt-16"><LeadBand lang={lang} /></div>
    </article>
  );
}

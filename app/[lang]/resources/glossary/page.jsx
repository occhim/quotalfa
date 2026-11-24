import { glossary } from '@/lib/glossary';
import { meta } from '@/lib/seo';
import { site } from '@/lib/site';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/resources/glossary',
    title: lang === 'it' ? 'Glossario di finanza e trading' : 'Finance and trading glossary',
    description: lang === 'it'
      ? 'I termini essenziali di finanza personale e trading spiegati in modo chiaro: da ATR a win rate, da ETF a Expert Advisor.'
      : 'Essential personal finance and trading terms explained clearly: from ATR to win rate, from ETF to Expert Advisor.',
  });
}

export default async function Glossary({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const terms = glossary(lang);
  const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))];
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'DefinedTermSet', name: it ? 'Glossario QuotAlfa' : 'QuotAlfa glossary',
    url: `${site.url}/${lang}/resources/glossary`,
    hasDefinedTerm: terms.map((t) => ({ '@type': 'DefinedTerm', name: t.term, description: t.def })),
  };
  return (
    <div className="wrap py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="eyebrow">{it ? 'Risorse' : 'Resources'}</p>
      <h1 className="h1 mt-4 !text-4xl sm:!text-5xl">{it ? 'Glossario' : 'Glossary'}</h1>
      <p className="mt-4 max-w-2xl text-soft">{it ? `${terms.length} termini, una definizione operativa ciascuno.` : `${terms.length} terms, one working definition each.`}</p>
      <nav className="mt-8 flex flex-wrap gap-2" aria-label="A–Z">
        {letters.map((l) => <a key={l} href={`#l-${l}`} className="num rounded border border-line px-2.5 py-1 text-sm text-soft hover:border-brand hover:text-brand">{l}</a>)}
      </nav>
      <dl className="mt-10 grid gap-x-10 md:grid-cols-2">
        {terms.map((t, i) => {
          const first = i === 0 || terms[i - 1].term[0].toUpperCase() !== t.term[0].toUpperCase();
          return (
            <div key={t.term} id={first ? `l-${t.term[0].toUpperCase()}` : undefined} className="scroll-mt-24 border-t border-line py-5">
              <dt className="font-display text-xl">{t.term}</dt>
              <dd className="mt-1.5 text-sm text-mute">{t.def}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

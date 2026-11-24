import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import { meta } from '@/lib/seo';
import { pillars } from '@/lib/site';
import LeadBand from '@/components/LeadBand';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/resources',
    title: lang === 'it' ? 'Hub risorse: guide al trading e alla finanza personale' : 'Resource hub: trading and personal finance guides',
    description: lang === 'it'
      ? 'Percorsi di studio ordinati, glossario dei termini finanziari, checklist, calcolatori e la sezione Expert Advisor: tutto il materiale di QuotAlfa in un’unica pagina.'
      : 'Ordered learning paths, a glossary of financial terms, checklists, calculators and the Expert Advisor section: all QuotAlfa material on one page.',
  });
}

export default async function Resources({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const posts = getPosts(lang).sort((a, b) => a.order - b.order);
  const paths = [
    ['fp', it ? 'Percorso 1 — Mettere in ordine le finanze' : 'Path 1 — Put your finances in order',
      it ? 'Dalla liquidità di sicurezza al primo piano di accumulo, fino agli errori mentali che costano rendimento.' : 'From a cash buffer to your first savings plan, through to the mental errors that cost return.'],
    ['trading', it ? 'Percorso 2 — Operare con un sistema' : 'Path 2 — Trade a system',
      it ? 'Quanto rischiare, dove entrare e come capire se le tue regole hanno un vantaggio statistico.' : 'How much to risk, where to enter and how to tell whether your rules have a statistical edge.'],
    ['macro', it ? 'Percorso 3 — Leggere mercati e dati macro' : 'Path 3 — Read markets and macro data',
      it ? 'I dati che muovono i prezzi e come inserirli nella pianificazione della settimana.' : 'The releases that move prices and how to fit them into your weekly plan.'],
  ];
  const kit = it
    ? [['Glossario', 'I termini essenziali di finanza e trading spiegati in due righe.', '/resources/glossary'],
       ['Checklist Pre-Trade', 'Ventuno controlli prima di ogni ordine, più piano di rischio e diario.', '/checklist'],
       ['Calcolatori', 'Posizione, expectancy, interesse composto, drawdown.', '/tools'],
       ['Expert Advisor', 'Schede degli EA per MetaTrader e i sei criteri per valutarli.', '/ea']]
    : [['Glossary', 'Essential finance and trading terms explained in two lines.', '/resources/glossary'],
       ['Pre-Trade Checklist', 'Twenty-one checks before every order, plus a risk plan and journal.', '/checklist'],
       ['Calculators', 'Position size, expectancy, compound interest, drawdown.', '/tools'],
       ['Expert Advisors', 'MetaTrader EA fact sheets and six criteria for assessing them.', '/ea']];

  return (
    <div className="wrap py-14">
      <p className="eyebrow">{it ? 'Hub risorse' : 'Resource hub'}</p>
      <h1 className="h1 mt-4 max-w-3xl !text-4xl sm:!text-5xl">{it ? 'Parti da qui' : 'Start here'}</h1>
      <p className="mt-4 max-w-2xl text-soft">
        {it ? 'Tre percorsi in ordine di lettura e la cassetta degli attrezzi. Segui la sequenza: ogni guida dà per acquisita la precedente.' : 'Three paths in reading order, plus the toolkit. Follow the sequence: each guide builds on the one before.'}
      </p>

      <div className="mt-12 space-y-10">
        {paths.map(([k, title, text]) => (
          <section key={k} className="grid gap-6 border-t border-line pt-8 md:grid-cols-[18rem_1fr]">
            <div>
              <p className="eyebrow">{pillars[k][lang]}</p>
              <h2 className="mt-2 font-display text-2xl tracking-tight">{title}</h2>
              <p className="mt-2 text-sm text-mute">{text}</p>
            </div>
            <ol className="space-y-3">
              {posts.filter((p) => p.pillar === k).map((p, i) => (
                <li key={p.slug}>
                  <Link href={`/${lang}/blog/${p.slug}`} className="card flex items-baseline gap-4 p-4 transition hover:border-brand">
                    <span className="num text-sm text-brand">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-display text-lg leading-snug">{p.title}</span>
                      <span className="num mt-1 block text-xs text-mute">{p.minutes} min</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <h2 className="h2 mt-16">{it ? 'Cassetta degli attrezzi' : 'Toolkit'}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kit.map(([t, d, href]) => (
          <Link key={href} href={`/${lang}${href}`} className="card p-5 transition hover:border-brand">
            <h3 className="font-display text-xl">{t}</h3>
            <p className="mt-2 text-sm text-mute">{d}</p>
          </Link>
        ))}
      </div>
      <div className="mt-16"><LeadBand lang={lang} /></div>
    </div>
  );
}

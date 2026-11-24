import Link from 'next/link';
import { notFound } from 'next/navigation';
import PostCard, { fmtDate } from '@/components/PostCard';
import LeadBand from '@/components/LeadBand';
import { getPosts, getPost, renderPost, card } from '@/lib/posts';
import { meta } from '@/lib/seo';
import { pillars, site } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return site.langs.flatMap((lang) => getPosts(lang).map((p) => ({ lang, slug: p.slug })));
}

const twin = (post) => getPosts(post.lang === 'it' ? 'en' : 'it').find((p) => p.id === post.id);

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const post = getPost(lang, slug);
  if (!post) return {};
  const t = twin(post);
  return meta({
    lang, path: `/blog/${slug}`, alt: t ? `/blog/${t.slug}` : '/blog',
    title: post.title, description: post.description, type: 'article',
  });
}

function ToolCard({ lang }) {
  const it = lang === 'it';
  return (
    <aside className="card not-prose my-10 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between" aria-label={it ? 'Strumenti' : 'Tools'}>
      <div>
        <p className="eyebrow">{it ? 'Strumenti gratuiti' : 'Free tools'}</p>
        <p className="mt-1.5 font-display text-xl">{it ? 'Metti i numeri al posto delle sensazioni' : 'Put numbers where the hunches were'}</p>
        <p className="mt-1.5 max-w-xl text-sm text-mute">
          {it ? 'Position sizing, expectancy, interesse composto e drawdown: quattro calcolatori, nessuna registrazione.' : 'Position sizing, expectancy, compound interest and drawdown: four calculators, no sign-up.'}
        </p>
      </div>
      <Link href={`/${lang}/tools`} className="btn-ghost shrink-0">{it ? 'Apri gli strumenti' : 'Open the tools'} →</Link>
    </aside>
  );
}

export default async function Post({ params }) {
  const { lang, slug } = await params;
  const post = getPost(lang, slug);
  if (!post) notFound();
  const it = lang === 'it';
  const { toc, a, b } = renderPost(post);
  const related = getPosts(lang).filter((p) => p.slug !== slug)
    .sort((x, y) => (y.pillar === post.pillar) - (x.pillar === post.pillar)).slice(0, 3).map(card);
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description,
    datePublished: post.date, dateModified: post.updated || post.date, inLanguage: lang,
    image: `${site.url}${post.cover}`, mainEntityOfPage: `${site.url}/${lang}/blog/${slug}`,
    author: { '@type': 'Organization', name: 'QuotAlfa' }, publisher: { '@type': 'Organization', name: 'QuotAlfa' },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="wrap pt-12">
        <nav className="text-sm text-mute" aria-label="Breadcrumb">
          <Link href={`/${lang}/blog`} className="hover:text-brand">Blog</Link> / <span>{pillars[post.pillar][lang]}</span>
        </nav>
        <h1 className="h1 mt-5 max-w-4xl !text-4xl sm:!text-5xl">{post.title}</h1>
        <p className="mt-5 max-w-3xl text-lg text-soft">{post.description}</p>
        <p className="num mt-5 text-xs text-mute">
          {fmtDate(post.date, lang)} · {post.minutes} min · {it ? 'Redazione QuotAlfa' : 'QuotAlfa editorial team'}
        </p>
        <img src={post.cover} alt={post.coverAlt || ''} width="1200" height="630" className="mt-8 aspect-[1200/630] w-full rounded-lg border border-line object-cover" fetchPriority="high" />
      </header>

      <div className="wrap mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="min-w-0">
          <div className="article" dangerouslySetInnerHTML={{ __html: a }} />
          {b && <ToolCard lang={lang} />}
          {b && <div className="article" dangerouslySetInnerHTML={{ __html: b }} />}
          <p className="mt-10 rounded-md border border-line bg-panel p-4 text-xs leading-relaxed text-mute">
            {it
              ? 'Contenuto a scopo informativo e didattico. Non è consulenza finanziaria personalizzata. Fiscalità e regole variano da paese a paese. Investire e fare trading comporta il rischio di perdere capitale.'
              : 'For information and education only. Not personalised financial advice. Tax and regulation vary by country. Investing and trading carry the risk of losing capital.'}
          </p>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <nav className="card p-5" aria-label={it ? 'Indice' : 'Contents'}>
              <p className="eyebrow mb-3">{it ? 'In questo articolo' : 'In this article'}</p>
              <ul className="space-y-2 text-sm text-soft">
                {toc.map((h) => <li key={h.id}><a href={`#${h.id}`} className="hover:text-brand">{h.text}</a></li>)}
              </ul>
            </nav>
            <Link href={`/${lang}/ea`} className="card block p-5 transition hover:border-brand">
              <p className="eyebrow">Expert Advisor</p>
              <p className="mt-1.5 font-display text-lg">{it ? 'Sistemi automatici, letti con i numeri' : 'Automated systems, read by the numbers'}</p>
              <p className="mt-1.5 text-sm text-mute">{it ? 'Schede, test e il metodo per valutare un EA.' : 'Fact sheets, tests and how to assess an EA.'}</p>
            </Link>
          </div>
        </aside>
      </div>

      <div className="wrap mt-16"><LeadBand lang={lang} /></div>

      <section className="wrap mt-16">
        <h2 className="h2 mb-8">{it ? 'Continua a leggere' : 'Keep reading'}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => <PostCard key={p.slug} post={p} lang={lang} />)}
        </div>
      </section>
    </article>
  );
}

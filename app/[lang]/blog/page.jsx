import PostList from '@/components/PostList';
import { getPosts, card } from '@/lib/posts';
import { meta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/blog',
    title: lang === 'it' ? 'Blog: finanza personale, trading e mercati' : 'Blog: personal finance, trading and markets',
    description: lang === 'it'
      ? 'Articoli su risparmio, investimenti passivi, analisi tecnica, gestione del rischio e lettura dei dati macroeconomici.'
      : 'Articles on saving, passive investing, technical analysis, risk management and reading macroeconomic data.',
  });
}

export default async function Blog({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  return (
    <div className="wrap py-14">
      <p className="eyebrow">Blog</p>
      <h1 className="h1 mt-4 max-w-3xl !text-4xl sm:!text-5xl">{it ? 'Analisi e guide, un argomento alla volta' : 'Analysis and guides, one topic at a time'}</h1>
      <p className="mt-4 max-w-2xl text-soft">
        {it ? 'Tre filoni: mettere in ordine le finanze, operare con un sistema, capire cosa muove i mercati.' : 'Three tracks: put your finances in order, trade a system, understand what moves markets.'}
      </p>
      <div className="mt-10"><PostList posts={getPosts(lang).map(card)} lang={lang} /></div>
    </div>
  );
}

import Link from 'next/link';
import { pillars } from '@/lib/site';

export const fmtDate = (d, lang) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function PostCard({ post, lang, wide = false }) {
  return (
    <Link href={`/${lang}/blog/${post.slug}`}
      className={`card group flex overflow-hidden transition hover:border-brand ${wide ? 'flex-col md:flex-row' : 'flex-col'}`}>
      <img src={post.cover} alt="" width="800" height="420" loading="lazy" decoding="async"
        className={`aspect-[800/420] w-full object-cover ${wide ? 'md:w-1/2' : ''}`} />
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow">{pillars[post.pillar][lang]}</p>
        <h3 className={`mt-2 font-display leading-snug tracking-tight group-hover:text-brand ${wide ? 'text-2xl' : 'text-xl'}`}>{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-mute">{post.description}</p>
        <p className="num mt-auto pt-4 text-xs text-mute">{fmtDate(post.date, lang)} · {post.minutes} min</p>
      </div>
    </Link>
  );
}

'use client';
import { useState } from 'react';
import PostCard from './PostCard';
import { pillars } from '@/lib/site';

export default function PostList({ posts, lang }) {
  const [f, setF] = useState('all');
  const shown = f === 'all' ? posts : posts.filter((p) => p.pillar === f);
  const chip = (k, label) => (
    <button key={k} onClick={() => setF(k)} aria-pressed={f === k}
      className={`rounded-full border px-4 py-1.5 text-sm transition ${f === k ? 'border-brand bg-brand text-ink' : 'border-line text-soft hover:border-brand'}`}>
      {label}
    </button>
  );
  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {chip('all', lang === 'it' ? 'Tutti' : 'All')}
        {Object.entries(pillars).map(([k, v]) => chip(k, v[lang]))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => <PostCard key={p.slug} post={p} lang={lang} />)}
      </div>
    </>
  );
}

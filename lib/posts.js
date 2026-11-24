import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const dir = (lang) => path.join(process.cwd(), 'content', lang);

const slugify = (s) =>
  s.replace(/<[^>]+>/g, '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function getPosts(lang) {
  const today = new Date().toISOString().slice(0, 10);
  return fs.readdirSync(dir(lang))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir(lang), f), 'utf8'));
      const minutes = Math.max(1, Math.round(content.split(/\s+/).length / 200));
      return { cover: `/images/cover-${data.id}.svg`, ...data, slug: f.replace(/\.md$/, ''), lang, minutes, content };
    })
    .filter((p) => p.date <= today)
    .sort((a, b) => (a.date === b.date ? a.order - b.order : a.date < b.date ? 1 : -1));
}

export const getPost = (lang, slug) => getPosts(lang).find((p) => p.slug === slug);

export const card = ({ content, ...rest }) => rest;

export function renderPost(post) {
  let html = marked.parse(post.content);
  const toc = [];
  html = html.replace(/<h2>(.*?)<\/h2>/g, (_, t) => {
    const id = slugify(t);
    toc.push({ id, text: t.replace(/<[^>]+>/g, '') });
    return `<h2 id="${id}">${t}</h2>`;
  });
  html = html.replace(/<img /g, '<img loading="lazy" decoding="async" width="800" height="420" ');
  let idx = -1;
  for (let i = 0; i < 3; i++) {
    idx = html.indexOf('<h2', idx + 1);
    if (idx < 0) break;
  }
  return { toc, a: idx > 0 ? html.slice(0, idx) : html, b: idx > 0 ? html.slice(idx) : '' };
}

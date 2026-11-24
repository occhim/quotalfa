import { getPosts } from '@/lib/posts';
import { getEAs } from '@/lib/ea';
import { site } from '@/lib/site';

export default function sitemap() {
  const statics = ['', '/blog', '/resources', '/resources/glossary', '/tools', '/ea', '/checklist', '/about', '/contact', '/legal'];
  const out = [];
  for (const lang of site.langs) {
    const other = lang === 'it' ? 'en' : 'it';
    for (const p of statics) {
      out.push({
        url: `${site.url}/${lang}${p}`, changeFrequency: p === '' || p === '/blog' ? 'daily' : 'monthly',
        priority: p === '' ? 1 : 0.7,
        alternates: { languages: { [lang]: `${site.url}/${lang}${p}`, [other]: `${site.url}/${other}${p}` } },
      });
    }
    const others = getPosts(other);
    for (const post of getPosts(lang)) {
      const t = others.find((x) => x.id === post.id);
      out.push({
        url: `${site.url}/${lang}/blog/${post.slug}`, lastModified: post.date, changeFrequency: 'monthly', priority: 0.8,
        ...(t ? { alternates: { languages: { [lang]: `${site.url}/${lang}/blog/${post.slug}`, [other]: `${site.url}/${other}/blog/${t.slug}` } } } : {}),
      });
    }
    const otherEAs = getEAs(other);
    for (const ea of getEAs(lang)) {
      const t = otherEAs.find((x) => x.id === ea.id);
      out.push({
        url: `${site.url}/${lang}/ea/${ea.slug}`, lastModified: ea.updated, changeFrequency: 'monthly', priority: 0.8,
        ...(t ? { alternates: { languages: { [lang]: `${site.url}/${lang}/ea/${ea.slug}`, [other]: `${site.url}/${other}/ea/${t.slug}` } } } : {}),
      });
    }
  }
  return out;
}

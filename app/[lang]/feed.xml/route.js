import { getPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export const dynamic = 'force-static';
export const generateStaticParams = () => site.langs.map((lang) => ({ lang }));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET(_req, { params }) {
  const { lang } = await params;
  const items = getPosts(lang).map((p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${site.url}/${lang}/blog/${p.slug}</link>
      <guid>${site.url}/${lang}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T08:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>QuotAlfa</title>
  <link>${site.url}/${lang}</link>
  <description>${esc(site.tagline[lang])}</description>
  <language>${lang}</language>${items}
</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}

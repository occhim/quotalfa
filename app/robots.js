import { site } from '@/lib/site';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/it/checklist/download', '/en/checklist/download'] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}

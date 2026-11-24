import { site } from './site';

export function meta({ lang, path = '', alt, title, description, type = 'website', image }) {
  const other = lang === 'it' ? 'en' : 'it';
  const altPath = alt ?? path;
  const url = `${site.url}/${lang}${path}`;
  const itUrl = `${site.url}/it${lang === 'it' ? path : altPath}`;
  const enUrl = `${site.url}/en${lang === 'en' ? path : altPath}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: enUrl, it: itUrl, 'x-default': enUrl } },
    openGraph: {
      title, description, url, siteName: site.name, type,
      locale: lang === 'it' ? 'it_IT' : 'en_US',
      alternateLocale: other === 'it' ? 'it_IT' : 'en_US',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

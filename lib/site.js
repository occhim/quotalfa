export const site = {
  name: 'QuotAlfa',
  langs: ['en', 'it'],
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
  ).replace(/\/$/, ''),
  tagline: {
    it: 'Finanza personale, trading ed Expert Advisor, misurati sul rischio.',
    en: 'Personal finance, trading and Expert Advisors, measured by risk.',
  },
};

export const pillars = {
  fp: { it: 'Finanza personale', en: 'Personal finance' },
  trading: { it: 'Trading', en: 'Trading' },
  macro: { it: 'Mercati & Macro', en: 'Markets & Macro' },
};

export const nav = [
  { href: '/blog', it: 'Blog', en: 'Blog' },
  { href: '/resources', it: 'Risorse', en: 'Resources' },
  { href: '/tools', it: 'Strumenti', en: 'Tools' },
  { href: '/ea', it: 'Expert Advisor', en: 'Expert Advisors' },
  { href: '/about', it: 'Metodo', en: 'About' },
  { href: '/contact', it: 'Contatti', en: 'Contact' },
];

export const isLang = (l) => site.langs.includes(l);

import Link from 'next/link';
import Logo from './Logo';
import { nav, site } from '@/lib/site';

export default function Footer({ lang }) {
  const it = lang === 'it';
  return (
    <footer className="mt-24 border-t border-line bg-panel">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-mute">{site.tagline[lang]}</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">{it ? 'Sito' : 'Site'}</p>
          <ul className="space-y-2 text-soft">
            {nav.map((n) => (
              <li key={n.href}><Link className="hover:text-brand" href={`/${lang}${n.href}`}>{n[lang]}</Link></li>
            ))}
            <li><Link className="hover:text-brand" href={`/${lang}/resources/glossary`}>{it ? 'Glossario' : 'Glossary'}</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">{it ? 'Trasparenza' : 'Transparency'}</p>
          <ul className="space-y-2 text-soft">
            <li><Link className="hover:text-brand" href={`/${lang}/legal`}>{it ? 'Disclaimer e privacy' : 'Disclaimer & privacy'}</Link></li>
            <li><a className="hover:text-brand" href={`/${lang}/feed.xml`}>RSS</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="wrap py-6 text-xs leading-relaxed text-mute">
          {it
            ? 'I contenuti di QuotAlfa hanno scopo informativo e didattico e non costituiscono consulenza finanziaria né sollecitazione all’investimento. Il trading comporta il rischio di perdere, in tutto o in parte, il capitale. I rendimenti passati, inclusi backtest e test su conto demo, non sono indicativi di quelli futuri. I CFD sono strumenti complessi: la maggior parte dei conti retail perde denaro.'
            : 'QuotAlfa content is for information and education only and is not financial advice or a solicitation to invest. Trading carries the risk of losing some or all of your capital. Past performance, including backtests and demo-account tests, is not indicative of future results. CFDs are complex instruments: most retail accounts lose money.'}
          <span className="mt-2 block">© {new Date().getFullYear()} QuotAlfa · {it ? 'a cura di' : 'published by'} Marco Occhipinti</span>
        </p>
      </div>
    </footer>
  );
}

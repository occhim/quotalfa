import Link from 'next/link';
import Logo from './Logo';
import LangSwitch from './LangSwitch';
import { nav } from '@/lib/site';

export default function Header({ lang }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href={`/${lang}`} aria-label="QuotAlfa — home"><Logo /></Link>
        <nav className="hidden items-center gap-7 text-sm text-soft md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={`/${lang}${n.href}`} className="hover:text-brand">{n[lang]}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch lang={lang} />
          <Link href={`/${lang}/checklist`} className="btn hidden !px-4 !py-2 sm:inline-flex">
            {lang === 'it' ? 'Checklist gratuita' : 'Free checklist'}
          </Link>
        </div>
      </div>
      <nav className="wrap flex gap-5 overflow-x-auto border-t border-line py-2.5 text-sm text-soft md:hidden" aria-label="Mobile">
        {nav.map((n) => (
          <Link key={n.href} href={`/${lang}${n.href}`} className="whitespace-nowrap hover:text-brand">{n[lang]}</Link>
        ))}
      </nav>
    </header>
  );
}

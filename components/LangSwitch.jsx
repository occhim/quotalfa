'use client';
import { usePathname } from 'next/navigation';

export default function LangSwitch({ lang }) {
  const pathname = usePathname() || `/${lang}`;
  const other = lang === 'it' ? 'en' : 'it';
  const fallback = pathname.replace(/^\/(it|en)/, `/${other}`);
  const go = (e) => {
    const link = document.querySelector(`link[rel="alternate"][hreflang="${other}"]`);
    if (link?.href) {
      e.preventDefault();
      window.location.href = link.href;
    }
  };
  return (
    <a href={fallback} onClick={go} hrefLang={other}
      className="rounded border border-line px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-soft hover:border-brand hover:text-brand"
      aria-label={other === 'en' ? 'Switch to English' : 'Passa all’italiano'}>
      {other}
    </a>
  );
}

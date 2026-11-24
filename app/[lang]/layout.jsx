import '../globals.css';
import '../theme.css';
import { Montserrat, Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

const display = Montserrat({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const dynamicParams = false;
export const generateStaticParams = () => site.langs.map((lang) => ({ lang }));

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'QuotAlfa', template: '%s | QuotAlfa' },
  robots: { index: true, follow: true },
};
export const viewport = { themeColor: '#07142A', colorScheme: 'dark' };

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-brand focus:px-3 focus:py-2 focus:text-ink">
          {lang === 'it' ? 'Vai al contenuto' : 'Skip to content'}
        </a>
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}

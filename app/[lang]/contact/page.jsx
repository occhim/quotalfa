import ContactForm from '@/components/ContactForm';
import { meta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/contact',
    title: lang === 'it' ? 'Contatti' : 'Contact',
    description: lang === 'it'
      ? 'Segnala un errore, proponi un argomento o scrivi per una collaborazione con QuotAlfa.'
      : 'Report an error, suggest a topic or write about a partnership with QuotAlfa.',
  });
}

export default async function Contact({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  return (
    <div className="wrap grid gap-12 py-14 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="eyebrow">{it ? 'Contatti' : 'Contact'}</p>
        <h1 className="h1 mt-4 !text-4xl sm:!text-5xl">{it ? 'Scrivici' : 'Write to us'}</h1>
        <p className="mt-5 text-soft">
          {it
            ? 'Hai trovato un errore in un calcolo, vuoi proporre un argomento o parlare di una collaborazione? Usa il modulo.'
            : 'Found an error in a calculation, want to suggest a topic or discuss a partnership? Use the form.'}
        </p>
        <p className="mt-4 rounded-md border border-line bg-panel p-4 text-sm text-mute">
          {it
            ? 'Non rispondiamo a richieste di consigli su singoli investimenti o operazioni: non siamo consulenti finanziari e non conosciamo la tua situazione.'
            : 'We do not answer requests for advice on individual investments or trades: we are not financial advisers and do not know your situation.'}
        </p>
      </div>
      <ContactForm lang={lang} />
    </div>
  );
}

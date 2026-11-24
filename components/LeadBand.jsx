import Newsletter from './Newsletter';

export default function LeadBand({ lang }) {
  const it = lang === 'it';
  return (
    <section className="card relative overflow-hidden p-7 sm:p-10">
      <div className="absolute inset-y-0 left-0 w-1 bg-brand" aria-hidden="true" />
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="eyebrow">{it ? 'Lead magnet · PDF stampabile' : 'Free download · printable PDF'}</p>
          <h2 className="h2 mt-3">{it ? 'La Checklist Pre-Trade in 21 punti' : 'The 21-Point Pre-Trade Checklist'}</h2>
          <p className="mt-3 text-sm text-soft">
            {it
              ? 'Il controllo che fai prima di ogni ordine: contesto, setup, rischio, esecuzione e revisione. Più il piano di rischio in una pagina e il modello di diario.'
              : 'The check you run before every order: context, setup, risk, execution and review. Plus a one-page risk plan and a journal template.'}
          </p>
        </div>
        <Newsletter lang={lang} />
      </div>
    </section>
  );
}

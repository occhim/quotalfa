import { meta } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return meta({
    lang, path: '/legal',
    title: lang === 'it' ? 'Disclaimer e privacy' : 'Disclaimer and privacy',
    description: lang === 'it'
      ? 'Avvertenze sul rischio, trasparenza sugli Expert Advisor pubblicati e informativa sul trattamento dei dati personali del sito QuotAlfa.'
      : 'Risk warnings, transparency on published Expert Advisors and the personal data notice for the QuotAlfa website.',
  });
}

export default async function Legal({ params }) {
  const { lang } = await params;
  const it = lang === 'it';
  const S = it
    ? [
        ['risk', 'Avvertenza sul rischio', [
          'I contenuti di QuotAlfa hanno finalità esclusivamente informativa e didattica. Non costituiscono consulenza in materia di investimenti, raccomandazione personalizzata, ricerca in materia di investimenti né sollecitazione all’investimento.',
          'Investire e fare trading comporta il rischio di perdere, in tutto o in parte, il capitale. Gli strumenti a leva, come CFD, futures e opzioni, possono generare perdite rapide: la maggior parte dei conti retail che negozia CFD perde denaro.',
          'Esempi numerici, simulazioni e risultati dei calcolatori sono ipotetici, non tengono conto della tua situazione e non garantiscono alcun risultato. I rendimenti passati non sono indicativi di quelli futuri. Fiscalità e regole cambiano da paese a paese: verifica sempre quelle che si applicano a te e, prima di decidere, valuta di rivolgerti a un consulente abilitato.',
        ]],
        ['ea', 'Expert Advisor', [
          'Gli Expert Advisor presentati nella sezione dedicata possono essere sviluppati dall’autore del sito, Marco Occhipinti. Quando è così, la scheda lo dichiara: è un conflitto di interessi e va letto come tale.',
          'Backtest e test su conto demo sono simulazioni: non includono tutte le condizioni del mercato reale (slippage, requote, interruzioni, variazioni di spread) e non garantiscono risultati futuri. Un EA può perdere anche tutto il capitale assegnato.',
          'Nessuna scheda è un invito a usare un EA su un conto reale. La scelta dello strumento, della leva e del rischio resta tua.',
        ]],
        ['privacy', 'Privacy e cookie', [
          'Titolare del trattamento ai sensi del Regolamento (UE) 2016/679 (GDPR): Marco Occhipinti, raggiungibile dal modulo contatti del sito.',
          'Dati raccolti: l’indirizzo email che inserisci per ricevere la checklist e la newsletter; nome, email e testo del messaggio che invii dal modulo contatti. Non raccogliamo altri dati personali.',
          'Finalità e base giuridica: invio del materiale richiesto e della newsletter (consenso, revocabile in ogni momento dal link di cancellazione presente in ogni email); risposta ai messaggi (richiesta dell’interessato).',
          'Conservazione: l’email resta in archivio finché non revochi il consenso; i messaggi del modulo contatti per il tempo necessario a rispondere.',
          'Fornitori: il sito è ospitato su Vercel, che conserva anche iscrizioni e messaggi in uno spazio di archiviazione privato nell’Unione Europea.',
          'Cookie: il sito non usa cookie di profilazione né strumenti di tracciamento pubblicitario.',
          'Diritti: puoi chiedere accesso, rettifica, cancellazione dei tuoi dati e opporti al trattamento scrivendo dal modulo contatti. Hai inoltre diritto di proporre reclamo all’autorità di controllo, in Italia il Garante per la protezione dei dati personali.',
        ]],
      ]
    : [
        ['risk', 'Risk warning', [
          'QuotAlfa content is for information and education only. It is not investment advice, a personal recommendation, investment research or a solicitation to invest.',
          'Investing and trading carry the risk of losing some or all of your capital. Leveraged instruments such as CFDs, futures and options can produce rapid losses: most retail accounts trading CFDs lose money.',
          'Numerical examples, simulations and calculator outputs are hypothetical, do not consider your circumstances and guarantee no result. Past performance is not indicative of future results. Tax and regulation differ from country to country: always check the rules that apply to you, and consider consulting a licensed adviser before deciding.',
        ]],
        ['ea', 'Expert Advisors', [
          'Expert Advisors presented in the dedicated section may be developed by the site’s author, Marco Occhipinti. When that is the case, the page says so: it is a conflict of interest and should be read as one.',
          'Backtests and demo-account tests are simulations: they do not capture every real-market condition (slippage, requotes, outages, spread changes) and guarantee no future result. An EA can lose all of the capital assigned to it.',
          'No page is an invitation to run an EA on a live account. The choice of instrument, leverage and risk remains yours.',
        ]],
        ['privacy', 'Privacy and cookies', [
          'Data controller under Regulation (EU) 2016/679 (GDPR): Marco Occhipinti, reachable through the site’s contact form.',
          'Data collected: the email address you enter to receive the checklist and newsletter; the name, email and message you send through the contact form. We collect no other personal data.',
          'Purpose and legal basis: sending the requested material and newsletter (consent, withdrawable at any time via the unsubscribe link in every email); replying to messages (your request).',
          'Retention: your email is kept until you withdraw consent; contact-form messages for as long as needed to reply.',
          'Providers: the site is hosted on Vercel, which also keeps sign-ups and messages in private storage located in the European Union.',
          'Cookies: the site uses no profiling cookies or advertising trackers.',
          'Rights: you may request access, correction or erasure of your data and object to processing via the contact form. You may also lodge a complaint with a data protection authority (for the controller, the Italian Garante per la protezione dei dati personali).',
        ]],
      ];
  return (
    <div className="wrap max-w-3xl py-14">
      <p className="eyebrow">{it ? 'Trasparenza' : 'Transparency'}</p>
      <h1 className="h1 mt-4 !text-4xl sm:!text-5xl">{it ? 'Disclaimer e privacy' : 'Disclaimer and privacy'}</h1>
      {S.map(([id, title, ps]) => (
        <section key={id} id={id} className="mt-12 scroll-mt-24">
          <h2 className="h2">{title}</h2>
          <div className="mt-4 space-y-4 text-soft">{ps.map((p) => <p key={p}>{p}</p>)}</div>
        </section>
      ))}
    </div>
  );
}

'use client';
import { useState } from 'react';

export default function Newsletter({ lang, compact = false }) {
  const it = lang === 'it';
  const [email, setEmail] = useState('');
  const [ok, setOk] = useState(false);
  const [state, setState] = useState('idle');
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!ok) { setErr(it ? 'Serve il consenso per inviarti la checklist.' : 'Consent is required to send you the checklist.'); return; }
    setState('loading'); setErr('');
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'error');
      window.location.href = j.url;
    } catch (e2) {
      setState('idle');
      setErr(e2.message === 'invalid_email'
        ? (it ? 'Controlla l’indirizzo email.' : 'Please check the email address.')
        : (it ? 'Qualcosa non ha funzionato. Riprova.' : 'Something went wrong. Please retry.'));
    }
  }

  return (
    <form onSubmit={submit} className="w-full" noValidate>
      <div className={`flex gap-2 ${compact ? 'flex-col' : 'flex-col sm:flex-row'}`}>
        <label className="sr-only" htmlFor={`em-${compact ? 'c' : 'f'}`}>Email</label>
        <input id={`em-${compact ? 'c' : 'f'}`} type="email" required autoComplete="email" value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder={it ? 'La tua email' : 'Your email'} className="field" />
        <button className="btn whitespace-nowrap" disabled={state === 'loading'}>
          {state === 'loading' ? '…' : it ? 'Scarica la checklist' : 'Get the checklist'}
        </button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-xs text-mute">
        <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-0.5 accent-[#1FD1A5]" />
        <span>
          {it ? 'Acconsento a ricevere la checklist e la newsletter di QuotAlfa. Mi cancello quando voglio. ' : 'I agree to receive the checklist and the QuotAlfa newsletter. I can unsubscribe anytime. '}
          <a className="underline hover:text-brand" href={`/${lang}/legal#privacy`}>Privacy</a>
        </span>
      </label>
      <p role="alert" className="mt-2 min-h-[1.25rem] text-xs text-down">{err}</p>
    </form>
  );
}

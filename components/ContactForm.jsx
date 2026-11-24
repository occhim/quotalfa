'use client';
import { useState } from 'react';

export default function ContactForm({ lang }) {
  const it = lang === 'it';
  const [state, setState] = useState('idle');
  const [msg, setMsg] = useState('');

  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState('loading'); setMsg('');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setState('done');
      setMsg(it ? 'Messaggio inviato. Rispondiamo entro due giorni lavorativi.' : 'Message sent. We reply within two working days.');
      e.target.reset();
    } catch (er) {
      setState('idle');
      setMsg(er.message === 'not_configured'
        ? (it ? 'Il modulo non è ancora collegato a una casella di posta.' : 'The form is not connected to a mailbox yet.')
        : (it ? 'Controlla i campi e riprova.' : 'Please check the fields and retry.'));
    }
  }

  return (
    <form onSubmit={submit} className="card grid gap-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label><span className="label">{it ? 'Nome' : 'Name'}</span><input name="name" required maxLength={80} className="field" autoComplete="name" /></label>
        <label><span className="label">Email</span><input name="email" type="email" required className="field" autoComplete="email" /></label>
      </div>
      <label>
        <span className="label">{it ? 'Argomento' : 'Topic'}</span>
        <select name="topic" className="field">
          <option value="editorial">{it ? 'Segnalazione su un contenuto' : 'Feedback on content'}</option>
          <option value="partnership">{it ? 'Collaborazioni e partnership' : 'Partnerships'}</option>
          <option value="other">{it ? 'Altro' : 'Other'}</option>
        </select>
      </label>
      <label><span className="label">{it ? 'Messaggio' : 'Message'}</span><textarea name="message" required rows={6} maxLength={4000} className="field" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-4">
        <button className="btn" disabled={state === 'loading'}>{state === 'loading' ? '…' : it ? 'Invia' : 'Send'}</button>
        <p role="status" className={`text-sm ${state === 'done' ? 'text-up' : 'text-down'}`}>{msg}</p>
      </div>
    </form>
  );
}

import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// Iscrizione alla newsletter + consegna del lead magnet.
// Ogni iscrizione viene salvata nello store Blob privato "quotalfa-inbox" (cartella subscribers/).
// Se imposti BREVO_API_KEY e BREVO_LIST_ID il contatto viene inviato anche a Brevo.
export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad_request' }, { status: 400 }); }
  const email = String(body.email || '').trim().toLowerCase();
  const lang = body.lang === 'en' ? 'en' : 'it';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }
  const at = new Date().toISOString();
  try {
    await put(`subscribers/${at.slice(0, 10)}/${at.replace(/[:.]/g, '-')}.json`,
      JSON.stringify({ email, lang, source: 'checklist', consent: true, at }),
      { access: 'private', addRandomSuffix: true, contentType: 'application/json' });
  } catch (e) {
    console.error('blob_subscribe_error', e?.message);
  }
  const key = process.env.BREVO_API_KEY;
  const list = Number(process.env.BREVO_LIST_ID);
  if (key && list) {
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: { 'api-key': key, 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ email, listIds: [list], updateEnabled: true, attributes: { LANG: lang, SOURCE: 'checklist' } }),
    });
    if (!r.ok && r.status !== 204) console.error('brevo_error', r.status, await r.text());
  }
  return NextResponse.json({ ok: true, url: `/${lang}/checklist/download` });
}

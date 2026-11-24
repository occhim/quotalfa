import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// Modulo contatti: ogni messaggio viene salvato nello store Blob privato "quotalfa-inbox" (cartella messages/).
// Se imposti RESEND_API_KEY, CONTACT_TO e CONTACT_FROM il messaggio arriva anche per email.
export async function POST(req) {
  let b;
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'bad_request' }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true });
  const name = String(b.name || '').trim().slice(0, 80);
  const email = String(b.email || '').trim().slice(0, 254);
  const message = String(b.message || '').trim().slice(0, 4000);
  const topic = String(b.topic || 'other').slice(0, 40);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
  const at = new Date().toISOString();
  let saved = false;
  try {
    await put(`messages/${at.slice(0, 10)}/${at.replace(/[:.]/g, '-')}.json`,
      JSON.stringify({ name, email, topic, message, at }),
      { access: 'private', addRandomSuffix: true, contentType: 'application/json' });
    saved = true;
  } catch (e) {
    console.error('blob_contact_error', e?.message);
  }
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (RESEND_API_KEY && CONTACT_TO && CONTACT_FROM) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM, to: [CONTACT_TO], reply_to: email,
        subject: `[QuotAlfa] ${topic} - ${name}`,
        text: `Da: ${name} <${email}>\nArgomento: ${topic}\n\n${message}`,
      }),
    });
    if (r.ok) saved = true; else console.error('resend_error', r.status, await r.text());
  }
  if (!saved) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  return NextResponse.json({ ok: true });
}

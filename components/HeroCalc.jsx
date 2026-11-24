'use client';
import { useState } from 'react';
import Link from 'next/link';

const n = (v) => (Number.isFinite(+v) ? +v : 0);

function Input({ id, label, value, onChange, suffix }) {
  return (
    <label htmlFor={id} className="block">
      <span className="label">{label}</span>
      <span className="relative block">
        <input id={id} type="number" inputMode="decimal" step="any" value={value}
          onChange={(e) => onChange(e.target.value)} className="field num pr-10" />
        {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-mute">{suffix}</span>}
      </span>
    </label>
  );
}

export default function HeroCalc({ lang }) {
  const it = lang === 'it';
  const loc = it ? 'it-IT' : 'en-GB';
  const [cap, setCap] = useState(10000);
  const [risk, setRisk] = useState(1);
  const [entry, setEntry] = useState(50);
  const [stop, setStop] = useState(48.2);

  const riskAmt = (n(cap) * n(risk)) / 100;
  const per = Math.abs(n(entry) - n(stop));
  const units = per > 0 ? Math.floor(riskAmt / per) : 0;
  const actual = units * per;
  const value = units * n(entry);
  const share = n(cap) > 0 ? value / n(cap) : 0;
  const fmt = (v, d = 2) => v.toLocaleString(loc, { minimumFractionDigits: d, maximumFractionDigits: d });

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">{it ? 'Calcolatore · position size' : 'Calculator · position size'}</p>
        <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-2 gap-4 p-5">
        <Input id="hc-cap" label={it ? 'Capitale' : 'Account'} value={cap} onChange={setCap} />
        <Input id="hc-risk" label={it ? 'Rischio per trade' : 'Risk per trade'} value={risk} onChange={setRisk} suffix="%" />
        <Input id="hc-entry" label={it ? 'Ingresso' : 'Entry'} value={entry} onChange={setEntry} />
        <Input id="hc-stop" label="Stop loss" value={stop} onChange={setStop} />
      </div>
      <div className="border-t border-line bg-ink/60 px-5 py-5" aria-live="polite">
        <p className="label">{it ? 'Unità da acquistare' : 'Units to buy'}</p>
        <p className="num text-5xl font-medium leading-none text-brand">{units.toLocaleString(loc)}</p>
        <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
          <div>
            <dt className="text-xs text-mute">{it ? 'Perdita se scatta lo stop' : 'Loss if stopped'}</dt>
            <dd className="num mt-1 text-text">{fmt(actual)}</dd>
          </div>
          <div>
            <dt className="text-xs text-mute">{it ? 'Controvalore' : 'Position value'}</dt>
            <dd className="num mt-1 text-text">{fmt(value)}</dd>
          </div>
          <div>
            <dt className="text-xs text-mute">{it ? 'Quota del capitale' : 'Share of account'}</dt>
            <dd className={`num mt-1 ${share > 1 ? 'text-down' : 'text-text'}`}>{fmt(share * 100, 1)}%</dd>
          </div>
        </dl>
        <p className="num mt-5 text-xs text-mute">
          {it ? 'Unità' : 'Units'} = ({it ? 'capitale' : 'account'} × {it ? 'rischio' : 'risk'} %) ÷ |{it ? 'ingresso' : 'entry'} − stop|
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 text-sm">
        <span className="text-mute">{it ? 'Altri 3 calcolatori, senza registrazione' : '3 more calculators, no sign-up'}</span>
        <Link href={`/${lang}/tools`} className="text-brand hover:underline">{it ? 'Apri gli strumenti →' : 'Open the tools →'}</Link>
      </div>
    </div>
  );
}

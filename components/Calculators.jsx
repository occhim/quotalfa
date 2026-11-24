'use client';
import { useState } from 'react';

const n = (v) => (Number.isFinite(+v) ? +v : 0);
const money = (v, lang) => v.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
const pct = (v) => `${(v * 100).toFixed(2)}%`;

function Field({ label, value, onChange, step = 'any', suffix }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <span className="relative block">
        <input type="number" inputMode="decimal" step={step} value={value} onChange={(e) => onChange(e.target.value)} className="field num pr-10" />
        {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-mute">{suffix}</span>}
      </span>
    </label>
  );
}

function Out({ label, value, tone }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0">
      <span className="text-sm text-mute">{label}</span>
      <span className={`num text-base ${tone === 'up' ? 'text-up' : tone === 'down' ? 'text-down' : 'text-text'}`}>{value}</span>
    </div>
  );
}

function Shell({ id, title, intro, children, results }) {
  return (
    <section id={id} className="card scroll-mt-24 p-6 sm:p-7">
      <h3 className="font-display text-2xl tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-mute">{intro}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-4 content-start">{children}</div>
        <div className="rounded-md border border-line bg-ink px-4 py-2" aria-live="polite">{results}</div>
      </div>
    </section>
  );
}

export function PositionSize({ lang }) {
  const it = lang === 'it';
  const [cap, setCap] = useState(10000), [risk, setRisk] = useState(1), [entry, setEntry] = useState(50), [stop, setStop] = useState(48);
  const riskAmt = n(cap) * n(risk) / 100;
  const per = Math.abs(n(entry) - n(stop));
  const units = per > 0 ? riskAmt / per : 0;
  const value = units * n(entry);
  const share = n(cap) > 0 ? value / n(cap) : 0;
  return (
    <Shell id="position-size" title={it ? 'Dimensione della posizione' : 'Position size'}
      intro={it ? 'Quante unità comprare perché, se scatta lo stop, la perdita sia esattamente il rischio che hai deciso.' : 'How many units to buy so that, if the stop is hit, the loss equals the risk you chose.'}
      results={<>
        <Out label={it ? 'Rischio in denaro' : 'Money at risk'} value={money(riskAmt, lang)} />
        <Out label={it ? 'Rischio per unità' : 'Risk per unit'} value={money(per, lang)} />
        <Out label={it ? 'Unità da acquistare' : 'Units to buy'} value={units.toLocaleString(lang === 'it' ? 'it-IT' : 'en-GB', { maximumFractionDigits: 2 })} />
        <Out label={it ? 'Controvalore' : 'Position value'} value={money(value, lang)} />
        <Out label={it ? 'Quota del capitale' : 'Share of capital'} value={pct(share)} tone={share > 1 ? 'down' : undefined} />
      </>}>
      <Field label={it ? 'Capitale' : 'Capital'} value={cap} onChange={setCap} />
      <Field label={it ? 'Rischio per trade' : 'Risk per trade'} value={risk} onChange={setRisk} suffix="%" />
      <Field label={it ? 'Prezzo di ingresso' : 'Entry price'} value={entry} onChange={setEntry} />
      <Field label="Stop loss" value={stop} onChange={setStop} />
    </Shell>
  );
}

export function Expectancy({ lang }) {
  const it = lang === 'it';
  const [wr, setWr] = useState(40), [win, setWin] = useState(2), [loss, setLoss] = useState(1), [trades, setTrades] = useState(100);
  const p = Math.min(Math.max(n(wr) / 100, 0), 1);
  const e = p * n(win) - (1 - p) * n(loss);
  const be = n(win) + n(loss) > 0 ? n(loss) / (n(win) + n(loss)) : 0;
  return (
    <Shell id="expectancy" title={it ? 'Expectancy e rischio/rendimento' : 'Expectancy and risk/reward'}
      intro={it ? 'Quanto vale, in media, ogni trade del tuo sistema espresso in multipli di rischio (R). Costi esclusi.' : 'What each trade of your system is worth on average, in multiples of risk (R). Costs excluded.'}
      results={<>
        <Out label={it ? 'Expectancy per trade' : 'Expectancy per trade'} value={`${e >= 0 ? '+' : ''}${e.toFixed(3)} R`} tone={e > 0 ? 'up' : e < 0 ? 'down' : undefined} />
        <Out label={it ? 'Win rate di pareggio' : 'Breakeven win rate'} value={pct(be)} />
        <Out label={it ? `Risultato atteso su ${n(trades)} trade` : `Expected result over ${n(trades)} trades`} value={`${(e * n(trades)).toFixed(1)} R`} tone={e > 0 ? 'up' : e < 0 ? 'down' : undefined} />
      </>}>
      <Field label="Win rate" value={wr} onChange={setWr} suffix="%" />
      <Field label={it ? 'Numero di trade' : 'Number of trades'} value={trades} onChange={setTrades} step="1" />
      <Field label={it ? 'Vincita media' : 'Average win'} value={win} onChange={setWin} suffix="R" />
      <Field label={it ? 'Perdita media' : 'Average loss'} value={loss} onChange={setLoss} suffix="R" />
    </Shell>
  );
}

export function Compound({ lang }) {
  const it = lang === 'it';
  const [init, setInit] = useState(0), [monthly, setMonthly] = useState(200), [years, setYears] = useState(20), [rate, setRate] = useState(5);
  const m = Math.round(n(years) * 12), r = n(rate) / 100 / 12;
  const growth = Math.pow(1 + r, m);
  const fv = n(init) * growth + (r === 0 ? n(monthly) * m : n(monthly) * (growth - 1) / r);
  const paid = n(init) + n(monthly) * m;
  return (
    <Shell id="compound" title={it ? 'Interesse composto e PAC' : 'Compound interest and savings plan'}
      intro={it ? 'Valore finale di un versamento mensile a un rendimento annuo ipotetico costante. Al lordo di costi, imposte e inflazione.' : 'Final value of a monthly contribution at a constant hypothetical annual return. Before costs, taxes and inflation.'}
      results={<>
        <Out label={it ? 'Totale versato' : 'Total contributed'} value={money(paid, lang)} />
        <Out label={it ? 'Valore finale' : 'Final value'} value={money(fv, lang)} />
        <Out label={it ? 'Di cui rendimento' : 'Of which growth'} value={money(fv - paid, lang)} tone={fv - paid >= 0 ? 'up' : 'down'} />
      </>}>
      <Field label={it ? 'Capitale iniziale' : 'Starting capital'} value={init} onChange={setInit} />
      <Field label={it ? 'Versamento mensile' : 'Monthly contribution'} value={monthly} onChange={setMonthly} />
      <Field label={it ? 'Anni' : 'Years'} value={years} onChange={setYears} step="1" />
      <Field label={it ? 'Rendimento annuo' : 'Annual return'} value={rate} onChange={setRate} suffix="%" />
    </Shell>
  );
}

export function Drawdown({ lang }) {
  const it = lang === 'it';
  const [dd, setDd] = useState(20), [risk, setRisk] = useState(2), [streak, setStreak] = useState(10);
  const d = Math.min(Math.max(n(dd) / 100, 0), 0.9999);
  const need = 1 / (1 - d) - 1;
  const streakDd = 1 - Math.pow(1 - Math.min(n(risk), 100) / 100, Math.max(0, Math.round(n(streak))));
  return (
    <Shell id="drawdown" title={it ? 'Drawdown e recupero' : 'Drawdown and recovery'}
      intro={it ? 'Quanto devi guadagnare per tornare in pari dopo una perdita, e quanto pesa una serie di stop consecutivi.' : 'How much you must gain to get back to even after a loss, and what a losing streak costs.'}
      results={<>
        <Out label={it ? 'Guadagno necessario per il pareggio' : 'Gain needed to break even'} value={pct(need)} tone="down" />
        <Out label={it ? `Drawdown dopo ${Math.round(n(streak))} stop di fila` : `Drawdown after ${Math.round(n(streak))} straight losses`} value={pct(streakDd)} tone="down" />
        <Out label={it ? 'Recupero necessario dopo la serie' : 'Recovery needed after the streak'} value={pct(streakDd < 1 ? 1 / (1 - streakDd) - 1 : 0)} />
      </>}>
      <Field label="Drawdown" value={dd} onChange={setDd} suffix="%" />
      <Field label={it ? 'Rischio per trade' : 'Risk per trade'} value={risk} onChange={setRisk} suffix="%" />
      <Field label={it ? 'Stop consecutivi' : 'Consecutive losses'} value={streak} onChange={setStreak} step="1" />
    </Shell>
  );
}

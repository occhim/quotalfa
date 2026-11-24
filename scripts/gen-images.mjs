// Genera cover (1200x630) e figure (800x420, IT/EN) in public/images. Uso: npm run images
import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.cwd(), 'public', 'images');
fs.mkdirSync(out, { recursive: true });
const C = { bg: '#0A1A33', line: '#1C3558', mute: '#8FA6C2', text: '#EEF3F9', brand: '#1FD1A5', up: '#2BD68F', down: '#FF6B6B', panel: '#12294D' };
const mono = 'font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"';
const rng = (s) => () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="${C.bg}"/>${body}</svg>`;
const grid = (w, h, step) => {
  let s = '';
  for (let x = step; x < w; x += step) s += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${C.line}" stroke-width="1"/>`;
  for (let y = step; y < h; y += step) s += `<line x1="0" y1="${y}" x2="${w}" y2="${h ? y : 0}" stroke="${C.line}" stroke-width="1"/>`;
  return `<g opacity="0.55">${s}</g>`;
};
const tag = (n, label) => `<text x="60" y="70" ${mono} font-size="20" fill="${C.brand}" letter-spacing="3">QUOTALFA / ${n}</text><text x="1140" y="70" text-anchor="end" ${mono} font-size="20" fill="${C.mute}" letter-spacing="3">${label}</text>`;
const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" ${mono} font-size="${o.size || 14}" fill="${o.fill || C.mute}" text-anchor="${o.anchor || 'start'}"${o.weight ? ` font-weight="${o.weight}"` : ''}>${s}</text>`;
const save = (name, s) => fs.writeFileSync(path.join(out, name), s);

/* ---------- COVER ---------- */
const covers = {
  'cover-emergency-fund': () => {
    let b = grid(1200, 630, 90) + tag('01', 'CASH BUFFER');
    for (let i = 0; i < 12; i++) {
      const x = 150 + i * 78, filled = i < 6;
      b += `<rect x="${x}" y="170" width="54" height="340" rx="6" fill="${filled ? C.brand : 'none'}" stroke="${filled ? C.brand : C.mute}" stroke-width="2" opacity="${filled ? 1 - i * 0.09 : 0.5}"/>`;
      b += t(x + 27, 550, String(i + 1).padStart(2, '0'), { anchor: 'middle', size: 18, fill: filled ? C.text : C.mute });
    }
    b += `<line x1="120" y1="140" x2="610" y2="140" stroke="${C.up}" stroke-width="3"/><circle cx="610" cy="140" r="7" fill="${C.up}"/>`;
    return b;
  },
  'cover-etf-savings-plan': () => {
    let b = grid(1200, 630, 90) + tag('02', 'COMPOUNDING');
    const pts = [];
    for (let i = 0; i <= 20; i++) {
      const x = 120 + i * 48, contrib = i * 12, val = 12 * ((Math.pow(1.06, i) - 1) / 0.06);
      b += `<rect x="${x - 14}" y="${540 - contrib * 0.85}" width="28" height="${contrib * 0.85}" fill="${C.panel}" stroke="${C.mute}" stroke-opacity="0.5"/>`;
      pts.push(`${x},${540 - val * 0.85}`);
    }
    b += `<polyline points="${pts.join(' ')}" fill="none" stroke="${C.brand}" stroke-width="5" stroke-linejoin="round"/>`;
    b += `<circle cx="${120 + 20 * 48}" cy="${540 - 12 * ((Math.pow(1.06, 20) - 1) / 0.06) * 0.85}" r="10" fill="${C.brand}"/>`;
    return b;
  },
  'cover-money-biases': () => {
    let b = grid(1200, 630, 90) + tag('03', 'BEHAVIOUR');
    const wave = [], base = [];
    for (let i = 0; i <= 100; i++) {
      const x = 100 + i * 10, trend = 430 - i * 2.1;
      wave.push(`${x},${trend - Math.sin(i / 7.5) * (60 + i * 0.6)}`);
      base.push(`${x},${trend}`);
    }
    b += `<polyline points="${base.join(' ')}" fill="none" stroke="${C.mute}" stroke-width="3" stroke-dasharray="10 10"/>`;
    b += `<polyline points="${wave.join(' ')}" fill="none" stroke="${C.brand}" stroke-width="5" stroke-linejoin="round"/>`;
    [[218, C.up], [453, C.down], [690, C.up], [925, C.down]].forEach(([x, c]) => { b += `<line x1="${x}" y1="120" x2="${x}" y2="560" stroke="${c}" stroke-opacity="0.35" stroke-width="2"/>`; });
    return b;
  },
  'cover-position-sizing': () => {
    let b = tag('04', 'RISK 1%');
    for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
      const hit = r === 6 && c === 3;
      b += `<rect x="${375 + c * 45}" y="${120 + r * 45}" width="37" height="37" rx="4" fill="${hit ? C.down : C.panel}" stroke="${hit ? C.down : C.line}" stroke-width="2"/>`;
    }
    b += `<path d="M150 315 H340" stroke="${C.mute}" stroke-width="2"/><path d="M860 315 H1050" stroke="${C.mute}" stroke-width="2"/>`;
    b += t(150, 300, '100', { size: 44, fill: C.text }) + t(1050, 300, '1', { size: 44, fill: C.down, anchor: 'end' });
    return b;
  },
  'cover-price-action': () => {
    let b = grid(1200, 630, 90) + tag('05', 'STRUCTURE');
    const r = rng(11);
    let p = 420;
    for (let i = 0; i < 44; i++) {
      const drift = i < 14 ? -9 : i < 26 ? 5 : -11, o = p, c = p + drift + (r() - 0.5) * 46;
      const hi = Math.min(o, c) - r() * 22, lo = Math.max(o, c) + r() * 22, col = c < o ? C.up : C.down, x = 90 + i * 24;
      b += `<line x1="${x}" y1="${hi}" x2="${x}" y2="${lo}" stroke="${col}" stroke-width="2"/><rect x="${x - 7}" y="${Math.min(o, c)}" width="14" height="${Math.max(3, Math.abs(c - o))}" fill="${col}"/>`;
      p = c;
    }
    b += `<rect x="60" y="282" width="1080" height="26" fill="${C.brand}" opacity="0.16"/><line x1="60" y1="295" x2="1140" y2="295" stroke="${C.brand}" stroke-width="2" stroke-dasharray="12 8"/>`;
    return b;
  },
  'cover-expectancy': () => {
    let b = grid(1200, 630, 90) + tag('06', 'EXPECTANCY');
    const bars = [[-1, 60], [-0.5, 8], [0, 5], [0.5, 4], [1, 7], [1.5, 6], [2, 22], [2.5, 9], [3, 6], [4, 3]];
    bars.forEach(([rv, n], i) => {
      const x = 150 + i * 92, h = n * 5.8;
      b += `<rect x="${x}" y="${520 - h}" width="64" height="${h}" rx="4" fill="${rv < 0 ? C.down : rv === 0 ? C.mute : C.up}" opacity="${rv < 0 ? 0.9 : 0.85}"/>`;
      b += t(x + 32, 560, `${rv > 0 ? '+' : ''}${rv}R`, { anchor: 'middle', size: 18 });
    });
    b += `<line x1="100" y1="520" x2="1100" y2="520" stroke="${C.mute}" stroke-width="2"/>`;
    return b;
  },
  'cover-macro-calendar': () => {
    let b = tag('07', 'MACRO');
    const hot = { 4: 26, 9: 18, 12: 30, 17: 14, 24: 22, 29: 12 };
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
      const i = r * 7 + c, x = 180 + c * 120, y = 115 + r * 92;
      b += `<rect x="${x}" y="${y}" width="108" height="80" rx="6" fill="${C.panel}" stroke="${C.line}" stroke-width="2"/>`;
      b += t(x + 12, y + 24, String(i + 1).padStart(2, '0'), { size: 15 });
      if (hot[i]) b += `<circle cx="${x + 70}" cy="${y + 48}" r="${hot[i]}" fill="${i === 12 ? C.down : C.brand}" opacity="0.85"/>`;
    }
    return b;
  },
};
for (const [name, fn] of Object.entries(covers)) save(`${name}.svg`, svg(1200, 630, fn()));

/* ---------- FIGURE ---------- */
const frame = (title, sub) => t(40, 46, title, { size: 17, fill: C.text, weight: 600 }) + t(40, 70, sub, { size: 12 });
let DEC = '.';
const hbars = (rows, max, unit, color) => rows.map(([label, v, note], i) => {
  const y = 118 + i * (260 / rows.length), w = (v / max) * 430;
  return t(40, y + 22, label, { size: 13, fill: C.text }) + `<rect x="290" y="${y}" width="${w}" height="32" rx="4" fill="${typeof color === 'function' ? color(i) : color}"/>` +
    t(300 + w, y + 22, `${String(v).replace('.', DEC)}${unit}`, { size: 15, fill: C.text, weight: 600 }) + (note ? t(40, y + 42, note, { size: 11 }) : '');
}).join('');

const pac = (rate) => 200 * (rate === 0 ? 240 : (Math.pow(1 + rate / 12, 240) - 1) / (rate / 12));
const k = (v, lang) => `${Math.round(v / 100) / 10}${lang === 'it' ? ' mila €' : 'k €'}`.replace('.', lang === 'it' ? ',' : '.');

const figs = {
  'fig-emergency-fund': (L) => frame(L ? 'Quanti mesi di spese tenere da parte' : 'How many months of expenses to hold', L ? 'Dipende dalla stabilità del reddito, non dall’importo' : 'It depends on income stability, not on the amount') +
    hbars(L ? [['Due redditi stabili', 3, 'dipendenti a tempo indeterminato'], ['Un solo reddito', 6, 'o famiglia con figli a carico'], ['Reddito variabile', 12, 'autonomi, stagionali, provvigioni']]
      : [['Two stable incomes', 3, 'permanent employees'], ['Single income', 6, 'or household with dependants'], ['Variable income', 12, 'self-employed, seasonal, commission']], 12, L ? ' mesi' : ' months', (i) => [C.up, C.brand, C.down][i]),
  'fig-etf-savings-plan': (L) => {
    let b = frame(L ? '200 € al mese per 20 anni' : '€200 a month for 20 years', L ? 'Rendimento annuo ipotetico costante, al lordo di costi e imposte' : 'Constant hypothetical annual return, before costs and taxes');
    const X = (m) => 60 + (m / 240) * 520, Y = (v) => 370 - (v / 100000) * 270;
    for (let v = 0; v <= 100000; v += 25000) b += `<line x1="60" x2="580" y1="${Y(v)}" y2="${Y(v)}" stroke="${C.line}"/>` + t(52, Y(v) + 4, `${v / 1000}k`, { anchor: 'end', size: 11 });
    for (let y = 0; y <= 20; y += 5) b += t(X(y * 12), 392, `${y}`, { anchor: 'middle', size: 11 });
    [[0, C.mute, L ? 'Versato' : 'Paid in'], [0.04, C.up, '4%'], [0.06, C.brand, '6%']].forEach(([r, c, label]) => {
      const pts = [];
      for (let m = 0; m <= 240; m += 6) pts.push(`${X(m)},${Y(200 * (r === 0 ? m : (Math.pow(1 + r / 12, m) - 1) / (r / 12)))}`);
      b += `<polyline points="${pts.join(' ')}" fill="none" stroke="${c}" stroke-width="3"/>`;
      b += t(596, Y(pac(r)) + 5, `${label} · ${k(pac(r), L ? 'it' : 'en')}`, { size: 13, fill: c, weight: 600 });
    });
    return b + t(320, 410, L ? 'anni' : 'years', { anchor: 'middle', size: 11 });
  },
  'fig-money-biases': (L) => {
    let b = frame(L ? 'Avversione alla perdita' : 'Loss aversion', L ? 'Una perdita pesa circa il doppio di un guadagno di pari importo' : 'A loss weighs roughly twice as much as an equal gain');
    b += `<line x1="100" x2="700" y1="240" y2="240" stroke="${C.mute}"/><line x1="400" x2="400" y1="95" y2="395" stroke="${C.mute}"/>`;
    const g = [], l = [];
    for (let i = 0; i <= 60; i++) { const x = i * 5; g.push(`${400 + x},${240 - Math.pow(x, 0.88) * 0.4}`); l.push(`${400 - x},${240 + 2.25 * Math.pow(x, 0.88) * 0.4}`); }
    b += `<polyline points="${g.join(' ')}" fill="none" stroke="${C.up}" stroke-width="4"/><polyline points="${l.join(' ')}" fill="none" stroke="${C.down}" stroke-width="4"/>`;
    b += t(700, 228, L ? 'guadagno →' : 'gain →', { anchor: 'end', size: 12 }) + t(100, 228, L ? '← perdita' : '← loss', { size: 12 });
    b += t(412, 108, L ? 'soddisfazione' : 'satisfaction', { size: 12 }) + t(412, 392, L ? 'dolore' : 'pain', { size: 12 });
    b += t(690, 168, '+100 €', { size: 14, fill: C.up, weight: 600, anchor: 'end' }) + t(-999, 0, '', { size: 14, fill: C.up, weight: 600 }) + t(200, 378, '−100 €', { size: 14, fill: C.down, weight: 600 });
    return b;
  },
  'fig-position-sizing': (L) => frame(L ? 'Drawdown dopo 10 stop consecutivi' : 'Drawdown after 10 straight losses', L ? 'In base alla percentuale di capitale rischiata per trade' : 'By share of capital risked per trade') +
    hbars([[L ? 'Rischio 1%' : 'Risk 1%', 9.6], [L ? 'Rischio 2%' : 'Risk 2%', 18.3], [L ? 'Rischio 5%' : 'Risk 5%', 40.1], [L ? 'Rischio 10%' : 'Risk 10%', 65.1]], 70, '%', (i) => [C.up, C.brand, C.down, C.down][i]),
  'fig-price-action': (L) => {
    let b = frame(L ? 'Struttura di un trend rialzista' : 'Structure of an uptrend', L ? 'Il trend regge finché l’ultimo minimo crescente non viene rotto' : 'The trend holds until the last higher low is broken');
    const p = [[60, 350], [170, 250], [240, 300], [360, 190], [430, 245], [550, 130], [620, 200], [700, 165], [760, 290]];
    b += `<polyline points="${p.map((q) => q.join(',')).join(' ')}" fill="none" stroke="${C.text}" stroke-width="3" stroke-linejoin="round"/>`;
    [[170, 250, 'H'], [360, 190, 'HH'], [550, 130, 'HH']].forEach(([x, y, s]) => { b += `<circle cx="${x}" cy="${y}" r="5" fill="${C.up}"/>` + t(x, y - 14, s, { anchor: 'middle', fill: C.up, size: 13, weight: 600 }); });
    [[240, 300, 'HL'], [430, 245, 'HL'], [620, 200, 'HL']].forEach(([x, y, s]) => { b += `<circle cx="${x}" cy="${y}" r="5" fill="${C.brand}"/>` + t(x, y + 24, s, { anchor: 'middle', fill: C.brand, size: 13, weight: 600 }); });
    b += `<line x1="620" x2="780" y1="200" y2="200" stroke="${C.down}" stroke-width="2" stroke-dasharray="8 6"/>` + t(778, 318, L ? 'rottura (BOS)' : 'break (BOS)', { anchor: 'end', fill: C.down, size: 13, weight: 600 });
    return b + t(60, 400, L ? 'H = massimo · HH = massimo crescente · HL = minimo crescente' : 'H = high · HH = higher high · HL = higher low', { size: 11 });
  },
  'fig-expectancy': (L) => frame(L ? 'Win rate minimo per andare in pari' : 'Minimum win rate to break even', L ? 'In base al rapporto tra vincita media e perdita media (costi esclusi)' : 'By ratio of average win to average loss (costs excluded)') +
    hbars([['0,5 : 1', 66.7], ['1 : 1', 50], ['2 : 1', 33.3], ['3 : 1', 25]].map(([a, v]) => [`${L ? 'Rendimento/rischio' : 'Reward/risk'} ${L ? a : a.replace(',', '.')}`, v]), 75, '%', (i) => [C.down, C.mute, C.brand, C.up][i]),
  'fig-macro-calendar': (L) => {
    let b = frame(L ? 'Il mese macro tipo' : 'A typical macro month', L ? 'Cadenza abituale delle pubblicazioni: le date esatte cambiano ogni mese' : 'Usual release cadence: exact dates change every month');
    const weeks = L ? ['Settimana 1', 'Settimana 2', 'Settimana 3', 'Settimana 4'] : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    weeks.forEach((w, i) => { b += `<rect x="${40 + i * 182}" y="100" width="170" height="270" rx="6" fill="${C.panel}" stroke="${C.line}"/>` + t(52 + i * 182, 126, w, { size: 12 }); });
    const ev = L
      ? [[0, 'PMI', C.brand], [0, 'Lavoro USA (NFP)', C.down], [1, 'Inflazione USA', C.down], [1, 'Retail sales USA', C.mute], [2, 'Banche centrali*', C.down], [2, 'Inflazione euro', C.brand], [3, 'PIL (trimestrale)', C.brand], [3, 'PCE USA', C.brand]]
      : [[0, 'PMI', C.brand], [0, 'US jobs (NFP)', C.down], [1, 'US inflation', C.down], [1, 'US retail sales', C.mute], [2, 'Central banks*', C.down], [2, 'Euro inflation', C.brand], [3, 'GDP (quarterly)', C.brand], [3, 'US PCE', C.brand]];
    const seen = {};
    ev.forEach(([w, s, c]) => { const n = (seen[w] = (seen[w] || 0) + 1), y = 120 + n * 62; b += `<rect x="${52 + w * 182}" y="${y}" width="146" height="46" rx="4" fill="${C.bg}" stroke="${c}"/>` + `<circle cx="${66 + w * 182}" cy="${y + 23}" r="4" fill="${c}"/>` + t(78 + w * 182, y + 27, s, { size: 10.5, fill: C.text }); });
    return b + t(40, 398, L ? '* Fed e BCE: otto riunioni l’anno ciascuna · rosso = impatto più alto' : '* Fed and ECB: eight meetings a year each · red = highest impact', { size: 11 });
  },
};
for (const [name, fn] of Object.entries(figs)) for (const lang of ['it', 'en']) { DEC = lang === 'it' ? ',' : '.'; save(`${name}-${lang}.svg`, svg(800, 420, fn(lang === 'it'))); }

console.log('PAC 20y: 0%', Math.round(pac(0)), '4%', Math.round(pac(0.04)), '6%', Math.round(pac(0.06)), '| 10y 6%:', Math.round(200 * (Math.pow(1.005, 120) - 1) / 0.005));
console.log('written', fs.readdirSync(out).length, 'files');

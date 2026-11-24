// Crea una cover per ogni articolo che non ne ha gia una in public/images.
// Il motivo e scelto in base all'id dell'articolo: stesso id, stessa immagine.
import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.cwd(), 'public', 'images');
const dir = path.join(process.cwd(), 'content', 'it');
const C = { bg: '#0A1A33', line: '#1C3558', mute: '#8FA6C2', text: '#EEF3F9', brand: '#1FD1A5', up: '#2BD68F', down: '#FF6B6B', panel: '#12294D' };
const hash = (s) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };
const rng = (s) => () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
const LABEL = { fp: 'FINANZA', trading: 'TRADING', macro: 'MACRO' };

const motifs = [
  (r) => { let b = '', p = 330; for (let i = 0; i < 40; i++) { const o = p, c = p + (r() - 0.48) * 70, x = 110 + i * 25, col = c < o ? C.up : C.down; b += `<line x1="${x}" y1="${Math.min(o, c) - r() * 24}" x2="${x}" y2="${Math.max(o, c) + r() * 24}" stroke="${col}" stroke-width="2"/><rect x="${x - 7}" y="${Math.min(o, c)}" width="14" height="${Math.max(3, Math.abs(c - o))}" fill="${col}"/>`; p = Math.min(500, Math.max(160, c)); } return b; },
  (r) => { const pts = []; let y = 470; for (let i = 0; i <= 50; i++) { y = Math.min(520, Math.max(150, y - 5 + (r() - 0.5) * 46)); pts.push(`${100 + i * 20},${y}`); } return `<polygon points="100,540 ${pts.join(' ')} 1100,540" fill="${C.brand}" opacity="0.1"/><polyline points="${pts.join(' ')}" fill="none" stroke="${C.brand}" stroke-width="5" stroke-linejoin="round"/>`; },
  (r) => { let b = ''; for (let i = 0; i < 14; i++) { const h = 60 + r() * 330; b += `<rect x="${130 + i * 68}" y="${530 - h}" width="44" height="${h}" rx="5" fill="${i % 4 === 3 ? C.brand : C.panel}" stroke="${i % 4 === 3 ? C.brand : C.mute}" stroke-opacity="0.6"/>`; } return b; },
  (r) => { let b = ''; for (let i = 0; i < 6; i++) b += `<circle cx="${600 + (r() - 0.5) * 60}" cy="${330 + (r() - 0.5) * 40}" r="${50 + i * 38}" fill="none" stroke="${i === 2 ? C.brand : i === 4 ? C.up : C.line}" stroke-width="${i === 2 ? 5 : 2}"/>`; return b + `<circle cx="600" cy="330" r="12" fill="${C.brand}"/>`; },
  (r) => { let b = ''; for (let i = 0; i < 70; i++) { const x = 120 + r() * 960, y = 150 + r() * 380; b += `<circle cx="${x}" cy="${y}" r="${4 + r() * 12}" fill="${r() > 0.8 ? C.brand : r() > 0.5 ? C.up : C.mute}" opacity="${0.35 + r() * 0.5}"/>`; } return b + `<line x1="120" y1="500" x2="1080" y2="190" stroke="${C.text}" stroke-width="2" stroke-dasharray="10 8"/>`; },
  (r) => { let b = ''; for (let k = 0; k < 3; k++) { const pts = [], a = 40 + r() * 70, f = 5 + r() * 9, base = 230 + k * 110; for (let i = 0; i <= 100; i++) pts.push(`${100 + i * 10},${base + Math.sin(i / f + k) * a}`); b += `<polyline points="${pts.join(' ')}" fill="none" stroke="${[C.brand, C.up, C.mute][k]}" stroke-width="${k === 0 ? 5 : 3}"/>`; } return b; },
];

fs.mkdirSync(out, { recursive: true });
let made = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
  const fm = fs.readFileSync(path.join(dir, f), 'utf8').split('---')[1] || '';
  const get = (k) => (fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]+)"?\\s*$`, 'm')) || [])[1];
  const id = get('id'), pillar = get('pillar') || 'fp';
  if (!id) continue;
  const file = path.basename(get('cover') || `cover-${id}.svg`);
  if (fs.existsSync(path.join(out, file))) continue;
  const h = hash(id), r = rng(h);
  let grid = '';
  for (let x = 90; x < 1200; x += 90) grid += `<line x1="${x}" y1="0" x2="${x}" y2="630" stroke="${C.line}"/>`;
  for (let y = 90; y < 630; y += 90) grid += `<line x1="0" y1="${y}" x2="1200" y2="${y}" stroke="${C.line}"/>`;
  const mono = 'font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="20" letter-spacing="3"';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><rect width="1200" height="630" fill="${C.bg}"/><g opacity="0.55">${grid}</g>${motifs[h % motifs.length](r)}<text x="60" y="70" ${mono} fill="${C.brand}">QUOTALFA</text><text x="1140" y="70" text-anchor="end" ${mono} fill="${C.mute}">${LABEL[pillar] || 'QUOTALFA'}</text></svg>`;
  fs.writeFileSync(path.join(out, file), svg);
  made++;
}
console.log('auto covers:', made);

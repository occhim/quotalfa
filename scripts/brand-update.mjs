// Applies the QuotAlfa brand to the source before each build:
// writes the name as "QuotAlfa" and swaps the old palette for the new one.
// Idempotent: running it on already-updated files changes nothing.
import fs from 'node:fs';
import path from 'node:path';

const roots = ['app', 'components', 'lib', 'scripts'];
const self = path.join('scripts', 'brand-update.mjs');

const colors = {
  '#090c0f': '#07142A',
  '#0d1116': '#0A1A33',
  '#10151a': '#0D2140',
  '#151b22': '#12294D',
  '#1e2731': '#1C3558',
  '#8a96a3': '#8FA6C2',
  '#c3cbd4': '#C9D8EA',
  '#e9edf1': '#EEF3F9',
  '#f2b441': '#1FD1A5',
  '#ffc85c': '#5BE3BF',
  '#35d08a': '#2BD68F',
  '#ff6161': '#FF6B6B',
};

const files = [];
const walk = (p) => {
  const s = fs.statSync(p);
  if (s.isDirectory()) for (const n of fs.readdirSync(p)) walk(path.join(p, n));
  else if (/\.(js|jsx|mjs|css)$/.test(p) && p !== self) files.push(p);
};
for (const r of roots) if (fs.existsSync(r)) walk(r);

let changed = 0;
for (const f of files) {
  const before = fs.readFileSync(f, 'utf8');
  let after = before;
  if (!f.endsWith('.css')) after = after.replace(/Quotalfa/g, 'QuotAlfa');
  for (const [from, to] of Object.entries(colors)) {
    after = after.replace(new RegExp(from, 'gi'), to);
  }
  if (after !== before) { fs.writeFileSync(f, after); changed++; }
}
console.log(`brand-update: ${changed} file(s) updated`);

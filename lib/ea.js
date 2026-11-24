// Schede degli Expert Advisor: un file Markdown per EA e per lingua in content/ea/<lang>/<slug>.md
// Campi del frontmatter: vedi content/ea/README.md
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const dir = (lang) => path.join(process.cwd(), 'content', 'ea', lang);
const str = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v == null ? '' : String(v));

export function getEAs(lang) {
  if (!fs.existsSync(dir(lang))) return [];
  return fs.readdirSync(dir(lang))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir(lang), f), 'utf8'));
      return {
        ...data,
        updated: str(data.updated),
        backtest: data.backtest || null,
        forward: data.forward || null,
        slug: f.replace(/\.md$/, ''),
        lang,
        content,
      };
    })
    .filter((e) => e.id && e.name && e.draft !== true)
    .sort((a, b) => (a.updated < b.updated ? 1 : -1));
}

export const getEA = (lang, slug) => getEAs(lang).find((e) => e.slug === slug);

export const renderEA = (ea) => marked.parse(ea.content || '');

export const statusLabel = {
  development: { it: 'In sviluppo', en: 'In development' },
  demo: { it: 'Forward test su demo', en: 'Demo forward test' },
  live: { it: 'Su conto reale', en: 'On a live account' },
  retired: { it: 'Ritirato', en: 'Retired' },
};

// Righe della tabella metriche: [chiave, etichetta IT, etichetta EN]
export const backtestRows = [
  ['period', 'Periodo', 'Period'],
  ['model', 'Modello dei dati', 'Data model'],
  ['deposit', 'Deposito iniziale', 'Initial deposit'],
  ['risk', 'Rischio per operazione', 'Risk per trade'],
  ['costs', 'Costi inclusi', 'Costs included'],
  ['trades', 'Operazioni', 'Trades'],
  ['winRate', 'Win rate', 'Win rate'],
  ['profitFactor', 'Profit factor', 'Profit factor'],
  ['expectancy', 'Expectancy', 'Expectancy'],
  ['maxDrawdown', 'Drawdown massimo', 'Maximum drawdown'],
  ['netResult', 'Risultato netto', 'Net result'],
];

export const forwardRows = [
  ['start', 'Inizio', 'Start'],
  ['end', 'Fine', 'End'],
  ['account', 'Tipo di conto', 'Account type'],
  ['broker', 'Broker / server', 'Broker / server'],
  ['trades', 'Operazioni', 'Trades'],
  ['maxDrawdown', 'Drawdown massimo', 'Maximum drawdown'],
  ['netResult', 'Risultato netto', 'Net result'],
];

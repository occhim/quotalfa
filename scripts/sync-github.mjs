// Copies the site's source to github.com/occhim/quotalfa on every build,
// so the repository always mirrors what is deployed (with full history).
// Needs the GITHUB_SYNC_TOKEN environment variable on Vercel; without it, it does nothing.
// A failed sync never stops the build.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const token = process.env.GITHUB_SYNC_TOKEN || process.env.GITHUB_SYNK_TOKEN;
const repo = 'occhim/quotalfa';
const branch = 'main';
const skip = new Set(['node_modules', '.next', '.vercel', '.git', 'public']);

const scrub = (s) => String(s || '').split(token || '\u0000').join('***');

function git(args, cwd) {
  return execFileSync('git', args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString();
}

function copyTree(src, dst) {
  for (const name of fs.readdirSync(src)) {
    if (skip.has(name)) continue;
    const from = path.join(src, name);
    const to = path.join(dst, name);
    const st = fs.statSync(from);
    if (st.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyTree(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

function main() {
  if (!token) {
    console.log('sync-github: GITHUB_SYNC_TOKEN not set, skipping');
    return;
  }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'qa-sync-'));
  const remote = `https://x-access-token:${token}@github.com/${repo}.git`;
  git(['clone', '--quiet', remote, dir]);
  let hasBranch = true;
  try { git(['rev-parse', '--verify', '--quiet', `origin/${branch}`], dir); } catch { hasBranch = false; }
  git(hasBranch ? ['checkout', '--quiet', '-B', branch, `origin/${branch}`] : ['checkout', '--quiet', '--orphan', branch], dir);

  for (const name of fs.readdirSync(dir)) {
    if (name !== '.git') fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
  copyTree(process.cwd(), dir);

  git(['add', '-A'], dir);
  const status = git(['status', '--porcelain'], dir).trim();
  if (!status) {
    console.log('sync-github: no changes');
    return;
  }
  const when = new Date().toISOString().replace('T', ' ').slice(0, 16);
  const ref = process.env.VERCEL_URL ? ` (${process.env.VERCEL_URL})` : '';
  git(['-c', 'user.name=QuotAlfa sync', '-c', 'user.email=sync@quotalfa.invalid',
    'commit', '--quiet', '-m', `Deploy ${when} UTC${ref}`], dir);
  git(['push', '--quiet', 'origin', `${branch}:${branch}`], dir);
  console.log(`sync-github: pushed ${status.split('\n').length} change(s) to ${repo}@${branch}`);
}

try {
  main();
} catch (e) {
  console.warn('sync-github: failed, build continues:', scrub(e.stderr || e.message));
}

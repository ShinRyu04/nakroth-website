import { execFileSync, execSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const rootDir = resolve(import.meta.dirname, '..');
const distDir = join(rootDir, 'dist');
const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'));
const targetRepo = process.env.NAKROTH_PAGES_REPO || 'https://github.com/ShinRyu04/Nakroth.git';
const dryRun = process.argv.includes('--dry-run');

console.log(`[deploy:gh-pages] Building Nakroth Website v${pkg.version} (--mode gh-pages)...`);
execSync('npm run build:gh-pages', { cwd: rootDir, stdio: 'inherit' });

if (!existsSync(join(distDir, 'index.html')) || !existsSync(join(distDir, '404.html'))) {
  throw new Error('Expected dist/index.html and dist/404.html after build:gh-pages');
}

if (dryRun) {
  console.log('[deploy:gh-pages] --dry-run OK: dist/ verified for /Nakroth/ GitHub Pages.');
  process.exit(0);
}

const stageDir = mkdtempSync(join(tmpdir(), 'nakroth-gh-pages-'));
try {
  execFileSync('git', ['clone', '--branch', 'gh-pages', '--single-branch', '--depth', '1', targetRepo, stageDir], {
    stdio: 'inherit',
  });
  for (const name of readdirSync(stageDir)) {
    if (name === '.git') continue;
    rmSync(join(stageDir, name), { recursive: true, force: true });
  }
  cpSync(distDir, stageDir, { recursive: true });
  execFileSync('git', ['add', '-A'], { cwd: stageDir, stdio: 'inherit' });
  const status = execFileSync('git', ['status', '--porcelain'], { cwd: stageDir, encoding: 'utf8' }).trim();
  if (!status) {
    console.log('[deploy:gh-pages] No changes to deploy — gh-pages is already up to date.');
  } else {
    execFileSync(
      'git',
      [
        '-c',
        'user.name=Nakroth Builder',
        '-c',
        'user.email=builder@nakroth.local',
        'commit',
        '-m',
        `deploy: Nakroth website v${pkg.version} live on GitHub Pages`,
      ],
      { cwd: stageDir, stdio: 'inherit' },
    );
    execFileSync('git', ['push', 'origin', 'gh-pages'], { cwd: stageDir, stdio: 'inherit' });
    console.log(`[deploy:gh-pages] Deployed v${pkg.version} to ${targetRepo} (gh-pages).`);
  }
} finally {
  rmSync(stageDir, { recursive: true, force: true });
}

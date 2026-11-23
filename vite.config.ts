import { copyFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isGhPages = mode === 'gh-pages';
  return {
    base: process.env.VITE_BASE ?? (isGhPages ? '/Nakroth/' : '/'),
    plugins: [
      react(),
      {
        name: 'gh-pages-spa-fallback',
        closeBundle() {
          if (!isGhPages) return;
          const distDir = resolve(__dirname, 'dist');
          copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'));
          writeFileSync(resolve(distDir, '.nojekyll'), '');
        },
      },
    ],
    build: {
      target: 'es2022',
      sourcemap: false,
    },
  };
});

import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import {execSync} from 'child_process';

export default defineConfig(() => {
  const sha = execSync('git rev-parse --short HEAD').toString().replace(/\n/g, '');

  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
    define: {
      'import.meta.env.APP_VERSION': JSON.stringify(sha),
    },
  };
});

import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    env: loadEnv(process.cwd(), ''),
  },
});

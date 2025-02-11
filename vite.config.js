import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import path from 'path';

export default defineConfig({
  define: {
    global: 'window',
    'process.env': {},
  },
  plugins: [
    react(),
    wasm(),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      '@icr/polyseg-wasm': path.resolve(__dirname, 'node_modules/@icr/polyseg-wasm'),
    },
  },
  worker: {
    format: 'es', // Ensure worker format is ES module
  },
  build: {
    outDir: 'build',
    terserOptions: {
      compress: {
        warnings: false,
      },
    },
    rollupOptions: {
      external: ['@icr/polyseg-wasm'],
      output: {
        format: 'es',
      },
    },
    assetsInlineLimit: 0,
  },
  optimizeDeps: {
    include: ['react-csv'],
  },
  assetsInclude: ['**/*.wasm'],
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src'),
      ],
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  define: {
    global: {}, // Define global for Vite
  },
  build: {
    outDir: 'build', // Change output directory to 'build'
  },
  optimizeDeps: {
    include: ['react-csv'],
  },
});

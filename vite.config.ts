import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Set the output directory
    rollupOptions: {
      input: {
        main: './index.html', // Entry file
      },
      output: {
        // Configure output for SPA routing
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  server: {
    historyApiFallback: true, // Enable SPA routing
  },
});
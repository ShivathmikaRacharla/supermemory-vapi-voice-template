import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from "@cloudflare/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths(),
    viteCommonjs(),
    tailwindcss(),
    cloudflare({
      // Cloudflare plugin options if needed
    }),
    reactRouter(),
  ],
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  ssr: {
    noExternal: ['@supermemory/sdk']
  }
});

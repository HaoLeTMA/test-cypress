import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const fromSrc = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url))

export default defineConfig({
  plugins: [react()],
  // scripts/run-parallel.mjs gives each runner its own cache: a shared one races when deps are re-optimized.
  cacheDir: process.env.VITE_CACHE_DIR ?? 'node_modules/.vite',
  resolve: {
    alias: {
      '@components': fromSrc('components'),
      '@constants': fromSrc('constants'),
      '@features': fromSrc('features'),
      '@interfaces': fromSrc('interfaces'),
      '@locales': fromSrc('locales'),
      '@pages': fromSrc('pages'),
      '@routes': fromSrc('routes'),
      '@store': fromSrc('store'),
      '@test': fromSrc('__test__'),
      '@utils': fromSrc('utils'),
    },
  },
  // Pre-bundled up front so the first Cypress run doesn't reload mid-spec while Vite discovers them.
  optimizeDeps: {
    include: [
      '@hookform/resolvers/zod',
      '@mui/material',
      '@reduxjs/toolkit',
      '@reduxjs/toolkit/query/react',
      'i18next',
      'react-hook-form',
      'react-i18next',
      'react-redux',
      'react-router-dom',
      'zod',
    ],
  },
  server: { port: 5173 },
})

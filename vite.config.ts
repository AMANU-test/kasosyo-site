import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves the site from /<repo-name>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  // `npm run dev` opens the site; --host makes it reachable from a phone on the same Wi-Fi.
  server: { port: 5173, host: true, open: mode === 'pane' ? false : '/' },
}))

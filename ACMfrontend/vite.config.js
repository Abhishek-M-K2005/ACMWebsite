import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'react-markdown',
      'remark-gfm',
      'rehype-slug',
      'rehype-autolink-headings',
    ],
  },
})


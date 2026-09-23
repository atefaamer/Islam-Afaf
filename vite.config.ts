import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build works from any GitHub Pages subpath
// (e.g. https://username.github.io/repo-name/) without extra config.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: true,
    // بيسمح بفتح المعاينة من أي هوست خارجي (بيئات التطوير السحابية زي
    // Arena / Codespaces / Gitpod). الإعداد ده بيأثر على `npm run dev` بس
    // ومش بيدخل في البيلد النهائي.
    allowedHosts: true,
  },
})

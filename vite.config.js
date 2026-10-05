import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://constructoramag.cl',
      generateRobotsTxt: true,
      robots: [{ userAgent: '*', allow: '/' }],
      dynamicRoutes: [
        '/proyectos',
        '/servicios',
        '/nosotros',
        '/contacto'
      ]
    })
  ],
  build: {
    target: 'es2019'
  },
  server: {
    port: 3000
  }
})

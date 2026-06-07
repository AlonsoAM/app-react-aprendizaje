import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Abre el navegador automáticamente al levantar el dev server.
    // El navegador concreto se decide con la variable BROWSER (ver script "dev").
    open: true,
  },
})

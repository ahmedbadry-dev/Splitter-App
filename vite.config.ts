import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/Splitter-App/',
  plugins: [
    tailwindcss(),
  ],
})
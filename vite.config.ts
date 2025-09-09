import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gerador-prompts-veo3/', // IMPORTANTE: coloque o nome do seu repositório aqui
  build: {
    outDir: 'dist',
  }
})

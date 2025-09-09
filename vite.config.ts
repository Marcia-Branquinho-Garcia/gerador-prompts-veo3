import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Se o repositório NO GITHUB se chama "gerador-prompts-veo3", mantenha assim.
// Caso seu repo tenha OUTRO nome, troque aqui para `'/NOME-DO-SEU-REPO/'`.
export default defineConfig({
  plugins: [react()],
  base: '/gerador-prompts-veo3/',
})

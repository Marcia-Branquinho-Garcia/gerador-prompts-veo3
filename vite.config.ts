import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ IMPORTANTE:
// Troque o nome aqui no "base" para o NOME EXATO do seu repositório no GitHub.
// Exemplo: se seu repositório for "gerador-prompts-veo3", mantenha assim.
// Se for outro nome, mude para '/NOME-DO-REPO/'.
export default defineConfig({
  plugins: [react()],
  base: '/gerador-prompts-veo3/',
})

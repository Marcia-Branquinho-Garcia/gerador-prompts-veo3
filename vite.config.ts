import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/gerador-prompts-veo3/', // Substitua pelo nome do seu repositório no GitHub
  build: {
    outDir: 'dist',
  },
});

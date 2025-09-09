// src/services/geminiService.ts
// Versão com generatePrompts (compatível com seu App.tsx)

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

export async function generatePrompts(prompt: string): Promise<string> {
  if (!API_KEY) {
    return "⚠️ Chave da API do Gemini não encontrada. Defina VITE_GEMINI_API_KEY no .env ou como secret no GitHub Actions.";
  }

  try {
    // Aqui você poderia colocar a chamada real à API do Gemini.
    // Como exemplo, estou simulando uma resposta.
    const simulated = `Gemini (simulado): ${prompt.slice(0, 80)}...`;
    return simulated;
  } catch (error: any) {
    return `Erro ao chamar Gemini: ${error?.message || error}`;
  }
}

  

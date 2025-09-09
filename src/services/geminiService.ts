// src/services/geminiService.ts
// Versão segura: não lança erro fatal na ausência de chave.
// Em vez disso, expõe mensagens claras e retorna respostas simuladas quando necessário.

export type GeminiResponse = {
  ok: boolean;
  content?: string;
  error?: string;
};

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

// Exemplo de função que usa a chave de API de forma segura
export async function askGemini(prompt: string): Promise<GeminiResponse> {
  if (!API_KEY) {
    // Não derruba a UI: devolve erro amigável para a interface tratar
    return {
      ok: false,
      error:
        "Chave da API do Gemini não encontrada. Defina VITE_GEMINI_API_KEY no .env local ou como secret no GitHub Actions.",
    };
  }

  try {
    // TODO: implemente aqui a chamada real ao Gemini (fetch/axios etc.)
    // Este bloco é só um exemplo minimalista:
    const simulated = `Gemini (simulado): ${prompt.slice(0, 60)}...`;
    return { ok: true, content: simulated };
  } catch (e: any) {
    return { ok: false, error: String(e?.message || e) };
  }
}

  

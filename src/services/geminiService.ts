import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedPrompts } from '../types';

// 1. Verifica se a chave está carregada
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("❌ Chave de API não encontrada! Verifique o arquivo .env na raiz do projeto.");
}

console.log("✅ Chave de API carregada com sucesso.");

// 2. Inicializa o cliente da API
const ai = new GoogleGenAI({ apiKey });

// 3. Define o schema (sem alterações)
const promptSchema = {
  type: Type.OBJECT,
  properties: {
    prompt_pt: {
      type: Type.STRING,
      description: "Um prompt de vídeo extremamente detalhado em português do Brasil. Deve incluir estilo visual, atmosfera, descrições de cena, ângulos de câmera e movimentos, e detalhes de iluminação. Deve ser narrativo e evocativo."
    },
    prompt_en: {
      type: Type.STRING,
      description: "A tradução exata e fiel do 'prompt_pt' para o inglês."
    },
    prompt_json: {
      type: Type.OBJECT,
      description: "Uma estrutura JSON detalhada para automação da geração de vídeo (ex: VEO).",
      properties: {
        title: {
          type: Type.STRING,
          description: "Um título curto e impactante para o vídeo."
        },
        style: {
          type: Type.STRING,
          description: "O estilo visual geral do vídeo (ex: cinematográfico, 8-bit, aquarela, fotorrealista)."
        },
        scenes: {
          type: Type.ARRAY,
          description: "Uma lista de cenas que compõem o vídeo.",
          items: {
            type: Type.OBJECT,
            properties: {
              description: {
                type: Type.STRING,
                description: "Descrição detalhada do que acontece na cena."
              },
              camera_angle: {
                type: Type.STRING,
                description: "O ângulo da câmera (ex: close-up, plano geral, câmera baixa)."
              },
              lighting: {
                type: Type.STRING,
                description: "A iluminação da cena (ex: luz do entardecer, neon, sombrio)."
              },
              duration_seconds: {
                type: Type.NUMBER,
                description: "Duração aproximada da cena em segundos."
              }
            }
          }
        }
      }
    }
  }
};

// 4. Função principal de geração
export const generatePrompts = async (theme: string): Promise<GeneratedPrompts> => {
  const userPrompt = `
    Com base no seguinte tema, gere os prompts de vídeo conforme o schema JSON solicitado.

    O tema é: "${theme}"

    Instruções:
    1. Crie um prompt em português (prompt_pt) que seja rico, detalhado e inspirador.
    2. Traduza-o fielmente para o inglês (prompt_en).
    3. Estruture os detalhes do vídeo em um formato JSON (prompt_json) claro e útil para um sistema automatizado.
  `;

  console.log("📤 Enviando requisição para a API Gemini...");
  console.log("📝 Tema:", theme);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Mantido conforme sua preferência
      contents: [{ text: userPrompt }], // Formato correto
      config: {
        responseMimeType: "application/json",
        responseSchema: promptSchema,
      },
    });

    // ✅ CORREÇÃO PRINCIPAL: Verificações de segurança para evitar erros de "possibly null"
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error("A API não retornou nenhum candidato de resposta.");
    }

    const firstCandidate = candidates[0];
    if (!firstCandidate.content) {
      throw new Error("O candidato retornado não possui conteúdo.");
    }

    const parts = firstCandidate.content.parts;
    if (!parts || parts.length === 0) {
      throw new Error("O conteúdo do candidato não possui partes.");
    }

    const firstPart = parts[0];
    if (!firstPart.text) {
      throw new Error("A primeira parte do conteúdo não possui texto.");
    }

    const responseText = firstPart.text.trim();
    console.log("📄 Texto bruto da resposta:", responseText);

    if (!responseText) {
      throw new Error("A API retornou uma resposta vazia.");
    }

    const parsedJson = JSON.parse(responseText);
    console.log("✅ JSON parseado com sucesso:", parsedJson);

    return parsedJson as GeneratedPrompts;

  } catch (error) {
    console.error("❌ Erro DETALHADO na chamada da API Gemini:", error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    throw new Error(`Falha na comunicação com a API Gemini: ${errorMessage}`);
  }
};
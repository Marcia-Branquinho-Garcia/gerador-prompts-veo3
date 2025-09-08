/// <reference types="vite/client" />

// 👇 Isso diz ao TypeScript: "Sim, você pode importar arquivos .css, .jpg, .png, etc."
declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

// 👇 Tipagem das variáveis de ambiente
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // 👉 se você tiver mais variáveis no .env, declare aqui também
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

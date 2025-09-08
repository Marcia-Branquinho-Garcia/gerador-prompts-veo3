import React, { useState } from 'react';

interface ThemeInputProps {
  onGenerate: (theme: string) => void;
  isLoading: boolean;
}

const exampleThemes = [
  "Um astronauta descobrindo um oásis alienígena brilhante",
  "Um detetive neon-noir em uma cidade chuvosa do futuro",
  "Uma floresta mágica com animais feitos de luz estelar",
  "Corrida de carros voadores por cânions de Marte"
];

export const ThemeInput: React.FC<ThemeInputProps> = ({ onGenerate, isLoading }) => {
  const [theme, setTheme] = useState<string>('');
  const [selectedExample, setSelectedExample] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeTheme = (theme ?? '').trim(); // ✅ Validação robusta
    if (safeTheme) {
      onGenerate(safeTheme);
    }
  };

  const handleExampleClick = (example: string) => {
    setTheme(example);
    setSelectedExample(example);
    // ✅ Auto-gerar quando clica no exemplo
    onGenerate(example);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto">
      <div className="relative mb-8">
        <textarea
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Ex: Uma cidade futurista em Marte ao entardecer"
          className="w-full h-28 p-4 bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors resize-none disabled:opacity-50"
          disabled={isLoading}
          aria-label="Tema para o vídeo"
        />
      </div>

      <div className="mb-10 text-center">
        <p className="text-sm text-slate-400 mb-8">Sem ideias? Tente um destes temas:</p>
        
        <div className="space-y-6">
          {/* Primeira linha - 2 botões */}
          <div className="flex justify-center gap-8">
            {exampleThemes.slice(0, 2).map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                disabled={isLoading} // ✅ Disabled durante loading
                title="Clique para gerar a partir desta ideia" // ✅ Tooltip
                className={`w-80 px-8 py-6 border-3 rounded-2xl font-medium text-base leading-relaxed transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${
                  selectedExample === example
                    ? 'bg-sky-400 border-sky-400 text-slate-900 shadow-sky-400/30'
                    : 'bg-slate-800/80 border-slate-600 text-slate-300 hover:border-sky-400/60 hover:bg-slate-700/80 hover:text-sky-200'
                }`}
              >
                {example}
              </button>
            ))}
          </div>

          {/* Segunda linha - 2 botões */}
          <div className="flex justify-center gap-8">
            {exampleThemes.slice(2, 4).map((example, index) => (
              <button
                key={index + 2}
                type="button"
                onClick={() => handleExampleClick(example)}
                disabled={isLoading} // ✅ Disabled durante loading
                title="Clique para gerar a partir desta ideia" // ✅ Tooltip
                className={`w-80 px-8 py-6 border-3 rounded-2xl font-medium text-base leading-relaxed transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none ${
                  selectedExample === example
                    ? 'bg-sky-400 border-sky-400 text-slate-900 shadow-sky-400/30'
                    : 'bg-slate-800/80 border-slate-600 text-slate-300 hover:border-sky-400/60 hover:bg-slate-700/80 hover:text-sky-200'
                }`}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botão Gerar Prompts */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading || !theme.trim()}
          className="w-96 bg-slate-800/90 hover:bg-slate-700 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 text-slate-300 hover:text-white font-bold py-5 px-10 rounded-2xl border-3 border-slate-600 hover:border-sky-400/60 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-xl transform hover:-translate-y-1 disabled:transform-none"
          aria-live="polite"
        >
          {isLoading ? (
            <>
              <div className="w-6 h-6 border-3 border-slate-400 border-t-slate-200 rounded-full animate-spin mr-3 inline-block"></div>
              Gerando...
            </>
          ) : (
            'Gerar Prompts'
          )}
        </button>
      </div>
    </form>
  );
};

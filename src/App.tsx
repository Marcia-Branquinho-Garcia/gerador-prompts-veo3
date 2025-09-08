import './App.css';
import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptDisplay } from './components/PromptDisplay';
import { Loader } from './components/Loader';
import { generatePrompts } from './services/geminiService';
import type { GeneratedPrompts } from './types';

function App() {
  const [prompts, setPrompts] = useState<GeneratedPrompts | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>('');

  const handleGenerate = useCallback(async (inputTheme: string) => {
    const safeTheme = (inputTheme ?? '').trim();
    if (!safeTheme) {
      setError('Por favor, insira um tema para gerar os prompts.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrompts(null);

    try {
      const result = await generatePrompts(safeTheme);
      setPrompts(result);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? `Erro ao gerar prompts: ${err.message}`
          : 'Ocorreu um erro desconhecido.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const suggestionThemes = [
    'Um astronauta descobrindo um oásis alienígena brilhante',
    'Um detetive neon-noir em uma cidade chuvosa do futuro',
    'Uma floresta mágica com animais feitos de luz estelar',
    'Corrida de carros voadores por cânions de Marte',
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setTheme(suggestion);
    handleGenerate(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGenerate(theme);
  };

  return (
    <div className="container">
      <Header />

      <main className="main-content">
        <div className="input-section">
          <p>
            Insira um tema abaixo e a IA irá gerar um prompt detalhado em português para sua análise,
            uma versão em inglês para usar em geradores de vídeo e uma estrutura JSON para automações.
          </p>

          {/* Campo de texto */}
          <form onSubmit={handleSubmit}>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Ex: Uma cidade futurista em Marte ao entardecer"
              disabled={isLoading}
            />
            
            <button 
              type="submit" 
              className="generate-button"
              disabled={isLoading || !theme.trim()}
            >
              {isLoading ? 'Gerando...' : 'Gerar Prompts'}
            </button>
          </form>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {isLoading && <Loader />}

        {prompts && !isLoading && (
          <div className="prompt-container">
            <PromptDisplay prompts={prompts} />
          </div>
        )}

        {/* Seção de sugestões com texto centralizado */}
        <div className="suggestions-section">
          <p className="suggestions-title">Sem ideias? Tente um destes temas:</p>
          <div className="suggestions">
            {suggestionThemes.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading}
                title="Clique para gerar a partir desta ideia"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

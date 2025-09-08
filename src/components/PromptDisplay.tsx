import React, { useState } from 'react';
import type { GeneratedPrompts } from '../types';

interface PromptDisplayProps {
  prompts: GeneratedPrompts;
}

const PromptCard: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <div className="prompt-card">
      <div className="prompt-card-header">
        <h3>{title}</h3>
      </div>
      <div className="prompt-card-content">
        <pre>{content}</pre>
      </div>
    </div>
  );
};

const CheckIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="check-icon" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompts }) => {
  const formattedJson = JSON.stringify(prompts.prompt_json, null, 2);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((currentKey) => (currentKey === key ? null : currentKey));
      }, 2000);
    } catch (err) {
      console.error('Falha ao copiar para a área de transferência:', err);
      alert('⚠️ Não foi possível copiar. Por favor, tente novamente ou copie manualmente.');
    }
  };

  const copyActions = [
    { key: 'pt', label: 'Prompt PT', content: prompts.prompt_pt },
    { key: 'en', label: 'Prompt EN', content: prompts.prompt_en },
    { key: 'json', label: 'JSON', content: formattedJson },
  ];

  return (
    <div className="prompts-display">
      {/* Botões de cópia - 3 na mesma linha */}
      <div className="copy-buttons-section">
        <div className="copy-buttons">
          {copyActions.map(({ key, label, content }) => (
            <button
              key={key}
              onClick={() => handleCopy(key, content)}
              disabled={copiedKey === key}
              className={`copy-button ${copiedKey === key ? 'copied' : ''}`}
              title={`Clique para copiar ${label}`}
            >
              {copiedKey === key ? (
                <>
                  <CheckIcon />
                  <span className="button-text">
                    <span className="button-main">Copiado!</span>
                  </span>
                </>
              ) : (
                <span className="button-text">
                  <span className="button-main">Copiar</span>
                  <span className="button-sub">{label}</span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Cards dos prompts */}
      <div className="prompts-cards">
        <PromptCard title="Prompt em Português (Análise)" content={prompts.prompt_pt} />
        <PromptCard title="Prompt em Inglês (Uso)" content={prompts.prompt_en} />
        <PromptCard title="Prompt em JSON (Automação)" content={formattedJson} />
      </div>
    </div>
  );
};

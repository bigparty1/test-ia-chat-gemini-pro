import { useState } from 'react';
import type { FormEvent } from 'react';

/**
 * Props do componente ChatInput
 */
interface ChatInputProps {
  /** Função callback chamada quando o usuário envia uma mensagem */
  onSendMessage: (message: string) => void;
  
  /** Define se o input está desabilitado (usado enquanto aguarda resposta da IA) */
  disabled: boolean;
}

/**
 * Componente de entrada de mensagens do chat.
 * Renderiza um formulário com campo de texto e botão de envio.
 * Desabilita a entrada enquanto aguarda resposta da IA.
 */
export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  // Estado local para armazenar o texto digitado pelo usuário
  const [input, setInput] = useState('');

  /**
   * Manipula o envio do formulário.
   * Previne o comportamento padrão, valida o input e chama a função callback.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Previne o reload da página
    
    // Só envia se houver texto (após remover espaços) e não estiver desabilitado
    if (input.trim() && !disabled) {
      onSendMessage(input.trim()); // Envia o texto sem espaços nas extremidades
      setInput(''); // Limpa o campo de input após enviar
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)} // Atualiza o estado a cada digitação
        placeholder="Digite sua mensagem..."
        disabled={disabled} // Desabilita enquanto aguarda resposta da IA
        autoFocus // Foca automaticamente no campo ao carregar a página
      />
      <button 
        type="submit" 
        disabled={disabled || !input.trim()} // Desabilita se estiver processando ou se não houver texto
      >
        Enviar
      </button>
    </form>
  );
}

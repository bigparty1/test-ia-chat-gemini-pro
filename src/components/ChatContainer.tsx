import { useRef, useEffect } from 'react';
import type { Message } from '../types';
import ChatMessage from './ChatMessage';

/**
 * Props do componente ChatContainer
 */
interface ChatContainerProps {
  /** Array com todas as mensagens do chat (usuário e IA) */
  messages: Message[];
}

/**
 * Componente container principal do chat.
 * Responsável por renderizar a lista de mensagens e fazer scroll automático.
 * Exibe uma mensagem de boas-vindas quando não há mensagens.
 */
export default function ChatContainer({ messages }: ChatContainerProps) {
  // Ref para o elemento no final da lista de mensagens
  // Usado para fazer scroll automático quando novas mensagens são adicionadas
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Effect que rola automaticamente para a última mensagem
   * sempre que o array de mensagens é atualizado
   */
  useEffect(() => {
    // scrollIntoView com behavior: 'smooth' cria uma animação suave de rolagem
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Executa sempre que messages mudar

  return (
    <div className="chat-container">
      {messages.length === 0 ? (
        // Estado vazio: exibe mensagem de boas-vindas quando não há conversas
        <div className="empty-state">
          <p>Comece uma conversa com a IA!</p>
        </div>
      ) : (
        // Renderiza cada mensagem usando o componente ChatMessage
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}
      {/* Elemento invisível usado como âncora para scroll automático */}
      <div ref={messagesEndRef} />
    </div>
  );
}

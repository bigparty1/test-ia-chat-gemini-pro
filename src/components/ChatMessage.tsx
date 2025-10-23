import type { Message } from '../types';

/**
 * Props do componente ChatMessage
 */
interface ChatMessageProps {
  /** Objeto contendo os dados da mensagem a ser exibida */
  message: Message;
}

/**
 * Componente responsável por renderizar uma única mensagem no chat.
 * Exibe o remetente (Você ou IA), horário e conteúdo da mensagem.
 * O estilo visual muda automaticamente baseado no role da mensagem.
 */
export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    // A classe CSS muda dinamicamente: 'message user' ou 'message assistant'
    <div className={`message ${message.role}`}>
      {/* Cabeçalho da mensagem com nome do remetente e horário */}
      <div className="message-header">
        <strong>{message.role === 'user' ? 'Você' : 'IA'}</strong>
        <span className="timestamp">
          {/* Formata o timestamp para exibir apenas a hora (HH:MM:SS) */}
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      {/* Conteúdo textual da mensagem */}
      <div className="message-content">{message.content}</div>
    </div>
  );
}

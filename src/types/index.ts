/**
 * Interface que define a estrutura de uma mensagem no chat.
 * Usada tanto para mensagens do usuário quanto para respostas da IA.
 */
export interface Message {
  /** Identificador único da mensagem (timestamp numérico convertido para string) */
  id: string;
  
  /** Define quem enviou a mensagem: 'user' (usuário) ou 'assistant' (IA) */
  role: 'user' | 'assistant';
  
  /** Conteúdo textual da mensagem */
  content: string;
  
  /** Data e hora em que a mensagem foi criada */
  timestamp: Date;
}

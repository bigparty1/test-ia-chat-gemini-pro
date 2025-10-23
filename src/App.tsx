/**
 * Componente principal da aplicação de Chat com IA.
 * 
 * Este é o componente raiz que gerencia todo o estado da aplicação:
 * - Lista de mensagens (usuário e IA)
 * - Estado de carregamento (enquanto aguarda resposta da IA)
 * - Lógica de envio e recebimento de mensagens
 * 
 * Arquitetura de componentes:
 * App (gerencia estado)
 *  ├── ChatContainer (exibe mensagens)
 *  │    └── ChatMessage (cada mensagem individual)
 *  └── ChatInput (campo de entrada)
 */

import { useState } from 'react';
import ChatContainer from './components/ChatContainer';
import ChatInput from './components/ChatInput';
import type { Message } from './types';
import { sendMessage } from './services/geminiService';
import './styles/App.css';

function App() {
  /**
   * Estado que armazena todas as mensagens da conversa.
   * Inicia como array vazio e cresce conforme usuário e IA conversam.
   */
  const [messages, setMessages] = useState<Message[]>([]);
  
  /**
   * Estado que indica se está aguardando resposta da IA.
   * Usado para desabilitar o input e mostrar indicador de "digitando..."
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Função principal que gerencia o fluxo de envio de mensagem.
   * 
   * Fluxo completo:
   * 1. Cria objeto Message com a mensagem do usuário
   * 2. Adiciona a mensagem do usuário ao estado
   * 3. Marca isLoading como true (desabilita input)
   * 4. Envia mensagem para a API do Gemini
   * 5. Recebe resposta e adiciona ao estado
   * 6. Em caso de erro, exibe mensagem de erro
   * 7. Marca isLoading como false (habilita input novamente)
   * 
   * @param content - Texto digitado pelo usuário
   */
  const handleSendMessage = async (content: string) => {
    // Cria objeto Message para a mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(), // ID único baseado em timestamp
      role: 'user', // Identifica como mensagem do usuário
      content, // Texto da mensagem
      timestamp: new Date(), // Data/hora atual
    };

    // Adiciona mensagem do usuário à lista (de forma imutável)
    setMessages((prev) => [...prev, userMessage]);
    
    // Indica que está processando
    setIsLoading(true);

    try {
      // Envia mensagem para o Gemini e aguarda resposta
      const aiResponse = await sendMessage(content);
      
      // Cria objeto Message para a resposta da IA
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(), // ID diferente da mensagem do usuário
        role: 'assistant', // Identifica como resposta da IA
        content: aiResponse, // Texto retornado pela IA
        timestamp: new Date(),
      };
      
      // Adiciona resposta da IA à lista
      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error) {
      // Em caso de erro, cria uma mensagem de erro como se fosse da IA
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
        timestamp: new Date(),
      };
      
      // Adiciona mensagem de erro à lista
      setMessages((prev) => [...prev, errorMessage]);
      
    } finally {
      // Sempre executa, com ou sem erro
      // Reativa o input para nova mensagem
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Cabeçalho fixo no topo */}
      <header>
        <h1>Chat com IA</h1>
      </header>
      
      {/* Container com scroll que exibe todas as mensagens */}
      <ChatContainer messages={messages} />
      
      {/* Indicador de "digitando..." exibido enquanto aguarda resposta */}
      {isLoading && <div className="loading">IA está digitando...</div>}
      
      {/* Campo de entrada fixo na parte inferior */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}

export default App;


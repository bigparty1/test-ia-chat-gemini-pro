/**
 * Serviço de integração com a API do Google Gemini.
 * Este arquivo é responsável por toda comunicação com a IA do Google.
 * 
 * A biblioteca @google/generative-ai abstrai as chamadas HTTP e fornece
 * uma interface TypeScript amigável para interagir com os modelos Gemini.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Carrega a chave API de duas possíveis fontes:
 * 1. VITE_GEMINI_API_KEY: definida no arquivo .env local
 * 2. VITE_GEMINI_API_KEY_FROM_SYSTEM: variável de ambiente do sistema exposta pelo vite.config.ts
 * 
 * O Vite exige o prefixo VITE_ para expor variáveis de ambiente ao código do cliente.
 */
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY_FROM_SYSTEM;

// Log para debug (útil para verificar se a chave foi carregada corretamente)
console.log('API Key disponível:', apiKey ? 'Sim (começa com: ' + apiKey.substring(0, 10) + '...)' : 'Não');

// Valida se a chave API foi encontrada antes de prosseguir
if (!apiKey) {
  throw new Error('GEMINI_API_KEY não encontrada. Defina a variável de ambiente GEMINI_API_KEY no sistema ou VITE_GEMINI_API_KEY no arquivo .env');
}

/**
 * Inicializa a instância do cliente Google Generative AI.
 * Esta instância será usada para criar e configurar modelos.
 */
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Obtém o modelo específico que será usado para gerar respostas.
 * 
 * gemini-2.0-flash é o modelo mais recente (outubro 2025) que oferece:
 * - Respostas rápidas e eficientes
 * - Baixa latência
 * - Boa qualidade de respostas para conversas gerais
 * 
 * Outros modelos disponíveis:
 * - gemini-1.5-pro: Mais avançado mas com maior latência
 * - gemini-1.5-flash: Versão anterior do flash
 */
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Envia uma mensagem para o modelo Gemini e retorna a resposta.
 * 
 * @param message - Texto da mensagem enviada pelo usuário
 * @returns Promise com o texto da resposta gerada pela IA
 * @throws Error se houver falha na comunicação com a API
 * 
 * Fluxo da função:
 * 1. Chama model.generateContent() com a mensagem do usuário
 * 2. Aguarda a resposta completa da API
 * 3. Extrai o texto da resposta
 * 4. Retorna o texto para ser exibido no chat
 */
export async function sendMessage(message: string): Promise<string> {
  try {
    // Envia a mensagem para o modelo Gemini
    const result = await model.generateContent(message);
    
    // Obtém o objeto de resposta
    const response = await result.response;
    
    // Extrai e retorna apenas o texto da resposta
    return response.text();
  } catch (error) {
    // Log do erro completo no console para debug
    console.error('Error sending message:', error);
    
    // Lança um erro genérico para o componente tratar
    throw new Error('Failed to get response from AI');
  }
}

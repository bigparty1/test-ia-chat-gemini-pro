/**
 * Ponto de entrada da aplicação React.
 * 
 * Este arquivo é responsável por:
 * 1. Encontrar o elemento HTML onde a aplicação será montada (div#root)
 * 2. Criar a raiz do React usando a API moderna createRoot
 * 3. Renderizar o componente App dentro do StrictMode
 * 
 * StrictMode:
 * - Modo de desenvolvimento que ativa verificações e avisos adicionais
 * - Ajuda a identificar problemas potenciais no código
 * - Não afeta o build de produção
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Busca o elemento #root no HTML e cria a raiz da aplicação React
// O operador ! indica ao TypeScript que temos certeza que o elemento existe
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

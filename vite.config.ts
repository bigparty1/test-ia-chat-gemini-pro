/**
 * Configuração do Vite (ferramenta de build).
 * 
 * Este arquivo configura:
 * 1. Plugin do React com suporte ao React Compiler
 * 2. Exposição de variáveis de ambiente do sistema para o código do cliente
 * 
 * React Compiler (babel-plugin-react-compiler):
 * - Otimiza automaticamente componentes React
 * - Reduz re-renderizações desnecessárias
 * - Melhora performance sem precisar usar useMemo/useCallback manualmente
 * 
 * Variáveis de ambiente:
 * - Por padrão, Vite só expõe variáveis com prefixo VITE_
 * - Usamos 'define' para expor GEMINI_API_KEY do sistema como VITE_GEMINI_API_KEY_FROM_SYSTEM
 * - process.env é acessível apenas no servidor (build time), por isso precisamos do define
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Configura o plugin React com suporte ao React Compiler
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']], // Otimizações automáticas
      },
    }),
  ],
  
  /**
   * Define constantes que são substituídas em tempo de build.
   * 
   * Aqui pegamos a variável GEMINI_API_KEY do sistema operacional (process.env)
   * e a exponemos para o código do cliente como VITE_GEMINI_API_KEY_FROM_SYSTEM.
   * 
   * JSON.stringify é necessário pois o valor precisa ser uma string válida em JavaScript.
   */
  define: {
    'import.meta.env.VITE_GEMINI_API_KEY_FROM_SYSTEM': JSON.stringify(process.env.GEMINI_API_KEY),
  },
})

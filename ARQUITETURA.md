# Arquitetura do Projeto - Chat com IA

Este documento explica a arquitetura e decisões técnicas do projeto.

## 📐 Visão Geral

Este é um projeto **React + TypeScript + Vite** que implementa um chat com a IA do Google Gemini. A arquitetura segue o padrão de **componentes funcionais** do React com **hooks** para gerenciamento de estado.

## 🏗️ Estrutura de Componentes

```
App (Estado Global)
 │
 ├─ header (Cabeçalho estático)
 │
 ├─ ChatContainer (Exibe mensagens)
 │   └─ ChatMessage[] (Array de mensagens)
 │       ├─ message-header (Remetente + timestamp)
 │       └─ message-content (Texto)
 │
 ├─ loading (Indicador condicional)
 │
 └─ ChatInput (Campo de entrada)
     ├─ input (Campo de texto)
     └─ button (Botão enviar)
```

## 🔄 Fluxo de Dados

### 1. Envio de Mensagem

```
Usuário digita → ChatInput
                    ↓
             onChange atualiza estado local (input)
                    ↓
             Usuário clica "Enviar" ou pressiona Enter
                    ↓
             handleSubmit previne reload
                    ↓
             onSendMessage(text) callback
                    ↓
             App.handleSendMessage(text)
```

### 2. Processamento no App

```
handleSendMessage recebe texto
        ↓
Cria objeto Message (role: 'user')
        ↓
Adiciona ao estado messages[]
        ↓
Define isLoading = true
        ↓
Chama geminiService.sendMessage(texto)
        ↓
Aguarda resposta assíncrona (await)
        ↓
Cria objeto Message (role: 'assistant')
        ↓
Adiciona resposta ao estado messages[]
        ↓
Define isLoading = false
```

### 3. Renderização

```
Estado messages[] atualiza
        ↓
React detecta mudança (reconciliação)
        ↓
ChatContainer re-renderiza
        ↓
map() cria array de <ChatMessage>
        ↓
useEffect detecta mudança em messages
        ↓
Scroll automático para última mensagem
```

## 🎯 Decisões de Design

### Por que Flexbox?

- **Simples e eficiente** para layout de chat
- **Flex-direction: column** organiza header → mensagens → input
- **Flex: 1** no container de mensagens faz ocupar espaço disponível
- **Flex-shrink: 0** mantém header e input com tamanho fixo

### Por que useState ao invés de useReducer?

- **Estado simples**: apenas array de mensagens e boolean de loading
- **Menos boilerplate**: useState é mais direto para casos simples
- **Fácil de entender**: ideal para projeto educacional

### Por que não Context API?

- **Hierarquia rasa**: apenas 2-3 níveis de componentes
- **Props drilling mínimo**: apenas 1 nível de repasse
- **Overhead desnecessário**: Context seria over-engineering aqui

### Por que separar geminiService.ts?

- **Separação de responsabilidades**: lógica de API isolada
- **Testabilidade**: fácil de mockar em testes
- **Reusabilidade**: pode ser usado em outros componentes
- **Manutenibilidade**: mudanças na API não afetam componentes

## 🔐 Segurança

### Variáveis de Ambiente

```
Sistema Operacional
      ↓
GEMINI_API_KEY (process.env)
      ↓
vite.config.ts (define)
      ↓
VITE_GEMINI_API_KEY_FROM_SYSTEM (import.meta.env)
      ↓
geminiService.ts (código do cliente)
```

**⚠️ IMPORTANTE**: 
- A chave API é exposta no código do cliente (navegador)
- **NÃO use esta abordagem em produção** sem backend
- Em produção, a API Key deve ficar em servidor backend

### Abordagem Recomendada para Produção

```
Cliente (React) → Seu Backend → Google Gemini API
                      ↑
                 API Key aqui
                 (nunca exposta)
```

## 📦 Dependências

### Produção

```json
{
  "react": "^19.1.1",           // UI library
  "react-dom": "^19.1.1",        // Renderização DOM
  "@google/generative-ai": "*"   // SDK Google Gemini
}
```

### Desenvolvimento

```json
{
  "typescript": "~5.9.3",              // Tipagem estática
  "vite": "npm:rolldown-vite@7.1.14",  // Build tool (fork otimizado)
  "@vitejs/plugin-react": "^5.0.4",    // Plugin React para Vite
  "babel-plugin-react-compiler": "*",   // Otimizações automáticas
  "eslint": "^9.36.0"                  // Linter
}
```

## 🚀 Build e Performance

### Vite vs Create React App

| Característica | Vite | CRA |
|----------------|------|-----|
| Tempo de start | ~200ms | ~30s |
| Hot Reload | Instantâneo | 1-3s |
| Build | Rollup | Webpack |
| Tree-shaking | Automático | Configurável |

### React Compiler

Otimizações automáticas que o compilador faz:

1. **Auto-memoização**: Componentes são memoizados automaticamente
2. **Dependency tracking**: Rastreia dependências sem precisar declarar
3. **Eliminação de re-renders**: Reduz renders desnecessários
4. **Code splitting**: Divisão automática de código

**Sem React Compiler:**
```typescript
const ChatMessage = React.memo(({ message }) => {
  return <div>{message.content}</div>
});
```

**Com React Compiler:**
```typescript
// Automático! Não precisa de React.memo
const ChatMessage = ({ message }) => {
  return <div>{message.content}</div>
};
```

## 📊 Gerenciamento de Estado

### Estado Local vs Global

```typescript
// Estado LOCAL (ChatInput)
const [input, setInput] = useState('');
// ✅ Usado apenas pelo próprio componente

// Estado GLOBAL (App)
const [messages, setMessages] = useState<Message[]>([]);
// ✅ Compartilhado entre ChatContainer e usado por App
```

### Imutabilidade

```typescript
// ❌ ERRADO: Mutação direta
messages.push(newMessage);

// ✅ CORRETO: Cópia imutável
setMessages([...messages, newMessage]);

// ✅ CORRETO: Usando função updater
setMessages(prev => [...prev, newMessage]);
```

A função updater é preferível pois garante que estamos trabalhando com o estado mais recente, evitando race conditions.

## 🎨 Estilização

### CSS Modules vs CSS Global

Este projeto usa **CSS Global** pois:
- Aplicação pequena (sem conflitos de nomes)
- Facilita aprendizado (sem sintaxe extra)
- BEM naming evita colisões (`.message.user`, `.message.assistant`)

### Responsividade

```css
/* Adaptativo: usa menor valor */
max-width: min(70%, 600px);

/* Telas pequenas: 70% */
/* Telas grandes: máximo 600px */
```

## 🧪 Pontos de Melhoria (Exercícios)

1. **Adicionar histórico persistente**
   - localStorage para salvar mensagens
   - useEffect para carregar ao iniciar

2. **Implementar markdown**
   - Biblioteca react-markdown
   - Renderizar respostas formatadas da IA

3. **Adicionar streaming**
   - Gemini API suporta resposta em stream
   - Exibir texto sendo digitado em tempo real

4. **Criar backend**
   - Express.js ou Next.js API routes
   - Proteger API Key no servidor

5. **Adicionar autenticação**
   - Firebase Auth
   - Salvar conversas por usuário

6. **Melhorar UX**
   - Skeleton loading
   - Animações com Framer Motion
   - Feedback de erro mais detalhado

7. **Testes**
   - Jest + React Testing Library
   - Mockar geminiService
   - Testar fluxo completo de mensagem

## 📖 Próximos Passos de Aprendizado

1. Estude cada arquivo comentado
2. Experimente modificar componentes
3. Adicione novos recursos
4. Implemente melhorias sugeridas
5. Crie testes unitários
6. Migre para backend

---

**Este documento é parte do projeto educacional para estudo de React/TypeScript com IA** 🎓

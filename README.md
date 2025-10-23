# Chat com IA - Gemini Pro

> Projeto educacional para estudo de integração da API Google Gemini com aplicações React/TypeScript

Um aplicativo de chat simples construído com React, TypeScript, Vite e Google Generative AI. Este projeto demonstra como integrar a API do Google Gemini em uma aplicação web moderna, servindo como material de estudo para desenvolvimento com IA.

## 🎯 Objetivo

Este projeto foi criado como material de estudo para entender:
- Como integrar APIs de IA (Google Gemini) em aplicações Node.js/TypeScript
- Arquitetura de componentes React para chat
- Gerenciamento de estado assíncrono (requisições à IA)
- Configuração de variáveis de ambiente no Vite
- Uso do React Compiler para otimizações automáticas

## 🚀 Tecnologias

- **React 19** - Biblioteca UI com recursos mais recentes
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** (rolldown-vite) - Build tool ultrarrápida
- **React Compiler** - Otimizações automáticas de performance
- **Google Generative AI** - SDK oficial do Google Gemini
- **CSS Flexbox** - Layout responsivo

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Chave de API do Google Gemini ([obtenha aqui](https://makersuite.google.com/app/apikey))

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd test-ia-chat-gemini-pro
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a chave API**

Você tem duas opções:

**Opção A: Usar variável de ambiente do sistema (Recomendado)**
```bash
# Windows (PowerShell)
[System.Environment]::SetEnvironmentVariable('GEMINI_API_KEY', 'sua_chave_aqui', 'User')

# Linux/Mac
export GEMINI_API_KEY=sua_chave_aqui
```

**Opção B: Criar arquivo `.env` local**
```env
VITE_GEMINI_API_KEY=sua_chave_aqui
```

## ▶️ Executando o projeto

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 🏗️ Build para produção

```bash
npm run build      # Gera build otimizado em /dist
npm run preview    # Preview do build de produção
```

## 📁 Estrutura do projeto

```
test-ia-chat-gemini-pro/
├── src/
│   ├── components/              # Componentes React reutilizáveis
│   │   ├── ChatContainer.tsx   # Container de mensagens com scroll
│   │   ├── ChatInput.tsx       # Campo de entrada e botão enviar
│   │   └── ChatMessage.tsx     # Componente de mensagem individual
│   │
│   ├── services/               # Lógica de integração externa
│   │   └── geminiService.ts    # Integração com API Google Gemini
│   │
│   ├── types/                  # Definições TypeScript
│   │   └── index.ts            # Interface Message
│   │
│   ├── styles/                 # Estilos CSS
│   │   └── App.css            # Estilos da aplicação
│   │
│   ├── App.tsx                 # Componente principal (gerencia estado)
│   ├── main.tsx               # Ponto de entrada da aplicação
│   └── index.css              # Estilos globais básicos
│
├── vite.config.ts             # Configuração do Vite
├── tsconfig.json              # Configuração TypeScript
├── package.json               # Dependências e scripts
└── .env                       # Variáveis de ambiente (não commitado)
```

## 🔍 Como funciona

### Fluxo de dados

1. **Usuário digita mensagem** → `ChatInput.tsx`
2. **Mensagem enviada para** → `App.tsx` (via callback `handleSendMessage`)
3. **App.tsx chama** → `geminiService.ts` (envia para API do Google)
4. **Resposta da IA** → Adicionada ao estado de mensagens
5. **ChatContainer.tsx** → Renderiza todas as mensagens
6. **Scroll automático** → Para a última mensagem

### Integração com Gemini API

O arquivo `geminiService.ts` usa a biblioteca `@google/generative-ai`:

```typescript
// Inicializa cliente com chave API
const genAI = new GoogleGenerativeAI(apiKey);

// Seleciona modelo (gemini-2.0-flash)
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Envia mensagem e recebe resposta
const result = await model.generateContent(message);
const response = await result.response;
return response.text();
```

### Modelos disponíveis

- **gemini-2.0-flash** ⚡ (Usado no projeto) - Rápido e eficiente
- **gemini-1.5-pro** 🧠 - Mais avançado, maior contexto
- **gemini-1.5-flash** 💨 - Versão anterior do flash

## 📚 Conceitos estudados

### 1. **Integração com API de IA**
- Autenticação via API Key
- Requisições assíncronas com async/await
- Tratamento de erros de rede

### 2. **Gerenciamento de Estado React**
- useState para mensagens e loading
- Atualizações imutáveis de estado
- Estado assíncrono (aguardar resposta da IA)

### 3. **Componentes React**
- Composição de componentes
- Props e TypeScript interfaces
- Refs para manipulação do DOM (scroll)

### 4. **Hooks React**
- useState (estado local)
- useEffect (side effects)
- useRef (referência DOM)

### 5. **Variáveis de Ambiente no Vite**
- Prefixo `VITE_` para exposição ao cliente
- `import.meta.env` para acesso
- Configuração `define` para variáveis do sistema

### 6. **TypeScript**
- Interfaces para tipagem de dados
- Type safety em props e estados
- Tipos para eventos (FormEvent)

## 🎨 Customização

### Alterar modelo da IA

Edite `src/services/geminiService.ts`:
```typescript
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-pro' // ou outro modelo
});
```

### Alterar cores do tema

Edite `src/styles/App.css`:
```css
header {
  background: #4285f4; /* Cor do cabeçalho */
}

.message.user {
  background: #4285f4; /* Cor das mensagens do usuário */
}
```

## 🐛 Troubleshooting

**Erro 404 ao enviar mensagem**
- Verifique se a chave API está correta
- Confirme que o modelo existe (gemini-2.0-flash)
- Verifique console do navegador para logs

**Variável de ambiente não carregada**
- Reinicie o servidor Vite após alterar .env
- Verifique o prefixo VITE_ no nome da variável
- No Windows, variáveis do sistema precisam reiniciar o terminal

**TypeScript errors**
- Execute `npm install` para garantir todas as dependências
- Verifique se há erros no console do VS Code

## 📖 Recursos de aprendizado

- [Documentação Google Gemini API](https://ai.google.dev/docs)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📝 Licença

Este é um projeto educacional de código aberto para fins de estudo.

---

**Feito para estudo de integração de IA com React/TypeScript** 🚀
])
```

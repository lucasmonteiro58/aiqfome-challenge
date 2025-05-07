# 🍔 Aiqfome - Desafio Técnico Front-end (Next.js + React)

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Front-end na L2L Aiqfome. A proposta é entregar uma aplicação **mobile-first** que simula uma experiência de pedido de produtos em restaurantes, utilizando **React com Next.js 15** e foco em **performance, organização e usabilidade**.

## 🔗 Link do projeto:
[Acesse aqui](https://aiqfome-challenge-nine.vercel.app/)

## 📱 Visão Geral

A aplicação permite:

- 📂 Listar produtos por categoria com título, imagem, preço e review.
- 🛒 Adicionar produtos a um *ticket* (carrinho de compras).
- 📄 Visualizar o ticket com subtotal e botão de pagamento.
- 💾 Persistir os dados localmente (inclusive com recarregamento da página).
- ✅ Validar customizações obrigatórias (mínimo e máximo por grupo).
- 📏 Garantir layout fluido e responsivo para dispositivos móveis, com visual inspirado no app real do Aiqfome.

---

## 🚀 Tecnologias e Estratégias

### ✅ **Next.js 15 App Router + Server Components**
- Utilização de **Server Components** para carregamento inicial mais leve e rápido.
- Páginas otimizadas para mobile com renderização parcial no servidor sempre que possível.
- Utilização do `Link` do Next.js para navegação entre páginas, garantindo pré-carregamento e otimização de performance.
- Uso de `Image` do Next.js para otimização de imagens, garantindo carregamento rápido e responsivo.

### ⚛️ **Zustand com Persistência**
- Gerenciador de estado simples, porém poderoso, com persistência via `localStorage`.
- Permite salvar o carrinho mesmo após atualizar a página.

### 🎨 **Tailwind CSS e Shadcn UI**
- Uso extensivo para estilização responsiva e consistente.
- Mobile-first, com adaptação fluida a diferentes larguras de tela.
- Componentes estilizados com Shadcn UI para garantir uma aparência moderna e acessível.

### 🧠 **Organização de Componentes e Hooks**
- Componentes reutilizáveis e acessíveis como `ProductCard`, `TicketButton`, `QuantityCustomization`, entre outros.
- Hooks organizados para isolar lógicas de interação e validação.

### 📦 **Dados Mockados**
- Produtos e restaurantes mockados em arquivos `.json`, simulando uma estrutura realista.

### 🧪 **Testes**
- Testes unitários e de integração com Jest e React Testing Library.

### 🔗 **Deep Links**
- Implementação de links diretos para produtos específicos, permitindo acesso direto a partir de URLs.
- Exemplo: `https://aiqfome-challenge-nine.vercel.app/restaurante/matsuri-concept/ceviche-salmao` leva diretamente à página do produto.

---

## 🧩 Funcionalidades Extras Implementadas

- ✅ Validação completa das customizações (`min` e `max`) com mensagens de erro inline por grupo.
- 🧠 Estado do carrinho armazena:
  - Produto selecionado
  - Restaurante correspondente
  - Quantidade
  - Customizações selecionadas (com tipos tipados)
  - Observação do item

---

## 📁 Estrutura de Pastas

\`\`\`
app/
  └── [restaurant]/[product] – Página dinâmica do produto com customizações
  └── ticket – Visualização do carrinho
components/
  └── cart/ – Componentes do carrinho
  └── product/ – Componentes da página de produto
  └── restaurant/ – Componentes da página de restaurante
  └── ui/ – Componentes reutilizáveis (botões, inputs, etc.)
stores/
  └── cart.store.ts – Store com Zustand + persistência
  └── favorites.store.ts – Store com Zustand + persistência (Salvamento de favoritos)
  └── validation.store.ts – Store com Zustand + persistência (Validação de customizações)
lib/
  └── utils.ts – Funções auxiliares, como cálculo de subtotal
\`\`\`

---

## ▶️ Como rodar o projeto

1. Clone o repositório:
   \`\`\`bash
   git clone https://github.com/lucasmonteiro58/aiqfome-challenge.git
   cd aiqfome-desafio
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Rode o servidor de desenvolvimento:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Acesse:
   \`\`\`
   http://localhost:3000
   \`\`\`

---

## 💬 Considerações Finais

- Todos os requisitos obrigatórios foram implementados.
- A validação das customizações respeita limites mínimos e máximos.
- O foco foi entregar uma experiência fluida, com carregamento rápido e código limpo.
- A arquitetura foi pensada para escalar facilmente, com separação de responsabilidades e tipagem clara em TypeScript.

---

📫 Em caso de dúvidas, estou à disposição!

Desenvolvido com 💜 por [Lucas Monteiro](https://lucasmonteiro.dev)

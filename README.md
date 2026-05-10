# BRPG - Virtual Tabletop

Um assistente virtual de mesa para criação de personagens e gerenciamento de campanhas de D&D.

## 🎨 Sistema de Design

### Cores (CSS Custom Properties)

```css
:root {
  /* Surface (Obsidiana) */
  --surface: #131314;
  --surface-dim: #131314;
  --surface-bright: #39393A;
  --surface-container-lowest: #0E0E0F;
  --surface-container-low: #1C1B1C;
  --surface-container: #201F20;
  --surface-container-high: #2A2A2B;
  --surface-container-highest: #353436;

  /* On Surface */
  --on-surface: #E5E2E3;
  --on-surface-variant: #D4C5AB;

  /* Outline */
  --outline: #9C8F78;
  --outline-variant: #504532;

  /* Primary (Tocha Amber) */
  --primary: #FFE2AB;
  --primary-amber: #FFBF00;
  --on-primary: #402D00;
  --primary-container: #FFBF00;
  --on-primary-container: #6D5000;

  /* Secondary (Dragão Crimson) */
  --secondary: #FFB3AF;
  --on-secondary: #68000D;
  --secondary-container: #9D0018;
  --on-secondary-container: #FF9E99;

  /* Tertiary (Ouro) */
  --tertiary: #FAE685;
  --on-tertiary: #393000;
  --tertiary-container: #DDCA6C;
  --on-tertiary-container: #615400;

  /* Accent (Metal Bronze) */
  --accent: #C5B358;
}
```

### Tipografia

| Estilo | Fonte | Tamanho | Weight |
|--------|-------|---------|--------|
| Headline XL | Newsreader | 3rem (48px) | 700 |
| Headline LG | Newsreader | 2rem (32px) | 600 |
| Headline MD | Newsreader | 1.5rem (24px) | 600 |
| Stat Display | Manrope | 2.25rem (36px) | 800 |
| Body LG | Manrope | 1.125rem (18px) | 400 |
| Body MD | Manrope | 1rem (16px) | 400 |
| Label Caps | Inter | 0.75rem (12px) | 700 |

### Espaçamento (base 8px)

| Nome | Valor |
|------|-------|
| xs | 0.5rem (8px) |
| sm | 0.75rem (12px) |
| md | 1rem (16px) |
| lg | 1.5rem (24px) |
| xl | 2rem (32px) |
| 2xl | 3rem (48px) |

### Border Radius

| Nome | Valor |
|------|-------|
| sm | 0.125rem (2px) |
| DEFAULT | 0.25rem (4px) |
| md | 0.375rem (6px) |
| lg | 0.5rem (8px) |
| xl | 0.75rem (12px) |

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/
│   │   ├── basic/           # Primitivos (Box, Text, Title, Toggle...)
│   │   ├── common/          # Compostos de basic (RowHeader, RowMessage, RowToggle)
│   │   └── icons/           # Ícones SVG
│   └── shell/               # Estrutura de rotas (Page, Layout)
├── features/                # Domínios (DDD)
│   ├── theme/               # Context, hooks, types do tema
│   ├── updates/             # Hooks e utils de atualizações
│   └── navigation/          # BottomNav (navegação)
├── pages/                   # Páginas (HomePage, ConfigPage)
├── services/                # Chamadas API
└── index.css               # Design System (variáveis globais)
```

---

## 🔗 Aliases (Vite)

```typescript
'@/'             → ./src
'@components/*'  → ./src/components
'@features/*'    → ./src/features
'@pages/*'       → ./src/pages
'@services/*'    → ./src/services
```

---

## 🚫 Proibido

1. `px` para tamanhos (usar `rem`)
2. Cores hardcoded (usar `var(--cor)`)
3. Desktop-first
4. `any` em TypeScript
5. Lógica de negócio em componentes
6. Imports relativos (usar aliases)

---

## ✅ Obrigatório

1. **Types para tudo** - TypeScript strict
2. **Components small e focados**
3. **Mobile-first** - começar do menor, expandir para desktop
4. **Cores via CSS variables**
5. **Atomic Design**: basic → common → shell
6. **Design System** - usar variáveis do `index.css`

---

## 🏗️ Arquitetura: DDD + Engine Pattern

### Estrutura por Domínio (DDD)

```
src/features/
├── theme/           # Domínio: Tema
│   ├── context/     # Estado global (React Context)
│   ├── hooks/       # Hooks específicos do domínio
│   └── types/       # Tipos do domínio
└── updates/        # Domínio: Atualizações
    ├── hooks/       # Hooks específicos do domínio
    └── utils/      # Funções utilitárias
```

### Dentro de Cada Domínio: Engine Pattern

Quando necessário, cada feature pode seguir:

```
src/features/[dominio]/
├── data/            → dados puros (constantes, tipos)
├── engine/          → lógica de regras puras (sem UI)
└── rules/           → regras de negócio específicas
```

### Atomic Design (UI)

```
src/components/ui/
├── basic/           # Primitivos (atoms) - Box, Text, Title, Toggle...
├── common/          # Compostos de basic (molecules) - RowHeader, RowMessage, RowToggle
└── icons/           # Ícones
```

**Shell** (estrutura de rotas):
- Page, Layout

**Features** (domínios DDD):
- theme, updates, navigation

---

## 🌎 Idioma

Todo o projeto em **português (pt-BR)**:

- **Funções, variáveis, nomes de arquivos** → português
- **Comentários** → português
- **Componentes React** → inglês (padrão)
- **Types/Interfaces** → inglês (padrão TypeScript)

---

## 🎭 Temática

- **RPG Medieval/Fantasy** - evitar UI genérica "corporate"
- **Tátil e Místico** - texturas sutis, brilhos suaves
- **Funcional** - apesar da estética, funcionar como ferramenta profissional

---

## 🎯 Visão do Projeto

### Fase 1: App de Criação de Fichas
- Criar ficha (nome, raça, classe, atributos, nível, aparência)
- Usuário mantém suas fichas localmente
- Login com múltiplos provedores (Google, Discord, email, etc.)

### Fase 2: Campanhas e Interação Social
- Usuário pode criar campanhas (vira "Mestre")
- Jogadores aplicam com suas fichas
- Mestre aprova/rejeita entrada
- Ficha "trava" ao entrar na campanha (só muda com permissão do mestre)

### Fase 3: Mecânicas de Jogo
- **Atributos**: Imutáveis após entrada na campanha
- **Nível/XP**: XP concedido pelo mestre, níveis específicos dão +1 atributo
- **Efeitos temporários**: Ativados/desativados por tempo
- **Cooldowns**: Habilidades 1/dia recarregam

### Fase 4: Sistema de Morte
- Morte em campanha → Memorial dos Caídos
- Morte natural entre campanhas (Ativo Obscuro)

---

## 🔧 Comandos

```bash
# Instalar dependências
npm install

# Executar desenvolvimento
npm run dev

# Build para produção
npm run build
```

---

## 📱 PWA

O app funciona offline como PWA com ícones em `public/icones/`.

---

## 📝 Commits

- `feat:` nova funcionalidade
- `fix:` correção
- `refactor:` reorganização
- `docs:` documentação
- `chore:` configuração
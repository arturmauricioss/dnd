# Arcane Sheet Vault - AI Agent Guidelines

> **IMPORTANTE**: Todo CSS deve seguir o design system definido em `src/index.css`. Não criar CSSinline ou variáveismanual - usar as já definidas.

## 🎨 Sistema de Design

### Cores (via CSS Custom Properties)

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

  /* Background */
  --background: #131314;
  --on-background: #E5E2E3;

  /* Surface Tint */
  --surface-tint: #FBBC00;
  --inverse-surface: #E5E2E3;
  --inverse-on-surface: #313031;
}
```

### Tipografia

| Estilo | Fonte | Tamanho | Weight | Line Height |
|--------|-------|----------|--------|--------------|
| Headline XL | Newsreader | 3rem (48px) | 700 | 1.1 |
| Headline LG | Newsreader | 2rem (32px) | 600 | 1.2 |
| Headline MD | Newsreader | 1.5rem (24px) | 600 | 1.3 |
| Stat Display | Manrope | 2.25rem (36px) | 800 | 1 |
| Body LG | Manrope | 1.125rem (18px) | 400 | 1.6 |
| Body MD | Manrope | 1rem (16px) | 400 | 1.6 |
| Label Caps | Inter | 0.75rem (12px) | 700 | 1 |

- **Headlines**: Newsreader (serif medieval) - usar "Title Case"
- **Stats**: Manrope (geométrica, legível para números)
- **Labels**: Inter (precisa para UI)

### Espaçamento (base 8px)

| Nome | Valor |
|------|-------|
| xs | 0.5rem (8px) |
| sm | 0.75rem (12px) |
| md | 1rem (16px) |
| lg | 1.5rem (24px) |
| xl | 2rem (32px) |
| 2xl | 3rem (48px) |
| Container Padding | 1.5rem |
| Gutter | 1rem |
| Component Gap | 0.75rem |

### Border Radius

| Nome | Valor |
|------|-------|
| sm | 0.125rem (2px) |
| DEFAULT | 0.25rem (4px) |
| md | 0.375rem (6px) |
| lg | 0.5rem (8px) |
| xl | 0.75rem (12px) |

---

## 📐 Layout

### Tamanhos
- **Sempre usar `rem`** (não `px`)
- `1rem` = valor que o browser/usuário define (acesso)
- Não fixar `font-size` no `:root`

### Mobile-First
- Começar do menor, expandir para desktop
- Breakpoints: sm(640px), md(768px), lg(10 24px)

### Espaçamento Vertical
- Base: 8px (unit)
- Usar múltiplos: 0.5rem, 1rem, 1.5rem, 2rem...

---

## 🚫 Proibido

1. `px` para tamanhos
2. Cores hardcoded (usar `var(--cor)`)
3. Desktop-first
4. `any` em TypeScript
5. Lógica de negócio em componentes
6. Imports relativos (usar aliases `@/`)

---

## ✅ Obligatório

1. Types para tudo (TypeScript strict)
2. Components small e focados
3. Rules isoladas em `/rules`
4. Mobile como base
5. Cores via CSS variables
6. **Data-Driven + Rules Engine**: dados puros em `/data`, lógica em `/engine` ou `/rules`

---

## 🎯 Padrão Data-Driven + Rules Engine

### Estrutura

```
src/
├── data/           → dados puros (JSON, constantes, tipos)
│   └── atributosData.ts
├── engine/         → lógica de regras puras (sem UI)
│   └── atributos.ts
└── rules/          → regras de negócio específicas
```

### Regras

- **`/data`**: apenas dados (constantes, tipos, labels, configurações)
  - ❌ sem lógica/funções
  - ✅ constantes, enums, tipos, dados estáticos

- **`/engine`**: funções puras de lógica (roll, calcular, gerar)
  - ❌ sem dependências de UI/React
  - ✅ só matemática/lógica de negócio
  - ✅ importa de `@data/*`

- **`/rules`**: regras específicas de domínio (D&D rules)
  - pode usar tanto `/data` quanto `/engine`
  - executa múltiplas regras em sequência

### Exemplo

```typescript
// ✅ src/data/atributosData.ts (só dados)
export const custoPontos = { 8: 0, 9: 1, 10: 2, ... }

// ✅ src/engine/atributos.ts (lógica pura)
import { custoPontos } from '@data/atributosData'
export function calcularCusto(valor: number): number {
  return custoPontos[valor] || 0
}
```

---

## 📁 Estrutura de Pastas

```
src/
  /data      → dados puros (JSON, constantes)
  /rules     → regras puras de negócio
  /engine    → orchestration
  /components/ui   → componentes genéricos
  /components/layout → layout
  /pages     → páginas
  /context   → React contexts
  /hooks     → hooks genéricos
  /services  → chamadas API
  /types     → TypeScript interfaces
```

---

## 🔗 Aliases (Vite)

```typescript
'@/'      → ./src
'@data/*'    → ./src/data
'@rules/*'   → ./src/rules
'@engine/*'  → ./src/engine
'@components/*' → ./src/components
'@pages/*'  → ./src/pages
'@context/*' → ./src/context
'@hooks/*'  → ./src/hooks
'@services/*' → ./src/services
'@types/*'  → ./src/types
```

---

## 🎭 Temática

- **RPG Medieval/Fantasy** - evitar UI genérica "corporate"
- **Tátil e Místico** - texturas sutis, brilhos suaves
- **Funcional** - apesar da estética, funcionar como ferramenta profissional

---

## 🌎 Idioma

Todo o projeto deve ser escrito em **português (pt-BR)**:

- **Funções, variáveis, nomes de arquivos** → português
- **Comentários** → português
- **Componentes React** → inglês (padrão)
- **Types/Interfaces** → inglês (padrão TypeScript)

### Exemplos

```typescript
// ✅ Função em português
function calcularModificador(valor: number): number {
  return Math.floor((valor - 10) / 2)
}

// ✅ Variável em português
let pontosDeVida = 10

// ✅ Arquivo em português
// criar-personagem.ts
// calcular-bba.ts
// carregar-dados.ts

// ❌ Evitar (mixado com inglês desnecessário)
let hpValue = 10

// ✅ Componentes React (padrão)
function BotaoPrimario() { }
function Card Personagem() { }
```

---

## 📝 Commits

- `feat:` nova funcionalidade
- `fix:` correção
- `refactor:` reorganização
- `docs:` documentação
- `chore:` configuração

---

## 📌 Pendências Técnicas

### Imagens de Raças (script automática)

Ao adicionar novas imagens de raças em `public/racas/`, atualizar manualmente `totalImagensPorRaca` em `src/data/racasData.ts` com a quantidade de imagens por raça.

**Futuro**: Criar script para detectar automaticamente a quantidade de imagens e gerar o arquivo (existe `scripts/gerar-racas.ts` como base).

---

## 📋 Visão do Projeto - Arcane Sheet Vault

### Fase 1: App de Criação de Fichas
- Criar ficha (nome, raça, classe, atributos, nível, aparência)
- Usuário mantém suas fichas localmente
- Login com múltiplos provedores (Google, Discord, email, etc.)

### Fase 2: Campanhas e Interação Social
- Usuário pode criar campanhas (vira "Mestre")
- Jogadores aplicam com suas fichas
- Mestre aprova/rejeita entrada
- Ficha "trava" ao entrar na campanha (só muda com permissão do mestre, incluindo XP)

### Mecânicas de Jogo
- **Atributos**: Imutáveis após entrada na campanha (salvo permissão do mestre)
- **PV/CA/etc**: vários campos da ficha
- **Nível/XP**: XP concedido pelo mestre. Ao alcançar níveis específicos (ex: 4, 8, 12, 16, 20), ganha +1 atributo (após aprovação do mestre)
- **Efeitos temporários**: Ativados/desativados por tempo (ex: Fúria 10 rodadas)
- **Cooldowns**: Habilidades 1/dia recarregam (00:00 ou 24h - ainda indefinido)
- **Tempo de jogo**: Mestre controla tempo (ex: "passou 4 horas" = efeitos expiram)
- **Turnos**: 1 round = 6 segundos (para regras de efeitos)

### Sistema de Morte
- **Morte em campanha**: Personagem vai para "Memorial dos Caídos"
- **Morte natural**: Cada personagem tem "Ativo Obscuro" - momento em que morrerá de causas naturais
- Homebrew: Causas naturais (ex: infarto) entre campanhas

### Aspectos Técnicos
- **Backend**: Supabase (Vercel) - Auth + Database
- **Frontend**: React + TypeScript + Vite
- **Hospedagem**: Vercel
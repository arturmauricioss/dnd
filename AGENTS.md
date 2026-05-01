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
| Unit | 8px |
| Container Padding | 24px |
| Gutter | 16px |
| Component Gap | 12px |

### Border Radius

| Nome | Valor |
|------|-------|
| sm | 2px |
| DEFAULT | 4px |
| md | 6px |
| lg | 8px |
| xl | 12px |

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

## 📝 Commits

- `feat:` nova funcionalidade
- `fix:` correção
- `refactor:` reorganização
- `docs:` documentação
- `chore:` configuração
# DnDragons

Um aplicativo de criação de fichas de D&D 3.5 para tabletop.

## 🚀 Funcionalidades Atuais

### Criação de Personagem
- **Nome e Gênero** - Seleção de nome e gênero (♂/♀)
- **Atributos** - 4 métodos de distribuição:
  - 4d6 (maior resultado)
  - Valores Definidos
  - Compra de Pontos (27 pontos)
  - Livre
- **Raça** - 7 raças com modificadores raciais:
  - Humano, Anão, Gnomo, Halfling, Elfo, Meio-Elfo, Meio-Orc
- **Aparência** - Seleção de imagem por raça
- **Classe** - 11 classes com dados de jogo:
  - Bárbaro, Bardo, Clérigo, Druida, Feiticeiro, Guerreiro, Ladino, Monge, Paladino, Ranger, Mago
- **Nível** - Seleção de nível (1-20)

### Sistema de Regras
- Modificadores raciais aplicados automaticamente
- Validação de atributos (mín 3, máx 18)
- Mínimo de inteligência após modificadores raciais

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Estilos**: CSS Custom Properties (Design System)
- **Backend**: Planejado (Supabase + Vercel)
- **Hospedagem**: Vercel

## 📁 Estrutura

```
src/
├── data/           # Dados puros (raças, classes, atributos)
├── engine/         # Lógica de regras (roll, cálculo)
├── rules/          # Rules engine (validação, modificadores)
├── components/     # Componentes React
├── pages/          # Páginas
├── context/        # React Contexts
└── types/          # TypeScript interfaces
```

## 🎯 Visão do Projeto

### Fase 1: App de Criação de Fichas ✅ (em andamento)
- Criar ficha com nome, raça, classe, atributos, nível

### Fase 2: Campanhas e Interação Social
- Usuário cria campanhas (Mestre)
- Jogadores aplicam com fichas
- Mestre aprova/rejeita entrada

### Fase 3: Mecânicas de Jogo
- Fichas "travam" ao entrar na campanha
- XP concedido pelo mestre
- Níveis específicos dão +1 atributo (4, 8, 12, 16, 20)
- Efeitos temporários (Fúria, etc.)
- Cooldowns de habilidades

### Fase 4: Sistema de Morte
- Morte em campanha → Memorial dos Caídos
- Morte natural entre campanhas (Ativo Obscuro)

## 🔧 Como Executar

```bash
# Instalar dependências
npm install

# Executar desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📝 Conventions

- CSS: Usar variáveis do `src/index.css`
- Mobile-first design
- Portuguese naming para funções/variáveis
- English para componentes React
- Data-Driven + Rules Engine pattern
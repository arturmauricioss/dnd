# 🐉 Ficha de Personagem D&D 3.5

Uma aplicação web completa para criar e gerenciar personagens de D&D 3ª Edição, desenvolvida com React.

## 📋 Visão Geral

Este é um aplicativo de ficha de personagem para D&D 3.5 que permite criar personagens completos, gerenciar atributos, perícias, idiomas, comprar itens na loja e acompanhar o inventário.

## 🗂️ Estrutura das Páginas

### 1. Personagem
- **Dados Básicos**: Nome, jogador, classe, nível, raça, alinhamento, divindade, sexo, idade, altura, peso
- **Seleção de Raça**: 7 raças disponíveis (Humano, Elfo, Anão, Gnomo, Meio-Elfo, Meio-Orc, Halfling)
- **Seleção de Classe**: 11 classes (Bárbaro, Bardo, Clérigo, Druida, Feiticeiro, Guerreiro, Ladino, Mago, Monge, Paladino, Ranger)
- **Sistema de Deuses**: Filtragem dinâmica por classe e alinhamento + deuses raciais
- **Alinhamentos Restritos**: Algumas classes têm restrições de alinhamento (ex: Paladino só pode ser Lawful Good)

### 2. Atributos
- **6 Atributos**: Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma
- **Valores Base**: Distribuição automática baseada na classe (sistema de prioridade)
- **Bônus Racial**: Cada raça tem modificadores raciais automáticos
- **Modificadores**: Cálculo automático do modificador (valor - 10 / 2)

### 3. Combate (Combat)
- **BBA** (Bonus Base de Ataque): Calculado automaticamente pela progressão de classe
- **Iniciativa**: Modificador de Destreza
- **CA** (Classe de Armadura): 10 + armadura + escudo + dex + tamanho + outros
- **Deslocamento**: Baseada na raça + bônus de classe (ex: Bárbaro +3m)
- **PV** (Pontos de Vida): Dado de vida da classe + modificador de constituição por nível
- **Testes de Resistência**: Fortitude, Reflexos, Vontade (base da classe + modificador de atributo + bônus racial)
- **Agarrar**: BBA base + Força + modificador de tamanho

### 4. Perícias
- **Sistema Completo**: Todas as perícias do D&D 3.5
- **Cálculo de Pontos**: Base da classe + modificador de Inteligência + bônus racial (Humano)
- **Graduação**: Investir pontos com verificação de custo (classe = 1 ponto, fora = 2 pontos)
- **Máximo por Nível**: Nível + 3
- **Bônus Racial**: Algumas raças têm bônus em perícias específicas
- **Perícias de Classe**: Destaque visual em verde
- **Perícias Treinadas**: Marcador (*) para perícias que requerem treinamento
- **Penalidade de Armadura**: Aplicada automaticamente a perícias com penalidade

### 5. Idiomas
- **Idiomas Base**: Determinados pela raça
- **Idiomas Extras**: Modificador de Inteligência + pontos da perícia "Falar Idioma"
- **Idiomas de Classe**: Alguns personagens ganham idiomas específicos (ex: Clérigo, Mago)
- **Alfabetização**: Bárbaro começa analfabeto, precisa de 2 pontos na perícia Alfabetização para se alfabetizar
- **Humanos e Meio-Elfos**: Podem aprender qualquer idioma

### 6. Loja
- **Catálogo Completo**: Armas, armaduras, escudos e outros itens
- **Sistema de Carrinho**: Adicionar, remover, aumentar/diminuir quantidade
- **Validação de Compra**: Verifica se tem dinheiro suficiente
- **Itens em Pack**: Shuriken (5), Virotes (10), Flechas (20), etc. - compras múltiplas são calculadas corretamente
- **Compra de Armadura/Escudo**: Substitui o anterior se já tiver
- **Armas e Itens**: Somam com os já existentes no inventário

### 7. Inventário
- **Dinheiro**: Visualização do dinheiro total em PO (não editável, gerenciado pela Loja)
- **Itens Comprados**: Exibidos em cards com foto, nome e detalhes
- **Quantidade**: Badge mostra a quantidade quando maior que 1 ou maior que o pack original
- **Armaduras e Escudos**: Cards com CA e bônus
- **Armas**: Cards com dano e crítico

## 🎨 Design Responsivo

- **Layout adaptável**: Funciona em desktop, tablet e mobile
- **Cards**: Grid responsivo (4 → 3 → 2 colunas)
- **Navegação**: Menu fixo e botões de próximo/anterior
- **Mobile**: Tabelas de perícias com header sticky

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── Atributos/        # Sistema de atributos
│   ├── Classes/           # Dados de classes
│   ├── Combat/           # Stats de combate
│   ├── Divindades/       # Deuses e alinhamentos
│   ├── Equipamentos/     # Armas, armaduras, itens
│   ├── Idiomas/          # Sistema de idiomas
│   ├── Inventario/       # Items + ItemCard
│   ├── ItemCard/         # Componente de card de item
│   ├── Loj a/            # Loja com sistema de compra
│   ├── Menu/             # Navegação principal
│   ├── Pericias/         # Sistema de perícias
│   ├── Personagem/        # Dados básicos do personagem
│   ├── Racas/            # Dados de raças
│   └── global/            # Componentes globais
├── context/
│   └── CharacterContext.jsx  # Estado global do personagem
└── App.jsx
```

## 🔧 Tecnologias

- **React 18** com hooks e useMemo
- **React Router** para navegação
- **CSS** com variáveis e media queries
- **Context API** para gerenciamento de estado

## 📝 Funcionalidades Futuras

- [ ] Peso e Carga
- [ ] Sistema de Equipar/Desequipar
- [ ] Habilidades Especiais
- [ ] Talentos
- [ ] Magias
- [ ] Feitiços
- [ ] Rolar Dado Local
- [ ] Salvar/carregar personagens
- [ ] Exportar/importar PDF
- [ ] Sistema de Login para usuários 
- [ ] Utilizar as fichas em campanhas de um mestre/que vai ser outro usuario
- [ ] Fichas para partidas online devem ser limitas ao que o mestre limitar a campanha como por exemplo qual regra será usada para distribuição de atributos, todos os jogadores devem seguir a mesma regra / será necessário implementar mais regras e também bloquear a inserção de dados no input de atributos
- [ ] Geremciamento de movimentação / combate
- [ ] Gerenciador de Monstros e Bosses
- [ ] Criador de Mapas com cidades 
- [ ] Gerenciador de 'loja' da cidade mestre pode limitar o que cada loja daquela cidade vende... 
- [ ] Rolar dado em campanha para todos verem
- [ ] Vincular posicionamento do personagem com itens que o item pode comprar em loja, se ele estiver em uma loja deve ser exibido apenas os itens daquela loja, se ele nao estiver em uma loja, nao devem ser exibidos itens, vendedores no caminho são lojas rápidas que o mestre pode criar sem necessáriamente criar uma loja/cidade
- [ ] Combate automático guiada com ordem de iniciativa, onde cada jogador pode jogar na sua vez.. talvez o mestre possa jogar pelo jogador casoa conexao dele esteja ocilando para nao travar o roleplay...
- [ ] Possibildiade de UI com barras de hp do personagem
- [ ] Sistema de personalização de personagem, como olhos e cor da pele, tipo de cabelo etc...
- [ ] Transformação do sistema de Equipar/Desequipar em sistema de Vestir/Desvestir visualmente
- [ ] Sistema de UI para exibir magias, golpes, animações entre outras como montar..
- [ ] Possibilidaes de exibir campanhas em 2D estilo tibia/pokemon ou 2D estilo Grand Chase


---

*Este projeto segue as regras do Player's Handbook de D&D 3.5 e ainda está sendo desenvolvido* 
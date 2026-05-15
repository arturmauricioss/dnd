# BRPG

Este projeto está sendo desenvolvido para o melhor Gerenciamento de Fichas de D&D, seu desenvolvimento está sendo focado na versão 3.5 e no público brasileiro.

O objetivo de usabilidade é tornar possível acesso rápido a informações de cada jogador pelo mestre, convergencia de dados em tempo real. 

## A ideia é um RPG assistido focado no Metre onde:

### Mestre
- compartilha a tela
- controla iniciativa
- controla rounds
- move combate
- vê tudo
- faz administração geral

### Jogadores 
- podem agir ou pedir para o mestre agir por eles
- veem apenas a própria ficha
- apertam/ativam habilidades
- acompanha HP
- ativa efeitos
- rola ações
- sem precisar navegar interface gigante

## Home

A tela Home atualmente tem as atualizações puxadas diretamente dos commits do projeto no github.

## Página de Heróis

Essa página serve para exibir todos os personagens do jogador. existem duas sessões nela, sempre que um personagem terminar uma campanha morto (ambas features que ainda nao foram implementadas) o jogador verá seu personagem no Memorial dos Caidos.

## Página de Novo Herói ~foco do desenvolvimento atual

Aqui o jogador pode começar a desenvolver seu personagem com escolhas de Raça, Gênero e Nome. Algumas features randomicas também auxiliam o processo. 

## Campanhas

Essa feature ainda não foi implementada mas servirá para unir fichas de vários usuários em uma mesma campanha, o usuário que criar a campanha será denominado o mestre, e os usuários que jogarem serão os jogadores.

## Configurações

Aqui podemos atualmente mudar o tema, mas também adicionarei aqui padrões de configuração para que o player possa escolher metodo padrao de criação de ficha ao inves de ser perguntado sempre qual metodo usar

## NameGenerator

Essa Tool foi desenvolvida para gerenciamente de nomes randomicos, poderá futuramente ser integrada a uma feature para desenvolvimento de npcs mais rapidamente pelo mestre, mas ainda não foi implementada


# Futuras Atualizações

- salvar ficha local
- login/logout
- salvar ficha na conta
- criar campanha
- submeter ficha para campanha
- criar validação para aceitar ficha na campanha
- gerenciamento simultaneo de fichas pelo jogador e mestre.
- inbutir rolagem de dados
- gerenciar dados como engine.
- adicionar habilidades e com engine coisas como raça bonus força +2
- adicionar outros atributos como deslocamento, visao, dano etc...
- adicionar efeitos
- adicionar controle de tempo/rounds como avançar 10 rodadas seria o equivalente a avançar 1 minuto.. desativar efeitos temporários dessa forma, coisas como iniciativa terão outro estilo de calculo, habilidades com cargas de 1x dia, terão coldown de 24horas
- adicionar sistema de criaçao de NPCs, Lojas, Monstros rapidamente para o mestre.
- adicionar malha de batalha e token de personagem.

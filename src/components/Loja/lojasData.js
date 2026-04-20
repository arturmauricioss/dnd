export const lojas = [
  {
    id: 'ferreiro',
    nome: 'Ferreiro',
    descricao: 'Armas simples',
    icone: '⚒️'
  },
  {
    id: 'arsenal',
    nome: 'Arsenal',
    descricao: 'Armas comuns',
    icone: '⚔️'
  },
  {
    id: 'forja-arcana',
    nome: 'Forja Arcana',
    descricao: 'Armas exóticas',
    icone: '✨'
  },
  {
    id: 'couracaria',
    nome: 'Couraçaria',
    descricao: 'Armaduras',
    icone: '⛓️'
  },
  {
    id: 'escudaria',
    nome: 'Escudaria',
    descricao: 'Escudos',
    icone: '🛡️'
  },
  {
    id: 'taberna',
    nome: 'Taberna',
    descricao: 'Comida, bebida e alojamento',
    icone: '🍺'
  },
  {
    id: 'mercador',
    nome: 'Mercador',
    descricao: 'Itens gerais e suprimentos',
    icone: '⚖️'
  },
  {
    id: 'alquimista',
    nome: 'Alquimista',
    descricao: 'Itens especiais e mágicos',
    icone: '⚗️'
  },
  {
    id: 'haras',
    nome: 'Haras',
    descricao: 'Montarias',
    icone: '🐎'
  },
  {
    id: 'carroceiro',
    nome: 'Carroceiro',
    descricao: 'Carroças e veículos',
    icone: '🛞'
  },
  {
    id: 'estaleiro',
    nome: 'Estaleiro',
    descricao: 'Embarcações leves',
    icone: '⛵'
  },
  {
    id: 'porto',
    nome: 'Porto',
    descricao: 'Embarcações marítimas',
    icone: '⚓'
  },
  {
    id: 'alfaiataria',
    nome: 'Alfaiataria',
    descricao: 'Roupas e indumentária',
    icone: '🥋'
  },
  {
    id: 'luthieria',
    nome: 'Luthieria',
    descricao: 'Instrumentos musicais',
    icone: '🎻'
  }
]

export const itensPorLoja = {
  ferreiro: ['arma-simples'],
  arsenal: ['arma-comum'],
  'forja-arcana': ['arma-exotica'],
  couracaria: ['armadura'],
  escudaria: ['escudo'],
  taberna: ['comida', 'bebida', 'alojamento'],
  mercador: ['item', 'fornecimento'],
  alquimista: ['especial'],
  haras: ['montaria'],
  carroceiro: ['carroca', 'carruagem', 'charrete', 'treno'],
  estaleiro: ['barco', 'remo', 'barcaca'],
  porto: ['galeao', 'nav_guerra', 'navio', 'veleiro'],
  alfaiataria: ['indumentaria'],
  luthieria: ['instrumento']
}
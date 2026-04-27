export const talentosData = {
  ataquePoderoso: {
    id: 'ataquePoderoso',
    nome: 'Ataque Poderoso',
    descricao: 'Permite trocar bônus de ataque por dano.',
    requisitos: [
      { tipo: 'atributo', atributo: 'forca', valor: 13 }
    ],
    efeito: {
      tipo: 'combate',
      acao: 'trocarAtaquePorDano'
    }
  },

  talentoExtra: {
    id: 'talentoExtra',
    nome: 'Talento Extra',
    descricao: 'Ganha um talento adicional.',
    requisitos: [],
    efeito: {
      tipo: 'meta',
      acao: 'ganharTalentoExtra'
    }
  },

  focoEmArma: {
    id: 'focoEmArma',
    nome: 'Foco em Arma',
    descricao: 'Recebe +1 em ataques com uma arma.',
    requisitos: [
      { tipo: 'talento', talento: 'ataquePoderoso' }
    ],
    efeito: {
      tipo: 'combate',
      bonusAtaque: 1
    }
  }
}
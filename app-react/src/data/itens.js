import { armadurasBase, escudosBase } from './armaduras'

const itensBase = {
  mochila: { nome: '- Mochila' },
  cantil: { nome: '- Cantil' },
  racao: { nome: '- Rações (1 dia)' },
  sacoDormir: { nome: '- Saco de Dormir' },
  saco: { nome: '- Saco' },
  pederneira: { nome: '- Pederneira' },
  isqueiro: { nome: '- Isqueiro' },
  tochas: { nome: '- 3 Tochas' },
  lanterna: { nome: '- Lanterna Coberta' },
  oleo300: { nome: '- Óleo (300 ml)' },
  oleo500: { nome: '- Óleo (500 ml)' },
  grimorio: { nome: '- Grimório' },
  ferramentasLadrao: { nome: '- Ferramentas de ladrão' },
  simboloSagrado: { nome: '- Símbolo sagrado' },
  alaude: { nome: '- Alaúde' },
  bolsaComponentes: { nome: '- Bolsa de componentes de magia' },
  azevinho: { nome: '- Arizinho e visco' }
}

function itensPadrao() {
  return [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.pederneira, itensBase.isqueiro]
}

function criarArma(nome, dano, critico, alcance, categoria, tipo_dano, peso, tipo_ataque) {
  return { nome, dano, critico, alcance, categoria, tipo_dano, peso, tipo_ataque }
}

const armasBase = {
  machadoGrande: criarArma('- Machado Grande', '1d12', 'x3', '', 'duas_maos', 'cortante', '6 kg', 'corpo'),
  arcoCurto: criarArma('- Arco Curto', '1d6', 'x3', '18m', 'duas_maos', 'perfurante', '1 kg', 'distancia'),
  arcoLongo: criarArma('- Arco Longo', '1d8', 'x3', '30m', 'duas_maos', 'perfurante', '1 kg', 'distancia'),
  adaga: criarArma('- Adaga', '1d4', 'x2', '3m', 'uma_mao', 'cortante', '0.5 kg', 'corpo'),
  espadaLonga: criarArma('- Espada Longa', '1d8', 'x2', '', 'uma_mao', 'cortante', '2 kg', 'corpo'),
  bestaLeve: criarArma('- Besta Leve', '1d6', 'x2', '18m', 'uma_mao', 'perfurante', '2 kg', 'distancia'),
  macaPesada: criarArma('- Maça Pesada', '1d8', 'x2', '', 'uma_mao', 'concussão', '3 kg', 'corpo'),
  cimitarra: criarArma('- Cimitarra', '1d6', 'x2', '', 'uma_mao', 'cortante', '2 kg', 'corpo'),
  clava: criarArma('- Clava', '1d6', 'x2', '', 'uma_mao', 'concussão', '2 kg', 'corpo'),
  funda: criarArma('- Funda', '1d4', 'x2', '15m', 'uma_mao', 'concussão', '0', 'distancia'),
  lancaCurta: criarArma('- Lança Curta', '1d6', 'x2', '', 'uma_mao', 'perfurante', '1.5 kg', 'corpo'),
  lancaLonga: criarArma('- Lança Longa', '1d8', 'x3', '', 'duas_maos', 'perfurante', '4.5 kg', 'corpo'),
  mangual: criarArma('- Mangual', '1d8', 'x2', '', 'duas_maos', 'concussão', '5 kg', 'corpo'),
  arcoComposto: criarArma('- Arco Composto', '1d6', 'x3', '21m', 'duas_maos', 'perfurante', '1 kg', 'distancia'),
  machadoAnao: criarArma('- Machado Anão', '1d10', 'x3', '', 'uma_mao', 'cortante', '3 kg', 'corpo'),
  marteloGuerreiro: criarArma('- Martelo de Guerreiro', '1d8', 'x2', '', 'uma_mao', 'concussão', '2.5 kg', 'corpo'),
  glaive: criarArma('- Glaive', '1d10', 'x3', '', 'duas_maos', 'cortante', '4.5 kg', 'corpo'),
  ia: criarArma('- Iã', '1d6', 'x2', '', 'uma_mao', 'cortante', '1 kg', 'corpo'),
}

export const itensPorClasse = {
  barbaro: {
    armas: [armasBase.machadoGrande, armasBase.arcoCurto, armasBase.adaga],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: itensPadrao(),
    dinheiro_kit: { po: '2d4' },
    dinheiro_sem_kit: { po: '4d4x10' }
  },
  bardo: {
    armas: [armasBase.espadaLonga, armasBase.bestaLeve],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: [...itensPadrao(), 'tochas', 'alaude', 'bolsaComponentes'],
    dinheiro_kit: { po: '2d4' },
    dinheiro_sem_kit: { po: '4d4x10' }
  },
  clerigo: {
    armas: [armasBase.macaPesada, armasBase.bestaLeve],
    armadura: armadurasBase.brunea,
    escudo: escudosBase.madeiraPesado,
    itens: [...itensPadrao(), 'tochas', 'simboloSagrado'],
    dinheiro_kit: { po: '1d4' },
    dinheiro_sem_kit: { po: '5d4x10' }
  },
  druida: {
    armas: [armasBase.cimitarra, armasBase.clava, armasBase.funda],
    armadura: armadurasBase.peles,
    escudo: escudosBase.madeiraPesado,
    itens: [...itensPadrao(), 'tochas', 'azevinho'],
    dinheiro_kit: { po: '1d6' },
    dinheiro_sem_kit: { po: '2d4x10' }
  },
  feiticeiro: {
    armas: [armasBase.lancaCurta, armasBase.bestaLeve],
    armadura: null,
    escudo: null,
    itens: [...itensPadrao(), 'lanterna', 'oleo500', 'bolsaComponentes'],
    dinheiro_kit: { po: '3d4' },
    dinheiro_sem_kit: { po: '3d4x10' }
  },
  guerreiro: {
    armas: [armasBase.espadaLonga, armasBase.arcoLongo, armasBase.arcoComposto],
    armadura: armadurasBase.cotaDeMalha,
    escudo: escudosBase.ferro,
    itens: [...itensPadrao(), 'tochas'],
    dinheiro_kit: { po: '3d4' },
    dinheiro_sem_kit: { po: '5d4x10' }
  },
  ladino: {
    armas: [armasBase.adaga, armasBase.bestaLeve],
    armadura: armadurasBase.couro,
    escudo: null,
    itens: [...itensPadrao(), 'ferramentasLadrao', 'tochas', 'lanterna'],
    dinheiro_kit: { po: '2d4' },
    dinheiro_sem_kit: { po: '4d4x10' }
  },
  mago: {
    armas: [armasBase.bestaLeve],
    armadura: null,
    escudo: null,
    itens: [...itensPadrao(), 'grimorio', 'bolsaComponentes', 'lanterna', 'oleo500'],
    dinheiro_kit: { po: '3d4' },
    dinheiro_sem_kit: { po: '4d4x10' }
  },
  monge: {
    armas: [armasBase.ia, armasBase.arcoComposto],
    armadura: null,
    escudo: null,
    itens: [...itensPadrao(), 'tochas'],
    dinheiro_kit: { po: '2d4' },
    dinheiro_sem_kit: { po: '4d4x10' }
  },
  paladino: {
    armas: [armasBase.espadaLonga, armasBase.macaPesada],
    armadura: armadurasBase.cotaDeMalha,
    escudo: escudosBase.ferro,
    itens: [...itensPadrao(), 'simboloSagrado', 'tochas'],
    dinheiro_kit: { po: '1d4' },
    dinheiro_sem_kit: { po: '5d4x10' }
  },
  ranger: {
    armas: [armasBase.arcoLongo, armasBase.adaga],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: [...itensPadrao(), 'tochas'],
    dinheiro_kit: { po: '2d4' },
    dinheiro_sem_kit: { po: '4d4x10' }
  }
}

export function getItensClasse(classeId) {
  return itensPorClasse[classeId] || null
}
const itensBase = {
  mochila: { nome: "- Mochila", preco: 1500 },
  cantil: { nome: "- Cantil", preco: 300 },
  racao: { nome: "- Rações (1 dia)", preco: 500 },
  sacoDormir: { nome: "- Saco de Dormir", preco: 500 },
  saco: { nome: "- Saco", preco: 200 },
  pederneira: { nome: "- Pederneira", preco: 300 },
  isqueiro: { nome: "- Isqueiro", preco: 300 },
  tochas: { nome: "- 3 Tochas", preco: 100 },
  lanterna: { nome: "- Lanterna Coberta", preco: 1200 },
  oleo300: { nome: "- Óleo (300 ml)", preco: 200 },
  oleo500: { nome: "- Óleo (500 ml)", preco: 300 },

  grimorio: { nome: "- Grimório", preco: 3000 },
  ferramentasLadrao: { nome: "- Ferramentas de ladrão", preco: 5000 },
  simboloSagrado: { nome: "- Símbolo sagrado", preco: 2500 },
  alaude: { nome: "- Alaúde", preco: 3000 },
  bolsaComponentes: { nome: "- Bolsa de componentes de magia", preco: 2000 },
  azevinho: { nome: "- Azevinho e visco", preco: 1000 }
};

function armaPadrao(data) {
  return {
    nome: data.nome,
    dano: data.dano,
    critico: data.critico,
    alcance: data.alcance || "",
    categoria: data.categoria,
    tipo_dano: data.tipo_dano,
    peso: data.peso,
    municao: data.municao || "",
    quantidade: data.quantidade || "",
    tipo_ataque: data.tipo_ataque,
    subtipo: data.subtipo || null,
    preco: data.preco || 0
  };
}

const armasBase = {
  machadoGrande: armaPadrao({
    nome: "- Machado Grande",
    dano: "1d12",
    critico: "x3",
    categoria: "duas_maos",
    tipo_dano: "cortante",
    peso: "6 kg",
    tipo_ataque: "corpo",
    preco: 3000
  }),

  arcoCurto: armaPadrao({
    nome: "- Arco Curto",
    dano: "1d6",
    critico: "x3",
    alcance: "18 m",
    categoria: "duas_maos",
    tipo_dano: "perfurante",
    peso: "1 kg",
    municao: "Flechas",
    quantidade: "20",
    tipo_ataque: "distancia",
    subtipo: "disparo",
    preco: 3000
  }),

  arcoLongo: armaPadrao({
    nome: "- Arco Longo",
    dano: "1d8",
    critico: "x3",
    alcance: "30 m",
    categoria: "duas_maos",
    tipo_dano: "perfurante",
    peso: "1,5 kg",
    municao: "Flechas",
    quantidade: "20",
    tipo_ataque: "distancia",
    subtipo: "disparo",
    preco: 7500
  }),

  adaga: armaPadrao({
    nome: "- Adaga",
    dano: "1d4",
    critico: "19-20/x2",
    alcance: "3 m",
    categoria: "leve",
    tipo_dano: "perfurante",
    peso: "0,5 kg",
    tipo_ataque: "corpo",
    subtipo: "arremesso",
    preco: 400
  }),

  bestaLeve: armaPadrao({
    nome: "- Besta Leve",
    dano: "1d8",
    critico: "19-20/x2",
    alcance: "24 m",
    categoria: "duas_maos",
    tipo_dano: "perfurante",
    peso: "2 kg",
    municao: "Virotes",
    quantidade: "10",
    tipo_ataque: "distancia",
    subtipo: "disparo",
    preco: 3500
  }),

  espadaLonga: armaPadrao({
    nome: "- Espada Longa",
    dano: "1d8",
    critico: "19-20/x2",
    categoria: "uma_mao",
    tipo_dano: "cortante",
    peso: "2 kg",
    tipo_ataque: "corpo",
    preco: 1500
  }),

  espadaCurta: armaPadrao({
    nome: "- Espada Curta",
    dano: "1d6",
    critico: "19-20/x2",
    categoria: "leve",
    tipo_dano: "perfurante",
    peso: "1 kg",
    tipo_ataque: "corpo",
    preco: 1000
  }),

  funda: armaPadrao({
    nome: "- Funda",
    dano: "1d4",
    critico: "x2",
    alcance: "15 m",
    categoria: "uma_mao",
    tipo_dano: "concussao",
    peso: "0,5 kg",
    municao: "Balas",
    quantidade: "10",
    tipo_ataque: "distancia",
    subtipo: "arremesso",
    preco: 500
  }),

  cimitarra: armaPadrao({
    nome: "- Cimitarra",
    dano: "1d6",
    critico: "18-20/x2",
    categoria: "uma_mao",
    tipo_dano: "cortante",
    peso: "2 kg",
    tipo_ataque: "corpo",
    preco: 1500
  }),

  clava: armaPadrao({
    nome: "- Clava",
    dano: "1d6",
    critico: "x2",
    categoria: "uma_mao",
    tipo_dano: "concussao",
    peso: "1,5 kg",
    tipo_ataque: "corpo",
    preco: 500
  }),

  lancaCurta: armaPadrao({
    nome: "- Lança Curta",
    dano: "1d6",
    critico: "x2",
    alcance: "6 m",
    categoria: "uma_mao",
    tipo_dano: "perfurante",
    peso: "1,5 kg",
    tipo_ataque: "corpo",
    subtipo: "arremesso",
    preco: 1000
  }),

  macaPesada: armaPadrao({
    nome: "- Maça Pesada",
    dano: "1d8",
    critico: "x2",
    categoria: "uma_mao",
    tipo_dano: "concussao",
    peso: "4 kg",
    tipo_ataque: "corpo",
    preco: 1200
  })
};

const armadurasBase = {
  couro: {
    nome: "- Corselete de Couro",
    preco: 3500,
    tipo: "armadura",
    bonus_ca: "+2",
    dex_max: "+6",
    penalidade: "0",
    falha_magia: "10%",
    deslocamento: "9 m",
    peso: "7,5 kg",
    propriedades: ""
  },

  couroBatido: {
    nome: "- Corselete de Couro Batido",
    preco: 5000,
    tipo: "armadura",
    bonus_ca: "+3",
    dex_max: "+5",
    penalidade: "-1",
    falha_magia: "15%",
    deslocamento: "9 m",
    peso: "10 kg",
    propriedades: ""
  },

  peles: {
    nome: "- Gibão de Peles",
    preco: 1000,
    tipo: "armadura",
    bonus_ca: "+3",
    dex_max: "+4",
    penalidade: "-3",
    falha_magia: "20%",
    deslocamento: "9 m",
    peso: "11,5 kg",
    propriedades: ""
  },

  brunea: {
    nome: "- Brunea",
    preco: 10000,
    tipo: "armadura",
    bonus_ca: "+4",
    dex_max: "+3",
    penalidade: "-4",
    falha_magia: "25%",
    deslocamento: "6 m",
    peso: "20 kg",
    propriedades: ""
  }
};

const escudosBase = {
  madeiraLeve: {
    nome: "- Escudo Leve de Madeira",
    preco: 900,
    tipo: "escudo",
    bonus_ca: "+1",
    penalidade: "-1",
    falha_magia: "5%",
    peso: "2,5 kg",
    propriedades: ""
  },

  madeiraPesado: {
    nome: "- Escudo Pesado de Madeira",
    preco: 1500,
    tipo: "escudo",
    bonus_ca: "+2",
    penalidade: "-2",
    falha_magia: "15%",
    peso: "5 kg",
    propriedades: ""
  },

  metalLeve: {
    nome: "- Escudo Leve de Aço",
    preco: 1000,
    tipo: "escudo",
    bonus_ca: "+1",
    penalidade: "-1",
    falha_magia: "5%",
    peso: "3 kg",
    propriedades: ""
  },

  metalPesado: {
    nome: "- Escudo Pesado de Aço",
    preco: 2000,
    tipo: "escudo",
    bonus_ca: "+2",
    penalidade: "-2",
    falha_magia: "15%",
    peso: "7,5 kg",
    propriedades: ""
  }
};

function normalizarItens(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([id, item]) => [
      id,
      { id, ...item }
    ])
  );
}
export function getPenalidadeTotal(armor, shield) {
  let penalidade = 0

  if (armor?.penalidade) {
    const val = Number(armor.penalidade)
    if (!isNaN(val)) penalidade += Math.abs(val)
  }

  if (shield?.penalidade) {
    const val = Number(shield.penalidade)
    if (!isNaN(val)) penalidade += Math.abs(val)
  }

  return penalidade
}
export const todosItens = normalizarItens({
  ...itensBase,
  ...armasBase,
  ...armadurasBase,
  ...escudosBase
});

export const dinheiroInicialClasse = {
  barbaro: { po: 100, pl: 0, pp: 0, pc: 0 },
  bardo: { po: 100, pl: 0, pp: 0, pc: 0 },
  clerigo: { po: 125, pl: 0, pp: 0, pc: 0 },
  druida: { po: 50, pl: 0, pp: 0, pc: 0 },
  feiticeiro: { po: 75, pl: 0, pp: 0, pc: 0 },
  guerreiro: { po: 150, pl: 0, pp: 0, pc: 0 },
  ladino: { po: 125, pl: 0, pp: 0, pc: 0 },
  mago: { po: 75, pl: 0, pp: 0, pc: 0 },
  monge: { po: 12, pl: 0, pp: 5, pc: 0 },
  paladino: { po: 150, pl: 0, pp: 0, pc: 0 },
  ranger: { po: 150, pl: 0, pp: 0, pc: 0 }
}

export function getDinheiroInicial(classe) {
  if (!classe) return { po: 0, pl: 0, pp: 0, pc: 0 }
  return dinheiroInicialClasse[classe.toLowerCase()] || { po: 0, pl: 0, pp: 0, pc: 0 }
}

const itensPorClasse = {
  barbaro: {
    armas: [armasBase.machadoGrande, armasBase.arcoCurto, armasBase.adaga],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro],
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "4d4 x 10" }
  },
  bardo: {
    armas: [armasBase.espadaLonga, armasBase.bestaLeve],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.tochas, itensBase.alaude, itensBase.bolsaComponentes],
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "4d4 x 10" }
  },
  clerigo: {
    armas: [armasBase.macaPesada, armasBase.bestaLeve],
    armadura: armadurasBase.brunea,
    escudo: escudosBase.madeiraPesado,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.tochas, itensBase.simboloSagrado],
    dinheiro_kit: { po: "1d4" },
    dinheiro_sem_kit: { po: "5d4 x 10" }
  },
  druida: {
    armas: [armasBase.cimitarra, armasBase.clava, armasBase.funda],
    armadura: armadurasBase.peles,
    escudo: escudosBase.madeiraPesado,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.tochas, itensBase.azevinho],
    dinheiro_kit: { po: "1d6" },
    dinheiro_sem_kit: { po: "2d4 x 10" }
  },
  feiticeiro: {
    armas: [armasBase.lancaCurta, armasBase.bestaLeve],
    armadura: null,
    escudo: null,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.lanterna, itensBase.oleo500, itensBase.bolsaComponentes],
    dinheiro_kit: { po: "3d4" },
    dinheiro_sem_kit: { po: "3d4 x 10" }
  },
  guerreiro: {
    armas: [armasBase.machadoGrande, armasBase.arcoCurto],
    armadura: armadurasBase.brunea,
    escudo: escudosBase.madeiraPesado,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro],
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "6d4 x 10" }
  },
  ladino: {
    armas: [armasBase.espadaCurta, armasBase.bestaLeve, armasBase.adaga],
    armadura: armadurasBase.couro,
    escudo: null,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.ferramentasLadrao],
    dinheiro_kit: { po: "4d4" },
    dinheiro_sem_kit: { po: "5d4 x 10" }
  },
  mago: {
    armas: [armasBase.bestaLeve],
    armadura: null,
    escudo: null,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.grimorio],
    dinheiro_kit: { po: "3d6" },
    dinheiro_sem_kit: { po: "3d4 x 10" }
  },
  monge: {
    armas: [armasBase.funda, armasBase.clava],
    armadura: null,
    escudo: null,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.tochas],
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "5d4" }
  },
  paladino: {
    armas: [armasBase.espadaLonga, armasBase.arcoCurto, armasBase.funda],
    armadura: armadurasBase.brunea,
    escudo: escudosBase.madeiraPesado,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.lanterna, itensBase.oleo300, itensBase.simboloSagrado],
    dinheiro_kit: { po: "6d4" },
    dinheiro_sem_kit: { po: "6d4 x 10" }
  },
  ranger: {
    armas: [armasBase.espadaLonga, armasBase.espadaCurta, armasBase.arcoLongo],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: [itensBase.mochila, itensBase.cantil, itensBase.racao, itensBase.sacoDormir, itensBase.saco, itensBase.pederneira, itensBase.isqueiro, itensBase.tochas],
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "6d4 x 10" }
  }
}

export function getItensClasse(classe) {
  if (!classe) return null
  return itensPorClasse[classe.toLowerCase()] || null
}
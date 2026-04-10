// ==========================
// BASE DE ITENS (REUTILIZÁVEL)
// ==========================

const itensBase = {
  mochila: { nome: "Mochila" },
  cantil: { nome: "Cantil" },
  racao: { nome: "Rações (1 dia)" },
  sacoDormir: { nome: "Saco de Dormir" },
  saco: { nome: "Saco" },
  pederneira: { nome: "Pederneira" },
  isqueiro: { nome: "Isqueiro" },
  tochas: { nome: "3 Tochas" },
  lanterna: { nome: "Lanterna Coberta" },
  oleo300: { nome: "Óleo (300 ml)" },
  oleo500: { nome: "Óleo (500 ml)" },

  // extras (pra evitar hardcode nas classes)
  grimorio: { nome: "Grimório" },
  ferramentasLadrao: { nome: "Ferramentas de ladrão" },
  simboloSagrado: { nome: "Símbolo sagrado" },
  alaude: { nome: "Alaúde" },
  bolsaComponentes: { nome: "Bolsa de componentes de magia" },
  azevinho: { nome: "Azevinho e visco" }
};

// ==========================
// FUNÇÃO PADRÃO DE ARMAS
// ==========================

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
    subtipo: data.subtipo || null
  };
}

// ==========================
// BASE DE ARMAS (ÚNICA)
// ==========================

const armasBase = {
  machadoGrande: armaPadrao({
    nome: "Machado Grande",
    dano: "1d12",
    critico: "x3",
    categoria: "duas_maos",
    tipo_dano: "cortante",
    peso: "6 kg",
    tipo_ataque: "corpo"
  }),

  arcoCurto: armaPadrao({
    nome: "Arco Curto",
    dano: "1d6",
    critico: "x3",
    alcance: "18 m",
    categoria: "duas_maos",
    tipo_dano: "perfurante",
    peso: "1 kg",
    municao: "Flechas",
    quantidade: "20",
    tipo_ataque: "distancia",
    subtipo: "disparo"
  }),

  arcoLongo: armaPadrao({
    nome: "Arco Longo",
    dano: "1d8",
    critico: "x3",
    alcance: "30 m",
    categoria: "duas_maos",
    tipo_dano: "perfurante",
    peso: "1,5 kg",
    municao: "Flechas",
    quantidade: "20",
    tipo_ataque: "distancia",
    subtipo: "disparo"
  }),

  adaga: armaPadrao({
    nome: "Adaga",
    dano: "1d4",
    critico: "19-20/x2",
    alcance: "3 m",
    categoria: "leve",
    tipo_dano: "perfurante",
    peso: "0,5 kg",
    tipo_ataque: "corpo",
    subtipo: "arremesso"
  }),

  bestaLeve: armaPadrao({
    nome: "Besta Leve",
    dano: "1d8",
    critico: "19-20/x2",
    alcance: "24 m",
    categoria: "duas_maos",
    tipo_dano: "perfurante",
    peso: "2 kg",
    municao: "Virotes",
    quantidade: "10",
    tipo_ataque: "distancia",
    subtipo: "disparo"
  }),

  espadaLonga: armaPadrao({
    nome: "Espada Longa",
    dano: "1d8",
    critico: "19-20/x2",
    categoria: "uma_mao",
    tipo_dano: "cortante",
    peso: "2 kg",
    tipo_ataque: "corpo"
  }),

  espadaCurta: armaPadrao({
    nome: "Espada Curta",
    dano: "1d6",
    critico: "19-20/x2",
    categoria: "leve",
    tipo_dano: "perfurante",
    peso: "1 kg",
    tipo_ataque: "corpo"
  }),

  bordao: armaPadrao({
    nome: "Bordão",
    dano: "1d6/1d6",
    critico: "x2",
    categoria: "duas_maos",
    tipo_dano: "concussao",
    peso: "2 kg",
    tipo_ataque: "corpo"
  }),

  funda: armaPadrao({
    nome: "Funda",
    dano: "1d4",
    critico: "x2",
    alcance: "15 m",
    categoria: "uma_mao",
    tipo_dano: "concussao",
    peso: "0,5 kg",
    municao: "Balas",
    quantidade: "10",
    tipo_ataque: "distancia",
    subtipo: "arremesso"
  }),

  cimitarra: armaPadrao({
    nome: "Cimitarra",
    dano: "1d6",
    critico: "18-20/x2",
    categoria: "uma_mao",
    tipo_dano: "cortante",
    peso: "2 kg",
    tipo_ataque: "corpo"
  }),

  clava: armaPadrao({
    nome: "Clava",
    dano: "1d6",
    critico: "x2",
    categoria: "uma_mao",
    tipo_dano: "concussao",
    peso: "1,5 kg",
    tipo_ataque: "corpo"
  }),

  lancaCurta: armaPadrao({
    nome: "Lança Curta",
    dano: "1d6",
    critico: "x2",
    alcance: "6 m",
    categoria: "uma_mao",
    tipo_dano: "perfurante",
    peso: "1,5 kg",
    tipo_ataque: "corpo",
    subtipo: "arremesso"
  }),

  macaPesada: armaPadrao({
    nome: "Maça Pesada",
    dano: "1d8",
    critico: "x2",
    categoria: "uma_mao",
    tipo_dano: "concussao",
    peso: "4 kg",
    tipo_ataque: "corpo"
  })
};

// ==========================
// ARMADURAS / ESCUDOS
// ==========================

const armadurasBase = {
  couro: {
    nome: "Corselete de Couro",
    tipo: "Leve",
    bonus_ca: "+2",
    dex_max: "+6",
    penalidade: "0",
    falha_magia: "10%",
    deslocamento: "9 m",
    peso: "7,5 kg",
    propriedades: ""
  },

  couroBatido: {
    nome: "Corselete de Couro Batido",
    tipo: "Leve",
    bonus_ca: "+3",
    dex_max: "+5",
    penalidade: "-1",
    falha_magia: "15%",
    deslocamento: "9 m",
    peso: "10 kg",
    propriedades: ""
  },

  peles: {
    nome: "Gibão de Peles",
    tipo: "Leve",
    bonus_ca: "+3",
    dex_max: "+4",
    penalidade: "-3",
    falha_magia: "20%",
    deslocamento: "9 m",
    peso: "11,5 kg",
    propriedades: ""
  },

  brunea: {
    nome: "Brunea",
    tipo: "Média",
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
    nome: "Escudo Leve de Madeira",
    bonus_ca: "+1",
    penalidade: "-1",
    falha_magia: "5%",
    peso: "2,5 kg",
    propriedades: ""
  },

  madeiraPesado: {
    nome: "Escudo Pesado de Madeira",
    bonus_ca: "+2",
    penalidade: "-2",
    falha_magia: "15%",
    peso: "5 kg",
    propriedades: ""
  },

  metalLeve: {
    nome: "Escudo Leve de Aço",
    bonus_ca: "+1",
    penalidade: "-1",
    falha_magia: "5%",
    peso: "3 kg",
    propriedades: ""
  },

  metalPesado: {
    nome: "Escudo Pesado de Aço",
    bonus_ca: "+2",
    penalidade: "-2",
    falha_magia: "15%",
    peso: "7,5 kg",
    propriedades: ""
  }
};

// ==========================
// ITENS PADRÃO
// ==========================

const itensPadrao = () => [
  itensBase.mochila,
  itensBase.cantil,
  itensBase.racao,
  itensBase.sacoDormir,
  itensBase.saco,
  itensBase.pederneira,
  itensBase.isqueiro
];

// ==========================
// CLASSES (SEM HARDCODE)
// ==========================

export const itensPorClasse = {
  barbaro: {
    armas: [armasBase.machadoGrande, armasBase.arcoCurto, armasBase.adaga],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: itensPadrao(),
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "4d4 x 10" }
  },

  bardo: {
    armas: [armasBase.espadaLonga, armasBase.bestaLeve],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: [...itensPadrao(), itensBase.tochas, itensBase.alaude, itensBase.bolsaComponentes],
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "4d4 x 10" }
  },

  clerigo: {
    armas: [armasBase.macaPesada, armasBase.bestaLeve],
    armadura: armadurasBase.brunea,
    escudo: escudosBase.madeiraPesado,
    itens: [...itensPadrao(), itensBase.tochas, itensBase.simboloSagrado],
    dinheiro_kit: { po: "1d4" },
    dinheiro_sem_kit: { po: "5d4 x 10" }
  },

  druida: {
    armas: [armasBase.cimitarra, armasBase.clava, armasBase.funda],
    armadura: armadurasBase.peles,
    escudo: escudosBase.madeiraPesado,
    itens: [...itensPadrao(), itensBase.tochas, itensBase.azevinho],
    dinheiro_kit: { po: "1d6" },
    dinheiro_sem_kit: { po: "2d4 x 10" }
    
  },

  feiticeiro: {
    armas: [armasBase.lancaCurta, armasBase.bestaLeve],
    armadura: null,
    escudo: null,
    itens: [...itensPadrao(), itensBase.lanterna, itensBase.oleo500, itensBase.bolsaComponentes],
    dinheiro_kit: { po: "3d4" },
    dinheiro_sem_kit: { po: "3d4 x 10" }
  },

  guerreiro: {
    armas: [armasBase.machadoGrande, armasBase.arcoCurto],
    armadura: armadurasBase.brunea,
    escudo: escudosBase.madeiraPesado,
    itens: itensPadrao(),
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "6d4 x 10" }
  },

  ladino: {
    armas: [armasBase.espadaCurta, armasBase.bestaLeve, armasBase.adaga],
    armadura: armadurasBase.couro,
    escudo: null,
    itens: [...itensPadrao(), itensBase.ferramentasLadrao],
    dinheiro_kit: { po: "4d4" },
    dinheiro_sem_kit: { po: "5d4 x 10" }
  },

  mago: {
    armas: [armasBase.bordao, armasBase.bestaLeve],
    armadura: null,
    escudo: null,
    itens: [...itensPadrao(), itensBase.grimorio],
    dinheiro_kit: { po: "3d6" },
    dinheiro_sem_kit: { po: "3d4 x 10" }
  },

  monge: {
    armas: [armasBase.bordao, armasBase.funda],
    armadura: null,
    escudo: null,
    itens: [...itensPadrao(), itensBase.tochas],
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "5d4" }
  },

  paladino: {
    armas: [armasBase.espadaLonga, armasBase.arcoCurto, armasBase.funda],
    armadura: armadurasBase.brunea,
    escudo: escudosBase.madeiraPesado,
    itens: [...itensPadrao(), itensBase.lanterna, itensBase.oleo300, itensBase.simboloSagrado],
    dinheiro_kit: { po: "6d4" },
    dinheiro_sem_kit: { po: "6d4 x 10" }
  },

  ranger: {
    armas: [armasBase.espadaLonga, armasBase.espadaCurta, armasBase.arcoLongo],
    armadura: armadurasBase.couroBatido,
    escudo: null,
    itens: [...itensPadrao(), itensBase.tochas],
    dinheiro_kit: { po: "2d4" },
    dinheiro_sem_kit: { po: "6d4 x 10" }
  }
};

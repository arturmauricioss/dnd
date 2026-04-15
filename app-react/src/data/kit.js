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
};

export function getDinheiroInicial(classe) {
  if (!classe) return { po: 0, pl: 0, pp: 0, pc: 0 };
  return dinheiroInicialClasse[classe.toLowerCase()] || { po: 0, pl: 0, pp: 0, pc: 0 };
}

export const itensPorClasse = {
  barbaro: {
    armas: ["machado-grande", "arco-curto", "adaga"],
    armadura: "couro_batido",
    escudo: null,
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro"]
  },
  bardo: {
    armas: ["espada-longa", "besta-leve"],
    armadura: "couro_batido",
    escudo: null,
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "tocha", "instrumento", "bolsa_componentes"]
  },
  clerigo: {
    armas: ["maca-pesada", "besta-leve"],
    armadura: "brunea",
    escudo: "escudo_grande_madeira",
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "tocha", "simbolo_sagrado_madeira"]
  },
  druida: {
    armas: ["cimitarra", "clava", "funda"],
    armadura: "gibao_peles",
    escudo: "escudo_grande_madeira",
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "tocha", "azevinho_vinco"]
  },
  feiticeiro: {
    armas: ["lanca-curta", "besta-leve"],
    armadura: null,
    escudo: null,
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "lanterna_coberta", "oleo", "bolsa_componentes"]
  },
  guerreiro: {
    armas: ["machado-grande", "arco-curto"],
    armadura: "brunea",
    escudo: "escudo_grande_madeira",
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro"]
  },
  ladino: {
    armas: ["espada-curta", "besta-leve", "adaga"],
    armadura: "couro",
    escudo: null,
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "instrumentos_ladrao"]
  },
  mago: {
    armas: ["besta-leve"],
    armadura: null,
    escudo: null,
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "grimorio"]
  },
  monge: {
    armas: ["funda", "clava"],
    armadura: null,
    escudo: null,
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "tocha"]
  },
  paladino: {
    armas: ["espada-longa", "arco-curto", "funda"],
    armadura: "brunea",
    escudo: "escudo_grande_madeira",
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "lanterna_coberta", "oleo", "simbolo_sagrado_madeira"]
  },
  ranger: {
    armas: ["espada-longa", "espada-curta", "arco-longo"],
    armadura: "couro_batido",
    escudo: null,
    itens: ["mochila", "cantil", "racao", "aco_dormir", "aco", "pederneira", "isqueiro", "tocha"]
  }
};

export function getItensClasse(classe) {
  if (!classe) return null;
  return itensPorClasse[classe.toLowerCase()] || null;
}
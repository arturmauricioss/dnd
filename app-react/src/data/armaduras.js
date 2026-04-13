export const armadurasBase = {
  nenhum: { nome: "—", penalidade: 0 },
  couro: { nome: "Couro", penalidade: 0 },
  couroBatido: { nome: "Couro Batido", penalidade: 1 },
  brunea: { nome: "Brunea", penalidade: 2 },
  malha: { nome: "Malha", penalidade: 3 },
  cotaDeMalha: { nome: "Cota de Malha", penalidade: 4 },
  cintaDeMolas: { nome: "Cinta de Molas", penalidade: 3 },
  peitoral: { nome: "Peitoral", penalidade: 4 },
  halcao: { nome: "Meia-Armadura", penalidade: 6 },
  peles: { nome: "Peles", penalidade: 0 },
}

export const escudosBase = {
  nenhum: { nome: "—", penalidade: 0 },
  escudoLeve: { nome: "Escudo Leve", penalidade: 1 },
  escudoGrande: { nome: "Escudo Grande", penalidade: 2 },
  torres: { nome: "Torres", penalidade: 4 },
  madeiraPesado: { nome: "Escudo de Madeira", penalidade: 2 },
  ferro: { nome: "Escudo de Ferro", penalidade: 2 },
}

export function getPenalidadeArmadura(armaduraId) {
  return armadurasBase[armaduraId]?.penalidade || 0
}

export function getPenalidadeEscudo(escudoId) {
  return escudosBase[escudoId]?.penalidade || 0
}

export function getPenalidadeTotal(armaduraId, escudoId) {
  if (!armaduraId || armaduraId === 'selecione') armaduraId = 'nenhum';
  if (!escudoId || escudoId === 'selecione') escudoId = 'nenhum';
  return getPenalidadeArmadura(armaduraId) + getPenalidadeEscudo(escudoId);
}
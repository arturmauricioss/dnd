export const todasArmaduras = {
  // acolchoada: { nome: "Acolchoada", custo: 500, bonus: "+1", tipo: "leve", dex_max: "+8", penalidade: 0, falha_magia: "5%", peso: "5 kg", loja: 'armeiro' },
  // couro: { nome: "Couro", custo: 1000, bonus: "+2", tipo: "leve", dex_max: "+6", penalidade: 0, falha_magia: "10%", peso: "7,5 kg", loja: 'armeiro' },
  // couro_batido: { nome: "Couro.batido", custo: 2500, bonus: "+3", tipo: "leve", dex_max: "+5", penalidade: -1, falha_magia: "15%", peso: "10 kg", loja: 'armeiro' },
  // camisao_cota: { nome: "Camisão de Cota de Malha", custo: 10000, bonus: "+4", tipo: "leve", dex_max: "+4", penalidade: -2, falha_magia: "20%", peso: "12,5 kg", loja: 'armeiro' },

  gibao_peles: { nome: "Gibão de Peles", custo: 1500, bonus: "+3", tipo: "media", dex_max: "+4", penalidade: -3, falha_magia: "20%", peso: "12,5 kg" },
  brunea: { nome: "Brunea", custo: 5000, bonus: "+4", tipo: "media", dex_max: "+3", penalidade: -4, falha_magia: "25%", peso: "15 kg" },
  cota_malha: { nome: "Cota de Malha", custo: 15000, bonus: "+5", tipo: "media", dex_max: "+2", penalidade: -5, falha_magia: "30%", peso: "20 kg" }
  // ,
  // peitoral_aco: { nome: "Peitoral de Aço", custo: 20000, bonus: "+5", tipo: "media", dex_max: "+3", penalidade: -4, falha_magia: "25%", peso: "15 kg" },

  // cota_talas: { nome: "Cota de Talas", custo: 2000, bonus: "+6", tipo: "pesada", dex_max: "+0", penalidade: -7, falha_magia: "40%", peso: "22,5 kg" },
  // loriga_segmentada: { nome: "Loriga Segmentada", custo: 25000, bonus: "+6", tipo: "pesada", dex_max: "+1", penalidade: -6, falha_magia: "35%", peso: "17,5 kg" },
  // meia_armadura: { nome: "Meia Armadura", custo: 60000, bonus: "+7", tipo: "pesada", dex_max: "+0", penalidade: -7, falha_magia: "40%", peso: "25 kg" },
  // armadura_batalha: { nome: "Armadura de Batalha", custo: 150000, bonus: "+8", tipo: "pesada", dex_max: "+1", penalidade: -6, falha_magia: "35%", peso: "25 kg" }
};

export const todosEscudos = {
  broquel: { nome: "Broquel", custo: 1500, bonus: "+1", tipo: "escudo", penalidade: -1, falha_magia: "5%", peso: "2,5 kg" },
  escudo_pequeno_madeira: { nome: "Escudo Pequeno de Madeira", custo: 300, bonus: "+1", tipo: "escudo", penalidade: -1, falha_magia: "5%", peso: "2,5 kg" }
  // ,
  // escudo_pequeno_metal: { nome: "Escudo Pequeno de Metal", custo: 900, bonus: "+1", tipo: "escudo", penalidade: -1, falha_magia: "5%", peso: "3 kg" },
  // escudo_grande_madeira: { nome: "Escudo Grande de Madeira", custo: 700, bonus: "+2", tipo: "escudo", penalidade: -2, falha_magia: "15%", peso: "5 kg" },
  // escudo_grande_metal: { nome: "Escudo Grande de Metal", custo: 2000, bonus: "+2", tipo: "escudo", penalidade: -2, falha_magia: "15%", peso: "7,5 kg" },
  // escudo_corpo: { nome: "Escudo de Corpo", custo: 3000, bonus: "+4", tipo: "escudo", penalidade: -10, falha_magia: "50%", peso: "22,5 kg" }
};

export const armadurasNormalizadas = Object.fromEntries(
  Object.entries(todasArmaduras).map(([id, a]) => {
    const { tipo: _tipoOriginal, ...resto } = a
    return [id, { id, tipo: "armadura", tipoLoja: "armadura", ...resto }]
  })
);

export const escudosNormalizados = Object.fromEntries(
  Object.entries(todosEscudos).map(([id, s]) => {
    const { tipo: _tipoOriginal, ...resto } = s
    return [id, { id, tipo: "escudo", tipoLoja: "escudo", ...resto }]
  })
);
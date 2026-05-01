export const instrumentos = {
  // ampulheta: { nome: "Ampulheta", custo: 2500, peso: "0,5 kg" },
  // azevinho_vinco: { nome: "Azevinho e visco", custo: 0, peso: "-" },
  // balanca: { nome: "Balança de mercador", custo: 200, peso: "0,5 kg" },
  // bolsa_componentes: { nome: "Bolsa de componentes de magia", custo: 500, peso: "1 kg" },
  // clepsidra: { nome: "Clepsidra", custo: 100000, peso: "100 kg" },
  // ferramenta_op: { nome: "Ferramenta (obra-prima) de artesão", custo: 5000, peso: "0,5 kg" },
  // ferramenta: { nome: "Ferramenta de artesão", custo: 500, peso: "2,5 kg" },
  // grimorio: { nome: "Grimório de mago (em branco)", custo: 1500, peso: "1,5 kg" },
  // instrumento_op: { nome: "Instrumento musical (obra-prima)", custo: 10000, peso: "1,5 kg" },
  // instrumento: { nome: "Instrumento musical comum", custo: 500, peso: "1,5 kg" },
  // instrumentos_ladrao_op: { nome: "Instrumentos de ladrão (obra-prima)", custo: 10000, peso: "1 kg" },
  // instrumentos_ladrao: { nome: "Instrumentos de ladrão", custo: 3000, peso: "0,5 kg" },
  // kit_disfarces: { nome: "Kit de disfarces", custo: 5000, peso: "4 kg" },
  // kit_escalada: { nome: "Kit de escalada", custo: 8000, peso: "2,5 kg" },
  // kit_socorros: { nome: "Kit de primeiros socorros", custo: 5000, peso: "0,5 kg" },
  // laboratorio: { nome: "Laboratório alquímico", custo: 50000, peso: "20 kg" },
  // lente_aumento: { nome: "Lente de aumento", custo: 10000, peso: "-" },
  // simbolo_sagrado_madeira: { nome: "Símbolo sagrado de madeira", custo: 100, peso: "-" },
  // simbolo_sagrado_prata: { nome: "Símbolo sagrado de prata", custo: 2500, peso: "0,5 kg" }
};

export const instrumentosNormalizados = Object.fromEntries(
  Object.entries(instrumentos).map(([id, inst]) => [id, { id, tipo: "instrumento", tipoLoja: "instrumento", ...inst }])
);
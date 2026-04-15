export const fisicoPorRaca = {
  humano: {
    masculino: { altura: "1.65m - 1.90m", peso: "60 - 100kg" },
    feminino: { altura: "1.55m - 1.80m", peso: "50 - 80kg" }
  },
  elfo: {
    masculino: { altura: "1.70m - 2.00m", peso: "55 - 80kg" },
    feminino: { altura: "1.60m - 1.90m", peso: "45 - 70kg" }
  },
  anao: {
    masculino: { altura: "1.20m - 1.40m", peso: "70 - 100kg" },
    feminino: { altura: "1.10m - 1.30m", peso: "60 - 90kg" }
  },
  halfling: {
    masculino: { altura: "0.90m - 1.10m", peso: "30 - 40kg" },
    feminino: { altura: "0.85m - 1.05m", peso: "25 - 35kg" }
  },
  gnomo: {
    masculino: { altura: "0.90m - 1.10m", peso: "35 - 45kg" },
    feminino: { altura: "0.85m - 1.05m", peso: "30 - 40kg" }
  },
  "meio-elfo": {
    masculino: { altura: "1.65m - 1.95m", peso: "55 - 90kg" },
    feminino: { altura: "1.55m - 1.85m", peso: "45 - 75kg" }
  },
  "meio-orc": {
    masculino: { altura: "1.80m - 2.10m", peso: "80 - 120kg" },
    feminino: { altura: "1.70m - 2.00m", peso: "70 - 100kg" }
  }
}

export const fisicoGeral = {
  humano: { altura: "1.55m - 1.90m", peso: "50 - 100kg" },
  elfo: { altura: "1.60m - 2.00m", peso: "45 - 80kg" },
  anao: { altura: "1.10m - 1.40m", peso: "60 - 100kg" },
  halfling: { altura: "0.85m - 1.10m", peso: "25 - 40kg" },
  gnomo: { altura: "0.85m - 1.10m", peso: "30 - 45kg" },
  "meio-elfo": { altura: "1.55m - 1.95m", peso: "45 - 90kg" },
  "meio-orc": { altura: "1.70m - 2.10m", peso: "70 - 120kg" }
}

export const idadePorRaca = {
  humano: { min: 15, max: 80 },
  elfo: { min: 100, max: 750 },
  anao: { min: 40, max: 350 },
  gnomo: { min: 40, max: 400 },
  "meio-elfo": { min: 20, max: 180 },
  "meio-orc": { min: 14, max: 60 },
  halfling: { min: 20, max: 150 }
}

export function getFisicoSugerido(raca, sexo) {
  if (!sexo || sexo === 'selecione') {
    return fisicoGeral[raca] || { altura: '', peso: '' }
  }
  
  const racaData = fisicoPorRaca[raca]
  if (!racaData) return { altura: '', peso: '' }
  
  const sexoKey = sexo === 'feminino' ? 'feminino' : 'masculino'
  return racaData[sexoKey] || { altura: '', peso: '' }
}

export function getIdadeSugerida(raca) {
  const dados = idadePorRaca[raca]
  if (!dados) return { min: '', max: '' }
  return dados
}
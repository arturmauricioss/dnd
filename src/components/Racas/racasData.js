export const racas = [
  { id: 'selecione', nome: 'SELECIONE...', bonus: {} },
  { id: 'humano', nome: 'HUMANO' },
  { id: 'elfo', nome: 'ELFO' },
  { id: 'anao', nome: 'ANÃO' },
  { id: 'gnomo', nome: 'GNOMO' },
  { id: 'meio-elfo', nome: 'MEIO-ELFO' },
  { id: 'meio-orc', nome: 'MEIO-ORC' },
  { id: 'halfling', nome: 'HALFLING' },
]

export const sexos = [
  { id: 'selecione', nome: 'SELECIONE...' },
  { id: 'masculino', nome: 'MASCULINO' },
  { id: 'feminino', nome: 'FEMININO' },
]

export const bonusRacialAtributos = {
  humano: { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 },
  anao: { constituicao: 2, carisma: -2 },
  elfo: { destreza: 2, constituicao: -2 },
  gnomo: { constituicao: 2, forca: -2 },
  "meio-elfo": { destreza: 1, constituicao: -1}, //regra própria de equilibrio entre a regra elfo/humano
  "meio-orc": { forca: 2, inteligencia: -2, carisma: -2 },
  halfling: { destreza: 2, forca: -2 }
}

export const bonusRacialResistencia = {
  halfling: { fort: 1, ref: 1, von: 1 }
}

export const tamanhoPorRaca = {
  humano: 'media',
  elfo: 'media',
  anao: 'media',
  gnomo: 'pequena',
  'meio-elfo': 'media',
  'meio-orc': 'media',
  halfling: 'pequena',
}

export const deslocamentoPorRaca = {
  humano: 9,
  elfo: 9,
  anao: 6,
  gnomo: 6,
  'meio-elfo': 9,
  'meio-orc': 9,
  halfling: 6,
}

export const idiomasRaciais = {
  humano: { base: ['Comum'], extras: [] },
  elfo: { base: ['Comum', 'Élfico'], extras: ['Anão', 'Gnômico'] },
  anao: { base: ['Comum', 'Anão'], extras: ['Élfico', 'Gnômico', 'Orc'] },
  gnomo: { base: ['Comum', 'Gnômico'], extras: ['Élfico', 'Anão'] },
  'meio-elfo': { base: ['Comum', 'Élfico'], extras: ['Humano', 'Anão'] },
  'meio-orc': { base: ['Comum', 'Orc'], extras: ['Humano'] },
  halfling: { base: ['Comum'], extras: ['Anão', 'Élfico'] },
}

export const fisicoPorRaca = {
  humano: {
    masculino: { altura: "1.65 m - 1.90 m" , peso: "60 - 100 Kg" },
    feminino: { altura: "1.55 m - 1.80 m" , peso: "50 - 80 Kg" }
  },
  elfo: {
    masculino: { altura: "1.70 m - 2.00 m" , peso: "55 - 80 Kg" },
    feminino: { altura: "1.60 m - 1.90 m" , peso: "45 - 70 Kg" }
  },
  anao: {
    masculino: { altura: "1.20 m - 1.40 m" , peso: "70 - 100 Kg" },
    feminino: { altura: "1.10 m - 1.30 m" , peso: "60 - 90 Kg" }
  },
  halfling: {
    masculino: { altura: "0.90 m - 1.10 m" , peso: "30 - 40 Kg" },
    feminino: { altura: "0.85 m - 1.05 m" , peso: "25 - 35 Kg" }
  },
  gnomo: {
    masculino: { altura: "0.90 m - 1.10 m" , peso: "35 - 45 Kg" },
    feminino: { altura: "0.85 m - 1.05 m" , peso: "30 - 40 Kg" }
  },
  "meio-elfo": {
    masculino: { altura: "1.65 m - 1.95 m" , peso: "55 - 90 Kg" },
    feminino: { altura: "1.55 m - 1.85 m" , peso: "45 - 75 Kg" }
  },
  "meio-orc": {
    masculino: { altura: "1.80 m - 2.10 m" , peso: "80 - 120 Kg" },
    feminino: { altura: "1.70 m - 2.00 m" , peso: "70 - 100 Kg" }
  }
}

export const fisicoGeral = {
  humano: { altura: "1.55 m - 1.90 m" , peso: "50 - 100 Kg" },
  elfo: { altura: "1.60 m - 2.00 m" , peso: "45 - 80 Kg" },
  anao: { altura: "1.10 m - 1.40 m" , peso: "60 - 100 Kg" },
  halfling: { altura: "0.85 m - 1.10 m" , peso: "25 - 40 Kg" },
  gnomo: { altura: "0.85 m - 1.10 m" , peso: "30 - 45 Kg" },
  "meio-elfo": { altura: "1.55 m - 1.95 m" , peso: "45 - 90 Kg" },
  "meio-orc": { altura: "1.70 m - 2.10 m" , peso: "70 - 120 Kg" }
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
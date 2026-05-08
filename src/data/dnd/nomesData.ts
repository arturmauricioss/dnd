// data/nomesData.ts

export const nomesMasculinos = [
  'Thorin',
  'Arthas',
  'Darian',
  'Kael',
  'Borin',
  'Eldric',
  'Ragnar'
]

export const nomesFemininos = [
  'Lyra',
  'Arwen',
  'Selene',
  'Freya',
  'Morgana',
  'Elora',
  'Ygritte'
]

export function gerarNomeAleatorio(genero: 'm' | 'f') {
  const lista = genero === 'm'
    ? nomesMasculinos
    : nomesFemininos

  return lista[Math.floor(Math.random() * lista.length)]
}
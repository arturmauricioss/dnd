import { nomesMasculinos, nomesFemininos } from '../data/nomesData'

export function gerarNomeAleatorio(genero: 'm' | 'f'): string {
  const nomes = genero === 'm' ? nomesMasculinos : nomesFemininos
  const indice = Math.floor(Math.random() * nomes.length)
  return nomes[indice]
}
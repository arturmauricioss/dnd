import { nomesMasculinos, nomesFemininos } from '@data/dnd/nomesData'

export function gerarNomeAleatorio(genero: 'm' | 'f'): string {
  const lista = genero === 'm' ? nomesMasculinos : nomesFemininos
  return lista[Math.floor(Math.random() * lista.length)]
}
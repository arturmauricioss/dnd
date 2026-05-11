import { useCallback } from 'react'
import { nomes } from '../data/nomesData'
import type { Race } from '@systems/race/types'

interface UseNomeRandomProps {
  raca: Race | null
  genero: string
  setNome: (nome: string) => void
}

export default function useNomeRandom({ raca, genero, setNome }: UseNomeRandomProps) {
  const filtrarNomes = useCallback((racaSelecionada: Race | null, generoSelecionado: string) => {
    let filtrados = [...nomes]

    if (racaSelecionada) {
      if (racaSelecionada.name === 'Meio-Elfo') {
        filtrados = filtrados.filter(n =>
          n.racas.includes('Humano') || n.racas.includes('Elfo') || n.racas.length === 0
        )
      } else if (racaSelecionada.name === 'Meio-Orc') {
        filtrados = filtrados.filter(n =>
          n.racas.includes('Humano') || n.racas.includes('Orc') || n.racas.length === 0
        )
      } else {
        filtrados = filtrados.filter(n =>
          n.racas.length === 0 || n.racas.includes(racaSelecionada.name)
        )
      }
    }

    if (generoSelecionado) {
      filtrados = filtrados.filter(n =>
        n.genero === generoSelecionado || n.genero === 'unissex'
      )
    }

    return filtrados
  }, [])

  const gerarNome = useCallback(() => {
    // ? só leva em consideração o gênero, não a raça
    let filtrados = [...nomes]

    if (genero) {
      filtrados = filtrados.filter(n =>
        n.genero === genero || n.genero === 'unissex'
      )
    }

    if (filtrados.length === 0) return

    const randomIndex = Math.floor(Math.random() * filtrados.length)
    setNome(filtrados[randomIndex].nome)
  }, [genero, setNome])

  const gerarNomeRaca = useCallback(() => {
    if (!raca) return

    const filtrados = filtrarNomes(raca, genero)

    if (filtrados.length === 0) return

    const randomIndex = Math.floor(Math.random() * filtrados.length)
    setNome(filtrados[randomIndex].nome)
  }, [raca, genero, filtrarNomes, setNome])

  const isBotaoRacaDisabled = !raca

  return {
    gerarNome,
    gerarNomeRaca,
    isBotaoRacaDisabled,
  }
}
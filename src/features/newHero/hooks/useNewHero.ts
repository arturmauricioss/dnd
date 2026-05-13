import { useState } from 'react'
import useNomeRandom from '@systems/names/hooks/useNomeRandom'
import type { Race } from '@systems/race'

export function useNewHero() {
  const [nome, setNome] = useState('')
  const [raca, setRaca] = useState<Race | null>(null)
  const [genero, setGenero] = useState('')

  const { gerarNome, gerarNomeRaca, isBotaoRacaDisabled } = useNomeRandom({
    raca,
    genero,
    setNome,
  })

  return {
    nome,
    setNome,
    raca,
    setRaca,
    genero,
    setGenero,
    gerarNome,
    gerarNomeRaca,
    isBotaoRacaDisabled,
  }
}
import { useState } from 'react'
import { campanhasComoJogador, campanhasComoMestre } from '@data/mocks/campanhasData'
import type { Campanha } from '@types'

export function useCampanhas() {
  const [jogando] = useState<Campanha[]>(campanhasComoJogador)
  const [mestrando] = useState<Campanha[]>(campanhasComoMestre)

  return { jogando, mestrando }
}
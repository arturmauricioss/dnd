import { useState } from 'react'
import { campanhasComoJogador, campanhasComoMestre } from '@features/campaigns/data/campanhasData'
import type { Campanha } from '@features/campaigns/types'

export function useCampanhas() {
  const [jogando] = useState<Campanha[]>(campanhasComoJogador)
  const [mestrando] = useState<Campanha[]>(campanhasComoMestre)

  return { jogando, mestrando }
}
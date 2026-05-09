import { useState, useMemo } from 'react'
import { heroesData } from '@features/heroes/data/heroesData'
import type { Heroi } from '@features/heroes/types'

export function useHeroes() {
  const [herois] = useState<Heroi[]>(heroesData)

  const heroisVivos = useMemo(() => herois.filter(h => h.status === 'alive'), [herois])
  const heroisMortos = useMemo(() => herois.filter(h => h.status === 'dead'), [herois])

  return { heroisVivos, heroisMortos }
}
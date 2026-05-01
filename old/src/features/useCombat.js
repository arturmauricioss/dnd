// ============================================
// FEATURES - Hooks por domínio
// ============================================

import { useMemo } from 'react'
import { useCharacter } from '@context/CharacterContext'
import { getModificador } from '@rules/combat'
import { getDadosCombate } from '@engine/personagem'

export function useCombat() {
  const { personagem, atualizarCampo } = useCharacter()

  const getMod = (atributo) => {
    if (!personagem?.atributos) return 0
    return getModificador(personagem.atributos[atributo])
  }

  const dadosCombate = useMemo(() => {
    if (!personagem?.classe) return null
    return getDadosCombate(personagem, getMod)
  }, [personagem])

  return {
    personagem,
    dadosCombate,
    atualizarCampo
  }
}

export function usePersonagem() {
  const { personagem, atualizarCampo } = useCharacter()

  return {
    personagem,
    atualizarCampo
  }
}

export function useInventario() {
  const { personagem, atualizarCampo } = useCharacter()

  return {
    personagem,
    atualizarCampo
  }
}
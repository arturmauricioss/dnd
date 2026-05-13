import { useState, useEffect } from 'react'
import type { Character } from '@systems/character'

const STORAGE_KEY = 'personagens'

export function usePersonagens() {
  const [personagens, setPersonagens] = useState<Character[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setPersonagens(JSON.parse(saved))
      } catch {
        setPersonagens([])
      }
    }
  }, [])

  function salvarPersonagem(personagem: Character) {
    const updated = [personagem, ...personagens]
    setPersonagens(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  function removerPersonagem(id: string) {
    const updated = personagens.filter(p => p.id !== id)
    setPersonagens(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  return { personagens, salvarPersonagem, removerPersonagem }
}
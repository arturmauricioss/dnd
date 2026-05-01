import { createContext, useContext, ReactNode } from 'react'

const CharacterContext = createContext(null)

export function CharacterProvider({ children }: { children: ReactNode }) {
  return (
    <CharacterContext.Provider value={null}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  return useContext(CharacterContext)
}
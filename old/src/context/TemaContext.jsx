import { createContext, useContext, useState, useEffect } from 'react'

const TemaContext = createContext()

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return parseInt(localStorage.getItem('themeIndex') || '0')
  })

  useEffect(() => {
    localStorage.setItem('themeIndex', tema.toString())
    
    const temas = ['light', 'penumbra', 'dark']
    document.documentElement.setAttribute('data-theme', temas[tema])
    
    const customThemes = localStorage.getItem('customThemes')
    if (customThemes) {
      const themes = JSON.parse(customThemes)
      const vars = themes[tema.toString()]
      if (vars) {
        Object.entries(vars).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value)
        })
      }
    }
  }, [tema])

  const mudarTema = (novo) => {
    setTema(novo)
  }

  const proximoTema = () => {
    setTema((tema + 1) % 3)
  }

  return (
    <TemaContext.Provider value={{ tema, setTema: mudarTema, proximoTema }}>
      {children}
    </TemaContext.Provider>
  )
}

export function useTema() {
  return useContext(TemaContext)
}
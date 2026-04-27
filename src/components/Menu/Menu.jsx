import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Menu.css'

export default function Menu() {

  const temas = ['light', 'penumbra', 'dark']
  const [temaIndex, setTemaIndex] = useState(0)

  const aplicarTema = (index) => {
    const tema = temas[index]
    document.documentElement.setAttribute('data-theme', tema)
    localStorage.setItem('theme', tema)
    setTemaIndex(index)
  }

  const alternarTema = () => {
    const proximo = (temaIndex + 1) % temas.length
    aplicarTema(proximo)
  }

  useEffect(() => {
    const temaSalvo = localStorage.getItem('theme') || 'light'
    const index = temas.indexOf(temaSalvo)

    aplicarTema(index !== -1 ? index : 0)
  }, [])

  const nomeTema = {
    light: '☀️',
    penumbra: '🌗',
    dark: '🌙'
  }

  return (
    <nav className="menu">

      <NavLink to="/" end>Personagem</NavLink>
      <NavLink to="/atributos">Atributos</NavLink>
      <NavLink to="/talentos">Talentos</NavLink>
      <NavLink to="/pericias">Perícias</NavLink>
      <NavLink to="/idiomas">Idiomas</NavLink>
      <NavLink to="/habilidades">Habilidades</NavLink>
      <NavLink to="/combat">Combate</NavLink>
      <NavLink to="/inventario">Inventário</NavLink>
      <NavLink to="/loja">Loja</NavLink>

      <button onClick={alternarTema} className="theme-toggle">
        {nomeTema[temas[temaIndex]]}
      </button>

    </nav>
  )
}
import { NavLink } from 'react-router-dom'
import './Menu.css'

export default function Menu() {
  return (
    <nav className="menu">

      <NavLink to="/" end>Header</NavLink>
      <NavLink to="/atributos">Atributos</NavLink>
      <NavLink to="/combat">Combate</NavLink>
      <NavLink to="/pericias">Perícias</NavLink>
      <NavLink to="/idiomas">Idiomas</NavLink>
      <NavLink to="/dinheiro">Dinheiro</NavLink>
      <NavLink to="/loja">Loja</NavLink>

    </nav>
  )
}
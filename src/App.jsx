import { CharacterProvider } from './context/CharacterContext'
import Personagem from './components/Personagem/Personagem'
import Atributos from './components/Atributos/Atributos'
import Pericias from './components/Pericias/Pericias'
import Idiomas from './components/Idiomas/Idiomas'
import Combat from './components/Combat/Combat'
import Habilidades from './components/Habilidades/Habilidades'
import Talentos from './components/Talentos/Talentos'
import Inventario from './components/Inventario/Inventario'
import Loja from './components/Loja/Loja'
import Menu from './components/Menu/Menu'
import { HashRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <CharacterProvider>
      <HashRouter>
        <div className="app">
          <h1>Ficha D&D 3.5</h1>
          <Menu />
          <Routes>
            <Route path="/" element={<Personagem />} />
            <Route path="/atributos" element={<Atributos />} />
            <Route path="/talentos" element={<Talentos />} />
            <Route path="/pericias" element={<Pericias />} />
            <Route path="/idiomas" element={<Idiomas />} />
            <Route path="/habilidades" element={<Habilidades />} />
            <Route path="/combat" element={<Combat />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/loja" element={<Loja />} />
          </Routes>
        </div>
      </HashRouter>
    </CharacterProvider>
  )
}

export default App
import { CharacterProvider } from './context/CharacterContext'
import Personagem from './components/Personagem/Personagem'
import Atributos from './components/Atributos/Atributos'
import Pericias from './components/Pericias/Pericias'
import Idiomas from './components/Idiomas/Idiomas'
import Combat from './components/Combat/Combat'
import Inventario from './components/Inventario/Inventario'
import Loja from './components/Loja/Loja'
import Menu from './components/Menu/Menu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <CharacterProvider>
      <BrowserRouter basename="/dnd/">
        <div className="app">
          <h1>Ficha D&D 3.5</h1>

          <Menu />

          <Routes>
            <Route path="/" element={<Personagem />} />
            <Route path="/atributos" element={<Atributos />} />
            <Route path="/combat" element={<Combat />} />
            {/* <Route path="/pericias" element={<Pericias />} /> */}
            {/* <Route path="/idiomas" element={<Idiomas />} /> */}
            {/* <Route path="/loja" element={<Loja />} /> */}
            {/* <Route path="/inventario" element={<Inventario />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </CharacterProvider>
  )
}

export default App
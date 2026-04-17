import { CharacterProvider } from './context/CharacterContext'
import CharacterHeader from './components/CharacterHeader'
import Atributos from './components/Atributos'
import Pericias from './components/Pericias'
import Idiomas from './components/Idiomas'
import Combat from './components/Combat'
import Dinheiro from './components/Dinheiro'
import Loja from './components/Loja'
import Menu from './components/Menu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <CharacterProvider>
      <BrowserRouter basename="/dnd"> {/* 👈 AQUI */}
        <div className="app">
          <h1>Ficha D&D 3.5</h1>

          <Menu />

          <Routes>
            <Route path="/" element={<CharacterHeader />} />
            <Route path="/atributos" element={<Atributos />} />
            <Route path="/combat" element={<Combat />} />
            <Route path="/pericias" element={<Pericias />} />
            <Route path="/idiomas" element={<Idiomas />} />
            <Route path="/dinheiro" element={<Dinheiro />} />
            <Route path="/loja" element={<Loja />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CharacterProvider>
  )
}

export default App
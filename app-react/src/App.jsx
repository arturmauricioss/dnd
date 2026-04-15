import { CharacterProvider } from './context/CharacterContext'
import CharacterHeader from './components/CharacterHeader'
import Atributos from './components/Atributos'
import Pericias from './components/Pericias'
import Combat from './components/Combat'
import Dinheiro from './components/Dinheiro'
import Loja from './components/Loja'
import './App.css'

function App() {

  return (
    <CharacterProvider>
      <div className="app">
        <h1> Ficha D&D 3.5</h1>
        <div className="ficha">
          <CharacterHeader />
          <Atributos />
          <Combat />
          <Pericias />
          <Dinheiro />
          <Loja />
        </div>
      </div>
    </CharacterProvider>
  )
}

export default App
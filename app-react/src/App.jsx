import { CharacterProvider } from './context/CharacterContext'
import CharacterHeader from './components/CharacterHeader'
import Atributos from './components/Atributos'
import Pericias from './components/Pericias'
import Combat from './components/Combat'
// import Kit from './components/Kit'
// import Weapons from './components/Weapons'
// import Equipment from './components/Equipment'
// import Talentos from './components/Talentos'
// import HabilidadesEspeciais from './components/HabilidadesEspeciais'
import './App.css'

function App() {

  return (
    <CharacterProvider>
      <div className="app">
        <h1> ficha D&D 3.5</h1>
        
        <div className="ficha">
          <CharacterHeader />
          <Atributos />
          <Combat />
          <Pericias />
          {/* <Kit /> */}
          {/* <Weapons /> */}
          {/* <Equipment /> */}
          {/* <Talentos /> */}
          {/* <HabilidadesEspeciais /> */}
        </div>
      </div>
    </CharacterProvider>
  )
}

export default App
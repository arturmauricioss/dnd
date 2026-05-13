import Title from '@components/ui/basic/Title/Title'
import NomesToolbar from './components/NomesToolbar'
import NomesFilters from './components/NomesFilters'
import NomesTable from './components/NomesTable'
import { useNomes } from './hooks/useNomes'

export default function App() {
  const {
    nomesFiltrados,
    busca,
    setBusca,
    generoFiltro,
    setGeneroFiltro,
    culturaFiltro,
    setCulturaFiltro,
    updateNome,
    toggleCultura,
    remover,
    adicionar,
    ordenar,
    salvar,
  } = useNomes()

  return (
    <main className="app">
      <Title size="xl" className="mt-md">
        Name Generator
      </Title>

      <NomesToolbar
        busca={busca}
        onBuscaChange={setBusca}
        onAdicionar={nome => {
          if (nome.trim()) {
            adicionar(nome.trim())
            setBusca('')
          }
        }}
      />

      <NomesFilters
        generoFiltro={generoFiltro}
        onGeneroChange={setGeneroFiltro}
        culturaFiltro={culturaFiltro}
        onCulturaChange={setCulturaFiltro}
      />

      <NomesTable
        nomes={nomesFiltrados}
        onUpdateNome={updateNome}
        onToggleCultura={toggleCultura}
        onRemover={remover}
        onOrdenar={ordenar}
      />

      <button className="save-button" onClick={salvar}>
        Salvar
      </button>
    </main>
  )
}
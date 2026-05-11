import { useEffect, useMemo, useState } from 'react'
import RowInputButton from '@components/ui/common/RowInputButton/RowInputButton'
import RowSelect from '@components/ui/common/RowSelect/RowSelect'

const races = [
  'Humano',
  'Elfo',
  'Anão',
  'Orc',
  'Gnomo',
  'Halfling',
]

interface Nome {
  nome: string
  racas: string[]
  genero: 'masculino' | 'feminino' | 'unissex'
}

type SortField = 'nome' | 'genero' | 'Humano' | 'Elfo' | 'Anão' | 'Orc' | 'Gnomo' | 'Halfling'

export default function App() {
  const [nomes, setNomes] = useState<Nome[]>([])
  const [busca, setBusca] = useState('')
  const [generoFiltro, setGeneroFiltro] = useState<Nome['genero'] | null>(null)
  const [racaFiltro, setRacaFiltro] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortField>('nome')
  const [sortAsc, setSortAsc] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3002/nomes')
      .then(res => res.json())
      .then(data => setNomes(data))
      .catch(err => console.error('Erro ao carregar nomes:', err))
  }, [])

  function matchRace(item: Nome): boolean {
    if (racaFiltro.length === 0) return true

    return racaFiltro.some(r => item.racas.includes(r))
  }

  function updateNome(index: number, field: keyof Nome, value: string) {
    setNomes(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    )
  }

  function toggleRace(index: number, race: string) {
    setNomes(prev =>
      prev.map((item, i) => {
        if (i !== index) return item
        const hasRace = item.racas.includes(race)
        return {
          ...item,
          racas: hasRace ? item.racas.filter(r => r !== race) : [...item.racas, race],
        }
      })
    )
  }

  async function salvar() {
    await fetch('http://localhost:3002/nomes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nomes),
    })
    alert('Arquivo salvo!')
  }

  function adicionar() {
    const nome = busca.trim()
    if (!nome) return
    setNomes(prev => [{ nome, racas: [], genero: 'masculino' }, ...prev])
    setBusca('')
  }

  function remover(index: number) {
    setNomes(prev => prev.filter((_, i) => i !== index))
  }

  function ordenar(campo: SortField) {
    if (sortBy === campo) {
      setSortAsc(prev => !prev)
    } else {
      setSortBy(campo)
      setSortAsc(true)
    }
  }

  const nomesFiltrados = useMemo(() => {
    return [...nomes]
      .filter(item => {
        const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase())
        const matchGenero = !generoFiltro || item.genero === generoFiltro
        return matchBusca && matchGenero && matchRace(item)
      })
      .sort((a, b) => {
        let result = 0
        if (sortBy === 'nome') {
          result = a.nome.localeCompare(b.nome)
        } else if (sortBy === 'genero') {
          result = a.genero.localeCompare(b.genero)
        } else {
          const aHas = a.racas.includes(sortBy) ? 1 : 0
          const bHas = b.racas.includes(sortBy) ? 1 : 0
          result = bHas - aHas
        }
        return sortAsc ? result : -result
      })
  }, [nomes, busca, generoFiltro, racaFiltro, sortBy, sortAsc])

  return (
    <main className="app">
      <header className="header">
        <h1 className="title">Editor de nomes</h1>
        <p className="subtitle"></p>
      </header>

      <RowInputButton
          inputProps={{
            placeholder: 'Pesquisar ou adicionar nome...',
            value: busca,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBusca(e.target.value),
          }}
          buttons={[{ label: '+', onClick: adicionar }]}
      />

      <div className="filter-row">
      <RowSelect
        selects={[
          {
            value: generoFiltro || '',
            onChange: (v) => setGeneroFiltro((v as Nome['genero']) || null),
            options: [
              { value: 'masculino', label: 'Masculino' },
              { value: 'feminino', label: 'Feminino' },
              { value: 'unissex', label: 'Unissex' },
            ],
          },
        ]}
      />
      </div>

      <div className="filter-row">
      <RowSelect
        multi
        selects={[
          {
            value: racaFiltro.join(','),
            onChange: (v) => {
              const selected = v ? v.split(',').filter(Boolean) : []
              setRacaFiltro(selected)
            },
            options: races.map(r => ({ value: r, label: r })),
          },
        ]}
      />
      </div>

      <div className="table-wrapper">
        <table className="sheet">
          <thead>
            <tr>
              <th onClick={() => ordenar('nome')}>Nome</th>
              <th onClick={() => ordenar('genero')}>G</th>
              {['Hu', 'El', 'An', 'Orc', 'Gn', 'Ha'].map(race => (
                <th key={race} onClick={() => ordenar(race as SortField)}>{race}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {nomesFiltrados.map((item, index) => (
              <tr key={index}>
                <td>
                  <input value={item.nome} onChange={e => updateNome(index, 'nome', e.target.value)} />
                </td>
                <td>
                  <select value={item.genero} onChange={e => updateNome(index, 'genero', e.target.value)}>
                    <option value="masculino">M</option>
                    <option value="feminino">F</option>
                    <option value="unissex">U</option>
                  </select>
                </td>
                {['Humano', 'Elfo', 'Anão', 'Orc', 'Gnomo', 'Halfling'].map(race => (
                  <td key={race} className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={item.racas.includes(race)}
                      onChange={() => toggleRace(index, race)}
                    />
                  </td>
                ))}
                <td>
                  <button className="remove-button" onClick={() => remover(index)}>×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="save-button" onClick={salvar}>Salvar</button>
    </main>
  )
}
import { useEffect, useMemo, useState } from 'react'

const races = [
  'Humano',
  'Elfo',
  'Anão',
  'Orc',
  'Gnomo',
  'Halfling',
  'Meio-Elfo',
  'Meio-Orc',
]

interface Nome {
  nome: string
  racas: string[]
  genero: 'masculino' | 'feminino' | 'unissex'
}

type SortField =
  | 'nome'
  | 'genero'
  | 'Humano'
  | 'Elfo'
  | 'Anão'
  | 'Orc'
  | 'Gnomo'
  | 'Halfling'

export default function App() {
  const [nomes, setNomes] = useState<Nome[]>([])

  const [busca, setBusca] = useState('')
  const [novoNome, setNovoNome] =
    useState('')

  const [generoFiltro, setGeneroFiltro] =
    useState<Nome['genero'] | null>(null)

  const [racaFiltro, setRacaFiltro] =
    useState<string | null>(null)

  const [sortBy, setSortBy] =
    useState<SortField>('nome')

  const [sortAsc, setSortAsc] =
    useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/nomes')
      .then(r => r.json())
      .then(setNomes)
  }, [])

  function updateNome(
    index: number,
    field: keyof Nome,
    value: any
  ) {
    setNomes(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
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
          racas: hasRace
            ? item.racas.filter(r => r !== race)
            : [...item.racas, race],
        }
      })
    )
  }

  async function salvar() {
    await fetch('http://localhost:3001/nomes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nomes),
    })

    alert('Arquivo salvo!')
  }

  function adicionar() {
    const nome = busca.trim()

    if (!nome) return

    setNomes(prev => [
      {
        nome,
        racas: [],
        genero: 'masculino',
      },
      ...prev,
    ])

    setBusca('')
  }

  function remover(index: number) {
    setNomes(prev =>
      prev.filter((_, i) => i !== index)
    )
  }

  function ordenar(campo: SortField) {
    if (sortBy === campo) {
      setSortAsc(prev => !prev)
    } else {
      setSortBy(campo)
      setSortAsc(true)
    }
  }

  function matchRace(item: Nome) {
    if (!racaFiltro) return true

    if (racaFiltro === 'Meio-Elfo') {
      return (
        item.racas.includes('Humano') ||
        item.racas.includes('Elfo')
      )
    }

    if (racaFiltro === 'Meio-Orc') {
      return (
        item.racas.includes('Humano') ||
        item.racas.includes('Orc')
      )
    }

    return item.racas.includes(racaFiltro)
  }

  const nomesFiltrados = useMemo(() => {
    return [...nomes]
      .filter(item => {
        const matchBusca = item.nome
          .toLowerCase()
          .includes(busca.toLowerCase())

        const matchGenero =
          !generoFiltro ||
          item.genero === generoFiltro

        return (
          matchBusca &&
          matchGenero &&
          matchRace(item)
        )
      })
      .sort((a, b) => {
        let result = 0

        if (sortBy === 'nome') {
          result = a.nome.localeCompare(
            b.nome
          )
        }

        else if (sortBy === 'genero') {
          result = a.genero.localeCompare(
            b.genero
          )
        }

        else {
          const aHas =
            a.racas.includes(sortBy)
              ? 1
              : 0

          const bHas =
            b.racas.includes(sortBy)
              ? 1
              : 0

          result = bHas - aHas
        }

        return sortAsc ? result : -result
      })
  }, [
    nomes,
    busca,
    generoFiltro,
    racaFiltro,
    sortBy,
    sortAsc,
  ])

  return (
    <main className="app">
      <header className="header">
        <h1 className="title">
          Editor de nomes
        </h1>

        <p className="subtitle">
          Estrutura estilo planilha
        </p>
      </header>

      <section className="topbar">
        <div className="search-group">
          <input
            className="search-input"
            placeholder="Pesquisar ou adicionar nome..."
            value={busca}
            onChange={e =>
              setBusca(e.target.value)
            }
          />

          <button
            className="button primary"
            onClick={adicionar}
          >
            Adicionar
          </button>
        </div>

        <button
          className="button"
          onClick={salvar}
        >
          Salvar
        </button>
      </section>

      <section className="filters">
        <div className="filter-group">
          {[
            ['masculino', 'M'],
            ['feminino', 'F'],
            ['unissex', 'U'],
          ].map(([value, label]) => (
            <button
              key={value}
              className={
                generoFiltro === value
                  ? 'filter active'
                  : 'filter'
              }
              onClick={() =>
                setGeneroFiltro(prev =>
                  prev === value
                    ? null
                    : (value as Nome['genero'])
                )
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div className="filter-group">
          {races.map(race => (
            <button
              key={race}
              className={
                racaFiltro === race
                  ? 'filter active'
                  : 'filter'
              }
              onClick={() =>
                setRacaFiltro(prev =>
                  prev === race
                    ? null
                    : race
                )
              }
            >
              {race}
            </button>
          ))}
        </div>
      </section>

      <div className="table-wrapper">
        <table className="sheet">
          <thead>
            <tr>
              <th
                onClick={() =>
                  ordenar('nome')
                }
              >
                Nome
              </th>

              <th
                onClick={() =>
                  ordenar('genero')
                }
              >
                G
              </th>

              {[
                'Humano',
                'Elfo',
                'Anão',
                'Orc',
                'Gnomo',
                'Halfling',
              ].map(race => (
                <th
                  key={race}
                  onClick={() =>
                    ordenar(
                      race as SortField
                    )
                  }
                >
                  {race}
                </th>
              ))}

              <th></th>
            </tr>
          </thead>

          <tbody>
            {nomesFiltrados.map(
              (item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      value={item.nome}
                      onChange={e =>
                        updateNome(
                          index,
                          'nome',
                          e.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <select
                      value={item.genero}
                      onChange={e =>
                        updateNome(
                          index,
                          'genero',
                          e.target.value
                        )
                      }
                    >
                      <option value="masculino">
                        M
                      </option>

                      <option value="feminino">
                        F
                      </option>

                      <option value="unissex">
                        U
                      </option>
                    </select>
                  </td>

                  {[
                    'Humano',
                    'Elfo',
                    'Anão',
                    'Orc',
                    'Gnomo',
                    'Halfling',
                  ].map(race => (
                    <td
                      key={race}
                      className="checkbox-cell"
                    >
                      <input
                        type="checkbox"
                        checked={item.racas.includes(
                          race
                        )}
                        onChange={() =>
                          toggleRace(
                            index,
                            race
                          )
                        }
                      />
                    </td>
                  ))}

                  <td>
                    <button
                      className="remove-button"
                      onClick={() =>
                        remover(index)
                      }
                    >
                      ×
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
import { useEffect, useMemo, useState } from 'react'
import RowInputButton from '@components/ui/common/RowInputButton/RowInputButton'
import RowSelect from '@components/ui/common/RowSelect/RowSelect'
import Title from '@components/ui/basic/Title/Title'

const races = [
  'Humano',
  'Elfo',
  'Anão',
  'Orc',
  'Gnomo',
  'Halfling',
] as const

type Race = typeof races[number]

const raceColumns = [
  { label: 'Hu', value: 'Humano' },
  { label: 'El', value: 'Elfo' },
  { label: 'An', value: 'Anão' },
  { label: 'Orc', value: 'Orc' },
  { label: 'Gn', value: 'Gnomo' },
  { label: 'Ha', value: 'Halfling' },
] as const

interface Nome {
  id: string
  nome: string
  racas: Race[]
  genero: 'masculino' | 'feminino' | 'unissex'
}

type SortField =
  | 'nome'
  | 'genero'
  | Race

export default function App() {
  const [nomes, setNomes] = useState<Nome[]>([])
  const [busca, setBusca] = useState('')
  const [generoFiltro, setGeneroFiltro] =
    useState<Nome['genero'] | null>(null)

  const [racaFiltro, setRacaFiltro] = useState<Race[]>([])
  const [sortStack, setSortStack] = useState<SortField[]>([])

  useEffect(() => {
    fetch('http://localhost:3002/nomes')
      .then(res => res.json())
      .then(data => setNomes(data)) // ✅ não recria id
  }, [])

  function matchRace(item: Nome) {
    if (racaFiltro.length === 0) return true
    return racaFiltro.some(r => item.racas.includes(r))
  }

  function updateNome<K extends keyof Nome>(
    id: string,
    field: K,
    value: Nome[K]
  ) {
    setNomes(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  function toggleRace(id: string, race: Race) {
    setNomes(prev =>
      prev.map(item => {
        if (item.id !== id) return item

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
    const dadosOrdenados = [...nomes]
      .map(n => ({
        id: n.id,
        nome: n.nome,
        racas: n.racas,
        genero: n.genero,
      }))
      .sort((a, b) => a.nome.localeCompare(b.nome))

    await fetch('http://localhost:3002/nomes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosOrdenados),
    })
  }

  function remover(id: string) {
    setNomes(prev => prev.filter(item => item.id !== id))
  }

  function adicionar() {
    const nome = busca.trim()
    if (!nome) return

    setNomes(prev => [
      {
        id: crypto.randomUUID(),
        nome,
        racas: [],
        genero: 'masculino',
      },
      ...prev,
    ])

    setBusca('')
  }

  function ordenar(campo: SortField) {
    setSortStack(prev =>
      prev.includes(campo)
        ? [campo, ...prev.filter(c => c !== campo)]
        : [campo, ...prev]
    )
  }

  const nomesFiltrados = useMemo(() => {
    return [...nomes]
      .filter(item => {
        const matchBusca = item.nome
          .toLowerCase()
          .includes(busca.toLowerCase())

        const matchGenero =
          !generoFiltro || item.genero === generoFiltro

        return matchBusca && matchGenero && matchRace(item)
      })
      .sort((a, b) => {
        for (const campo of sortStack) {
          let result = 0

          if (campo === 'nome') {
            result = a.nome.localeCompare(b.nome)
          } else if (campo === 'genero') {
            result = a.genero.localeCompare(b.genero)
          } else {
            const aHas = a.racas.includes(campo)
            const bHas = b.racas.includes(campo)

            if (aHas !== bHas) {
              result = aHas ? -1 : 1
            }
          }

          if (result !== 0) return result
        }

        return a.nome.localeCompare(b.nome)
      })
  }, [nomes, busca, generoFiltro, racaFiltro, sortStack])

  return (
    <main className="app">
      <Title size="xl" className="mt-md">
        Gerenciador de Nomes
      </Title>

      <RowInputButton
        inputProps={{
          placeholder: 'Pesquisar ou adicionar nome...',
          value: busca,
          onChange: e => setBusca(e.target.value),
        }}
        buttons={[{ label: '+', onClick: adicionar }]}
      />

      <RowSelect
        selects={[
          {
            value: generoFiltro || '',
            onChange: v =>
              setGeneroFiltro((v as Nome['genero']) || null),
            options: [
              { value: 'masculino', label: 'Masculino' },
              { value: 'feminino', label: 'Feminino' },
              { value: 'unissex', label: 'Unissex' },
            ],
          },
        ]}
      />

      <RowSelect
        multi
        selects={[
          {
            value: racaFiltro.join(','),
            onChange: v =>
              setRacaFiltro(
                v ? (v.split(',') as Race[]) : []
              ),
            options: races.map(r => ({
              value: r,
              label: r,
            })),
          },
        ]}
      />

      <div className="table-wrapper">
        <table className="sheet">
          <thead>
            <tr>
              <th onClick={() => ordenar('nome')}>Nome</th>
              <th onClick={() => ordenar('genero')}>G</th>

              {raceColumns.map(race => (
                <th
                  key={race.value}
                  onClick={() => ordenar(race.value)}
                >
                  {race.label}
                </th>
              ))}

              <th />
            </tr>
          </thead>

          <tbody>
            {nomesFiltrados.map(item => (
              <tr key={item.id}>
                <td>
                  <input
                    value={item.nome}
                    onChange={e =>
                      updateNome(item.id, 'nome', e.target.value)
                    }
                  />
                </td>

                <td>
                  <select
                    value={item.genero}
                    onChange={e =>
                      updateNome(
                        item.id,
                        'genero',
                        e.target.value as Nome['genero']
                      )
                    }
                  >
                    <option value="masculino">M</option>
                    <option value="feminino">F</option>
                    <option value="unissex">U</option>
                  </select>
                </td>

                {raceColumns.map(race => (
                  <td key={race.value} className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={item.racas.includes(race.value)}
                      onChange={() =>
                        toggleRace(item.id, race.value)
                      }
                    />
                  </td>
                ))}

                <td>
                  <button
                    className="remove-button"
                    onClick={() => remover(item.id)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="save-button" onClick={salvar}>
        Salvar
      </button>
    </main>
  )
}
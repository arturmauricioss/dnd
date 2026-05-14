import Title from '@components/ui/basic/Title/Title'
import RowInputButton from '@components/ui/common/RowInputButton/RowInputButton'
import RowSelect from '@components/ui/common/RowSelect/RowSelect'
import { useNomes } from './hooks/useNomes'
import { namesCultures } from '@systems/names'
import type { Nome } from './types'
import { cultureColumns } from './types'


export default function App() {
  const culturaLabels = Object.fromEntries(
    namesCultures.map(c => [c.key, c.label])
  )
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
    estatisticas,
  } = useNomes()

  return (
    <main className="app">
      <Title size="xl" className="mt-md">
        Name Generator
      </Title>

      <RowInputButton
        inputProps={{
          placeholder: 'Pesquisar ou adicionar nome...',
          value: busca,
          onChange: e => setBusca(e.target.value),
        }}
        buttons={[{ label: '+', onClick: () => {
          if (busca.trim()) {
            adicionar(busca.trim())
            setBusca('')
          }
        }}]}
      />

      <RowSelect
        selects={[
          {
            value: generoFiltro || '',
            onChange: v => setGeneroFiltro((v as Nome['genero']) || null),
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
            value: culturaFiltro.join(','),
            onChange: v => setCulturaFiltro(v ? v.split(',') : []),
            options: namesCultures.map(c => ({
              value: c.key,
              label: c.label,
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
              {cultureColumns.map(cultura => (
                <th key={cultura.value} onClick={() => ordenar(cultura.value)}>
                  {cultura.label}
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
                    onChange={e => updateNome(item.id, 'nome', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={item.genero}
                    onChange={e =>
                      updateNome(item.id, 'genero', e.target.value as Nome['genero'])
                    }
                  >
                    <option value="masculino">M</option>
                    <option value="feminino">F</option>
                    <option value="unissex">U</option>
                  </select>
                </td>
                {cultureColumns.map(cultura => (
                  <td key={cultura.value} className="checkbox-cell">
                    <input
                      type="checkbox"
                      checked={item.culturas.includes(cultura.value)}
                      onChange={() => toggleCultura(item.id, cultura.value)}
                    />
                  </td>
                ))}
                <td>
                  <button className="remove-button" onClick={() => remover(item.id)}>
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-wrapper">
        <table className="sheet">
          <thead>
            <tr>
              <th rowSpan={2}>Raça</th>

              <th colSpan={3}>Universais</th>
              <th colSpan={3}>Compart.</th>
              <th colSpan={3}>Únicos</th>
              <th colSpan={3}>Total</th>
            </tr>

            <tr>
              <th>M</th>
              <th>F</th>
              <th>U</th>

              <th>M</th>
              <th>F</th>
              <th>U</th>

              <th>M</th>
              <th>F</th>
              <th>U</th>

              <th>M</th>
              <th>F</th>
              <th>U</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(estatisticas.culturas).map(([cultura, dados]) => (
              <tr key={cultura}>
                <td>{culturaLabels[cultura] || cultura}</td>

                <td>{dados.universais.masc}</td>
                <td>{dados.universais.fem}</td>
                <td>{dados.universais.uni}</td>

                <td>{dados.compartilhados.masc}</td>
                <td>{dados.compartilhados.fem}</td>
                <td>{dados.compartilhados.uni}</td>

                <td>{dados.unicos.masc}</td>
                <td>{dados.unicos.fem}</td>
                <td>{dados.unicos.uni}</td>

                <td>{dados.total.masc}</td>
                <td>{dados.total.fem}</td>
                <td>{dados.total.uni}</td>
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
import type { Nome, SortField } from '../types'
import { cultureColumns } from '../types'

interface NomesTableProps {
  nomes: Nome[]
  onUpdateNome: <K extends keyof Nome>(id: string, field: K, value: Nome[K]) => void
  onToggleCultura: (id: string, cultura: string) => void
  onRemover: (id: string) => void
  onOrdenar: (campo: SortField) => void
}

export default function NomesTable({
  nomes,
  onUpdateNome,
  onToggleCultura,
  onRemover,
  onOrdenar,
}: NomesTableProps) {
  return (
    <div className="table-wrapper">
      <table className="sheet">
        <thead>
          <tr>
            <th onClick={() => onOrdenar('nome')}>Nome</th>
            <th onClick={() => onOrdenar('genero')}>G</th>
            {cultureColumns.map(cultura => (
              <th key={cultura.value} onClick={() => onOrdenar(cultura.value)}>
                {cultura.label}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {nomes.map(item => (
            <tr key={item.id}>
              <td>
                <input
                  value={item.nome}
                  onChange={e => onUpdateNome(item.id, 'nome', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={item.genero}
                  onChange={e =>
                    onUpdateNome(item.id, 'genero', e.target.value as Nome['genero'])
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
                    onChange={() => onToggleCultura(item.id, cultura.value)}
                  />
                </td>
              ))}
              <td>
                <button className="remove-button" onClick={() => onRemover(item.id)}>
                  ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
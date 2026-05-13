import RowSelect from '@components/ui/common/RowSelect/RowSelect'
import { namesCultures } from '@systems/names'
import type { Nome } from '../types'

interface NomesFiltersProps {
  generoFiltro: Nome['genero'] | null
  onGeneroChange: (value: Nome['genero'] | null) => void
  culturaFiltro: string[]
  onCulturaChange: (value: string[]) => void
}

export default function NomesFilters({
  generoFiltro,
  onGeneroChange,
  culturaFiltro,
  onCulturaChange,
}: NomesFiltersProps) {
  return (
    <>
      <RowSelect
        selects={[
          {
            value: generoFiltro || '',
            onChange: v => onGeneroChange((v as Nome['genero']) || null),
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
            onChange: v => onCulturaChange(v ? v.split(',') : []),
            options: namesCultures.map(c => ({ value: c.label, label: c.label })),
          },
        ]}
      />
    </>
  )
}
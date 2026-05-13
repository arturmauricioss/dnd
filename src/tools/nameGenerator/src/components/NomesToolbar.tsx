import RowInputButton from '@components/ui/common/RowInputButton/RowInputButton'

interface NomesToolbarProps {
  busca: string
  onBuscaChange: (value: string) => void
  onAdicionar: (nome: string) => void
}

export default function NomesToolbar({ busca, onBuscaChange, onAdicionar }: NomesToolbarProps) {
  return (
    <RowInputButton
      inputProps={{
        placeholder: 'Pesquisar ou adicionar nome...',
        value: busca,
        onChange: e => onBuscaChange(e.target.value),
      }}
      buttons={[{ label: '+', onClick: () => onAdicionar(busca) }]}
    />
  )
}
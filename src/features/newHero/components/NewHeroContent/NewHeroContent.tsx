import { useState } from 'react'
import Title from '@components/ui/basic/Title/Title'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import RowSelect from '@components/ui/common/RowSelect/RowSelect'
import RowInputButton from '@components/ui/common/RowInputButton/RowInputButton'
import RaceSelect from '../RaceSelect/RaceSelect'
import { Spawn } from '@components/ui/icons'
import type { Race } from '@systems/race/types'
import '../RaceSelect/RaceSelect.css'

export default function NewHeroContent() {
  const [nome, setNome] = useState('')
  const [raca, setRaca] = useState<Race | null>(null)
  const [genero, setGenero] = useState('')

  return (
    <>
      <Title size="xl" className="mt-md">Novo Personagem</Title>
      <RowHeader icon={Spawn} active>Origem</RowHeader>
      <RaceSelect value={raca} onChange={setRaca} />
      <RowSelect
        selects={[
          { value: genero, onChange: setGenero, options: [
            { value: 'masculino', label: 'Masculino' },
            { value: 'feminino', label: 'Feminino' },
          ]},
        ]}
      />
      <RowInputButton
        inputProps={{
          placeholder: 'Nome do personagem',
          value: nome,
          onChange: (e) => setNome(e.target.value),
        }}
        buttons={[
          { label: 'Raça', onClick: () => console.log('Botão 1') },
          { label: '?', onClick: () => console.log('Botão 2') },
        ]}
      />
    </>
  )
}
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import RowSelect from '@components/ui/common/RowSelect/RowSelect'
import RowInputButton from '@components/ui/common/RowInputButton/RowInputButton'
import RaceSelect from '@features/raceSelect/RaceSelect'
import useNomeRandom from '@systems/names/hooks/useNomeRandom'
import { Spawn } from '@components/ui/icons'
import { useState } from 'react'
import type { Race } from '@systems/race/types'
import '@features/raceSelect/RaceSelect.css'

export default function NewHeroPage() {
  const [nome, setNome] = useState('')
  const [raca, setRaca] = useState<Race | null>(null)
  const [genero, setGenero] = useState('')

  const { gerarNome, gerarNomeRaca, isBotaoRacaDisabled } = useNomeRandom({
    raca,
    genero,
    setNome,
  })

  return (
    <Page>
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
          { label: 'Raça', onClick: gerarNomeRaca, disabled: isBotaoRacaDisabled },
          { label: '?', onClick: gerarNome },
        ]}
      />
    </Page>
  )
}
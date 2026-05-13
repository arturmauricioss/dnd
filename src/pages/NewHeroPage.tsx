import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import RowSelect from '@components/ui/common/RowSelect/RowSelect'
import RowInputButton from '@components/ui/common/RowInputButton/RowInputButton'
import RaceSelect from '@features/raceSelection/RaceSelect'
import { useNewHero } from '@features/newHero/hooks/useNewHero'
import { Spawn } from '@components/ui/icons'
import '@features/raceSelection/RaceSelect.css'

export default function NewHeroPage() {
  const {
    nome,
    setNome,
    raca,
    setRaca,
    genero,
    setGenero,
    gerarNome,
    gerarNomeRaca,
    isBotaoRacaDisabled,
  } = useNewHero()

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
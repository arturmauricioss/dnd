import { useState } from 'react'
import Title from '@components/ui/basic/Title/Title'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import Input from '@components/ui/basic/Input/Input'
import RaceSelect from '../RaceSelect/RaceSelect'
import { Spawn } from '@components/ui/icons'
import type { Race } from '@systems/race/types'
import '../RaceSelect/RaceSelect.css'

export default function NewHeroContent() {
  const [nome, setNome] = useState('')
  const [raca, setRaca] = useState<Race | null>(null)

  return (
    <>
      <Title size="xl" className="mt-md">Novo Personagem</Title>
      <RowHeader icon={Spawn} active>Origem</RowHeader>
      <RaceSelect value={raca} onChange={setRaca} />
      <Input
        placeholder="Nome do personagem"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
    </>
  )
}
import { useNavigate } from 'react-router-dom'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import Button from '@components/ui/basic/Button/Button'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import { ChessKnight, Skull } from '@components/ui/icons'

export default function HeroPage() {
  const navigate = useNavigate()

  return (
    <Page>
      <Title size="xl" className="mt-md">Salão dos Heróis</Title>
      <RowHeader icon={ChessKnight} active>Meus Heróis</RowHeader>
      <Button onClick={() => navigate('/heroes/new')}>Novo Personagem</Button>
      <RowHeader icon={Skull} variant="secondary">Memorial dos Caídos</RowHeader>
    </Page>
  )
}
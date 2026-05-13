import { useNavigate } from 'react-router-dom'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import RowButton from '@components/ui/common/RowButton'
import { ChessKnight, Skull } from '@components/ui/icons'

export default function HeroPage() {
  const navigate = useNavigate()

  return (
    <Page>
      <Title size="xl" className="mt-md">Salão dos Heróis</Title>
      <RowHeader icon={ChessKnight} active>Meus Heróis</RowHeader>
      <RowButton
        buttons={[
          { label: 'Novo Personagem', onClick: () => navigate('/heroes/new'), variant: 'primary' },
        ]}
      />
      <RowHeader icon={Skull} variant="secondary">Memorial dos Caídos</RowHeader>
    </Page>
  )
}
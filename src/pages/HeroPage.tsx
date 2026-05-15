import { useNavigate } from 'react-router-dom'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import RowButton from '@components/ui/common/RowButton/RowButton'
import RowSpan from '@components/ui/common/RowSpan/RowSpan'
import { usePersonagens } from '@features/newHero/hooks/usePersonagens'
import { ChessKnight, Skull } from '@components/ui/icons'

export default function HeroPage() {
  const navigate = useNavigate()
  const { personagens } = usePersonagens()

  return (
    <Page>
      <Title size="xl" className="mt-md">Salão dos Heróis</Title>
      <RowHeader icon={ChessKnight} active>Meus Heróis</RowHeader>
      {personagens.map(p => (
        <RowSpan
          key={p.id}
          main={p.name}
          rightSpans={[
            { content: p.race?.label || p.race?.key, className: 'hero-race' },
            { content: p.gender === 'masculino' ? 'M' : p.gender === 'feminino' ? 'F' : 'U' }
          ]}
        />
      ))}
      <RowButton
        buttons={[
          { label: 'Novo Personagem', onClick: () => navigate('/heroes/new'), variant: 'primary' },
        ]}
      />
      <RowHeader icon={Skull} variant="secondary">Memorial dos Caídos</RowHeader>
    </Page>
  )
}
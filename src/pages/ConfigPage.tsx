import { useTheme } from '@context/ThemeContext'
import Page from '@components/ui/atoms/Page/Page'
import Title from '@components/ui/atoms/Title/Title'
import ConfigSection, { ConfigRow, ConfigLabel } from '@components/ui/molecules/ConfigSection/ConfigSection'
import Toggle from '@components/ui/atoms/Toggle/Toggle'

export default function ConfigPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Page>
      <Title size="xl" className="mt-md">Configurações</Title>
      
      <ConfigSection>
        <ConfigRow>
          <ConfigLabel
            emoji={theme === 'dark' ? '🌙' : '☀️'}
            title="Tema"
            description={theme === 'dark' ? 'Escuro' : 'Claro'}
          />
          <Toggle
            active={theme === 'dark'}
            onClick={toggleTheme}
            label="Alternar tema"
          />
        </ConfigRow>
      </ConfigSection>
    </Page>
  )
}
import { useThemeContext } from '@features/settings/hooks/useThemeContext'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import ConfigSection, { ConfigRow, ConfigLabel } from '@features/settings/components/ConfigSection/ConfigSection'
import Toggle from '@components/ui/basic/Toggle/Toggle'

export default function ConfigPage() {
  const { theme, toggleTheme } = useThemeContext()

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
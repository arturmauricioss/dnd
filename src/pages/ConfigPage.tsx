import { useThemeContext } from '@features/theme/hooks/useThemeContext'
import Page from '@components/shell/Page/Page'
import Title from '@components/ui/basic/Title/Title'
import RowHeader from '@components/ui/common/RowHeader/RowHeader'
import RowToggle from '@components/ui/common/RowToggle/RowToggle'
import { LightMode, DarkMode } from '@components/ui/icons'

export default function ConfigPage() {
  const { theme, toggleTheme } = useThemeContext()

  const ThemeIcon = theme === 'dark' ? DarkMode : LightMode

  return (
    <Page>
      <Title size="xl" className="mt-md">Configurações</Title>
      
      <RowHeader icon={ThemeIcon} active>
        Tema
      </RowHeader>
      
      <RowToggle
        label={theme === 'dark' ? 'Modo escuro' : 'Modo claro'}
        active={theme === 'dark'}
        onClick={toggleTheme}
      />
    </Page>
  )
}
import { ThemeContext } from '@features/settings/context/ThemeContext'
import { useThemeState, useThemeSync } from '@features/settings/hooks/useTheme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useThemeState()
  useThemeSync(theme)

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
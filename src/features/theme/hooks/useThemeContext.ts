import { useContext } from 'react'
import { ThemeContext } from '@features/theme/context/ThemeContext'
import type { ThemeContextType } from '@features/theme/types'

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}
import type { ReactNode } from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

export interface ConfigSectionProps {
  children: ReactNode
}

export interface ConfigRowProps {
  children: ReactNode
}

export interface ConfigLabelProps {
  emoji?: string
  title: string
  description?: string
}
import { createContext } from 'react'
import type { ThemeContextType } from '@features/settings/types'

export const ThemeContext = createContext<ThemeContextType | null>(null)
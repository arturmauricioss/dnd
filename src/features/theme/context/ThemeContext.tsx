import { createContext } from 'react';
import type { ThemeContextType } from '@features/theme/types';

export const ThemeContext = createContext<ThemeContextType | null>(null);

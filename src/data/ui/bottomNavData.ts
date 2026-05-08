import type { BottomNavItem } from '@types'

export type { BottomNavItem }

export const bottomNavItems: BottomNavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/herois', label: 'Heróis' },
  { to: '/campanhas', label: 'Campanhas' },
  { to: '/info', label: 'Info' },
  { to: '/config', label: 'Config' },
]
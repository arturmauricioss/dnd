export interface BottomNavItem {
  to: string
  label: string
}

export const bottomNavItems: BottomNavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/info', label: 'Info' },
  { to: '/config', label: 'Config' },
]
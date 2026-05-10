export interface BottomNavItem {
  to: string
  label: string
}

export const bottomNavItems: BottomNavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/config', label: 'Config' },
]
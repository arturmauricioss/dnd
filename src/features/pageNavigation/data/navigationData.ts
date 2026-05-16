export interface BottomNavItem {
  to: string;
  label: string;
}

export const bottomNavItems: BottomNavItem[] = [
  { to: '/home', label: 'Home' },
  { to: '/heroes', label: 'Heróis' },
  { to: '/config', label: 'Config' },
];

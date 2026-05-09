import { bottomNavItems } from '@components/ui/icons/bottomNavData'
import BottomNavItem from './BottomNavItem'
import './BottomNav.css'

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {bottomNavItems.map(item => (
        <BottomNavItem key={item.to} to={item.to} label={item.label} />
      ))}
    </nav>
  )
}
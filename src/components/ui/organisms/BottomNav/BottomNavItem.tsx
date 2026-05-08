import { NavLink } from 'react-router-dom'
import type { BottomNavItemProps } from '@types'
import './BottomNavItem.css'

export default function BottomNavItem({ to, label }: BottomNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
    >
      <span className="bottom-nav-label">{label}</span>
    </NavLink>
  )
}
import { NavLink } from 'react-router-dom'
import Box from '@components/ui/basic/Box/Box'
import { bottomNavItems } from '../data/navigationData'
import './PageNavigation.css'

export default function PageNavigation() {
  return (
    <Box className="bottom-nav">
      {bottomNavItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <Box className="bottom-nav-label">{item.label}</Box>
        </NavLink>
      ))}
    </Box>
  )
}
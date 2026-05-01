import { useLocation, Outlet } from 'react-router-dom'
import PanelMenu from './PanelMenu/PanelMenu'
import './AppLayout.css'

export default function AppLayout() {
  const location = useLocation()
  
  const showPanel = location.pathname !== '/login'
  
  if (!showPanel) {
    return <Outlet />
  }
  
  return (
    <div className="app-layout">
      <PanelMenu />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
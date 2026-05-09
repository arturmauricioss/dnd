import { Outlet } from 'react-router-dom'
import BottomNav from '@components/shell/BottomNav/BottomNav'
import './Layout.css'

export default function Layout() {
  return (
    <div className="app-layout">
      <main className="app-main">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
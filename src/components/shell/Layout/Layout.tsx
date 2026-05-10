import { Outlet } from 'react-router-dom'
import Box from '@components/ui/basic/Box/Box'
import PageNavigation from '@features/pageNavigation/components/PageNavigation'
import './Layout.css'

export default function Layout() {
  return (
    <Box className="app-layout">
      <main className="app-main">
        <Outlet />
      </main>
      <PageNavigation />
    </Box>
  )
}
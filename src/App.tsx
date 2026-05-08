import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/layout/Layout/Layout'
import HomePage from './pages/HomePage'
import HeroisPage from './pages/HeroisPage'
import NovoHeroiPage from './pages/NovoHeroiPage'
import CampanhasPage from './pages/CampanhasPage'
import InfoPage from './pages/InfoPage'
import ConfigPage from './pages/ConfigPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'herois', element: <HeroisPage /> },
      { path: 'herois/novo', element: <NovoHeroiPage /> },
      { path: 'campanhas', element: <CampanhasPage /> },
      { path: 'info', element: <InfoPage /> },
      { path: 'config', element: <ConfigPage /> },
    ]
  }
], { basename: '/' })

export default function App() {
  return <RouterProvider router={router} />
}
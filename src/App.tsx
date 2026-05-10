import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from '@components/shell/Layout/Layout'
import HomePage from '@pages/HomePage'
import HeroPage from '@pages/HeroPage'
import ConfigPage from '@pages/ConfigPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'heroes', element: <HeroPage /> },
      { path: 'config', element: <ConfigPage /> },
    ]
  }
], { basename: '/' })

export default function App() {
  return <RouterProvider router={router} />
}
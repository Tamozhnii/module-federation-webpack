import { createBrowserRouter } from 'react-router-dom'
import { App } from '@/components/App'
// @ts-ignore
import shopRoutes from 'shop/router'
// @ts-ignore
import adminRoutes from 'admin/router'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [...shopRoutes, ...adminRoutes],
  },
])

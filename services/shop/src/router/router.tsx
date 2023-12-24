import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { App } from '@/components/App'
import Shop from '@/pages/shop/Shop'

const routes = [
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: '/shop/main',
        element: (
          <Suspense fallback={'Loading...'}>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
export default routes

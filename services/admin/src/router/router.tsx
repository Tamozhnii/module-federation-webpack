import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { App } from '@/components/App'
import About from '@/pages/about/About'

const routes = [
  {
    path: '/about',
    element: <App />,
    children: [
      {
        path: '/about/main',
        element: (
          <Suspense fallback={'Loading...'}>
            <About />
          </Suspense>
        ),
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
export default routes

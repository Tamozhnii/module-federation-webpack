import { Link, Outlet } from 'react-router-dom'
import { useMemo } from 'react'
import { shopRoutes } from '@packages/shared/src/routes/shop'

export const App = () => {
  const platform = useMemo(() => {
    if (PLATFORM === 'desktop') {
      return <div>desktop shop</div>
    } else {
      return <div>mobile shop</div>
    }
  }, [PLATFORM])

  return (
    <>
      {platform}
      <Link to={shopRoutes.main}>main</Link>
      <Outlet />
    </>
  )
}

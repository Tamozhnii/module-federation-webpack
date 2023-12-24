import { Link, Outlet } from 'react-router-dom'
import { useMemo } from 'react'
import { adminRoutes } from '@packages/shared/src/routes/admin'

export const App = () => {
  const platform = useMemo(() => {
    if (PLATFORM === 'desktop') {
      return <div>desktop admin</div>
    } else {
      return <div>mobile admin</div>
    }
  }, [PLATFORM])

  return (
    <>
      {platform}
      <Link to={adminRoutes.main}>main</Link>
      <Outlet />
    </>
  )
}

import { Link, Outlet } from 'react-router-dom'
import styles from './App.module.scss'
import { useMemo } from 'react'
import { adminRoutes } from '@packages/shared/src/routes/admin'
import { shopRoutes } from '@packages/shared/src/routes/shop'

export const App = () => {
  const platform = useMemo(() => {
    if (PLATFORM === 'desktop') {
      return <div>desktop platform</div>
    } else {
      return <div>mobile plaform</div>
    }
  }, [PLATFORM])

  return (
    <>
      {platform}
      <div className={styles.navigate}>
        <Link to={adminRoutes.about}>About</Link>
        <Link to={shopRoutes.shop}>Shop</Link>
      </div>
      <Outlet />
    </>
  )
}

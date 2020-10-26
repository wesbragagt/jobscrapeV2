import React, { useMemo } from 'react'
import Home from './pages/Home'
import Saved from './pages/Saved'
import { Route, Switch, Link, useLocation } from 'react-router-dom'

function App () {
    const {pathname} = useLocation()
    const routeToGo = useMemo(()=>{
        if(pathname === '/'){
            return {
                route: '/saved',
                label: 'Saved'
            }
        }
        if(pathname === '/saved'){
            return {
                route: '/',
                label: 'Scrape'
            }
        }
    }, [pathname])
  return (
    <main className='container-fluid'>
      <header className='fixed bg-blue-600 shadow-md  z-50 px-5 py-2 flex justify-between items-center'>
        <Link
          to={routeToGo.route}
          className='text-white hover:bg-green-500 px-3 rounded py-1'
        >
          {routeToGo.label}
        </Link>
      </header>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/saved' component={Saved}/>
      </Switch>
    </main>
  )
}

export default App

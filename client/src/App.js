import React, { useMemo } from 'react'
import Home from './pages/Home'
import Saved from './pages/Saved'
import { Route, Switch, Link, useLocation } from 'react-router-dom'
import { useContextStore } from './store'

function App () {
    const {position, setPosition, location, setLocation, getIndeedJobs} = useContextStore()
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
    function handleSubmit (e) {
      e.preventDefault()
      const { position, location } = e.target
      getIndeedJobs({ position: position.value, location: location.value })
    }
  return (
    <main className='container-fluid'>
      <header className='fixed w-full bg-blue-600 shadow-md  z-100 px-5 py-2 flex justify-between items-center'>
        <Link
          to={routeToGo.route}
          className='text-white px-3 rounded py-1'
        >
          {routeToGo.label}
        </Link>
        <form className='w-full max-w-sm mx-auto mb-2 text-white' onSubmit={handleSubmit}>
        <div className='flex items-center border-b border-teal-500 py-2'>
          <input
            placeholder='position'
            className='appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none'
            id='position'
            name='position'
            type='text'
            onChange={e => setPosition(e.target.value)}
            value={position}
          />
          <input
            placeholder='location'
            className='appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none'
            id='location'
            name='location'
            type='text'
            onChange={e => setLocation(e.target.value)}
            value={location}
          />
          <button
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
            type='submit'
          >
            Indeed
          </button>
        </div>
      </form>
      </header>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/saved' component={Saved}/>
      </Switch>
    </main>
  )
}

export default App

import React from 'react'
import Home from './pages/Home'
import Saved from './pages/Saved'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
      <main>
          <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/saved" component={Saved} />
          </Switch>
      </main>
  )
}

export default App

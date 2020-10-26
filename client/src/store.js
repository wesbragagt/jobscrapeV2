import React from 'react'
import { useIndeed } from './hooks'

const ContextStore = React.createContext({})
export function useContextStore(){
  return React.useContext(ContextStore)
}

export default function Store({children}){
  const [getIndeedJobs, {data, loading}] = useIndeed()
  return (
  <ContextStore.Provider value={{getIndeedJobs, data, loading}}>{children}</ContextStore.Provider>
  )
}
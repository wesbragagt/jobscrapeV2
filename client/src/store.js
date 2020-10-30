import React,{useState} from 'react'
import { useIndeed } from './hooks'

const ContextStore = React.createContext({})
export function useContextStore(){
  return React.useContext(ContextStore)
}

export default function Store({children}){
  const [getIndeedJobs, {data, loading}] = useIndeed()
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  return (
  <ContextStore.Provider value={{getIndeedJobs, data, loading, position, setPosition, location, setLocation}}>{children}</ContextStore.Provider>
  )
}
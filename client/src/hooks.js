import {useState} from 'react'
export function useIndeed(){
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)

  async function getRequest({position, location}){
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/dev/indeed?position=${position}&location=${location}`, {method: 'GET'})
      const {response} = await res.json()
      setLoading(false)
      setData(response)
    } catch (error) {
      setLoading(false)
      setError(error)
    } 
  }
  
  return [getRequest, {data, loading, error}]
}
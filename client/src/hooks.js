import {useState} from 'react'

function mergeResponses(promises) {
  return promises.reduce((acc, data) => {
    acc.push(...data.response)
    return acc
  }, [])
}
// TODO figure out how to merge multiple requests from indeed (without pagination)
export function useIndeed(){
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)

  async function getAllJobs({position, location}){
    const urls = [
      `http://localhost:5000/dev/indeed?q=${position}&l=${location}`,
      `http://localhost:5000/dev/indeed?q=${position}&l=${location}&start=20`,
      `http://localhost:5000/dev/indeed?q=${position}&l=${location}&start=30`,
      `http://localhost:5000/dev/indeed?q=${position}&l=${location}&start=40`
    ]
    return Promise.all(urls.map(u=>fetch(u)))
    .then(responses =>
      Promise.all(responses.map(res => res.json()))
  ).then(mergeResponses)
  }

  async function getRequest({position, location}){
    setLoading(true)
    try {
      const data = await getAllJobs({position, location})
      console.log('data from request', data)
      setLoading(false)
      setData(data)
    } catch (error) {
      setLoading(false)
      setError(error)
    } 
  }
  
  return [getRequest, {data, loading, error}]
}
import {useEffect, useState} from 'react'

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
      setLoading(false)
      setData(data)
    } catch (error) {
      setLoading(false)
      setError(error)
    } 
  }
  
  return [getRequest, {data, loading, error}]
}

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
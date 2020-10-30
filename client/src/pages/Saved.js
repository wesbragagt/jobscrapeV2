import React from 'react'
import {Card} from '../components/Card'
import { useLocalStorage } from '../hooks'
export default function Saved() {
  const [saved, setValues] = useLocalStorage('saved')
  const handleDeleteJobs = (data) => {
    const {id, job} = data
    setValues([...saved.filter(e => e.id !== id && e.job !== job)])
  }
  return (
    <div className='container mx-auto flex flex-wrap pt-20'>
      {
          saved && saved.length > 0 && saved.map((job, i) => (
            <Card key={`${i}-${job.job}`} data={job} handleDeleteJobs={handleDeleteJobs}/>
          ))
        }
    </div>
  )
}

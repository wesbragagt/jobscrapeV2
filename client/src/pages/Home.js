import React from 'react'
import { useLocalStorage } from '../hooks'
import {Card} from '../components/Card'
import { Loading } from '../components/Loading'
import { useContextStore } from '../store'
export default function Home(){
  const {data, loading} = useContextStore()
  const[saved, setSaved]=useLocalStorage('saved', [])
  function handleSaveJobs(job){
    setSaved([...saved, job])
  }
  return (
    <div className='container mx-auto flex flex-wrap pt-20'>
        {
          loading && <Loading/>
        }
        {
          data && data.length > 0 && data.map((job) => {
            // when a job is already saved
            if(saved && saved.some(e => e.id === job.id)){
              return <Card key={job.id} data={job}/>
            }
            else{
              return <Card key={job.id} data={job} handleSaveJobs={handleSaveJobs}/>
            }
          })
        }
    </div>
  )
}
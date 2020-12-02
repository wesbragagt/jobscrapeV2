import React from 'react'
import { useLocalStorage } from '../hooks'
import {Card} from '../components/Card'
import { useContextStore } from '../store'
import { SkeletonLoading } from '../components/SkeletonLoading'

export default function Home(){
  const {data, loading} = useContextStore()
  const[saved, setSaved]=useLocalStorage('saved', [])
  
  const renderMultiple = (componentToRender, num=10) => {
    let components = []
    for(let i = 0; i < num; i++){
      components.push(componentToRender)
    }
    return components.map(Component => (<Component/>))
  }

  const handleSaveJobs = (job) => setSaved([...saved, job])
  return (
    <div className='container mx-auto flex flex-wrap pt-20'>
        {
          loading && renderMultiple(SkeletonLoading, 12)
        }
        {
          data && data.length > 0 && data.map((job) => {
            // when a job is already saved it won't display the saved button
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
import React, { useState } from 'react'
import { useIndeed, useLocalStorage } from '../hooks'
import {Card} from '../components/Card'
import { Loading } from '../components/Loading'
import { useContextStore } from '../store'
export default function Home(){
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const {getIndeedJobs, data, loading} = useContextStore()
  const[saved, setSaved]=useLocalStorage('saved')
  function handleSubmit (e) {
    e.preventDefault()
    const { position, location } = e.target
    getIndeedJobs({ position: position.value, location: location.value })
  }
  function handleSaveJobs(job){
    setSaved([...saved, job])
  }
  return (
    <div className='container mx-auto'>
      <form className='w-full max-w-sm mx-auto mb-2' onSubmit={handleSubmit}>
        <div className='flex items-center border-b border-teal-500 py-2'>
          <input
            placeholder='position'
            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
            id='position'
            name='position'
            type='text'
            onChange={e => setPosition(e.target.value)}
            value={position}
          />
          <input
            placeholder='location'
            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
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
      <div className='flex flex-wrap mb-4'>
        {
          loading && <Loading/>
        }
        {
          data && data.length > 0 && data.map((job, i) => (
            <Card key={`${i}-${job.job}`} data={job} handleSaveJobs={handleSaveJobs}/>
          ))
        }
      </div>
    </div>
  )
}
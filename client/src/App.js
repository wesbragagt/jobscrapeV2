import React,{useState} from 'react';
import {useIndeed} from './hooks'

function App() {
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const [getJobsFromIndeed, {data}] = useIndeed()
  
  function handleSubmit(e){
    e.preventDefault()
    const {position, location} = e.target
    getJobsFromIndeed({position: position.value, location: location.value})
  }
  
  return (
    <div className="container mx-auto">
      <form className='w-full max-w-sm mx-auto' onSubmit={handleSubmit}>
          <div class='flex items-center border-b border-teal-500 py-2'>
          <input placeholder='position' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none' id='position' name='position' type='text' onChange={e => setPosition(e.target.value)} value={position}/>
          <input placeholder='location' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none' id='location' name='location' type='text' onChange={e => setLocation(e.target.value)}  value={location}/>
        <button className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded' type='submit'>Indeed</button>
          </div>
        </form>
      <pre style={{textAlign: 'left'}}>
      {JSON.stringify(data, null,2)}
      </pre>
    </div>
  );
}

export default App;

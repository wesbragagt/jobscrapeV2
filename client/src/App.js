import React,{useState} from 'react';
import {useIndeed} from './hooks'

function App() {
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const [getJobsFromIndeed, {data, loading, error}] = useIndeed()
  
  function handleSubmit(e){
    e.preventDefault()
    const {position, location} = e.target
    getJobsFromIndeed({position: position.value, location: location.value})
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label htmlFor='position'>Position</label>
          <input id='position' name='position' type='text' onChange={e => setPosition(e.target.value)} value={position}/>
          <label htmlFor='location'>Location</label>
          <input id='location' name='location' type='text' onChange={e => setLocation(e.target.value)}  value={location}/>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' type='submit'>Indeed</button>
        </form>
      </header>
      <pre style={{textAlign: 'left'}}>
      {JSON.stringify(data, null,2)}
      </pre>
    </div>
  );
}

export default App;

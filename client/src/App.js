import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null)
  React.useEffect(()=>{
    fetch('https://d11daqkyn1.execute-api.us-east-1.amazonaws.com/dev/todos', {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => setData(res))
    .catch(error => console.log(error))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
  <pre>{data && JSON.stringify(data)}</pre>
      </header>
    </div>
  );
}

export default App;

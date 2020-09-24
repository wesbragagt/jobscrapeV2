import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null)
  React.useEffect(()=>{
    fetch('https://5l4hxv6ddf.execute-api.us-east-1.amazonaws.com/dev/todos')
    .then(res => res.json())
    .then(res => setData(res))
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

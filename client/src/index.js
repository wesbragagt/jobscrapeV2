import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './tailwind.output.css'
import App from './App';
import Store from './store'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Store>
        <App />
        </Store>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



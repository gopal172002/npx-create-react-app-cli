import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import someFunction from './other';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Example usage of the function imported from other.js
console.log(someFunction());

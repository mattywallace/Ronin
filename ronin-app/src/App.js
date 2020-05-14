import React from 'react';
import UserContainer from './UserContainer'
import './App.css';

function App() {
  console.log(process.env);
  return (
    <div className="App">
     <UserContainer />
    </div>
  );
}

export default App;

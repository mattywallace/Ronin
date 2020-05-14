import React, {Component} from 'react'
import UserContainer from './UserContainer'
import LogInRegisterForm from './LogInRegisterForm'
import './App.css';


export default class App extends Component {
  
  constructor() {
    super()

    this.state = {
      loggedIn: false, 
      loggedInUserEmail: ""
    }
  }
  render () {
  return (
   <div className="App">
   {
    this.state.loggedIn
    ?
    <UserContainer />
    :
    <LogInRegisterForm />
  }
  </div>
  );
}
}



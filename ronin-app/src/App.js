import React, {Component} from 'react'
import './App.css';
import UserContainer from './UserContainer'
import LogInRegisterForm from './LogInRegisterForm'


export default class App extends Component {
  
  constructor() {
    super()

    this.state = {
      loggedIn: false, 
      loggedInUserEmail: ""
    }
  }
  
  register = async (registerInfo) => {
    console.log("register() in app. js called with the following info", registerInfo);
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/register'
    try {
      const registerResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('registerResponse', registerResponse);
      const registerJson = await registerResponse.json()
      console.log("registerJson", registerJson);
      if(registerResponse.status === 201) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: registerJson.data.email
        })
      }
    } catch (error) {
      console.error('Error trying to register with API');
      console.error(error)
  }
}

  login = async (loginInfo) => {
    const url = process.env.REACT_APP_API_URL + '/api/v1/users/login'
    try {
      const loginResponse = await fetch(url, {
        creadentials:'include',
        method: 'POST',
        body:JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('loginResponse', loginResponse);
      const loginJson = await loginResponse.json()
      console.log('loginJson', loginJson);
       if(loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: loginJson.data.email
        })
      }
    } catch(error) {
      console.error('Error trying to log in')
      console.error(error)
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
    <LogInRegisterForm 
      login={this.login}
      register={this.register}
    />
  }
  </div>
  );
}
}



import React, {Component} from 'react'
import './App.css';
import CourseContainer from './CourseContainer'
import LogInRegisterForm from './LogInRegisterForm'


export default class App extends Component {
  
  constructor() {
    super()

    this.state = {
      loggedIn: false, 
      loggedInUserEmail: "",
      loggedInUserId: ""
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
          loggedInUserEmail: registerJson.data.email,
          loggedInUserId: registerJson.data.id
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
        credentials:'include',
        method: 'POST',
        body:JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('loginResponse', loginResponse);
      const loginJson = await loginResponse.json()
      console.log('loginJson', loginJson);
      console.log(loginJson.data);
       if(loginResponse.status === 200) {
        this.setState({
          loggedIn: true,
          loggedInUserEmail: loginJson.data.email,
          loggedInUserId: loginJson.data.id
        })
      }
      console.log("here is what is currently in state");
      console.log(this.state);
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
      <React.Fragment>
        <CourseContainer userInfo={this.state}/>
      </React.Fragment>
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



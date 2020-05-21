import React, {Component} from 'react'
import './App.css';
import LogInRegisterForm from './LogInRegisterForm'
import UserContainer from './UserContainer'
import Header from './Header'


export default class App extends Component {
  
  constructor() {
    console.log('THIS IS PROCESS ENV');
    console.log(process.env);
    super()

    this.state = {
      loggedIn: false, 
      loggedInUserEmail: "",
      loggedInUserId: "",
      loggedInUserIsAdmin: null,
 
    }
  }

  
  register = async (registerInfo) => {
    console.log("register() in app. js called with the following info", registerInfo);
    const url = process.env.REACT_APP_API_URL + "/api/v1/users/register"
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
          loggedInUserId: registerJson.data.id,
          loggedInUserAdmin: registerJson.data.is_admin
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
          loggedInUserId: loginJson.data.id,
          loggedInUserIsAdmin:loginJson.data.is_admin

        })
      }
      console.log("here is what is currently in state");
      console.log(this.state);
    } catch(error) {
      console.error('Error trying to log in')
      console.error(error)
    }
  }


  logout = async () => {
    try {
      const url = process.env.REACT_APP_API_URL  + '/api/v1/users/logout'
      const logoutResponse = await fetch(url, {
        credentials:'include'
      })
      console.log('logoutResponse', logoutResponse);
      const logoutJson = await logoutResponse.json()
      console.log(logoutJson, 'logoutJson');
      if( logoutResponse.status === 200 ) {
        this.setState({
          loggedIn:false,
          loggedInUserEmail:'',
          loggedInUserId:'',
          loggedInUserIsAdmin: false,
        })
      }
    } catch (error) {
      console.error('error logging out');
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
      <Header 
        logout={this.logout} 
        email={this.state.loggedInUserEmail} />
        
        <UserContainer userId={this.state.loggedInUserId} userAdmin={this.state.loggedInUserIsAdmin}/>


      }
    

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



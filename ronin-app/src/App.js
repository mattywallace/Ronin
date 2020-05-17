import React, {Component} from 'react'
import './App.css';
import CourseContainer from './CourseContainer'
import LogInRegisterForm from './LogInRegisterForm'
import EnrollmentContainer from './EnrollmentContainer'
import Header from './Header'


export default class App extends Component {
  
  constructor() {
    super()

    this.state = {
      loggedIn: false, 
      loggedInUserEmail: "",
      loggedInUserId: "",
      enrollments:[]
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

  logout = () => {
    console.log('Log Out');
  }

  componentDidMount() {
    this.getEnrollments()
  }

  getEnrollments = async () => {
    try {
      const url = process.env.REACT_APP_API_URL +"/api/v1/enrollments/"
      const enrollmentsResponse = await fetch(url, {
        credentials:'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const enrollmentsJson = await enrollmentsResponse.json()
      console.log('this is enrollmentsJson', enrollmentsJson);
      console.log('this is enrollmentsResponse', enrollmentsResponse);
      this.setState({
        enrollments: enrollmentsJson.data
      })
    } catch (error) {
      console.log('Error getting enrollments data');
      console.error(error)
    }
  }

  createEnrollment = async (courseId) => {
    console.log('Props from APP');
    console.log('HERE IS THE COURSE ID IN ENROLLMENTS');
    console.log(courseId);
    try {
      const url = process.env.REACT_APP_API_URL + "/api/v1/enrollments/" + courseId + '/' + this.state.loggedInUserId
      const createdEnrollmentResponse = await fetch(url, {
        method: 'POST',
        credentials:'include',
        body: JSON.stringify(courseId),
        headers: {
          'Content-Type':'application/json'
        }
      })
      console.log('createdEnrollmentResponse', createdEnrollmentResponse);
      const createdEnrollmentJson = await createdEnrollmentResponse.json()
      console.log("here is what we get when we try to enroll in a course");
      console.log(createdEnrollmentJson);
      if (createdEnrollmentResponse.status === 201 ) {
        this.setState({
          enrollments:[...this.state.enrollments, createdEnrollmentJson.data]
        })
      }
      console.log('HERE IS THE STATE OF ENROLLMENTS IN APP.JS');
      console.log(this.state.enrollments)
    } catch (error) {
      console.error('error enrolling in course');
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
      <Header logout={this.logout} />
        <CourseContainer 
          userInfo={this.state}
          createEnrollment={this.createEnrollment}
          />
        <EnrollmentContainer 
          userInfo={this.state}
          enrollments={this.state.enrollments}
          createEnrollment={this.createEnrollment}
          getEnrollments={this.getEnrollments}
          />

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



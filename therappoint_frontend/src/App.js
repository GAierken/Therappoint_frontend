import React from 'react';
import logo from './logo.png'
import Login from './components/Login'
import SignUp from './components/Signup'
import Profile from './components/Profile'
import './App.css'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import {setToken} from './reducer/actions'
import { Route, Switch } from 'react-router'
import Home from './Home'
import SignLog from './SignLog'



import './App.css';

class App extends React.Component {
  
  
  

  fetchPost = (user) => {
   
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body:  JSON.stringify(user)
    })
    .then(r => r.json())
    .then(data => {
      
      if (data.errors) {
        
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: data.errors
        })
      } else {
        
        localStorage.token = data.token
        localStorage.id = data.user_id
        this.props.setToken(data.token, data.user_id)
        
      
        
        
      }
    })
  }
  
  
  
  render() {
     console.log(this.props.token)
  return (
    <div className="App">
     <img className="logo" src={logo} alt="logo"/>
     
     <Switch>
       <Route exact path="/" component={ Home } />
       <Route exact path="/client" component={ SignLog} />
       <Route exact path="/provider" component={ SignLog } />
       <Route exact path='/signup' render={() => <SignUp/>} />
       <Route exact path='/login' render={() => <Login/>} />
       <Route exact path='/profile' component={Profile}/>
     </Switch>
     
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, {setToken} )(App);

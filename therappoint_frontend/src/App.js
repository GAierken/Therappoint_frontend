import React from 'react';
import logo from './logo.png'
import Login from './components/Login'
import SignUp from './components/Signup'
import Profile from './components/Profile'
import './App.css'

import {connect} from 'react-redux'
import {setToken} from './reducer/actions'
import { Route, Switch } from 'react-router'
import Home from './Home'
import SignLog from './SignLog'



import './App.css';

class App extends React.Component {
  
  
  

 
  
  
  render() {
   console.log(localStorage)
  return (
    <div className="App">
     <img className="logo" src={logo} alt="logo"/>
     
     <Switch>
       <Route exact path="/" component={ Home } />
       <Route exact path="/client" component={ SignLog} />
       <Route exact path="/provider" component={ SignLog } />
       <Route exact path='/signup' render={() => <SignUp/>} />
       <Route exact path='/login' render={() => <Login/>} />
       <Route exact path='/profile' render={() => <Profile/>}/>
     </Switch>
     
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  
  return {
    token: state.token,
    user: state.user
  }
}

export default connect(mapStateToProps, {setToken} )(App);

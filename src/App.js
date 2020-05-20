import React from 'react';
import logo from './logo.png'
import Login from './components/Login'
import SignUp from './components/Signup'
import Profile from './components/Profile'
import './App.css'
import Edit from './components/Edit'
import {connect} from 'react-redux'
import {authUser, getClients, getProviders} from './reducer/actions'
import { Route, Switch } from 'react-router'
import Home from './Home'
import SignLog from './SignLog'
import Portfolio from './components/Portfolio'
import './App.css';
import Swal from 'sweetalert2'





class App extends React.Component {
  
  componentDidMount(){
    if (localStorage.token) {
      this.props.authUser(localStorage.token, localStorage.id)
    }
    
    this.props.getClients()
    this.props.getProviders()
    
  }

 
  
  
  render() {
  return (
    <div className="App">
     <img className="logo" src={logo} alt="logo"/>
     
     <Switch>
       <Route exact path="/" component={ Home } />
       <Route exact path="/client" component={ SignLog} />
       <Route exact path="/provider" component={ SignLog } />
       <Route exact path='/signup' render={() => <SignUp/>} />
       <Route exact path='/login' render={() => <Login/>} />
       <Route exact path='/profile' render={() => {
         
         if (localStorage.token) {
          return <Profile/>
         } else {
          Swal.fire({
            icon: 'warning',
            title: 'Please signup or login!'
          })
          return <Home/>
         } 
         }}/>
       <Route exact path='/edit' render={() => {
         
         if (localStorage.token) {
          return <Edit/>
         } else {
          Swal.fire({
            icon: 'warning',
            title: 'Please signup or login!'
          })
          return <Home/>
         } 
         }}/>
       <Route exact path='/portfolio' render={() => {
         
         if (localStorage.token) {
          return <Portfolio/>
         } else {
          Swal.fire({
            icon: 'warning',
            title: 'Please signup or login!'
          })
          return <Home/>
         } 
         }}/>
     </Switch>
     
     <p>Therappoint® created by Guligena Aierken © 2020</p>
    </div>
  )
  }
}

const mapStateToProps = (state) => {
  
  return {
    token: state.token,
    id: state.id,
    user: state.user
  }
}

export default connect(mapStateToProps, {authUser, getClients, getProviders} )(App);

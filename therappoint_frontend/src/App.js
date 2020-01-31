import React from 'react';
import logo from './logo.png'
import Login from './components/Login'
import SignUp from './components/Signup'
import Profile from './components/Profile'
import './App.css'
import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import {showNextButtons} from './reducer/actions'
import {userInputPage} from './reducer/actions'
import {setToken} from './reducer/actions'



import './App.css';

class App extends React.Component {
  
  // state = {
  //   userClicked: false,
  //   userChoice: "",
  //   token: ""

  // }
  handleClick = () => {
    this.props.showNextButtons()
  }
  
  handleLoginClick = (event) => {
   let buttonDiv01 = document.getElementById('button_2')
       buttonDiv01.style.display = "none"

       this.props.userInputPage(event.target.innerText)
  }

  fetchPost = (user) => {
    console.log(user)
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
          icon: 'error',
          title: 'Oops...',
          text: data.errors
        })
      } else {
        console.log(data)
        this.props.setToken(data.token)
        
      }
    })
  }
  
  
  
  render() {
  
  return (
    <div className="App">
     <img className="logo" src={logo} alt="logo"/>
     
     {this.props.userClicked?
     <div id="button_2" className="ui teal buttons">
        <button onClick={(event) => this.handleLoginClick(event)} className="ui massive button">Sign Up</button>
        <div className="or"></div>
        <button onClick={(event) => this.handleLoginClick(event)} className="ui massive button">Login</button>
      </div>
      :
      <div id="button_1" className="ui teal buttons">
        <button onClick={this.handleClick} className="ui massive button">Client</button>
        <div className="or"></div>
        <button onClick={this.handleClick} className="ui massive button">Provider</button>
      </div>}
      {this.props.userChoice === "Sign Up"? <SignUp createUser={this.fetchPost}/> : null}
      {this.props.userChoice === "Login"? <Login/> : null}
     
     {this.props.token !== ''? <Profile/> : null}
    </div>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    userClicked: state.userClicked,
    userChoice: state.userChoice,
    token: state.token
  }
}

export default connect(mapStateToProps, {showNextButtons, userInputPage, setToken} )(App);

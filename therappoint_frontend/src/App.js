import React from 'react';
import logo from './logo.png'
import Login from './components/Login'
import SignUp from './components/Signup'
import './App.css'



import './App.css';

class App extends React.Component {
  
  state = {
    userClicked: false,
    userChoice: ""

  }
  handleClick = () => {
    this.setState({
      userClicked: !this.state.userClicked
    })
  }
  
  handleLoginClick = (event) => {
   let buttonDiv01 = document.getElementById('button_2')
       buttonDiv01.style.display = "none"

       this.setState({
         userChoice: event.target.innerText
       })
  }
  
  
  render() {
    
  return (
    <div className="App">
     <img className="logo" src={logo} alt="logo"/>
     
     {this.state.userClicked?
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
      {this.state.userChoice === "Sign Up"? <SignUp/> : null}
      {this.state.userChoice === "Login"? <Login/> : null}
     
    </div>
  );
  }
}

export default App;

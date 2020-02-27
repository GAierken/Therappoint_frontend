import React from 'react';
import './Form.css'
import { connect } from 'react-redux';
import {setToken} from '../reducer/actions'
import {authUser} from '../reducer/actions'
import { Redirect, Link } from 'react-router-dom';
import { loginUser } from '../reducer/actions'


 class Login extends React.Component{

   state = {
       username: "",
       password: ""
   }

   handleChange = (evt) => {
    this.setState({
        [evt.target.name]: evt.target.value
    })
  }

   handleSubmit = (evt) => {
       evt.preventDefault()
       let user = this.state
      this.props.loginUser(user)
       this.setState({
        username: "",
        password: ""
        })
       
   }
   
    render(){
        
        if (this.props.token) {
           
            return <Redirect to="/profile"></Redirect>
        } else {
            return(
                <div>
                    <form onSubmit={this.handleSubmit} className="ui large form">
                        <label>Username:</label>
                        <input onChange={this.handleChange} type="text" name="username" value={this.state.username}></input>
                        <label>Password:</label>
                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password}></input>
                        <input type="submit" className="ui teal button"></input>
                    </form> 
                    <Link to="/"><button className="ui button blue mini edit back">Back</button></Link>
                </div>)
        } 
           
        
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}


export default connect(mapStateToProps, {setToken, authUser, loginUser})(Login)
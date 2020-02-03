import React from 'react';
import './Form.css'
import { connect } from 'react-redux';
import { createUser } from '../reducer/actions'


class Signup extends React.Component{
   state = {
       username: "",
       email: "",
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
    
    this.props.createUser(user)

    this.setState({
        username: "",
        password: "",
        email: ""
    })
   
    
}


    render(){
    
        return (
           <form onSubmit={this.handleSubmit} className="ui large form">
               <label>Username:</label>
               <input onChange={this.handleChange} type="text" name="username" value={this.state.username}></input>
               <label>Email:</label>
               <input onChange={this.handleChange} type="text" name="email" value={this.state.email}></input>
               <label>Password:</label>
               <input onChange={this.handleChange} type="text" name="password" value={this.state.password}></input>
               <input type="submit" className="ui teal button"></input>
           </form> 
        )
    }
}

export default connect(null, {createUser})(Signup)
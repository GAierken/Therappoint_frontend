import React from 'react';


export default class Login extends React.Component{

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
       this.setState({
           username: "",
           password: ""
       })
   }
   
    render(){
        return (
           <form onSubmit={this.handleSubmit} className="ui form">
               <label>Username:</label>
               <input onChange={this.handleChange} type="text" name="username" value={this.state.username}></input>
               <label>Password:</label>
               <input onChange={this.handleChange} type="text" name="password" value={this.state.password}></input>
               <input type="submit" className="ui teal button"></input>
           </form> 
        )
    }
}

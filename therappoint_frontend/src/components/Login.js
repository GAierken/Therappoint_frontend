import React from 'react';


export default class Login extends React.Component{

   state = {
       username: "",
       password: ""
   }

   handleSubmit = (evt) => {
       evt.preventDefault()
       console.log('submit')
   }
   
    render(){
        return (
           <form onSubmit={this.handleSubmit} className="ui form">
               <label>Username:</label>
               <input type="text" name="username" value={this.state.username}></input>
               <label>Password:</label>
               <input type="text" name="password" value={this.state.password}></input>
               <input type="submit" className="ui teal button"></input>
           </form> 
        )
    }
}

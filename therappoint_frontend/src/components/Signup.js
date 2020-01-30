import React from 'react';

export default class Signup extends React.Component{
   state = {
       username: "",
       email: "",
       password: ""

   }

    render(){
        return (
           <form className="ui form">
               <label>Username:</label>
               <input type="text" name="username" value={this.state.username}></input>
               <label>Email:</label>
               <input type="text" name="email" value={this.state.email}></input>
               <label>Password:</label>
               <input type="text" name="password" value={this.state.password}></input>
               <input type="submit" className="ui teal button"></input>
           </form> 
        )
    }
}

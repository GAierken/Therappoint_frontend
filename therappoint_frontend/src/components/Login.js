import React from 'react';
import './Form.css'
import Swal from 'sweetalert2'
import { connect } from 'react-redux';
import {setToken} from '../reducer/actions'

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
       fetch("http://localhost:3000/login", {
           method: 'POST',
           headers: {
               "content-type": "application/json",
               "accept": "application/json"
           },
           body: JSON.stringify(this.state)
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
               this.props.setToken(data.token, data.id)
             
               
           }
       })
       
       
       
       
       
       this.setState({
           username: "",
           password: ""
       })
   }
   
    render(){
        return (
           <form onSubmit={this.handleSubmit} className="ui large form">
               <label>Username:</label>
               <input onChange={this.handleChange} type="text" name="username" value={this.state.username}></input>
               <label>Password:</label>
               <input onChange={this.handleChange} type="text" name="password" value={this.state.password}></input>
               <input type="submit" className="ui teal button"></input>
           </form> 
        )
    }
}


export default connect(null, {setToken})(Login)
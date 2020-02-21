import React from 'react';
import './Form.css'
import { connect } from 'react-redux';
import { createUser } from '../reducer/actions'
import {authUser} from '../reducer/actions'
import { Redirect, Link } from 'react-router-dom';




class Signup extends React.Component{
   state = {
       username: "",
       email: "",
       password: "",
       specialty:"",
       img_url: "https://clipartart.com/images/default-profile-picture-clipart-3.jpg"

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
        email: "",
        specialty: ""
    })
   
    
}


    render(){
       
       
        if(this.props.token){
            return <Redirect to="/profile"></Redirect>
        } else {
        return (
          localStorage.category === 'Provider'?
          <div>
           <form onSubmit={this.handleSubmit} className="ui large form">
               <label>Username:</label>
               <input onChange={this.handleChange} type="text" name="username" value={this.state.username} placeholder="Please enter your username"></input>
               <label>Email:</label>
               <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="Please enter your Email"></input>
               <label>Specialty:</label>
                <select name="specialty" onChange={this.handleChange} className="ui dropdown">
                    <option value="" disabled selected>Please select your specialty</option>
                    <option value="physical therapy">physical therapy</option>
                    <option value="occupational therapy">occupational therapy</option>
                    <option value="speech therap">speech therapy</option>
                    <option value='psychological therapy'>psychological therapy</option>
                    <option value="ABA therapy">ABA therapy</option>
                    <option value="educational therapy">educational therapy</option>
                </select>
               <label>Password:</label>
               <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="Please enter your password"></input>
               <input type="submit" className="ui teal button"></input>
           </form> 
           <Link to="/"><button className="ui button blue mini edit back">Back</button></Link>
          </div>
           :
           <div>
           <form onSubmit={this.handleSubmit} className="ui large form">
               <label>Username:</label>
               <input onChange={this.handleChange} type="text" name="username" value={this.state.username} placeholder="Please enter your username"></input>
               <label>Email:</label>
               <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="Please enter your Email"></input>
               <label>Password:</label>
               <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="Please enter your password"></input>
               <input type="submit" className="ui teal button"></input>
           </form> 
           <Link to="/"><button className="ui button blue mini edit back">Back</button></Link>
           </div>

        )
        }
    }
}



const mapStateToProps = (state) => {
 
    return {
        token: state.token,
        category: state.category
    }
}


export default connect(mapStateToProps, {createUser, authUser})(Signup)
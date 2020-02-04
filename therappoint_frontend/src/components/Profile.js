import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'
import { LogOut } from '../reducer/actions'


class Profile extends React.Component {

 state={
     clicked: false
 }
 
handleLogOutClick = () => {
    
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    
    this.props.LogOut()
  
}

handleClick = () => {
    console.log('clicked')
    this.setState({
        clicked: !this.state.clicked
    })
}

editClick = () => {
    console.log('cliecked')
   
}


    render(){
    //  console.log(localStorage, this.props.user.img_url, this.props.user.username)
        return (
            this.state.clicked?
            <div className="ui raised link card">
                 <div onClick={this.handleClick} className="content">
                    <article className="header">Full name: {this.props.user.first_name} {this.props.user.last_name}</article> 
                    <article className="header">Address: {this.props.user.address} </article>
                    <article className="header">Email: {this.props.user.email} </article>
                    <article className="header">Contact: {this.props.user.phone_number} </article> 
                 </div>
                 <Link to="/edit"><button onClick={this.editClick} className='ui teal button'>Edit</button></Link>
            </div>
           :
           <div  className="ui raised link card">
             <div onClick={this.handleClick} className="image">
               <img src={this.props.user.img_url} alt={this.props.user.username}/>
             </div>
             <div className="content">
               <article className="header">{this.props.user.username}</article>
             </div>
            <Link to="/"><button onClick={this.handleLogOutClick} className="ui teal button">Logout</button></Link>
       </div>
            
           
        )
    }
}

const mapStateToProps = (state) => {
    return {
       user: state.user
    }
}

export default connect(mapStateToProps, {LogOut})(Profile)
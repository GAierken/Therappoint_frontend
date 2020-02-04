import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'
import { LogOut, deleteUser } from '../reducer/actions'


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
    this.setState({
        clicked: !this.state.clicked
    })
}


handleDelete = () => {
    console.log('delete')
    this.props.deleteUser(this.props.user)
}


    render(){
        return (
            this.state.clicked?
            <div className="ui raised link card">
                 <div onClick={this.handleClick} className="content">
                    <article className="header">Full name: {this.props.user.first_name} {this.props.user.last_name}</article> 
                    <article className="header">Address: {this.props.user.address} </article>
                    <article className="header">Email: {this.props.user.email} </article>
                    <article className="header">Contact: {this.props.user.phone_number} </article> 
                 </div>
                 <Link to="/edit"><button className='ui teal button'>Edit</button></Link>
                 <Link to="/"><button onClick={this.handleDelete} className='ui teal button' >Delete</button></Link>
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

export default connect(mapStateToProps, {LogOut, deleteUser})(Profile)
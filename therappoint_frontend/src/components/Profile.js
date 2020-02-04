import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'


class Profile extends React.Component {

 
 
handleLogOutClick = () => {
    
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    
  
}

    render(){
     console.log(localStorage, this.props.user.img_url)
        return (
            
            <div className="info">
                
                <img src={this.props.img_url} alt="user" />
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

export default connect(mapStateToProps)(Profile)
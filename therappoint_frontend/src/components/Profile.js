import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {logOut} from '../reducer/actions'


class Profile extends React.Component {

 handleClick = () => {
     this.props.logOut()
 }
 

    render(){
      
        return (
            
            <div className="info">
                
                <img src="https://i.pinimg.com/236x/56/e2/95/56e295e8a3b3837902a9bec1caa66ecd--photography-women-female-faces.jpg" alt="user" />
                <button onClick={this.handleClick} className="ui teal button">Logout</button>
            </div>
           
        )
    }
}

const mapStateToProps = (state) => {
    return {
       user: state.user
    }
}

export default connect(mapStateToProps, {logOut})(Profile)
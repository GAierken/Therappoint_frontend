import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'


class Profile extends React.Component {

 
 

    render(){
      console.log(this.props.user)
        return (
            
            <div className="info">
                
                <img src="https://i.pinimg.com/236x/56/e2/95/56e295e8a3b3837902a9bec1caa66ecd--photography-women-female-faces.jpg" alt="user" />
                <Link to="/"><button className="ui teal button">Logout</button></Link>
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
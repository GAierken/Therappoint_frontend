import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'
import { LogOut, deleteUser } from '../reducer/actions'
import uuid from 'uuid'


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
    this.props.deleteUser(this.props.user)
}

appointmentLi = () => {
    return this.props.user.provider_appointments.map((appoint) => {
    return <li key={appoint.id}>{appoint.appoint_date}</li>
    }
    )
}

providersImg = () => {
    return this.props.user.providers.map((provider) => {
        return <img key={uuid()} className="ui image" src={provider.img_url} alt={provider.last_name} />
    }
    )
}

    render(){
       console.log(this.props.user)
        return (
            
            <div className="ui three column grid">
                {/* beginning personal info */}
                <div className="column">
                    <div className="ui segment">
                    {this.state.clicked?
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
                        <div  onClick={this.handleClick} className="ui raised link card">
                            <div  className="image">
                            <img src={this.props.user.img_url} alt={this.props.user.username}/>
                            </div>
                            <div className="content">
                            <article className="header">{this.props.user.username}</article>
                            </div>
                            <Link to="/"><button onClick={this.handleLogOutClick} className="ui teal button">Logout</button></Link>
                        </div>
                    }
                    </div>
                </div>

                {/* beginning of calender appointment making column */}
                <div className="column">
                    <div className="ui segment">
                        <div className="ui tiny images">
                        Providers:
                        {this.props.user.providers? this.providersImg():null}
                        </div>
                        <article>appointment making calendar</article>
                    </div>
                </div>

                {/* beginning of apointment history */}
                <div className="column">
                    <div className="ui segment">
                        <ul>
                           appointments history and following:
                         {this.props.user.provider_appointments? this.appointmentLi():null}

                        </ul>
                    </div>
                </div>
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
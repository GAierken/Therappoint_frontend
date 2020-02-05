import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'
import { LogOut, deleteUser, setPickedUserId, createAppointment } from '../reducer/actions'
import uuid from 'uuid'
import Calendar from './Calendar'

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
    const providers = [...this.props.user.providers]

    const uniqueProviders = Array.from(new Set(providers.map(p => p.id))).map((id) => {
        return providers.find((p) => {
            return p.id === id})})

    console.log(uniqueProviders)
    return uniqueProviders.map((provider) => {
    return <img onClick={this.pickProv} key={uuid()} data-id={provider.id} className="ui image" src={provider.img_url} alt={provider.last_name} />
    }
    )
}

confirmAppo = () => {
    console.log(this.props.date, this.props.pickedId, this.props.user.id)
    this.props.createAppointment(this.props.date, this.props.user.id, this.props.pickedId)
}

pickProv = (evt) => {
    this.props.setPickedUserId(evt.target.dataset.id)
    
}


    render(){
        console.log(this.props.date, this.props.pickedId)
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
                        <Calendar />
                        <button onClick={this.confirmAppo}>Schedule</button>
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
       user: state.user,
       date: state.date,
       pickedId: state.pickedId
    }
}

export default connect(mapStateToProps, {LogOut, deleteUser, setPickedUserId, createAppointment})(Profile)
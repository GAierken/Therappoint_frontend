import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'
import { LogOut, deleteUser, setPickedUserId, createAppointment, deleteAppointment, updateAppointment, authUser } from '../reducer/actions'
import uuid from 'uuid'
import Calendar from './Calendar'

class Profile extends React.Component {

 state={
     clicked: false,
     rescheduleClicked: false,
     rescheduleAppoinId: ''
 }


handleLogOutClick = () => {
    
    localStorage.clear()
    
    this.props.LogOut()
  
}

handleClick = () => {
    this.setState({
        clicked: !this.state.clicked
    })
}


handleDelete = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.props.deleteUser(this.props.user)
}

appointmentLi = () => {
    return this.props.user.provider_appointments.map((appoint) => {
    return (<ul key={uuid()}>
                <li key={uuid()}>{appoint.appoint_date}</li>
                <button key={uuid()} data-id={appoint.id} onClick={this.handleSetReschedule}>Reschedule</button> 
                <button key={uuid()} data-id={appoint.id} onClick={this.handleAppoDelete}>Cancel</button>
            </ul>)
    }
    )
}

providersImg = () => {
    const providers = [...this.props.user.providers]

    const uniqueProviders = Array.from(new Set(providers.map(p => p.id))).map((id) => {
        return providers.find((p) => {
            return p.id === id})})

    
    return uniqueProviders.map((provider) => {
    return <img className="ui circular image" onClick={this.pickProv} key={uuid()} data-id={provider.id} src={provider.img_url} alt={provider.last_name} />
    }
    )
}

confirmAppo = () => {
    
    this.props.createAppointment(this.props.date, this.props.user.id, this.props.pickedId)
   
}

pickProv = (evt) => {
    this.props.setPickedUserId(evt.target.dataset.id)
    
}

handleAppoDelete = (evt) => {
    this.props.deleteAppointment(evt.target.dataset.id)
}

handleSetReschedule = (evt) => {
   
    this.setState({
        ...this.state,
        rescheduleClicked: true,
        rescheduleAppoinId: evt.target.dataset.id
    })
}

updateAppointdate = () => {
    
    this.props.updateAppointment(this.state.rescheduleAppoinId, this.props.date)
    this.setState({
        ...this.state,
        rescheduleClicked: false
    })
}

handleSearch = (evt) => {
   console.log(evt.target.value)
}


    render(){
        
        return (
           <div className="top div">
           {/* search bar */}
           {this.props.user.specialty?
            <div className="ui search">
                <div className="ui icon input">
                    <input onChange={this.handleSearch} className="prompt" type="text" placeholder="Find your client"/>
                    <i className="search icon"></i>
                </div>
                <div className="results"></div>
            </div>
            :
            <div className="ui search">
                <div className="ui icon input">
                    <input onChange={this.handleSearch} className="prompt" type="text" placeholder="Find your "/>
                    <i className="search icon"></i>
                </div>
                <div className="results"></div>
            </div>
            }
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
                        <div className="ui tiny circular images">
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
                         {this.props.user.provider_appointments? this.appointmentLi(): <li>No appointment.</li>}
                         {this.state.rescheduleClicked? <li><Calendar/><button onClick={this.updateAppointdate}>confirm</button></li>: null}

                        </ul>
                    </div>
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

export default connect(mapStateToProps, {LogOut, deleteUser, setPickedUserId, createAppointment, deleteAppointment, updateAppointment, authUser})(Profile)
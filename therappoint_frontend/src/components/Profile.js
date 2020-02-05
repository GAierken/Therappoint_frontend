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
    
    localStorage.clear()
    
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
    return ( <ul key={uuid()}>
              <li key={uuid()}>{appoint.appoint_date}</li>
              <button key={uuid()} onClick={this.handleReschedule}>Reschedule</button> 
              <button key={uuid()} data-id={appoint.id} onClick={this.handleAppoDelete}>Cancel</button>
            </ul>)
    }
    )
}

providersImg = () => {


   const renewFirst = JSON.parse(localStorage.providers.split("},")[0].substring(1)+"}")
   const renewSecond = JSON.parse(localStorage.providers.split("},")[localStorage.providers.split("},").length-1].substring(0, localStorage.providers.split("},")[localStorage.providers.split("},").length-1].length-1))
   const stringArr = localStorage.providers.split("},").splice(1, localStorage.providers.split("},").length-2)
   const providers = stringArr.map(e => JSON.parse(e+"}"))
         providers.push(renewFirst, renewSecond)
         console.table(providers)
    // avoid array duplication///
    const uniqueProviders = Array.from(new Set(providers.map(p => p.id))).map((id) => {
        return providers.find((p) => {
            return p.id === id})})

    return uniqueProviders.map((provider) => {
    return <img onClick={this.pickProv} key={uuid()} data-id={provider.id} className="ui image" src={provider.img_url} alt={provider.last_name} />
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
    console.log('deleted', evt.target.dataset.id)
    
}

handleReschedule = () => {
    console.log('reschedule')
}




    render(){
       
        return (
            
            <div className="ui three column grid">
                {/* beginning personal info */}
                <div className="column">
                    <div className="ui segment">
                    {this.state.clicked?
                        <div className="ui raised link card">
                            <div onClick={this.handleClick} className="content">
                                <article className="header">Full name: {localStorage.first_name} {localStorage.last_name}</article> 
                                <article className="header">Address: {localStorage.address} </article>
                                <article className="header">Email: {localStorage.email} </article>
                                <article className="header">Contact: {localStorage.phone_number} </article> 
                            </div>
                            <Link to="/edit"><button className='ui teal button'>Edit</button></Link>
                            <Link to="/"><button onClick={this.handleDelete} className='ui teal button' >Delete</button></Link>
                        </div>
                    :
                        <div  onClick={this.handleClick} className="ui raised link card">
                            <div  className="image">
                            <img src={localStorage.img_url} alt={localStorage.username}/>
                            </div>
                            <div className="content">
                            <article className="header">{localStorage.username}</article>
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
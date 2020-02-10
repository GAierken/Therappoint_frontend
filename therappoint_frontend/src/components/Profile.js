import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'
import { LogOut, deleteUser, setPickedUserId, createAppointment, deleteAppointment, updateAppointment, authUser, changeUpdateState, newSource } from '../reducer/actions'
import uuid from 'uuid'
import Calendar from './Calendar'
import SearcBar from './SearchBar'
import MapContainer from './MapContainer'
import { Segment, Button, List, Image, Grid } from 'semantic-ui-react';


class Profile extends React.Component {

 state={
     clicked: false,
     rescheduleClicked: false,
     rescheduleAppoinId: ''
 }

 componentDidMount() {
   this.props.newSource()
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
    return (
                <List.Item key={uuid()}>
                 <List.Content key={uuid()}>{appoint.appoint_date}</List.Content>
                 <Button size="mini" className="teal" key={uuid()} data-id={appoint.id} onClick={this.handleSetReschedule}>Reschedule</Button> 
                 <Button size="mini" className="red" key={uuid()} data-id={appoint.id} onClick={this.handleAppoDelete}>Cancel</Button>
                </List.Item>
            )
    }
    )
}

providersImg = () => {
    const providers = [...this.props.user.providers]

    const uniqueProviders = Array.from(new Set(providers.map(p => p.id))).map((id) => {
        return providers.find((p) => {
            return p.id === id})})

    
    return uniqueProviders.map((provider) => {
    return <Image size="tiny" onClick={this.pickProv} key={uuid()} data-id={provider.id} src={provider.img_url} alt={provider.last_name } circular />
    }
    )
}

confirmAppo = () => {
    if(this.props.user.specialty){
    this.props.createAppointment(this.props.date, this.props.pickedId, this.props.user.id)}
    else{
        this.props.createAppointment(this.props.date, this.props.user.id, this.props.pickedId)}    
   
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



providerAppoLi = () => {
    return this.props.user.client_appointments.map((appoint) => {
        return (<List.Item key={uuid()}>
                    <List.Content key={uuid()}>{appoint.appoint_date}
                    <Button className="teal" size="mini" key={uuid()} data-id={appoint.id} onClick={this.handleSetReschedule}>Reschedule</Button> 
                    <Button className="red" size="mini" key={uuid()} data-id={appoint.id} onClick={this.handleAppoDelete}>Cancel</Button>
                    </List.Content>
                </List.Item>)
        }
        )
}

clientsImg = () => {
    const clients = [...this.props.user.clients]
    const uniqueClients = Array.from(new Set(clients.map(c => c.id))).map((id) => {
        return clients.find((c) => {
            return c.id === id})})
    
    
    return uniqueClients.map((client) => {
    return <Image size="tiny" onClick={this.pickProv} key={uuid()} data-id={client.id} src={client.img_url} alt={client.last_name} circular/>
    }
    )
}

changeUpdatedState = () => {
    this.props.changeUpdateState()
}


    render(){
       
        return (
           <div className="top div">
           {/* search bar */}
           <SearcBar/>
            <Grid relaxed columns={3}>
                {/* beginning personal info */}
               <Grid.Column>
               <Segment>
                    {this.state.clicked?
                        <Segment.Group raised>
                            <Segment onClick={this.handleClick} className="content">
                                <List.Item>
                                 <List.Icon name='users'/>
                                 <List.Content>Full name: {this.props.user.first_name} {this.props.user.last_name}</List.Content> 
                                 <List.Icon name="marker"/>
                                 <List.Content>Address: {this.props.user.address} </List.Content>
                                 <List.Icon name="mail"/>
                                 <List.Content>Email: {this.props.user.email} </List.Content>
                                 <List.Icon name="linkify"/>
                                 <List.Content>Contact: {this.props.user.phone_number} </List.Content> 
                               
                                    <Segment>
                                     <Link to="/edit"><Button size="mini" onClick={this.changeUpdatedState} className='teal'>Edit</Button></Link>
                                     <Link to="/"><Button size="mini" onClick={this.handleDelete} className='red' >Delete</Button></Link>
                                    </Segment>
                                </List.Item>
                            </Segment> 
                            <Grid.Row>
                               <MapContainer address={this.props.user.address}/>
                            </Grid.Row>
                        </Segment.Group>
                        
                               
                           
                        
                    :
                        <Segment.Group  onClick={this.handleClick} raised>
                            <Segment>
                             <Image src={this.props.user.img_url} alt={this.props.user.username} size="medium"/>
                            </Segment>
                            <Segment className="header">Hi! Welcome {this.props.user.username}! </Segment>
                            <Segment>
                             <Link to="/"><Button size="mini" onClick={this.handleLogOutClick} className="teal">Logout</Button></Link>
                            </Segment>
                        </Segment.Group>
                    }
                    
                    </Segment>
                    </Grid.Column>

                {/* beginning of calender appointment making column */}
                <Grid.Column>
                    <Segment>
                        Please click on the picture to choose
                        <div className="ui tiny circular images">
                        {this.props.user.providers? this.providersImg():null}
                        {this.props.user.clients? this.clientsImg():null}
                        </div>
                        <Segment>Please choose a date to schedule your appointment<Calendar /></Segment>
                        
                        <Segment><Button size="mini" className="teal" onClick={this.confirmAppo}>Schedule</Button></Segment>
                    </Segment>
               
                </Grid.Column>
                {/* beginning of apointment history */}
                <Grid.Column>
                    <Segment>
                        <List>
                           Appointments:
                         {this.props.user.provider_appointments? this.appointmentLi(): null}
                         {this.props.user.client_appointments? this.providerAppoLi(): null}
                         </List>
                         {this.state.rescheduleClicked? <Segment>Please select a date: <Calendar/><Button className="teal" onClick={this.updateAppointdate}>confirm</Button></Segment>: null}
                         
                    </Segment>
                </Grid.Column>
            </Grid>
            </div>
            
            
            
            
            
            
           
           
        )
    }
}

const mapStateToProps = (state) => {
    return {
       user: state.user,
       date: state.date,
       pickedId: state.pickedId,
       updated: state.updated,
       source: state.source
    }
}

export default connect(mapStateToProps, {LogOut, deleteUser, setPickedUserId, createAppointment, deleteAppointment, updateAppointment, authUser, changeUpdateState, newSource})(Profile)
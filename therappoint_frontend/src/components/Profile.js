import React from 'react'
import { connect } from 'react-redux';
import './Profile.css'
import {Link} from 'react-router-dom'
import { LogOut, deleteUser, setPickedUserId, createAppointment, deleteAppointment, updateAppointment, authUser, changeUpdateState, newSource } from '../reducer/actions'
import uuid from 'uuid'
import Calendar from './Calendar'
import SearcBar from './SearchBar'
import MapContainer from './MapContainer'
import { Segment, Button, List, Image, Grid, GridColumn } from 'semantic-ui-react';
import Swal from 'sweetalert2'


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
           let provider = this.props.user.providers.find((p) => p.id === appoint.provider_id)
           
    return (
                <List.Item key={uuid()}>
                 <List.Content key={uuid()}>
                    <List.Header onClick={() => {
                        Swal.fire({
                            icon: 'info',
                            text: `You have an appointment with ${provider.last_name} on ${appoint.appoint_date}.`,
                            imageUrl: `${provider.img_url}`,
                            imageWidth: 200,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                            position: 'top-end',
                            background: '#b2eee6'
                        }  
                        )
                    }
                    }>{appoint.appoint_date}</List.Header>
                     <List.Description>
                      <Button size="mini" className="teal" key={uuid()} data-id={appoint.id} onClick={this.handleSetReschedule}>Reschedule</Button> 
                      <Button size="mini" id="appocancel" key={uuid()} data-id={appoint.id} onClick={this.handleAppoDelete}>Cancel</Button>
                     </List.Description>
                 </List.Content>
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
       
        let client = this.props.user.clients.find((c) => c.id === appoint.client_id)
        return (<List.Item key={uuid()}>
                    <List.Content key={uuid()}>
                        <List.Header onClick={() => {
                        Swal.fire({
                            icon: 'info',
                            text: `You have an appointment with ${client.last_name} on ${appoint.appoint_date}.`,
                            imageUrl: `${client.img_url}`,
                            imageWidth: 200,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                            position: 'top-end',
                            background: '#b2eee6'
                     
                        }  
                        )
                    }
                    }>{appoint.appoint_date}</List.Header>
                        <List.Description>
                            <Button className="teal" size="mini" key={uuid()} data-id={appoint.id} onClick={this.handleSetReschedule}>Reschedule</Button> 
                            <Button id="appocancel02" size="mini" key={uuid()} data-id={appoint.id} onClick={this.handleAppoDelete}>Cancel</Button>
                        </List.Description>
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

handleNoAppo = () => {
    if(this.props.provider_appointments || this.props.client_appointments){
        return(
            <Grid><GridColumn>Your Appointments:</GridColumn></Grid>
        )
    }else{
        return(
            <Grid><GridColumn>Please make an appointment</GridColumn></Grid>
        )
    }
}


handleNoPickedUser = () => {
    if(this.props.providers === [] || this.props.clients === []){
        return(
            <Grid><GridColumn>Please find your providers or clients</GridColumn></Grid>
        )
    }else{
        return(
            <Grid><GridColumn>Please click on picture to choose</GridColumn></Grid>
        )
    }
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
                                 </List.Item>
                                    <Segment>
                                      <Grid>
                                          <Grid.Column>
                                            <Link to="/edit"><Button size="mini" onClick={this.changeUpdatedState} className='blue'>Edit</Button></Link>
                                            <Link to="/"><Button size="mini" onClick={this.handleDelete} className='red' >Delete</Button></Link>
                                          </Grid.Column>
                                      </Grid>
                                    </Segment>
                                
                            </Segment> 
                            
                            <Grid.Column>
                               <MapContainer address={this.props.user.address}/>
                            </Grid.Column>
                            
                        </Segment.Group>
                    :
                        <Segment.Group  onClick={this.handleClick} raised>
                            <Segment>
                             <Image src={this.props.user.img_url} alt={this.props.user.username} size="medium"/>
                            </Segment>
                            <Segment className="header">Hi! Welcome {this.props.user.username}! </Segment>
                            <Segment>
                                <Grid>
                                    <Grid.Column>
                                        <Link to="/"><Button size="mini" onClick={this.handleLogOutClick} className="grey">Logout</Button></Link>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Segment.Group>
                    }
                    
                    </Segment>
                    </Grid.Column>

                {/* beginning of calender appointment making column */}
                <Grid.Column>
                    <Segment>
                        {this.handleNoPickedUser()}
                        <Grid>
                            <Grid.Column>
                            <div className="ui tiny circular images">
                            {this.props.user.providers? this.providersImg():null}
                            {this.props.user.clients? this.clientsImg():null}
                            </div>
                            </Grid.Column>
                        </Grid>
                        <Segment>Please choose a date to schedule your appointment
                            <Grid><Grid.Column><Calendar /></Grid.Column></Grid>
                        </Segment>
                        
                        <Segment>
                            <Grid>
                                <Grid.Column>
                                    <Button size="mini" className="teal" onClick={this.confirmAppo}>Schedule</Button>
                                </Grid.Column>  
                            </Grid>
                        </Segment>
                    </Segment>
               
                </Grid.Column>
                {/* beginning of apointment history */}
                <Grid.Column>
                    <Segment>
                        {this.handleNoAppo()}
                        <List>
                         {this.props.user.provider_appointments? this.appointmentLi(): null}
                         {this.props.user.client_appointments? this.providerAppoLi(): null}
                         </List>
                         {this.state.rescheduleClicked? <Grid><Segment>Please select a date: <Calendar/><Button size="mini" className="teal" onClick={this.updateAppointdate}>confirm</Button><Button size="mini" color="blue" onClick={() => {
                             this.setState({
                                 rescheduleClicked: false
                             })
                         }
                         }>Back</Button></Segment></Grid>: null}
                         
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
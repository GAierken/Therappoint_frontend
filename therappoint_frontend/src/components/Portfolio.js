import React from 'react'
import {connect} from 'react-redux'
import { Grid, Image, Segment, Button } from 'semantic-ui-react'
import Calendar from './Calendar'
import { Redirect } from 'react-router'
import {createAppointment} from '../reducer/actions'
import Map from './MapContainer'
import './Portfolio.css'



class Portfolio extends React.Component {

    state={
        backClicked: false
    }

handleBackClick = () => {
    localStorage.removeItem('searched_id')
    localStorage.removeItem('searched_name')
    localStorage.removeItem('searched_img')
    localStorage.removeItem('searched_address')
    localStorage.removeItem('searched_specialty')
    localStorage.removeItem('searched_board_certified')
    localStorage.removeItem('searched_email')
    localStorage.removeItem('searched_phone_number')
    
  
    this.setState({
        backClicked: !this.state.backClicked
    })

}

handleScheduleClick = () => {
    if (this.props.user.specialty) {
        
        this.props.createAppointment(this.props.date, localStorage.searched_id, this.props.user.id)
    } else {
        
        this.props.createAppointment(this.props.date, this.props.user.id, localStorage.searched_id)
    }
    this.setState({
        backClicked: !this.state.backClicked
    })
}

handleShowSegment = () => {
       
    if (this.props.user.specialty) {
        return ( <Segment.Group raised>
            <Segment className="text koek">Name: {localStorage.searched_name}</Segment>
            <Segment className="text koek">Email: {localStorage.searched_email}</Segment>
            <Segment className="text koek">Contact number: {localStorage.searched_phone_number}</Segment>
            <Segment className="text koek">Address: {localStorage.searched_address? localStorage.searched_address:"n/a"}</Segment>
            <Grid><Grid.Column><Segment>Please select a date:<Calendar/><Button size="mini" onClick={this.handleScheduleClick} className="ui teal button" floated="left">Schedule</Button><Button size="mini" onClick={this.handleBackClick}className="ui blue button">Back</Button></Segment></Grid.Column></Grid>
            <Grid><Map address={localStorage.searched_address}/></Grid>
         </Segment.Group>)
    } else {
        return(
            <Segment.Group raised>
                <Segment className="text koek">Name: {localStorage.searched_name}</Segment>
                <Segment className="text koek">Specialty: {localStorage.searched_specialty}</Segment>
                <Segment className="text koek">Board Certified? {localStorage.searched_board_certified? "Yes" : "No"}</Segment>
                <Segment className="text koek">Email: {localStorage.searched_email}</Segment>
                <Segment className="text koek">Contact number: {localStorage.searched_phone_number}</Segment>
                <Segment className="text koek">Please select a date: <Calendar/><Button size="mini" onClick={this.handleScheduleClick} className="teal" floated="left">Schedule</Button><Button size="mini" onClick={this.handleBackClick}className="ui blue button">Back</Button></Segment>
                <Segment className="text koek">Address: {localStorage.searched_address? localStorage.searched_address : "n/a"}</Segment>
           <Grid><Map address={localStorage.searched_address}/></Grid>
        </Segment.Group>
        )
        
    }

}


    render(){

        
        if(this.state.backClicked){
            return <Redirect to="/profile"></Redirect>
        }else{
        return (
           
            <Grid>
                  <Grid.Column width={4}>
                    <Segment>
                        <Image src={localStorage.searched_img} size='medium'/>
                    </Segment>
                  </Grid.Column>
                
            <Grid.Column width={11}>
             {this.handleShowSegment()}
            </Grid.Column>
          </Grid>
         
        )}
    }
}


const mapStateToProps = (state) => {
    return {
        searchedUser: state.searchedUser,
        date: state.date,
        user: state.user
    }
}


export default connect(mapStateToProps, {createAppointment})(Portfolio)
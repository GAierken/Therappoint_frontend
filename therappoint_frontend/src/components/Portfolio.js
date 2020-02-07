import React from 'react'
import {connect} from 'react-redux'
import { Grid, Image, Segment, Button } from 'semantic-ui-react'
import Calendar from './Calendar'
import { Redirect } from 'react-router'
import {createAppointment} from '../reducer/actions'


class Portfolio extends React.Component {

    state={
        backClicked: false
    }

handleBackClick = () => {
    localStorage.removeItem('searched_name')
    localStorage.removeItem('searched_img')
    localStorage.removeItem('searched_address')
    localStorage.removeItem('searched_specialty')
    localStorage.removeItem('searched_board_certified')
    localStorage.removeItem('searched_email')
    localStorage.removeItem('searched_phone_number')
    localStorage.removeItem('searched_id')
  
    this.setState({
        backClicked: !this.state.backClicked
    })

}

handleScheduleClick = () => {
    if (localStorage.searched_specialty) {
        this.props.createAppointment(this.props.date, localStorage.searched_id, localStorage.id)
    } else {
        this.props.createAppointment(this.props.date, localStorage.id, localStorage.searched_id)
    }
    this.setState({
        backClicked: !this.state.backClicked
    })
}



    render(){
        
        if(this.state.backClicked){
            return <Redirect to="/profile"></Redirect>
        }else{
        return (
            <Grid>
            <Grid.Column width={4}>
              <Image src={localStorage.searched_img}/>
            </Grid.Column>
            <Grid.Column width={9}>
              <Segment.Group raised>
                 <Segment>Name: {localStorage.searched_name}</Segment>
                 <Segment>Specialty: {localStorage.searched_specialty}</Segment>
                 <Segment>Board Certified? {localStorage.searched_board_certified? "Yes" : "No"}</Segment>
                 <Segment>Email: {localStorage.searched_email}</Segment>
                 <Segment>Contact number: {localStorage.searched_phone_number}</Segment>
                 <Segment>Address: {localStorage.searched_address? localStorage.searched_address:"n/a"}</Segment>
                 <Segment><Calendar/><Button onClick={this.handleScheduleClick} className="ui teal button">Schedule</Button><Button onClick={this.handleBackClick}className="ui teal button">Back</Button></Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid>
        )}
    }
}


const mapStateToProps = (state) => {
    return {
        searchedUser: state.searchedUser,
        date: state.date
    }
}


export default connect(mapStateToProps, {createAppointment})(Portfolio)
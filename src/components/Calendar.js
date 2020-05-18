import React from "react";
import DatePicker from "react-datepicker";
import {setDate} from '../reducer/actions'
 
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
 
class Calendar extends React.Component {
  state = {
    startDate: ''
   
  };
 
  handleChange = date => {
   ///// restructure the date
   let dateFirst = JSON.stringify(date).slice(1, 20).replace('T', ' ').split(" ")[0]
   let correctedTime = JSON.stringify(date).slice(1, 20).replace("T", " ").split(" ")[1].split(":")
   let correctedHour = (correctedTime[0] - 5).toString()
   let newArr = correctedTime.splice(1)
       newArr.unshift(correctedHour)
   let dateSecond = newArr.join(":")
       
   let newDate = dateFirst + " " + dateSecond
   
    this.setState({
      startDate: date
    });
    this.props.setDate(newDate)

    
  };
 

  render() {
      
    return (
      <DatePicker
        placeholderText="Click here to select" 
        selected={this.state.startDate}
        onChange={this.handleChange}
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MM/dd/yyyy h:mm aa"
      />
    );
  }
}




export default connect(null, {setDate})(Calendar)
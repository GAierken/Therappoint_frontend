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
    this.setState({
      startDate: date
    });
    this.props.setDate(date)
  };
 

  render() {
      
    return (
      <DatePicker
        placeholderText="Click to select a date" 
        selected={this.state.startDate}
        onChange={this.handleChange}
        showTimeSelect
        timeFormat="p"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="Pp"
      />
    );
  }
}


export default connect(null, {setDate})(Calendar)
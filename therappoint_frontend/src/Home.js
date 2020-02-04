import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {setCategory} from './reducer/actions'

class Home extends React.Component {

handleClick = (evt) => {
  this.props.setCategory(evt.target.innerText)
}

render(){
   return (
         <div id="button_1" className="ui teal buttons">
           <Link to="/client"><button onClick={this.handleClick} className="ui massive button">Client</button></Link>
           <div className="or"></div>
           <Link to="/provider"><button onClick={this.handleClick} className="ui massive button">Provider</button></Link>
         </div>
   )


  }



}



export default connect(null, {setCategory})(Home)
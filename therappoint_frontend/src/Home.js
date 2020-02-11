import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {setCategory} from './reducer/actions'
import {Button} from 'semantic-ui-react'

class Home extends React.Component {

handleClick = (evt) => {
  localStorage.category = evt.target.innerText
  this.props.setCategory(evt.target.innerText)
}

render(){

   return (
         <div id="button_1" className="ui teal buttons">
           <Link to="/client"><Button size="massive" onClick={this.handleClick} className="ui massive button">Client</Button></Link>
           <div className="or"></div>
           <Link to="/provider"><Button onClick={this.handleClick} className="ui massive button">Provider</Button></Link>
         </div>
   )


  }



}



export default connect(null, {setCategory})(Home)
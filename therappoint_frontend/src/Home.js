import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {

render(){
   return (
         <div id="button_1" className="ui teal buttons">
           <Link to="/client"><button className="ui massive button">Client</button></Link>
           <div className="or"></div>
           <Link to="/provider"><button className="ui massive button">Provider</button></Link>
         </div>
   )


  }



}



export default Home
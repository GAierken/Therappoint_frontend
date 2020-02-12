import React from 'react'
import { Link } from 'react-router-dom'
// import { Button } from 'semantic-ui-react'

class SignLog extends React.Component {

render(){
    return (
        
        <div id="button_2" className="ui teal buttons">
           <Link to="/signup"><button className="ui massive button">Sign Up</button></Link>
           <div className="or"></div>
           <Link to="login"><button className="ui massive button">Login</button></Link>
           
         </div>
         
         
    )
}



}


export default SignLog
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class SignLog extends React.Component {

render(){
    return (
        <div>
        <div id="button_2" className="ui buttons">
           <Link to="/signup"><button className="ui massive teal button kunupi">Sign Up</button></Link>
           <div className="or"></div>
           <Link to="/login"><button className="ui massive teal button kunupi">Login</button></Link>
           
         </div>
         <div>
         <Link to="/"><Button Fluid className="ui mini button blue kaytish">Back</Button></Link>
         </div>
         </div>
    )
}



}


export default SignLog
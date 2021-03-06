import React from 'react'
import { connect } from 'react-redux'
import {updateUser, updateSuccess}from '../reducer/actions'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'



class Edit extends React.Component{
state ={
    id: this.props.user.id, 
    username: this.props.user.username,
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    address: this.props.user.address,
    email: this.props.user.email,
    phone_number: this.props.user.phone_number,
    img_url: this.props.user.img_url,
    specialty: this.props.user.specialty,
    board_certified: false


}

handleChange = (evt) => {
    
    const target = evt.target
    const value = target.type === 'checkbox'? target.checked : target.value
    const name = target.name
    this.setState({
        ...this.state,
        [name]: value
    })
}

    handleSubmit = (evt) => {
        
        evt.preventDefault()
        let user = this.state

         this.props.updateUser(user)
         this.props.updateSuccess()
         

         
       
    }
    
    render(){
       
        
            if (this.props.updated === true) {
                return <Redirect to='/profile'></Redirect>
            } else {
                return (
                this.props.user.specialty?
                <div>
                    <form onSubmit={this.handleSubmit} className="ui large form">
                        <label>Username</label>
                        <input onChange={this.handleChange} type="text" name="username" placeholder={this.state.username} />
                        <label>First Name</label>
                        <input onChange={this.handleChange} type="text" name="first_name" placeholder={this.state.first_name}/>
                        <label>Last Name</label>
                        <input onChange={this.handleChange} type="text" name="last_name" placeholder={this.state.last_name}/>
                        <label>Address</label>
                        <input onChange={this.handleChange} type="text" name="address" placeholder={this.state.address}/>
                        <label>Email</label>
                        <input onChange={this.handleChange} type="text" name="email" placeholder={this.state.email}/>
                        <label>Contact Number</label>
                        <input onChange={this.handleChange} type="text" name="phone_number" placeholder={this.state.phone_number}/>
                        <label>Image</label>
                        <input onChange={this.handleChange} type="text" name="img_url" placeholder={this.state.img_url}/>
                        <label>Specialty</label>
                        <input onChange={this.handleChange} type="text" name="specialty" placeholder={this.state.specialty}/>
                        <label> Board Certified? </label>
                        <input onChange={this.handleChange} type="checkbox" name="board_certified"  checked={this.state.board_certified}/> <br/>
                    <input type="submit" className="ui teal button"/>
                    </form>
                    <Link to="/profile"><button className="ui button blue mini edit back">Back</button></Link>
                </div>
                :
                <div>
                    <form onSubmit={this.handleSubmit} className="ui large form">
                        <label>Username</label>
                        <input onChange={this.handleChange} type="text" name="username" placeholder={this.state.username} />
                        <label>First Name</label>
                        <input onChange={this.handleChange} type="text" name="first_name" placeholder={this.state.first_name}/>
                        <label>Last Name</label>
                        <input onChange={this.handleChange} type="text" name="last_name" placeholder={this.state.last_name}/>
                        <label>Address</label>
                        <input onChange={this.handleChange} type="text" name="address" placeholder={this.state.address}/>
                        <label>Email</label>
                        <input onChange={this.handleChange} type="text" name="email" placeholder={this.state.email}/>
                        <label>Contact Number</label>
                        <input onChange={this.handleChange} type="text" name="phone_number" placeholder={this.state.phone_number}/>
                        <label>Image</label>
                        <input onChange={this.handleChange} type="text" name="img_url" placeholder={this.state.img_url}/>
                        <input type="submit" className="ui teal button"/>
                    </form>
                    <Link to="/profile"><button className="ui button blue mini edit back">Back</button></Link>
                </div>)
            }
       
        
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        updated: state.updated
        
    }
}


export default connect(mapStateToProps, {updateUser, updateSuccess})(Edit)
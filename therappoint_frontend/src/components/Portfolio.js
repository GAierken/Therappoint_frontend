import React from 'react'
import {connect} from 'react-redux'


class Portfolio extends React.Component {


    render(){
        return (
            <p>Personal Page</p>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(Portfolio)
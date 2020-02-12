import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_MAP_API_KEY)

class MapContainer extends React.Component {

  state = {
    lat: "",
    lng: ""
  }
componentDidMount(){
  Geocode.fromAddress(this.props.address)
  .then(r => {
    const {lat, lng} = r.results[0].geometry.location
   this.setState({
     lat: lat,
     lng: lng
   })
  },
  error => {
    console.error(error)
  })
}


    render(){
     
        return(
        <Map google={this.props.google} zoom={10} initialCenter={{
          lat: 40.73,
          lng: -73.93
        }}>
        <Marker name={'user address'} position={this.state}></Marker>
      </Map>)
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_MAP_API_KEY)
  })(MapContainer)
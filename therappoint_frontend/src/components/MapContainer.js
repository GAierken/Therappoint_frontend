import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class MapContainer extends React.Component {



    render(){
        return(
        <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              map
            </div>
        </InfoWindow>
      </Map>)
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_MAP_API_KEY)
  })(MapContainer)
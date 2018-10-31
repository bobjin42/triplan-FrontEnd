import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'
import L from 'leaflet'


class MapWrapper extends Component {

  render() {
    const positions = [[40.7484312, -73.9856567], [40.757951, -73.9856027], [40.7115133, -74.0133146]]
    const icon = [L.icon({
      iconUrl: require('../icon/1.png'),
      iconSize: [40,40]
    }), L.icon({
      iconUrl: require('../icon/2-circle.png'),
      iconSize: [40,40]
    }), L.icon({
      iconUrl: require('../icon/download.png'),
      iconSize: [40,40]
    })
    ]

    return (
      <div id="mapid">
        <Map center={positions[0]} zoom={12}>
         <TileLayer
         url='https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png'
         attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
         />
       {positions.map((position, index) => {
           return (
             <Marker key={index} position={position} icon={icon[index]}>
                <Popup>A pretty CSS3 popup.</Popup>
            </Marker>
           )
         })}
       </Map>
      </div>
    );
  }

}

export default MapWrapper;

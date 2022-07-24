import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet'
import { useState } from 'react'

const Demo =(props) => {
  const [position, setPosition] = useState([props.log, props.lat]);
    return (
        <MapContainer center={position} zoom={8} scrollWheelZoom={false}>
          <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={position}>
            </Marker>
        </MapContainer>
    )
  }

export default Demo;
import "./Location.css"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import L from "leaflet"

const customIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function RecenterMap({ position }) {
    console.log(position);
  const map = useMap()
  useEffect(() => {
    if (position && position.lat && position.lng) {
      map.setView([position.lat, position.lng], map.getZoom())
    }
  }, [position, map])
  return null
}

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    },
  })
  return null
}

export default function Location({ position, setPosition }) {
  console.log("Location component position:", position);

  useEffect(() => {  
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        (err) => {
          console.error("Geolocation error:", err)
        }
      )
    }

  }, [])

  return (
    <div style={{ position: 'relative' }}>
      {position && position.lat && position.lng && (
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          zIndex: 1000,
          background: 'white',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          <p>Location set: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}</p>
          <Link 
            to="/weather" 
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              background: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              marginTop: '8px'
            }}
          >
            Go to Weather
          </Link>
        </div>
      )}
      <MapContainer
        className="location"
        center={[51.505, -0.09]} 
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {position && position.lat && position.lng && (
        <Marker position={[position.lat, position.lng]} icon={customIcon}>
          <Popup>
            You are here <br /> {position.lat.toFixed(4)},{" "}
            {position.lng.toFixed(4)}
          </Popup>
        </Marker>
      )}

      {position && position.lat && position.lng && <RecenterMap position={position} />}
      <LocationMarker setPosition={setPosition} />
    </MapContainer>
    </div>
  )
}

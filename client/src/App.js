import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Demo from "./Demo";

const socket = io.connect("http://localhost:4000");

function App() {
  // Messages States
  const [message, setMessage] = useState({          
    accuracy: null,
    altitude:null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 30.,
    longitude: 10.0,
    speed: null
  });
  const [messageReceived, setMessageReceived] = useState({});

  const sendMessage = () => {
    //navigator.geolocation.getCurrentPosition(function () {});
    
    const pos = navigator.geolocation.watchPosition((position) => {
      const payload = {
        coords: {
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          speed: position.coords.speed
        },
        timestamp: position.timestamp
      }
      setMessage(payload.coords);
      socket.emit('send-pos', JSON.stringify(payload))
    })
  };
  useEffect(() => {
      sendMessage();
      //receive the position of the other user
      socket.on("receive_pos", (data) => {
        setMessageReceived(JSON.parse(data).coords);
        console.log("msg: ", data);
      })
  }, [socket]);
  return (
    <>
      <button onClick={sendMessage}>Send Position</button>
      <Demo 
        log={message.longitude}
        lat={message.latitude}
      />
    </>
  );
}

export default App;

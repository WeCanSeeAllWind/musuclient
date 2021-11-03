import axios from "axios";
import { useState } from 'react';
import io from 'socket.io-client';

// const serverDomain = 'https://mususerver.herokuapp.com/'
const serverDomain = process.env.REACT_APP_IO || 'http://localhost:3001';
const socket = io(serverDomain);

function App() {
  const [servermessage, setServermesage] = useState('');
  const [socketmessage, setSocketmesage] = useState('');
  axios(serverDomain)
    .then(res=>{
      console.log(res.data);
      setServermesage(res.data);
    })
  function handleClick(e){
    e.preventDefault();
    socket.emit('welcome', (data)=>{
    setSocketmesage(data);
    })
  };  
  
  return (
    <>
      <h1>{servermessage}</h1>
      this is MuSU Client
      <button onClick={handleClick}></button>
      <h2>{socketmessage}</h2>
    </>
  );
}

export default App;

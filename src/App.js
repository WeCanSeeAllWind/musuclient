import axios from "axios";
import { useState } from 'react';

const serverDomain = 'https://mususerver.herokuapp.com/'

function App() {
  const [servermessage, setServermesage] = useState('');
  axios(serverDomain)
    .then(res=>{
      console.log(res.data);
      setServermesage(res.data);
    })
  
  
  return (
    <>
      <h1>{servermessage}</h1>
      this is MuSU Client
    </>
  );
}

export default App;

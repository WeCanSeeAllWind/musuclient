import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';
import io from 'socket.io-client';
import { useContext } from 'react';
import { Context } from '../reducers';
import Peer from 'peerjs';

const serverDomain = process.env.REACT_APP_IO || 'http://localhost:3001';
const socket = io(serverDomain);
// socket.emit('hello', "hahahah");


function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
}

//Exfault Component
function VideoContainer({className}) {
  console.log(`it's my new render`)
  const [state] = useContext(Context);
  const [count, setCount] = useState(0);
  const [people, setPeople] = useState({});
  // const [peers, setPeers] = useState({});
  const peers = {};
  console.log(people);
  const myNick = state.nickName;
  const myVideo = useRef();

  const ref = [useRef(), useRef(), useRef(), useRef(), useRef()]

  socket.on('hello', (data)=>{
    console.log(data)
    const newCount = count + 1
    setCount(newCount)
  })
  
  useEffect(() => {
    // const socket = io(serverDomain);
    // const peer = new Peer();
    peers[count] = new Peer();
    console.log(count)
    let myPeerId;
    let myStream;

    navigator.mediaDevices.getUserMedia({video:true}).then((stream)=>{
      myStream = stream
      addVideoStream(myVideo.current, stream);

      //peer
      peers[count].on('open', (id)=>{
        myPeerId = id;
        socket.emit('GoodMorning', myNick, myPeerId);
      });
      socket.on('GoodMorning', (otherNick, otherPeerId)=>{
        const dataConnection = peers[count].connect(otherPeerId);
        dataConnection.on('open', ()=>{
          dataConnection.send(myNick);
        });
        const mediaConnection = peers[count].call(otherPeerId, stream);
        setPeople((names)=>{
          const newNames = {...names, [count]: otherNick};
          return newNames;
        });
        mediaConnection.on("stream", (otherStream)=>{
          addVideoStream(ref[count].current, otherStream);
        });
        // setCount((cnt)=>cnt+1);
      })
      peers[count].on('call', (mediaConnection)=>{
        mediaConnection.answer(stream);
        mediaConnection.on("stream", (otherStream)=>{
          addVideoStream(ref[count].current, otherStream);
        });
        // setCount((cnt)=>cnt+1);
      });
      peers[count].on('connection', (conn)=>{
        conn.on('data', (otherNick)=>{
          console.log(`I got otherNick ${otherNick}`);
          console.log(otherNick)
          setPeople((names)=>{
            const newNames = {...names, [count]: otherNick}
            return newNames
          });
        })
      })
    })

    return function cleanup() {
      // myStream.getTracks().forEach((track) => {
      //   track.stop();
      // });
      // socket.disconnect();
      // peers[count].destroy();
    };
  }, [count])
  

  return (
    <StyledDiv className={className}>
      <MyVideoWrapper nick={myNick}><video ref={myVideo} autoPlay playsInline width="100%" height="auto"/></MyVideoWrapper>
      <MyVideoWrapper nick={people[0]}><video ref={ref[0]} autoPlay playsInline width="100%" height="auto"/></MyVideoWrapper>
      <MyVideoWrapper nick={people[1]}><video ref={ref[1]} autoPlay playsInline width="100%" height="auto"/></MyVideoWrapper>
      <MyVideoWrapper nick={people[2]}><video ref={ref[2]} autoPlay playsInline width="100%" height="auto"/></MyVideoWrapper>
      <MyVideoWrapper nick={people[3]}><video ref={ref[3]} autoPlay playsInline width="100%" height="auto"/></MyVideoWrapper>
      <MyVideoWrapper nick={people[4]}><video ref={ref[4]} autoPlay playsInline width="100%" height="auto"/></MyVideoWrapper>
    </StyledDiv>
  )
}

//Styled CSS
const StyledDiv = styled.div`
  background-color: #22222c;
  display: grid;
  -ms-grid-column-align: center;
  -ms-grid-row-align: center;
  grid-template-rows: 0.5fr 0.5fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
`;

export default VideoContainer

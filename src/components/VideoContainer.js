import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';
import io from 'socket.io-client';
import { useContext } from 'react';
import { Context } from '../reducers';
import Peer from 'peerjs';

const serverDomain = process.env.REACT_APP_IO || 'http://localhost:3001';
const socket = io(serverDomain);

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
}

//Exfault Component
function VideoContainer({className}) {
  console.log('Its my render');
  const myVideo = useRef();
  
  const [state, dispatch] = useContext(Context);
  const myNick = state.nickName;
  const [people, setPeople] = useState({});
  const ref = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const [count, setCount] = useState(0);
  // let count = 0;
  const peers = {};
  let myStream;
  useEffect(() => {
    socket.emit('hello', myNick);
  }, [])
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({video: true}).then((stream)=>{
      myStream = stream
      addVideoStream(myVideo.current, myStream);
    });
    socket.on('hello', (otherNick, otherSocketId)=>{
      console.log(otherNick, otherSocketId);
      peers[otherNick] = new Peer();
      peers[otherNick].on('call', (call)=>{
        console.log(`I got call from ${otherNick}`);
        call.answer(myStream);
        call.on('stream', (remoteStream)=>{
          addVideoStream(ref[count].current, remoteStream);
        })
      })
      peers[otherNick].on('open', (myPeerId)=>{
        socket.emit('gm', myNick, myPeerId, otherSocketId);  
      });
      setCount(cnt=>cnt+1);
      setPeople((names)=>{
        const newNames = {...names, [count]: otherNick}
        return newNames
      });
    });
    socket.on('gm', (otherNick, otherPeerId, otherSocketId)=>{
      socket.emit('metoo', myNick, otherSocketId);
      console.log(otherNick, otherPeerId, otherSocketId);
      setCount(cnt=>cnt+1);
      peers[otherNick] = new Peer();
      const call = peers[otherNick].call(otherPeerId, myStream);
      console.log(`I sent a call to ${otherNick}`)
      call.on('stream', (remoteStream)=>{
        addVideoStream(ref[count].current, remoteStream)
      })
      setPeople((names)=>{
        const newNames = {...names, [count]: otherNick};
        return newNames
      })
    })
    socket.on('metoo', (otherNick)=>{
      console.log(`I got metoo from ${otherNick}`);
      
    });
  }, [])

  

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

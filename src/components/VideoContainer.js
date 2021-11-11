import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';
import io from 'socket.io-client';
import { useContext } from 'react';
import { Context } from '../reducers';

const serverDomain = process.env.REACT_APP_IO || 'http://localhost:3001';
const socket = io(serverDomain);

//components
const TheVideo = ({theVideo})=>{
  return <video ref={theVideo} autoPlay playsInline width="100%" height="auto" overflow="hidden"></video>
}

//Exfault Component
function VideoContainer({className}) {
  const myVideo = useRef();
  const [{nickName, myStream}, dispatch] = useContext(Context);
  const getUserMedia = async (theVideo) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      theVideo.current.srcObject = stream;
      dispatch({type: 'stream', payload: stream})
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let peerConnections = {};
    getUserMedia(myVideo);
    socket.emit('welcome', nickName, console.log);
    //peer A
    socket.on('welcome', async (id, otherNick)=>{
      peerConnections[otherNick] = new RTCPeerConnection();
      makeConnection(otherNick);
      console.log(`${otherNick} entered our room, his socketID is ${id}`);
      const offer = await peerConnections[otherNick].createOffer();
      peerConnections[otherNick].setLocalDescription(offer);
      socket.emit('offer', offer, id, nickName);
      console.log(`sent the offer to ${otherNick}`);
    });
    socket.on('answer', (answer, id, otherNick)=>{
      peerConnections[otherNick].setRemoteDescription(answer);
      console.log(`received the answer from ${otherNick}`);
    })
    //peer B
    socket.on('offer', async (offer, id, otherNick)=>{
      console.log(`received thr offer from ${otherNick}`);
      peerConnections[otherNick] = new RTCPeerConnection();
      makeConnection(otherNick);
      peerConnections[otherNick].setRemoteDescription(offer);
      const answer = await peerConnections[otherNick].createAnswer();
      peerConnections[otherNick].setLocalDescription(answer);
      socket.emit('answer', answer, id, nickName);
      console.log(`sent the answer to ${otherNick}`);
    });
    //peer AB
    socket.on('ice', (ice, otherNick)=>{
      console.log(`received ice from ${otherNick}`);
      peerConnections[otherNick].addIceCandidate(ice);
    });
  
      //RTC functions
    function makeConnection(otherNick){
      console.log('makeconnectio before');
      peerConnections[otherNick].addEventListener('icecandidate', handleIce);
      console.log('make connection after');
      peerConnections[otherNick].addEventListener('addstream', handleAddStream);
    };
    function handleIce(data){
      console.log('before send ice');
      socket.emit('ice', data.candidate, nickName);
      console.log(`sent the ice`)
    };
    function handleAddStream(data){
      console.log(`got an stream event from my peer`);
      console.log(`peer stream is`, data.stream);
    }
    
  }, []);

  return (
    <StyledDiv className={className}>
      <MyVideoWrapper nick={nickName}><TheVideo theVideo={myVideo}/></MyVideoWrapper>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
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

import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';
import io from 'socket.io-client';
import { useContext } from 'react';
import { Context } from '../reducers';
import Peer from 'peerjs';

const serverDomain = process.env.REACT_APP_IO || 'http://localhost:3001';
const socket = io(serverDomain);

//components
const TheVideo = ({theVideo})=>{
  return <video ref={theVideo} autoPlay playsInline width="100%" height="auto" overflow="hidden"></video>
}

//Exfault Component
function VideoContainer({className}) {
  const myVideo = useRef();
  const otherVideo = useRef();
  let otherName;
  const [{nickName, myStream}, dispatch] = useContext(Context);
  const getMyMedia = async (theVideo)=> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true});
      theVideo.current.srcObject = stream;
      dispatch({type: 'stream', payload: stream});
    } catch (err) {
      console.log(err);
    }
  };
  const setMedia = (theVideo, stream) => {
    try {
      theVideo.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let peers = {};
    let connections = {};
    let calls = {};
    getMyMedia(myVideo);
    socket.emit('welcome', nickName, console.log);
    //peer A
    socket.on('welcome', (otherSocketId, otherNick)=>{
      peers[otherNick] = new Peer();
      peers[otherNick].on('open', (myPeerId)=>{
        console.log('My peer ID is: ' + myPeerId);
        socket.emit('niceToSeeYou', myPeerId, nickName, otherSocketId);
      })
    });
    socket.on('meToo', (otherPeerId, otherNick, otherSocketId)=>{
      connections[otherNick] = peers[otherNick].connect(otherPeerId);
      connections[otherNick].on('open', () => {
        connections[otherNick].send(`hi I'm ${nickName}`);
      });
      peers[otherNick].on('connection', (conn)=>{
        conn.on('data', (data)=>{console.log(data)});
      });
      peers[otherNick].on('call', (call) => {
        navigator.mediaDevices.getUserMedia({video: true}, (stream) => {
          call.answer(stream); // Answer the call with an A/V stream.
          call.on('stream', (remoteStream) => {
            // Show stream in some <video> element.
            try {
              otherName = otherNick;
              otherVideo.current.srcObject = remoteStream;
            } catch (err) {
              console.log(err);
            }
          });
        }, (err) => {
          console.error('Failed to get local stream', err);
        });
      });
    });
    //peer B
    socket.on('niceToSeeYou', (otherPeerId, otherNick, otherSocketId)=>{
      peers[otherNick] = new Peer();
      peers[otherNick].on('open', (myPeerId)=>{
        console.log('My peer ID is: ' + myPeerId);
        socket.emit('meToo', myPeerId, nickName, otherSocketId);
      });
      connections[otherNick] = peers[otherNick].connect(otherPeerId);
      peers[otherNick].on('connection', (conn)=>{
        conn.on('data', (data)=>{console.log(data)});
      });
      connections[otherNick].on('open', () => {
        connections[otherNick].send(`hi I'm ${nickName}`);
      });
      navigator.mediaDevices.getUserMedia({video: true}, (stream) => {
        const call = peers[otherNick].call('another-peers-id', stream);
        call.on('stream', (remoteStream) => {
          // Show stream in some <video> element.
          try {
            otherName = otherNick;
            otherVideo.current.srcObject = remoteStream;
          } catch (err) {
            console.log(err);
          }
        });
      }, (err) => {
        console.error('Failed to get local stream', err);
      });
    });
    
  }, []);

  return (
    <StyledDiv className={className}>
      <MyVideoWrapper nick={nickName}><TheVideo theVideo={myVideo}/></MyVideoWrapper>
      <MyVideoWrapper nick={otherName}><TheVideo theVideo={otherVideo}/></MyVideoWrapper>
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

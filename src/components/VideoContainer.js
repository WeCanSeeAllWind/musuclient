import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';
import io from 'socket.io-client';
import { useContext } from 'react';
import { Context } from '../reducers';
import Peer from 'peerjs';

const serverDomain = process.env.REACT_APP_IO || 'http://localhost:3001';

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
}

//Exfault Component
function VideoContainer({className}) {
  const [state, dispatch] = useContext(Context);
  const myNick = state.nickName;
  const myVideo = useRef();
  const otherVideo = useRef();
  let myStream;
  let myPeerId;
  let otherName;

  useEffect(() => {
    const socket = io(serverDomain);
    const peer = new Peer();

    navigator.mediaDevices.getUserMedia({video:true}).then((stream)=>{
      const streamId = stream.id;
      myStream = stream;
      addVideoStream(myVideo.current, stream);

      //peer
      peer.on('open', (id)=>{
        myPeerId = id;
        socket.emit('GoodMorning', myNick, myPeerId, streamId);
      });
      socket.on('GoodMorning', (otherNick, otherPeerId, otherStreamId)=>{
        const mediaConnection = peer.call(otherPeerId, stream);
        otherName = otherNick
        mediaConnection.on("stream", (otherStream)=>{
          addVideoStream(otherVideo.current, otherStream);
        })

      })
      peer.on('call', (mediaConnection)=>{
        mediaConnection.answer(stream);
        
        mediaConnection.on("stream", (otherStream)=>{
          addVideoStream(otherVideo.current, otherStream);
        });
      });
    })




    return () => {
      
    }
  }, [])
  

  return (
    <StyledDiv className={className}>
      <MyVideoWrapper nick={myNick}><video ref={myVideo} autoPlay playsInline/></MyVideoWrapper>
      <MyVideoWrapper nick={otherName}><video ref={otherVideo} autoPlay playsInline/></MyVideoWrapper>
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

import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';
import io from 'socket.io-client';
import { useContext } from 'react';
import { Context } from '../reducers';
import Peer from 'peerjs';

const serverDomain = process.env.REACT_APP_IO || 'http://localhost:3001';
const socket = io(serverDomain, { transports: ['websocket', 'webRTC'] });

//Exfault Component
function VideoContainer({className}) {
  const myVideo = useRef();
  
  const [state, dispatch] = useContext(Context);
  const myNick = state.nickName;
  const [people, setPeople] = useState([]);
  const ref = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const stlyeldDiv = useRef();
  const [count, setCount] = useState(0);
  console.log(`Its my new render count : ${count}`);

  const [peers, setPeers] = useState({});
  let myStream;

  useEffect(() => {
    peers[count] = new Peer();
    let peerName = null;
    navigator.mediaDevices.getUserMedia({video: true}).then((stream)=>{
      myStream = stream
      let myPeerId;
      addVideoStream(myVideo.current, myStream);
      peers[count].on('open', (id)=>{
        myPeerId = id;
        socket.emit('ImHere', myNick, myPeerId);
      })
      socket.on('ImHere', (otherNick, otherPeerId, otherSocketId)=>{
        console.log(`I got ImHere form ${otherNick}`);
        const call = peers[count].call(otherPeerId, stream);
        console.log('내가 콜 보냈다')
        call.on('stream', (otherStream)=>{
          console.log('내가 콜 보낸 사람인데 스트림 받았어')
          setCount(cnt=>cnt+1)
          setPeople((names)=>{
            const newNames = [...names, otherNick]
            return newNames
          })
          const newDiv = document.createElement('div');
          const newVideo = document.createElement('video');
          addVideoStream(newVideo, otherStream);
          newDiv.append(newVideo);
          addVideoWrapper(newDiv, otherNick);
          stlyeldDiv.current.append(newDiv);
        })
        socket.emit('myName', myNick, otherSocketId);
      })
      socket.on('otherName', (otherNick)=>{
        peerName = otherNick
      })
      peers[count].on('call', (call)=>{
        console.log('I got call')
        call.answer(stream);
        console.log('I answered the call')
        call.on('stream', (otherStream)=>{
          console.log('I got stream')
          const newDiv = document.createElement('div');
          const newVideo = document.createElement('video');
          addVideoStream(newVideo, otherStream);
          newDiv.append(newVideo);
          addVideoWrapper(newDiv, peerName);
          stlyeldDiv.current.append(newDiv);
        })
      })
    });
    return ()=>{}
  }, [])

  
  return (
    <StyledDiv className={className} ref={stlyeldDiv}>
      <MyVideoWrapper nick={myNick}><video ref={myVideo}/></MyVideoWrapper>
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

function addVideoStream(video, stream) {
  video.setAttribute("autoPlay", "playsInline");
  video.style.width = '100%';
  video.style.height = 'auto';
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
}

function addVideoWrapper(videoWrapper, nick) {
  const nickBar = document.createElement('div');
  const imgWrapper = document.createElement('div');
  const icon = document.createElement('img');
  const pTag = document.createElement('p');
  pTag.innerHTML = nick;
  icon.src = "/images/micon.png";
  icon.style.width = "20px";
  icon.style.height = "20px";
  imgWrapper.append(icon);
  nickBar.append(imgWrapper);
  nickBar.append(pTag);
  pTag.style.margin = "0 0 0 10px";
  pTag.style.padding = "6px";
  pTag.style.font = "14px bold";
  pTag.style.color = "#ffffff";
  pTag.style.height = "32px";
  pTag.style.boxSizing = "border-box";
  imgWrapper.style.cursor = "pointer";
  imgWrapper.style.boxSizing = "border-box";
  imgWrapper.style.backgroundColor = "rgb(249 250 252)";
  imgWrapper.style.width = "32px";
  imgWrapper.style.height = "32px";
  imgWrapper.style.padding = "6px";
  imgWrapper.style.borderRadius = "4px";
  nickBar.style.margin = 0;
  nickBar.style.padding = "4px";
  nickBar.style.paddingLeft = "7px";
  nickBar.style.display = "flex";
  nickBar.style.boxSizing = "border-box";
  nickBar.style.position = "absolute";
  nickBar.style.width = "100%";
  nickBar.style.height = "40px";
  nickBar.style.bottom = 0;
  nickBar.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  videoWrapper.style.border = "1px solid #464659";
  videoWrapper.style.width = "100%";
  videoWrapper.style.maxHeight = "100%";
  videoWrapper.style.position = "relative";
  videoWrapper.style.display = "flex";
  videoWrapper.style.alignItems = "center";
  videoWrapper.style.justifyContent = "center";
  videoWrapper.style.flexDirection = "column";
  videoWrapper.style.overflow = "hidden";
  videoWrapper.style.boxSizing = "border-box";
  videoWrapper.style.objectFit = "fill";
  videoWrapper.style.borderRadius = "10px";

  videoWrapper.append(nickBar);
}

// function setNick(nick){
//   const hero = document.querySelector()
// }
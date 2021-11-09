import React, { useEffect, useRef } from 'react';
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';

//components
const TheVideo = ({theVideo})=>{
  return <video ref={theVideo} autoPlay playsInline width="100%" height="auto" overFlow="hidden" objectFit="contain"></video>
}

//functions
const getUserMedia = async (theVideo) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({video: true});
    theVideo.current.srcObject = stream;
  } catch (err) {
    console.log(err);
  }
};

//Exfault Component
function VideoContainer({className}) {
  const myVideo = useRef();
  useEffect(() => {
    getUserMedia(myVideo);
  }, []);
  return (
    <StyledDiv className={className}>
      <MyVideoWrapper><TheVideo theVideo={myVideo}/></MyVideoWrapper>
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

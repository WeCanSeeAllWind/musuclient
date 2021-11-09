import React from 'react'
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';
import SideVideoWrapper from './SideVideoWrapper';

function VideoContainer({className}) {
  return (
    <StyledDiv className={className}>
      <HighLight>
        <MyVideoWrapper/>
      </HighLight>
      <SideBar>
        <SideVideoWrapper/>
        <SideVideoWrapper/>
        <SideVideoWrapper/>
      </SideBar>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: #22222c;
  display: grid;
  grid-template-columns: 0.8fr 0.2fr;
  box-sizing: border-box;
  height: 100%;
`;
const HighLight = styled.div`
  width: 80vw;
  display: flex;
  height: 100%;
  justify-content: center;
  box-sizing: border-box;
  max-height: 100%;
`;
const SideBar = styled.div`
  width: 20vw;
  box-sizing: border-box;
  max-height: 100%;
`;

export default VideoContainer

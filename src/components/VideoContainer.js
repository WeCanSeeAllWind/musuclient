import React from 'react'
import styled from "styled-components";
import StyledVideoWrapper from './StyledVideoWrapper';

function VideoContainer({className}) {
  return (
    <StyledDiv className={className}>
      <HighLight>
        <StyledVideoWrapper/>
      </HighLight>
      <SideBar>
        <StyledVideoWrapper/>
        <StyledVideoWrapper/>
        <StyledVideoWrapper/>
        <StyledVideoWrapper/>
        <StyledVideoWrapper/>
      </SideBar>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: #22222c;
  display: grid;
  grid-template-columns: 0.8fr 0.2fr;
`;
const HighLight = styled.div`
  display: flex;
  justify-content: center;
`;
const SideBar = styled.div``;

export default VideoContainer

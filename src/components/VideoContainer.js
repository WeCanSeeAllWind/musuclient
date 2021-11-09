import React from 'react'
import styled from "styled-components";
import MyVideoWrapper from './MyVideoWrapper';
import SideVideoWrapper from './SideVideoWrapper';

function VideoContainer({className}) {
  return (
    <StyledDiv className={className}>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
      <MyVideoWrapper/>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: #22222c;
  display: grid;
  -ms-grid-column-align: center;
  -ms-grid-row-align: center;
  grid-template-rows: 0.5fr 0.5fr;
  grid-template-columns: 0.333333333fr 0.333333333fr 0.333333333fr;
  grid-gap: 10px;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
`;

export default VideoContainer

import React from 'react'
import styled from "styled-components";

function StyledVideoWrapper() {
  return (
    <StyledDiv>
      <StyledVideo autoplay playsinline/>
      <NickBar>
        <div><img src="/images/micon.png" width="20px" height="20px"/></div>
        <p>이루시</p>
      </NickBar>
    </StyledDiv>
  )
};

const StyledDiv = styled.div`
  border-bottom: 1px solid #464659;
  border-right: 1px solid #464659;
  width: 100%;
  position: relative;
`;
const StyledVideo = styled.video`
  overflow: hidden;
`;
const NickBar = styled.div`
  margin: 0;
  padding: 4px;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  div {
    cursor: pointer;
    box-sizing: border-box;
    padding: 6px;
    background-color: rgb(249 250 252);
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }
  p {
    margin: 0 0 0 10px;
    padding: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    height: 32px;
    box-sizing: border-box;
  }
`;

export default StyledVideoWrapper

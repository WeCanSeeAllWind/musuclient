import React, {useRef, useEffect} from 'react'
import styled from "styled-components";

function MyVideoWrapper({nick, children}) {

  return (
    <StyledDiv>
      {children}
      <NickBar>
        <div><img src="/images/micon.png" width="20px" height="20px" alt="hi"/></div>
        <p>{nick}</p>
      </NickBar>
    </StyledDiv>
  )
};

const StyledDiv = styled.div`
  border: 1px solid #464659;
  width: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  object-fit: fill;
  border-radius: 10px;
`;
const NickBar = styled.div`
  margin: 0;
  padding: 4px;
  padding-left: 7px;
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

export default MyVideoWrapper

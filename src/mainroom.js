// mumu 파트
import React from 'react'
import Footer from './components/Footer'
import Nav from './components/Nav'
import VideoContainer from './components/VideoContainer'
import styled from 'styled-components';


export default function Mainroom() {
  return (
    <StyledMainDiv>
      <Nav className="nav"/>
      <VideoContainer className="videoContainer"/>
      <Footer className="footer"/>
    </StyledMainDiv>
  )
};

const StyledMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  .nav {
    height: 64px;
  }
  .videoContainer {
    height: 100%;
  }
  .footer {
    margin-top: auto;
    height: 72px;
  };
`;
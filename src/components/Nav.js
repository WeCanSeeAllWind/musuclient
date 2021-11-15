import React from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";

function Nav({className}) {
  const history = useHistory()
  function handleClick(e){
    e.preventDefault();
    history.push('/');
  }
  return (
    <StyledDiv className={className}>
      <StyledImage src="/images/elice.png" width="175.625px" height="40px" onClick={handleClick}/>
      <StyledLetter><p>온라인 교실</p></StyledLetter>
      <StyledIcon>
        <img src="/images/user.png" width="30px" height="30px" alt="hi"/>
        <span></span>
      </StyledIcon>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  background-color: #ffffff;
  display: flex;
  padding: 12px;
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  margin-right: 10px;
  cursor: pointer;
`;
const StyledLetter = styled.div`
  font-size: 20px;
  color: #222222;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledIcon = styled.div`
  margin-left: auto;
  margin-right: 40px;
  padding: 5px;
  position: relative;
  span {
    position: absolute;
    display: inline-block;
    margin-left: 5px;
    top: 20px;
    width: 0; 
    height: 0; 
    border-style: solid; 
    border-width: 5px;
    border-color: #222222 transparent transparent transparent;
  }
`;
export default Nav

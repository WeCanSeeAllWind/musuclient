import React from 'react'
import styled from "styled-components";


function Footer({className}) {
  return (
    <StyledDiv className={className}>
      <StyledLeftArrow><div></div></StyledLeftArrow>
      <StyledNums>1 / 1</StyledNums>
      <StyledRightArrow><div></div></StyledRightArrow>
      <StyledLayoutBtn><img src="/images/layout.png" width="18px" height="18px"/></StyledLayoutBtn>
      <StyledFullscreenBtn><img src="/images/expand.png" width="18px" height="18px"/></StyledFullscreenBtn>
      <StyledSettingBtn><img src="/images/settings.png" width="18px" height="18px"/></StyledSettingBtn>
      <StyledChatIcon><img src="/images/computer.png"/></StyledChatIcon>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  position: relative;
  background-color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
`;

const StyledLeftArrow = styled.div`
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  background-color: #23232d;
  padding: 15px;
  box-sizing: border-box;
  div {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-left: 2px solid #737375;
    border-bottom: 2px solid #737375;
    transform: rotate(45deg);
  }
`;
const StyledNums = styled.div`
  height: 40px;
  background-color: #464659;
  color: white;
  text-align: center;
  padding: 8px;
  box-sizing: border-box;
`;
const StyledRightArrow = styled.div`
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  background-color: #23232d;
  padding: 15px;
  box-sizing: border-box;
  div {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-top: 2px solid #737375;
    border-right: 2px solid #737375;
    transform: rotate(45deg);
  }
`;
const StyledLayoutBtn = styled.div`
  cursor: pointer;
  padding: 11px;
  box-sizing: border-box;
  margin-left: 10px;
  height: 40px;
  width: 40px;
  background-color: #464659;
  border-radius: 4px;
`;
const StyledFullscreenBtn = styled.div`
  cursor: pointer;
  padding: 11px;
  box-sizing: border-box;
  margin-left: 10px;
  height: 40px;
  width: 40px;
  background-color: #464659;
  border-radius: 4px;
`;
const StyledSettingBtn = styled.div`
  cursor: pointer;
  padding: 11px;
  box-sizing: border-box;
  margin-left: 10px;
  height: 40px;
  width: 40px;
  background-color: #464659;
  border-radius: 4px;
`;
const StyledChatIcon = styled.div`
  cursor: pointer;
  position: absolute;
  padding: 15px;
  box-sizing: border-box;
  width: 62px;
  height: 62px;
  border-radius: 30px;
  bottom: 15px;
  right: 15px;
  background-color: hsl(241deg 34% 47%);
`;
export default Footer

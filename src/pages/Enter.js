// 승수님 이 부분 작성해 주셔요
import React, { useRef, useEffect} from 'react'
import styled from "styled-components"
import { useHistory } from "react-router-dom";
import { useContext} from 'react/cjs/react.development';
import { Context } from '../reducers';
// import io from 'socket.io-client';

// const serverDomain = process.env.REACT_APP_IO || 'http://localhost:3001';
// const socket = io(serverDomain);
// socket.emit('hello', "hahahah");



export default function Enter() {
  const history = useHistory();
  const [, dispatch] = useContext(Context);
  const nickInput = useRef();
  const myVideo = useRef();
  let mystream
  useEffect(() => {
    async function getMedia() {
      try {
        mystream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        myVideo.current.srcObject = mystream
        /* use the stream */
      } catch(err) {
        /* handle the error */
      }
    }
    getMedia();
    return () => {}
  }, [])
  

  const handleClick = (e)=>{
    e.preventDefault();
    if(nickInput.current.value !== ""){
    dispatch({type: "nickName", payload: nickInput.current.value})
    // socket.emit('hello', "loooool", console.log);
    history.push('/main');
    }
    else{
      alert("닉네임을 입력해주세요!")
    }
  }
  const handleClose = (e)=>{
    e.preventDefault();
    window.open('','_self').close();
  }

  return (
    <Container>
      <EnterForm>
        <Upperbar>입장하기</Upperbar>
        <Content>
          <Testview>
            <Roommark>강의실</Roommark>
            <Roomname>Elice Clone 강의실</Roomname>
            <Myvideo autoPlay playsInline ref={myVideo} />
          </Testview>
          <Selectpart>
            <Tag>비디오 입력 장치</Tag>
            <Select>
              <option>
                카메라 리스트
              </option>
            </Select>
            <Tag>오디오 입력 장치</Tag>
            <Select>
              <option>
                  오디오 리스트
              </option>
            </Select>
            <Tag>닉네임</Tag>
            <Name type="text" ref={nickInput} required placeholder="사용할 닉네임을 입력해주세요."/>            
            <Text>저사양 환경에서는 낮은 해상도 사용을 권장합니다. 화질을 지나치게 높이면 네트워크 문제가 발생하여 끊김이 발생할 수 있습니다.</Text>
            <Link><a href="https://www.notion.so/FAQ-d1b72b8acef94a4c9e6aed9d2bbe4a74" target="_blank">원하는 장치를 찾지 못하셨나요?</a></Link>
          </Selectpart>
        </Content>
        <Buttons>
          <Button1 onClick={handleClick}>입장하기</Button1>
          <Button2 onClick={handleClose}>취소</Button2>
        </Buttons>
      </EnterForm>
    </Container>
  )
}


// css
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
`
const EnterForm = styled.div`
  height: 530px;
  width: 800px;
  border: 1px solid #f0f1f3;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px 0px 10px 0px;
  position: relative;
  display: flex;
  flex-direction: column;
`
const Upperbar = styled.div`
  width: 100%;
  height: 40px;
  padding: 5px 10px 15px 30px;
  font-size: 25px;
  font-weight: bold;
`
const Content = styled.div`
  width: 100%;
  height: 388px;
  background-color: #F0F1F3;
  display: flex;
  flex-direction: row;
`
// 왼쪽 구역
const Testview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 300px;
  height: 340px;
  background-color: #E1E2E4;
  margin: 20px 15px 20px 15px;
  border-radius: 12px;
`
const Roommark = styled.div`
  width: 50px;
  height: 20px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  background-color: #524FA1;
  margin: 35px 0px 5px 0px;
`
const Roomname = styled.h4`
  margin: 0;
`
const Myvideo = styled.video`
  width: 240px;
  height: 170px;
  margin: 60px 15px 20px 15px;
`
// 오른쪽 구역
const Selectpart = styled.div`
  display: inline;
  width: 420px;
  display: flex;
  flex-direction: column;
  padding: 20px 30px 20px 20px; 
`
const Tag = styled.div`
  witdh: 100%;
  display: flex;
  font-size: 12px;
  flex-direction: column;
  margin-bottom: 10px;
`
const Select = styled.select`
  width: 420px;
  height: 40px;
  background: white;
  padding-left: 10px;
  font-size: 14px;
  border: none;
  margin-bottom: 20px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`
const Name = styled.input`
  width: 400px;
  height: 30px;
  font-size: 14px;
  margin: 0px;
  padding-left: 10px;
`
const Text = styled.p`
  font-size: 12px;
  color: grey;
`
const Link = styled.span`
  font-size: 13px;
  position: absolute;
  bottom: 100px;
`
//화면하단
const Buttons = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  padding-left: 20px;
`
const Button1 = styled.button`
  width: 85px;
  height: 40px;
  background-color: #524FA1;
  color: white;
  position: relative;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`
const Button2 = styled.button`
  width: 60px;
  height: 40px;
  background-color: white;
  color: #646464;
  position: relative;
  border-radius: 5px;
  margin: 5px 5px 5px 5px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`
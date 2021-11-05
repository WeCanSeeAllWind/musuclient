// 승수님 이 부분 작성해 주셔요
import React from 'react'
import styled from "styled-components"



const Container = styled.div`
  height: 531px;
  width: 800px;
  left: 0px;
  top: 0px;
  background-color: white;
  border: 1px solid #f0f1f3;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 28px 24px 20px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
`
const Upperbar = styled.div`
  width: 100%;
  height: 30px;
  padding: 10px;
  border-bottom: solid;
`
const Content = styled.div`
  width: 100%;
  height: 400px;
  background-color: pink;
  display: flex;
  flex-direction: row;
`
const Testview = styled.div`
  display: inline;
  width: 300px;
  height: 300px;
  background-color: lightgray;
  display: flex;
  margin: 20px 15px 20px 15px;
  flex-direction: column;
  text-align: center;
`
const Cam = styled.video`
  width: 250px;
  margin: 20px 15px 20px 15px;
`
const Selectpart = styled.div`
  display: inline;
  width: 350px;
  background-color: yellow;
  display: flex;
  margin: 20px 15px 20px 0px;
  flex-direction: column;
  padding: 28px 24px 20px 24px; 
`
const Selector = styled.div`
  witdh: 100%;
  display: flex;
  flex-direction: column;
  margin: 5px 5px 5px 5px;
`
const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`
const Text = styled.p`
  font-size: 8px;
`
const Buttons = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
`
const Button1 = styled.button`
  width: 100px;
  background-color: navy;
  color: white;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  margin: 5px 5px 5px 5px;
`
const Button2 = styled.button`
  width: 100px;
  padding: 20px;
  position: relative;
  box-sizing: border-box;
  margin: 5px 5px 5px 5px;
`

export default function Enter() {
  return (
    <Container>
      <Upperbar>
        입장하기
      </Upperbar>
      <Content>
        <Testview>
          <p>강의실</p>
          <p>11/4 (목) 이론 강의실</p>
        
        </Testview>
        <Selectpart>
          
          <Selector>
            비디오 입력 장치
            <Select>
              <option>
                카메라 리스트
              </option>
            </Select>
          </Selector>
          <Selector>
            오디오 입력 장치
            <Select>
              <option>
                  오디오 리스트
              </option>
            </Select>
          </Selector>
          <Selector>
            송출 화면 해상도
            <Select>
              <option>
                표준 화질 (화면 720p, 웹캠 320p)
              </option>
            </Select>
            
          </Selector>
          <Text>저사양 환경에서는 낮은 해상도 사용을 권장합니다. 화질을 지나치게 높이면 네트워크 문제가 발생하여 끊김이 발생할 수 있습니다.</Text>
          <span>원하는 장치를 찾지 못하셨나요?</span>
        </Selectpart>
      </Content>
      <Buttons>
            <Button1>
              입장하기
            </Button1>
            <Button2>
              취소
            </Button2>
          </Buttons>
    </Container>
  )
}

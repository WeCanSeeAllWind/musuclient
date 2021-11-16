import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import io from 'socket.io-client';
import { useContext } from 'react';
import { Context } from '../reducers';
import Peer from 'peerjs';

export default function ChatRoom(){
    
    return (
        <Container>
            <Upperbar>Elice Clone 강의실</Upperbar>
            <HideButton></HideButton>
            <InnerBar></InnerBar>
            <Chat></Chat>
            {/* <List></List> */}
            <TextInput placeholder="Please enter message."></TextInput>
        </Container>
    )

}

const Container = styled.div`
    width: 380px;
    height: 670px;
    box-sizing: border-box;
    border-radius: 15px;
    margin-bottom: 0px;
    margin-right: 0px;
    background-color: grey;
`
const Upperbar = styled.div`
    width: 100%;
    height: 58px;
    box-sizing: border-box;
    border-radius: 15px 15px 0px 0px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #524FA1;
    padding: 20px 30px 20px 25px;
`
const HideButton = styled.div`
`
const InnerBar = styled.div`
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    background-color: white;
`
const Chat = styled.div`
    width: 100%;
    height: 360px;
    box-sizing: border-box;
    background-color: lightgray;
`

const List = styled.div`
    width: 100%;
    height: 360px;
    box-sizing: border-box;
    background-color: pink;
`
const TextInput = styled.input`
    width: 100%;
    height: 125px;
    box-sizing: border-box;
    background-color: black;
    padding: 15px;
    color: lightgray;
    font-size: 17px;
`
import { createContext } from "react";

export const Context = createContext();

export const initialState = {
  nickName: "elice",
  myStream: null,
  freinds: [],
  peerConnections: {},
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'nickName':{
      return {
        ...state,
        nickName: action.payload
      }}
    case 'stream':{
      return {
        ...state,
        myStream: action.payload
      }}
    case 'freinds':{
      return{
        ...state,
        freinds: [...state.freinds, action.payload]
      }}
    case 'peer':{
      const userNick = action.payload;
      const connection = new RTCPeerConnection();
      return{
        ...state,
        peerConnections: {...state.peerConnections, [userNick]: connection}
      }}
    default:
      return state;
  }
}
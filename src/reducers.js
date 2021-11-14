import { createContext } from "react";

export const Context = createContext();

export const initialState = {
  nickName: "elice"
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'nickName':{
      return {
        ...state,
        nickName: action.payload
      }}
    default:
      return state;
  }
}
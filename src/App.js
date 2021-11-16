import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Enter from "./pages/Enter.js";
import Mainroom from "./mainroom.js";
import Test from "./pages/Test.js";
import {Context, reducer, initialState} from './reducers';
import { useReducer } from "react";
import ChatRoom from "./components/ChatRoom.js";

export default function App() {

  return (
    <Context.Provider value={useReducer(reducer, initialState)}>
      <Router>
          <Switch>
            <Route exact path="/test">
              <Test />
            </Route>
            <Route exact path="/main">
              <Mainroom />
            </Route>
            <Route exact path="/">
              <Enter />
            </Route>
            <Route exact path="/chat">
              <ChatRoom />
            </Route>
          </Switch>
      </Router>
    </Context.Provider>
  );
}




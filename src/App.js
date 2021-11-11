import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Enter from "./pages/Enter";
import Mainroom from "./pages/Mainroom";
import Test from "./pages/Test";
import {Context, reducer, initialState} from './reducers';
import { useReducer } from "react";

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
          </Switch>
      </Router>
    </Context.Provider>
  );
}




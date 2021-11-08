import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Enter from "./pages/Enter";
import Mainroom from "./pages/Mainroom";
import Test from "./pages/Test";

export default function App() {
  return (
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
  );
}




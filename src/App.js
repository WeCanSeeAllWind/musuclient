import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Enter from "./pages/Enter";
import MainRoom from "./pages/MainRoom";
import Test from "./pages/Test";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Test />
          </Route>
          <Route path="/enter">
            <Enter />
          </Route>
          <Route path="/main">
            <MainRoom />
          </Route>
        </Switch>
    </Router>
  );
}




import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoginComponent from "./login.component"

function App() {
  return (<Router>
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={LoginComponent} />
            <Route path="/sign-in" component={LoginComponent} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;

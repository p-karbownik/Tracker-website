import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from "./login.component"
import RegisterComponent from "./register.component"
import Dashboard from "./dashboard.component"
import NewWebsite from "./new-website.component"

function App() {
  return (<Router>
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={LoginComponent} />
            <Route path="/register" component={RegisterComponent} />
            <Route path="/login" component={LoginComponent} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/newWebsite" component={NewWebsite} />
            <Route path="/websitePage" component={NewWebsite} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from "./login.component"
import RegisterComponent from "./register.component"
import Dashboard from "./website-dashboard.component"
import MainPage from "./main-page.component"
import NewWebsite from "./new-website.component"
import React from "react";


function App() {
  return (<Router>
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path="/register" component={RegisterComponent} />
            <Route path="/login" component={LoginComponent} />
            <Redirect from='/login' to="/mainPage" />
            <Route path="/mainPage" component={MainPage} />
            <Route path="/newWebsite" component={NewWebsite} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;

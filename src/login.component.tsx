import './index.css';
import './login.component.css'
import { Link } from "react-router-dom";
import { Component } from "react";

export default class LoginComponent extends Component {
    render() {
        return (
            <form action = "dashboard">
                <h3>Log in</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" required />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block" >Log in </button>
                <h4><br /> or</h4>
                <Link to="/register" className="btn btn-dark btn-lg btn-block" >Register</Link>
            </form>
        );
    }
}


import './index.css';
import { Component } from "react";
export default class RegisterComponent extends Component {
    render() {
        return (
            <form action = "/login">
                <h3>Register</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" id="registerName" className="form-control" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" id="registerSurname" className="form-control" placeholder="Enter surname" required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" id="registerEmail" className="form-control" placeholder="Enter surname" required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="registerPassword" className="form-control" placeholder="Enter password" required />
                </div>
                <div className="form-group">
                    <label>Confirm password</label>
                    <input type="password" id="registerConfirmPassword" className="form-control" placeholder="Confirm password" required />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block" >Register </button>
            </form>

        );
    }
}
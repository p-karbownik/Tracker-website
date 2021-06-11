import './form.css';
import React, { Component } from "react";
import {PasswordData, saltHashPassword} from "./password_handling"
import { Link } from 'react-router-dom';
import { sendEvent } from "./Event"
import {setEventTrackingEnabled} from "./Tracker"


type State = {
    username: string;
    password: string;
    confirm_password: string;
    salt: string;
    error?: string;
    success: boolean;
};

let initialState: State = {
    username: '',
    password: '',
    confirm_password: '',
    salt: '',
    error: '',
    success: false,
}

type Action = 
      { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string}
    | { type: 'setConfirmPassword', payload: string}
    | { type: 'registerSuccess', payload: string }
    | { type: 'registerFailure', payload: string }
    | { type: 'setPasswordMatch', payload: boolean }; 

  function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setUsername': 
            return {
                ...state,
                username: action.payload,
                error: ''
            };
        case 'setPassword': 
            return {
                ...state,
                password: action.payload,
            };
        case 'setConfirmPassword': 
            return {
                ...state,
                confirm_password: action.payload
            };
        case 'registerSuccess':    
            return {
                ...state,
                error: '',
                success: true
            };
        case 'registerFailure':    
            return {
                ...state,
                success: false,
                error: action.payload
            };
        case 'setPasswordMatch': 
            return {
                ...state,
                error: action.payload === true ? '' : "Passwords do not match",
            };
    }
  }


export default class RegisterComponent extends Component {
    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(this.state, action));
    }

    handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setUsername',
            payload: event.target.value
        });
    };

    handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setPassword',
            payload: event.target.value
        });
    };

    handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setConfirmPassword',
            payload: event.target.value
        });
    }

    handleRegister = (event: React.FormEvent) => {
        event.preventDefault()
        if (this.state.password !== this.state.confirm_password) {
            this.dispatch({
                type: 'setPasswordMatch',
                payload: false
            });
            event.preventDefault();
            return;
        }

        let passwordData: PasswordData = saltHashPassword(this.state.password);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  username: this.state.username, 
                                    password: passwordData.passwordHash, 
                                    salt: passwordData.salt})
        }
        fetch('http://localhost:8080/users/register', requestOptions)
            .then(res => {
                setEventTrackingEnabled();
                sendEvent('d97395ce-cd43-4235-b5c5-4d8e3689287c', this.state.username, 'register');
                if(!res.ok) {
                    this.dispatch({
                        type: 'registerFailure',
                        payload: 'A user with this email already exists'
                    })
                    return Promise.reject('error code: ' + res.status);
                } else {
                    this.dispatch({
                        type: 'registerSuccess',
                        payload: ''
                    })
                    return res.json()
                }
            })
    }

    render() {
        return (
            <form className = "formClass" action = "/" onSubmit={this.handleRegister}>
                <h3>Register</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                    type="email" 
                    id="registerEmail" 
                    className="form-control" 
                    placeholder="Enter email" 
                    onChange={this.handleUsernameInput}
                    required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                    type="password" 
                    id="registerPassword" 
                    className="form-control" 
                    placeholder="Enter password" 
                    onChange={this.handlePasswordInput}
                    required />
                </div>
                <div className="form-group">
                    <label>Confirm password</label>
                    <input 
                    type="password" 
                    id="registerConfirmPassword" 
                    className="form-control" 
                    placeholder="Confirm password" 
                    onChange={this.handleConfirmPassword}
                    required />
                </div>
                <div className="form-group">
                    <label style={{color: 'red'}}>
                        {this.state.error}
                    </label>
                </div>
                <button 
                type="submit" 
                className="btn btn-dark btn-lg btn-block" >
                    Register 
                </button>
                <div>
                <hr/>
                <label style={{color: 'green'}}>
                    {this.state.success  ? "Registration success. Return to login page" : ""}
                </label>
                </div>
                <div>
                    <Link to="./login"> <button className="btn btn-dark btn-lg btn-block" >Return</button> </Link>
                </div>
            </form>
        );
    }
}
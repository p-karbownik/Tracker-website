import './form.css';
import React, { Component } from "react";
import {PasswordData, saltHashPassword, sha512} from "./password_handling"


type State = {
    name: string,
    login: string;
    password: string;
    confirm_password: string;
    salt: string;
    error?: string;
    success: boolean;
};

let initialState: State = {
    name: '',
    login: '',
    password: '',
    confirm_password: '',
    salt: '',
    error: '',
    success: false,
}

type User = {
    id: string;
    login: string;
    password: string;
    salt: string;
}

type Action = 
      { type: 'setName', payload: string}
    | { type: 'setLogin', payload: string }
    | { type: 'setPassword', payload: string}
    | { type: 'setConfirmPassword', payload: string}
    | { type: 'registerSuccess', payload: string }
    | { type: 'registerFailure', payload: string }
    | { type: 'setPasswordMatch', payload: boolean }; 

  function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setName': 
            return {
                ...state,
                name: action.payload,
                error: ''
            };
        case 'setLogin': 
            return {
                ...state,
                login: action.payload,
                error: ''
            };
        case 'setPassword': 
            return {
                ...state,
                password: action.payload,
                // salt: action.payload.salt
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
                success: false
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

    handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setName',
            payload: event.target.value
        });
    };

    handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setLogin',
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
        if (this.state.password != this.state.confirm_password) {
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
            body: JSON.stringify({  name: this.state.name, 
                                    login: this.state.login, 
                                    password: passwordData.passwordHash, 
                                    salt: passwordData.salt})
        }
        // const response = fetch();
        const response = {ok: true}
        if (response.ok) {
            this.dispatch({
                type: 'registerSuccess',
                payload: ''
            })
        } else {
            this.dispatch({
                type: 'registerFailure',
                payload: 'Registration failed'
            })
            event.preventDefault()
        }
    }

    render() {
        return (
            <form className = "formClass" action = "/" onSubmit={this.handleRegister}>
                <h3>Register</h3>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                    type="text" 
                    id="registerName" 
                    className="form-control" 
                    placeholder="Enter name" 
                    onChange={this.handleNameInput}
                    required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                    type="email" 
                    id="registerEmail" 
                    className="form-control" 
                    placeholder="Enter surname" 
                    onChange={this.handleLoginInput}
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
                    <text style={{color: 'red'}}>
                        {this.state.error}
                    </text>
                </div>
                <button 
                type="submit" 
                className="btn btn-dark btn-lg btn-block" >
                    Register 
                </button>
            </form>

        );
    }
}
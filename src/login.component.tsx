import './form.css';
import './login.component.css'
import {saltHashPassword, PasswordData} from "./password_handling"
import { Link, Redirect } from "react-router-dom";
import React, { Component, useReducer} from "react";
import { truncateSync } from 'fs';
import { TextInputSubmitEditingEventData } from 'react-native';


type State = {
    login: string;
    password: string;
    salt: string;
    error?: string;
    success: boolean;
};

let initialState: State = {
    login: '',
    password: '',
    salt: '',
    error: '',
    success: false
}

type User = {
    login: string;
    password: string;
    salt: string;
}

type Action = { type: 'setLogin', payload: string }
  | { type: 'setPassword', payload: PasswordData}
  | { type: 'loginSuccess', payload: string }
  | { type: 'loginFailed', payload: string }
  | { type: 'setError', payload: string }; 

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'setLogin': 
        return {
          ...state,
          login: action.payload,
          error: ''
        };
      case 'setPassword': 
        return {
          ...state,
          password: action.payload.passwordHash,
          salt: action.payload.salt,
          error: ''
        };
      case 'loginSuccess':    
        return {
          ...state,
          error: '',
          success: true
        };
      case 'loginFailed': 
        return {
          ...state,
          error: action.payload
        };
      case 'setError': 
        return {
          ...state,
          error: action.payload
        };
    }
  }


export default class LoginComponent extends Component {

    state = initialState;

    dispatch(action: Action) {
        this.setState(state => reducer(initialState, action));
    }

    handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setLogin',
            payload: event.target.value
        });
    };

    handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        let passwordData: PasswordData = saltHashPassword(event.target.value);
        this.dispatch({
            type: 'setPassword',
            payload: passwordData
          });
    };

    handleLogin = async (event: React.FormEvent) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({login: this.state.login, password: this.state.password, salt: this.state.salt})
        }
        // const response = await fetch();
        const response = {ok: true}
        if (response.ok) {
            this.dispatch({
                type: 'loginSuccess',
                payload: ''
            })
        } else {
            this.dispatch({
                type: 'loginFailed',
                payload: 'Login failed'
            })
            event.preventDefault();
        }     
    };


    render() {
        return (
            <form className = "formClass" action="./mainPage" onSubmit={this.handleLogin} >
                <h3>Log in</h3>
                
                <div className="form-group">
                    <label>Email</label>

                    <input 
                    onChange={this.handleLoginInput} 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter email" 
                    required/>

                </div>
                <div className="form-group">

                    <label>Password</label>

                    <input
                    onChange={this.handlePasswordInput}
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password" 
                    required />

                </div>
                <div className="form-group">
                    <text style={{color: 'red'}}>
                        {this.state.error}
                    </text>
                </div>
                <div>
                <button 
                    type="submit"
                    className="btn btn-dark btn-lg btn-block" >
                        Log in 
                    </button>
                </div>
                    
                <h4><br /> <text>or</text></h4>

                <Link to="/register" 
                className="btn btn-dark btn-lg btn-block" >
                    Register
                </Link>

            </form>
        );
    }
}

import './form.css';
import './login.component.css'
import {saltHashPassword, PasswordData, sha512} from "./password_handling"
import { Link, Redirect } from "react-router-dom";
import React, { Component, useReducer} from "react";
import { truncateSync } from 'fs';
import { TextInputSubmitEditingEventData } from 'react-native';


type State = {
    login: string;
    password: string;
    error?: string;
    success: boolean;
};

let initialState: State = {
    login: '',
    password: '',
    error: '',
    success: false
}

type User = {
    id: string;
    login: string;
    password: string;
    salt: string;
}

type Action = { type: 'setLogin', payload: string }
  | { type: 'setPassword', payload: string}
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
          password: action.payload,
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
        this.dispatch({
            type: 'setPassword',
            payload: event.target.value
        });
    };

    handleLogin = async (event: React.FormEvent) => {
        const usernameRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({login: this.state.login})
        }
        // const response = await fetch();
        const username_response = {ok: true, data: {id: 1234, salt: "abcd1234"}};
        if (username_response.ok === false) {
            this.dispatch({
                type: 'loginFailed',
                payload: 'Invalid username'
            })
            event.preventDefault();
            return;
        } 

        let passwordData: PasswordData = sha512(this.state.password, username_response.data.salt);

        const passwordRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: username_response.data.id, password: passwordData.passwordHash})
        }

        const passwordResponse = {ok: false}

        if (passwordResponse.ok) {
            this.dispatch({
                type: 'loginSuccess',
                payload: ''
            })
        } else {
            this.dispatch({
                type: 'loginFailed',
                payload: 'Incorrect password'
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

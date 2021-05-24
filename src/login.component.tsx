import './form.css';
import './login.component.css'
import {PasswordData, sha512} from "./password_handling"
import { Link } from "react-router-dom";
import React, { Component, useReducer} from "react";


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
        this.setState(state => reducer(this.state, action));
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

    handleLogin = (event: React.FormEvent) => {
        const usernameRequestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({login: this.state.login})
        }
        // const response = fetch();
        const username_response = {ok: true, data: {id: "1", salt: "abcd1234"}};
        if (!username_response.ok) {
            this.dispatch({
                type: 'loginFailed',
                payload: 'Incorrect username'
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

        const passwordResponse = {ok: true}

        if (!passwordResponse.ok) {
            event.preventDefault();
            this.dispatch({
                type: 'loginFailed',
                payload: 'Incorrect password'
            })
        }    
        this.dispatch({
            type: 'loginSuccess',
            payload: ''
        })
        localStorage.setItem('user', username_response.data.id);
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

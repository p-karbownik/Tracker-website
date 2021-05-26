import './form.css';
import './login.component.css'
import {PasswordData, sha512} from "./password_handling"
import { Link, Redirect, useHistory, withRouter } from "react-router-dom";
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
        event.preventDefault();
        const usernameRequestOptions = {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({username: this.state.login})
        }
        fetch('http://localhost:8080/users/login/' + this.state.login, usernameRequestOptions)
            .then(username_response => {
                event.preventDefault();
                if (!username_response.ok) {
                    this.dispatch({
                        type: 'loginFailed',
                        payload: 'Incorrect username'
                    })
                    return Promise.reject('error code: ' + username_response.status);

                } else return username_response.text();
            })
            .then(salt => {
                let passwordData: PasswordData = sha512(this.state.password, salt);

                const passwordRequestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({username: this.state.login, password: passwordData.passwordHash})
                }
                
                fetch('http://localhost:8080/users/login', passwordRequestOptions)
                    .then(password_response => {
                        if (!password_response.ok) {
                            event.preventDefault();
                            this.dispatch({
                                type: 'loginFailed',
                                payload: 'Incorrect password'
                            })
                            return Promise.reject('error code: ' + password_response.status)

                        }  else return password_response.json();
                    })
                    .then (user_id => {
                        this.dispatch({
                            type: 'loginSuccess',
                            payload: ''
                        })
                        localStorage.setItem('user', user_id);
                    })
            })  
    };

    render() {
        return (
            <React.Fragment>
            {this.state.success ? 
                <Redirect to='/mainPage' /> :

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
                    type="button"
                    onClick={this.handleLogin}
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
}
            </React.Fragment>
            
        );
    }
}
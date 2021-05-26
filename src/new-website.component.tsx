import './form.css';
import { Component } from "react";
import Popup from './Popup'


type State = {
    name: string;
    url: string;
    token: string;
    error?: string;
    success: boolean;
    buttonPopup: boolean;
};

let initialState: State = {
    name: '',
    url: '',
    token: '',
    error: '',
    success: false,
    buttonPopup: false
}

const loggedUserId = localStorage.getItem("user");

type Action = { type: 'setName', payload: string }
    | { type: 'setUrl', payload: string }
    | { type: 'added', payload: string }
    | { type: 'failed', payload: string }
    | { type: 'setError', payload: string };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'setName':
            return {
                ...state,
                name: action.payload,
                error: ''
            };
        case 'setUrl':
            return {
                ...state,
                url: action.payload,
                error: ''
            };
        case 'added':
            return {
                ...state,
                error: '',
                token: action.payload,
                success: true
            };
        case 'failed':
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

export default class NewWebsiteComponent extends Component {
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

    handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.dispatch({
            type: 'setUrl',
            payload: event.target.value
        });
    };

    handleAddWebsite(e: any) {
        
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ website_name: this.state.name, url: this.state.url, user_id: loggedUserId})
        }
        
        fetch('http://localhost:8080/websites/addWebsite', requestOptions)
            .then(res => {
                if(!res.ok) return Promise.reject('error code: ' + res.status);
                else return res.json()
            })
            .then(response => {
                this.state.token = response.token;
                this.setState({buttonPopup: true});
            })
        
    };

    render() {
        return (
            <form className="formClass" >
                <h3>New website</h3>
                <div className="form-group">
                    <label>Website name</label>
                    <input onChange={this.handleNameInput.bind(this)} type="text" id="websiteName" className="form-control" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                    <label>Website address</label>
                    <input onChange={this.handleUrlInput} type="url" id="websiteURL" className="form-control" placeholder="Enter URL" required />
                </div>
                <button onClick={(e) => {this.handleAddWebsite(e)}}  type="submit" className="btn btn-dark btn-lg btn-block" > Add website </button>
                <Popup trigger={this.state.buttonPopup} token={this.state.token}></Popup>
            </form>
        );
    }
}

import React from 'react'
import './popup.css';
import { Link } from 'react-router-dom'

export default class Popup extends React.Component<any> {

    
    render(){
        return  (this.props.trigger) ? (
            <div className="popup">
                <div className="popup-inner">
                TOKEN: {this.props.token}
                    <button className="btn close-btn" onClick={() => this.props.setTrigger(false)}>Close</button>
                    <Link to="/mainPage" className="btn back-btn">Main Page</Link> 
                </div>
            </div>
        ) : "";
    } 

}
import './index.css';
import { Component } from "react";
export default class NewWebsiteComponent extends Component {
    render() {
        return (
            <form action = "/new-website">
                <h3>New website</h3>
                <div className="form-group">
                    <label>Website name</label>
                    <input type="text" id="websiteName" className="form-control" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                    <label>Website address</label>
                    <input type="url" id="websiteURL" className="form-control" placeholder="Enter URL" required />
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block" > Add website </button>
            </form>
        );
    }
}
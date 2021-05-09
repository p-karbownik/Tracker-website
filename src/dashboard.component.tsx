import './index.css';
import { Component } from "react";

export default class DashboardComponent extends Component {
    mock_events = [["click register", 5], ["click cancel", 3], ["idle 5 hours", 10]];

    render() {
        return (
            <div>
                <h3>Dashboard</h3>
                {this.mock_events.map(([event, number]) => <li>{event}: {number}</li>)}
            </div>
        );
    }
}
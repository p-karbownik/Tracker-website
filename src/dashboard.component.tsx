import './index.css';
import React, { Component } from "react";
import { Line } from "react-chartjs-2"

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

export default class DashboardComponent extends Component {
    mock_events = [["click register", [5, 6, 7, 8, 1, 4]], ["click cancel", [3, 2, 4, 6, 1, 2]], ["idle 5 hours", [0, 0, 0, 10, 0, 0]]];
    over_time_data: any[] = [];

    constructor() {
        super(0);
        let data_element;
        for (let i = 0; i < this.mock_events.length; i++) {
            data_element = {
                labels: [ -5, -4, -3, -2, -1, 0],
                datasets: [
                {
                    label: this.mock_events[i][0],
                    data: this.mock_events[i][1],
                    fill: true,
                    backgroundColor: "rgba(17, 29, 94, 0.2)",
                    borderColor: "rgba(17, 29, 94, 1)"
                }
                ]
            }
            this.over_time_data.push(data_element);
        }
    }

    render() {
        window.ResizeObserver = ResizeObserver;
        return (
            <div>
                <h3>Dashboard</h3>
                {this.over_time_data.map((element) => < Line type="line" data={element} />)}
            </div>
        );
    }
}
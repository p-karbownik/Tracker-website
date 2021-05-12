import './index.css'
import './website-dashboard.component.css';
import React, { Component } from "react";
import { Line } from "react-chartjs-2"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import EventData from "./event-data"

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

export default class WebsiteDashboardComponent extends Component {

    render() {
        window.ResizeObserver = ResizeObserver;
        return (
            <div>
                <h3>Dashboard</h3>
                <div>
                    <Grid container spacing={1} direction="row" alignItems="stretch">
                        {EventData.map((element) => <Grid item> <Card> < Line type="line" data={element} /> </Card> </Grid>)}
                    </Grid>
                </div> 
            </div>
        );
    }
}

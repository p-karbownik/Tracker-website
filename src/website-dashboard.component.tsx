import './index.css'
import './website-dashboard.component.css';
import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Line } from "react-chartjs-2"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
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
            <div className="dashboard">                
                <div>
                    <Grid container spacing={6} direction="row" alignItems="stretch">
                        <Grid item>
                            <Link to="./login"><ArrowBackIosIcon></ArrowBackIosIcon> </Link>
                        </Grid>
                        <Grid item>
                            <h3>Dashboard</h3>
                        </Grid>
                    </Grid>
                </div> 
                <div>
                    <Grid container spacing={1} direction="row" alignItems="stretch">
                        {EventData.map((element) => <Grid item> <Card> < Line type="line" data={element} /> </Card> </Grid>)}
                    </Grid>
                </div> 
            </div>
        );
    }
}

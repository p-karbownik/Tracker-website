import './index.css'
import './website-dashboard.component.css';
import 'date-fns';
import React, { Component } from "react";
import { Link } from "react-router-dom"
import { Line } from "react-chartjs-2"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Mock  from './event-data'
import Button from '@material-ui/core/Button/Button';
import { ButtonGroup, FormControl, FormHelperText, InputLabel, MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    DateTimePicker
  } from '@material-ui/pickers';
import { dateTimePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

type Dataset = {
    label: string;
    data: number[];
}

type FilledInDataset = {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
}

type EventData = {
    labels: number[];
    datasets: Dataset[];
}

type FilledInEventData = {
    labels: number[];
    datasets: FilledInDataset[];  
}

function fillInEventData(eventData: EventData) : FilledInEventData {
    return {
        labels: eventData.labels,
        datasets: eventData.datasets.map(
            (dataset: Dataset) => ({
                label: dataset.label,
                data: dataset.data,
                fill: true,
                backgroundColor: "rgba(168, 115, 115, 0.2)",
                borderColor: "rgba(168, 115, 115, 1)"
            })
        )
    }
}

type State = {
    isFetching: boolean;
    eventData: EventData;
    eventNameList: string[];
    dataGrouping: "Days" | "Hours";
    dateFrom: Date;
    dateTo: Date;
    token: string;
}

let initialState: State = {
    isFetching: false,
    eventData: {
        labels: [],
        datasets: [
        {
            label: "",
            data: [],
        }
        ]
    },
    eventNameList: [],
    dataGrouping: "Days",
    dateTo: new Date(),
    dateFrom: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    token: localStorage.getItem("token") as string,
}

export default class Dashboard extends Component {

    state: State;

    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    fetchData = (eventName: string) => {
        this.setState({...this.state, isFetching: true});

        let statisticsPerDay = (this.state.dataGrouping == "Days" ? true : false);
        fetch('http://localhost:8080/getStatistics/' 
        + this.state.token + '/' 
        + eventName + '/' 
        + statisticsPerDay + '/'
        + this.state.dateFrom.toISOString() + '/'
        + this.state.dateTo.toISOString()
        , {method: 'GET'})

            .then(response => response.json())
            .then(result => {
                this.setState({...this.state, eventData: fillInEventData(result), isFetching: false})
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false})
            })

    }

    fetchEventList = () => {
        this.setState({...this.state, isFetching: true});

        //TODO adres
        fetch('http://localhost:8080/', {method: 'GET'})
            .then(response => response.json())
            .then(result => {
                this.setState({...this.state, eventData: fillInEventData(result), isFetching: false})
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false})
            })
    }

    componentDidMount() {
        this.fetchEventList();
        // this.setState({...this.state, eventData: fillInEventData(Mock)})
    }

    handleDataGroupingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({...this.state, dataGrouping: event.target.value});
    }

    handleDateFromChange = (date: Date | null) => {
        this.setState({...this.state, dateFrom: date});
    }

    handleDateToChange = (date: Date | null) => {
        this.setState({...this.state, dateTo: date});
    }


    render() {
        window.ResizeObserver = ResizeObserver;
        return (
            <div className="dashboard">                
                <div>
                    <Grid container spacing={6} direction="row" alignItems="stretch">
                        <Grid item>
                            <Link to="./mainPage"><ArrowBackIosIcon></ArrowBackIosIcon> </Link>
                        </Grid>
                        <Grid item>
                            <h3>Dashboard</h3>
                        </Grid>
                    </Grid>
                </div> 
                <div>
                    <p> {this.state.isFetching ? 'Fetching data...' : ''} </p>
                    <Grid container justify="space-evenly" direction="row" alignItems="stretch">
                        <Grid item> 
                            <Grid container spacing={1} direction="column">
                                <Grid item>
                                <FormControl required>
                                    <Select
                                    id="data-grouping-select-required"
                                    value={this.state.dataGrouping}
                                    onChange={this.handleDataGroupingChange}
                                    >                                  
                                    <MenuItem value={"Days"}>Days</MenuItem>
                                    <MenuItem value={"Hours"}>Hours</MenuItem>
                                    </Select>
                                    <FormHelperText>Data grouping</FormHelperText>
                                </FormControl>
                                </Grid>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DateTimePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="dd-MM-yyyy hh:mm"
                                        value={this.state.dateFrom}
                                        onChange={this.handleDateFromChange}
                                    />
                                    <DateTimePicker
                                        margin="normal"
                                        id="dateto-picker-dialog"
                                        label="Date to"
                                        format="dd-MM-yyyy hh:mm"
                                        value={this.state.dateTo}
                                        onChange={this.handleDateToChange}
                                    />
                                    </MuiPickersUtilsProvider>
                                    
                            </Grid> 
                        </Grid>
                        <Grid item> 
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical contained primary button group"
                                variant="text"
                            >
                                {this.state.eventNameList.map((name) => 
                                    <Button onClick={() => this.fetchData(name)}> {name} </Button>
                                )}
                                
                                
                            </ButtonGroup>
                        </Grid>
                        <Grid item> <Card> < Line type="line" data={this.state.eventData} /> </Card> </Grid>
                    </Grid>
                </div> 
            </div>
        );
    }
}

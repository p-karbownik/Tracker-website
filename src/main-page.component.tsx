import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import { Component, Fragment } from "react";

import { Link, Redirect } from "react-router-dom";
import websites from './website';
import './main-page.component.css'
import { Button } from "@material-ui/core";
import { isEmptyBindingPattern } from "typescript";

const columns = [
    {
        name: "Website name",
        selector: "name",
        sortable: true
      },
      {
        name: "Number of Events",
        selector: "eventsNumber",
        sortable: true
      },
      {
        name: "Last event Date",
        selector: "lastEventDate",
        sortable: true
      },
      {
        name: "The most popular event",
        selector: "popularEvent",
        sortable: true
      },
      {
        name: "",
        cell: (row: any) => <Link to="/dashboard"  >See more</Link>
        
      }

  ];


  
  
  
export default class MainPage extends Component {

  handleLogout = (event: any) => {
    localStorage.removeItem('user');
  }
    
  render() {
      return (
        <Fragment>
            {localStorage.getItem('user') == null ? 
                <Redirect to='/' /> :
          <div className = "table">
          <br></br>
          <Card>
            <div className="websiteButton">
              <Link to="./newWebsite"><Button>Add new website</Button> </Link>
              <Link to="./"><Button onClick={this.handleLogout}>Log out</Button> </Link>
            </div> 
            <DataTable
              title="Your website list"
              columns={columns}
              data={websites}
              defaultSortField="name"
              sortIcon={<SortIcon />}
            />
          </Card>
          </div>
          }
          </Fragment>
      );
  }
}
import DataTable from "react-data-table-component";
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import { Component } from "react";

import { Link } from "react-router-dom";
import websites from './website';
import './dashboard.component.css'

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
        cell: (row: any) => <Link to="/websitePage"  >See more</Link>
        
      }

  ];
  
  
  
export default class Dashboard extends Component {
    
    render() {
        return (
            <div className = "table">
            
            <Card>
              <DataTable
                title="Your website list"
                columns={columns}
                data={websites}
                defaultSortField="name"
                sortIcon={<SortIcon />}
              />
            </Card>
            <br></br>
            <form action="/newWebsite">
                <button >Add new website</button>
            </form>
            </div>
            
        );
    }
}
import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import SearchResult from './SearchProperty';
import cookie from 'react-cookies';

import {Redirect} from 'react-router';
import SearchProperty from './SearchProperty';


class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      result : "",
      Flag :"",
      place : "",
      dateTo : "",
      dateFrom : "",
      guest : "",
      passon :""
    }}

    search = (e) => {
      e.preventDefault();
      
      const data = {
        place : this.state.place,
        dateTo : this.state.dateTo,
        dateFrom : this.state.dateFrom,
        guest : this.state.guest 
      };
      console.log(data);

      axios.post('http://localhost:3001/search',data)
      .then(response => {
          console.log("Status Code of Search Post: ",response.status);
          console.log(response.data);
          
          if(response.status === 200){
              this.setState({
                  Flag : true,
                  result : response.data
              });
          }else{
              this.setState({
                  Flag : false
              })
              
          }
      });
    }
  
  render() {
    let redirectVar = null;
    if(!cookie.load('cookie')){
    redirectVar = <Redirect to= "/TravellerLogin"/>
    }
    if (this.state.Flag){
      return (<Redirect to={{
        pathname: '/SearchProperty',
        state: { result: this.state.result }
    }} />)
    }

    return (
<div className ="container-fluid">

<div className="homesearch">

      
      <form className="form-inline">
     <div className="searchbox">
     <input type="text" className="form-control" id="place" placeholder="Las Vegas, CA, USA" onChange ={(e) => { this.setState({place : e.target.value})  }}/>
     </div>
     <div className="searchbox">
      <input type="date" className="form-control" id="dateFrom" placeholder="Departure" onChange ={(e) => { this.setState({dateFrom : e.target.value})  }}/>
      </div>
     <div className="searchbox">
      <input type="date" className="form-control" id="dateTo" placeholder="Arrive" onChange ={(e) => { this.setState({dateTo : e.target.value})  }}/>
      </div>
      <div className="searchbox"> 
      <input type="text" className="form-control" id="guest" placeholder="Guest" onChange ={(e) => { this.setState({guest : e.target.value})  }}/>
      </div>
      <div className="searchbox">
      <button type="submit"  onClick = {this.search} className="btn btn-primary mb-2">Search</button>
      </div>
      </form>
    
      </div>
</div>
     
      )
  }
}

export default SearchBar;

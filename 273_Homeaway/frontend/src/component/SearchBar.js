import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import SearchResult from './SearchResult';


class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {
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
                  Flag : true
              });
              this.setState({
                passon : response.data
            });
            let pass = null;
            pass = this.state.passon;
            console.log(this.state.passon);
          }else{
              this.setState({
                  Flag : false
              })
              
          }
      });
    }
  
  render() {


    return (
    
     
<div className ="container-fluid">
<div>

  <div>
      
  <form className="form-inline">
 
  <input type="text" className="form-control" id="place" placeholder="Las Vegas, CA, USA" onChange ={(e) => { this.setState({place : e.target.value})  }}/>
  <input type="text" className="form-control" id="dateTo" placeholder="Date To" onChange ={(e) => { this.setState({dateTo : e.target.value})  }}/>
  <input type="text" className="form-control" id="dateFrom" placeholder="Date From" onChange ={(e) => { this.setState({dateFrom : e.target.value})  }}/>
  <input type="text" className="form-control" id="guest" placeholder="Guest" onChange ={(e) => { this.setState({guest : e.target.value})  }}/>
  <button type="submit"  onClick = {this.search} className="btn btn-primary mb-2">Search</button>
  </form>

  </div>

  </div>
</div>
     
      )
  }
}

export default SearchBar;

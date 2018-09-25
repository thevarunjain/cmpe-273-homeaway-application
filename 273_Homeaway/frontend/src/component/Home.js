import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import SearchResult from './SearchResult';
import Navbar from './NavBar';
import SearchBar from './SearchBar';


class Home extends Component {
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
    let pass = null;
    pass = this.state.passon;

    return (
    
     
<div className ="container-fluid">
<div className ="bg-img"  >


<nav className ="navbar navbar-expand-sm fixed-top navbar-light">
  <div className="container-fluid">
  
    <div className="navbar-header">
    <a href = "#">  <img src= {require("../image/homeaway_name.svg")}></img> </a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
     <ul className="nav navbar-nav navbar-right">

        <li className="dropdown" >
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login
           <span className="caret"></span></a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href="#">Owner Login</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Traveller Login</a></li>
          </ul>
        </li>

        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Help<span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>

        <img  src={require('../image/logo.svg')}></img>

      </ul>
    </div>
  </div>
  </nav>

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

export default Home;

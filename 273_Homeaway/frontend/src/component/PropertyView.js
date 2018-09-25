import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './NavBar';
import SearchBar from './SearchBar';

class PropertyView extends Component {
       constructor(props){
           super(props);

       }

    render(){     
        let n = 1;
    return(
        <div className ="container-fluid"> 
        <div >
        <Navbar />
        <SearchBar />
        </div>

<br/>

<div>  
  <div class="media">
    <div class="media">
      <img src={require('../image/property.jpg')} class="img-thumbnail1"  />
      <h4 class="media-heading">Property Name</h4>
      <h4 class="media-heading">Property Price</h4>
      <form className="form-inline">
     
      <input type="text" className="form-control" id="dateTo" placeholder="Date To" onChange ={(e) => { this.setState({dateTo : e.target.value})  }}/>
      <input type="text" className="form-control" id="dateFrom" placeholder="Date From" onChange ={(e) => { this.setState({dateFrom : e.target.value})  }}/>
      </form>
      <input type="text" className="form-control" id="guest" placeholder="Guest" onChange ={(e) => { this.setState({guest : e.target.value})  }}/>
      <button type="submit"  onClick = {this.search} className="btn btn-primary mb-2">Book</button>
    
    </div>

  </div>   
</div>




</div>


    )

    }
}


export default PropertyView;
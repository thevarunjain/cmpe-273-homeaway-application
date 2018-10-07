import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import SearchResult from './SearchProperty';


class NavBar extends Component {
    constructor(props){
      super(props);
    
    }

render() {
    
    return (
    
     
<div className ="container-fluid">
<div>

<nav className ="navbar navbar-expand-sm fixed-top navbar-light">
  <div className="container-fluid">
  
    <div className="navbar-header">
    <Link to="/"> <img src= {require("../image/homeaway_blue.svg")}></img> </Link>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
     <ul className="nav navbar-nav navbar-right">

        <li className="dropdown" >
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Login
           <span className="caret"></span></a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li><Link to="/TravellerLogin">Traveller Login</Link></li>
            <li role="separator" className="divider"></li>
            <li><Link to="">Owner Login</Link></li>          
          </ul>
        </li>
      
       <li >
       <div className="searchbox1">
       <Link to="/ListProperty"><button className="listyourproperty"  >List your property  </button></Link>
       </div>
       </li> 
        <img  src={require('../image/logoblue.svg')}></img>
        

      </ul>
    </div>
  </div>
  </nav>

  </div>
</div>
     
      )
  }
}

export default NavBar;

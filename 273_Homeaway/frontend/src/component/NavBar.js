import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import SearchResult from './SearchResult';


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
    <a href = "#">  <img src= {require("../image/homeaway_blue.svg")}></img> </a>
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

  </div>
</div>
     
      )
  }
}

export default NavBar;

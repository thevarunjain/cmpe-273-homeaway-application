import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './NavBar';
import SearchBar from './SearchBar';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MediaType from './Card';
import VerticalLinearStepper from './ListProperty';

class SearchResult extends Component {
       constructor(props){
           super(props);

           var n = 1;
           
       }
      
      
    render(){     
        let n = 1
    return(
        <div> 
        <p>Hello from SearchResult Component </p>
        <div className ="container-fluid">
        <Navbar />
        <SearchBar />
        </div>
<br/>
<div class="container">  
  <div class="media">
    <div class="media-left">
      <img src={require('../image/property.jpg')} class="media-object"  />
    </div>
    <div class="media-body">
      <h4 class="media-heading">Property Name</h4>

     
    </div>
   <MediaType />
   <VerticalLinearStepper />
  </div>   
</div>
</div>


    )

    }
}


export default SearchResult;
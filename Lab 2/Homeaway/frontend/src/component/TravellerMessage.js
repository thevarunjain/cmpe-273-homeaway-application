import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Message from "./Message";

class TravellerAccount extends Component{
       constructor(props){
        super(props);

        this.state ={
            oldemail :"",
            oldpass : "",
            newpass1 :"",
            newpass2 :"",
            
        }

        }
    



    render(){
        
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        // redirectVar = <Redirect to= "/TravellerLogin"/>
        // }
      
        return(
        
        <div className="container-fluid">
        {redirectVar}
        <div id="login-container1" className="row" >
        <div className ="container-fluid1">
        <nav className ="navbar navbar-expand-sm fixed-top navbar-light">
             <div className="container-fluid">
               <div className="navbar-header">
                <a href = "#">  <img src= {require("../image/homeaway_blue.svg")}></img> </a>
                </div>
                <span className="blankspace">                            
                </span>
                <img  src={require('../image/logoblue.svg')}></img>

                 </div>
        </nav>

        </div>

        <div class="container-fluid">
         <ul class="nav nav-tabs">
             <li><Link to="/TravellerTrip">My Trips</Link></li>
             <li><Link to="/TravellerProfile">Profile</Link></li>
             <li><Link to="/TravellerAccount">Account</Link></li>
             <li><Link to="/TravellerMessage">Message</Link></li>
             
         </ul>
         </div>
         <Message email = "test@gmail.com"/>

        </div>
        </div>
 
        );
    }
}
 export default TravellerAccount;

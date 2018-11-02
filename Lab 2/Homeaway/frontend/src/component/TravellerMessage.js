import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Message from "./Message";
import Navbarwhite from "../component/Navbarwhite"

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
        logout = () => {
        cookie.remove("cookie")
            sessionStorage.removeItem("JWT");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("password")
          }



    render(){
        
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        // redirectVar = <Redirect to= "/TravellerLogin"/>
        // }
      
        return(
        
        <div className="container-fluid">
        {/* {redirectVar} */}
        <div id="login-container1" className="row" >
        <Navbarwhite />

        <div class="container-fluid">
         <ul class="nav nav-tabs" >
             <li style= {{paddingLeft : "11%" }}><Link to="/TravellerTrip">My Trips</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to="/TravellerProfile">Profile</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to="/TravellerAccount">Account</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to="/TravellerMessage">Message</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to='/' onClick={this.logout} >Logout</Link></li> 
             
         </ul>
         </div>
         <Message email = "test@gmail.com"/>

        </div>
        </div>
 
        );
    }
}
 export default TravellerAccount;

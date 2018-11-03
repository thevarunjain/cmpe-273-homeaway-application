import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Navbarwhite from "../component/Navbarwhite"

class TravellerMessage extends Component{
       constructor(props){
        super(props);

        this.state ={
            owneremail :"",
            propid :"",
            travelleremail :"",
            question :"",
                reply : ""
            
        }
        

        }
        logout = () => {
            sessionStorage.removeItem("JWT");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("password")
          }
          
      //Get Reply
        componentWillMount(){
            console.log("in will mount");
           
            var email = sessionStorage.getItem("email"); 
            console.log(email)       
            axios.get('http://localhost:3001/GetReply',{
                params: {
                    id : email
                }})
                    .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    var {id, owneremail, propid, travelleremail, question, reply} = response.data;
                    
                    this.setState({
                        owneremail,
                        propid,
                        travelleremail,
                        question,
                        reply
                    })
                    console.log(this.state)
                });
        }

    render(){
        console.log("in render");

        var redirectVar;
        if(sessionStorage.getItem("JWT") == null || undefined){
            redirectVar = <Redirect to= "/TravellerLogin"/>
        }

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
            

                    
        <div className="container" style={{width :"530px"}}>  
        <ul className="col-md-8 list-group">
                {/* {message} */}

                <h2> Traveller Messages </h2>

        <div class="container"  style={{width :"394px", marginLeft : "83px"}}>
        <h4>{this.state.question}</h4>
        </div>
        <div class="container darker" style={{width :"480px"}}>
        <h4>{this.state.reply}</h4>
        </div>
        <div style = {{marginLeft : "158px"}}>
        <input style = {{width : "321px"} } className="form-control" />
        <br></br>
        <button style = {{marginLeft : "221px"}} className= "btn btn-primary" onClick={this.replymessage}>Reply </button>
        </div>
         </ul> 
         </div>

        </div>
        </div>
 
        );
    }
}
 export default TravellerMessage;

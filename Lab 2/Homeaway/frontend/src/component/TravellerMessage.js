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
            msg : [],
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
                
                this.setState({
                        msg : response.data
                })
                console.log(this.state)
            });
    }
    

    render(){
        var replyerr;
        
        var msgbox = this.state.msg.map((msg)=>{


            if(msg.question == "" || null){
                replyerr = <div>
                <img  style={{maxWidth: "360px"}} src={require("../image/message.png")} />
                           </div> 
               }
    

            return(
                    <div className="col-md-7">

                    <div className="container" style={{width :"530px"}}>  
                    <ul className="col-md-8 list-group">

                        <h2> Message for {msg.propid}</h2>
                    {replyerr}
                    <div className="container" style= {{width : "366px","marginLeft" : "129px"}}>

                    <h4 >{msg.question}</h4>
                    </div>

                    {msg.reply != undefined ? <div className="container darker" style={{width :"394px", marginLeft : "1px"}}>
                    <h5>Owner : {msg.owneremail} </h5>
                    <h4>{msg.reply}</h4>

                        </div> : null}

                    </ul> 
                    </div>
                    </div>

            )

        }) 


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

        <div className="container-fluid">
         <ul className="nav nav-tabs" >
             <li style= {{paddingLeft : "11%" }}><Link to="/TravellerTrip">My Trips</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to="/TravellerProfile">Profile</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to="/TravellerAccount">Account</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to="/TravellerMessage">Message</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to='/' onClick={this.logout} >Logout</Link></li> 
             
         </ul>
         </div>
 
                {msgbox}
       
        </div>
        </div>
 
        );
    }
}
 export default TravellerMessage;

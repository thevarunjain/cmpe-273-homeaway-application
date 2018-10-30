import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { submittrip } from "../actions";

class TravellerTrip extends Component{
       constructor(props){
        super(props);

        this.state={
            prop : [],
            ip :[]
        }
        }
    

    //submit Login handler to send a request to the node backend
    componentWillMount() {

       // this.props.submittrip(this.props.traveller.details);
        
    

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get('http://localhost:3001/TravellerTrip',{               //get the booking details
            params: {
                id : "varunsj18@gmail.com"
              }})
            .then(response => {
                console.log("Status Code  is : ",response.status);
                console.log(response.data);
                this.setState({
                    prop : this.state.prop.concat(response.data) 
                });
                this.state.prop.map((i)=>{
                    console.log(i)
                axios.post(`http://localhost:3001/getpropertypicsingle/${i.headline}`)    //get the photo
                .then(response => {
                    let imagePreview = '';
                    console.log("Imgae Res : ",response);
                         imagePreview = 'data:image/jpg;base64, ' + response.data;
                         this.setState(  
                        { 
                            ip : this.state.ip.concat(imagePreview)}              
                      )
                    }); 
                })

            })
        }

     
    

    render(){
        //redirect based on successful login
    console.log(this.state.ip);
    console.log(this.state.prop);
        let redirectVar = null;
        if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/TravellerLogin"/>
        }

        var i;
//var imagePreview = '';
        i=-1;
        let property = this.state.prop.map(prop => {
           i = i+1;  
    console.log(i);
                  
        var dt = new Date(prop.bookedfrom);
       var d1 = dt.getDate();
       var d2 = dt.getMonth(); 
       var d3 = dt.getFullYear();
    
      var dt1 = new Date(prop.bookedto);
      var d4 = dt1.getDate();
      var d5 = dt1.getMonth(); 
      var d6 = dt1.getFullYear();

            return(
                
          <li className="list-group-item" key={Math.random()} >
          <div className="ima">
          <div className="media-left">
          
          <img className="media-object" src={this.state.ip[i]} style={{width : "200px", height:"200px"}} />
          </div>
          <div className="media-body">
          <div className="media-heading">
          <div className="col-md-8">
          <h3>{prop.headline}</h3>
          </div>
           <div className="col-md-8" >
           <h4>{prop.description}</h4>          
          </div>

          <div className="col-md-8" >
          Booked from  : {d2}/{d1}/{d3} . 
          Booked to : {d5}/{d4}/{d6}

          </div>
          <br></br>
     
         
          </div>
          </div>
          </div>
          </li>

            );
        })

            
        return(



           
        
        <div className="container-fluid">
        {redirectVar}
        <div id="login-container" className="row" >
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
        <div className="container-fluid">
         <ul className="nav nav-tabs">
             <li><Link to="/TravellerTrip">My Trips</Link></li>
             <li><Link to="/TravellerProfile">Profile</Link></li>
             <li><Link to="/TravellerAccount">Account</Link></li>
             <li><Link to="/TravellerMessage">Message</Link></li>
             
         </ul>
         </div>
        
         <div style={{margin : "3%", padding: "15px"}}> 
      <ul className="col-md-8 list-group" >
         {property}
     </ul> 
     </div>
     
        
        </div>
        
        </div>
        
        );
    }
}

function mapStateToProps(state){
    return{
        traveller : state.login,
        trip : state.trip
    };
  }

  
  export default connect (mapStateToProps, {submittrip})(TravellerTrip);
//export default TravellerTrip;
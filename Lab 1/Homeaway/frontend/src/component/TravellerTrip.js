import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

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
        var headers = new Headers();
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get('http://localhost:3001/TravellerTrip',{
            params: {
                id : cookie.load('cookie')
              }})
            .then(response => {
                console.log("Status Code  is : ",response.status);
                console.log(response.data);
                this.setState({
                    prop : this.state.prop.concat(response.data) 
                });

               

            });
            let imagePreview = '';
            console.log("imagesssssssssssssssss");
            console.log(this.state.prop);

            axios.post('http://localhost:3001/getpropertypicsingle/'+`Courtyard`)
            .then(response => {
    
                console.log("Imgae Res : ",response);
                imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.setState(  
                  { ip : this.state.ip.concat(imagePreview)}              
                )
               console.log(this.state.ip)
        
            });

     }
    

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/TravellerLogin"/>
        }

        var i;
var imagePreview = '';
i=-1;
        let property = this.state.prop.map(prop => {
           i+1;

           
        var dt = new Date(prop.bookfrom);
        console.log(dt);
       var d1 = dt.getDate();
       console.log(d1);
       var d2 = dt.getMonth(); 
       console.log(d2);
       var d3 = dt.getFullYear();
       console.log(d3);
    
      var dt1 = new Date(prop.bookto);
      console.log(dt);
      var d4 = dt1.getDate();
      console.log(d1);
      var d5 = dt1.getMonth(); 
      console.log(d2);
      var d6 = dt1.getFullYear();
      console.log(d3);

            console.log("in prop")
            console.log(prop);
            return(
                
          <li className="list-group-item" key={Math.random()} >
          <div className="ima">
          <div className="media-left">
          
          <img className="media-object" src={this.state.ip} style={{width : "200px", height:"200px"}} />
          </div>
          <div className="media-body">
          <div className="media-heading">
          <div col-md-8>
          <h3>{prop.headline}</h3>
          </div>
           <div col-md-8 >
           <h4>{prop.description}</h4>          
          </div>

          <div col-md-8 >
          Booked from  : {d2}/{d1}/{d3} . 
          Booked to : {d5}/{d4}/{d6}

          </div>
          <br></br>

          <div col-md-8 >
          Cost : {prop.rate}
 
          </div>
     
         
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
        <div class="container-fluid">
         <ul class="nav nav-tabs">
             <li><Link to="/TravellerTrip">My Trips</Link></li>
             <li><Link to="/TravellerProfile">Profile</Link></li>
             <li><Link to="/TravellerAccount">Account</Link></li>
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
 export default TravellerTrip;

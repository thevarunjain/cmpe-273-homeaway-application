import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import TravellerProfile from './TravellerProfile';
import TravellerAccount from './TravellerAccount';
import TravellerTrip from './TravellerTrip';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Navbarwhite from './Navbarwhite';
import OwnerMessage from "./OwnerMessage";


class OwnerDashboard extends Component {
       constructor(props){
           super(props);

           this.state = {
            prop : [],
            ip : [],
            booked : '',
            resp : []
          };
           
       }
  
       componentWillMount(){
           
           
        console.log("In the dasboard of ",sessionStorage.getItem("Owneremail"))
        var email = sessionStorage.getItem("Owneremail")
           axios.defaults.withCredentials = true;
       axios.get('http://localhost:3001/OwnerDashboard',{
            params: {
              id : email 
            }})
            .then(response => {
              console.log(response);
              console.log("Status Code  is : ",response.status);
              this.setState({
                  prop : this.state.prop.concat(response.data) 
              });
              this.state.prop.map((i)=>{
              axios.post(`http://localhost:3001/getpropertypicsingle/${i.headline}`)    //get the photo
              .then(response => {
                  let imagePreview = '';
                       imagePreview = 'data:image/jpg;base64, ' + response.data;
                       this.setState(  
                      { 
                          ip : this.state.ip.concat(imagePreview)}              
                    )
                  }); 
              })

          })

        
       }
       logout = () => {
        sessionStorage.removeItem("OwnerJWT");
        sessionStorage.removeItem("Owneremail");
        sessionStorage.removeItem("Ownerpassword");
      }
      
      
    render(){ 
        let redirectVar = null;
        if(!sessionStorage.getItem("OwnerJWT")){
        redirectVar = <Redirect to= "/OwnerLogin"/>
        }  
      var i,j;
      i =-1,j =-1;
     
   var property = this.state.prop.map((property)=>{   // extracting property 
     i =i+1;
     if(property.booking !=undefined) // for showing multiple bookings 
     { property.booking.map((x)=>{
           j = j+1
       })}
          return (
            <li className="list-group-item" key={Math.random()}>
            <div className="ima">
            <div className="media-left">
            <img className="media-object" style = {{width : "247px"}}src={this.state.ip[i]}/>
            </div>
            <div className="media-body">
            <div className="media-heading">
            <h3 >{property.headline}</h3>
            <h4>{property.description}</h4>
            BA : {property.bathroom} . 
            BR : {property.bedroom}<br></br>
            Cost : {property.rate} . 
            Guest : {property.accomodation}<br></br><br></br>
            Booked by : {property.booking != undefined ? property.booking[0].bookedby : "Property Not Booked" }<br></br>
            Booked from : {property.booking != undefined ?
             (new Date(property.booking[0].bookedfrom)).getMonth() +" / "+ 
             (new Date(property.booking[0].bookedfrom)).getDate() +" / "+
            (new Date(property.booking[0].bookedfrom)).getFullYear() 
            : "Property Not Booked" }<br></br>
            Booked to : {property.booking != undefined ?  
            (new Date(property.booking[0].bookedto)).getMonth() +" / "+ 
            (new Date(property.booking[0].bookedto)).getDate() +" / "+
            (new Date(property.booking[0].bookedto)).getFullYear()
            : "Property Not Booked " }

            </div>
            </div>
            </div>
            </li>
          );
          })
                var message;
                if(property.length == 0){
                   message = <div> 
                   <img src = {require("../image/prop.png")} />
                    </div>

                }
    return(
        <div> 
        <Navbarwhite />
      <div className ="container-fluid">
      {redirectVar}
        <div className="container-fluid">
         <ul className="nav nav-tabs" >
             <li style= {{paddingLeft : "11%" }}><Link to="/OwnerDashboard">OwnerDashboard</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to="/OwnerMessage">Owner Message</Link></li>
             <li style= {{paddingLeft : "11%" }}><Link to='/' onClick={this.logout} >Logout</Link></li> 
         </ul>
         </div>
        <div className ="container-fluid" style={{ backgroundColor : "#f4f4f4",height : "650px"}}>
        <div style={{margin : "3%", padding: "15px"}}>
                <div className="col-md-1">
                </div>
                <div className="col-md-7">
                <div className="container">  
      <ul className="col-md-8 list-group">
                     {property}
                     {message}
     </ul> 
     </div>
                </div>


         </div>
         </div>
        </div>

        </div>

    )

    }
}


export default OwnerDashboard;
import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import TravellerProfile from './TravellerProfile';
import TravellerAccount from './TravellerAccount';
import TravellerTrip from './TravellerTrip';
import {Redirect} from 'react-router';
import Navbar from './NavBar';

class OwnerDashboard extends Component {
       constructor(props){
           super(props);

           this.state = {
            prop : [],
            address : '',
            headline :'',
            description: '',
            propertytype : '',
            bedroom:'',
            accomodation:'',
            bathroom:'',
            availfrom : '',
            availto : '',
            rate : '',
            minstay : '',   
            selectedFile: '',
            imageView : '',
booked : ''
          };
          
           
       }
       componentWillMount(){
        console.log("cookies _ "+cookie.load('cookieOwner'));
        var email = cookie.load('cookieOwner')

        
  
        
       axios.get('http://localhost:3001/OwnerDashboard',{
            params: {
              id : email
            }})
                .then((response) => {
                //update the state with the response data
                console.log(response);
                console.log(response.data[0]);
                this.setState({


                    prop : this.state.prop.concat(response.data),
                    address : response.data[0].address,
                    headline : response.data[0].headline,
                    description : response.data[0].description,
                    propertytype : response.data[0].propertytype,
                    bedroom : response.data[0].bedroom,
                    accomodation : response.data[0].accomodation,
                    bathroom : response.data[0].bathroom,
                    availfrom : response.data[0].availfrom,
                    availto : response.data[0].availto,
                    rate : response.data[0].rate,
                    minstay : response.data[0].minstay,
                    email : response.data[0].email,
                    //append email 
                    //and call in the state 
                
                });
                console.log("In Home");
            });
            axios.get('http://localhost:3001/OwnerDashboardBookedBy',{
              params: {
                id : email
              }})
                  .then((response) => {
                  //update the state with the response data
                  console.log(response);
                  console.log(response.data[0]);
                  this.setState({
                      booked : response.data[0].email,
                      //append email 
                      //and call in the state 
                  
                  });
                  console.log(" booked wali route mai ");
              });

       }
      
      
    render(){ 
        
        let redirectVar = null;
        if(!cookie.load('cookieOwner')){
        redirectVar = <Redirect to= "/OwnerLogin"/>
        }  

   var property = this.state.prop.map((property)=>{
          return (
            <li className="list-group-item" key={Math.random()}>
            <div className="ima">
            <div className="media-left">
            <img className="media-object" src={require('../image/property.jpg')} />
            </div>
            <div className="media-body">
            <div className="media-heading">
            <h3>{property.headline}</h3>
            <h4>{property.description}</h4>
  
            BA : {property.bathroom}
            BR : {property.bedroom}<br></br>
            Cost : {property.rate}
            Guest : {property.accomodation}
            Booked by : {this.state.booked}
            </div>
            </div>
            </div>
            </li>
          );
          })
 
    return(
      <div className ="container-fluid">
      {redirectVar}
        <Navbar />
        <div className ="container-fluid" style={{ backgroundColor : "#f4f4f4",height : "650px"}}>
        <div style={{margin : "3%", padding: "15px"}}>
    
                <div className="col-md-1">
                </div>
                <div className="col-md-7">
                <div className="container">  
      <ul className="col-md-8 list-group">
    {property}
     </ul> 
     </div>
                </div>


         </div>
         </div>
        </div>


    )

    }
}


export default OwnerDashboard;
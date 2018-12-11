import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { submittrip } from "../actions";
import Navbarwhite from "../component/Navbarwhite";
import {paginate} from "../paginate";
import Pagination from "./Pagination";
import {ROOT_URL} from "../config";
import {propertyTraveller} from "../queries/queries"
import { compose, graphql, withApollo } from 'react-apollo';




class TravellerTrip extends Component{
       constructor(props){
        super(props);

        this.state={
            prop : [],
            ip :[],
            currentPage : 1,
        }
        }
    

    //submit Login handler to send a request to the node backend
    componentWillMount() {

        var data = this.props.propertyTraveller;
        if(data.loading){
            return( <div>Loading Props...</div> );
        } else {
           this.setState({
                    prop : data
           })
        }


        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get(`${ROOT_URL}/TravellerTrip`,{               //get the booking details
            params: {
                id : this.props.traveller.details != undefined ? this.props.traveller.details : sessionStorage.getItem("email") 
              }})
            .then(response => {
                console.log("Status Code  is : ",response.status);
                console.log(response.data);
                this.setState({
                    prop : this.state.prop.concat(response.data) 
                });
                this.state.prop.map((i)=>{
                    console.log(i)
                axios.post(`${ROOT_URL}/getpropertypicsingle/${i.headline}`)    //get the photo
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

        handlePageChange= page =>{
            console.log(page);
            this.setState({currentPage : page });
          }
        logout = () => {
            sessionStorage.removeItem("JWT");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("password")
          }

    render(){

        const prope = paginate(this.state.prop, this.state.currentPage, 3)


        
        //redirect based on successful login
    console.log(this.state.ip);
    console.log(this.state.prop);
        let redirectVar = null;
        if(sessionStorage.getItem("JWT") == null || undefined){
        redirectVar = <Redirect to= "/TravellerLogin"/>
        }

        var i;
//var imagePreview = '';
        i=-1;
        let property = prope.map(prop => {
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

      console.log(this.state.prop.length);

            return(
                
          <li className="list-group-item" key={Math.random()} >
          <div className="ima">
          <div className="media-left">
          
          <img className="media-object" src={this.state.ip[i]} style={{width : "200px", height:"200px"}} />
          </div>
          <div className="media-body">
          <div className="media-heading">
          <div className="col-md-8">
          <h3 className = "property-headline" >{prop.headline}</h3>
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
        
         <div style={{margin : "3%", padding: "15px"}}> 
      <ul className="col-md-8 list-group" >
      <Pagination
         pageSize={3}
         itemsCount = {this.state.prop.length}
         currentPage = {this.state.currentPage}
        onPageChange = {this.handlePageChange}/>
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

  
//   export default connect (mapStateToProps, {submittrip})(TravellerTrip);
export default TravellerTrip;

// export default graphql(propertyTraveller)(TravellerTrip);

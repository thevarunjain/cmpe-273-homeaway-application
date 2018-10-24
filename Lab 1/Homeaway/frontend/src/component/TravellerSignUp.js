import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class TravellerSignUp extends Component{
       //call the constructor method
       constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            authFlag : ""
        }
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        const data = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/TravellerSignUp',data)
            .then(response => {
                console.log("Status Code  is : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                  <Redirect to="/home"> </Redirect>
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                       authFlag : false
                    
                    })
                }
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authflag){
        redirectVar = <Redirect to= "/"/>
      }
        return(
        
         <div id="login-container" className="row">
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
        
        <div className="panel-heading">
                    <h1>Sign up for HomeAway</h1>
                    <span>Already have an account  </span><Link to="TravellerLogin"> Log in </Link>
        </div>
        <div className ="form-container">
            <div className="login-form  traveler">

                <div class="heading1">
                <p className="heading">Account login</p>
                </div><br></br>
                
                
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ firstname : event.target.value })}} type="text" className="form-control"  placeholder="First Name"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ lastname : event.target.value })}} type="text" className="form-control"  placeholder="Last Name"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ email : event.target.value })}} type="email" className="form-control"  placeholder="Email ID"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ password : event.target.value })}} type="password" className="form-control"  placeholder="Password"/>
                </div>
                <div ><br></br>
                <button className="loginbutton" onClick = {this.submitLogin} >Sign me up</button>  
                </div> 

                <div className="heading1">
        
                </div><br></br>
                <div >
                <button className="fbbutton"  >  Log in with Facebook </button>  
                </div><br></br>  
                <div >
                <button className="googlebutton"  > Log in with Google </button>  
                </div> <br></br>


                    
            </div>
    </div>
        </div>
        </div>
        );
    }
}
 export default TravellerSignUp;

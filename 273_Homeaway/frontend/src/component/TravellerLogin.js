import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class TravellerLogin extends Component{
       //call the constructor method
       constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : null
        }
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        console.log("this is data" + data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/TravellerLogin',data)
            .then(response => {
                console.log("Status Code  is : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                    console.log("in 200 ");
                    this.setState({
                        authFlag : true
                    })
                }
                else if(response.status === 201){
                    this.setState({
                       authFlag : false,
                    })
                   
                
                }
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authFlag==true){
            return (<Redirect to={{
                pathname: '/TravellerHomepage',
                state: { result: this.state.email }
            }} />)
        }
        if(cookie.load('cookie')){
            return (
                <Redirect to='/TravellerHomepage'/>
            )
        }
        return(

        
         <div>
         
        {redirectVar}

        <div id="login-container" className="row" >
        <div className ="container-fluid1">
        <nav className ="navbar navbar-expand-sm fixed-top navbar-light">
             <div className="container-fluid">
               <div className="navbar-header">
                <Link to="/">  <img src= {require("../image/homeaway_blue.svg")}></img> </Link>
                </div>
                <span className="blankspace">                            
                </span>
                <img  src={require('../image/logoblue.svg')}></img>

                 </div>
                 
                 
        </nav>
        </div>
        







        <div className="panel-heading">
                    <h1>Log in to HomeAway</h1>
                    <span>Need an account ? </span><Link to="/TravellerSignUp">Sign up</Link>
        </div>
        <div className ="form-container">
            <div className="login-form  traveler">
                <div class="heading1">
                <p className="heading">Account login</p>
                </div><br></br>
                
                <div className="form-group">
                    <input required onChange = {(event) => {this.setState({ email : event.target.value })}} type="email" className="form-control"  placeholder="Email ID"/>
                </div>
                <div className="form-group">
                    <input required onChange = {(event) => {this.setState({ password : event.target.value })}} type="password" className="form-control"  placeholder="Password"/>
                </div>
                <span ><a>Forget Password </a></span>
                <div ><br></br>
                <button className="loginbutton" onClick = {this.submitLogin} >Log In</button>  
                </div> 
                <div className="heading1">
                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" /> Keep me signed in
                    </label>
                </div><br></br>
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
 export default TravellerLogin;
 
import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import NavBar from "./NavBar";

class Login extends Component{
       //call the constructor method
       constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : ""
        }
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
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
      //  if(cookie.load('cookie')){
     //   redirectVar = <Redirect to= "/home"/>
      //  }
        return(
        
            <div>
                <NavBar />  
                {redirectVar}
            <div className="container">
                
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Admin Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div className="form-group">
                                <input onChange = {(event) => {this.setState({ username : event.target.value })}} type="text" className="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <input onChange = {(event) => {this.setState({ password : event.target.value })}} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} className="btn btn-primary">Login</button>                 
                    </div>
                </div>
            </div>
            </div>
        );
    }

}
 export default Login;

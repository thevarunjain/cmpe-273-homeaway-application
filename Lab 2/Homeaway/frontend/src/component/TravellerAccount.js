import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Navbarwhite from "../component/Navbarwhite"

class TravellerAccount extends Component{
       constructor(props){
        super(props);

        this.state ={
            oldemail :"",
            oldpass : "",
            newpass1 :"",
            newpass2 :"",
            
        }

        }
    

    //submit Login handler to send a request to the node backend
    changeEmail = (e) => {
       // var headers = new Headers();
        const data = {
            newemail : this.state.newemail,
            oldemail : cookie.load('cookie')
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/TravellerAccountEmail',data)
            .then(response => {
                console.log("Status Code  is : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                    cookie.remove('cookie', { path: '/' })
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
    logout = () => {
        cookie.remove("cookie")
        sessionStorage.removeItem("JWT");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
      }

    changePass = (e) => {
       // var headers = new Headers();
        if(this.state.newpass1 != this.state.newpass2){
            console.log("Password do not match");
            this.setState({
                flag : false,
                oldpass : "",
                newpass1 :"",
                newpass2 :""
            })
        }
        else{

        const data = {
            newpass : this.state.newpass1,
            email : cookie.load('cookie'),
            oldpass : this.state.oldpass
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/TravellerAccountPassword',data)
            .then(response => {
                console.log("Status Code  is : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                    cookie.remove('cookie', { path: '/' })
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

    }

    render(){
        var message = "";
        let redirectVar = null;
        if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/TravellerLogin"/>
        }
        while(this.state.newpass1 !== this.state.newpass2){
            message = <div className="login-err">
            <h4 style= {{color : "white", textAlign : "center"}}>Password do not match</h4>
            </div>
        }
        return(
            
        <div className="container-fluid">
        {redirectVar}
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


            <div>
            <div className="travellerprofileform">
                <div class="heading1">
                <p className="heading">Change your email address</p>
                </div><br></br>
                
                <div className="form-group">
                    <input  required onChange = {(event) => {this.setState({ newemail : event.target.value })}} type="text" className="form-control"  placeholder="New email address"/>
                <div ><br></br>
        
                <button className="loginbutton" onClick = {this.changeEmail} >Save Changes</button>  
                </div>     
            </div>
            </div>
            </div>

             <div>
            <div className="travellerprofileform">
                <div class="heading1">
                <p className="heading">Change your Password</p>
                </div><br></br>
                
                <div className="form-group">
                    <input required onChange = {(event) => {this.setState({ oldpass : event.target.value })}} type="password" className="form-control"  placeholder="Current Password"/>
                </div> 
                <div className="form-group">
                    <input required onChange = {(event) => {this.setState({ newpass1 : event.target.value })}} type="password" className="form-control"  placeholder="New Password"/>
                </div> 
                <div className="form-group">
                    <input required onChange = {(event) => {this.setState({ newpass2 : event.target.value })}} type="password" className="form-control"  placeholder="Confirm Password"/>
                </div>
                {message}
                <div >
                <button className="loginbutton" onClick = {this.changePass} >Save Changes</button>  
                </div>     
           
            </div>
            </div>




            

   

        </div>
        </div>
 
        );
    }
}
 export default TravellerAccount;

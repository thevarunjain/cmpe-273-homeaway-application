import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
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
            status : ""
            
        }

        }
    

    //submit Login handler to send a request to the node backend
    changeEmail = (e) => {
       // var headers = new Headers();
        const data = {
            newemail : this.state.newemail,
            oldemail : sessionStorage.getItem("email")
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
        sessionStorage.removeItem("JWT");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
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
            email : sessionStorage.getItem("email"),
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
        sessionStorage.removeItem("JWT");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
                    this.setState({
                        authFlag : true
                    })
                   
                }else if(response.status === 201){
                    this.setState({
                        status : 201
                    })
                }
                else{
                    this.setState({
                       authFlag : false
                        
                    })
                }
            });
        }

    }

    render(){
        var message = "";
        var message1 = "";
        let redirectVar = null;
        if(sessionStorage.getItem("JWT") == null || undefined){
        redirectVar = <Redirect to= "/TravellerLogin"/>
        }
        if(this.state.newpass1 !== this.state.newpass2){
            message = <h5 style= {{color : "red", textAlign : "center"}}>Confirm password do not match</h5>
        }
        if(this.state.status == 201){
            message1 = <h5 style= {{color : "red", textAlign : "center"}}>Incorrect Old Password</h5>

        }
        
        return(
            
        <div className="container-fluid">
        {redirectVar}
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


            <div>
            <div className="travellerprofileform">
                <div className="heading1">
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
                <div className="heading1">
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
                {message1}
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

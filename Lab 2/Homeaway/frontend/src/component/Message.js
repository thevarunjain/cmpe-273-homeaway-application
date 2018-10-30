import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class Message extends Component{
       constructor(props){
        super(props);
        this.state = {
            email:'',
            message : "",
          };

        }

      //Get Messages 
    
        componentWillMount(){
            console.log("cookies _ "+cookie.load('cookie'));
            var email = cookie.load('cookie')
            
            axios.get('http://localhost:3001/GetMessage',{
                params: {
                  id : "varunsj18@gmail.com"
                }})
                    .then((response) => {
                    console.log(response);
                    console.log(response.data[0]);
                    console.log("In Home");
                });
        }

  


    updateMessage(e){
        this.setState({
          message : e.target.value
        })
      }

    postMessage(){
                 const data = {
                    email : "this.props.email",
                    message : this.state.message
                }
                console.log(data);
                //set the with credentials to true
                axios.defaults.withCredentials = true;
                //make a post request with the user data
                axios.post('http://localhost:3001/PostMessage',data)
                    .then(response => {
                        console.log("Status Code  is : ",response.status);
                        console.log(response.data);
                        if(response.status === 200){
                                console.log('Changed saved successfully');
                        }else{
                            console.log('Changed failed !!! ');
        
                        }
                    });
    }
  
    // onSubmit = (e) => {
    //   e.preventDefault();
    //   const { description, selectedFile } = this.state;
    //   let formData = new FormData();
    //   console.log(this.state.description)

    //   formData.append('email', cookie.load('cookie'));        
    //   formData.append('description', description);
    //   formData.append('selectedFile', selectedFile);
    //   console.log("form wali email :" + cookie.load('cookie'))
  
    //     axios.post('http://localhost:3001/ProfilePicture', formData)
    //       .then((result) => {
    //         axios.post('http://localhost:3001/GetProfilePicture/'+`profile_${cookie.load('cookie')}.jpg`)
  
    //         .then(response => {
    //             console.log("Imgae Res : ",response);
    //             let imagePreview = 'data:image/jpg;base64, ' + response.data;
    //             this.setState({
    //                 imageView: imagePreview
    //             })
    //         });
    //       });
  
    // }




    render(){
        // //redirect based on successful login
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        // redirectVar = <Redirect to= "/TravellerLogin"/>
        // }


        return(
        <div className="container-fluid">
          {redirectVar}
        <div id="login-container1" className="row" >
        <div className ="container-fluid1">
        <nav className ="navbar navbar-expand-sm fixed-top navbar-light">
             <div className="container-fluid">
               <div className="navbar-header">
                <Link to="/TravellerHomePage">  <img src= {require("../image/homeaway_blue.svg")}></img> </Link>
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
             <li><Link to="/Message">Message</Link></li>
             
         </ul>
         </div>
        </div> 
                <input type = "textarea" value = {this.state.message} onChange={this.updateMessage.bind(this)}/>
        </div>
        );
    }
}
 export default Message;

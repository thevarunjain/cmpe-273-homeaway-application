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
            email : "",
            message : "",
          };

        }

      //Get Messages 
    
        // componentWillMount(){
        //     console.log("cookies _ "+cookie.load('cookie'));
        //     var email = cookie.load('cookie')
            
        //     axios.get('http://localhost:3001/GetMessage',{
        //         params: {
        //           id : "varunsj18@gmail.com"
        //         }})
        //             .then((response) => {
        //             console.log(response);
        //             console.log(response.data[0]);
        //             console.log("In Home");
        //         });
        // }

       
    postMessage = (e) => {
        e.preventDefault();
        const {email, message} = this.state;
        console.log(this.state);


                 const data = {
                    fromEmail : "from",
                    toEmail : "to",
                    message : message
                }
                console.log(data);
                console.log(this.props);
                //set the with credentials to true
                axios.defaults.withCredentials = true;
                //make a post request with the user data
                axios.post('http://localhost:3001/PostMessage',data)
                //     .then(response => {
                //         console.log("Status Code  is : ",response.status);
                //         console.log(response.data);
                //         if(response.status === 200){
                //                 console.log('Changed saved successfully');
                //         }else{
                //             console.log('Changed failed !!! ');
        
                //         }
                //     });
    }
 




    render(){
        // //redirect based on successful login
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        // redirectVar = <Redirect to= "/TravellerLogin"/>
        // }
        ///console.log(this.props.email);
        return(
        <div className="container-fluid">
          {/* {redirectVar} */}
        <div id="login-container1" className="row" > 
        
                <input className="form-control" type = "textarea" value = {this.state.message} onChange = {(event) => {this.setState({ message : event.target.value })}}/>
            <button onClick={this.postMessage} className="btn btn-primary">Send Message</button>
            
        </div> 
        </div>
        );
    }
}
 export default Message;

import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import Navbarwhite from './Navbarwhite';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class OwnerMessage extends Component{
       constructor(props){
        super(props);
        this.state = {
            owneremail : "",
            propid : "",
            travelleremail : "",
            question : "",
            reply : "",
            writereply : ""
          };


          this.replymessage = this.replymessage.bind(this)
        }

      //Get Messages 
        componentDidMount(){
           
            var email = sessionStorage.getItem("Owneremail");        
            axios.get('http://localhost:3001/GetMessage',{
                params: {
                    id : email
                }})
                    .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    var {id, owneremail, propid, travelleremail, question,reply} = response.data;
                    
                    this.setState({
                        owneremail,
                        propid,
                        travelleremail,
                        question,
                        reply
                    })
                    console.log(this.state)
                });
        }

   
        replymessage(){
            console.log(this.state)

            var {owneremail, propid, travelleremail, question,reply} = this.state;
           
            const data = {
            owneremail,
            propid ,
            travelleremail ,
            question ,
            reply : this.state.writereply
           }

           console.log(data);
           //set the with credentials to true
           axios.defaults.withCredentials = true;
           //make a post request with the user data
           axios.post('http://localhost:3001/ReplyMessage',data)
               .then(response => {
                   console.log("Status Code  is : ",response.status);
                   console.log(response.data);
                   if(response.status === 200){
                           console.log('Replied successfully');
                   }else{
                       console.log('Replied failed !!! ');
   
                   }
        })
    }
    logout = () => {
        sessionStorage.removeItem("OwnerJWT");
        sessionStorage.removeItem("Owneremail");
        sessionStorage.removeItem("Ownerpassword");
      }


    render(){
        var reply;
        console.log(this.state);
        if(this.state.reply != ""){
            console.log("has reply")
         reply = <div class="container darker" style={{width :"394px", marginLeft : "83px"}}>
                    <h4>{this.state.reply}</h4>
                    </div> 
        }
        var message;

        if(this.state.question == ""){
            reply = <div>
            <img src={require("../image/message.png")} />
                       </div> 
           }
        console.log(this.state)

        // //redirect based on successful login
         let redirectVar = null;
        // if(sessionStorage.getItem("JWT") == null || undefined){
        // redirectVar = <Redirect to= "/TravellerLogin"/>
        // }
        ///console.log(this.props.email);
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

                    <div className="container" style={{width :"530px"}}>  
                    <ul className="col-md-8 list-group">
                         {message}

                         <h2> Messages</h2>

                    <div class="container"  style={{width :"480px"}}>
                    <h4>{this.state.question}</h4>
                    </div>
                    {reply}
                    
                    <div style = {{marginLeft : "158px"}}>
                    <input style = {{width : "321px"} } value={this.state.writereply} onChange={(e)=>{ this.setState({writereply : e.target.value}) }} className="form-control" />
                    <br></br>
                    <button style = {{marginLeft : "221px"}} className= "btn btn-primary" onClick={this.replymessage}>Reply </button>
                    </div>
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
 export default OwnerMessage;

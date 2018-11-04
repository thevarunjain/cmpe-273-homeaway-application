import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import Navbarwhite from './Navbarwhite';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Reply from "./Reply";


class OwnerMessage extends Component{
       constructor(props){
        super(props);
        this.state = {
            msg : [],
            owneremail : "",
            propid : "",
            travelleremail : "",
            question : "",
            reply : "",
            writereply : "",
            update : "",
          };
    this.updateState  = this.updateState.bind(this)

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
                    
                    this.setState({
                        msg : response.data
                    })
                   
                });
        }

       
    logout = () => {    
        sessionStorage.removeItem("OwnerJWT");
        sessionStorage.removeItem("Owneremail");
        sessionStorage.removeItem("Ownerpassword");
      }

      updateState(){
          console.log("update")
          console.log(this.state)

          this.setState({
              update : true
          })
          console.log(this.state)
      }


    render(){
            var replyerr;
            console.log("+++++++++")
            var msgbox = this.state.msg.map((msg)=>{


            if(msg.question == "" || null){
                replyerr = <div>
                <img  style={{maxWidth: "360px"}} src={require("../image/message.png")} />
                           </div> 
               }
    

            return(
                    <div className="col-md-7">

                    <div className="container" style={{width :"530px"}}>  
                    <ul className="col-md-8 list-group">

                        <h2> Message for {msg.propid}</h2>
                    {replyerr}
                    <div className="container"  style={{width :"380px"}}>
                    <h5>Traveller : {msg.travelleremail} </h5>
                    <h4>{msg.question}</h4>
                    </div>

                    {msg.reply != undefined ? <div className="container darker" style={{width :"394px", marginLeft : "83px"}}>
                        <h4>{msg.reply}</h4>
                        </div> : null}

                      <Reply data = {msg} status = {this.state.update} update = {this.updateState}/>   

                    </ul> 
                    </div>
                    </div>

            )

        }) 

        return(
            
            <div> 
            <Navbarwhite />
          <div className ="container-fluid">
            <div className="container-fluid">
             <ul className="nav nav-tabs" >
                 <li style= {{paddingLeft : "11%" }}><Link to="/OwnerDashboard">OwnerDashboard</Link></li>
                 <li style= {{paddingLeft : "11%" }}><Link to="/OwnerMessage">Owner Message</Link></li>
                 <li style= {{paddingLeft : "11%" }}><Link to='/' onClick={this.logout} >Logout</Link></li> 
             </ul>
             </div>

                    {msgbox}           
            </div>
    
            </div>
        )
    }
}
 export default OwnerMessage;

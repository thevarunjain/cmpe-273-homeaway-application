import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { submitownerlogin } from "../actions";
import { Field, reduxForm } from "redux-form";


class OwnerLogin extends Component{
    //    //call the constructor method
    //    constructor(props){
    //     //Call the constrictor of Super class i.e The Component
    //     super(props);
    //     //maintain the state required for this component
    //     this.state = {
    //         email : "",
    //         password : "",
    //         authFlag : ""
    //     }
    // }

    // submitLogin = (e) => {
    //     var headers = new Headers();
    //     const data = {
    //         email : this.state.email,
    //         password : this.state.password
    //     }
    //     console.log(data);
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     axios.post('http://localhost:3001/OwnerLogin',data)
    //         .then(response => {
    //             console.log("Status Code  is : ",response.status);
    //             console.log(response.data);
    //             if(response.status === 200){
    //                 this.setState({
    //                     authFlag : true
    //                 })
    //             }
    //             else{
    //                 this.setState({
    //                    authFlag : false,
    //                    email : "",
    //                    password : ""
    //                 })
                   
                
    //             }
    //         });
    // }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type={field.type} {...field.input} />
            <div className="text-help" stlye={{color: "red", textalign : "center"}}>
              {touched ? error : ""}
            </div>
          </div>
        );
      }
    
        onSubmit(values) {
            this.props.submitownerlogin(values);
          }

    render(){
        const { handleSubmit } = this.props;

        //redirect based on successful login
        let redirectVar = null;
        if(this.props.owner.status === 200){
         redirectVar =  <Redirect to='/OwnerDashboard' />
        }
        if(cookie.load('cookieOwner')){
            return (
                <Redirect to='/OwnerDashboard'/>
            )
        }
        return(
        
        <div>
        {redirectVar}
        
        <div id="login-container-fluid" className="row" style={{backgroundColor: "#f5f5f5", height : "650px"}} >
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

        <div className="col-md-6">
        <div className="ownerloginimage">
            <img src={require('../image/ownerlogin.png')}></img>
        </div>
            </div>
        

        <div className="col-md-6">
        <div className ="form-container1">
       
            <div className="login-form  traveler">
                <div class="heading1">
                <p className="heading">Owner login</p>
                </div><br></br>
    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      
      <Field
        label="Email"
        name="email"
        type="email"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />

      <Field
        label="Password"
        name="password"
        type="password"
        component={this.renderField}
      />

      <button type="submit" className="loginbutton">Submit</button>
    </form>

                <div className="heading1">
                <div class="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me" /> Keep me signed in
                    </label>
                </div><br></br>
                </div><br></br>
            


                    
            </div>
    </div>
    </div>
        </div>
        </div>
        );
    }
}
 
function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.email) {
      errors.email = "Enter an email";
    }
    if (!values.password) {
      errors.password = "Enter password";
    }
  
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }


function mapStateToProps(state){
  return{
    owner : state.ownersignup
  };
}

 export default reduxForm({
    validate,
    form: "NewLoginForm" 
  })(connect(mapStateToProps, { submitownerlogin })(OwnerLogin));
  
 

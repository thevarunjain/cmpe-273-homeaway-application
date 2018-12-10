import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { submitownerlogin } from "../actions";
import { Field, reduxForm } from "redux-form";
import Navbarwhite from './Navbarwhite';


class OwnerLogin extends Component{
  
  renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
    
        return (
          <div className={className}>
            <label>{field.label}</label>
            <input className="form-control" type={field.type} {...field.input} required />
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
        console.log(this.props.owner.status)
        console.log(sessionStorage.getItem("OwnerJWT"))        
        if((this.props.owner.status === 200 || 202) && (sessionStorage.getItem("OwnerJWT")!=null || undefined)){
         redirectVar =  <Redirect to='/OwnerDashboard' />
        }

        var errBlock;
        this.props.owner.status == 201 ?  errBlock =  <div className="login-err">
        <h4 style= {{color : "white", textAlign : "center"}}>Username or password incorrect</h4>
        </div> : null;

        

        return(
        
        <div>
        {redirectVar}
        
        <div id="login-container-fluid" className="row" style={{backgroundColor: "#f5f5f5", height : "650px"}} >
        <Navbarwhite />


        <div className="col-md-6">
        <div className="ownerloginimage">
            <img src={require('../image/ownerlogin.png')}></img>
        </div>
            </div>
        

        <div className="col-md-6">
        <div className ="form-container1">
       
            <div className="login-form  traveler">
                <div className="heading1">
                <p className="heading">Owner login</p>
                </div><br></br>
                {errBlock}
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
                <div className="checkbox mb-3">
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
  
 

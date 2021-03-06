import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { submitlogin } from "../actions";
import { Field, reduxForm } from "redux-form";
import Navbarwhite from './Navbarwhite';  

class TravellerLogin extends Component{

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
  //  const style = touched && error ? 'borderColor = "red"' : "";
    return (
      <div className={className} >
        {/* //<label>{field.label}</label> */}
        <input className="form-control" type={field.type} {...field.input} placeholder = {field.label} required/>
        <div className="text-help" style={{color: "red", textAlign : "center", padding : "5px", fontWeight : "bold" }}>
          {touched ? error : ""}
        </div>
      </div>
    );
  }



    onSubmit(values) {
        this.props.submitlogin(values);
      }

    render(){
        var errBlock = ""; 
        var red;
        var redirectVar ;
        console.log(this.props.traveller.status)
          if(sessionStorage.getItem("JWT") != null){
            redirectVar = <Redirect to= "/TravellerHomepage"/>
          }

        this.props.traveller.status == 201 ?  errBlock =  <div className="login-err">
        <h4 style= {{color : "white", textAlign : "center"}}>Username or password incorrect</h4>
        </div> : null;

        this.props.traveller.status == 202 ?  errBlock =  <div className="login-err">
        <h4 style= {{color : "white", textAlign : "center"}}>No user found, sign up</h4>
        </div> : null;

        red = this.props.traveller.status == 200 && sessionStorage.getItem("JWT") != null || undefined ? <Redirect to='/TravellerHomepage'/> : null
        const { handleSubmit } = this.props;

        return(    
         <div>
         {redirectVar}
         {red}
        <div id="login-container" className="row" >
        <Navbarwhite />
        
        <div className="panel-heading">
                    <h1>Log in to HomeAway</h1>
                    <span>Need an account ? </span><Link to="/TravellerSignUp">Sign up</Link>
        </div>
        <div className ="form-container">
            <div className="login-form  traveler">
                <div className="heading1">
                <p className="heading">Account login</p>
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
    traveller : state.login
  };
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({submitlogin},dispatch);
// }

 export default reduxForm({
    validate,
    form: "NewLoginForm" 
  })(connect(mapStateToProps, {submitlogin })(TravellerLogin));
  
 
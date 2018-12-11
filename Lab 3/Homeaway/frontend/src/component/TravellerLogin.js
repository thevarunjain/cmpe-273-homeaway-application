import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { submitlogin } from "../actions";
import { Field, reduxForm } from "redux-form";
import Navbarwhite from './Navbarwhite';  
import {travellerLogin} from "../mutation/mutations"
import { compose, graphql, withApollo } from 'react-apollo';

class TravellerLogin extends Component{
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password : ""
    }
  }


    async onSubmit(e) {
      e.preventDefault();
      console.log(this.state);

    var result =   await this.props.travellerLogin({
            variables: {
              email : this.state.email,
              password : this.state.password
            }
          });
          console.log(result)
        // this.props.submitlogin(values);
      }

    render(){
        var errBlock = ""; 
        var red;
        var redirectVar ;
      
      
        // console.log(this.props.traveller.status)
          if(sessionStorage.getItem("JWT") != null){
            redirectVar = <Redirect to= "/TravellerHomepage"/>
          }


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
       
    <form onSubmit={this.onSubmit.bind(this)}>
      <input
        label="Email"
        name="email"
        type="email"
        onChange={e => this.setState({ email: e.target.value })}

        component={this.renderField}            // this funtion will return jsx for the field. 
      />

      <input
        label="Password"
        name="password"
        type="password"
        onChange={e => this.setState({ password: e.target.value })}

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


  
  export default compose(
    // graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(travellerLogin, { name: "travellerLogin" })
  )(withApollo(TravellerLogin));
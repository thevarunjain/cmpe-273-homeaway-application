import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { submitsignup } from "../actions";
import { Field, reduxForm } from "redux-form";
import Navbarwhite from "../component/Navbarwhite"
import {travellerSignUp} from "../mutation/mutations"
import { compose, graphql, withApollo } from 'react-apollo';



class TravellerSignUp extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstname : "",
      lastname : "",
      email : "",
      password : ""
    }
  }
   
renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} required />
        <div className="text-help" style={{color: "red", textAlign : "center", padding : "5px", fontWeight : "bold" }}>
          {touched ? error : ""}
        </div>
      </div>
    );
  }
    onSubmit(e) {
      e.preventDefault();
      console.log(this.state);

    var result =  this.props.travellerSignUp({
            variables: {
              email : this.state.email,
              password : this.state.password,
              firstname : this.state.firstname,
              lastname : this.state.lastname,
            }
          });
          console.log(result)

         // window.alert("Signed-up successfully!");
         // this.props.history.push("/travelerlogin");
      }


    render(){
        // const { handleSubmit } = this.props;
      var errBlock ;
        //redirect based on successful login
        var redirectVar ;
        // if(sessionStorage.getItem("JWT")!= undefined || null ){
        //   redirectVar = <Redirect to= "/TravellerHomepage"/>
        // }
        // if(this.props.signup.status === 201){

        //   errBlock =  <div className="login-err">
        //   <h4 style= {{color : "white", textAlign : "center"}}>User Already Exist</h4>
        //   </div>
        // }else if(this.props.signup.status==200){
        //   return <Redirect to = "/TravellerLogin" />
        // }

        return(
        
         <div id="login-container" className="row">
         {/* {redirectVar} */}
        <div id="login-container" className="row" >
     {/* <Navbarwhite /> */}
        
        <div className="panel-heading">
                    <h1>Sign up for HomeAway</h1>
                    <span>Already have an account  </span><Link to="TravellerLogin"> Log in </Link>
        </div>
        <div className ="form-container">
            <div className="login-form  traveler">
                <div className="heading1">
                <p className="heading">Account SignUp</p>
                </div><br></br>
                {errBlock}
    
      <form onSubmit={this.onSubmit.bind(this)}>
        <input
        label="First Name"
        name="firstname"
        type="text"
        onChange={e => this.setState({ firstname: e.target.value })}
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
      <input
        label="Last Name"
        name="lastname"
        type="text"
        onChange={e => this.setState({ lastname: e.target.value })}
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
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
    } // end of render
}

// function validate(values) {

//     const errors = {};
  
//     // Validate the inputs from 'values'
//     if (!values.firstname) {
//         errors.firstname = "Enter First Name";
//       }
//       if (!values.lastname) {
//         errors.lastname = "Enter Last Name";
//       }
//     if (!values.email) {
//       errors.email = "Enter an email";
//     }
//     if (!values.password) {
//       errors.password = "Enter a password";
//     }
  
//     // If errors is empty, the form is fine to submit
//     // If errors has *any* properties, redux form assumes form is invalid
//     return errors;
//   }


// function mapStateToProps(state){
//   return{
//     signup : state.signup
//   };
// }

//  export default reduxForm({
//     validate,
//     form: "NewLoginForm" 
//   })(connect(mapStateToProps, { submitsignup })(TravellerSignUp));
  
// export default graphql(travellerSignUp, { name: "travellerSignUp" })(
//   TravellerSignUp
// );

// export default graphql(travellerSignUp, { name: "travellerSignUp" })(withApollo(
//   TravellerSignUp)
// );

export default compose(
  // graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(travellerSignUp, { name: "travellerSignUp" })
)(withApollo(TravellerSignUp));

// export default (compose(
//   (connect(mapStateToProps, { submitsignup })), reduxForm({
//     validate,
//     form: "NewLoginForm" 
//   }),
//   graphql(travelerSignUp),
// ))(TravellerSignUp);
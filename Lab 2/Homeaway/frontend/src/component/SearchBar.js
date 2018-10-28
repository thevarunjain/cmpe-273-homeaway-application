import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';

import {Redirect} from 'react-router';
import SearchProperty from './SearchProperty';

import { connect } from "react-redux";
import { submitsearch } from "../actions";
import { Field, reduxForm } from "redux-form";


class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      result : "",
      Flag :"",
      place : "",
      dateTo : "",
      dateFrom : "",
      guest : "",
      passon :""
    }}

    
  renderField(field) {
    const { meta: { touched, error } } = field;
    //const className = `form-group ${touched && error ? "has-danger" : ""}`;

    if(true){
      return (
      <div className="searchbox">
        <input className="form-control" type={field.type} {...field.input}  placeholder = {field.placeholder} />
        <div className="text-help" style={{color: "red", textalign : "center"}}>
          {touched ? error : ""}
        </div>
      </div>
    );
  }else{
    return (
      <div className="searchbox">
        <input className="form-control" type={field.type} {...field.input}  placeholder = {field.x} />
        <div className="text-help" style={{color: "red", textalign : "center"}}>
          {touched ? error : ""}
        </div>
      </div>
    );
  }
  }



    search(values) {
        this.props.submitsearch(values);
      }

  
  render() {
    const { handleSubmit } = this.props;

    let redirectVar = null;
    if(!cookie.load('cookie')){
    redirectVar = <Redirect to= "/TravellerLogin"/>
    }
    console.log(this.props.searchprop)
    if(this.props.searchprop.status == 200){
      return(
          <Redirect to="/SearchProperty" />
        )
  }

    return (
<div className ="container-fluid">
{Redirect}

<div className="homesearch">

  <form className="form-inline" onSubmit={handleSubmit(this.search.bind(this))}>
     
      <Field
        placeholder = "Las Vegas, CA"
       // x = {this.state.searchproperty.place}
        name="place"
        type="text"
      //  className = "form-control"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
      <Field
        placeholder = "Arrival Date"
       // x = {this.state.searchproperty.dateto}
        name="datefrom"
        type="date"
       // className = "form-control"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
      <Field
        placeholder = "Departure Date"
     //   x = {this.state.searchproperty.datefrom}
        name="dateto"
        type="date"
       // className = "form-control"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
      <Field
        placeholder = "Guest"
     //   x = {this.state.searchproperty.guest}
        name="guest"
        type="text"
       // className = "form-control"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
       <div className="searchbox" >
      <button type="submit" style ={{width : "160px", borderColor : "blue", borderRadius :" 50px"}} className="btn btn-primary mb-2">Search</button>
      </div>
    </form>

    
      </div>
</div>
     
      )
  }
}

function mapStateToProps(state){
  return{
    searchprop : state.searchproperty
  };
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({submitlogin},dispatch);
// }

 export default reduxForm({
   // validate,
    form: "NewLoginForm" 
  })(connect(mapStateToProps, {submitsearch})(SearchBar));

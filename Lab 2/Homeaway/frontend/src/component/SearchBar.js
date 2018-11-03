import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import {Redirect} from 'react-router';
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
      passon :"",

    }}
    

    
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

      return (
      <div className="searchbox">
        <input className="form-control" type={field.type} {...field.input} required placeholder = {field.placeholder}/>
        <div className="text-help" >
          {touched ? error : ""}
        </div>
      </div>
    );
  
  }



    search(values) {
      console.log(values);
        this.props.submitsearch(values);
      }

  
  render() {
    const { handleSubmit } = this.props;

    let redirectVar = null;
    if(sessionStorage.getItem("JWT") == null || undefined){
    redirectVar = <Redirect to= "/TravellerLogin"/>
    }
    if(this.props.searchprop.status == 200){
      console.log(this.props.searchprop);
     sessionStorage.setItem("datefrom",this.props.searchprop.datefrom);
     sessionStorage.setItem("dateto",this.props.searchprop.dateto);
     sessionStorage.setItem("accomodation",this.props.searchprop.accomodation);
     sessionStorage.setItem("place", this.props.searchprop.place);

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
        name="place"
        type="text"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
      <Field
        placeholder = "Arrival Date"
        
        name="datefrom"
        type="date"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
      <Field
        placeholder = "Departure Date"
        name="dateto"
        type="date"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
      <Field
        placeholder = "Guest"
        name="guest"
        type="text"
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

 export default reduxForm({
    form: "NewLoginForm" 
  })(connect(mapStateToProps, {submitsearch})(SearchBar));
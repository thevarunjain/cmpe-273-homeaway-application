import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import AddPhotos from './AddPhotos';
import { connect } from "react-redux";
import { submitproperty } from "../actions";
import Navbarwhite from './Navbarwhite';
import { formValueSelector } from 'redux-form'; 
import { Field, reduxForm } from "redux-form";
import { number } from 'prop-types';


class ListProperty extends Component{
       //call the constructor method
       constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
          address : '',
          headline :'',
          description: '',
          propertytype : '',
          bedroom:'',
          accomodation:'',
          bathroom:'',
          availfrom : '',
          availto : '',
          rate : '',
          minstay : '',   
          selectedFile: '',
          imageView : '',
          files : [],
          from : "",
          to :""
        };
    }
 
   

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

   
    
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} min = {field.type == "number" ? field.min : null} max = {field.type == "number" ? field.max : null} />
        <div className="text-help" stlye={{color: "red", textalign : "center"}}>
          {touched ? error : ""}
        </div>
      </div>
    );
  }



    onsubmitproperty(values) {
      
        values.files = this.state.files;
        values.email = sessionStorage.getItem("Owneremail")
        console.log(values)
        this.props.submitproperty(values);
      }


    render(){

        let redirectVar = null;
        if(!sessionStorage.getItem("OwnerJWT")){
            return(
                <Redirect to="/OwnerLogin" />
              )
        }
        console.log(this.props.property.status)
        if(this.props.property.status == 200){
          return(
            <Redirect to="/OwnerDashboard"/ >
          )
        }

       
      const { description, selectedFile } = this.state;

      const { handleSubmit } = this.props;
                          
          return(
        <div id="login-container" className="row" >
        {/* {redirect} */}
            <Navbarwhite />

        <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2" style={{padding:"20px", margin:"30px"}}>
                        <ul className="nav flex-column">
                            <li className="nav-item" style={{padding:"10px"}}><a href="" className="active nav-link" data-toggle="pill"
                                                        data-target="#location">Location</a></li>
                            <li className="nav-item"  style={{padding:"10px"}}><a className="nav-link" href="" data-toggle="pill"
                                                        data-target="#details">Details</a></li>
                            <li className="nav-item" style={{padding:"10px"}}><a href="" className="nav-link" data-toggle="pill"
                                                        data-target="#photos">Photos</a></li>
                            <li className="nav-item" style={{padding:"10px"}}><a href="" className="nav-link" data-toggle="pill"
                                                        data-target="#pricing">Pricing</a></li>
                            <li className="nav-item" style={{padding:"10px"}}><a href="" className="nav-link" data-toggle="pill"
                                                        data-target="#submit">Final Step</a></li>
                        </ul>
                    </div>
    <form onSubmit={handleSubmit(this.onsubmitproperty.bind(this))}>

                    
                    <div className="col-md-6">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="location" role="tabpanel">



  <div className="progress">
  <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
                           

   <Field
        label="Address"
        name="address"
        type="text"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
                            </div>

 
                            <div className="tab-pane fade" id="details" role="tabpanel">
                            <div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>

      <Field
        label="Headline"
        name="headline"
        type="text"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
      <Field
        label="Description"
        name="description"
        type="text"
        component={this.renderField}            // this funtion will return jsx for the field. 
      /><Field
        label="Property Type"
        name="propertytype"
        type="text"
        component={this.renderField}            // this funtion will return jsx for the field. 
      /><Field
        label="Bedroom"
        name="bedroom"
        type="number"
        min = "0"
        max = "10"
        component={this.renderField}            // this funtion will return jsx for the field. 
      /><Field
        label="Accomodation"
        name="accomodation"
        type="number"
        min = "0"
        max = "10"
        component={this.renderField}            // this funtion will return jsx for the field. 
      /><Field
        label="Bathroom"
        name="bathroom"
        type="number"
        min = "0"
        max = "10"
        component={this.renderField}            // this funtion will return jsx for the field. 
      />
 
                            </div>



                            <div className="tab-pane fade" id="photos" role="tabpanel">
                            <div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>             
<AddPhotos  setPhotos={files => this.setState({files})}/> 
                            </div>


                            <div className="tab-pane fade" id="pricing" role="tabpanel">
                            <div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
 <ul className="nav flex-column">



<Field
label="Avail From "
name="availfrom"
type="date"
component={this.renderField} // this funtion will return jsx for the field.
/><Field
label="Avail to"
name="availto"
type="date"
component={this.renderField} // this funtion will return jsx for the field.
/>
 



<Field
label="Rate"
name="rate"
type="text"
component={this.renderField} // this funtion will return jsx for the field.
/><Field
label="Min Stay"
name="minstay"
type="text"
component={this.renderField} // this funtion will return jsx for the field.
/>

</ul>
</div>

<div className="tab-pane fade" id="submit" role="tabpanel">
 
<div className="progress">
  <div className="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>




                           <div className="searchbox">
      <button type="submit"  className="btn btn-primary" style={{width: "148px"}}>Post Property</button>
      </div>
                            </div>
                        </div>

                    </div>
                    </form>
                </div>
            </div>  
        </div>
       
  
          );
    }
}

function mapStateToProps(state){
    return{
        property : state.submitproperty,
        owner : state.ownersignup,
        form  : state.formReducer
    };
  }

export default reduxForm({
   // validate,
    form: "NewLoginForm" 
  })(connect(mapStateToProps, {submitproperty })(ListProperty));
  
 

import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import AddPhotos from './AddPhotos';


class TravellerLogin extends Component{
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
          files : []
        };
       // this.cal = this.cal.bind(this);
    }
 
    //submit Login handler to send a request to the node backend
    postproperty = (e) => {
      var headers = new Headers();
      const data = {
        address : this.state.address,
        headline : this.state.headline,
        description: this.state.description,
        propertytype : this.state.propertytype,
        bedroom: this.state.bedroom,
        accomodation:this.state.accomodation,
        bathroom:this.state.bathroom,
        availfrom : this.state.availfrom,
        availto : this.state.availto,
        rate : this.state.rate,
        minstay : this.state.minstay, 
        email : cookie.load('cookieOwner')  
      }
      const  d  = Object.assign({},this.state);

      //const { files } = this.state;
      let formData = new FormData();

      console.log(d.files[0]);

      formData.append('headline', this.state.headline);
      formData.append('propdata', JSON.stringify(data));
      console.log(d.files);
      for(var key in d.files)
      {
          formData.append('proppics', d.files[key]);
      }


      console.log(formData.proppics);


      console.log(data);
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.post('http://localhost:3001/ListProperty',formData)
          .then(response => {
              console.log("Status Code  is : ",response.status);
              console.log(response.data);
              if(response.status === 200){
                  console.log("in 200 ");
                  this.setState({
                      authFlag : true
                  })
              }
              else if(response.status === 201){
                  this.setState({
                     authFlag : false,
                  })
              }
          });
  }

    render(){
        let redirect = null;
        if(!cookie.load('cookieOwner')){
        redirect = <Redirect to= "/OwnerLogin"/>
        }

        let redirectVar = null;
        if(this.state.authFlag==true){
          return(
            <Redirect to="/OwnerDashboard" />
          )
        }
       
      const { description, selectedFile } = this.state;

                          
          return(
        <div id="login-container" className="row" >
        {redirect}
     

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
                    <div className="col-md-6">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="location" role="tabpanel">

                            <div class="progress">
  <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
                            <div className="form-group">
  <input onChange = {(event) => {this.setState({ address : event.target.value })}} value={this.state.adress} type="text" className="form-control" placeholder="Address" ></input>
  </div>
                            </div>

                            <div className="tab-pane fade" id="details" role="tabpanel">
                            <div class="progress">
  <div class="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
                              <div className="form-group">
  <input onChange = {(event) => {this.setState({ headline : event.target.value })}} value={this.state.headline} type="text" className="form-control"   placeholder="Headline"/>
  </div>
  <br></br>
  <div className="form-group">
  <input onChange = {(event) => {this.setState({ description : event.target.value })}} value={this.state.description} type="text" className="form-control"  placeholder="Description"/>
  </div>
  <div className="form-group">
  <input onChange = {(event) => {this.setState({ propertytype : event.target.value })}} value={this.state.propertytype} type="text" className="form-control"  placeholder="Property Type"/>
  </div>
  <div className="form-group">
  <input onChange = {(event) => {this.setState({ bedroom : event.target.value })}} value={this.state.bedroom} type="text" className="form-control"  placeholder="Bedroom"/>
  </div>
  <div className="form-group">
  <input onChange = {(event) => {this.setState({ accomodation : event.target.value })}} value={this.state.accomodation} type="text" className="form-control"  placeholder="Accomodation"/>
  </div>
  <div className="form-group">
  <input onChange = {(event) => {this.setState({ bathroom : event.target.value })}} value={this.state.bathroom} type="text" className="form-control"  placeholder="Bathroom"/>
  </div>
                            </div>



                            <div className="tab-pane fade" id="photos" role="tabpanel">
                            <div class="progress">
  <div class="progress-bar" role="progressbar" style={{width: "50%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>             
<AddPhotos  setPhotos={files => this.setState({files})}/>
  
                            </div>


                            <div className="tab-pane fade" id="pricing" role="tabpanel">
                            <div class="progress">
  <div class="progress-bar" role="progressbar" style={{width: "75%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
 <ul className="nav flex-column">
 <li className="nav-item"><a href="" className="nav-link" data-toggle="pill" data-target="#availability">Available</a></li>
 <div className="row">

 <div className="tab-pane fade" id="availability" role="tabpanel">
  <div className="searchbox">
      <input type="date" className="form-control" id="dateTo" placeholder="Available from" onChange ={(e) => { this.setState({availfrom : e.target.value})  }}/>
      </div>
      <div className="searchbox">
      <input type="date" className="form-control" id="dateFrom" placeholder="Available to" onChange ={(e) => { this.setState({availto : e.target.value})  }}/>
      </div>
 </div>
 </div>

 <li className="nav-item"><a href="" className="nav-link" data-toggle="pill" data-target="#rates">Rates</a></li>
 <div className="row">

 <div className="tab-pane fade" id="rates" role="tabpanel">
<div className="searchbox"> 
      <input type="text" className="form-control" id="guest" placeholder="Rate" onChange ={(e) => { this.setState({rate : e.target.value})  }}/>
      </div>
      <div className="searchbox"> 
      <input type="text" className="form-control" id="guest" placeholder="Minimum Stay" onChange ={(e) => { this.setState({minstay : e.target.value})  }}/>
      </div>
</div>
</div>



 </ul>
                           

                          </div>
                           <div className="tab-pane fade" id="submit" role="tabpanel">
                           <div class="progress">
  <div class="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>




                           <div className="searchbox">
      <button type="submit"  onClick = {this.postproperty} className="btn btn-primary" style={{width: "148px"}}>Post Property</button>
      </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
       
  
          );
    }
}
 export default TravellerLogin;
 

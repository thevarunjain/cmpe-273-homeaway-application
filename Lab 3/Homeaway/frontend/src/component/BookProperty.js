import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import Navbarwhite from "../component/Navbarwhite";
import SearchBar from "../component/SearchBar"
import {ROOT_URL} from "../config";



class BookProperty extends Component {
       constructor(props){
           super(props);
           this.state = {
            ip : [],
            flag : '',
            rate :"",
            datefrom :'',
            dateto :'',
            guest : "",
            total  : "",
            image : [] ,
            booked : '',
            final : '',
            message : ""
           }
                   }  
           componentWillMount(){
     
          let imagePreview = [];
          var properties = this.props.bookproperty;
          console.log(properties);
    
  axios.post(`${ROOT_URL}/getpropertypic/${properties.headline}`)
  .then(response => {
    console.log(properties.headline);

      console.log("Imgae Res : ",response);
//imagePreview = 'data:image/jpg;base64, ' + response.data;

      this.setState(  
        { ip : this.state.ip.concat(response.data)}              
      )

  })
  ;
}
      postMessage = (e) => {
        e.preventDefault();
           const data = {
            owneremail : this.props.bookproperty.ownerid,
            propid :  this.props.bookproperty.headline ,
            travelleremail : sessionStorage.getItem("email"),
            question :this.state.message,
          }
          console.log(data);
          //set the with credentials to true
          axios.defaults.withCredentials = true;
          //make a post request with the user data
          axios.post(`${ROOT_URL}/PostMessage`,data)
              .then(response => {
                  console.log("Status Code  is : ",response.status);
                  console.log(response.data);
                  if(response.status === 200){
                          console.log('Post successfully');
                  }else{
                      console.log('Post failed !!! ');
  
                  }
              });
}

      book(pro){
  console.log("in book");

 const data = {

   availfrom : new Date(this.props.datefrom),
   availto : new Date(this.props.dateto),
   id : this.props.bookproperty.propid,
   owneremail : this.props.bookproperty.ownerid,
   travelleremail : sessionStorage.getItem("email"),
   headline : this.props.bookproperty.headline
 }
 

 /// console.log(pro);
  axios.post(`${ROOT_URL}/BookProperty`,data)
  .then(response => {
      console.log("Status Code  is : ",response.status);
      console.log(response.data);
      if(response.status === 200){
              console.log('Changed saved successfully');
              this.setState({
               booked : true
              })
      }else{
          console.log('Changed failed !!! ');

      }
  });
  }

    render(){  

      let redirectVar = null;
      if(sessionStorage.getItem("JWT") == null || undefined){
      redirectVar = <Redirect to= "/TravellerLogin"/>
      }
      let redirectbook = null;
      if(this.state.booked){
      redirectbook = <Redirect to= "/TravellerTrip"/>
      }

  //  var properties = this.props.location.state.result;
    var properties = this.props.bookproperty;
    // console.log(this.props.datefrom);
    // var st = this.props.datefrom;
    // var dttt = new Date(st);
    // console.log(dttt);
    var dt = new Date(new Date(this.props.datefrom));
        console.log(dt);
       var d1 = dt.getDate();
       console.log(d1);
       var d2 = dt.getMonth(); 
       console.log(d2);
       var d3 = dt.getFullYear();
       console.log(d3);
    
      var dt1 = new Date(new Date(this.props.dateto));
      console.log(dt1);
      var d4 = dt1.getDate();
      console.log(d4);
      var d5 = dt1.getMonth(); 
      console.log(d5);
      var d6 = dt1.getFullYear();
      console.log(d6);
      
      var res = Math.abs(dt1 - dt) / 1000;
      var days = Math.floor(res / 86400);
    

  
        

    return(
      
   
      <div className ="container-fluid" className="row" >
      {redirectVar}
      {redirectbook}
        <Navbarwhite />

        
      <div className="container-fluid" style={{padding:"10px"}}>  
      <div className="row">
      <div className="col-md-7" >
      
      <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{    width: "750px"}}>
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
      <li data-target="#myCarousel" data-slide-to="3"></li>
    </ol>

    <div className="carousel-inner" role="listbox">

      <div className="item active">
        <img style={{height:"450px", width:"750px"}}  src={'data:image/jpg;base64, ' + this.state.ip[0]} alt="Chania" width="460" height="345" />
        <div className="carousel-caption">
          <h3 style = {{color : "white"}}>{properties.headline}</h3>
          <p style = {{color : "white"}}>{properties.description}</p>
        </div>
      </div>

      <div className="item">
        <img style={{height:"450px", width:"750px"}} src = {'data:image/jpg;base64, ' + this.state.ip[1] } alt="Chania" width="460" height="345"/>
        <div className="carousel-caption">
        <h3 style = {{color : "white"}}>{properties.headline}</h3>
          <p style = {{color : "white"}}>{properties.description}</p>
        </div>
      </div>
    
      <div className="item">
        <img style={{height:"450px", width:"750px"}} src={'data:image/jpg;base64, ' + this.state.ip[2]} alt="Flower" width="460" height="345"/>
        <div className="carousel-caption">
        <h3 style = {{color : "white"}}>{properties.headline}</h3>
          <p style = {{color : "white"}}>{properties.description}</p>
        </div>
      </div>

      <div className="item">
        <img style={{height:"450px", width:"750px"}} src={'data:image/jpg;base64, ' + this.state.ip[3]} alt="Flower" width="460" height="345"/>
        <div className="carousel-caption">
        <h3 style = {{color : "white"}}>{properties.headline}</h3>
          <p style = {{color : "white"}}>{properties.description}</p>
        </div>
      </div>
  
    </div>

    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>

<div className="col-md-4" style={{border: "1px solid gainsboro"}}>
     <div >
           
           <div className="row" style={{border: "1px solid gainsboro"}} >
           <div className="col-md-8" >
           <div className ="price">

           <h3>Cost Per Night $ {properties.rate}</h3>
           </div>
            </div>
           </div> 

          <br></br>

            <div className="row">
            <div className ="col-md-12">
            <h4> Your date are <b><p style ={{color : "green"}}>Available!</p></b> </h4>     
           
            </div>
            </div>
            <br></br>
            
            <div className="row">

            <div className="col-md-6" style={{border: "1px solid gainsboro"}}>
            <h4> Booking from :<br></br> {d2}/{d1}/{d3}</h4>
            </div>
            
            <div className="col-md-6" style={{border: "1px solid gainsboro"}}>
            <h4> Booking to : <br></br> {d5}/{d4}/{d6}</h4>
            </div>

            </div>


            <div className="row">
            <div className="col-md-12" style={{border: "1px solid gainsboro",padding : "10px"}}>
            <h4>Guest  : {properties.accomodation}</h4>
            </div>
            </div>
            
            <div className="row">
            <div className="col-md-12" style={{padding : "10px",border: "1px solid gainsboro"}}>
            <h4>Total Amount : $  {(Number(properties.rate)*(days))}</h4>
            </div>
            </div>

            <div className="row" style={{marginLeft : "155px",padding : "12px"}}>
            <div className="searchbox"> 
            <button onClick= {(e)=>this.book(properties)} style ={{width : "137px",  height : "44px"}}className="btn btn-primary">BOOK NOW</button>
            </div>
            </div>

            <div className="row" style={{border: "1px solid gainsboro"}}>
            
            </div>

              
      

     </div>
     </div>
    
     

     
     </div> 
     <div className ="form-container">
            <div className="login-form  traveler" style ={{ marginLeft: "304px", width: "519px",marginTop: "-30px"}}>

        <h3 style={{textAlign : "center"}} >Ask a question</h3>
        <input className="form-control" type = "textarea" value = {this.state.message} onChange = {(event) => {this.setState({ message : event.target.value })}}/>
      <br></br>
        <button onClick={this.postMessage} className="btn btn-primary" style={{width : "160px",marginLeft : "170px"}}>Send Message</button>
               
        </div> 
        </div> 
     
    </div>

     </div>
     

    )

    }
}
function mapStateToProps(state){
  return{
    traveller : state.login,
    bookproperty : state.bookproperty,
     datefrom : state.searchproperty.datefrom,
     dateto : state.searchproperty.dateto,
     accomodation : state.searchproperty.accomodation,
     place : state.searchproperty.place,
  };
}
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({submitlogin},dispatch);
// }

export default connect (mapStateToProps)(BookProperty);
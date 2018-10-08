import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './NavBar';
import SearchBar from './SearchBar';

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
            final : ''

           }
                   }  
           componentWillMount(){


          var properties = this.props.location.state.result;
          console.log(properties);
          let imagePreview = [];
          var properties = this.props.location.state.result;
    
  axios.post('http://localhost:3001/getpropertypic/'+`${properties.headline}`)
  .then(response => {
    console.log(properties.headline);

      console.log("Imgae Res : ",response);
//imagePreview = 'data:image/jpg;base64, ' + response.data;

      this.setState(  
        { ip : this.state.ip.concat(response.data)}              
      )
     //console.log(this.state.ip)      
    // console.log("sssssssssssssssssssssssssssssssssssssssssssssssssss")      

  })
  ;
  

}

           
      book(pro){
        console.log("in book");
       // var properties = this.props.location.state.result;
       const data = {
          availfrom : pro.availfrom,
         availto : pro.availto,
         id : pro.id,
         email : cookie.load('cookie')
       }
       

        console.log(pro);
        axios.post('http://localhost:3001/BookProperty',pro)
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
      if(!cookie.load('cookie')){
      redirectVar = <Redirect to= "/TravellerLogin"/>
      }
      let redirectbook = null;
      if(this.state.booked){
      redirectbook = <Redirect to= "/TravellerTrip"/>
      }

    var properties = this.props.location.state.result;
    
    var dt = new Date(properties.availfrom);
        console.log(dt);
       var d1 = dt.getDate();
       console.log(d1);
       var d2 = dt.getMonth(); 
       console.log(d2);
       var d3 = dt.getFullYear();
       console.log(d3);
    
      var dt1 = new Date(properties.availto);
      console.log(dt);
      var d4 = dt1.getDate();
      console.log(d1);
      var d5 = dt1.getMonth(); 
      console.log(d2);
      var d6 = dt1.getFullYear();
      console.log(d3);

  
        

    return(
      
   
      <div className ="container-fluid" >
      {redirectVar}
      {redirectbook}
        <Navbar />
        <SearchBar />

      <div className="container-fluid" style={{padding:"10px"}}>  
      <div class="row">
      <div className="col-md-7" >
      
      <div id="myCarousel" class="carousel slide" data-ride="carousel" style={{    width: "750px"}}>
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
      <li data-target="#myCarousel" data-slide-to="3"></li>
    </ol>

    <div class="carousel-inner" role="listbox">

      <div class="item active">
        <img style={{height:"450px", width:"750px"}}  src={'data:image/jpg;base64, ' + this.state.ip[0]} alt="Chania" width="460" height="345" />
        <div class="carousel-caption">
          <h3 style = {{color : "white"}}>{properties.headline}</h3>
          <p style = {{color : "white"}}>{properties.description}</p>
        </div>
      </div>

      <div class="item">
        <img style={{height:"450px", width:"750px"}} src = {'data:image/jpg;base64, ' + this.state.ip[1] } alt="Chania" width="460" height="345"/>
        <div class="carousel-caption">
        <h3 style = {{color : "white"}}>{properties.headline}</h3>
          <p style = {{color : "white"}}>{properties.description}</p>
        </div>
      </div>
    
      <div class="item">
        <img style={{height:"450px", width:"750px"}} src={'data:image/jpg;base64, ' + this.state.ip[2]} alt="Flower" width="460" height="345"/>
        <div class="carousel-caption">
        <h3 style = {{color : "white"}}>{properties.headline}</h3>
          <p style = {{color : "white"}}>{properties.description}</p>
        </div>
      </div>

      <div class="item">
        <img style={{height:"450px", width:"750px"}} src={'data:image/jpg;base64, ' + this.state.ip[3]} alt="Flower" width="460" height="345"/>
        <div class="carousel-caption">
        <h3 style = {{color : "white"}}>{properties.headline}</h3>
          <p style = {{color : "white"}}>{properties.description}</p>
        </div>
      </div>
  
    </div>

    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>

<div className="col-md-4" style={{border: "1px solid gainsboro"}}>
     <div >
           
           <div className="row" style={{border: "1px solid gainsboro"}} >
           <div className="col-md-8" >
           <div className ="price">

           Cost per Night
           $ {properties.rate}
           </div>
            </div>
           </div> 

          <br></br>

            <div className="row">
            <div className ="col-md-9">
            <h4> Your date are <b> Available!</b> </h4>     
           
            </div>
            </div>
            <br></br>
            <div className="row">
            <div className="col-md-6" style={{border: "1px solid gainsboro"}}>
            <h5> Booking from : {d2}/{d1}/{d3}</h5>
            </div>
            <div className="col-md-6" style={{border: "1px solid gainsboro"}}>
           <h5> Booking to : {d5}/{d4}/{d6}</h5>
            </div>
            </div>


            <div className="row">
            <div className="col-md-12" style={{border: "1px solid gainsboro"}}>
            Guest  : {properties.accomodation}
            </div>
            </div>
            <div className="row">
            <div className="col-md-6" style={{border: "1px solid gainsboro"}}>
            Total Amount
            </div>
            <div className="col-md-6" style={{border: "1px solid gainsboro"}}>
            {properties.rate}
            </div>
            </div>
            <div className="row" style={{border: "1px solid gainsboro", alignContent:"center"}}>
            <div className="searchbox"> 
            <button onClick= {(e)=>this.book(properties)} style ={{width : "137px",  height : "44px"}}className="btn btn-primary">BOOK NOW</button>
            </div>
            </div>

            <div className="row" style={{border: "1px solid gainsboro"}}>
            
            </div>


     </div>
     </div>


     
     </div> 
     
    </div>

     </div>
     

    )

    }
}


export default BookProperty;
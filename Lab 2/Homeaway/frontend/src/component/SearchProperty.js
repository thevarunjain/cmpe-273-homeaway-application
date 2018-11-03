import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './NavBar';
import SearchBar from './SearchBar';
import Pagination from "./Pagination";
import { submitsearch } from "../actions";
import { connect } from "react-redux";
import { submitbookproperty } from "../actions";
import {Link} from 'react-router-dom';
import {paginate} from "../paginate"
//import { Field, reduxForm } from "redux-form";

class SearchProperty extends Component {
       constructor(props){
           super(props);
           this.state = {
             searchlocation : "",
             searchDeparture : "",
             searchArrival : "",
             searchbedroom : "",
             searchprice : "",
            currentPage : 1,
            slidervalue : 5000,
             ip :[],
              flag : '',
              p : ''
           }
      this.book =  this.book.bind(this);
      }


      book(values){
        console.log("in book")
        console.log(values);
        this.props.submitbookproperty(values);
          this.setState({
            p : values,
            flag : true,
          })
        }
        handlePageChange= page =>{
          this.setState({currentPage : page });
        }

        updateSearch(e){
          this.setState({
            searchlocation : e.target.value
          })
        } 
        updateSearchBedroom(e){
          this.setState({
            searchbedroom : e.target.value
          })
        }
        updateSearchArrival(e){
          this.setState({
            searchArrival : e.target.value
          })
        }
        updateSearchDeparture(e){
          this.setState({
            searchDeparture : e.target.value
          })
        }
        updateRange(e){
          this.setState({
            slidervalue : e.target.value
          })
        }

        componentDidMount(){
        console.log(this.props.pro)

        if(this.props.pro != null || undefined ){ // state is set 
          console.log(this.props.pro)

          let imagePreview = '';
          var property1 = this.props.pro.map((property)=>{
              
            axios.post('http://localhost:3001/getpropertypicsingle/'+`${property.headline}`)
            .then(response => {
                    imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.setState(  
                  { ip : this.state.ip.concat(imagePreview)}              
                )
            });
          });
        }else{            //undefined state is not set , then get from hit action 
          var values ={};
          console.log(sessionStorage.getItem('datefrom'))
          values.datefrom = sessionStorage.getItem('datefrom')
          values.dateto = sessionStorage.getItem('dateto')
          values.guest = sessionStorage.getItem('accomodation')
          values.place = sessionStorage.getItem('place')
          console.log(values)
          this.props.submitsearch(values);
        }
        }
        componentWillReceiveProps(){
          console.log(this.props.pro)
              if(this.props.pro != null || undefined ){
                let imagePreview = '';
                var property1 = this.props.pro.map((property)=>{
                    
                  axios.post('http://localhost:3001/getpropertypicsingle/'+`${property.headline}`)
                  .then(response => {
                          imagePreview = 'data:image/jpg;base64, ' + response.data;
                      this.setState(  
                        { ip : this.state.ip.concat(imagePreview)}              
                      )
                  });
                });
              }
        }

    render(){  

      var from,to;
      from = sessionStorage.getItem('datefrom');
      to = sessionStorage.getItem('dateto');
        if(new Date(from)>new Date(to))  {
          return (
            <div className ="bg-img-error"  >
              <h3 style={{color : "white", textAlign : "center"}}>You have entered the wrong Dates :(</h3>
              <Link to="/">
              <h3 style={{color : "white", textAlign : "center"}}><u>Click Here To Search Again</u></h3>
              </Link>
            </div>

          )
        }  
      
   
     
        var message ;
        console.log(this.props.pro)
     
        if(this.props.pro == null || undefined){
          message = "Sorry, No properties found :(";
        console.log("xxxxxxxxxxxxxxxxxxxxxxx")
        return(
          
          <div className ="App-logo" style={{width: "100px"}}>
          <img src={require("../image/load.svg") }/>
          </div>
        )
      }
      
      var red;
      if (this.state.flag){
        red = <Redirect to="/BookProperty" />
      }
  
           const prope = paginate(this.props.pro, this.state.currentPage, 5)
           let filterdProperties = prope.filter(
            (proper) =>{
              // console.log(new Date(proper.availfrom))
              // console.log(new Date(proper.availto))
              // console.log(new Date(this.state.searchArrival))

    
              return  proper.headline.indexOf(this.state.searchlocation) !== -1 && 
                      proper.bedroom.indexOf(this.state.searchbedroom) !== -1 &&
                      Number(proper.rate) <= this.state.slidervalue 
                     
            }  
          );
          let i=-1;
          var property1 = filterdProperties.map((property)=>{
           i = i+1;
           console.log(property)

        return (        // Single Card 
        <div>
        
        <div>         
          <li className="list-group-item" key={Math.random()} onClick= {(e)=>this.book(property)} >
          {red}
          <div className="ima">
          <div className="media-left">
          
          <img className="media-object" src = {this.state.ip[i] } style={{width : "200px", height:"200px"}} />
          </div>
          <div className="media-body">
          <div className="media-heading">
          <div className="col-md-8">
          <h3 className = "property-headline">{property.headline}</h3>
          </div>
           <div >
           <br></br>
           <h5>{property.description}</h5>          
          </div>
          <br></br>
          <div>
          <h5>BA :   {property.bathroom} . </h5>
          <h5>BR :   {property.bedroom}  </h5>
          </div>

          <div>
          <h5>Cost :   {property.rate} .  </h5>
          <h5>Guest : {property.accomodation}    </h5>
          </div>
          <div>
          <h5>Avail from : {property.availfrom} .  </h5>
          <h5>Avail to  :  {property.availto}    </h5>
          </div>
         
          </div>
          </div>
          </div>
          </li>
          </div>
        </div>

        );
         
      }) 
        

    return(       // full page 
         

      <div className ="container-fluid">
        <Navbar />
        <div >
          <SearchBar />

        </div>

        <div >
        <div className="col-md-2">
        <input className="form-control" placeholder="Location" type = "text" value= {this.state.searchlocation} onChange={this.updateSearch.bind(this)} /> 
        </div>
        <div className="col-md-2">
        <p className = "priceclass">Price ($ 0 - $ {this.state.slidervalue})</p>
        <input className="slider" placeholder="Price" type="range" name="points" min="0" max="5000" value= {this.state.slidervalue} onChange={this.updateRange.bind(this)} /> 
        </div> 
        <div className="col-md-2">
        <input className="form-control" placeholder="Bedroom"  type="number" min="1" max="10" value= {this.state.searchbedroom} onChange={this.updateSearchBedroom.bind(this)} /> 
        </div>
        </div>

        <div >
        <Pagination
         pageSize={5}
         itemsCount = {this.props.pro.length}
         currentPage = {this.state.currentPage}
        onPageChange = {this.handlePageChange}/>




        </div>
      <div className="container-fluid" style={{ backgroundColor : "#f4f4f4",height : "650px"}}>
      <div style={{margin : "3%", padding: "15px"}}> 
       <h3>{message}</h3>

      <ul className="col-md-8 list-group" >
         {property1}
     </ul> 
     </div>

     </div>
     </div>
    


    )

  }
}

function mapStateToProps(state){
  return{
    searchprop : state.searchproperty,
    pro : state.searchproperty.pro,
    //bookproperty : state.bookproperty
    
  };
}


export default connect (mapStateToProps, {submitbookproperty,submitsearch})(SearchProperty);
//  export default reduxForm({
//    // validate,
//     form: "NewLoginForm" 
//   })(connect(mapStateToProps, {})(SearchProperty));

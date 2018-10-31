import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './NavBar';
import SearchBar from './SearchBar';
import Pagination from "./Pagination";
import { connect } from "react-redux";
import { submitbookproperty } from "../actions";
import {paginate} from "../paginate"
//import { Field, reduxForm } from "redux-form";

class SearchProperty extends Component {
       constructor(props){
           super(props);
           this.state = {
             searchlocation : "",
             searchdate : "",
             searchbedroom : "",
             searchprice : "",
            currentPage : 1,
            slidervalue : 0,
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
            search : e.target.value.substr(0,20)
          })
        }
        updateRange(e){
          this.setState({
            slidervalue : e.target.value
          })
        }

        componentDidMount(){
          let imagePreview = '';
          var property1 = this.props.pro.map((property)=>{
          //  console.log(property.headline);
              
            axios.post('http://localhost:3001/getpropertypicsingle/'+`${property.headline}`)
            .then(response => {
    
              //  console.log("Imgae Res : ",response);
                imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.setState(  
                  { ip : this.state.ip.concat(imagePreview)}              
                )
            //   console.log(this.state.ip)
            });
          });
        }


    render(){  

      
      
      
      var red;
      if (this.state.flag){
        red = <Redirect to="/BookProperty" />
      }
  
           const prope = paginate(this.props.pro, this.state.currentPage, 5)
           let filterdProperties = prope.filter(
            (proper) =>{
              return proper.headline.indexOf(this.state.search) !== -1 &&
                     proper.headline.indexOf(this.state.search) !== -1 ;
            }  
          );
          let i=-1;
          var property1 = filterdProperties.map((property)=>{
           i = i+1;

        return (
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
          <h3>{property.headline}</h3>
          </div>
          <br></br>
           <div >
           <h4>{property.description}</h4>          
          </div>
          <br></br>
          <div   >
          BA : {property.bathroom} . 
          BR : {property.bedroom}  
          </div>
          <br></br>

          <div>
          Cost : {property.rate} .  
          Guest : {property.accomodation}    
          </div>
     
         
          </div>
          </div>
          </div>
          </li>
          </div>
        </div>

        );
         
      }) 
        

    return(
   
      <div className ="container-fluid">
        <Navbar />
        <SearchBar />
        <div >
        <div className="col-md-2">
        <input className="form-control" placeholder="Location" type = "text" value= {this.state.search} onChange={this.updateSearch.bind(this)} /> 
        </div>
        <div className="col-md-2">
        <p className = "priceclass">Price (0 - 5000) : $ {this.state.slidervalue}</p>
        <input className="slider" placeholder="Price" type="range" name="points" min="0" max="5000" value= {this.state.slidervalue} onChange={this.updateRange.bind(this)} /> 
        </div> 
        <div className="col-md-2">
        <input className="form-control" placeholder="Bedroom"  type="number" min="1" max="10" value= {this.state.search} onChange={this.updateSearch.bind(this)} /> 
        </div>
        <div className="col-md-2">
        <input className="form-control" placeholder="Date" type="date" value= {this.state.search} onChange={this.updateSearch.bind(this)} /> 
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
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({submitlogin},dispatch);
// }

export default connect (mapStateToProps, {submitbookproperty})(SearchProperty);
//  export default reduxForm({
//    // validate,
//     form: "NewLoginForm" 
//   })(connect(mapStateToProps, {})(SearchProperty));

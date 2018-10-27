import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './NavBar';
import SearchBar from './SearchBar';

class SearchProperty extends Component {
       constructor(props){
           super(props);
           this.state = {
             ip :[],
              flag : '',
              p : ''
           }
      }

      book(pro){
        console.log("in book")
        console.log(pro);
          this.setState({
            p :pro,
            flag : true,
            
          })
      
        }

        componentDidMount(){
          let imagePreview = '';
          var properties = this.props.location.state.result;
          var x = this.props.location.state;  // bookiing dates to and date from 
          console.log(x);
          console.log(properties);
          var property1 = properties.map((property)=>{
            console.log(property.headline);
              
            axios.post('http://localhost:3001/getpropertypicsingle/'+`${property.headline}`)
            .then(response => {
    
                console.log("Imgae Res : ",response);
                imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.setState(  
                  { ip : this.state.ip.concat(imagePreview)}              
                )
               console.log(this.state.ip)
        
            });
            
          });
        }
      
 

    render(){  
      
      if (this.state.flag){
        return (<Redirect to={{
          pathname: '/BookProperty',
          state: { result: this.state.p , dateTo : this.props.location.state.dateTo , dateFrom : this.props.location.state.dateFrom }
      }} />)
      }

      var properties = this.props.location.state.result;
      let i=-1;
      var property1 = properties.map((property)=>{
        i = i+1;
       
        return (
          <li className="list-group-item" key={Math.random()} onClick= {(e)=>this.book(property)} >
          <div className="ima">
          <div className="media-left">
          
          <img className="media-object" src = {this.state.ip[i] } style={{width : "200px", height:"200px"}} />
          </div>
          <div className="media-body">
          <div className="media-heading">
          <div col-md-8>
          <h3>{property.headline}</h3>
          </div>
           <div >
           <h4>{property.description}</h4>          
          </div>

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
        );
         
      }) 
        

    return(
   
      <div className ="container-fluid">
        <Navbar />
        <SearchBar />
 
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


export default SearchProperty;
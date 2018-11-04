import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import {Link} from 'react-router-dom';
import {setStatus} from '../actions/index'
import { connect } from "react-redux";


class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      place : "",
      dateTo : "",
      dateFrom : "",
      guest : "",
      passon :""
    }}

    componentWillMount(){
      this.props.setStatus();
    }

    search = (e) => {
      e.preventDefault();
      
      const data = {
        place : this.state.place,
        dateTo : this.state.dateTo,
        dateFrom : this.state.dateFrom,
        guest : this.state.guest 
      };
      console.log(data);

      axios.post('http://localhost:3001/search',data)
      .then(response => {
          console.log("Status Code of Search Post: ",response.status);
          console.log(response.data);
          if(response.status === 200){
              this.setState({
                  Flag : true
              });
              this.setState({
                passon : response.data
            });
            let pass = null;
            pass = this.state.passon;
            console.log(this.state.passon);
          }else{
              this.setState({
                  Flag : false
              })
              
          }
      });
    }
  
  render() {
    let pass = null;
    pass = this.state.passon;

    return (
    
     
<div >
    <div className ="bg-img"  >
           
<div className ="container-fluid">
<div>

<nav className ="navbar navbar-expand-sm fixed-top navbar-light">
  <div className="container-fluid">
  
    <div className="navbar-header">
    <Link to="/"><img src= {require("../image/homeaway_name.svg")}></img> </Link>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
     <ul className="nav navbar-nav navbar-right">

        <li className="dropdown" >
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span style={{ color:"white",}}>Login</span>
           <span className="caret"></span></a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li><Link to="/TravellerLogin">Traveller Login</Link></li>
            <li role="separator" className="divider"></li>
            <li><Link to="/OwnerLogin">Owner Login</Link></li>          
          </ul>
        </li>
        <li>
          <Link to="/TravellerTrip"><span style={{ color:"white"}}> Trip Boards</span></Link> 
        </li>
       <li >
       <div className="searchbox1">
       <Link to="/ListProperty"><button className="listyourproperty">List your property  </button></Link>
       </div>
       </li> 
        <img  src={require('../image/logo.svg')}></img>
        

      </ul>
    </div>
  </div>
  </nav>

  </div>
</div>
        <div className="hometext">
                <h1 className="headline">
                  Book beach houses, cabins,
                </h1>
                <h1 className="headline">
                  condos and more, worldwide
                </h1>
        </div>
      
       <div >
          <SearchBar />
        
          
       
         

        </div>

      </div>
      
</div>
     
      )
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
  setStatus:()=> {dispatch(setStatus)}
  }
}

export default connect(null,{setStatus})(Home);


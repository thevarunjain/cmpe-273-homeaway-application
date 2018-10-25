import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import { connect } from "react-redux";



class TravellerHomepage extends Component {
  constructor(props){
    super(props);

    this.state = {
      email : '',
      place : "",
      dateTo : "",
      dateFrom : "",
      guest : "",
    }
    this.logout = this.logout.bind(this);  
  }
  componentWillMount(){
    if(this.props.traveller.token!=null){
    localStorage.setItem("JWT",this.props.traveller.token);
    localStorage.getItem("JWT");
  }
    // this.setState({
    //       email : cookie.load('cookie')
    // })

  }

  
  //handle logout to destroy the cookie
  logout = () => {
      localStorage.removeItem("JWT");
   //   cookie.remove('cookie', { path: '/' })
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
    let redirectVar = null;
    if(localStorage.getItem("JWT") == null){
    redirectVar = <Redirect to= "/TravellerLogin"/>
    }

    // console.log("cookies "+cookie.load('cookie'));
    // if(!cookie.load('cookie')){
    // redirectVar = <Redirect to= "/TravellerLogin"/>
    // }
    return (
     
<div>
{redirectVar}
    <div className ="bg-img"  >
           
<div className ="container-fluid">
<div>

<nav className ="navbar navbar-expand-sm fixed-top navbar-light">
  <div className="container-fluid">
  
    <div className="navbar-header">
    <a href = "#">  <img src= {require("../image/homeaway_name.svg")}></img> </a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
     <ul className="nav navbar-nav navbar-right">

             <li>
          <Link to="/TravellerTrip" style={{color :"white"}}>Trip Boards </Link> 
        </li>

        <li className="dropdown" >
          <a href="#"  className="dropdown-toggle" data-toggle="dropdown" role="button" style={{color :"white"}} aria-haspopup="true" aria-expanded="false">{this.props.traveller.details}
           <span className="caret" ></span></a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li><Link to="/TravellerProfile">My Profile</Link></li>
            <li role="separator" className="divider"></li>
            <li><Link to='/' onClick={this.logout} >Logout</Link></li>          
          </ul>
        </li>
 
       <li >
       <div className="searchbox1">
       <Link to="/ListProperty"><button className="listyourproperty"  >List your property  </button></Link>
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

function mapStateToProps(state){
  return{
    traveller : state.login
  };
}

export default connect(mapStateToProps,null)(TravellerHomepage);

import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { submitlogin } from "../actions";





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
    console.log(this.props.traveller.token);

    if(this.props.traveller.token == undefined && sessionStorage.getItem("JWT")!= undefined){
    //  sessionStorage.getItem("JWT")
      var values={};
      values.email = sessionStorage.getItem("email");
      values.password = sessionStorage.getItem("password")
      console.log(values);
      this.props.submitlogin(values);
  }
  }
  

  logout = () => {
    sessionStorage.removeItem("JWT");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password")
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

    console.log(this.props.traveller);
    let redirectVar = null;
     
      console.log(sessionStorage.getItem("JWT"))
    if(sessionStorage.getItem("JWT") == undefined || null){
      redirectVar = <Redirect to= "/TravellerLogin"/>
    }

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
                          <a href="#"  className="dropdown-toggle" data-toggle="dropdown" role="button" style={{color :"white"}} aria-haspopup="true" aria-expanded="false">{sessionStorage.getItem("email")}
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

export default connect(mapStateToProps,{submitlogin})(TravellerHomepage);

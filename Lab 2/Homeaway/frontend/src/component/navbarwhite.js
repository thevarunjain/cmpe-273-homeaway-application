import React, { Component } from 'react'
import {Link} from 'react-router-dom';

 class navbarwhite extends Component {
  render() {
    return (
            <div className ="container-fluid1">
            <nav className ="navbar navbar-expand-sm fixed-top navbar-light">
                 <div className="container-fluid">
                   <div className="navbar-header">
                    <Link to="/">  <img src= {require("../image/homeaway_blue.svg")}></img> </Link>
                    </div>
                    <span className="blankspace">                            
                    </span>
                    <img  src={require('../image/logoblue.svg')}></img>
        
                     </div>
                     
                     
            </nav>
            </div>
    )
  }
}
export default navbarwhite;
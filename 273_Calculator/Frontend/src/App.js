import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
constructor(props){
  super(props);

  this.state = {
    exp : '', 
    answer : ''

  }
}
submit = (e) => {
    const data = {
        exp : this.state.exp
    }
    axios.defaults.withCredentials = true;
    
    axios.post('http://localhost:3001/',data)
        .then(response => {
            console.log("Status Code : " + response.status);
            if(response.status === 200){
                this.setState({
                    exp : response.data
                })
            }
            }
        );
}
  render() {
    return (
      <div className="container">
     Calculator App
     <div className="login-form">
     <div className="main-div">
     <div className="panel">
     <div className="form-group">
     <input value={this.state.exp} name = "exp" type= "text"  placeholder= " Eg 2+2 " onChange = {(eve) => this.setState({ exp : eve.target.value})} /><br></br><br></br>
     </div> 
      <button className ="" type = "button" value = "+" onClick = {(eve) => this.setState({ exp : this.state.exp + eve.target.value}) }> + </button>
      <button className ="" type = "button" value = "-" onClick = {(eve) => this.setState({ exp : this.state.exp + eve.target.value}) }> -  </button>
      <button className ="App" type = "button" value = "*" onClick = {(eve) => this.setState({ exp : this.state.exp + eve.target.value}) }> *  </button>
      <button className="login-form" type = "button" value = "/" onClick = {(eve) => this.setState({ exp : this.state.exp + eve.target.value}) }> /  </button><br></br><br></br>
     
      <input type="submit" value="Submit" onClick = {this.submit}></input>
      <input className="botto-tex" type="reset" value="Reset" onClick = {(eve) => this.setState({ exp : ""}) } ></input>
    
     </div>
       </div> 
     </div> 
       
       </div>
    );
  }
}

export default App;

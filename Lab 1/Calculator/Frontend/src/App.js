import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
constructor(props){
  super(props);

  this.state = {
    exp : '', 
    answer : '',
    error : ""

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
            console.log("v");

                this.setState({
                    exp : response.data
                })
            }
      
          else  if(response.status === 201){
            console.log("inv");
              this.setState({
                 error : "Invalid Expression"
              
              })
          }
            }
        );
}
  render() {
    return (
      <div className="container">
   
     <div className ="form-container">
            <div className="login-form  traveler">
            <div className="panel-heading">
                    <h1>Calculator</h1>
                  
        </div>
     <input require autoFocus className= "form-control" value={this.state.exp} name = "exp" type= "text"  placeholder= " Eg 2+2 " onChange = {(eve) => this.setState({ exp : eve.target.value})} /><br></br><br></br>
    
     
      <button className="loginbutton" type = "button" value = "+" onClick = {(eve) => this.setState({ exp : this.state.exp + eve.target.value}) }> + </button>
      <button className="loginbutton" type = "button" value = "-" onClick = {(eve) => this.setState({ exp : this.state.exp + eve.target.value}) }> -  </button>
      <button className="loginbutton" type = "button" value = "*" onClick = {(eve) => this.setState({ exp : this.state.exp + eve.target.value}) }> *  </button>
      <button className="loginbutton" type = "button" value = "/" onClick = {(eve) => this.setState({ exp : this.state.exp + eve.target.value}) }> /  </button><br></br><br></br>
     <div className ="row">

     <div  style={{padding : "10px"}}>
      <input className="btn btn-primary" type="submit" value="Submit" onClick = {this.submit}></input>
      <input className="btn btn-primary" type="reset" value="Reset" onClick = {(eve) => this.setState({ exp : ""}) } ></input>
<br></br>



<div className="error"style={{align :"center" , color : "red" }}>{this.state.error}</div>
</div>


    </div>
     </div>
     </div> 
       </div> 
 
    );
  }
}

export default App;

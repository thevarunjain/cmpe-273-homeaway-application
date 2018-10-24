import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';


class TravellerProfile extends Component{
       constructor(props){
        super(props);
        this.state = {
            description: '',
            selectedFile: '',
            imageView : '',
            firstname : '',
            lastname : '',
            about : '',
            company :'',
            country : '',
            school : '',
            hometown : '',
            languages : '',
            gender : '',
            phone : '',
            email:'',
            pic:''
          };
          this.onSubmit = this.onSubmit.bind(this);

        }

      
    
        componentDidMount(){
            console.log("cookies _ "+cookie.load('cookie'));
            var email = cookie.load('cookie')
            
            axios.get('http://localhost:3001/TravellerProfile',{
                params: {
                  id : email
                }})
                    .then((response) => {
                    //update the state with the response data
                    console.log(response);
                    console.log(response.data[0]);
                    this.setState({
                        firstname : response.data[0].firstname,
                        lastname : response.data[0].lastname,
                        about : response.data[0].about,
                        country : response.data[0].country,
                        company : response.data[0].company,
                        school : response.data[0].school,
                        hometown : response.data[0].hometown,
                        languages : response.data[0].languages,
                        gender : response.data[0].gender,
                        phone : response.data[0].phone,
                    
                    });
                    console.log("In Home");
                });
        }

    //submit Login handler to send a request to the node backend
    saveChanges = (e) => {
        var headers = new Headers();
        const data = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            about : this.state.about,
            country : this.state.country,
            company : this.state.company,
            school : this.state.school,
            hometown : this.state.hometown,
            languages : this.state.languages,  
            gender : this.state.gender,
            phone : this.state.phone,
            email : cookie.load('cookie')
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/TravellerProfile',data)
            .then(response => {
                console.log("Status Code  is : ",response.status);
                console.log(response.data);
                if(response.status === 200){
                        console.log('Changed saved successfully');
                }else{
                    console.log('Changed failed !!! ');

                }
            });
    }



    componentWillMount(){
        console.log("in mount");
      //  let formData = new FormData();
       
          axios.post('http://localhost:3001/GetProfilePicture/'+`profile_${cookie.load('cookie')}.jpg`)

          .then(response => {
              console.log("Imgae Res : ",response);
              let imagePreview = 'data:image/jpg;base64, ' + response.data;
              this.setState({
                  imageView: imagePreview
              })
          });
    }



    onChange = (e) => {
        if(e.target.name == 'selectedFile'){
          this.setState({
            selectedFile: e.target.files[0]
          })
        }else{
          this.setState({ [e.target.name]: e.target.value });
        }
    }
  
    onSubmit = (e) => {
      e.preventDefault();
      const { description, selectedFile } = this.state;
      let formData = new FormData();
      console.log(this.state.description)

      formData.append('email', cookie.load('cookie'));        
      formData.append('description', description);
      formData.append('selectedFile', selectedFile);
      console.log("form wali email :" + cookie.load('cookie'))
  
        axios.post('http://localhost:3001/ProfilePicture', formData)
          .then((result) => {
            axios.post('http://localhost:3001/GetProfilePicture/'+`profile_${cookie.load('cookie')}.jpg`)
  
            .then(response => {
                console.log("Imgae Res : ",response);
                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.setState({
                    imageView: imagePreview
                })
            });
          });
  
    }
  /*
    handleGetPhoto = (e) => {
        axios.post('http://localhost:3001/GetProfilePicture/'+'profile_.jpg')
  
          .then(response => {
              console.log("Imgae Res : ",response);
              let imagePreview = 'data:image/jpg;base64, ' + response.data;
              this.setState({
                  imageView: imagePreview
              })
          });
    }*/
      


    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(!cookie.load('cookie')){
        redirectVar = <Redirect to= "/TravellerLogin"/>
        }

      const { description, selectedFile } = this.state;

        return(
        <div className="container-fluid">
          {redirectVar}
        <div id="login-container1" className="row" >
        <div className ="container-fluid1">
        <nav className ="navbar navbar-expand-sm fixed-top navbar-light">
             <div className="container-fluid">
               <div className="navbar-header">
                <Link to="/TravellerHomePage">  <img src= {require("../image/homeaway_blue.svg")}></img> </Link>
                </div>
                <span className="blankspace">                            
                </span>
                <img  src={require('../image/logoblue.svg')}></img>

                 </div>
        </nav>

        </div>
        <div className="container-fluid">
         <ul className="nav nav-tabs">
             <li><Link to="/TravellerTrip">My Trips</Link></li>
             <li><Link to={"/TravellerProfile/"+this.state.email}>Profile</Link></li>
             <li><Link to="/TravellerAccount">Account</Link></li>
         </ul>
         </div>

         
            <div>
            <div className="profile-header-photo">
        <div className="img-circle profile-user-photo js-user-photo">
            <div className="img-circle user-photo"> 
            <div> 


          <form onSubmit={this.onSubmit}>
          <div className="profilephoto" >
 <img src = {this.state.imageView} style={{height : "151px", width : "152px",  margintop : "20px", borderradius: "90px"}}/>
           </div>
            
            <input
              type="file"
              name="selectedFile"
              onChange={this.onChange}
            />
            
            <button type="submit" className="btn btn-primary">Save Changes</button>

          </form>


    
                    
                  </div>
                </div>
            </div>
        </div>

    </div>
    </div>
            


            <div className="travellerprofileform">
                <div className="heading1">
                <p className="heading">Profile Information</p>
                </div><br></br>
                
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ firstname : event.target.value })}} type="text" className="form-control" value={this.state.firstname} placeholder="First Name"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ lastname : event.target.value })}} type="text" className="form-control"  value={this.state.lastname} placeholder="Last Name"/>
                </div>
                <div className="form-group">
                    <textarea onChange = {(event) => {this.setState({ about : event.target.value })}} type="text" className="form-control"  value={this.state.about} placeholder="About me"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ country : event.target.value })}} type="text" className="form-control"   value={this.state.country} placeholder="My City, Country"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ company : event.target.value })}} type="text" className="form-control"  value={this.state.company} placeholder="Company"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ school : event.target.value })}} type="text" className="form-control"  value={this.state.school} placeholder="School"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ hometown : event.target.value })}} type="text" className="form-control"  value={this.state.hometown} placeholder="Hometown"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ languages : event.target.value })}} type="text" className="form-control"  value={this.state.languages} placeholder="Languages"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ gender : event.target.value })}} type="text" className="form-control"  value={this.state.gender} placeholder="Gender"/>
                </div>
                <div className="form-group">
                    <input onChange = {(event) => {this.setState({ phone : event.target.value })}} type="text" className="form-control" value={this.state.phone}  placeholder="Phone Number "/>
                </div>
                <div ><br></br>
        
                <button className="loginbutton" onClick = {this.saveChanges} >Save Changes</button>  
                </div>

    
               


                    
            </div>
    </div>
        
     
       
       
    
        
        );
    }
}
 export default TravellerProfile;

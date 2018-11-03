import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home';
import TravellerLogin from './TravellerLogin';
import SearchProperty from './SearchProperty';
import ListProperty from './ListProperty';
import OwnerLogin from './OwnerLogin';
import TravellerProfile from './TravellerProfile';
import TravellerAccount from './TravellerAccount';
import TravellerTrip from './TravellerTrip';
import TravellerSignUp from './TravellerSignUp';
import TravellerHomepage from './TravellerHomepage'
import OwnerDashboard from './OwnerDashboard';
import BookProperty from './BookProperty';
import OwnerMessage from "./OwnerMessage";
import TravellerMessage from "./TravellerMessage";

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Rout`e*/}
                <Route path="/" component={Home} exact/>
                <Route path="/TravellerLogin" component={TravellerLogin} exact/>
                <Route path="/OwnerLogin" component ={OwnerLogin} exact/>
                <Route path="/SearchProperty" component ={SearchProperty} exact/>
                <Route path="/ListProperty" component ={ListProperty} exact/>
                <Route path="/TravellerTrip" component ={TravellerTrip} exact/>  
                <Route path="/TravellerProfile" component ={TravellerProfile} exact/>  
                <Route path="/TravellerAccount" component ={TravellerAccount} exact/>  
                <Route path="/TravellerSignUp" component ={TravellerSignUp} exact/>  
                <Route path="/TravellerHomepage" component ={TravellerHomepage} exact/>  
                <Route path="/OwnerDashboard" component ={OwnerDashboard} exact/>  
                <Route path="/BookProperty" component ={BookProperty} exact/>  
                <Route path="/OwnerMessage" component ={OwnerMessage} exact/>  
                <Route path="/TravellerMessage" component ={TravellerMessage} exact/>  
            



            </div>
        )
    }
}
//Export The Main Component
export default Main;
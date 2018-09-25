import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SearchResult from './SearchResult';
import PropertyView from './PropertyView';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Login} exact/>
                <Route path="/home" component={Home} exact/>
                <Route path="/SearchResult" component ={SearchResult} exact/>
                <Route path="/PropertyView" component ={PropertyView} exact/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;
import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import Main from './component/Main';
import promise from "redux-promise";  
import RootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(RootReducer, composePlugin(applyMiddleware(promise)));

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <ApolloProvider client={client}>
    <Provider store = {store}>

      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Main/>
        </div>
      </BrowserRouter>
      </Provider>
      </ApolloProvider>
    );
  }
}
export default App;

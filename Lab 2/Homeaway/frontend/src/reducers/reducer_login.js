//import _ from "lodash";
import {  SUBMIT_LOGIN } from "../actions";

//Reducer listening to different action types
//initial state is {}


export default function(state = {}, action) {
  let newState = {...state}
  
  switch (action.type) {

    case  SUBMIT_LOGIN :
    newState = action.payload;
    console.log(action.payload);
     var holdemail = JSON.parse(action.payload.config.data);
      newState.details = holdemail.email;
      newState.password = holdemail.password;
      newState.token = action.payload.data.token


      console.log(action.payload.status);
      if(action.payload.status === 200 ){
      console.log(action.payload.status);
      sessionStorage.setItem("JWT",newState.token);
      sessionStorage.setItem("email",newState.details);
      sessionStorage.setItem("password",newState.password);
      }
     console.log(newState);
      return newState;

    default:
      return newState;
  }

}

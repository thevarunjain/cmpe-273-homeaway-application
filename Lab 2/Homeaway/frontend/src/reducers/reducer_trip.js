//import _ from "lodash";
import {  SUBMIT_TRIP } from "../actions/index";

//Reducer listening to different action types
//initial state is {}


export default function(state = {}, action) {
  let newState = {...state}
  
  switch (action.type) {

    case  SUBMIT_TRIP :
    newState = action.payload;
    // var holdemail = JSON.parse(action.payload.config.data);
    //  newState.details = holdemail.email;
    //  newState.token = action.payload.data.token
     console.log(newState);
      return newState;

    default:
      return newState;
  }


  

}

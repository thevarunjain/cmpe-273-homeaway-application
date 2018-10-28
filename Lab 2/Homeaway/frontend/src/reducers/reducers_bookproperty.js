

//import _ from "lodash";
import {  SUBMIT_BOOK_PROPERTY } from "../actions/index";

//Reducer listening to different action types
//initial state is {}


export default function(state = {}, action) {
  let newState = {...state}
  
  switch (action.type) {

    case  SUBMIT_BOOK_PROPERTY :
    newState = action.payload;
    if(action.payload){
        newState.status == 200;
    }
    // var holdemail = JSON.parse(action.payload.config.data);
    //  newState.details = holdemail.email;
    //  newState.token = action.payload.data.token
     console.log(newState);
      return newState;

    default:
      return newState;
  }


  

}

//import _ from "lodash";
import {  SUBMIT_SEARCH_PROPERTY } from "../actions/index";

//Reducer listening to different action types
//initial state is {}


export default function(state = {}, action) {
  let newState = {...state}
  
  switch (action.type) {

    case  SUBMIT_SEARCH_PROPERTY :
    newState = action.payload;
     console.log(newState);
      return newState;

    default:
      return newState;
  }

}

//import _ from "lodash";
import {  SUBMIT_SEARCH } from "../actions/index";

//Reducer listening to different action types
//initial state is {}


export default function(state = {}, action) {
  let newState = {...state}
  
  switch (action.type) {

    case  SUBMIT_SEARCH :
    console.log("In submit search of reducer");
    newState = action.payload;
    var holddata = JSON.parse(action.payload.config.data);
    console.log(holddata)
    newState.datefrom = holddata.datefrom;
    newState.dateto = holddata.dateto;
    newState.place = holddata.place;
    newState.accomodation = holddata.guest;

    newState.pro = action.payload.data;
     console.log(newState);
      return newState;

      case "SET_STATUS" : 
      newState.status = 0;
    default:
      return newState;
  }
}

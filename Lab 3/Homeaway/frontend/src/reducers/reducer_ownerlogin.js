//import _ from "lodash";
import {  SUBMIT_OWNER_LOGIN } from "../actions";

//Reducer listening to different action types
//initial state is {}


export default function(state = {}, action) {
  let newState = {...state}
  
  switch (action.type) {

    case  SUBMIT_OWNER_LOGIN :
    newState = action.payload;
     var holdemail = JSON.parse(action.payload.config.data);
      newState.details = holdemail.email;
      newState.password = holdemail.password;
      newState.token = action.payload.data.token

      console.log(action.payload.status);
      if(action.payload.status !== 201 ){
      console.log(action.payload.status);

      sessionStorage.setItem("OwnerJWT",newState.token);
      sessionStorage.setItem("Owneremail",newState.details);
      sessionStorage.setItem("Ownerpassword",newState.password);
      }
      console.log(newState);
      return newState;

    default:
      return newState;
  }


  

}

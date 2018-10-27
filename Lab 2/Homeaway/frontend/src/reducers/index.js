import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import LoginReducer from "./reducer_login";
import SignupReducer from "./reducer_signup";
import OwnerSignupReducer from "./reducer_ownerlogin";
import submitpropertyReducer from "./reducer_submitproperty"


const rootReducer = combineReducers({
  submitproperty : submitpropertyReducer,
  ownersignup : OwnerSignupReducer,
  signup : SignupReducer,
  login : LoginReducer,       // reducers for login
  form  : formReducer         //Redux Form Reducer 
});

export default rootReducer;

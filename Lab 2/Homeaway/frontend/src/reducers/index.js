import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import LoginReducer from "./reducer_login";
import SignupReducer from "./reducer_signup";
import OwnerSignupReducer from "./reducer_ownerlogin";
import submitpropertyReducer from "./reducer_submitproperty"
import searchbarReducer from "./reducer_search";
import searchpropertyReducer from "./reducer_searchproperty";
import bookpropertyReducer from "./reducers_bookproperty";


const rootReducer = combineReducers({
  bookproperty :bookpropertyReducer,
  properties : searchpropertyReducer,
  searchproperty : searchbarReducer,
  submitproperty : submitpropertyReducer,
  ownersignup : OwnerSignupReducer,
  signup : SignupReducer,
  login : LoginReducer,       // reducers for login
  form  : formReducer         //Default Redux Form Reducer 
});

export default rootReducer;
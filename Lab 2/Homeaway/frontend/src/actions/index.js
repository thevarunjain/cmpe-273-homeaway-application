import axios from "axios";

export const  SUBMIT_LOGIN = "SUBMIT_LOGIN";
export const  SUBMIT_SIGNUP = "SUBMIT_SIGNUP";
export const  SUBMIT_OWNER_LOGIN = "SUBMIT_OWNER_LOGIN";



const ROOT_URL = "http://localhost:3001";

export function submitlogin(values) {
  axios.defaults.withCredentials = true;

  const request = axios.post(`${ROOT_URL}/TravellerLogin`, values);
  console.log(request);

  return {
    type: SUBMIT_LOGIN,
    payload: request,
  };
}



export function submitsignup(values) {
  axios.defaults.withCredentials = true;

  const request = axios.post(`${ROOT_URL}/TravellerSignUp`, values);
  console.log(request);

  return {
    type: SUBMIT_SIGNUP,
    payload: request,
  };
}


export function submitownerlogin(values) {
  axios.defaults.withCredentials = true;

  const request = axios.post(`${ROOT_URL}/OwnerLogin`, values);
  console.log(request);

  return {
    type: SUBMIT_OWNER_LOGIN,
    payload: request,
  };
}


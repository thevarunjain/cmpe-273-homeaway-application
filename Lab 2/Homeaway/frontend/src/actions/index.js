import axios from "axios";

export const  SUBMIT_LOGIN = "SUBMIT_LOGIN";
export const  SUBMIT_SIGNUP = "SUBMIT_SIGNUP";
export const  SUBMIT_OWNER_LOGIN = "SUBMIT_OWNER_LOGIN";
export const  SUBMIT_PROPERTY = "SUBMIT_PROPERTY";




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




export function submitproperty(values) {
  const  d  = Object.assign({},values);
  let formData = new FormData();

  formData.append('headline', values.headline);
  formData.append('propdata', JSON.stringify(values));
  console.log(d.files);
  d.files.map((pic)=>{
    formData.append('proppics', pic);
    console.log(pic)
  })
  //set the with credentials to true
   axios.defaults.withCredentials = true;
  //make a post request with the user data
  const request = axios.post('http://localhost:3001/ListProperty',formData);
  console.log(request);

  return {
    type: SUBMIT_PROPERTY,
    payload: request,
  };
}

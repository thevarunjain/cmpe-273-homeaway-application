import { gql } from 'apollo-boost';
import BookProperty from './../component/BookProperty';

const travellerSignUp = gql`
   mutation travellerSignUp($firstname: String, $lastname: String, $email: String, $password: String){
    travellerSignUp(data:{firstname: $firstname, lastname: $lastname, email: $email,password: $password}){
           email
       }
   }
`;

const travellerLogin = gql`
mutation travellerLogin($email: String, $password: String){
    travellerLogin(data:{email: $email,password: $password}){
        email
    }
}
`;

const updateProfile = gql`
mutation updateProfile($email: String, $password: String, $firstname: String  , $lastname: String, $about: String, $company: String,$country: String, $school: String, $hometown: String, $languages: String, $gender: String, $phone: String ){
    updateProfile(data:{email: $email,password: $password, firstname: $firstname, lastname : $lastname, about: $about, company: $company, country: $country, school: $school, hometown: $hometown, languages: $languages, gender: $gender, phone: $phone}){
        email
    }
}
`;

const ownerLogin = gql`
mutation ownerLogin($email: String, $password: String){
    ownerLogin(data:{email: $email,password: $password}){
        email
    }
}
`;


const bookProperty = gql`
mutation bookProperty($email: String, $bookedfrom: String, $bookedto: String, $owneremail: String, $propid: String, $headline: String){
    bookProperty(data:{email: $email,bookedfrom: $bookedfrom, bookedto: $bookedto, owneremail: $owneremail, propid: $propid, headline: $headline}){
        email
    }
}
`;







export {travellerSignUp, travellerLogin, updateProfile, ownerLogin, bookProperty };
import { gql } from 'apollo-boost';

const propertyTraveller = gql`
query propertytraveller($email: String){
   propertytraveller(email:$email){
       firstName
   }
 }

`;

const propertyOwner = gql`
query propertytraveler($prop_id: String){
   propertytraveler(email : $email){
       firstName
   }
 }

`;
export { propertyTraveller, propertyOwner };
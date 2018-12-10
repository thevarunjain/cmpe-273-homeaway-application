import { gql } from 'apollo-boost';

const travellerSignUp = gql`
   mutation travellerSignUp($firstname: String, $lastname: String, $email: String, $password: String){
    travellerSignUp(data:{firstname: $firstname, lastname: $lastname, email: $email,password: $password}){
           email
       }
   }
`;

export {travellerSignUp};
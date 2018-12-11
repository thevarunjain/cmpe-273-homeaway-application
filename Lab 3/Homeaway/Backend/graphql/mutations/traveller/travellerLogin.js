const graphql = require('graphql');
var crypt = require("../../../crypt");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

console.log("from function HI")
 
var { travellerType, travellerInputType }= require('../../types/traveller');
var traveller = require('../../../models/traveller');

module.exports= {
	
	type: travellerType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(travellerInputType)
		}
	},
	resolve(root, params) {
		console.log("Data in mutation",params.data);
        var msg=  params.data  
        console.log(msg)
        console.log("Inside Login Post Request\n");
        var email = msg.email;
        var password = msg.password;
        
        console.log("Email : ",email + " password : ",password);
        
        traveller.find({
            email : email
        }).then((docs) => {
           // console.log(".................",docs)
        
            if(docs.length!=0){
        
            var user = {                    // for creating JWT token
                id: docs.id,
                email: docs.email,
            };
            crypt.compareHash(msg.password, docs[0].passwordHash, function (err, isMatch) {
                console.log(isMatch,err)
                console.log(msg.password, docs[0].passwordHash)
        
                if (isMatch && !err) {
                    console.log(" logged in successfully ")
                    // if (!newUser) {
                    //     throw new Error('Error adding user');
                    // }
                    // return newUser
                } else {
               
                    console.log('Password did not match');
                    console.log(err);
                }   
            });
        }else{
            console.log("Authentication failed. User not found.");
        }
        })
		
	}
}


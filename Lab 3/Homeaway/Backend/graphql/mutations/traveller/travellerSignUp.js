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
	var msg = params.data
var firstname = msg.firstname;
var lastname = msg.lastname;
var email = msg.email;
var password = msg.password;

var passwordHash;
crypt.createHash(password, function (hash) {
    passwordHash = hash;
    console.log("\nEmail : ",email + "\n Password : ",password+"\n Hash Value : "+ passwordHash + "\nFirst Name : ", firstname + "\nLast Name : ", lastname);

    traveller.find({
        email : email
    }).then((data)=>{
        console.log(data);  
        console.log(data.length);  
        if(data.length!=0){
            console.log("\nUser already exist with the email\n",email)
           // callback(null,201)
            console.log("\n Traveller already there with email :- ", email);
            // res.cookie('cookie',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
           //  res.sendStatus(201);
        }else{
			console.log("done")
			params.data.passwordHash = passwordHash;
			console.log("final data..",params.data)
			// const uModel = new traveller(params.data);
			// const newUser = uModel.save();
			const newUser = traveller(params.data).save();
			if (!newUser) {
				throw new Error('Error adding user');
			}
			return newUser

        }
    })
})
		
	}
}
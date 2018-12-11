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

var { ownerType, ownerInputType }= require('../../types/owner');
var owner = require('../../../models/owner');

module.exports= {
	type: ownerType,
	args: {
		data: {
			name: 'data',
			type: new GraphQLNonNull(ownerInputType)
		}
	},
	resolve(root, params) {
		console.log("Data in mutation",params.data);
        var msg = params.data;
        console.log(msg);
		const newUser = "";
		
		var email = msg.email;
		var password = msg.password; 
	
		var passwordHash;
		crypt.createHash(password, function (hash){
				passwordHash = hash;
		})   
		//traveller login 
		const newUser = owner.find({
			email : email
		}).then((docs) => {
			if(docs.length!=0){                 // if owner is found with that email
			var user = {                    // for creating JWT token
				id: docs.id,
				email: docs.email,
			};
			crypt.compareHash(msg.password, docs[0].passwordHash, function (err, isMatch) {
	
				if (isMatch && !err) {                                          // if password is correct
					console.log("Owner Found", docs)
					console.log('Owner Logged in');

				} else {                                                            // if password is wrong
				
					console.log('Password did not match');
				console.log(err);
			}   
		})// end of create hash 
	}// end of if 
					else{                
					new owner({                // ES6 syntax
					email,
					password,
					passwordHash
					}).save().then((docs)=>{
					console.log("Owner created : ",docs);
				},(err)=>{
					console.log("Error in signing up");
					callback(err,null)
				}) 
			}//end of else                
			}) // end of docs 

		if (!newUser) {
			throw new Error('Error adding user');
		}
		return newUser
	}
}

const graphql = require('graphql');
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
		const newUser = owner.findOneAndUpdate({email: msg.email},{                  
            firstname : msg.firstname, 
            lastname: msg.lastname,
            about : msg.about,
            company : msg.company,
            country : msg.country,
            school :msg.school,
            hometown : msg.hometown,
            languages : msg.languages,
            gender : msg.gender,
            phone : msg.phone },{multi:true},
            function(err,log){
                if(err) {
                    console.log("Traveller Profile cant update :( ",err);
                    // callback(null,"Traveller Profile cant update :( ")
                    // res.json({
                    //     status:"error",
                    //     msg:"System Error, Try Again."
                    // })
                }else{
                    console.log("Traveller Profile updated !!",log);
                    // callback(null,"Traveller Profile updated !!")
                    // res.writeHead(200,{
                    //     'Content-Type' : 'application/json'
                    //     })
                    // res.end(JSON.stringify(results));
                }
            });


		if (!newUser) {
			throw new Error('Error adding user');
		}
		return newUser
	}
}

const graphql = require('graphql');
const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLSchema,
   GraphQLID,
   GraphQLInt,
   GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;

var { ownerType, ownerInputType }= require('../../types/owner');
var owner = require('../../../models/owner');

module.exports={
	// type: new GraphQLList(ownerType),
	 type : ownerType,
    args: {
        username:{
            type:GraphQLString
	}},
	
    resolve(root, params) {
		console.log(params)
       console.log("Data in Mutation",params.email);
        console.log("Property Found >>>>",owner.find({email:params.email}).exec())
        return owner.find({email:params.email}).exec()
    }
}
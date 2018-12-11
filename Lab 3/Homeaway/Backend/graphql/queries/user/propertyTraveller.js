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

var { travellerType, travellerInputType }= require('../../types/traveller');
var traveller = require('../../../models/traveller');

module.exports={
	// type: new GraphQLList(travellerType),
	 type : travellerType,
    args: {
        username:{
            type:GraphQLString
	}},
	
    resolve(root, params) {
		console.log(params)
       console.log("Params",params.email);
        return traveller.find({email:params.email}).exec()
    }
}
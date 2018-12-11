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
const propertyType = new GraphQLObjectType({				// To send to Client
	name: 'property',
	fields: () => ({
		propid   :   {
			type : GraphQLString
		}
	})
})


 const propertyInputType = new GraphQLInputObjectType({					//To get from client
	name: 'travellerInput',
	fields: () => ({
		propid   :   {
			type : GraphQLString
		}
	})
})

module.exports={
    propertyType,
    propertyInputType
}
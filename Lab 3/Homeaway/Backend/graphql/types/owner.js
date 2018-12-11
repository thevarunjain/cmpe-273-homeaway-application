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
const ownerType = new GraphQLObjectType({				// To send to Client
	name: 'owner',
	fields: () => ({
		_id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		email   :   {
			type : GraphQLString
		},
		password:   {
			type : GraphQLString
		},
		passwordHash:  {
			type : GraphQLString
		},    
		propertyid : {
			type : GraphQLString
		},
		properties :  {
			type : GraphQLString
		}
	})
})


 const ownerInputType = new GraphQLInputObjectType({					//To get from client
	name: 'ownerInput',
	fields: () => ({
		email   :   {
			type : GraphQLString
		},
		password:   {
			type : GraphQLString
		},
		passwordHash:  {
			type : GraphQLString
		},    
		propertyid : {
			type : GraphQLString
		},
		properties :  {
			type : GraphQLString	
			}
	})
})


module.exports={
    ownerType,
    ownerInputType
}
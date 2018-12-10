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
var mutations = require( './mutations');
var queries = require('./queries');

console.log(" from grapgh HI")

module.exports=new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: queries
	}),
	
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: mutations
	})
});


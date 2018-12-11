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
const travellerType = new GraphQLObjectType({				// To send to Client
	name: 'traveller',
	fields: () => ({
		// _id: {
		// 	type: new GraphQLNonNull(GraphQLID)
		// },
		email   :   {
			type : GraphQLString
		},
		password:   {
			type : GraphQLString
		},
		passwordHash:  {
			type : GraphQLString
		},
		firstname:  {
			type : GraphQLString
		},
		lastname:  {
			type : GraphQLString
		},
		about : { 
			type : GraphQLString
		},
		company :{ 
			type : GraphQLString
		},
		country : { 
			type : GraphQLString
		},
		school : {
			type : GraphQLString
		 },
		hometown : {
			type : GraphQLString
		 },
		languages : {
			type : GraphQLString
		 },
		gender : { 
			type : GraphQLString
		},
		phone : {
			type : GraphQLString
		 },
		properties :  {
			type : GraphQLString
		},
		bookedfrom : {
			type : GraphQLString
		},
		bookedto : {
			type : GraphQLString
		 },
		propid : { 
			type : GraphQLString
		},
		owneremail : {
			type : GraphQLString
		 },
		headline :  {
			type : GraphQLString
		},
		travelleremail :  {
			type : GraphQLString
		}
	})
})


 const travellerInputType = new GraphQLInputObjectType({					//To get from client
	name: 'travellerInput',
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
		firstname:  {
			type : GraphQLString
		},
		lastname:  {
			type : GraphQLString
		},
		about : { 
			type : GraphQLString
		},
		company :{ 
			type : GraphQLString
		},
		country : { 
			type : GraphQLString
		},
		school : {
			type : GraphQLString
		 },
		hometown : {
			type : GraphQLString
		 },
		languages : {
			type : GraphQLString
		 },
		gender : { 
			type : GraphQLString
		},
		phone : {
			type : GraphQLString
		 },
		properties :  {
			type : GraphQLString
		},
		bookedfrom : {
			type : GraphQLString
		},
		bookedto : {
			type : GraphQLString
		 },
		propid : { 
			type : GraphQLString
		},
		owneremail : {
			type : GraphQLString
		 },
		headline :  {
			type : GraphQLString
		},
		travelleremail :  {
			type : GraphQLString
		}
	})
})

module.exports={
    travellerType,
    travellerInputType
}
const graphql = require("graphql");
const _ = require("lodash");
const traveller = require("../models/traveller");
// const Property = require("../models/property");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLDate
} = graphql;

const travellerType = new GraphQLObjectType({
  name: "traveller",
  fields: () => ({
    email   :   {
        type : GraphQLString
    },
    password:   {
        type : GraphQLString
    },
   
    firstname:  {
        type : GraphQLString
    },
    lastname:  {
        type : GraphQLString
    }
    // about : { 
    //     type : GraphQLString
    // },
    // company :{ 
    //     type : GraphQLString
    // },
    // country : { 
    //     type : GraphQLString
    // },
    // school : {
    //     type : GraphQLString
    // //  },
    // hometown : {
    //     type : GraphQLString
    //  },
    // languages : {
    //     type : GraphQLString
    //  },
    // gender : { 
    //     type : GraphQLString
    // },
    // phone : {
    //     type : GraphQLString
    //  },
    // properties : {
    // 	type : GraphQLObjectType
    // }
  })
});



const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      travellersignup : {
      type: travellerType,
      args: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
          console.log("user=");
        let user = new traveller({
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
          password: args.password
        });
        console.log("user=",user);

        const result = user.save();

        if (!result) {
          throw new Error("Username already exists.");
        }
        return result;
      }
    }

 }
  });


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        travellersignup : {
        type: travellerType,
        args: {
          firstname: { type: new GraphQLNonNull(GraphQLString) },
          lastname: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args) {
            console.log("user=");
          let user = new traveller({
            firstname: args.firstname,
            lastname: args.lastname,
            email: args.email,
            password: args.password
          });
          console.log("user=",user);
  
          const result = user.save();

          if (!result) {
            throw new Error("Username already exists.");
          }
          return result;
        }
      }
  
   }
  });

  module.exports = new GraphQLSchema({
     query: RootQuery,
    mutation: Mutation
  });
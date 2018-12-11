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

var { travellerType, travellerInputType }= require('../../types/traveller');
var traveller = require('../../../models/traveller');
var owner = require('../../../models/owner');

module.exports= {
	type: travellerType,
	args: {
		data: {
			name: 'data',
            type: new GraphQLNonNull(travellerInputType),
		}
	},
	resolve(root, params) {
		console.log("Data in mutation",params.data);
        var msg = params.data;

        var availfrom = msg.availfrom;
        var availto = msg.availto;
        var propid = msg.id; //uuvid
        var owneremail = msg.owneremail;
        var travelleremail = msg.travelleremail;
        var headline = msg.headline


        var property = {                                //to travellers table 
             bookedfrom : msg.bookedfrom,
             bookedto : msg.bookedto,
             propid : msg.propid, //uuvid
             owneremail : msg.owneremail,
             headline :  msg.headline
        }
    
        var p = {                                       //to owners table 
            bookedfrom : msg.bookedfrom,
            bookedto : msg.bookedto,
            bookedby : travelleremail
            // propid : msg.id, //uuvid
            // owneremail : msg.owneremail
       }
       var newUser; 

        newUserO  =  owner.findOneAndUpdate({"properties.$.propid" : propid},{ $push : {"properties.$.booking" : p}}).then((result)=>{
            if(result!= undefined){
                console.log("Property bOOKED !!")
                console.log("........................",result);
            //    callback(null,result)            
            }else{
                console.log("Error in listing property :( ",result);
            //    callback(null,null)
    
            }
        })
        newUser = {
            // t : newUserT,
            o : newUserO 
        }
		if (!newUser) {
			throw new Error('Error adding user');
		}
		return newUser
	}
}

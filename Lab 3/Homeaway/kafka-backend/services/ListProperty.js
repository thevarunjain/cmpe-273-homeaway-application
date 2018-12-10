
var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");
const uuidv4 = require('uuid/v4');

    
function handle_request(msg, callback){

console.log("\nIn List Property handle request\n")

var email = msg.email;
    var details = [{
     address : msg.address,
     headline : msg.headline,
     description : msg.description,
     propertytype : msg.propertytype,
     bedroom : msg.bedroom,
     accomodation : msg.accomodation,
     bathroom : msg.bathroom,
     availfrom : msg.availfrom,
     availto : msg.availto,
     rate : msg.rate,
     minstay : msg.minstay,
     propid : uuidv4(),
     ownerid : email
    }];
    console.log("\nPushing Property >>> \n",details);
    console.log("\n for owner :- ",email);

    owner.findOneAndUpdate({email: email},{ $push : {properties : details}}).then((result)=>{
        if(result!= undefined){
            console.log("\nProperty Listed !!\n\n",result)
            callback(null,result)
        }else{
            console.log("Error in listing property :( ",result);
            callback(null,result)
        }
    })

}

exports.handle_request = handle_request;



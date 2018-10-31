
var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");
    
function handle_request(msg, callback){

console.log("\nIn Traveller Profile Posting handle request\n")
console.log("\Profile for : ",msg.email);    

traveller.updateOne({email: msg.email},{                  
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
        console.log("Traveller Profile cant update :( ");
        callback(null,"Traveller Profile cant update :( ")
    }else{
        console.log("Traveller Profile updated !!");
        callback(null,"Traveller Profile updated !!")
    }
});
}

exports.handle_request = handle_request;

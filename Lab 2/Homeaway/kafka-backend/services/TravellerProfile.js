
var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");
    
function handle_request(msg, callback){

   
console.log("\nIn Traveller Profile handle request\n")
console.log("\Profile for : ",msg);    
            traveller.find({email : msg},          //conditions
                "firstname lastname about company country school hometown languages phone gender",   // what to return
                    function(err,result){
                if(err){
                    console.log("Error in fetching profile\n",err);
                    callback(null,"No profile found")
                     }
                    console.log("\nProfile Found >>>>>>\n\n",result);
                    callback(null,result)      // data to be sent backwards
                });

    }
exports.handle_request = handle_request;

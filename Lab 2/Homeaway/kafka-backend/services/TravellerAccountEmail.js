
var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");

    
function handle_request(msg, callback){

console.log("\nIn Traveller Account Email handle request\n")
    var oldemail = msg.oldemail;
    var newemail = msg.newemail;

    traveller.updateOne({email: oldemail},{email : newemail},{multi:true},function(err,log){
        if(err) {
            console.log("Error in changing email :( ",err);
            callback(null,err)
        }else{
            console.log("Changed Successfully !!",log);
            callback(null,err)
        }
    });
}

exports.handle_request = handle_request;



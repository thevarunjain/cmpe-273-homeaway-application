
var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");
var crypt = require("../../Backend/crypt");
    
function handle_request(msg, callback){

console.log("\nIn Traveller Account Password handle request\n")

var oldpass = msg.oldpass;
var email = msg.email;
var newpass = msg.newpass;

    crypt.createHash(newpass, function (hash) {
        passwordHash = hash;
        console.log("hash",hash);
        console.log("newpass",newpass);

        traveller.updateOne({email: email, password : oldpass},{$set : {password : newpass, passwordHash : hash}},{multi:true},function(err,log){
            if(log.nModified == 0) {
                console.log("Error in changing password :( ");
                callback(null,log)    
            }else{
                console.log("\n Password changed Successfully\n");
                callback(null,log)
            }
        });
    })
}

exports.handle_request = handle_request;



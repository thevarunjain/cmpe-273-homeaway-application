var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");
var crypt = require("../../Backend/crypt");
    
function handle_request(msg, callback){

console.log("\nIn Traveller Sign Up handle request\n")

var firstname = msg.firstname;
var lastname = msg.lastname;
var email = msg.email;
var password = msg.password;

var passwordHash;
crypt.createHash(password, function (hash) {
    passwordHash = hash;

    console.log("\nEmail : ",email + "\n Password : ",password+"\n Hash Value : "+ passwordHash + "\nFirst Name : ", firstname + "\nLast Name : ", lastname);

    traveller.find({
        email : email
    }).then((data)=>{
        console.log(data);  
        console.log(data.length);  
        if(data.length!=0){
            console.log("\nUser already exist with the email\n",email)
            callback(null,201)
        }else{
            console.log("done")
               new traveller({                // ES6 syntax
                    email,
                    password,
                    firstname,
                    lastname,
                    passwordHash
                    }).save().then((docs)=>{
                    console.log("Traveller created : ",docs);
                    callback(null,docs)
                },(err)=>{
                    console.log("Error in signing up");
                    callback(err,null)
    })

        }
    })

 
});
}
exports.handle_request = handle_request;



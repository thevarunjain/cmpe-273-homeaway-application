
var { traveller } = require("../../Backend/models/traveller");
// var crypt = require("./crypt");
// var jwt = require('jsonwebtoken');




function handle_request(msg, callback){
   console.log("message ...........",msg.email,msg.password);
  
    traveller.find({
        email : msg.email
    }).then((docs) => {
        console.log(".................",docs)

        if(docs.length!=0){
        var user = {                    // for creating JWT token
            id: docs.id,
            email: docs.email,
        };
        
        crypt.compareHash(msg.password, docs[0].passwordHash, function (err, isMatch) {
            console.log(isMatch,err)
            console.log(msg.password, docs[0].passwordHash)

            if (isMatch && !err) {
                //Create token if the password matched and no error was thrown
                var token = jwt.sign(user, "Lamborghini", {
                    expiresIn: 10080 // in seconds
                });
                res.value = docs;
                res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
               res.status(200).json({success: true, token: 'JWT' + token });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Authentication failed. Passwords did not match.'
                });
                console.log('Password did not match');
                console.log(err);
            }
        });
    }else{
        console.log("Authentication failed. User not found.");
        res.status(401).json({success: false, message: 'Authentication failed....User doesnot exist'});
    }
})
};

exports.handle_request = handle_request;



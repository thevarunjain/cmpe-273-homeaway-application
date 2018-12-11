//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("../Database/mongoose");
var { traveller } = require("../models/traveller");
var { owner } = require("../models/owner");
var { message } = require("../models/message");
var crypt = require("../crypt");
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');
var passport = require('passport');

// Log requests to console
app.use(morgan('dev'));

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('../passport')(passport);

app.use(bodyParser.json());

const router = express.Router()
  
router.post('/OwnerLogin',function(req,res){
    console.log("Inside Owner Login Post Request\n");
    var email = req.body.email;
    var password = req.body.password; 

    var passwordHash;
    crypt.createHash(password, function (hash){
            passwordHash = hash;
    })   
    //traveller login 
    owner.find({
        email : email
    }).then((docs) => {
        if(docs.length!=0){                 // if owner is found with that email
        var user = {                    // for creating JWT token
            id: docs.id,
            email: docs.email,
        };
        crypt.compareHash(req.body.password, docs[0].passwordHash, function (err, isMatch) {

            if (isMatch && !err) {                                          // if password is correct
                console.log("Owner Found", docs)
                //Create token if the password matched and no error was thrown
                var token = jwt.sign(user, "Lamborghini", {
                    expiresIn: 10080 // in seconds
                });
                res.value = docs;
                //res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
                res.status(200).json({success: true, token: 'JWT' + token });
            } else {                                                            // if password is wrong
                res.status(201).json({
                    success: false,
                    message: 'Authentication failed. Passwords did not match.'
                });
                console.log('Password did not match');
            console.log(err);
        }   
    })// end of create hash 
}// end of if 
                else{                
                new owner({                // ES6 syntax
                email,
                password,
                passwordHash
                }).save().then((docs)=>{
                console.log("Owner created : ",docs);
                    res.status(202).json({success: true, message: 'User Created'});
            },(err)=>{
                console.log("Error in signing up");
                callback(err,null)
            }) 
        }//end of else                
        }) // end of docs                                 
 
});




router.post('/OwnerDashboard', function(req,res){
    console.log("\nIn owner dashBoard\n" + req.body);
    //var msg = req.query.id;
    var msg = req.body.email 
    console.log("Data in mutation....",msg);
var arr = [];
    owner.find({email :msg},{properties : 1 ,_id : 0 }).then((result)=>{
        if(result != null){
        result.map((data)=>{
            data.properties.map((prop)=>{
                arr.push(prop)
            })
            });
        console.log("\nProperty Found >>>> \n\n",arr);
        // callback(null,arr)      // data to be sent backwards
    
        }else{
            callback(null,"No prop found")
            console.log("No property found");
        }
    })
    
    // kafka.make_request('owner_dashboard',email, function(err,results){
    //     console.log('Result from Kafka Backend\n', results);
    //     if (err){
    //         console.log("\n><><><><>< INSIDE ERROR ><><><><><");
    //         res.json({
    //             status:"error",
    //             msg :"NO Property Found."
    //         })
    //     }else{
    //         console.log("\nProperty for user " + email +" sent to client");
    //         res.writeHead(200,{
    //             'Content-Type' : 'application/json'
    //             })
    //             res.end(JSON.stringify(results));
    //         }
    // });
})



  module.exports = router;

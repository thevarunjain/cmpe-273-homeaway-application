//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
// var mysql = require('mysql');
// var pool = require('./pool');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var dateFormat = require('dateformat');
//var mongodb = require('mongodb');
var MongoClient = require("mongodb").MongoClient;
// var mongoose = require("../Backend/Database/mongoose");
var { traveller } = require("../models/traveller");
 var { owner } = require("../models/owner");
var crypt = require("../crypt");
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
var kafka = require('../kafka/client');
// app.use("/search", require("./Routes/Search"))
//Passport
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});

// Log requests to console
app.use(morgan('dev'));

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('../passport')(passport);

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); 

//use express session to maintain session data
app.use(session({
    secret              : 'hakuna matata',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));


app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


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




router.get('/OwnerDashboard', function(req,res){
    console.log("\nIn owner dashBoard\n" + req.body);
    var email = req.query.id;
    console.log(email);

    
    kafka.make_request('owner_dashboard',email, function(err,results){
        console.log('Result from Kafka Backend\n', results);
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            res.json({
                status:"error",
                msg :"NO Property Found."
            })
        }else{
            console.log("\nProperty for user " + email +" sent to client");
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(results));
            }
    });
})



  module.exports = router;

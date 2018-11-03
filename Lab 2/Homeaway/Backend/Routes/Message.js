//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var session = require('express-session');
// var cookieParser = require('cookie-parser');
// var cors = require('cors');
// var mysql = require('mysql');
// // var pool = require('./pool');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// var dateFormat = require('dateformat');
//var mongodb = require('mongodb');
// var MongoClient = require("mongodb").MongoClient;
var mongoose = require("../Backend/Database/mongoose");
// var { traveller } = require("../models/traveller");
//  var { owner } = require("../models/owner");
 var { message } = require("../models/message");
// var crypt = require("../crypt");
var morgan = require('morgan');
// var jwt = require('jsonwebtoken');
// const uuidv4 = require('uuid/v4');
var kafka = require('../kafka/client');
// app.use("/search", require("./Routes/Search"))
// //Passport
// var passport = require('passport');
// var requireAuth = passport.authenticate('jwt', {session: false});

// Log requests to console
app.use(morgan('dev'));

//require('./app/routes')(app);
// app.use(passport.initialize());

// Bring in defined Passport Strategy
// require('../passport')(passport);

//use cors to allow cross origin resource sharing
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); 

// //use express session to maintain session data
// app.use(session({
//     secret              : 'hakuna matata',
//     resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration      :  5 * 60 * 1000
// }));


app.use(bodyParser.json());

// //Allow Access Control
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
//   });


const router = express.Router()


router.post('/PostMessage', function(req,res){
    console.log("Inside Post Message\n");
    console.log(req.body); 
    
    var owneremail = req.body.owneremail 
    var propid = req.body.propid 
    var travelleremail = req.body.travelleremail 
    var question = req.body.question
    
        new message({                // ES6 syntax
            owneremail,
            propid,
            travelleremail,
            question
            }).save().then((docs)=>{
            console.log("Message Posted : ",docs);
        },(err)=>{
            console.log("Error in posting message");
    })
});

router.get('/GetMessage',function(req,res){
    console.log("Inside get message ");
    var email = req.query.id;                       // passing id as params in get request 

    console.log(email);
    message.findOne({
        owneremail : email
}).then((data)=>{
    console.log(data);    
    if(data.length!=0){
        res.writeHead(200,{
            'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(data));
        
    }
})    //end of then    
});

router.post('/ReplyMessage', function(req,res){
    console.log("Inside Post Message\n");
    console.log(req.body); 
    
    var owneremail = req.body.owneremail 
    var propid = req.body.propid 
    var travellermail = req.body.travellermail 
    var question = req.body.question
    var reply = req.body.reply
    
    message.findOne({
            owneremail,
            propid,
            travellermail,
            question
    }).then((data)=>{
        console.log(data);  
        console.log(data.length);  
        if(data.length!=0){                 //got message then reply 
            message.findOneAndUpdate({owneremail,propid,travellermail,question},    //where condition
                { $set : {reply : reply}}).then((result)=>{
                if(result!= undefined){
                    console.log("\n Replied Successfully !!\n\n",result)
                    res.status(200).json({success: true, message :  "Replied Successfully" });
                }else{
                    console.log("Error in replying :( ",result);
                    res.status(200).json({success: true, message :  "Replied Successfully" });                    
                }
            })
           } // end of if
           else{
            console.log("No Message Found")
            res.status(202).json({success: false, message :  "No Message Found" });

        }
    })
});


router.get('/GetReply',function(req,res){
    console.log("Inside get reply ");
    var email = req.query.id;                       // passing id as params in get request 

    console.log(email);
    message.findOne({
        travelleremail : email
}).then((data)=>{
    console.log(data);    
    if(data.length!=0){
        res.writeHead(200,{
            'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(data));
        
    }
})    //end of then    
})

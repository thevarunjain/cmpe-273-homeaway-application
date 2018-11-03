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
// var { owner } = require("./models/owner");
var crypt = require("../crypt");
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
var kafka = require('../kafka/client');
// app.use("/search", require("./Routes/Search"))
//Passport
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body.headline);
        const dir = `./uploads/property/${req.body.headline}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
            console.log(file);
        const newFilename = `${file.originalname}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage });

const storagepic = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Request to multer:' );
        console.log(req.body.email);
        
        cb(null, './uploads/profile');
    },
    filename: (req, file, cb) => {

        const newFilename = `profile_${req.body.email}.jpg`;
        cb(null, newFilename);
    },
});

const uploadpic = multer({ storage : storagepic });


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
// app.use(session({
//     secret              : 'hakuna matata',
//     resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration      :  5 * 60 * 1000
// }));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
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

  router.post('/ListProperty',upload.array('proppics',5), function(req,res){
    console.log("Inside List property\n");
    var reqdata = JSON.parse(req.body.propdata);
    

    kafka.make_request('list_property',reqdata, function(err,results){
        console.log('Result from Kafka Backend\n', results);
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("\nProperty Posted ...\n\n",results);
            res.status(200).json({ success : true, body : "Property listed Successfully"}).end("Posted Sucessfully");
            }
    });
});


    router.post('/BookProperty',function(req,res){
        console.log("Inside book property Request\n");
   
        kafka.make_request('book_property',req.body, function(err,results){
           console.log('Result from Kafka Backend\n', results);
           if (err){
               console.log("\n><><><><>< INSIDE ERROR ><><><><><");
               console.log("Error in Booking property :( ",err);
               res.sendStatus(400).json({
                   status:"error",
                   msg:"System Error, Try Again."
               }).end();
           }else{
               console.log("Property booked by  !!", req.body.travelleremail)
               console.log("\n Property Booked ", results);
                res.status(200).json({ success : true, body : "Property listed Successfully"}).end("Posted Sucessfully");
               }
       });

   
   });


router.post('/search', function(req,res){
    console.log("Searching in Database"); 
    console.log(req.body); 

    var place = req.body.place;
    var dateTo = new Date(req.body.dateto);
    var dateFrom = new Date(req.body.datefrom);
    var guest = req.body.guest;
    
    kafka.make_request('search_property',req.body, function(err,results){
        console.log('Result from Kafka Backend', results);
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("\nProperties sent to client");
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(results));
            }
    });
})

  module.exports = router;
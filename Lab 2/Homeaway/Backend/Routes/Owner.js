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
app.use(session({
    secret              : 'hakuna matata',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
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

    //check first same id exists, if yes, then 
    console.log(email);

    owner.findOne({email : email}).then((result)=>{
        if(result==null){               //no user with email found 
            new owner({                // ES6 syntax
                email,
                password
           }).save().then((docs)=>{
               console.log("Owner created : ",docs);
               res.cookie('cookieOwner',email,{maxAge: 900000, httpOnly: false, path : '/'});
               res.sendStatus(200).end();
           },(err)=>{
               console.log("Error in signing up");
               res.sendStatus(400).end();
           })
        }else{                          //user found, then update password
            owner.findOneAndUpdate({email : email},{$set : {password : password}}).then((data) => {
                 // console.log(data);
                  console.log("Owner found with email : ", email);
                  res.cookie('cookieOwner',email,{maxAge: 900000, httpOnly: false, path : '/'});
                  res.sendStatus(200).end();
            
              })
        }
 
    });
});

router.get('/OwnerDashboard', function(req,res){
    console.log("IN dashBoard " + req.body);
    var email = req.query.id;
    console.log(email);

    owner.find({email :email}).then((result)=>{
        if(result == null){
        console.log(result);
      //  console.log(JSON.stringify(result[0].properties));
        console.log(result[0].properties);
        console.log("Property Found");
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.json({"sucess": true , message : "property found" }).end(result[0].properties);
        }else{
            console.log("No property found");
            res.status(400).json({"sucess": false , message : "property not found" }).end("property not found" );
        }
    })

})

router.get('/OwnerDashboardBookedBy', function(req,res){
    console.log("IN dashBoard bokerrrrrrrrrrrrrrr " + req.body);
    var email = req.query.id;
    console.log(email);
})


  module.exports = router;

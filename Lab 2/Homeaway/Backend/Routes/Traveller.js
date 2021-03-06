//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
var mongoose = require("../Database/mongoose");
var { traveller } = require("../models/traveller");
var { owner } = require("../models/owner");
var { message } = require("../models/message");
var crypt = require("../crypt");
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');

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

app.use(bodyParser.json());


  const router = express.Router()

 router.post('/TravellerLogin', function(req,res){
    console.log("Inside Login Post Request\n");
    var email = req.body.email;
    var password = req.body.password;

    console.log("Email : ",email + " password : ",password);

    traveller.find({
        email : email
    }).then((docs) => {
        console.log(".................",docs)

        if(docs.length!=0){

        var user = {                    // for creating JWT token
            id: docs.id,
            email: docs.email,
        };
        
        crypt.compareHash(req.body.password, docs[0].passwordHash, function (err, isMatch) {
            console.log(isMatch,err)
            console.log(req.body.password, docs[0].passwordHash)

            if (isMatch && !err) {
                //Create token if the password matched and no error was thrown
                var token = jwt.sign(user, "Lamborghini", {
                    expiresIn: 10080 // in seconds
                });
                res.value = docs;
                //res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
               res.status(200).json({success: true, token: 'JWT' + token });
            } else {
                res.status(201).json({ 
                    success: false,
                    message: 'Authentication failed. Passwords did not match.'
                });
                console.log('Password did not match');
                console.log(err);
            }   
        });
    }else{
        console.log("Authentication failed. User not found.");
        res.status(202).json({success: false, message: 'Authentication failed....User doesnot exist'});
    }
})
});



router.get('/TravellerProfile',function(req,res){
    console.log("Inside get Traveller profile route" + req.session);
    var email = req.query.id;                       // passing id as params in get request 
    console.log(email);

    kafka.make_request('traveller_profile',email, function(err,results){
        console.log('Result from Kafka Backend\n', results);
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("\nProfile for user " + email +" sent to client");
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(results));
            }
    });

});


router.post('/TravellerProfile', function(req,res){
    console.log("Inside Posting Traveller Profile\n");
    var email = req.body.email;
    console.log(email); 

    kafka.make_request('traveller_profile_post',req.body, function(err,results){
        console.log('Result from Kafka Backend\n', results);
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("\nProfile for user " + email +" sent to client");
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(results));
            }
    });


});

router.post('/TravellerSignUp',function(req,res){
    console.log("Inside Traveller Sign up Request\n");


    kafka.make_request('traveller_sign_up',req.body, function(err,results){
        console.log('Result from Kafka Backend\n', results);
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            console.log("Error in signing up");
            res.sendStatus(400).json({
                status:"error",
                msg:"System Error, Try Again."
            }).end();
        }else if(results == 201){
            console.log("\n Traveller already there with email :- ", req.body.email);
            // res.cookie('cookie',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
             res.sendStatus(201).end(JSON.stringify(results));
            }else{
                console.log("\n Traveller created with email :- ", req.body.email);
                // res.cookie('cookie',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
                 res.sendStatus(200).end(JSON.stringify(results));
            }

    });

});

router.post('/TravellerAccountEmail',function(req,res){
    console.log("Inside Traveller Email Change Request\n");

    kafka.make_request('traveller_account_email',req.body, function(err,results){
        console.log('Result from Kafka Backend\n', );
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            console.log("Error in changing email :( ",err);
            res.status(201).json({success: false, message : ' Email Change Failed...' });
            res.end("Old Password Incorrect ");
        }else{
             console.log("\n Email changed", );
             console.log("Changed Successfully !!")
         //  res.cookie('cookie',req.body.newemail,{maxAge: 900000, httpOnly: false, path : '/'});
             res.status(200).json({success: true, message : 'Changed Successfully' });
             res.end("Changed Successfully");
            }
    });

});


router.post('/TravellerAccountPassword',function(req,res){
    console.log("Inside Traveller Password Change Request\n");
 
    kafka.make_request('traveller_account_password',req.body, function(err,results){
        console.log('Result from Kafka Backend\n');
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            console.log("Error in changing password :( ");
            res.status(201).json({success: false, message : ' Password Change failed..' });
            res.end("Old Password Incorrect ");
            
        }else if(results  == 201){
            console.log("\n Incorrect Old Password \n");           
            //res.cookie('cookie',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
            res.status(201).json({success: false, message : ' Incorrect Old Password' });
            res.end("Incorrect Old Password");
        }else if(results == 200){
            console.log("\n Password changed Successfully\n");           
            //res.cookie('cookie',req.body.email,{maxAge: 900000, httpOnly: false, path : '/'});
            res.status(200).json({success: true, message : ' Password Changed Successfully' });
            res.end("Password Changed Successfully");
            }
    });
});

router.get('/TravellerTrip', function(req,res){
    console.log("IN trav trip " + req.body);
    var email = req.query.id;
    console.log(email);

    kafka.make_request('traveller_trip',email, function(err,results){
        console.log('Result from Kafka Backend\n', results);
        if (err){
            console.log("\n><><><><>< INSIDE ERROR ><><><><><");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
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
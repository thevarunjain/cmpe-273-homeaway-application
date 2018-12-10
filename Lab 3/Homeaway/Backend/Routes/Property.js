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
var morgan = require('morgan');
var kafka = require('../kafka/client');


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


app.use(bodyParser.json());

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
        console.log("Inside book property Request\n",req.body);
   
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
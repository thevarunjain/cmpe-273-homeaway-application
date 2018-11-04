//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("../Database/mongoose");
 var { traveller } = require("../models/traveller");
 var { owner } = require("../models//owner");
var { message } = require("../models/message");
var morgan = require('morgan');
var kafka = require('../kafka/client');
app.use(morgan('dev'));

app.use(bodyParser.json());

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

module.exports = router;

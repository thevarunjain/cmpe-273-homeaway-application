//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
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


app.get('/', function(req,res){
    res.send("Calculator app opened succesfully");    
    console.log("Inside of root route");
});

app.post('/', function(req,res){
    console.log(req.body.exp);
  
        var result = eval(req.body.exp);
        // if(result==null){
        //     console.log("Invalid Expression");
        //             res.writeHead(201,{
        //                 'Content-Type' : 'text/plain'
        //             })
                    
        //             res.end("Could Not Evaluate");   
        //         }else{
                                       
                  res.send(JSON.stringify(result));
                    console.log("Answer : " + result ); 
                    
                  console.log(result);

                    // res.writeHead(200,{
                    //     'Content-Type' : 'application/json'
                    // })
                    
    
                // }
    
 

});


app.listen(3001, function(req,res){
    console.log("Listening server on 3001...");
})


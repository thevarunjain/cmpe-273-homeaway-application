//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var pool = require('./pool');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true })); 

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


  var Users = [{
    username : "admin",
    password : "admin"
}]

app.get('/', function(req,res){
    console.log("Inside Root Folder");
    res.end("Connection Established");  
    })

app.post('/login',function(req,res){
        console.log("Inside Login Post Request\n");
        var username = req.body.username;
        var password = req.body.password;
        var sql = "SELECT *  FROM user WHERE username = " + 
                mysql.escape(username) + "and password = " + mysql.escape(password);
        console.log(sql + " FIRED >>>>>>\n")
        pool.query(sql,function(err,result){
            if(err){
            console.log(err);
            }
            else{
                console.log(result)
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user = result;
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Successful Login");
                    console.log("\nLogin Successfully\n");
            }
        }
        );
});

app.post('/search', function(req,res){
    console.log("Searching in Database" + req.body);

    var place = req.body.place;
    var dateTo = req.body.dateTo;
    var dateFrom = req.body.dateFrom;
    var guest = req.body.guest;

    var sql = "SELECT * FROM property where place = " + mysql.escape(place) +
    "and dateTo = " +mysql.escape(dateTo)+
    "and dateFrom = " +mysql.escape(dateFrom)+
    "and guest = " +mysql.escape(guest);

    console.log(sql + " FIRED >>>>>>\n")

    pool.query(sql,function(err,result){
        if(err) throw err;
        console.log("Property Found");
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
    })


})
app.listen(3001);
console.log("Server Listening on port 3001");
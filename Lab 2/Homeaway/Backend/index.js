//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var mongoose = require("../Backend/Database/mongoose");
var { traveller } = require("./models/traveller");
var { message } = require("./models/message");
var { owner } = require("./models/owner");
var crypt = require("./crypt");
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
var kafka = require('./kafka/client');

//Passport
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});

// Log requests to console
app.use(morgan('dev'));

//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./passport')(passport);

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

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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

app.post('/ProfilePicture', uploadpic.single('selectedFile'), (req, res) => {
        console.log("Inside Post profile picture");
        console.log("Res : ",res.file);
        console.log("REq Desc: ", req.body.email);
        res.send();
    });

app.post('/GetProfilePicture/:file(*)',(req, res) => {
      console.log("Inside Get profile picture ");
      var file = req.params.file;
      console.log(file);
      var fileLocation = path.join(__dirname + '/uploads/profile',file);
      var img = fs.readFileSync(fileLocation);
      var base64img = new Buffer(img).toString('base64');
      res.writeHead(200, {'Content-Type': 'image/jpg' });
      res.end(base64img);
    });

app.post('/getpropertypic/:file(*)',(req, res) => {
        console.log("Inside Get property picture");
        var file = req.params.file;
        var fileLocation = path.join(__dirname + '/uploads/property/' + file );
        var base64img = [];

        fs.readdirSync(fileLocation).forEach(file => {
            console.log(file);
            var img = fs.readFileSync(fileLocation + '/' + file);
            base64img.push(new Buffer(img).toString('base64'));
        })

        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(JSON.stringify(base64img));

    });

app.post('/getpropertypicsingle/:file(*)',(req, res) => {
        console.log("Inside Get Property pic Single");
        var file = req.params.file;
        console.log(file);
        var fileLocation = path.join(__dirname + '/uploads/property/' + file );
        var base64img = '';

        fs.readdirSync(fileLocation).forEach(file => {
            console.log(file);
            var img = fs.readFileSync(fileLocation + '/' + file);
            base64img = new Buffer(img).toString('base64');

        })
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(base64img);

    });

app.use(require("../Backend/Routes/Traveller"));
app.use(require("../Backend/Routes/Owner"));
app.use(require("../Backend/Routes/Property"));
app.use(require("../Backend/Routes/Message"))

app.listen(3001);
console.log("Server Listening on port 3001");
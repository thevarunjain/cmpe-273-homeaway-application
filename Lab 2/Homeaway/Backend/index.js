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
var mongoose = require("../Backend/Database/mongoose");
var { traveller } = require("./models/traveller");
var { owner } = require("./models/owner");
var crypt = require("./crypt");
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

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

app.get('/', function(req,res){
    console.log("Inside Root Folder");
    res.end("Connected")
    
});


app.post('/ProfilePicture', uploadpic.single('selectedFile'), (req, res) => {
        //console.log("Req : ",req);
        console.log("Res : ",res.file);
        console.log("REq Desc: ", req.body.email);
        res.send();
    });

app.post('/GetProfilePicture/:file(*)',(req, res) => {
      console.log("Inside get profile pic file");
      var file = req.params.file;
      console.log(file);
      var fileLocation = path.join(__dirname + '/uploads/profile',file);
      var img = fs.readFileSync(fileLocation);
      var base64img = new Buffer(img).toString('base64');
      res.writeHead(200, {'Content-Type': 'image/jpg' });
      res.end(base64img);
    });

app.post('/getpropertypic/:file(*)',(req, res) => {
        console.log("Inside get property pic");
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
        console.log("Inside get profile pic");
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

   

app.post('/TravellerLogin', function(req,res){
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
                    res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
                   res.status(200).json({success: true, token: 'JWT' + token });
                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Authentication failed. Passwords did not match.'
                    });
                    console.log('Password did not match');
                    console.log(err);
                }
            });
        }else{
            console.log("Authentication failed. User not found.");
            res.status(401).json({success: false, message: 'Authentication failed....User doesnot exist'});
        }
    })
});

app.get('/TravellerProfile',function(req,res){
    console.log("Inside get Traveller profile route" + req.session);
    var email = req.query.id;                       // passing id as params in get request 
    console.log(email);

    traveller.find({email : email},          //conditions
        "firstname lastname about company country school hometown languages phone gender",   // what to return
    function(err,result){
        if(err){
            console.log(err);
        }
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
    });

});


app.post('/TravellerProfile', function(req,res){
    console.log("Inside Login Traveller Profile\n");
    
    //var email = req.query.id;
    var email = req.body.email;
    console.log(email); 

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var about = req.body.about;
    var company = req.body.company;
    var country = req.body.country;
    var school = req.body.school;
    var hometown = req.body.hometown;
    var languages = req.body.languages;
    var gender = req.body.gender;
    var phone = req.body.phone;

    traveller.updateOne({email: email},{                   //where condition
    firstname : firstname, 
    lastname: lastname,
    about : about,
    company : company,
    country : country,
    school :school,
    hometown : hometown,
    languages : languages,
    gender : gender,
    phone : phone },{multi:true},
    function(err,log){
        if(err) {
            console.log("Traveller Profile cant update :( ");
        }else{
            console.log("Traveller Profile updated !!")
        }

    });

});


app.post('/ListProperty',upload.array('proppics',5), function(req,res){
    console.log("Inside list property\n");
    var reqdata = JSON.parse(req.body.propdata);
    
    var email = reqdata.email;
    var property = new Array;
    var details = [{
     address : reqdata.address,
     headline : reqdata.headline,
     description : reqdata.description,
     propertytype : reqdata.propertytype,
     bedroom : reqdata.bedroom,
     accomodation : reqdata.accomodation,
     bathroom : reqdata.bathroom,
     availfrom : reqdata.availfrom,
     availto : reqdata.availto,
     rate : reqdata.rate,
     minstay : reqdata.minstay,
     propid : uuidv4(),
     ownerid : email
    }];
    console.log("Pushing Property >>> ",details);
    console.log("Owner email ",email);

    owner.findOneAndUpdate({email: email},{ $push : {properties : details}}).then((result)=>{
        if(result!= undefined){
            console.log("Property Listed !!")
            console.log("........................",result);
            res.status(200).json({ success : true, body : "Property listed Successfully"}).end("Posted Sucessfully");
        }else{
            console.log("Error in listing property :( ",result);
        }
    })




});

app.post('/TravellerSignUp',function(req,res){
    console.log("Inside Traveller Sign up Request\n");
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    var passwordHash;
    crypt.createHash(password, function (hash) {
        passwordHash = hash;

        console.log("Email : ",email + "\n Password : ",password+"\n Hash Value : "+ passwordHash + "\nFirst Name : ", firstname + "\nLast Name : ", lastname);

        new traveller({                // ES6 syntax
             email,
             password,
             firstname,
             lastname,
             passwordHash
        }).save().then((docs)=>{
            console.log("Traveller created : ",docs);
            res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
            res.sendStatus(200).end();
        },(err)=>{
            console.log("Error in signing up");
            res.sendStatus(400).end();
        })

    });
});

app.post('/TravellerAccountEmail',function(req,res){
    console.log("Inside Traveller Email Change Request\n");
    var oldemail = req.body.oldemail;
    var newemail = req.body.newemail;

    traveller.updateOne({email: oldemail},{email : newemail},{multi:true},function(err,log){
        if(err) {
            console.log("Error in changing email :( ",err);
            res.status(201).json({success: false, message : ' Password Change failed..' });
            res.end("Old Password Incorrect ");
        }else{
            res.cookie('cookie',newemail,{maxAge: 900000, httpOnly: false, path : '/'});
            res.status(200).json({success: true, message : 'Changed Successfully' });
                res.end("Changed Successfully");
            console.log("Changed Successfully !!",log)
        }
    });


});


app.post('/TravellerAccountPassword',function(req,res){
    console.log("Inside Traveller Password Change Request\n");
    var oldpass = req.body.oldpass;
    var email = req.body.email;
    var newpass = req.body.newpass;
                

    crypt.createHash(newpass, function (hash) {
        passwordHash = hash;
        console.log("hash",hash);
        console.log("newpass",newpass);

        traveller.updateOne({email: email, password : oldpass},{$set : {password : newpass, passwordHash : hash}},{multi:true},function(err,log){
            if(log.nModified == 0) {
                console.log("Error in changing password :( ",log);
                res.status(201).json({success: false, message : ' Password Change failed..' });
                res.end("Old Password Incorrect ");
    
            }else{
    
                res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
                res.status(200).json({success: true, message : ' Password Changed Successfully' });
                res.end("Password Changed Successfully");
                console.log("\n Password changed Successfully\n",log);
            }
        });
    })
});

app.post('/BookProperty',function(req,res){
    console.log("Inside book property Request\n");
    var availfrom = req.body.availfrom;
    var availto = req.body.availto;
    var propid = req.body.id; //uuvid
    var owneremail = req.body.owneremail;
    var travelleremail = req.body.travelleremail;
    var headline =  req.body.headline
    //var travelleremail = "varunsj18@gmail.com";
    console.log(req.body);

    var property = {                                //to travellers table 
         bookedfrom : req.body.availfrom,
         bookedto : req.body.availto,
         propid : req.body.id, //uuvid
         owneremail : req.body.owneremail,
         headline :  req.body.headline
    }

    var p = {                                       //to owners table 
        bookedfrom : req.body.availfrom,
        bookedto : req.body.availto,
        bookedby : travelleremail
        // propid : req.body.id, //uuvid
        // owneremail : req.body.owneremail
   }
 
    traveller.findOneAndUpdate({email : travelleremail}, {$push : { properties :  property}}).then((result)=>{
        if(result!= undefined){
            console.log("Property booked by  !!", travelleremail)
            console.log("........................",result);
            res.status(200).json({ success : true, body : "Property booked Successfully"}).end("Booked Sucessfully");
        }else{
            console.log("Error in Booking property :( ",result);
        }
    })

    owner.findOneAndUpdate({"properties.propid" : propid},{ $push : {"properties.$.booking" : p}}).then((result)=>{
        if(result!= undefined){
            console.log("Property Listed !!")
            console.log("........................",result);
          //  res.status(200).json({ success : true, body : "Property listed Successfully"}).end("Posted Sucessfully");
        }else{
            console.log("Error in listing property :( ",result);
        }
    })

});

app.post('/OwnerLogin',function(req,res){
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

app.get('/OwnerDashboard', function(req,res){
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

app.get('/OwnerDashboardBookedBy', function(req,res){
    console.log("IN dashBoard bokerrrrrrrrrrrrrrr " + req.body);
    var email = req.query.id;
    console.log(email);
})

app.get('/TravellerTrip', function(req,res){
    console.log("IN trav trip " + req.body);
    var email = req.query.id;
    console.log(email);

    var arr = [ ];
    traveller.find({email : email}, {properties : 1 ,_id : 0 }).then((result)=>{
      if(result!= null){
        result.map((data)=>{
            data.properties.map((prop)=>{
                console.log(prop);
                arr.push(prop)
            })
            });
            console.log(".............",arr);
            console.log("Property Found");
           res.writeHead(200,{
               'Content-Type' : 'application/json'
           })
           res.end(JSON.stringify(arr));
        }else{
            console.log(result)
            console.log("No property found");
        }
        
        })







})

app.post('/search', function(req,res){
    console.log("Searching in Database"); 
    console.log(req.body); 

    var place = req.body.place;
    var dateTo = req.body.dateto;
    var dateFrom = req.body.datefrom;
    var guest = req.body.guest;
    
    var arr = [ ];
   console.log(place,dateFrom,dateTo,guest)
    var q = "properties.accomodation";
   owner.find({ })
    .then((result,err)=>{
        if(result.length != 0 ){
            console.log("........result",result)

        result.map((data)=>{
            data.properties.map((prop)=>{
                if(prop.accomodation >= guest && prop.address.includes(place) && prop.availto >= dateTo && prop.availfrom <= dateFrom)
              arr.push(prop)
            });
        })
             console.log("dddddddddddddddd",arr);
             console.log("Property Found");
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(arr));
        //    console.log(JSON.stringify(arr));
      }else{
        console.log(result)
        console.log("No property found");
      }
    })
})

app.listen(3001);
console.log("Server Listening on port 3001");
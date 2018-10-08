//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var pool = require('./pool');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var dateFormat = require('dateformat');

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

app.post('/TravellerLogin',function(req,res){
        console.log("Inside Login Post Request\n");
        var email = req.body.email;
        var password = req.body.password;
        var sql = "SELECT *  FROM traveller WHERE email = " + 
                mysql.escape(email) + "and password = " + mysql.escape(password);
        console.log(sql + " FIRED >>>>>>\n")

        pool.getConnection(function(err,con){
            if(err){
                console.log(err);
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Could Not Get Connection Object");
            }else{
        con.query(sql,function(err,result){
            if(err){
            console.log(err);
            }   
            else if(result!=0){
                console.log(result)
                res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
                req.session.user = result;
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Successful Login");
                    console.log("\nLogin Successfully\n");
            }
            else{
                console.log("No user found");
                res.writeHead(201,{
                    'Content-Type' : 'text/plain'
                })
                res.end("No user found");

            }
        }
        );
    }})
});

app.get('/TravellerProfile',function(req,res){
    console.log("Inside get Traveller profile route" + req.session);
    var email = req.query.id;
    console.log(email);
    var sql = "SELECT * FROM traveller where email = " + mysql.escape(email);

    console.log(sql);
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{

    con.query(sql,function(err,result){
        if(err){
            console.log(err);
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })

                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                    res.end(JSON.stringify(result));
                    console.log(JSON.stringify(result));
                }
            });

        }})

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

            var sql = "UPDATE traveller SET firstname = " + mysql.escape(firstname) 
            + ", lastname = " +mysql.escape(lastname)
            + ", about = " +mysql.escape(about)
            + ", country = " +mysql.escape(country)
            + ", company = " +mysql.escape(company)
            + ", school = " +mysql.escape(school)
            + ", hometown = " +mysql.escape(hometown)
            + ", languages = " +mysql.escape(languages)
            + ", gender = " +mysql.escape(gender)
            + ", phone = " +mysql.escape(phone)
            + "where email  = " + mysql.escape(email) +';';

    console.log(sql + " FIRED >>>>>>\n");

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){

        if(err){
        console.log(err);
        res.end("Changes failed")
        }   
        else{
            console.log(result)
            req.session.user = result;
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end(" Changes has been done Successfully");
                console.log("\n Changes has been done Successfully\n");
        }
    }
    );
}})
});


app.post('/ListProperty',upload.array('proppics',5), function(req,res){
    console.log("Inside list property\n");

    var email = req.body.email;
    var address = req.body.address;
    var headline = req.body.headline;
    var description = req.body.description;
    var propertytype = req.body.propertytype;
    var bedroom = req.body.bedroom;
    var accomodation = req.body.accomodation;
    var bathroom = req.body.bathroom;
    var availfrom = req.body.availfrom;
    var availto = req.body.availto;
    var rate = req.body.rate;
    var minstay = req.body.minstay;


            var sql = "insert into property (email, address, headline, description, propertytype, bedroom, accomodation, bathroom, availfrom, availto, rate, minstay) values ("
            + "  " +mysql.escape(email) + " , " 
            + "  " +mysql.escape(address) + " , " 
            + "  " +mysql.escape(headline)+ " , " 
            + "  " +mysql.escape(description)+ " , " 
            + "  " +mysql.escape(propertytype)+ " , " 
            + "  " +mysql.escape(bedroom)+ " , " 
            + "  " +mysql.escape(accomodation)+ " , " 
            + "  " +mysql.escape(bathroom)+ " , " 
            + "  " +mysql.escape(availfrom)+ " , " 
            + "  " +mysql.escape(availto)+ " , " 
            + "  " +mysql.escape(rate)+ " , " 
            + "  " +mysql.escape(minstay)+ " ); " 
       

    console.log(sql + " FIRED >>>>>>\n");
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){

        if(err){
        console.log(err);
        res.end("Changes failed")
        }   
        else{
            console.log(result)
            res.cookie('cookieOwner',email,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = result;
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end(" Changes has been done Successfully");
                console.log("\n Changes has been done Successfully\n");
        }
    }
    );
}})
});

app.post('/TravellerSignUp',function(req,res){
    console.log("Inside Login Post Request\n");
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var sql1 = "INSERT INTO traveller VALUES ( " + 
            mysql.escape(email) + " , " + mysql.escape(password) 
            + " , " +mysql.escape(firstname)+ " , " +mysql.escape(lastname) + ")";

    var sql = "insert into traveller ( email, password, firstname, lastname) values ("
            + "  " +mysql.escape(email) + " , " 
            + "  " +mysql.escape(password)+ " , "
            + "  " +mysql.escape(firstname)+ " , "
            + "  " +mysql.escape(lastname)+ " ) "

    console.log(sql + " FIRED >>>>>>\n")

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{

    con.query(sql,function(err,result){

        if(err){
        console.log(err);
        res.end("Sign Up failed")
        }   
        else{
            console.log(result)
            res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = result;
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Sign Up");
                console.log("\nSign Up  has been doneSuccessfully\n");
        }
    }
    );}})
});

app.post('/TravellerAccountEmail',function(req,res){
    console.log("Inside Traveller Account Request Request\n");
    var oldemail = req.body.oldemail;
    var newemail = req.body.newemail;

    var sql = "update traveller set email = " +mysql.escape(newemail) + "where email = "+mysql.escape(oldemail);

    console.log(sql + " FIRED >>>>>>\n")

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){

        if(err){
        console.log(err);
        res.end("Sign Up failed")
        }   
        else{
            console.log(result)
            res.cookie('cookie',newemail,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = result;
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Sign Up");
                console.log("\nSign Up  has been doneSuccessfully\n");
        }
    }
    ); }})
});


app.post('/TravellerAccountPassword',function(req,res){
    console.log("Inside Traveller Account Request Request\n");
    var oldpass = req.body.oldpass;
    var email = req.body.email;
    var newpass = req.body.newpass;

    var sql = "update traveller set password = " +mysql.escape(newpass) + "where email = "+mysql.escape(email) +" and password = " + 
    mysql.escape(oldpass);

    console.log(sql + " FIRED >>>>>>\n")
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){

        if(err){
        console.log(err);
        res.end("Sign Up failed")
        }   
        else{
            console.log(result)
            res.cookie('cookie',email,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = result;
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Password Changed Successfully");
                console.log("\n Password changed Successfully\n");
        }
    }
    );}})
});

app.post('/BookProperty',function(req,res){
    console.log("Insidebook properyt Request\n");
    var availfrom = req.body.availfrom;
    var availto = req.body.availto;
    var id = req.body.id;
    var email = req.body.email;
    console.log(req.body);
    console.log(availfrom)
    
   var sql =  "select * from property where id =  " + mysql.escape(id) + " and date(availfrom) <= "
   + availfrom+ " and date(availto) >= " + availto;

//    var sql = "update traveller set password = " +mysql.escape(newpass) + "where email = "+mysql.escape(email) +" and password = " + 
  //   mysql.escape(oldpass);

    console.log(sql + " FIRED >>>>>>\n")
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){

        if(err){
        console.log(err);
        res.end("Sign Up failed")
        }   
        else if(result!=null){

            var sql1 = "insert into booking (id, bookfrom, bookto, email) values ("
            + "  " +mysql.escape(id)+ " , " 
            + "  " +mysql.escape(availfrom) + " , " 
            + "  " +mysql.escape(availto) + " , " 
            + "  " +mysql.escape(email) + " );" 

            console.log(sql1 + " FIRED >>>>>>\n")
            con.query(sql1,function(err,result){

             if(err){
             console.log(err);
             res.end("Sign Up failed")
              }   
             else{
                {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Successfully Booked Property");
                    console.log("Successfully Booked Property")
                }
             }
        });
    }
    });
}})
});


app.post('/OwnerLogin',function(req,res){
    console.log("Inside Login Post Request\n");
    var email = req.body.email;
    var password = req.body.password;
   var sql1 = "SELECT *  FROM owner WHERE email = " + mysql.escape(email);

   var sql = "INSERT INTO owner VALUES ( " + 
   mysql.escape(email) + " , " + mysql.escape(password) + ")";

    console.log(sql1 + " FIRED >>>>>>\n") 
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{

    con.query(sql1,function(err,result){
        if(err){
        console.log(err);
        }
        else if(result.length!=0){
            console.log(result)
            res.cookie('cookieOwner',email,{maxAge: 900000, httpOnly: false, path : '/'});
            req.session.user = email;
            console.log( "session data "+req.session.user);
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successful Login");
                console.log("\nLogin Successfully\n");
        }   
        else if(result.length==0){
            console.log(sql + " FIRED >>>>>>\n")
            con.query(sql,function(err,result){
                if(err){
                console.log(err);
                }   
                else if(result!=null){
                    console.log(result)
                    res.cookie('cookieOwner',email,{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = result;
                    console.log( req.session);
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Successful Login");
                        console.log("\nLogin Successfully\n");
                }
                else{
                    console.log("No user found");
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("No user found");
        
                }


        });   
    }
}
    );
}})
});

app.get('/OwnerDashboard', function(req,res){
    console.log("IN dashBoard " + req.body);
    var email = req.query.id;
    console.log(email);
    var sql = "SELECT property.*, booking.email FROM property JOIN booking ON booking.id = property.id and property.email = " 
    + mysql.escape(email); 

    console.log(sql + " FIRED >>>>>>\n")
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){
        if(err) throw err;
        if(result!=null){

        console.log("Property Found");
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
        console.log(result);
    }
    else{
        console.log("No property found");
        console.log(JSON.stringify(result));
        console.log(result);
    } 
    })
        }})

})


app.get('/OwnerDashboardBookedBy', function(req,res){
    console.log("IN dashBoard bokerrrrrrrrrrrrrrr " + req.body);
    var email = req.query.id;
    console.log(email);
    var sql = "SELECT email from booking where id = ( select id from property where email = " + mysql.escape(email) + ");";  

    console.log(sql + " FIRED >>>>>>\n")
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            // console.log("1");

            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){
        if(err) throw err;
        if(result!=null){
            console.log("2");

        console.log("Property Found");
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })

        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
        console.log(result);
    }
    else{
                
        console.log("No property found");
        console.log(JSON.stringify(result));
        console.log(result);
    }
    })
        }})

})


app.get('/TravellerTrip', function(req,res){
    console.log("IN trav trip " + req.body);
    var email = req.query.id;
    console.log(email);

   // var sql = "SELECT * FROM property where email = " + mysql.escape(email);

 var sql =   "SELECT booking.id, booking.*, property.address, property.headline, property.description, property.rate " +
"FROM booking LEFT JOIN property ON booking.id = property.id and booking.email = " + mysql.escape(email); 

    console.log(sql + " FIRED >>>>>>\n")
    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
    con.query(sql,function(err,result){
        if(err) throw err;
        if(result!=null){

        console.log("Property Found");
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
        console.log(result);
    }
    else{
        console.log("No property found");
        console.log(JSON.stringify(result));
        console.log(result);
    }
    })
}})


})



app.post('/search', function(req,res){
    console.log("Searching in Database" + req.body);

    var place = req.body.place;
    var dateTo = req.body.dateTo;
    var dateFrom = req.body.dateFrom;
    var guest = req.body.guest;


 
   var sql =  "select * from property where address like '%"+place+"%' and date(availfrom) <= "
   + mysql.escape(dateFrom)+ " and date(availto) >= " + mysql.escape(dateTo) + " and accomodation >= "+ guest;

 

    console.log(sql + " FIRED >>>>>>\n")

    pool.getConnection(function(err,con){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{

    con.query(sql,function(err,result){
        if(err) throw err;
        if(result!=null){

        console.log("Property Found");
        res.writeHead(200,{
            'Content-Type' : 'application/json'
        })
        res.end(JSON.stringify(result));
        console.log(JSON.stringify(result));
        console.log(result);
    }
    else{
        console.log("No property found");
        console.log(JSON.stringify(result));
        console.log(result);
    }
    })

        }})
})
app.listen(3001);
console.log("Server Listening on port 3001");
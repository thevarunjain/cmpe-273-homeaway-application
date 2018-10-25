var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://varun:cmpe273@ds037498.mlab.com:37498/cpme_273_homeaway",{ useNewUrlParser: true } ,(err) =>{    //Homeaway is a DB name
    if(err){
        console.log("Error while connecting Mongoose",err)
    }else{
            console.log("Mongoose connected on port 37498 on Mlab");
        }
}) 

module.exports = {mongoose};
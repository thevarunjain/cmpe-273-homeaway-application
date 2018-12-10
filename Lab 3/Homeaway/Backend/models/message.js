var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({    // Creating Schema with userSchema Name 
    owneremail   :   {
        type : String
    },
    propid:   {
        type : String
    },
    travelleremail:  {
        type : String
    },    
    question : {
        type : String
    },
    reply :  {
        type : String
    }
})

var message = mongoose.model("message", userSchema)     // creating a model 

module.exports = {message};
  
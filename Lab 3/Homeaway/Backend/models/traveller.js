var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({    // Creating Schema with userSchema Name 
    email   :   {
        type : String
    },
    password:   {
        type : String
    },
    passwordHash:  {
        type : String
    },
    firstname:  {
        type : String
    },
    lastname:  {
        type : String
    },
    about : { 
        type : String
    },
    company :{ 
        type : String
    },
    country : { 
        type : String
    },
    school : {
        type : String
     },
    hometown : {
        type : String
     },
    languages : {
        type : String
     },
    gender : { 
        type : String
    },
    phone : {
        type : String
     },
    properties : {
        type : Array
    }
})

//var traveller = mongoose.model("traveller", userSchema)     // creating a model 

module.exports = mongoose.model("traveller", userSchema)
  
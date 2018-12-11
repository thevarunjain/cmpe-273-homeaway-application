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
    propertyid : {
        type : String
    },
    properties :  {
        type : Array
    }
})

var owner = mongoose.model("owner", userSchema)     // creating a model 

module.exports = {owner}
  
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://admin:cmpe273@54.215.252.101:27017/admin",{ useNewUrlParser: true } ,(err) =>{    //Homeaway is a DB name
    if(err){
        console.log("Error while connecting Mongoose",err)
    }else{
            console.log("Mongoose connected on port 37498 on Mlab");
        }
}) 



'use strict'

const Schema = mongoose.Schema

const recruiterSchema = new Schema({
  id: {
    type: String,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone_number: {
    type: Number
  },
  company: {
    type: String
  },
  profile_image: {
    type: String
  },
  banner_image: {
    type: String
  }
}, {
  timestamps: true
})

recruiterSchema.method({
  transform () {
    const transformed = {}
    const fields = ['id', 'name', 'address', 'phone_number', 'company', 'profile_image', 'banner_image']
    fields.forEach((field) => {
      transformed[field] = this[field]
    })
    return transformed
  }
})

r = mongoose.model('Recruiter', recruiterSchema)


r.find().then((e)=>{
    console.log(e)
})

// new traveller({                // ES6 syntax
//     email : "a",
//     password: "a",
//     firstname: "a",
//     lastname: "a",
//     passwordHash: "a"
//     }).save().then((docs)=>{
//     console.log("Traveller created : ",docs);
//     callback(null,docs)
// },(err)=>{
//     console.log("Error in signing up");
//     callback(err,null)
// })
  
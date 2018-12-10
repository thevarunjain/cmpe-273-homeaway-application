// var mysql = require('mysql');
// var pool = mysql.createPool({
//     connectionLimit : 500,
//     port : '3306',
//     host : '127.0.0.1',
//     user : "root",
//     password : "",
//     database : "homeaway"
// });

// module.exports = pool;


const MongoClient = require('mongodb').MongoClient;

//MongoClient.connect('mongodb://localhost:27017/Homeaway', (err,connect)=>{
MongoClient.connect('mongodb://varun:cmpe273@ds037498.mlab.com:37498/cpme_273_homeaway',{ useNewUrlParser: true } , (err,connect)=>{
if(err){
    console.log("Could not connect to MongoDB");
}
else{
    console.log("Connection Successfull !!!");
    connect.close();
}
})
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 100,
    port : '3306',
    host : 'localhost',
    user : "root",
    password : "",
    database : "homeaway"
});

pool.getConnection(err =>{
    if(err){
        console.log(err);

    }
else{
    console.log("Data Base Connected")
}    
});

module.exports = pool;
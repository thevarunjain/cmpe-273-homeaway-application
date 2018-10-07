var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 100,
    port : '3306',
    host : '127.0.0.1',
    user : "root",
    password : "",
    database : "homeaway"
});

module.exports = pool;
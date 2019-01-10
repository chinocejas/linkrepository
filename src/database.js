const mysql = require('mysql'); //No support Async await
const {database} = require('./keys');
const {promisify} = require('util'); //convert code Callbacks to promise

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('Database connection was closed');
        }
        if (err.code === 'ERR_CON_COUNT_ERROR'){
            console.log('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED'){
            console.log('Database connection was refused!');
        }
    }
    //console.log(connection);
    if(connection){
        connection.release();
        console.log('Database is connect'); 
    }   
});

pool.query = promisify(pool.query); //for each database consult convert  promisify to pool query 

module.exports = pool;


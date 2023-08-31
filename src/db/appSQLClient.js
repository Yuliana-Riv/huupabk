'use strict'

const mysql = require('mysql');
const { promisify }= require('util');




/*
 

*/

 const config = {
  host     : 'localhost',
  user     : 'huupa_user_32fhd',
  password : 'puIVrihhg]j!',
  database : 'huupa_db_32fhd',
 }
 /**
const config = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'huupa_db_32fhd', 
 } */

  //port: 3245

const pool = mysql.createPool(config);

pool.getConnection((err, connection) =>{
  let message ='Success'

    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
         
          message='Database connection was closed.'
         
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
        
          message='Database has to many connections'
        }
        if (err.code === 'ECONNREFUSED') {
    
          message='Database connection was refused'
        }
      }
    
      if (connection) connection.release();

      message == 'Success' ? message ='Success: Huupa DB is Conected' : message= 'Error: '+message
      console.log(message);
    
      return;
})


// Promisify Pool Querys
pool.query = promisify(pool.query);
module.exports = pool ;
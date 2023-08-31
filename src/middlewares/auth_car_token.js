'use strict'
var jwt = require('jwt-simple');
var dayjs = require('dayjs')
var clv = "wd-#2j5d1d_dd";

exports.authenticated = function(req, res, next){

    // Comprobar si llega la cabecera de autorizacion
    if(!req.headers.authorization){
        return res.status(403).send({
            status:'error',
            message: null
        });
    }
   
    // Limpiar el token y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g,'');
   
    try{
        // Decodificar token
        var payload = jwt.decode(token, clv);
       
    
    }catch(ex){
        return res.status(404).send({
            status:'error',
            message: null
        });
    }
 
  
  
    next();
};
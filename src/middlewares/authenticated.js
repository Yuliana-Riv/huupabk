'use strict'

var dayjs = require('dayjs')
var ncrypt = require("../services/ncrypt/index")

exports.authenticated = function(req, res, next){

    // Comprobar si llega la cabecera de autorizacion
    if(!req.headers.authorization){
        return res.status(403).send({
            status:'error',
            message: 'Acceso Bloqueado'
        });
    }
   
    // Limpiar el token y quitar comillas
    var token = req.headers.authorization.replace(/['"]+/g,'');
   
    try{
        // Decodificar token
        const ncryptData = new ncrypt();
        var payload = ncryptData._decryptData(token)
        // Comprobar la expiración del token
        if(payload.exp <=  dayjs().format()){
            return res.status(404).send({
                status:'error',
                message: 'Token no valido'
            });
        }
    
    }catch(ex){
        return res.status(404).send({
            status:'error',
            message: 'Acceso Bloqueado'
        });
    }
    
    // Adjuntar usuario identificado a la request para poder asi acceder al usuario 
    req.user = payload;

    // Pasar a la acción
  
    next();
};
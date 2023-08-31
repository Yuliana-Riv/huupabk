"use strict"
var global_paramsModel =require( "./model");
var global_paramsRepo = require("./repo");

let validService = require("../../services/validator/validateParams")

const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new global_paramsRepo();
    const _model = new global_paramsModel( _repo);
  

    let item = await _model.getAll();
    let status ='success'
    let message ='item'
  
    const validate = new validService()
   
   /* let payload = req.user
    let validAdm = validate.validAdm(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos2.',
        result:result
      });
    }*/


   
     if(item == 'No se encontraron coincidencias.' || item == 'error' ){
        status='error'
        message = item
        
     }

     return res.status(200).send({
      status: status,
      message: message,
      result: item
    });



    
  },

  getById: async  (req, res) => {
    const _repo = new global_paramsRepo();
    const _model = new global_paramsModel( _repo);
   

    let id = parseInt(req.params.id);

    const validate = new validService()



   
    let payload = req.user
    let validAdm = validate.validAdm(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos2.',
        result:result
      });
    }


    let validID = validate.validNum(id)
    if(!validID){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.',
           
          });
    }


    let item = await _model.getById(id);
   
    let status;
    let message='item encontrado.'

   


    if(item == 'No se encontraron coincidencias.' || item == 'error' ){
     
      status = 'error'
      message = item
      
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: item
    });
  },

 

  
  create: async (req, res) => {
    
    const _repo = new global_paramsRepo();
    const _model = new global_paramsModel( _repo);
    let {shipping_price, free_shipping, texto} = req.body
    let payload = req.user
   
  
    let status ='success';
    let message ='item creada con exito.'
    let result =''

    const validate = new validService()


    let validAdm = validate.validAdm(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos2.',
        result:result
      });
    }



   
    let validshipping_price = validate.validNum(shipping_price)
    let validfree_shipping = validate.validNum(free_shipping)
    let validtexto = validate.validParam(texto)

    if(!validshipping_price || !validfree_shipping ){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    if(!validtexto) texto ='';

    
    const data = {shipping_price, free_shipping,texto}
         
    result = await _model.create(data);
    let added ='_'

    if(result != 'success'){
    status='error'
    message=result

    
    
    }else{
        added = await _model.last()
    }

    
    
    return res.status(200).send({
        message:message,
        status:status,
        result:result,
        added:added
    });
    

  },

  update: async(req, res) =>{
    const _repo = new global_paramsRepo();
    const _model = new global_paramsModel( _repo);

    let {id, shipping_price, free_shipping, texto}  = req.body
    

    let message='item actualizado con exito.'
    let result =''
    let status ='success';

    const validate = new validService()

    let payload = req.user
    let validAdm = validate.validAdm(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    let validId = validate.validNum(id)

    if(!validId ){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
        result:result
      });
    }

    let getById = await _model.getById(id);

    
    //validar datos
    if(getById == 'No se encontraron coincidencias.' || getById == 'error'){
      return res.status(200).send({
        status: 'error',
        message: 'item no encontrado.',
        result:result
      });
    }

    let validshipping_price = validate.validNum(shipping_price)
    let validfree_shipping = validate.validNum(free_shipping)
    let validtexto = validate.validParam(texto)


    !validshipping_price ? shipping_price = getById.shipping_price : shipping_price 
    !validfree_shipping ? free_shipping = getById.free_shipping : free_shipping 
    !validtexto ? texto = '' : texto 
   
    const data = {id ,shipping_price, free_shipping, texto}

    result = await _model.update(data);

      if(result != 'success'){
        status='error'
        message =result
      }
      return res.status(200).send({
          message:message,
          status:status
      });
      
  },


  delete: async  (req, res) => {
    const _repo = new global_paramsRepo();
    const _model = new global_paramsModel( _repo);
    let params = req.body;

    let payload = req.user
    const validate = new validService()
    let validAdm = validate.validAdm(payload.role)

    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
      
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
       
      });
    }
   
   

    let id = parseInt(params.id);
    if(id==undefined || isNaN(id)){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
       
      });
    }


    let result = await _model.delete(id);
    let message;
    let status ='success';
    result == 'success' ? message ='item eliminado' : message= result

    result != 'success' ? status = 'error' : status

    return res.status(200).send({
      message: message,
      status: status,
    });
  },









 


};








module.exports = controller;

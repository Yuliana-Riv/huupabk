"use strict"
var stockModel =require( "./model");
var stockRepo = require("./repo");

let validService = require("../../services/validator/validateParams")

const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new stockRepo();
    const _model = new stockModel( _repo);
  

    let stock = await _model.getAll();
    let status ='success'
    let message ='stock'
   
   

   
     if(stock == 'No se encontraron coincidencias.' || stock == 'error' ){
        status='error'
        message = stock
        
     }

     return res.status(200).send({
      status: status,
      message: message,
      result: stock
    });



    
  },

  getByProduct: async  (req, res) => {
    const _repo = new stockRepo();
    const _model = new stockModel( _repo);
    
    let id = parseInt(req.params.id);

    const validate = new validService()
    let validID = validate.validNum(id)
    if(!validID){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.',
           
          });
    }


    let stock = await _model.getByProduct(id);
    let status ='success'
    let message ='stock'
   
   

   
     if(stock == 'No se encontraron coincidencias.' || stock == 'error' ){
        status='error'
        message = stock
        
     }

     return res.status(200).send({
      status: status,
      message: message,
      result: stock
    });



    
  },

  getById: async  (req, res) => {
    const _repo = new stockRepo();
    const _model = new stockModel( _repo);
   

    let id = parseInt(req.params.id);

    const validate = new validService()
    let validID = validate.validNum(id)
    if(!validID){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.',
           
          });
    }


    let stock = await _model.getById(id);
   
    let status;
    let message='stock encontrado.'

   


    if(stock == 'No se encontraron coincidencias.' || stock == 'error' ){
     
      status = 'error'
      message = stock
      
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: stock
    });
  },

  search: async  (req, res) => {
    const _repo = new stockRepo();
    const _model = new stockModel( _repo);
   
    let search = req.params.search;
    let stock = await _model.search(search);
    

    let status= 'success';
    let message='Se han encontrado coincidencias.'

    if(stock == 'No se encontraron coincidencias.' || stock == 'error' ){
      status = 'error'
      message = stock
    }

   
     
    return res.status(200).send({
      status: status,
      message:message,
      result: stock,
      
    });
  },

  
  create: async (req, res) => {
    
    const _repo = new stockRepo();
    const _model = new stockModel( _repo);
    let {id_product, stock} = req.body
    let payload = req.user
   
  
    let status ='success';
    let message ='stock creada con exito.'
    let result =''

    const validate = new validService()


    /*let validAdm = validate.validAdm(payload.role)


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
    }*/



   
    let validid_product = validate.validNum(id_product)
    let validstock = validate.validNum(stock)
    
    if(!validid_product || !validstock){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    
    let data ={id_product, stock}
         
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
    const _repo = new stockRepo();
    const _model = new stockModel( _repo);

    let {id, id_product, stock}  = req.body
    

    let message='stock actualizada con exito.'
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
        message: 'stock no encontrada.',
        result:result
      });
    }

    
    let validid_product = validate.validNum(id_product)
    let validstock = validate.validNum(stock)
    
    !validid_product ? id_product = getById.id_product : id_product 
    !validstock ? stock = getById.stock : stock 
   
   
    id = parseInt(id);

    let data ={
        id,
        id_product,
        stock
    }

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
    const _repo = new stockRepo();
    const _model = new stockModel( _repo);
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
    result == 'success' ? message ='stock eliminado' : message= result

    result != 'success' ? status = 'error' : status

    return res.status(200).send({
      message: message,
      status: status,
    });
  },









 


};








module.exports = controller;

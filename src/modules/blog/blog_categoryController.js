"use strict"
var blog_categoryModel =require( "./blog_categoryModel");
var blog_categoryRepo = require("./blog_categoryRepo");

let validService = require("../../services/validator/validateParams")

const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new blog_categoryRepo();
    const _model = new blog_categoryModel( _repo);
  

    let item = await _model.getAll();
    let status ='success'
    let message ='item'
    
    const validate = new validService()
    

   

   
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


  getByBlog: async (req, res) => {
    const _repo = new blog_categoryRepo();
    const _model = new blog_categoryModel( _repo);
   

    let id = parseInt(req.params.id);

    const validate = new validService()
    let validID = validate.validNum(id)
    if(!validID){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.',
           
          });
    }


    let item = await _model.getByBlog(id);
   
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

  getById: async  (req, res) => {
    const _repo = new blog_categoryRepo();
    const _model = new blog_categoryModel( _repo);
   

    let id = parseInt(req.params.id);

    const validate = new validService()
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

  search: async  (req, res) => {
    const _repo = new blog_categoryRepo();
    const _model = new blog_categoryModel( _repo);
   
    let search = req.params.search;
    let item = await _model.search(search);
    
   
   
    const validate = new validService()
   

  
    let status= 'success';
    let message='Se han encontrado coincidencias.'

    if(item == 'No se encontraron coincidencias.' || item == 'error' ){
      status = 'error'
      message = item
    }

   
     
    return res.status(200).send({
      status: status,
      message:message,
      result: item,
      
    });
  },

  
  create: async (req, res) => {
    
    const _repo = new blog_categoryRepo();
    const _model = new blog_categoryModel( _repo);
    let {id_blog, id_category} = req.body
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
    }/**/



   
    let validIdBlog = validate.validParam(id_blog)
    if(!validIdBlog){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }
    let validIdCat = validate.validParam(id_category)
    if(!validIdCat){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    
    id_blog = parseInt(id_blog);
    id_category = parseInt(id_category);
         
    result = await _model.create(id_blog, id_category);
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
    const _repo = new blog_categoryRepo();
    const _model = new blog_categoryModel( _repo);

    let {id, name}  = req.body
    

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

    let validName = validate.validParam(name)
    !validName ? name = getById.name : name 
   
    name = name.toUpperCase();
    id = parseInt(id);

    result = await _model.update(id, name);

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
    const _repo = new blog_categoryRepo();
    const _model = new blog_categoryModel( _repo);
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

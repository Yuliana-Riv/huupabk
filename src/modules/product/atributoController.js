"use strict"
var atributoModel =require( "./atributoModel");
var atributoRepo = require("./atributoRepo");

let validService = require("../../services/validator/validateParams")

const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new atributoRepo();
    const _model = new atributoModel( _repo);
  

    let atributo = await _model.getAll();
    let status ='success'
    let message ='Atributo'
   
   

   
     if(atributo == 'No se encontraron coincidencias.' || atributo == 'error' ){
        status='error'
        message = atributo
        
     }else{

        let reorder=[]
        for (const item of atributo) {
            const values = await _model.getAtributoValores(item.id)
            reorder.push({
              ...item,
              values
            })
        }
        atributo = reorder

     }

     return res.status(200).send({
      status: status,
      message: message,
      result: atributo
    });



    
  },

  getById: async  (req, res) => {
    const _repo = new atributoRepo();
    const _model = new atributoModel( _repo);
   

    let id = parseInt(req.params.id);

    const validate = new validService()
    let validID = validate.validNum(id)
    if(!validID){
        return res.status(200).send({
            status: 'error',
            message: 'Tipo de dato no valido.',
           
          });
    }


    let atributo = await _model.getById(id);
   
    let status;
    let message='Atributo encontrado.'

   


    if(atributo == 'No se encontraron coincidencias.' || atributo == 'error' ){
     
      status = 'error'
      message = atributo
      
    }else{

      const values = await _model.getAtributoValores(atributo.id)

      const item = {
        ...atributo,
        values
      }
      atributo = item

   }

     
    return res.status(200).send({
      status: status,
      message: message,
      result: atributo
    });
  },

  search: async  (req, res) => {
    const _repo = new atributoRepo();
    const _model = new atributoModel( _repo);
   
    let search = req.params.search;
    let atributo = await _model.search(search);
    
   
    
   


  
    let status= 'success';
    let message='Se han encontrado coincidencias.'

    if(atributo == 'No se encontraron coincidencias.' || atributo == 'error' ){
      status = 'error'
      message = atributo
    }else{

      let reorder=[]
      for (const item of atributo) {
          const values = await _model.getAtributoValores(item.id)
          reorder.push({
            ...item,
            values
          })
      }
      atributo = reorder

   }

   
     
    return res.status(200).send({
      status: status,
      message:message,
      result: atributo,
      
    });
  },

  
  create: async (req, res) => {
    
    const _repo = new atributoRepo();
    const _model = new atributoModel( _repo);
    let {name} = req.body
    let payload = req.user
   
  
    let status ='success';
    let message ='Atributo creada con exito.'
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
        message: 'Datos no validos.',
        result:result
      });
    }



   
    let validName = validate.validParam(name)
    if(!validName){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    
    name =name.toUpperCase() 
         
    result = await _model.create(name);
    let added ='_'

    if(result != 'success'){
    status='error'
    message=result

    
    
    }else{
        added = await _model.last()

        const values = await _model.getAtributoValores(added.id)

        const item = {
          ...added,
          values
        }
        added = item
    }

    
    
    return res.status(200).send({
        message:message,
        status:status,
        result:result,
        added:added
    });
    

  },

  createValor: async (req, res) => {
    
    const _repo = new atributoRepo();
    const _model = new atributoModel( _repo);
    let {id_atributo, valor} = req.body
    let payload = req.user
   
  
    let status ='success';
    let message ='Atributo creada con exito.'
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
        message: 'Datos no validos.',
        result:result
      });
    }



   
    let validvalor = validate.validParam(valor)
    let validid_atributo = validate.validNum(id_atributo)

    if(!validvalor || !validid_atributo){ 
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido.',
        result:result
      });
    }

    
         
    result = await _model.createValor(id_atributo, valor);
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
    const _repo = new atributoRepo();
    const _model = new atributoModel( _repo);

    let {id, name}  = req.body
    

    let message='Atributo actualizada con exito.'
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
        message: 'Atributo no encontrada.',
        result:result
      });
    }

    let validName = validate.validParam(name)
    !validName ? name = getById.name : name 
   
    name =name.toUpperCase() 
   
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
    const _repo = new atributoRepo();
    const _model = new atributoModel( _repo);
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
    result == 'success' ? message ='Atributo eliminada' : message= result

    result != 'success' ? status = 'error' : status

    return res.status(200).send({
      message: message,
      status: status,
    });
  },

  
  deleteValor: async  (req, res) => {
    const _repo = new atributoRepo();
    const _model = new atributoModel( _repo);
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


    let result = await _model.deleteValor(id);
    let message;
    let status ='success';
    result == 'success' ? message ='Valor eliminado' : message= result

    result != 'success' ? status = 'error' : status

    return res.status(200).send({
      message: message,
      status: status,
    });
  },









 


};








module.exports = controller;

"use strict"
var categoriesModel =require( "./model");
var categoriesRepo = require("./repo");
var validator = require("validator");

let validService = require("../../services/validator/validateParams")

const controller = {
 
  categories: async  (req, res) => {
    const categoryRepo = new categoriesRepo();
    const modelCtg = new categoriesModel( categoryRepo);
    let result = await modelCtg.categories();
    let cvtresult =[] 
    let status;

    if(result != 'No se encontraron coincidencias'){
      status = 'success'

      for(var i =0; i<result.length; i++){
          let parent_name ='NINGUNA'
          for(var a=0; a<result.length; a++){
             if(result[i].id_parent== result[a].id  ){
               result[i].id_parent == 1 ? parent_name = 'NINGUNA' : parent_name = result[a].name
              
             }
          }

          let model = {
            id: result[i].id,
            name: result[i].name,
            id_parent: result[i].id_parent,
            parent_name: parent_name
          }
          
          cvtresult.push(model);
      }
     
    }else{
      status = 'error'
      cvtresult ='No se encontraron coincidencias'
    }
    return res.status(200).send({
      message: "Categorias",
      status: status,
      result: cvtresult
    });
  },

  categoryById: async  (req, res) => {
    const categoryRepo = new categoriesRepo();
    const modelCtg = new categoriesModel( categoryRepo);
    let id = parseInt(req.params.id);
    if(isNaN(id) ){
      return res.status(200).send({
          status: 'error',
          message: 'Tipo de dato no valido.'
      });
   }

    let category = await modelCtg.categoryById(id);
   
    let status;

    if(category != 'Categoría no encontrada'){
      let result = await modelCtg.categories();
      let parent_name ='NINGUNA'
      for(var a=0; a<result.length; a++){
        if(category.id_parent== result[a].id  ){
          category.id_parent == 1 ? parent_name = 'NINGUNA' : parent_name = result[a].name
         
        }
      }

       let model = {
       id: category.id,
       name: category.name,
       id_parent: category.id_parent,
       parent_name: parent_name
     }
      category = model;
      status = 'success'
    }else{
      status = 'error'
    }
     
    return res.status(200).send({
      status: status,
      result: category
    });
  },

  categoryByCategory: async(req, res) =>{
    const categoryRepo = new categoriesRepo();
    const modelCtg = new categoriesModel( categoryRepo);
    let id = parseInt(req.params.id);

    
    if(isNaN(id) ){
      return res.status(200).send({
          status: 'error',
          message: 'Tipo de dato no valido.'
      });
   }

    let categorias = await modelCtg.findByParent(id);
    let allcategorias = await  modelCtg.categories();
    let result=[]
    let aux=[]
    
    let status;
   

    if(categorias.length>0){
      for(var i =0; i< categorias.length; i++){
          let cat = categorias[i]
          aux.push(cat)
          result.push(cat)
      }
     }
      
      let aux2 =[]
  
      while(aux.length>0){
          
          for(var a =0; a< aux.length; a++){
              let categorias = await modelCtg.findByParent(aux[a].id);
              if(categorias.length>0){
                
                  for(var b =0; b< categorias.length; b++){
                      let cat = categorias[b]
                      aux2.push(cat)
                      result.push(cat)
                  }
              }
          }
   
          aux = aux2
          aux2 =[]
      }
              
       result.length >0? result : result='No se encontraron coincidencias'
      
       let cvtresult =[] 

       if(result != 'No se encontraron coincidencias'){
        for(var i =0; i<result.length; i++){
          let parent_name ='NINGUNA'
          for(var a=0; a< allcategorias.length; a++){
             if(result[i].id_parent==  allcategorias[a].id  ){
               result[i].id_parent == 1 ? parent_name = 'NINGUNA' : parent_name =  allcategorias[a].name
              
             }
          }

          let model = {
            id: result[i].id,
            name: result[i].name,
            id_parent: result[i].id_parent,
            parent_name: parent_name
          }
          
          cvtresult.push(model);
        }
     

         status='success'
       }else{
         status='error'
         cvtresult ='No se encontraron coincidencias'
       }
    
     
    return res.status(200).send({
      status: status,
      result: cvtresult
    });
  },

  search: async  (req, res) => {
    const categoryRepo = new categoriesRepo();
    const modelCtg = new categoriesModel( categoryRepo);
    let search = req.params.search;
    let result = await  modelCtg.search(search);
    let cvtresult =[] 
    let status;

    if(result != 'No se encontraron coincidencias'){
      status = 'success'

      for(var i =0; i<result.length; i++){
          let parent_name ='NINGUNA'
          for(var a=0; a<result.length; a++){
             if(result[i].id_parent== result[a].id  ){
               result[i].id_parent == 1 ? parent_name = 'NINGUNA' : parent_name = result[a].name
              
             }
          }

          let model = {
            id: result[i].id,
            name: result[i].name,
            id_parent: result[i].id_parent,
            parent_name: parent_name
          }
          
          cvtresult.push(model);
      }
     
    }else{
      status = 'error'
      cvtresult ='No se encontraron coincidencias'
    }
     
    return res.status(200).send({
      status: status,
      result: cvtresult
    });
  },


  create: async  (req, res) => {
    const categoryRepo = new categoriesRepo();
    const modelCtg = new categoriesModel( categoryRepo);
    let {name,id_parent} = req.body;

    
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


    let validname = validate.validParam(name)

    if(!validname){
      return res.status(200).send({
        message: "Formato no valido.",
      });
    }

    let validid_parent = validate.validNum(id_parent)

    if(!validid_parent){
      return res.status(200).send({
        status:'error',
        message: "Tipo de dato no valido.",
      });
    }
   
    
    
    name = name.toUpperCase();
   
    //guardar
    let category = await modelCtg.create(name,id_parent);
    let status = 'success'

    let added ='_'

    if(category !='success'){
      status ='error'
    }else{
      added = await modelCtg.last()
    }

    return res.status(200).send({
      status: status,
      message: category,
      added:added
    });
  },

  updateCategory: async (req, res) => {
    const categoryRepo = new categoriesRepo();
    const modelCtg = new categoriesModel( categoryRepo);
    let {id, name, id_parent} = req.body;

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

    let validate_id = validate.validNum(id);
    let validate_name =  validate.validParam(name);
    let validate_id_parent =  validate.validNum(id_parent)
    
    if (!validate_id || !validate_id_parent) {
    return res.status(200).send({
      status:'error',
      message: "Datos no validos.",
    });
    }

    let categoryById = await modelCtg.categoryById(id);
    let categoryParent;

    if(id  != 1 ){
      if( id_parent !=0 ){
        categoryParent = await modelCtg.categoryById(id_parent);
      }else{
        return res.status(200).send({
          status:'error',
          message: "Datos no validos. Parent no valido",
        });
      }
      
    }

    if(id == id_parent){
      return res.status(200).send({
        status:'error',
        message: "Datos no validos.",
      });
    }


    if(id  != 1){
      if(categoryParent.id_parent == categoryById.id){
        return res.status(200).send({
          status:'error',
          message: "Error parent bucle.",
        });
      }
    }

   

    !validate_name ? name = categoryById.name : name = name
    !validate_id_parent ? id_parent = categoryById.id_parent : id_parent = id_parent
    
    name = name.toUpperCase();
    id = parseInt(id);
    id_parent = parseInt(id_parent)

    id == 1 ? id_parent = 0 : id_parent

   
    //guardar
    
    let category = await modelCtg.updateCategory(id, name, id_parent);
    let status = 'success'

    if(category !='success'){
      status ='error'
    }

    return res.status(200).send({
      status: status,
      message: category,
      categoryById: categoryById,
      categoryParent: categoryParent
    });
  },

  deleteCategory: async  (req, res) => {
    const categoryRepo = new categoriesRepo();
    const modelCtg = new categoriesModel( categoryRepo);
    let params = req.body;


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

    let validid = validate.validNum(params.id)
    if(!validid){
      return res.status(200).send({
        status: 'error',
        message: 'Tipo de dato no valido.',
      });
    }

    if(params.id == 1){
      return res.status(200).send({
        status:'error',
        message: "Accion no valida.",
      });
    }

    let id = parseInt(params.id);
    let result = await modelCtg.deleteCategory(id);
  
    let status='success';
    result != 'success' ? status = 'error' : status
    
    return res.status(200).send({
      message: result,
      status: status,
    });
  },


};

module.exports = controller;

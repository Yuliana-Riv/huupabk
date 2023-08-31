



//* servicios.
var wishlistModel =require( "./wishlistModel");
var wishlistRepo = require("./wishlistRepo");


const controller = {



    findAll: async  (req, res) => {
        const repoType = new wishlistRepo();
        const modelType = new wishlistModel( repoType);
        let  result  = await modelType.findAll();
    
        let status;
    
        let reorder =[]

        if(result != 'No se encontraron coincidencias' && result != 'error'){
          status = 'success'
        
          for(var i=0; i<result.length; i++){

            let model ={
                "id": result[i].id,
                "id_product": result[i].id_product,
                "id_user": result[i].id_user,
                "created_at": result[i].created_at,
                "updated_at": result[i].updated_at,
                "name": result[i].name,
                "lastname": result[i].lastname,
                "email": result[i].email,
                "pass": result[i].pass,
                "phone": result[i].phone,
                "role": result[i].role,
                "image": result[i].image,
                "id_category": result[i].id_category,
                "id_variante": result[i].id_variante,
                "descrp": result[i].descrp,
                "url": result[i].url,
                "status": result[i].status,
                "price": result[i].price,
                "code": result[i].code
            }

            reorder.push(model)

          }

        
        }else{
          status = 'error'
          reorder = result
        }
    
        return res.status(200).send({
          status:status,
          result: reorder
        });
      },
    
      
    
    
      findById: async  (req, res) => {
        const repoType = new wishlistRepo();
        const modelType = new wishlistModel( repoType);
        let id = parseInt(req.params.id);
        if(id == undefined || isNaN(id)){
            return res.status(200).send({
                status:'error',
                result: 'Datos no validos.'
              });
        }
        let result = await modelType.findById(id);
        
        let status;
        let model;
        if(result != 'No se encontraron coincidencias' && result != 'error'){
          status = 'success'

           model ={
            "id": id,
            "id_user": result.id_user,
            "id_product":result.id_product,
            "created_at": result.created_at,
            "updated_at": result.updated_at,
            "name": result.name,
            "lastname": result.lastname,
            "email": result.email,
            "pass": result.pass,
            "phone": result.phone,
            "role": result.role,
            "image": result.image,
            "id_category": result.id_category,
            "id_variante": result.id_variante,
            "descrp": result.descrp,
            "url": result.url,
            "status": result.status,
            "price": result.price,
            "code": result.code
            }

           
        }else{
          status = 'error'
          model = result
        }
         
        return res.status(200).send({
          status: status,
          result: model
        });
      },
    
      
    
    
      findByCustomer: async  (req, res) => {
        const repoType = new wishlistRepo();
        const modelType = new wishlistModel( repoType);
        let id = parseInt(req.params.id);
        let result = await modelType.findByCustomer(id);
        
        let status;
        
        if(id == undefined || isNaN(id)){
            return res.status(200).send({
                status:'error',
                result: 'Datos no validos.'
              });
        }
        /*let model;*/
        let reorder =[]

        if(result != 'No se encontraron coincidencias' && result != 'error'){
          status = 'success'
        
          for(var i=0; i < result.length; i++){

            let model ={
                "id": result[i].id,
                "id_product": result[i].id_product,
                "id_user": result[i].id_user,
                "created_at": result[i].created_at,
                "updated_at": result[i].updated_at,
                "name": result[i].name,
                "lastname": result[i].lastname,
                "email": result[i].email,
                "pass": result[i].pass,
                "phone": result[i].phone,
                "role": result[i].role,
                "image": result[i].image,
                "id_category": result[i].id_category,
                "id_variante": result[i].id_variante,
                "descrp": result[i].descrp,
                "url": result[i].url,
                "status": result[i].status,
                "price": result[i].price,
                "code": result[i].code
            }
            reorder.push(model)
          }

        }else{
          status = 'error'
          reorder = result
        }
    
        return res.status(200).send({
          status: status,
          result: reorder
        });
      },



    
      search: async  (req, res) => {
        const repoType = new wishlistRepo();
        const modelType = new wishlistModel( repoType);
        let search = req.params.search;
    
      
        let result = await modelType.search(search);
        let status;
        let reorder =[]
        if(result != 'No se encontraron coincidencias' && result != 'error'){
          status = 'success'

          for(var i=0; i<result.length; i++){


            let model ={
                "id": result[i].id,
                "id_product": result[i].id_product,
                "id_user": result[i].id_user,
                "created_at": result[i].created_at,
                "updated_at": result[i].updated_at,
                "name": result[i].name,
                "lastname": result[i].lastname,
                "email": result[i].email,
                "pass": result[i].pass,
                "phone": result[i].phone,
                "role": result[i].role,
                "image": result[i].image,
                "id_category": result[i].id_category,
                "id_variante": result[i].id_variante,
                "descrp": result[i].descrp,
                "url": result[i].url,
                "status": result[i].status,
                "price": result[i].price,
                "code": result[i].code
            }

            reorder.push(model)

          }

        }else{
          status = 'error'
          reorder = result
         
        }
        return res.status(200).send({
          status: status,
          result: result,
          
        });
      },
    

    wishCreate: async (req, res) => {
        const itemRepo = new wishlistRepo();
        const modelItem = new wishlistModel( itemRepo);
        let params = req.body 
        
        let status = 'success'
        let message ='Agregada a la lista con exito.'

        let validParams = validateParams(params)

        if(validParams.status =='error'){
            return res.status(200).send({
                status: validParams.status,
                result: validParams.result,
                message: validParams.message
            });
        }

        //Todo: validar restricciones 
/*
        couponRestrictionsCustomers,
        couponRestrictionsProducts,
        couponRestrictionsCategories,
*/         
        
        
        

        let wishlist = {
            "id_user": params.id_user,
            "id_product":params.id_product,
            "created_at": params.created_at,
            "updated_at": params.updated_at,
            "name": params.name,
            "lastname": params.lastname,
            "email": params.email,
            "pass": params.pass,
            "phone": params.phone,
            "role": params.role,
            "image": params.image,
            "id_category": params.id_category,
            "id_variante": params.id_variante,
            "descrp": params.descrp,
            "url": params.url,
            "status": params.status,
            "price": params.price,
            "code": params.code
         };
    
        
        let result = await modelItem.create(wishlist);
       
 
        let added ='_';
 
        if(result !='success'){
          status ='error'
          message = result
        }else{
          added = await modelItem.last()

        }
 
        return res.status(200).send({
          status: status,
          message: message,
          added: added
        });
       
       
    },


    delete: async  (req, res) => {
        const itemRepo = new wishlistRepo();
        const modelItem = new wishlistModel( itemRepo);
        let params = req.body;

        if(params.id == undefined || isNaN(params.id)){
            return res.status(200).send({
                message: 'Tipo de dato no valido.',
                status: 'error',
           });
        }
        
        let id = parseInt(params.id);
        let result = await modelItem.delete(id);
        let msg;
    
        result != 'success' ? msg ='Error al intentar eliminar el producto de la lista.' : msg='Producto eliminado.'
        let status;

        result != 'success' ? status ='error' :  status ='success'
        return res.status(200).send({
            message: msg,
            status: status,
        });
    },

   
  


  
}; 



let validateParams = (params) =>{
    
    let {
        id_user, id_product
     } = params;
     
     if(id_user == undefined || id_user =='' || id_user == null){
        return {
            status: 'error',
            message:'Id no valido.',
            result: 1
        };
    }

    if(id_product == undefined || id_product =='' || id_product == null){
        return {
            status: 'error',
            message:'Id no valido.',
            result: 2
        };
    }

    





    return {
        status: 'success',
        message:'Datos validos.',
        result: 0
    }


    //code


}













module.exports = controller;



 /*
let coupon = {

    name,
    descrp,
    code,

    status, // ACTIVO / INACTIVO
    
   
    date_a, //periodo de tiempo "desde"
    date_b, //periodo de tiempo "a"
    
    
    freeShipping, // SI / NO
   
    totalAvailable,
    totalAvailableCustomer, // veces que un usuario puede usarlo.
    
    minAmount,
    maxAmount,
  
   
    type, // procentaje, importe 
    value,
    
    limitCustomers, // true false
    ExcludeCustomers,//true false

    limitCategories, // true false
    ExcludeCategories,//true false

    limitProducts, // true false
    ExcludeProducts,//true false

}


couponRestrictionsCustomers = { 
    id_cupon,
    customer_email,
    type, excluir / limitar
}

couponRestrictionsProducts= { 
    id_cupon,
    product,
    type, excluir / limitar
}

couponRestrictionsCategories = { 
    id_cupon,
    category,
    type, excluir / limitar
}

 couponsUsed {
     id_cupon,
     customer_email
 }

 couponsPurchase {
     id_cuopon,
     id_purchase
 }







 {
    "name":"Código Cimas",
    "descrp":"10% de descuento",
    "code":"K24JHKK4JHBHCFH2C2",
    "cstatus":"ACTIVO", 
    "date_a":"2021-12-20", 
    "date_b":"2021-12-20", 
    "freeShipping":"NO", 
    "totalAvailable":"10",
    "totalAvailableCustomer":"1", 
    "minAmount":"100",
    "maxAmount":"1000",
    "type":"PORCENTAJE",  
    "value":"10",
    "limitCustomers":"NO",  
    "ExcludeCustomers":"NO", 
    "limitCategories":"NO",  
    "ExcludeCategories":"NO", 
    "limitProducts":"NO", 
    "ExcludeProducts":"NO", 
    "couponRestrictionsCustomers":[],
    "couponRestrictionsProducts":[],
    "couponRestrictionsCategories":[]
}
*/
  

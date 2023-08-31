var couponModel =require( "./model");
var couponRepo = require("./repo");


const controller = {



    findAll: async  (req, res) => {
        const repoType = new couponRepo();
        const modelType = new couponModel( repoType);
        let  result  = await modelType.findAll();
    
        let status;
    
        let reorder =[]

        if(result != 'No se encontraron coincidencias' && result != 'error'){
          status = 'success'
        
          for(var i=0; i<result.length; i++){

            let restrictions_products = await modelType.findRProd(result[i].id);
            let restrictions_categories = await modelType.findRCat(result[i].id);
            let restrictions_customers = await modelType.findRCust(result[i].id);

            let model ={
                "id": result[i].id,
                "name": result[i].name,
                "descrp": result[i].descrp,
                "exclusivo": result[i].exclusivo,
                "code": result[i].code,
                "status": result[i].status,
                "date_a": result[i].date_a,
                "date_b": result[i].date_b,
                "freeShipping": result[i].freeShipping,
                "totalAvailable": result[i].totalAvailable,
                "totalAvailableCustomer": result[i].totalAvailableCustomer,
                "minAmount": result[i].minAmount,
                "maxAmount": result[i].maxAmount,
                "type": result[i].type,
                "value": result[i].value,
                "limitCustomers": result[i].limitCustomers,
                "ExcludeCustomers": result[i].ExcludeCustomers,
                "limitCategories": result[i].limitCategories,
                "ExcludeCategories": result[i].ExcludeCategories,
                "limitProducts": result[i].limitProducts,
                "ExcludeProducts": result[i].ExcludeProducts,
                "created_at": result[i].created_at,
                "updated_at": result[i].updated_at,
                "restrictions_products":restrictions_products,
                "restrictions_categories":restrictions_categories,
                "restrictions_customers":restrictions_customers
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
        const repoType = new couponRepo();
        const modelType = new couponModel( repoType);
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

        let restrictions_products = await modelType.findRProd(result.id);
        let restrictions_categories = await modelType.findRCat(result.id);
        let restrictions_customers = await modelType.findRCust(result.id);

           model ={
                "id": result.id,
                "name": result.name,
                "descrp": result.descrp,
                "exclusivo": result.exclusivo,
                "code": result.code,
                "status": result.status,
                "date_a": result.date_a,
                "date_b": result.date_b,
                "freeShipping": result.freeShipping,
                "totalAvailable": result.totalAvailable,
                "totalAvailableCustomer": result.totalAvailableCustomer,
                "minAmount": result.minAmount,
                "maxAmount": result.maxAmount,
                "type": result.type,
                "value": result.value,
                "limitCustomers": result.limitCustomers,
                "ExcludeCustomers": result.ExcludeCustomers,
                "limitCategories": result.limitCategories,
                "ExcludeCategories": result.ExcludeCategories,
                "limitProducts": result.limitProducts,
                "ExcludeProducts": result.ExcludeProducts,
                "created_at": result.created_at,
                "updated_at": result.updated_at,
                "restrictions_products":restrictions_products,
                "restrictions_categories":restrictions_categories,
                "restrictions_customers":restrictions_customers
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
    
      findByCode: async  (req, res) => {
        const repoType = new couponRepo();
        const modelType = new couponModel( repoType);
        let code = req.params.code;
        if(code == undefined || code == ''){
            return res.status(200).send({
                status:'error',
                result: 'Datos no validos.'
              });
        }
        let result = await modelType.findByCode(code);
        
        let status;
        let model;
        if(result != 'No se encontraron coincidencias' && result != 'error'){
          status = 'success'

        let restrictions_products = await modelType.findRProd(result.id);
        let restrictions_categories = await modelType.findRCat(result.id);
        let restrictions_customers = await modelType.findRCust(result.id);

           model ={
                "id": result.id,
                "name": result.name,
                "descrp": result.descrp,
                "exclusivo": result.exclusivo,
                "code": result.code,
                "status": result.status,
                "date_a": result.date_a,
                "date_b": result.date_b,
                "freeShipping": result.freeShipping,
                "totalAvailable": result.totalAvailable,
                "totalAvailableCustomer": result.totalAvailableCustomer,
                "minAmount": result.minAmount,
                "maxAmount": result.maxAmount,
                "type": result.type,
                "value": result.value,
                "limitCustomers": result.limitCustomers,
                "ExcludeCustomers": result.ExcludeCustomers,
                "limitCategories": result.limitCategories,
                "ExcludeCategories": result.ExcludeCategories,
                "limitProducts": result.limitProducts,
                "ExcludeProducts": result.ExcludeProducts,
                "created_at": result.created_at,
                "updated_at": result.updated_at,
                "restrictions_products":restrictions_products,
                "restrictions_categories":restrictions_categories,
                "restrictions_customers":restrictions_customers

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

      search: async  (req, res) => {
        const repoType = new couponRepo();
        const modelType = new couponModel( repoType);
        let search = req.params.search;
    
      
        let result = await modelType.search(search);
        let status;
        let reorder =[]
        if(result != 'No se encontraron coincidencias' && result != 'error'){
          status = 'success'

          for(var i=0; i<result.length; i++){

            let restrictions_products = await modelType.findRProd(result[i].id);
            let restrictions_categories = await modelType.findRCat(result[i].id);
            let restrictions_customers = await modelType.findRCust(result[i].id);

            let model ={
                "id": result[i].id,
                "name": result[i].name,
                "descrp": result[i].descrp,
                "exclusivo": result[i].exclusivo,
                "code": result[i].code,
                "status": result[i].status,
                "date_a": result[i].date_a,
                "date_b": result[i].date_b,
                "freeShipping": result[i].freeShipping,
                "totalAvailable": result[i].totalAvailable,
                "totalAvailableCustomer": result[i].totalAvailableCustomer,
                "minAmount": result[i].minAmount,
                "maxAmount": result[i].maxAmount,
                "type": result[i].type,
                "value": result[i].value,
                "limitCustomers": result[i].limitCustomers,
                "ExcludeCustomers": result[i].ExcludeCustomers,
                "limitCategories": result[i].limitCategories,
                "ExcludeCategories": result[i].ExcludeCategories,
                "limitProducts": result[i].limitProducts,
                "ExcludeProducts": result[i].ExcludeProducts,
                "created_at": result[i].created_at,
                "updated_at": result[i].updated_at,
                "restrictions_products":restrictions_products,
                "restrictions_categories":restrictions_categories,
                "restrictions_customers":restrictions_customers

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
    

    cuponCreate: async (req, res) => {
        const itemRepo = new couponRepo();
        const modelItem = new couponModel( itemRepo);
        let params = req.body 
        
        let status = 'success'
        let message ='Cupón creado con exito.'

          //* procedemos a validar primero el cupon.
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
        
        
        

        let coupon = {
           "name": params.name,
           "descrp":params.descrp,
           "exclusivo":params.exclusivo,
           "code":params.code,
           "cstatus": params.cstatus, 
           "date_a":params.date_a, 
           "date_b":params.date_b, 
           "freeShipping":params.freeShipping, 
           "totalAvailable": params.totalAvailable,
           "totalAvailableCustomer": params.totalAvailableCustomer, 
           "minAmount": params.minAmount,
           "maxAmount":params.maxAmount,
           "type": params.type, 
           "value": params.value,
           "limitCustomers":params.limitCustomers,  
           "ExcludeCustomers": params.ExcludeCustomers, 
           "limitCategories": params.limitCategories,  
           "ExcludeCategories": params.ExcludeCategories, 
           "limitProducts": params.limitProducts,  
           "ExcludeProducts": params.ExcludeProducts, 
         };
    
        
        let result = await modelItem.create(coupon);
       
 
        let added ='_';
        let resCust=[];
        let resCtg=[];
        let resPrd=[];
 
        if(result !='success'){
          status ='error'
          message = result
        }else{
          added = await modelItem.last()

        

          
          //* Agregar las restricciones.
         if(params.limitCustomers == 'SI' || params.ExcludeCustomers == 'SI'){
            let type =''
            params.limitCustomers =='SI' ? type ='LIMITAR' : type ='EXCLUIR'

            for(var i=0; i<params.couponRestrictionsCustomers.length; i++){

                //*Insertar las restricciones.
                let result = await  modelItem.create_rcustomer(added.id, params.couponRestrictionsCustomers[i], type)
                resCust.push(result)

            }


         }


         if(params.limitCategories == 'SI' || params.ExcludeCategories == 'SI'){
            let type =''
            params.limitCategories =='SI' ? type ='LIMITAR' : type ='EXCLUIR'

            for(var i=0; i<params.couponRestrictionsCategories.length; i++){

                //*Insertar las restricciones.
                let result = await  modelItem.create_rcategory(added.id, params.couponRestrictionsCategories[i], type)
                resCtg.push(result)

            }


         }

         if(params.limitProducts == 'SI' || params.ExcludeProducts == 'SI'){
            let type =''
            params.limitProducts =='SI' ? type ='LIMITAR' : type ='EXCLUIR'

            for(var i=0; i<params.couponRestrictionsProducts.length; i++){

                //*Insertar las restricciones.
                let result = await  modelItem.create_rproduct(added.id, params.couponRestrictionsProducts[i], type)
                resPrd.push(result)

            }


         }

        }
 
        return res.status(200).send({
          status: status,
          message: message,
          added: added,
          resCust,
          resCtg,
          resPrd
        });
      
        

       
       
    },


    cuponUpdate: async (req, res) => {
        const itemRepo = new couponRepo();
        const modelItem = new couponModel( itemRepo);
        let params = req.body 
        
        let status = 'success'
        let message ='Cupón actualizado con exito.'

        if(params.id == undefined || isNaN(params.id)){
            return res.status(200).send({
                status: 'error',
                result: 0,
                message: 'Tipo de dato no valido.'
            });
        }

          //* procedemos a validar primero el cupon.
        let validParams = validateParams(params)

        if(validParams.status =='error'){
            return res.status(200).send({
                status: validParams.status,
                result: validParams.result,
                message: validParams.message
            });
        }

        //Todo: validar restricciones 

        
        

        let coupon = {
            "id":params.id,
           "name": params.name,
           "descrp":params.descrp,
           "exclusivo": params.exclusivo,
           "code":params.code,
           "cstatus": params.cstatus, 
           "date_a":params.date_a, 
           "date_b":params.date_b, 
           "freeShipping":params.freeShipping, 
           "totalAvailable": params.totalAvailable,
           "totalAvailableCustomer": params.totalAvailableCustomer, 
           "minAmount": params.minAmount,
           "maxAmount":params.maxAmount,
           "type": params.type, 
           "value": params.value,
           "limitCustomers":params.limitCustomers,  
           "ExcludeCustomers": params.ExcludeCustomers, 
           "limitCategories": params.limitCategories,  
           "ExcludeCategories": params.ExcludeCategories, 
           "limitProducts": params.limitProducts,  
           "ExcludeProducts": params.ExcludeProducts, 
         };
    
        
        let result = await modelItem.update(coupon);
       
 
        let resCust=[];
        let resCtg=[];
        let resPrd=[];
 
        if(result !='success'){
          status ='error'
          message = result
        }else{
         

        

          
          //* Agregar las restricciones.
         if(params.limitCustomers == 'SI' || params.ExcludeCustomers == 'SI'){
            let type =''
            params.limitCustomers =='SI' ? type ='LIMITAR' : type ='EXCLUIR'

            for(var i=0; i<params.couponRestrictionsCustomers.length; i++){

                //*Insertar las restricciones.
                let result = await  modelItem.create_rcustomer(params.id, params.couponRestrictionsCustomers[i], type)
                resCust.push(result)

            }


         }


         if(params.limitCategories == 'SI' || params.ExcludeCategories == 'SI'){
            let type =''
            params.limitCategories =='SI' ? type ='LIMITAR' : type ='EXCLUIR'

            for(var i=0; i<params.couponRestrictionsCategories.length; i++){

                //*Insertar las restricciones.
                let result = await  modelItem.create_rcategory(params.id, params.couponRestrictionsCategories[i], type)
                resCtg.push(result)

            }


         }

         if(params.limitProducts == 'SI' || params.ExcludeProducts == 'SI'){
            let type =''
            params.limitProducts =='SI' ? type ='LIMITAR' : type ='EXCLUIR'

            for(var i=0; i<params.couponRestrictionsProducts.length; i++){

                //*Insertar las restricciones.
                let result = await  modelItem.create_rproduct(params.id, params.couponRestrictionsProducts[i], type)
                resPrd.push(result)

            }


         }

        }
 
        return res.status(200).send({
          status: status,
          message: message,
          resCust,
          resCtg,
          resPrd
        });
      
        

       
       
    },



    
    deleteRCustomer: async  (req, res) => {
        const itemRepo = new couponRepo();
        const modelItem = new couponModel( itemRepo);
        let params = req.body;

        if(params.id == undefined || isNaN(params.id)){
            return res.status(200).send({
                message: 'Tipo de dato no valido.',
                status: 'error',
           });
        }
        
        let id = parseInt(params.id);
        let result = await modelItem.delete_rcustomer(id);
        let msg;
    
        result != 'success' ? msg ='Error al intentar eliminar la restricción.' : msg='Restricción eliminada.'
        let status;
        result != 'success' ? status ='error' :  status ='success'
        return res.status(200).send({
        message: msg,
        status: status,
        });
    },


    
    deleteRProduct: async  (req, res) => {
        const itemRepo = new couponRepo();
        const modelItem = new couponModel( itemRepo);
        let params = req.body;

        if(params.id == undefined || isNaN(params.id)){
            return res.status(200).send({
                message: 'Tipo de dato no valido.',
                status: 'error',
           });
        }
        
        let id = parseInt(params.id);
        let result = await modelItem.delete_rproduct(id);
        let msg;
    
        result != 'success' ? msg ='Error al intentar eliminar la restricción.' : msg='Restricción eliminada.'
        let status;
        result != 'success' ? status ='error' :  status ='success'
        return res.status(200).send({
        message: msg,
        status: status,
        });
    },


    
    deleteRCategory: async  (req, res) => {
        const itemRepo = new couponRepo();
        const modelItem = new couponModel( itemRepo);
        let params = req.body;

        if(params.id == undefined || isNaN(params.id)){
            return res.status(200).send({
                message: 'Tipo de dato no valido.',
                status: 'error',
           });
        }
        
        let id = parseInt(params.id);
        let result = await modelItem.delete_rcategory(id);
        let msg;
    
        result != 'success' ? msg ='Error al intentar eliminar la restricción.' : msg='Restricción eliminada.'
        let status;
        result != 'success' ? status ='error' :  status ='success'
        return res.status(200).send({
        message: msg,
        status: status,
        });
    },


    delete: async  (req, res) => {
        const itemRepo = new couponRepo();
        const modelItem = new couponModel( itemRepo);
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
    
        result != 'success' ? msg ='Error al intentar eliminar el cupón.' : msg='Cupón eliminado.'
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
        name,
        descrp,
        code,
        cstatus, // ACTIVO / INACTIVO
        date_a, 
        date_b, 
        freeShipping, // SI / NO
        totalAvailable,
        totalAvailableCustomer, 
        minAmount,
        maxAmount,
        exclusivo, // SI / NO
        type, // procentaje, importe 
        value,
        limitCustomers,  // SI / NO
        ExcludeCustomers, // SI / NO
        limitCategories,  // SI / NO
        ExcludeCategories, // SI / NO
        limitProducts,  // SI / NO
        ExcludeProducts, // SI / NO
        couponRestrictionsCustomers,
        couponRestrictionsProducts,
        couponRestrictionsCategories,
     } = params;
     maxAmount = parseFloat(maxAmount)
     minAmount = parseFloat(minAmount)
     
     if(code == undefined || code =='' || code == null){
        return {
            status: 'error',
            message:'Valor de código no valido.',
            result: 1
        };
    }

    if(name == undefined || name =='' || name == null){
        return {
            status: 'error',
            message:'Valor no validos.',
            result: 2
        };
    }


    if(descrp == undefined || descrp =='' || descrp == null){
        return {
            status: 'error',
            message:'Valor no validos.',
            result: 3
        };
    }

    if(cstatus == undefined || cstatus =='' || cstatus == null || ( cstatus != 'ACTIVO' &&  cstatus != 'INACTIVO')){
        return {
            status: 'error',
            message:'Estatus no valido.',
            result: 4
        };
    }

    if(date_a == undefined || date_a =='' || date_a == null){
        return {
            status: 'error',
            message:'Fecha inicio no valida.',
            result: 5
        };
    }

    if(date_b == undefined || date_b =='' || date_b == null){
        return {
            status: 'error',
            message:'Fecha fin no valida.',
            result: 6
        };
    }

    if(date_a >= date_b){
        return {
            status: 'error',
            message:'Rango de fechas no valido.',
            result: 6
        };
    }

    if(freeShipping == undefined || freeShipping =='' || freeShipping == null || ( freeShipping != 'SI' &&  freeShipping != 'NO')){
        return {
            status: 'error',
            message:'Datos no validos.',
            result: 7
        };
    }

    if(totalAvailable == undefined ||  isNaN(totalAvailable)  || totalAvailable == null ){
        return {
            status: 'error',
            message:'Datos no validos.',
            result: 8
        };
    }

    if(totalAvailableCustomer == undefined ||  isNaN(totalAvailableCustomer) || totalAvailableCustomer == null){
        return {
            status: 'error',
            message:'Datos no validos.',
            result: 9
        };
    }

    if(minAmount == undefined || minAmount == null  || isNaN(minAmount)){
        return {
            status: 'error',
            message:'Valor no valido.',
            result: 10
        };
    }

    if(maxAmount == undefined || maxAmount == null || isNaN(maxAmount)){
        return {
            status: 'error',
            message:'Valor no valido.',
            result: 11
        };
    }
    
    if(maxAmount > 0 && (maxAmount < minAmount)){
        return {
            status: 'error',
            message:'El importe maximo no debe ser menor al minimo. Indica 0 como maximo para los casos que no aplique.',
            result: 11
        };
    }


    if(type == undefined || type =='' || type == null || ( type != 'PORCENTAJE' &&  type != 'IMPORTE')){
        return {
            status: 'error',
            message:'Valor no valido (indique solo PORCENTAJE o IMPORTE).',
            result: 12
        };
    }

    if(value == undefined || value == null || isNaN(value)){
        return {
            status: 'error',
            message:'Monto no valido.',
            result: 13
        };
    }

    if(limitCustomers == undefined || limitCustomers =='' || limitCustomers == null || ( limitCustomers != 'SI' &&  limitCustomers != 'NO')){
        return {
            status: 'error',
            message:'Datos no validos.',
            result: 14
        };
    }

    if( ExcludeCustomers == undefined ||  ExcludeCustomers =='' ||  ExcludeCustomers == null || ( ExcludeCustomers != 'SI' &&  ExcludeCustomers != 'NO')){
        return {
            status: 'error',
            message:'Datos no validos.',
            result: 15
        };
    }

    if(limitCustomers == 'SI' && ExcludeCustomers =='SI'){
        return {
            status: 'error',
            message:'Elija solo una restricción.',
            result: 15
        };
    }
    
    
    if((couponRestrictionsCustomers == '' || couponRestrictionsCustomers == undefined || couponRestrictionsCustomers == null || couponRestrictionsCustomers.length == 0  ) && (limitCustomers == 'SI' || ExcludeCustomers =='SI')){
        return {
            status: 'error',
            message:'Falta agregar los clientes a los que desea aplicar la restricción.',
            result: 15
        };
    }



    if(limitCategories == undefined || limitCategories =='' || limitCategories == null || ( limitCategories != 'SI' &&  limitCategories != 'NO')){
        return {
            status: 'error',
            message:'Datos no validos.',
            result: 16
        };
    }

    if(ExcludeCategories == undefined || ExcludeCategories =='' || ExcludeCategories == null || ( ExcludeCategories != 'SI' &&  ExcludeCategories != 'NO')){
        return {
            status: 'error',
            message:'Datos no validos.',
            result: 17
        };
    }

   

    if(limitCategories == 'SI' && ExcludeCategories =='SI'){
        return {
            status: 'error',
            message:'Elija solo una restricción.',
            result: 17
        };
    }

    if((couponRestrictionsCategories == '' || couponRestrictionsCategories == undefined || couponRestrictionsCategories == null || couponRestrictionsCategories.length == 0  ) && (limitCategories == 'SI' || ExcludeCategories =='SI')){
        return {
            status: 'error',
            message:'Falta agregar los clientes a los que desea aplicar la restricción.',
            result: 15
        };
    }


    if(limitProducts == undefined || limitProducts =='' || limitProducts == null || ( limitProducts != 'SI' &&  limitProducts != 'NO')){
        return {
            status: 'error',
            message:'Datos no validos.',
            result: 18
        };
    }

    if(ExcludeProducts == undefined || ExcludeProducts =='' || ExcludeProducts == null || ( ExcludeProducts != 'SI' &&  ExcludeProducts != 'NO')){
        return { 
            status: 'error',
            message:'Datos no validos.',
            result: 19
        };
    }


    if(limitProducts == 'SI' && ExcludeProducts =='SI'){
        return {
            status: 'error',
            message:'Elija solo una restricción.',
            result: 19
        };
    }

    if((couponRestrictionsProducts == '' || couponRestrictionsProducts == undefined || couponRestrictionsProducts == null || couponRestrictionsProducts.length == 0  ) && (limitProducts == 'SI' || ExcludeProducts =='SI')){
        return {
            status: 'error',
            message:'Falta agregar los clientes a los que desea aplicar la restricción.',
            result: 15
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
  

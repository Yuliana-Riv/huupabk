'use strict'

var validator = require("validator");

class Validate {
    

    // Getters

   
    // param -> parametro a validar.
    validParam(param){
      let result = true
      
      if(param== undefined || param =='' || param == null){
        return false
      }
      
      return result;
    }

    


    validEmail(email){
      let result = true
       
      if(email== undefined || email =='' || email == null){
       return false
      }
      
     result = validator.isEmail(email)

      return result;
    }

    validPhone(param){
      let result = true
      
      if(param== undefined || param =='' || param == null){
        return false
      }
      
      if(param.length < 10){
        return false
      }

      return result;
    }

    validPass(param){
      let result = true
      
      if(param== undefined || param =='' || param == null){
        return false
      }
      
      if(param.length < 8){
        return false
      }

      return result;
    }

    validRole(param){
      let result = true
      
      if(param== undefined || param =='' || param == null){
        return false
      }

      param = param.toLowerCase()
      
      if(param != 'admin' && param != 'legrafica'  && param != 'cliente' ){
        return false
      }

      return result;
    }


    validStatus(param){
      let result = true
      
      if(param== undefined || param =='' || param == null){
        return false
      }

      param = param.toUpperCase()
      
      if(param != 'ACTIVO' && param != 'INACTIVO'  && param != 'BLOQUEADO'){
        return false
      }

      return result;
    }
    

    validAdm(param){
      let result =true

      if(param== undefined || param =='' || param == null){
        return false
      }


      if(param != 'admin' && param != 'legrafica'  ){
        return false
      }
      return result
    }

    validAdmClient(param){
      let result =true

      if(param== undefined || param =='' || param == null){
        return false
      }


      if(param != 'admin' && param != 'legrafica'  && param != 'cliente'  ){
        return false
      }
      return result
    }

    validClient(param){
      let result =true

      if(param== undefined || param =='' || param == null){
        return false
      }


      if( param != 'cliente'  ){
        return false
      }
      return result
    }

 

    validAdmCli(param){
      let result =true

      if(param== undefined || param =='' || param == null){
        return false
      }


      if(param != 'admin' && param != 'legrafica'     && param != 'cliente'){
        return false
      }
      return result
    }

 

    validVisible(param){
      let result = true
      
      if(param== undefined || param =='' || param == null){
        return false
      }

      param = param.toUpperCase()
      
      if(param != 'OCULTO' && param != 'VISIBLE' ){
        return false
      }

      return result;
    }



    validOrden(param){
      let result = true
      
      if(param== undefined || param =='' || param == null){
        return false
      }

      param = param.toUpperCase()
      
      if(param != 'NA' && param != '1'  && param != '2' && param != '3' && param != '4' && param != '5'){
        return false
      }

      return result;
    }

    

    // variables que deban ser un numero , ids , precios etc.
    validNum(param){
      let result = true
      param = parseFloat(param)

      if(param == 0){
        return result
      }
      
      if(param== undefined || param =='' || param == null){
        return false
      }

      
      
      if(isNaN(param)){
        return false
      }

      return result;
    }

    
}
module.exports = Validate; 


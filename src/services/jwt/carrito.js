'use strict' 

var jwt = require('jwt-simple');
const  clv='35ffDghj89dW_w12gglLsv9e663667MfgsF5' 

class token {
    constructor ( 
       carrito
    ) {
        this.carrito = carrito;
    }

      // Getters
      get decode () {
        return this._decode(this.carrito);
    }

    get encode () {
        return this._encode(this.carrito);
    }

   



    _decode(carrito){
        let decode =  jwt.decode(carrito,clv)
        return decode;
    }
    
    _encode(carrito){
        let encode =  jwt.encode(carrito,clv)
        return encode;
    }
   


}
module.exports = token; 


var JWTcarrito = require("../../services/jwt/carrito");
var JWTencode = require("../../services/jwt/encode")
var JWTdecode = require("../../services/jwt/decode")

var productModel =require( "../product/model");
var productRepo = require("../product/repo");

var stockModel =require( "../stock/model");
var stockRepo = require("../stock/repo"); 


var cuponModel = require("../cupon/model")
var cuponRepo = require("../cupon/repo")


//var metodosDePrueba = require("../../services/nodemailer/emailShopcar")

var dayjs = require("dayjs")
let validService = require("../../services/validator/validateParams")
const controller = {

  tokenAuth: async (req,res) =>{
    let value =dayjs().unix() 

    let encode =  JWTencode.encode(value)
    let decode = JWTdecode.decode(encode)

    return res.status(200).send({
        encode,
        decode
    });
  },

  setCart: async  (req, res) => {
    
    let status='success';
    let result='';
    let message='Carrito creado.';

    let {id_cliente} = req.body

    const _VS = new validService()
    let validcli = _VS.validNum(id_cliente)

    let carrito ={
        items:[],
        cupon:[],
        cliente: { "sub":null, "email":''},
        descupon:0,
        subtotal:0,
        envio: 0.00,  // todo: precio fijo.
        total:0,
    }

      //! crear tabla para guardar los carritos y si existe un carrito guardado del cliente regresarlo. 
    if(validcli){
        //devolver el carrito guardado.
    }
  
  

    carrito = JSON.stringify(carrito)

    const token = new JWTcarrito(carrito)
   
    result = token.encode
    
     const dec = new JWTcarrito(result)
     let car = JSON.parse(dec.decode) 

    return res.status(200).send({
      status:status,
      message:message,
      result: result,
      dec:car,  id_cliente,  validcli
    });
  } ,
 
  getCart: async  (req, res) => {
   
    let carrito = req.body._ctk

    let status='success';
    let result='';
    let message='Datos de tu carrito.';

    const token = new JWTcarrito(carrito)
   
    try{
        result = token.decode
        result = JSON.parse(result)
    }catch(err){
        status='error'
        message='Ha ocurrido un error al intentar obtener la información de tu carrito de compras.'
        result = err.message
    }
  
  
    return res.status(200).send({
      status:status,
      message:message,
      result: result
    });
  },

  addItemToCart: async  (req, res) =>{
        let status='success';
        let result='';
        let message='Carrito actualizado.';

        let {item, _ctk, cantidad, sub, tipo} = req.body  //todo enviar opcional sub y tipo.
        console.log(item, _ctk, cantidad, sub, tipo)
       

        if(_ctk == undefined || _ctk == null || _ctk==''){ //validamos que venga el token del carrito en el body
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos (2).',
                result: result
              });
        }

        const token = new JWTcarrito(_ctk)
        let carrito={}
        try{
            carrito = token.decode //decodificamos el token
            carrito = JSON.parse(carrito)  // parseamos para poder manipular el carrito.
        }catch(err){
            //Si ocurre un error al decodificar el token.  (token no valido.)
            return res.status(200).send({
                status:'error',
                message:'Ha ocurrido un error al intentar obtener la información de tu carrito de compras.',
                result:err.message
            });
    
        }


        //validaciones del item -> producto a agregar.
        let validate = await validateItem(item)
    

        if(validate.status =='error'){

            return res.status(200).send({
                status: validate.status,
                message: validate.message,
                result: result
             });
        }

        //validamos la cantidad
        const _VS = new validService()
        
        let validcantidad = _VS.validNum(cantidad)

        if(!validcantidad) {
            return res.status(200).send({
                status: 'error',
                message: 'Cantidad no valida.',
                result: result
             });
        }

       

        // Todo correcto.

    let items = carrito.items

    let encontrado = 'no_encontrado';
    for(var i=0;i<items.length; i++){
        if(items[i].item.id == item.id){
            encontrado = i
        }
    }




    //validar precio del producto....  

    let resProducto = await getProducto(item.id)


    if(resProducto.status =='error'){
         return res.status(200).send({
            status: 'error',
            message: 'Producto no valido.',
            result: result
          });
    }


    let producto = resProducto.result;
  
     //obtener el stock.
    let resStock = await getStock(item.id)

    if(resStock.status =='error'){
        return res.status(200).send({
           status: 'error',
           message: 'No se encontro stock para el producto.',
           result: result
         });
    }
 
    let stock = resStock.result
    let disponibles = parseInt(stock) 
    
  

    let precio = parseFloat(producto.price)

    let resCuponesError =[]

    if(encontrado == 'no_encontrado'){ //no encontro coincidencias



        cantidad = parseInt(cantidad)

        
      //Todo validar.
        if(cantidad > disponibles){
            return res.status(200).send({
                status: 'error',
                message: 'Ha superado el stock disponible para este producto.',
                result: result
              });
        } 


        

        let subtotal = cantidad * precio



        let filter ={ 
            cantidad:cantidad,
            tipo:'producto', //esto nos indicara la tabla donde buscar el item.
            subtotal: subtotal,
            item:  producto 
        }

        items.push(filter)

        carrito.items = items //signamos el nuevo items ya que sera validado .

       

       
         // TODO: validacion de cupones.

         let cuponescar = carrito.cupon
            if(cuponescar == undefined || cuponescar == null ){
                return res.status(200).send({
                    status: 'error',
                    message: '10.Datos no validos.',
                    result: result
                });
            }
           //* verificar el cliente
           let cliente  = carrito.cliente

        let descuponcar = carrito.descupon


        let emailcliente = cliente.email
        if(descuponcar == undefined || descuponcar == null ){ //cupon == ''
          return res.status(200).send({
              status: 'error',
              message: '11.Datos no validos.',
              result: result
          });
        }


        //* validar que el cupon no este ya agregado al carrito

        let cuponesValidos =[]
        if(cuponescar.length > 0){

          
           for(var k=0; k<cuponescar.length; k++){
                //* Procedemos a validar los cupones.
                let response = await validateCupons(cuponescar[k].code, emailcliente, carrito)
                if(response.status =='success'){
                    cuponesValidos.push(cuponescar[k])
                }else{
                    let model ={
                        title:  `Se ha retirado el cupón '${cuponescar[k].code}' del carrito, no cumple los requisitos para aplicar.`,
                        cupon: cuponescar[k],
                        status: response.status,
                        message: response.message,
                    }

                    resCuponesError.push(model)
                }
              
           }


           

        }

        
        let reorderCupons=[]
         let totaldesc =0
         
         let cupones= cuponesValidos
         for(var i=0; i<cupones.length; i++){
            let response = await getCupon( cupones[i].code)

            if(response.status =='success'){  //* actualizar los cupones en caso de que cambien de tipo , valor o envio gratis
                let descuento =0
                
                if(response.result.type =='PORCENTAJE'){
                    descuento = response.result.value /100
                    if(carrito.subtotal == undefined || carrito.subtotal == null ){
                        descuento =0
                    }else{
                        let totaldesc = carrito.subtotal * descuento
        
                        descuento = totaldesc
                    }
                }else{
                    descuento = response.result.value
                }


                let model ={
                    code : cupones[i].code,
                    type: response.result.type,
                    descuento: descuento,
                    value: response.result.value,
                    freeShipping: response.result.freeShipping,
                 }
                 reorderCupons.push(model)

                
                 totaldesc = totaldesc + descuento
                 
            }
           
            
            
         }
 
       
 

         //* recalcular el envio en caso de que cambie.
         let totalenvio = carrito.envio

         let sigueGratis ='NO'
         for(var m=0; m<reorderCupons.length; m++){
            if(reorderCupons[m].freeShipping == 'SI'){
                sigueGratis ='SI'
            }
         }

      

         if(sigueGratis =='SI'){
             totalenvio =0
         }else{
             totalenvio = carrito.envio
         }





        

        let csubtotal=0;
        for(var i =0; i<items.length; i++){
         let subtotal = parseFloat(items[i].subtotal)
         csubtotal = csubtotal + subtotal;
        }
        csubtotal = Math.round( csubtotal *100)/100;

        


        
        totaldesc = Math.round(totaldesc *100)/100;
        let total = (csubtotal -totaldesc) + totalenvio
        total = Math.round(total *100)/100;
       
      

       


        
        
        
        let update = {
            items: items,
            cupon:reorderCupons,
            descupon:totaldesc,
            subtotal:csubtotal,
            envio:totalenvio,
            total:total,
            cliente:cliente
        }

        update = JSON.stringify(update)
        status ='success'
        message = '"'+item.name + '"'+' se ha añadido a tu carrito.'
        const createToken = new JWTcarrito(update)
        result = createToken.encode


    }else{

        let reorder =[]
        for(var i =0; i<items.length; i++){
            if(i == encontrado){
            
            let cantidadIdx = parseInt(items[i].cantidad)
            let subtotalIdx = cantidadIdx * precio


            let cantidadItem = parseInt(cantidad)
            let subtotalItem  = cantidadItem * precio

            let updCantidad = cantidadIdx + cantidadItem
            let updSubTotal =  subtotalIdx  + subtotalItem

            //todo pendiente modulo stock.
           
           
            if( updCantidad  > disponibles){ //verificamos si la cantidad que se va a agregar no supere el stock disponible

                //si la supera devolvemos la cantidad y subtotal a la anterior.
                updCantidad =  cantidadIdx 
                updSubTotal =  subtotalIdx

                message = 'Ha superado el stock disponible para este producto.'
                status ='error'
            }else{
                message = '"'+item.name + '"'+' se ha actualizado.'
                status ='success'
            }

         

            let modelUpdate ={
                  

                    cantidad:updCantidad,
                    tipo:'producto',
                    subtotal: updSubTotal,
                    item:  producto 

            }

         
            reorder.push(modelUpdate)
        }else{
            reorder.push(items[i])
        }
        }

        carrito.items = reorder

         // TODO: validacion de cupones.

         let cuponescar = carrito.cupon
            if(cuponescar == undefined || cuponescar == null ){
                return res.status(200).send({
                    status: 'error',
                    message: '10.Datos no validos.',
                    result: result
                });
            }
           //* verificar el cliente
           let cliente  = carrito.cliente

        let descuponcar = carrito.descupon


        let emailcliente = cliente.email
        if(descuponcar == undefined || descuponcar == null ){ //cupon == ''
          return res.status(200).send({
              status: 'error',
              message: '11.Datos no validos.',
              result: result
          });
        }


        //* validar que el cupon no este ya agregado al carrito

        let cuponesValidos =[]
        if(cuponescar.length > 0){

          
           for(var k=0; k<cuponescar.length; k++){
                //* Procedemos a validar los cupones.
                let response = await validateCupons(cuponescar[k].code, emailcliente, carrito)
                if(response.status =='success'){
                    cuponesValidos.push(cuponescar[k])
                }else{
                    let model ={
                        title:  `Se ha retirado el cupón '${cuponescar[k].code}' del carrito, no cumple los requisitos para aplicar.`,
                        cupon: cuponescar[k],
                        status: response.status,
                        message: response.message,
                    }

                    resCuponesError.push(model)
                }
              
           }


           

        }

        
        let reorderCupons=[]
         let totaldesc =0
         
         let cupones= cuponesValidos
         for(var i=0; i<cupones.length; i++){
            let response = await getCupon( cupones[i].code)

            if(response.status =='success'){  //* actualizar los cupones en caso de que cambien de tipo , valor o envio gratis
                let descuento =0
                
                if(response.result.type =='PORCENTAJE'){
                    descuento = response.result.value /100
                    if(carrito.subtotal == undefined || carrito.subtotal == null ){
                        descuento =0
                    }else{
                        let totaldesc = carrito.subtotal * descuento
        
                        descuento = totaldesc
                    }
                }else{
                    descuento = response.result.value
                }


                let model ={
                    code : cupones[i].code,
                    type: response.result.type,
                    descuento: descuento,
                    value: response.result.value,
                    freeShipping: response.result.freeShipping,
                 }
                 reorderCupons.push(model)

                
                 totaldesc = totaldesc + descuento
                 
            }
           
            
            
         }
 
       
 

         //* recalcular el envio en caso de que cambie.
         let totalenvio = carrito.envio

         let sigueGratis ='NO'
         for(var m=0; m<reorderCupons.length; m++){
            if(reorderCupons[m].freeShipping == 'SI'){
                sigueGratis ='SI'
            }
         }

      

         if(sigueGratis =='SI'){
             totalenvio =0
         }else{
             totalenvio = carrito.envio
         }
        



        let csubtotal=0;
        for(var i =0; i<reorder.length; i++){
            let subtotal = parseFloat(reorder[i].subtotal)
            csubtotal = csubtotal + subtotal;
        } 
        csubtotal = Math.round( csubtotal *100)/100;

        totaldesc = Math.round(totaldesc *100)/100;
        let total = (csubtotal -totaldesc) + totalenvio
        total = Math.round(total *100)/100;
       
         
       
 
         let update = {
             items: reorder,
             cupon: reorderCupons,
             descupon:totaldesc,
             subtotal:csubtotal,
             envio:totalenvio,
             total:total,
             cliente:cliente
         }

        update = JSON.stringify(update)
        const createToken = new JWTcarrito(update)
        result = createToken.encode
       }



        return res.status(200).send({
            status: status,
            message: message,
            result: result,
            resCuponesError
            //resProducto,
            //resStock
        });

  },





    deleteItem: async  (req, res) =>{

        let status ='error'
        let message ='Ha ocurrido un error.'
        let result=''
      
        let {index,  _ctk} = req.body

        const _VS = new validService()
        let validindex = _VS.validNum(index)

        if(!validindex){
          
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos.',
                result: result
            });
        }

        let validcar = _VS.validParam(_ctk)
         
        if(!validcar){ //validamos que venga el token del carrito en el body
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos (2).',
                result: result
              });
        }

      

       







        const token = new JWTcarrito(_ctk)
        let carrito={}
        try{
            carrito = token.decode //decodificamos el token
            carrito = JSON.parse(carrito)  // parseamos para poder manipular el carrito.
        }catch(err){
            //Si ocurre un error al decodificar el token.  (token no valido.)
            return res.status(200).send({
                status:'error',
                message:'Ha ocurrido un error al intentar obtener la información de tu carrito de compras.',
                result:err.message
            });
    
        }


        let validcarrito = _VS.validParam(carrito)
        if(!validcarrito){

            return res.status(200).send({
                status:'error',
                message:'Aun no tienes un carrito creado.',
                result:''
            });
        }

        let validitems = _VS.validParam(carrito.items) 
        if( !validitems){
            return res.status(200).send({
                status:'error',
                message:'No hay productos agregados al carrito.',
                result:''
            });
        }


    
        let reorder =[]
        
        for(var i =0; i<carrito.items.length;i++){
            if(i != index){
                reorder.push(carrito.items[i])
            }else{
                status='success'
                message='Producto eliminado con exito.'
            }
    
        }
    
    
        

         //* verificar el cliente
        let cliente  = carrito.cliente



        if(reorder.length ==0){ //! ya no hay productos en el carrito.
            let update = {
                items: [],
                cupon:[],
                descupon:0,
                subtotal:0,
                envio:0,
                total:0,
                cliente:cliente
            }
      
          update = JSON.stringify(update) 
  
          const createToken = new JWTcarrito(update)
          result = createToken.encode
  
      
  
  
          return res.status(200).send({
              status: status,
              message: message,
              result: result,
             
          });
        }


         // TODO: Validar...
         let envio = carrito.envio

         let validenvio = _VS.validNum(envio) 


         if(!validenvio){ //* Verificar que el envio venga de manera correcta.
             return res.status(200).send({
                 status: 'error',
                 message: 'El precio de envio no es valido.',
                 result: result
             });
         }


           // TODO: Validacion de cupones.
      let cuponescar = carrito.cupon
      if(cuponescar == undefined || cuponescar == null ){
          return res.status(200).send({
              status: 'error',
              message: '10.Datos no validos.',
              result: result
          });
      }
          //* verificar si vienen cupones agregados al array de cupon y aplicarlos.


          

            // validar cupones --------------------------------------------------
             // TODO: obtener el descuento por cupones.
        let descuponcar = carrito.descupon


        let emailcliente = cliente.email
        if(descuponcar == undefined || descuponcar == null ){ //cupon == ''
          return res.status(200).send({
              status: 'error',
              message: '11.Datos no validos.',
              result: result
          });
        }


        //* validar que el cupon no este ya agregado al carrito
        let resCuponesError =[]
        let cuponesValidos =[]
        if(cuponescar.length > 0){

          
           for(var k=0; k<cuponescar.length; k++){
                //* Procedemos a validar los cupones.
                let response = await validateCupons(cuponescar[k].code, emailcliente, carrito)
                if(response.status =='success'){
                    cuponesValidos.push(cuponescar[k])
                }else{
                    let model ={
                        title:  `Se ha retirado el cupón '${cuponescar[k].code}' del carrito, no cumple los requisitos para aplicar.`,
                        cupon: cuponescar[k],
                        status: response.status,
                        message: response.message,
                    }

                    resCuponesError.push(model)
                }
              
           }


           

        }

        
        let reorderCupons=[]
         let totaldesc =0
         
         let cupones= cuponesValidos
         for(var i=0; i<cupones.length; i++){
            let response = await getCupon( cupones[i].code)

            if(response.status =='success'){  //* actualizar los cupones en caso de que cambien de tipo , valor o envio gratis
                let descuento =0
                
                if(response.result.type =='PORCENTAJE'){
                    descuento = response.result.value /100
                    if(carrito.subtotal == undefined || carrito.subtotal == null ){
                        descuento =0
                    }else{
                        let totaldesc = carrito.subtotal * descuento
        
                        descuento = totaldesc
                    }
                }else{
                    descuento = response.result.value
                }


                let model ={
                    code : cupones[i].code,
                    type: response.result.type,
                    descuento: descuento,
                    value: response.result.value,
                    freeShipping: response.result.freeShipping,
                 }
                 reorderCupons.push(model)

                
                 totaldesc = totaldesc + descuento
                 
            }
           
            
            
         }
 
       
 

         //* recalcular el envio en caso de que cambie.
         let totalenvio = carrito.envio

         let sigueGratis ='NO'
         for(var m=0; m<reorderCupons.length; m++){
            if(reorderCupons[m].freeShipping == 'SI'){
                sigueGratis ='SI'
            }
         }

      

         if(sigueGratis =='SI'){
             totalenvio =0
         }else{
             totalenvio = carrito.envio
         }



        let csubtotal=0;
        for(var i =0; i<reorder.length; i++){
            let subtotal = parseFloat(reorder[i].subtotal)
            csubtotal = csubtotal + subtotal;
        }
        csubtotal = Math.round( csubtotal *100)/100;

       
        totaldesc = Math.round(totaldesc *100)/100;
        let total = (csubtotal -totaldesc) + totalenvio  //redondear
        total =   Math.round(total *100)/100;  //redondear
        
        



  
          let update = {
              items: reorder,
              cupon:reorderCupons,
              descupon:totaldesc,
              subtotal:csubtotal,
              envio:totalenvio,
              total:total,
              cliente:cliente,
          }
    
        update = JSON.stringify(update) 

        const createToken = new JWTcarrito(update)
        result = createToken.encode

    


        return res.status(200).send({
            status: status,
            message: message,
            result: result,
            resCuponesError
           
        });
       


       },


       updateCart: async  (req, res) =>{
        let status ='success'
        let message ='Carrito actualizado.'
        let result=''

        let {carrito} = req.body

        const _VS = new validService()
        let validcarrito = _VS.validParam(carrito)
     
      
        if(!validcarrito){ //validamos que venga el token del carrito en el body
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos.',
                result: result
              });
        }

        let validitems = _VS.validParam(carrito.items)
        if( !validitems){

            return res.status(200).send({
                status:'error',
                message:'No hay productos agregados al carrito.',
                result:'',
                
            });
        }




        let reorder=[]
    
        let items = carrito.items
        for(var i=0; i<items.length; i++){

            //buscamos el producto.
            let resProducto = await getProducto(items[i].item.id)

            if(resProducto.status =='error'){
                return res.status(200).send({
                    status: 'error',
                    message: 'Producto no valido.',
                    result: result
                });
            }


            let producto = resProducto.result;
        
            //buscamos el stock.
            let resStock = await getStock(items[i].item.id)

            if(resStock.status =='error'){
                return res.status(200).send({
                status: 'error',
                message: 'No se encontro stock para el producto.',
                result: result
                });
            }

            let stock = resStock.result
            let disponibles = parseInt(stock) 
            let precio = parseFloat(producto.price)


           if(items[i].cantidad > disponibles){
               
                return res.status(200).send({
                    status: 'error',
                    message: 'Ha superado el stock disponible para este producto.',
                    result: result
                });
            }
            
            let updSubTotal = precio * items[i].cantidad
           
            
            let modelUpdate ={
                cantidad: items[i].cantidad,
                tipo:'producto', //esto nos indicara la tabla donde buscar el item.
                subtotal:updSubTotal,
                item:  producto 
           }
          
            reorder.push(modelUpdate)
        }
    
        // TODO: Validar...
        let envio = carrito.envio
        if(envio == undefined || envio == null  || isNaN(envio)){ //* Verificar que el envio venga de manera correcta.
            return res.status(200).send({
                status: 'error',
                message: 'El precio de envio no es valido.',
                result: result
            });
        }


        carrito.items = reorder //signamos el nuevo items ya que sera validado .

       

       
         // TODO: validacion de cupones.

         let cuponescar = carrito.cupon
            if(cuponescar == undefined || cuponescar == null ){
                return res.status(200).send({
                    status: 'error',
                    message: '10.Datos no validos.',
                    result: result
                });
            }
           //* verificar el cliente
           let cliente  = carrito.cliente

        let descuponcar = carrito.descupon


        let emailcliente = cliente.email
        if(descuponcar == undefined || descuponcar == null ){ //cupon == ''
          return res.status(200).send({
              status: 'error',
              message: '11.Datos no validos.',
              result: result
          });
        }


        //* validar que el cupon no este ya agregado al carrito
        let resCuponesError =[]
        let cuponesValidos =[]
        if(cuponescar.length > 0){

          
           for(var k=0; k<cuponescar.length; k++){
                //* Procedemos a validar los cupones.
                let response = await validateCupons(cuponescar[k].code, emailcliente, carrito)
                if(response.status =='success'){
                    cuponesValidos.push(cuponescar[k])
                }else{
                    let model ={
                        title:  `Se ha retirado el cupón '${cuponescar[k].code}' del carrito, no cumple los requisitos para aplicar.`,
                        cupon: cuponescar[k],
                        status: response.status,
                        message: response.message,
                    }

                    resCuponesError.push(model)
                }
              
           }


           

        }

        
        let reorderCupons=[]
         let totaldesc =0
         
         let cupones= cuponesValidos
         for(var i=0; i<cupones.length; i++){
            let response = await getCupon( cupones[i].code)

            if(response.status =='success'){  //* actualizar los cupones en caso de que cambien de tipo , valor o envio gratis
                let descuento =0
                
                if(response.result.type =='PORCENTAJE'){
                    descuento = response.result.value /100
                    if(carrito.subtotal == undefined || carrito.subtotal == null ){
                        descuento =0
                    }else{
                        let totaldesc = carrito.subtotal * descuento
        
                        descuento = totaldesc
                    }
                }else{
                    descuento = response.result.value
                }


                let model ={
                    code : cupones[i].code,
                    type: response.result.type,
                    descuento: descuento,
                    value: response.result.value,
                    freeShipping: response.result.freeShipping,
                 }
                 reorderCupons.push(model)

                
                 totaldesc = totaldesc + descuento
                 
            }
           
            
            
         }
 
       
 

         //* recalcular el envio en caso de que cambie.
         let totalenvio = carrito.envio

         let sigueGratis ='NO'
         for(var m=0; m<reorderCupons.length; m++){
            if(reorderCupons[m].freeShipping == 'SI'){
                sigueGratis ='SI'
            }
         }

      

         if(sigueGratis =='SI'){
             totalenvio =0
         }else{
             totalenvio = carrito.envio
         }







    
    
        let csubtotal=0;
        for(var i =0; i<reorder.length; i++){
            let subtotal = parseFloat(reorder[i].subtotal)
            csubtotal = csubtotal + subtotal;
        }
        csubtotal = Math.round( csubtotal *100)/100;

       
        totaldesc = Math.round(totaldesc *100)/100;
        let total = (csubtotal -totaldesc) + totalenvio;
        total =  Math.round(total *100)/100;
       

      
        
  
          let update = {
              items: reorder,
              cupon: reorderCupons,
              descupon:totaldesc,
              subtotal:csubtotal,
              envio:totalenvio,
              total:total,
              cliente:cliente
          }
    
        update = JSON.stringify(update)
    
        const createToken = new JWTcarrito(update)
        result = createToken.encode

    


        return res.status(200).send({
            status: status,
            message: message,
            result: result,
            resCuponesError
           
        });

        
      },





      addCupon: async (req, res) =>{
          let status ='success'
          let message ='Cupón agregado con exito.'
          let result =''

          let {cupon, cliente , _ctk} = req.body
          const _VS = new validService()
       
        //todo: validamos el token del carrito
        let validctk = _VS.validParam(_ctk)
        if(!validctk){ //validamos que venga el token del carrito en el body
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos (2).',
                result: result
              });
        }

        const token = new JWTcarrito(_ctk)
        let carrito={}
        try{
            carrito = token.decode //decodificamos el token
            carrito = JSON.parse(carrito)  // parseamos para poder manipular el carrito.
        }catch(err){
            //Si ocurre un error al decodificar el token.  (token no valido.)
            return res.status(200).send({
                status:'error',
                message:'Ha ocurrido un error al intentar obtener la información de tu carrito de compras.',
                result:err.message
            });
    
        }

       

        if(carrito.items == undefined || carrito.items.length ==0){
            return res.status(200).send({
                status: 'error',
                message: 'Añade productos antes de aplicar este cupón.',
                result: result
            });
        }

        //todo: validamos el cliente

       /* if(cliente == undefined || cliente == null){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos (3).',
                result: result
              });
        } */

        // TODO: Validacion de cupones.
      let cuponescar = carrito.cupon
      if(cuponescar == undefined || cuponescar == null ){
          return res.status(200).send({
              status: 'error',
              message: '10.Datos no validos.',
              result: result
          });
      }

        // TODO: obtener el descuento por cupones.
        let emailcliente = cliente.email
        let descuponcar = carrito.descupon
        if(descuponcar == undefined || descuponcar == null ){ //cupon == ''
          return res.status(200).send({
              status: 'error',
              message: '11.Datos no validos.',
              result: result
          });
        }


        //* validar que el cupon no este ya agregado al carrito
        let resCuponesError =[]
        let cuponesValidos =[]
        if(cuponescar.length > 0){

          
           for(var k=0; k<cuponescar.length; k++){
                //* Procedemos a validar los cupones.
                let response = await validateCupons(cuponescar[k].code, emailcliente, carrito)
                if(response.status =='success'){
                    cuponesValidos.push(cuponescar[k])
                }else{
                    let model ={
                        title:  `Se ha retirado el cupón '${cuponescar[k].code}' del carrito, no cumple los requisitos para aplicar.`,
                        cupon: cuponescar[k],
                        status: response.status,
                        message: response.message,
                    }

                    resCuponesError.push(model)
                }
              
           }


           let encontrado ='NO';

           for(var i =0; i<cuponescar.length; i++){
               if(cuponescar[i].code == cupon){
                   encontrado = 'SI'
               }
           }

           if(encontrado == 'SI' ){
               return res.status(200).send({
                   status: 'error',
                   message: 'Este cupón ya se encuentra agregado al carrito.',
                   result: result
               });
           }

        }

        //todo aqui.

        let resVC = await validateCupons(cupon, emailcliente, carrito)

        
        if(resVC.status =='error'){
            return res.status(200).send({
                status: 'error',
                message: resVC.message,
                result: ''
              });
        }

         //* TODO CORRECTO
         let datacupon = resVC.datacupon

         let descuento =0;

        

         if(datacupon.type =='PORCENTAJE'){
             descuento = datacupon.value /100
             if(carrito.subtotal == undefined || carrito.subtotal == null ){
                 descuento =0
             }else{
                 let totaldesc = carrito.subtotal * descuento
 
                 descuento = totaldesc
             }
         }else{
             descuento = datacupon.value
         }
 
         let modelc ={
             code : datacupon.code,
             type: datacupon.type,
             descuento: descuento,
             value: datacupon.value,
             exclusivo: datacupon.exclusivo,
             freeShipping: datacupon.freeShipping,
         }
         

        
 
         let reorderCupons=[]
         let totaldesc =0
         
         let cupones= cuponesValidos
         for(var i=0; i<cupones.length; i++){
            let response = await getCupon( cupones[i].code)

            if(response.status =='success'){  //* actualizar los cupones en caso de que cambien de tipo , valor o envio gratis
                let descuento =0
                
                if(response.result.type =='PORCENTAJE'){
                    descuento = response.result.value /100
                    if(carrito.subtotal == undefined || carrito.subtotal == null ){
                        descuento =0
                    }else{
                        let totaldesc = carrito.subtotal * descuento
        
                        descuento = totaldesc
                    }
                }else{
                    descuento = response.result.value
                }


                let model ={
                    code : cupones[i].code,
                    type: response.result.type,
                    descuento: descuento,
                    value: response.result.value,
                    exclusivo: response.result.exclusivo,
                    freeShipping: response.result.freeShipping,
                 }
                 reorderCupons.push(model)

                
                 totaldesc = totaldesc + descuento
                 
            }
           
            
            
         }
 
         reorderCupons.push(modelc)
         totaldesc = totaldesc + modelc.descuento


         //* recalcular el envio en caso de que cambie.
         let totalenvio = carrito.envio

         let sigueGratis ='NO'
         for(var m=0; m<reorderCupons.length; m++){
            if(reorderCupons[m].freeShipping == 'SI'){
                sigueGratis ='SI'
            }
         }

      

         if(sigueGratis =='SI'){
             totalenvio =0
         }else{
             totalenvio = carrito.envio
         }

         totaldesc = Math.round(totaldesc *100)/100;  //redondear
         let total = (carrito.subtotal - totaldesc)+totalenvio
         total <0? total = 0 : total //evitar negativos.

         total =  Math.round(total *100)/100;  //redondear
       
 
 
         let update = {
             items: carrito.items,
             cupon: reorderCupons,
             descupon:totaldesc,
             subtotal:carrito.subtotal,
             envio:totalenvio,
             total:total,
             cliente:cliente
         }
   
         update = JSON.stringify(update) 
 
         const createToken = new JWTcarrito(update)
         result = createToken.encode
       

   







        return res.status(200).send({
            status: status,
            message: message,
            result: result,
            resCuponesError,
            /*
            descuento,
            update,
            cuponesValidos,
            resVC
            */
        });

      },

      delCupon: async (req, res) =>{
        let status ='success'
        let message ='Cupón eliminado con exito.'
        let result =''

        let {cupon, _ctk} = req.body

        const _VS = new validService()

        //todo: validamos el token del carrito

        let validctk = _VS.validParam(_ctk)
        if(!validctk){ //validamos que venga el token del carrito en el body
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos (2).',
                result: result
              });
        }

        const token = new JWTcarrito(_ctk)
        let carrito={}
        try{
            carrito = token.decode //decodificamos el token
            carrito = JSON.parse(carrito)  // parseamos para poder manipular el carrito.
        }catch(err){
            //Si ocurre un error al decodificar el token.  (token no valido.)
            return res.status(200).send({
                status:'error',
                message:'Ha ocurrido un error al intentar obtener la información de tu carrito de compras.',
                result:err.message
            });
    
        }

        // carrito items es valido?
        if(carrito.items == undefined){
            return res.status(200).send({
                status: 'error',
                message: '1.Datos no validos.',
                result: result
            });
        }

        

        //todo: validamos el cliente

        let cliente = carrito.cliente
        
      /*
        if(cliente == undefined || cliente == null){
            return res.status(200).send({
                status: 'error',
                message: '3.Faltan datos.',
                result: result
              });
        } */

        

        //! si el carrito viene vacio.. borrar todos los cupones.
        if(carrito.items.length ==0){

            let update = {
                items: [],
                cupon: [],
                descupon:0,
                subtotal:0,
                envio:0,
                total:0,
                cliente:cliente
            }

         
      
            update = JSON.stringify(update) 
    
            const createToken = new JWTcarrito(update)
            result = createToken.encode

            status = 'success'
            message ='Se han borrado los cupones ya que tu carrito no cuenta con productos agregados.'

            return res.status(200).send({
                status: status,
                message: message,
                result: result,
            });

            
        }



        // TODO: Validacion de cupones.
        let cuponescar = carrito.cupon
        if(cuponescar == undefined || cuponescar == null ){
            return res.status(200).send({
                status: 'error',
                message: '10.Datos no validos.',
                result: result
            });
        }
       
        if(cuponescar.length==0){ //!no hay cupones
            let total = carrito.subtotal + 0
            total <0? total = 0 : total //evitar negativos.
   
            total =  Math.round(total *100)/100;  //redondear
        
    
            let update = {
                items: carrito.items,
                cupon: [],
                descupon:0,
                subtotal: carrito.subtotal,
                envio:0,
                total:total,
                cliente:cliente
            }

         
      
            update = JSON.stringify(update) 
    
            const createToken = new JWTcarrito(update)
            result = createToken.encode

           

            return res.status(200).send({
                status: status,
                message: message,
                result: result,
            });
        }


        let filCupons =[] 

        for(var i=0; i<cuponescar.length; i++){
            if(cuponescar[i].code != cupon ){
                filCupons.push(cuponescar[i]) //cupon es diferente del que vamos a eliminar.
            }
        }

        //todo: validar los cupones.

        //* validar que el cupon no este ya agregado al carrito
        let resCuponesError =[]
        let cuponesValidos =[]
        
        cuponescar = filCupons; //reasignamos los cupones restantes.
        let emailcliente = cliente.email
        if(cuponescar.length > 0){

          
           for(var k=0; k<cuponescar.length; k++){
                //* Procedemos a validar los cupones.
                let response = await validateCupons(cuponescar[k].code, emailcliente, carrito)
                if(response.status =='success'){
                    cuponesValidos.push(cuponescar[k])
                }else{
                    let model ={
                        title:  `Se ha retirado el cupón '${cuponescar[k].code}' del carrito, no cumple los requisitos para aplicar.`,
                        cupon: cuponescar[k],
                        status: response.status,
                        message: response.message,
                    }

                    resCuponesError.push(model)
                }
              
           }


           

        }

        
        let reorderCupons=[]
         let totaldesc =0
         
         let cupones= cuponesValidos
         for(var i=0; i<cupones.length; i++){
            let response = await getCupon( cupones[i].code)

            if(response.status =='success'){  //* actualizar los cupones en caso de que cambien de tipo , valor o envio gratis
                let descuento =0
                
                if(response.result.type =='PORCENTAJE'){
                    descuento = response.result.value /100
                    if(carrito.subtotal == undefined || carrito.subtotal == null ){
                        descuento =0
                    }else{
                        let totaldesc = carrito.subtotal * descuento
        
                        descuento = totaldesc
                    }
                }else{
                    descuento = response.result.value
                }


                let model ={
                    code : cupones[i].code,
                    type: response.result.type,
                    descuento: descuento,
                    value: response.result.value,
                    freeShipping: response.result.freeShipping,
                 }
                 reorderCupons.push(model)

                
                 totaldesc = totaldesc + descuento
                 
            }
           
            
            
         }
 
       
 

         //* recalcular el envio en caso de que cambie.
         let totalenvio = carrito.envio

         let sigueGratis ='NO'
         for(var m=0; m<reorderCupons.length; m++){
            if(reorderCupons[m].freeShipping == 'SI'){
                sigueGratis ='SI'
            }
         }

      

         if(sigueGratis =='SI'){
             totalenvio =0
         }else{
             totalenvio = carrito.envio
         }



        //todo: recalcular descupon total envio etc.
        totaldesc = Math.round(totaldesc *100)/100;
        let total = (carrito.subtotal - totaldesc)+totalenvio
        total <0? total = 0 : total //evitar negativos.

        total =  Math.round(total *100)/100;  //redondear
        

        let update = {
            items: carrito.items,
            cupon: reorderCupons,
            descupon:totaldesc,
            subtotal:carrito.subtotal,
            envio:totalenvio,
            total:total,
            cliente:cliente
        }
  
        update = JSON.stringify(update) 

        const createToken = new JWTcarrito(update)
        result = createToken.encode



        return res.status(200).send({
            
            status: status,
            message: message,
            result: result,
            carrito,
            cliente,
            cuponescar,
            filCupons,
            totalenvio,
            resCuponesError,
            cuponesValidos
            
        });
      },



      validateCart: async  (req, res) =>{
        let status ='success'
        let message = 'Datos validos.'

        let {carrito} = req.body
    
        
        let _VS = new validService()

        let validcar = _VS.validParam(carrito)
        
        //Todo: Validamos que venga carrito.
        if(!validcar){
            return res.status(200).send({
                status: 'error',
                message: 'Carrito no valido. (1)',
                result:''
            });
        }

        //Todo: validamos items
        let items = carrito.items;

        let validitems = _VS.validParam(items)

        if(!validitems){
            return res.status(200).send({
                status: 'error',
                message: 'Carrito no valido. (2)',
                result:''
            });
        }

        let producto
        let stock;

      


        //Todo: Validar productos.
        for(var i =0; i<items.length; i++){

            let validate = await validateItem(items[i].item) //* validar todas las variables dentro del item */

            if(validate.status =='error'){

                return res.status(200).send({
                    status: validate.status,
                    message: validate.message,
                    result:''
                 });
            }

            let response =await getProducto(items[i].item.id) //* buscar el producto. */

            if(response.status == 'error'){
                return res.status(200).send({
                    status: 'error',
                    message: 'Producto no valido.',
                    result:''
                });
            }

            producto = response.result

           //* Validar stock
            let resStock = await getStock(items[i].item.id)

            if(resStock.status =='error'){
                return res.status(200).send({
                status: 'error',
                message: 'No se encontro stock para el producto.',
                result: resStock
                });
            }

            let stock = resStock.result
            let disponibles = parseInt(stock) 



           if(items[i].cantidad > disponibles){
               
                return res.status(200).send({
                    status: 'error',
                    message: 'Tienes productos que han superdado el stock.',
                    result: {producto: items[i], stock: disponibles } 
                });
            }

        
          

        
           
           

            //Todo validamos el precio

            if(items[i].item.price != producto.price){
                return res.status(200).send({
                    status: 'error',
                    message: 'Datos no validos (3)',
                    result: ''

                });
            }


            //Todo validamos el subtotal      cantidad x precio.
            
           let subtotal = items[i].item.price * items[i].cantidad
           subtotal =  subtotal 

         

           if(subtotal != items[i].subtotal){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos (4)',
                result: ''
            });
           }

        }


      

        //* TODO correcto con los items del carrito.

         //* Validar cliente 
        
         let cliente  = carrito.cliente
         let validcli = _VS.validParam(cliente)
         //! validar cliente.
         if(!validcli){
             return res.status(200).send({
                 status: 'error',
                 message: 'Datos no validos (  10)',
                 result: ''
             });
         }
 
       
         //Todo: Validar cupones  
       
         let cupon = carrito.cupon

        
         if(cupon == undefined || cupon == null ){
             return res.status(200).send({
                 status: 'error',
                 message: 'Datos no validos (  10)',
                 result: ''
             });
         }
       
         //* verificar si vienen cupones agregados al array de cupon y aplicarlos.
 
 
 
           // TODO: obtener el descuento por cupones.
           let descupon = carrito.descupon

           let validdesc = _VS.validNum(descupon)

           if(!validdesc){ //cupon == ''
             return res.status(200).send({
                 status: 'error',
                 message: 'Datos no validos (11)',
                 result: ''
             });
           }

        
           let cuponescar = carrito.cupon
           if(cuponescar == undefined || cuponescar == null ){
               return res.status(200).send({
                   status: 'error',
                   message: '10.Datos no validos.',
                   result: result
               });
           }
          //* verificar el cliente
        
 
       let descuponcar =descupon
           
 
       let emailcliente = cliente.email
      
 
 
       //* validar que el cupon no este ya agregado al carrito
       let resCuponesError =[]
       let cuponesValidos =[]
       if(cuponescar.length > 0){
 
         
          for(var k=0; k<cuponescar.length; k++){
               //* Procedemos a validar los cupones.
               let response = await validateCupons(cuponescar[k].code, emailcliente, carrito)
               
               if(response.status =='success'){
                   cuponesValidos.push(cuponescar[k])
               }else{
                   let model ={
                       title:  `Se ha retirado el cupón '${cuponescar[k].code}' del carrito, no cumple los requisitos para aplicar.`,
                       cupon: cuponescar[k],
                       status: response.status,
                       message: response.message,
                   }
 
                   resCuponesError.push(model)
               }
             
          }
 
 
          
 
       }
 
      
       if(resCuponesError.length>0){
            return res.status(200).send({
                status: 'error',
                message: 'Cupones expirados / no validos.',
                result: resCuponesError
            });
       }
       
       let reorderCupons=[]
        let totaldesc =0
        
        let cupones= cuponesValidos
       
        for(var i=0; i<cupones.length; i++){
           let response = await getCupon( cupones[i].code)
 
           if(response.status =='success'){  //* actualizar los cupones en caso de que cambien de tipo , valor o envio gratis
               let descuento =0
               
               if(response.result.type =='PORCENTAJE'){
                   descuento = response.result.value /100
                   if(carrito.subtotal == undefined || carrito.subtotal == null ){
                       descuento =0
                   }else{
                       let totaldesc = carrito.subtotal * descuento
       
                       descuento = totaldesc
                   }
               }else{
                   descuento = response.result.value
               }
 
 
               let model ={
                   code : cupones[i].code,
                   type: response.result.type,
                   descuento: descuento,
                   value: response.result.value,
                   freeShipping: response.result.freeShipping,
                }
                reorderCupons.push(model)
 
               
                totaldesc = totaldesc + descuento
               
                
           }
          
           
           
        }
 
     
 
 
        //* recalcular el envio en caso de que cambie.
        let totalenvio = carrito.envio
 
        let sigueGratis ='NO'
        for(var m=0; m<reorderCupons.length; m++){
           if(reorderCupons[m].freeShipping == 'SI'){
               sigueGratis ='SI'
           }
        }
 
     
 
        if(sigueGratis =='SI'){
            totalenvio =0
        }else{
            totalenvio =carrito.envio
           
        }

        totaldesc =  Math.round( totaldesc *100)/100;   //redondear 
     
        if(totaldesc != carrito.descupon ){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos (10)',
                result: ''
            });
        }


        if(totalenvio != carrito.envio ){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos (150)',
                result: ''
            });
        }
 
 
 
        
        //Todo: Validar subtotal 

        let subtotal = carrito.subtotal
        
        if(subtotal ==0 || subtotal == undefined || subtotal == null || subtotal ==''){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos (5)',
                result: ''
            });
        }

        let calcsubtotal=0;

        for(var i=0; i<items.length; i++){
            calcsubtotal =  calcsubtotal + items[i].subtotal
        }
        calcsubtotal =  Math.round( calcsubtotal *100)/100;  //redondear

        if(calcsubtotal != subtotal){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos (6)',
                result: ''
            });
        }


        if(carrito.envio == undefined || carrito.envio == null ){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos (7)',
                result: ''
            });
        }

       
        let total = (carrito.subtotal - carrito.descupon) + carrito.envio;
        total =   Math.round(total *100)/100;
       
        
        if(carrito.total == undefined || carrito.total ==null || carrito.total <0){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos (8)',
                result: ''
            });
        }
        
        
        if(carrito.total != total){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no validos (9)',
                result: ''
            });
        }


       
        return res.status(200).send({
            status: status,
            message: message,
            result:''
        });

      },
    















      /***MÉTODOS DE ENVÍO DE CORREOS */
      
  pruebaPlantillasPago: async  (req, res) => {
    let {name, email} = req.body
    let status ='success';
    let message = 'correo enviado.'

    if(name == undefined || name =='' || name == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo nombre no es valido.'
     });
    }

    if(email == undefined || email =='' || email == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo nombre no es valido.'
     });
    }


    let data = {
      "email":email,
      "name":name
    }

    /*const mail = new metodosDePrueba(data)
    
      mail.metodosDePrueba*/

    return res.status(200).send({
       status: status,
       message:message,
       data
    });
},
  
};


let validateCupons =  async(cupon, cliente, carrito)=>{
    let status = 'success';
    let  message = 'cupon valido';
    let result =''
    let _VS = new validService()
      


       //todo: validamos el cupon

      if(cupon == undefined || cupon== null || cupon ==''){
          return {
              status: 'error',
              message: '12.Faltan datos.',
              result: result
          };
      }


      let response = await getCupon( cupon)

   

      if(response.status =='error'){
          return {
              status: 'error',
              message: 'Cupón no valido.',
              result: result
          };
      }

      let datacupon = response.result;


      //* verificar el status 
      if(datacupon.status !='ACTIVO'){
          return {
              status: 'error',
              message: 'Cupón no disponible.',
              result: result
          };
      }

      //* verificar que no existan mas cupones y sea exclusivo

     
      //Evitar que se agregen mas cupones si ya existe un exclusivo
      let exclusivo = false;
      let encontrado = ''

     if(  carrito.cupon.length >0){
        for (const cupon of carrito.cupon) {
          
            if(cupon.exclusivo == 'SI'  && datacupon.code != cupon.code){
                exclusivo = true
                encontrado =cupon
            }
            
        }
      }
     

      if(exclusivo){
        return {
            status: 'error',
            message: 'Tu carrito tiene un cupón exclusivo, eliminalo para poder usar mas de 1 cupón.',
            result: result
        };
        
      }
       

      //* verficiar la fecha de vencimiento
      let dia = dayjs().format('YYYY-MM-DD')
      if(dia > datacupon.date_b){
          return {
              status: 'error',
              message: 'Cupón expirado.',
              result: result
          };
      }

      
      //* verificar la disponibilidad
      if(datacupon.totalAvailable ==0){
          return {
              status: 'error',
              message: 'El cupón se ha agotado.',
              result: result
          };
      }

      if(carrito.subtotal == undefined){
        return {
            status: 'error',
            message: '15.Datos no validos.',
            result: result
        };
      }

      if(datacupon.minAmount >0){
        if(carrito.subtotal < datacupon.minAmount ){
            return {
                status: 'error',
                message: `El monto minimo debe ser mayor a ${datacupon.minAmount}, monto actual ${carrito.subtotal}`,
                result: result
            };
          }
      }
    

      if( datacupon.maxAmount  > 0){
          if(carrito.subtotal > datacupon.maxAmount){
            return {
                status: 'error',
                message: `El monto maximo no debe ser mayor a ${datacupon.maxAmount}, monto actual ${carrito.subtotal}`,
                result: result
            };
          }
      }

      
      //* verficiar cliente
      let validcus = _VS.validParam(cliente);
 
      if(datacupon.totalAvailableCustomer >0 && !validcus){
            return {
                status: 'error',
                message: 'Debes inciar sesión para usar este cupón.',
                result: result
            };
      }
     let email =  cliente
      let cuponspurchase='_';
      if(datacupon.totalAvailableCustomer > 0){ //* solo verificar si el total por usuario es mayor a 0
           //* si viene el cliente en el body
  
          //todo verificar en cupons purchase que la cantidad de compras de este cliente no supere al total available
       
          const repoType = new cuponRepo();
          const modelType = new cuponModel( repoType);
          let cuponspurchase = await modelType.findCouponsPurchase(email, datacupon.code);
      
          if(cuponspurchase != 'error' && cuponspurchase != 'No se encontraron coincidencias'){ //* si encontro compras de este cliente.
              let len = cuponspurchase.length
              
              if(len >= datacupon.totalAvailableCustomer){ //! numero de compras supera al total disponible por usuarios.
                  return {
                      status: 'error',
                      message: 'Este cupón ya se encuentra agotado.',
                      result: result
                  };
              }
          }
      } 

     
      
      
      if(datacupon.limitCustomers =='SI' || datacupon.ExcludeCustomers =='SI'){ //* hay restricciones de usuario
          if(!validcus){
              return {
                  status: 'error',
                  message: 'Debes inciar sesión para usar este cupón..',
                  result: result
              };
          }
           //todo verificar si existe resriccion de cliente agregadas
          if(datacupon.restrictions_customers != 'No se encontraron coincidencias'){
              
              let encontrado ='NO'
              let resc =datacupon.restrictions_customers
              for(var i =0; i<resc.length; i++){
                  if(resc[i].customer_email == email){
                      encontrado ='SI'
                  }
              }

              if(datacupon.limitCustomers =='SI'  && encontrado =='NO'){
                  return {
                      status: 'error',
                      message: '4.Cupón no valido.',
                      result: result
                  };
              }

              if(datacupon.ExcludeCustomers =='SI'  && encontrado =='SI'){
                  return {
                      status: 'error',
                      message: '3.Cupón no valido.',
                      result: result
                  };
              }


          }
      }
      

   



      



      //* verificar restricciones de categorias
      
      let catE =[]
      if(datacupon.limitCategories =='SI' || datacupon.ExcludeCategories =='SI'){ //* hay restricciones de categorias
        
         let items = carrito.items;

         for(var i =0;i<items.length; i++){
              //Buscamos las categorias de los productos
              let producto = await getProducto(items[i].item.id)
            
              if(producto.status =='success'){
                  catE.push(producto.result.category_name)
              }

         }

         if(datacupon.restrictions_categories != 'No se encontraron coincidencias'){ //* procedemos a buscar las categorias

              let encontradas =[];

              let resc = datacupon.restrictions_categories;

              for(var i=0; i<catE.length; i++){
                  let encontrado ='NO'
                  for(var a =0; a<resc.length; a++){
                      if(resc[a].category == catE[i]){
                          encontrado = 'SI'
                      }
                  }
                  
                  encontradas.push(encontrado)
                  encontrado ='NO'
                  
                  
              }

              let resumen ='SI' //* supondremos que  si encontro todas , pero si llegamos aencontrar una que no cambiaremos a NO

              for(var b=0; b<encontradas.length; b++){
                  if(encontradas[b]=='NO'){
                      resumen = 'NO'
                  }
              }

            


              if(datacupon.limitCategories =='SI'  && resumen =='NO'){
                  return {
                      status: 'error',
                      message: '1.Este cupón no aplica a estas categorías.',
                      result: result
                  };
              }

              if(datacupon.ExcludeCategories =='SI'  && resumen =='SI'){
                  return {
                      status: 'error',
                      message: '2.Este cupón no aplica a estas categorías.',
                      result: result
                  };
              }


         }


       
          
         
          
      }
      


      //* verificar restricciones de productos
      
      let prodE =[]
      if(datacupon.limitProducts =='SI' || datacupon.ExcludeProducts =='SI'){ //* hay restricciones de producto
     
         let items = carrito.items;
      

         for(var i =0;i<items.length; i++){
                  prodE.push(items[i].item.name)
         }

         if(datacupon.restrictions_products != 'No se encontraron coincidencias'){ //* procedemos a buscar los productos

          let encontradas =[];

          let resc = datacupon.restrictions_products;


          for(var i=0; i<prodE.length; i++){
              let encontrado ='NO'
              for(var a =0; a<resc.length; a++){
                  if(resc[a].product == prodE[i]){
                      encontrado = 'SI'
                  }
              }
              
              encontradas.push(encontrado)
              encontrado ='NO'
              
              
          }

        

          let resumen ='SI' //* supondremos que  si encontro todas , pero si llegamos aencontrar una que no cambiaremos a NO

          for(var b=0; b<encontradas.length; b++){
              if(encontradas[b]=='NO'){
                  resumen = 'NO'
              }
          }

        


          if(datacupon.limitProducts =='SI'  && resumen =='NO'){
              return {
                  status: 'error',
                  message: '1.Este cupón no aplica a estos productos.',
                  result: result
              };
          }

          if(datacupon.ExcludeProducts =='SI'  && resumen =='SI'){
              return {
                  status: 'error',
                  message: '2.Este cupón no aplica a estos productos.',
                  result: result
              };
          }


       }


      }
   

    //* si todo sale bien


      return {
       
       
           status:status,
            message:message,
           carrito,
           cliente,
           cupon,
           datacupon,
           cuponspurchase,
           "categorias_encontradas":catE,
           "productos_encontrados": prodE,
         
       
    }
}





// Metodos para validaciones.

let getCupon = async (code) =>{
   
        const repoType = new cuponRepo();
        const modelType = new cuponModel( repoType);
    
        if(code == undefined || code == ''){
            return{
                status:'error',
                result: 'cupon no valido.'
              };
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
         
        return {
          status: status,
          result: model
        };
    
}
let getProducto = async  (id) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel( itemRepo);

    let _VS = new validService()
    
    let validid = _VS.validNum(id)
 

    if(!validid){
        return{
            status: 'error',
            message: 'Tipo de dato no valido.'
        };
    }


    let result = await modelItem.findById(id);
    let atributos = await modelItem.getAttValuesByProd(id)
   
    let status;
    let model;


    if(result != 'No se encontraron coincidencias'){
      status = 'success'
    
      let total_stock =0;
      let stock = ''
     /* const repoStock = new stockRepo();
      const modelStock = new stockModel( repoStock);
       stock = await modelStock.findByProd(result.id);
     
      
      if(stock !='No se encontraron coincidencias'){
        for(var a=0; a<stock.length; a++){
          total_stock = total_stock + stock[a].stock
        }
      } */

      if(result.status =='INACTIVO' ){
        status = 'error'
        model = `El carrito contiene productos que no estan disponibles actualmente.  [ ${result.name} ] `
      }else{
        model ={
            "id": result.id,
            "id_category": result.id_category,
            "id_brand": result.id_brand,
            "category_name": result.category_name,
            "brand_name": result.brand_name,
            "descrp": result.descrp,
            "url": result.url,
            "name": result.name,
            "status": result.status,
            "image": result.image,
            "price": result.price,
            "code": result.code,
            "skd_weight": result.skd_weight,
            "skd_height": result.skd_height,
            "skd_width": result.skd_width, 
            "skd_length": result.skd_length,
            "atributos":atributos
           // "total_stock": total_stock,
           // "stock": stock
            }
      }

     

    }else{
      status = 'error'
      model =result
    }
     
    return {
      status: status,
      result: model
    };
  }


  let getStock = async  (id) => {
    const itemRepo = new stockRepo();
    const modelItem = new stockModel( itemRepo);
   
    let _VS = new validService()

    let validid = _VS.validNum(id)

    if( !validid ){
        return {
            status: 'error',
            message: 'Tipo de dato no valido.'
        };
     }
    let result = await modelItem.getByProduct(id);
   
    let status;
    let message ='Stock encontrado.'

    if(result != 'No se encontraron coincidencias.' && result !='error'){
      status = 'success'
      let cant =0
      for (const item of result) {
            cant += item.stock
      }

      result = cant

    }else{
      status = 'error'
      message = 'No se encontraron coincidencias.'
    }
     
    return {
      status: status,
      result: result,
      message:message
    };
}

let validateItem = async (item) =>{
  

    let validate = {
        "message" :'Item valido.',
        "status" :'success'
    }

    let _VS = new validService()

    let validitem = _VS.validParam(item)

    if(!validitem){
        validate.message='Faltan datos.'
        validate.status='error'

        return validate
    }

    let validid = _VS.validNum(item.id)

    if(!validid){
        validate.message='Formato no valido.'
        validate.status='error'

        return validate
    }

    //validar el item.
    let producto = await getProducto(item.id)

    if(producto.status == 'error'){
        validate.message=producto.result
        validate.status='error'

        return validate 
    }

    

    return validate

}

module.exports = controller;


var JWTcarrito = require("../../services/jwt/carrito");
var JWTencode = require("../../services/jwt/encode")
var JWTdecode = require("../../services/jwt/decode")

var productModel =require( "../product/model");
var productRepo = require("../product/repo");

var stockModel =require( "../stock/model");
var stockRepo = require("../stock/repo"); 

var cuponModel = require("../carrito/model")
var cuponRepo = require("../carrito/repo")


var paymentModel =require( "../payment/model");
var paymentRepo = require("../payment/repo"); 

var shipmentModel =require( "../payment/shipmentModel");
var shipmentRepo = require("../payment/shipmentRepo"); 

//var emailShopcar = require("../../services/nodemailer/emailShopcar")

var dayjs = require("dayjs")
let validService = require("../../services/validator/validateParams")

//skydropx
const axios = require('axios')
//const apk = 'komuxJIzjPgrJUmQkQxutopTqJ3F96oo47IZE6vrnist' //demo
//const url = 'https://api-demo.skydropx.com/' //pruebas

const apk = '2F6QVLxQ8zdHn6rFbppElfVPFTWuQCuQ2tcgQt' //live
const url = 'https://api.skydropx.com/'

//OpenPay
var Openpay = require('openpay');
//var openpay = new Openpay('m153lscp7j3hfbrapwqm','sk_42ea5366af0d49deab4c765f372a79f6','mx', false); //pruebas
var openpay = new Openpay('mmqzdzpyic8qil1awvaf','sk_50a2d3cf935b4a7a9a00182b765d06df','mx', false);

openpay.setProductionReady(false);
openpay.setTimeout(30000);

var dec = require('../../services/jwt/decode')
var enc = require('../../services/jwt/encode')

const controller = {
    //Metodo para pruebas.
    getById: async  (req, res) => {
        const payRepo = new paymentRepo();
        const payModel = new paymentModel( payRepo);
      
        const validate = new validService()
        
        //! Validar role.
        //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

        let payload = req.user
        let validAdm = validate.validRole(payload.role)
    
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

        let role = payload.role
        let sub = payload.sub 


        let id = parseInt(req.params.id);
    
       
        let validID = validate.validNum(id)
        if(!validID){
              return res.status(200).send({
                status: 'error',
                message: 'Tipo de dato no valido.',
               
              });
        }
    
    
        let result = await payModel.getById(id);
   
       
        let status;
        let message='Pago encontrado.'

        if(role =='cliente' && result.id_user != sub){ //no puede devolver pagos que son de otro cliente.
            return res.status(200).send({
                status: 'error',
                message: 'Cliente no valido.',
               
            });
        }else{

          let payment = await getPaymentByID(id)
          if(payment.status != 'error'){
            status = 'success'
            result = payment.result
          }

        }
         
        return res.status(200).send({
          status: status,
          message: message,
          result: result
        });
      },

      getAll: async  (req, res) => {
        const payRepo = new paymentRepo();
        const payModel = new paymentModel( payRepo);
      
        const validate = new validService()
        
        //! Validar role.
        //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

        let payload = req.user
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
            message: 'Usuario no valido.',
            
          });
        }

        let role = payload.role
        let sub = payload.sub 

        let result = await payModel.getAll();
   
       
        let status ='success';
        let message='Pagos encontrados.'

        if(result !='error' && result !='No se encontraron coincidencias.'){ //no puede devolver pagos que son de otro cliente.
            let payments=[]
            for (const item of result) {
                let payment = await getPaymentByID(item.id)
                if(payment.status != 'error'){
                     payments.push(payment.result);
                }
            }

            result = payments
        }else{

          status ='error'
          message = result

        }
         
        return res.status(200).send({
          status: status,
          message: message,
          result: result
        });
      },
      getByClient: async  (req, res) => {
        const payRepo = new paymentRepo();
        const payModel = new paymentModel( payRepo);
      
        const validate = new validService()
        
        //! Validar role.
        //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

        let payload = req.user
        let validAdm = validate.validAdm(payload.role)
    
        if(payload == undefined || payload ==''){
          return res.status(200).send({
            status: 'error',
            message: 'Faltan datos.',
           
          });
        }

        let role = payload.role
        let sub = payload.sub 

        let id = parseInt(req.params.id);
        let validID = validate.validNum(id)
        if(!validID){
              return res.status(200).send({
                status: 'error',
                message: 'Tipo de dato no valido.',
               
              });
        }

        

        if(!validAdm){
          if(payload.sub != id){
            return res.status(200).send({
              status: 'error',
              message: 'Usuario no valido.',
              
            });
          }
        }

        
    

        let result = await payModel.getByClient(id);
   
       
        let status ='success';
        let message='Pagos encontrados.'

        if(result !='error' && result !='No se encontraron coincidencias.'){ //no puede devolver pagos que son de otro cliente.
            if(role == 'cliente'){
             let payments=[]
             for (const item of result) {
                 let payment = await getPaymentByID(item.id)
                 if(payment.status != 'error'){
                      if(item.id_user == sub){ //solo los del cliente adjuntado en payload.
                         payments.push(payment.result);
                      }
                 }
             }
             payments.length > 0 ? result = payments : result = 'No se encontraron coincidencias.'
            }else{
             let payments=[]
             for (const item of result) {
                 let payment = await getPaymentByID(item.id)
                 if(payment.status != 'error'){
                      payments.push(payment.result);
                 }
             }
 
             result = payments
            }
 
         }else{
 
           status ='error'
           message = result
 
         }
          
         
        return res.status(200).send({
          status: status,
          message: message,
          result: result
        });
      },

      search: async  (req, res) => {
        const payRepo = new paymentRepo();
        const payModel = new paymentModel( payRepo);
      
        const validate = new validService()
        
        //! Validar role.
        //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

        let payload = req.user
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
            message: 'Usuario no valido.',
            
          });
        }

        let role = payload.role
        let sub = payload.sub 

        let value = req.params.search;
    
       
        let validsearch = validate.validParam(value)
        if(!validsearch){
              return res.status(200).send({
                status: 'error',
                message: 'Formato no valido.',
               
              });
        }
    
        

        let result = await payModel.search(value);
   
       
        let status ='success';
        let message='Pagos encontrados.'

        if(result !='error' && result !='No se encontraron coincidencias.'){ //no puede devolver pagos que son de otro cliente.
           if(role == 'cliente'){
            let payments=[]
            for (const item of result) {
                let payment = await getPaymentByID(item.id)
                if(payment.status != 'error'){
                     if(result.id_user == sub){ //solo los del cliente adjuntado en payload.
                        payments.push(payment.result);
                     }
                }
            }

            payments.length >0 ? result = payments : result =  'No se encontraron coincidencias.'
           }else{
            let payments=[]
            for (const item of result) {
                let payment = await getPaymentByID(item.id)
                if(payment.status != 'error'){
                     payments.push(payment.result);
                }
            }

            result = payments
           }

        }else{

          status ='error'
          message = result

        }
         
        return res.status(200).send({
          status: status,
          message: message,
          result: result
        });
      },


      paymentStatus: async (req,res) =>{
        const payRepo = new paymentRepo();
        const payModel = new paymentModel( payRepo);

        let status ='success'
        let message ='Estatus actualizado.'
        let {id, 'status':value } = req.body;

        const _VS = new validService()
        let payload = req.user
        let validRole = _VS.validRole(payload.role)
    
        if(payload == undefined || payload ==''){
          return res.status(200).send({
            status: 'error',
            message: 'Faltan datos.',
           
          });
        }
    
        if(!validRole){
          return res.status(200).send({
            status: 'error',
            message: 'Usuario no valido.',
            
          });
        }

        let validid = _VS.validNum(id)
        let validvalue = _VS.validParam(value)


        if(!validid || !validvalue){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no valido.'
              });
        }

        let result =  await payModel.updateStatus(id, value)

        if(result != 'success'){
            status ='error'
            message = result
            result ='Ha ocurrido un error al intentar actualizar el status del pedido.'
        }else{
            result ='Status actualizado con exito.'
            //!Enviar los correos respectivos.
            let datas =  await getPaymentByID(id)
            
            let added = datas.result
            console.log(added)

            /*const mail = new emailShopcar(added)

            if(value == 'PROCESANDO'){
                mail.procesando
            }
            else if(value == 'PREPARANDO'){
                mail.preparando
            }*/
            /*else if(value == 'ENVIADO'){
                 mail.preparando
            }*/
        }

        

        return res.status(200).send( {
            status,
            message,
            result:result,
          });
      },

      paymentTrackingNumber: async (req,res) =>{
        const payRepo = new paymentRepo();
        const payModel = new paymentModel( payRepo);
        let status ='success'
        let message ='Numero de rastreo actualizado.'
        let {id, value } = req.body;

        const _VS = new validService()
        let payload = req.user
        let validAdm = _VS.validAdm(payload.role)
    
        if(payload == undefined || payload ==''){
          return res.status(200).send({
            status: 'error',
            message: 'Faltan datos.',
           
          });
        }
    
        if(!validAdm){
          return res.status(200).send({
            status: 'error',
            message: 'Usuario no valido.',
            
          });
        }

        let validid = _VS.validNum(id)
        let validvalue = _VS.validParam(value)

        if(!validid || !validvalue){
            return res.status(200).send({
                status: 'error',
                message: 'Datos no valido.'
              });
        }




        let result =  await payModel.updateTrackingNumber(id, value)

        if(result != 'success'){
            status ='error'
            message = result
            result ='Ha ocurrido un error al intentar actualizar el status del pedido.'
        }else{
            result ='Numero de rastreo actualizado con exito.'
            //! ENVIAR CORREO CON NUMERO DE RASTREO
            //seguimiento
            value = 'ENVIADO'
            let sent =  await payModel.updateStatus(id, value)

            if(sent != 'success'){
              status ='error'
              message = result
              result ='Ha ocurrido un error al intentar actualizar el status del pedido.'
            }else{
                result ='Status actualizado con exito.'
                let datas =  await getPaymentByID(id)
                let added = datas.result
                /*const mail = new emailShopcar(added)
                mail.enviado*/
            }

        }

        

        return res.status(200).send( {
            status,
            message,
            result:result,
          });
      },
    createCharge: async  (req, res) => {


        let customer = {
          'name' : 'Erik',
          'last_name' : 'Gonzalez',
          'phone_number' : '6221270622',
          'email' : 'erik.gonzalez.ac@gmail.com'
        }
           
       
        let chargeData = {
           'method' : 'card',
           'source_id' : 'kztxfmgmp7geujfwglcb',
           'amount' : 19, // formato númerico con hasta dos dígitos decimales. 
           'description' : 'Pago de cuenta en Agriga.',
           'currency' : 'MXN',
           'device_session_id' : '8bQbgjy0dGzcyee8ojIUrYtzfymahaiA',
           'customer' :customer
        }
      
        let status = 'success'
        let  message ='Cargo realizado con exito'

        var customerRequest = {
          'name': 'Tokenizacion cargo directo con cliente',
          'email': 'admin@agriga.com.mx',
          'requires_account': false 
          };
       
      openpay.customers.create(customerRequest, function(error, customer) {
              if(error){
                status ='error'
                message = error.description
              }
        


                return res.status(200).send( {
                  status,
                  message,
                  result :customer
                });
      
       });

      
       
      /*  let result =  openpay.charges.create(chargeData , function (  error, body){
        
          if(error){
            status ='error'
            message = error.description
          }
          
          result =  body
      
          if(status =='success'){
            //* -> Finalizar el pago.
            let order_id = body.id
            
          }else{
            //Todo ->  borrar el pago
          }
          
      
          return res.status(200).send( {
            status,
            message,
            result
          });
        
        })
        */
      
       
       
      
           
   },

  paymentCreate: async (req,res) =>{
    const payRepo = new paymentRepo();
    const payModel = new paymentModel( payRepo);
    
    const itemSRepo = new stockRepo();
    const modelSItem = new stockModel(itemSRepo);

    const productR = new productRepo();
    const productM = new productModel(productR);
    
    let {
        _ctk,
        method,
        shipping_option,
        carrier,
        id_user,
        name,
        lastname,
        email,
        phone,
        address,
        country,
        state,
        city,
        postal_code,
        notes,
        facturar,
        f_postal_code,
        f_country,
        f_state,
        f_city,
        f_email,
        f_phone,
        reason_social,
        fiscal_address,
        rfc,
        source_id,
        device_session_id
    } = req.body
console.log(req.body)
    let status ='success'
    let message ='Pago creado con exito.'
    let result =''

    const _VS = new validService()

    let payload = req.user
    let validAdm = _VS.validRole(payload.role)

    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
       
      });
    }

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Usuario no valido.',
        
      });
    }



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

    //* Todo correcto con el token del carrito. 


    //* Validar el carrito.

    let validcarrito = await validateCart(carrito)
    if(validcarrito.status=='error'){
        return res.status(200).send({
            status:'error',
            message: validcarrito.message,
            result: validcarrito.result
        });
    }
   
    //* Validar variables.

    let validmethod = _VS.validParam(method)
    let validshipping_option = _VS.validParam(method)
    let validid_user = _VS.validNum(id_user)
    let validname = _VS.validParam(name)
    let validlastname = _VS.validParam(lastname)
    let validemail = _VS.validEmail(email)
    let validphone = _VS.validPhone(phone)
    let validaddress = _VS.validParam(address)
    let validcountry = _VS.validParam(country) 
    let validstate = _VS.validParam(state)
    let validcity = _VS.validParam(city)
    let validpostal_code = _VS.validNum(postal_code) 
    let validnotes = _VS.validParam(notes) 
    let validsource_id = _VS.validParam(source_id) 
    let validdevice_session_id = _VS.validParam(device_session_id) 
    let validcarrier = _VS.validParam(carrier) 


    if(!validcarrier){
      carrier ='Ninguna'
    }
    carrier = enc.encode(carrier)
  

    if(!validmethod) return res.status(200).send({  status: 'error', message: 'Método de pago no valido.' });
    if(!validshipping_option) return res.status(200).send({  status: 'error', message: 'Opción de envio no valida.' });
    if(!validid_user) return res.status(200).send({  status: 'error', message: 'Usuario no valido.' });
    if(!validsource_id) return res.status(200).send({  status: 'error', message: 'token no valido. (1)' });
    if(!validdevice_session_id) return res.status(200).send({  status: 'error', message: 'token no valido. (2)' });
    //todo: Buscar usuario por el id.

    if(!validname) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Nombre)' });
    if(!validlastname) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Apellidos)' });
    if(!validemail) return res.status(200).send({  status: 'error', message: 'Email no valido. (1)' });
    if(!validphone) return res.status(200).send({  status: 'error', message: 'No. teléfono no valido. (1)' });
    if(!validaddress) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Dirección)' });
    if(!validcountry) return res.status(200).send({  status: 'error', message: 'Formato no valido. (País)' });
    if(!validstate) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Estado)' });
    if(!validcity) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Ciudad)' });
    if(!validpostal_code) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Código Postal)' });
    if(!validnotes) { notes ='' } //no es necesaria.


    //solo si facturar = true
    if(facturar){
            //* Validar datos de facturacion
        let validf_postal_code = _VS.validNum(f_postal_code)
        let validf_country = _VS.validParam(f_country)
        let validf_state = _VS.validParam(f_state)
        let validf_city = _VS.validParam(f_city)
        let validf_email = _VS.validEmail(f_email)
        let validf_phone = _VS.validPhone(f_phone)
        let validreason_social = _VS.validParam(reason_social)
        let validfiscal_address = _VS.validParam(fiscal_address)
        let validrfc = _VS.rfcValido(rfc)
       
    

        if(!validf_postal_code) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Código Postal facturación)' });
        if(!validf_country) return res.status(200).send({  status: 'error', message: 'Formato no valido. (País facturación)' });
        if(!validf_state) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Estado facturación)' });
        if(!validf_city) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Ciudad facturación)' });
        if(!validf_email) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Email facturación)' });
        if(!validf_phone) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Phone facturación)' });
        if(!validreason_social) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Razón social)' });
        if(!validfiscal_address) return res.status(200).send({  status: 'error', message: 'Formato no valido. (Dirección Fiscal)' });
        if(!validrfc) return res.status(200).send({  status: 'error', message: 'Formato no valido. (RFC)' });
    }
    
 

    




    //crear numero de pago.
    let pay_num = '00001';
    //* obtener ultimo
    let last = await payModel.last();

    if(last!='error'){
        let num = last.pay_num
        num = parseInt(num)
      
        num = num+1

        if(num <10){
            num='0000'+num
        }else if(num >= 10 && num < 100){
            num='000'+num
        }else if(num >= 100 && num  < 1000){
            num='00'+num
        }else if(num >= 1000 && num  < 10000){
            num='0'+num
        }else if(num >= 10000 ){
            num=''+num
        }

        pay_num = String(num)
    }


    let order_id ='';
    let customer_id ="";


    //* Recalcular envio.
    let city2 = city;
    city2 !=''? city2= city2.toLowerCase().trim(): city2

    let envio_inicial = carrito.envio
    let  freeShipping = false
      
      for (const cupon of carrito.cupon) {
          if(cupon.freeShipping =='SI'){
            envio_inicial =0
            freeShipping = true;
            break
          }
      }

      if(freeShipping == false){
        
           if(state =='Sonora' && city2 =='hermosillo' ){
                carrito.envio =50
        }else if(state =='Sonora'){
            carrito.envio =100
        }else{
            carrito.envio = envio_inicial
        } 
      }


      carrito.envio = envio_inicial

      if(shipping_option =='Ordena y Recoge' ){ //|| carrito.subtotal >=  2500
        carrito.envio = 0
      }

      carrito.total = carrito.subtotal + carrito.envio;

    let dataPayment ={
        "method": method,
        "shipping_option":shipping_option,
        "id_user": id_user,
        "name":  name,
        "lastname": lastname,
        "email":  email,
        "phone":   phone,
        "address":  address,
        "country":  country,
        "state":  state,
        "city": city,
        "postal_code":  postal_code,
        "notes": notes,
        "pay_num":pay_num,//! generado apartir del numero del ultimo pago +1 
        "order_id":order_id, //! generado por  openpay/paypal
        "customer_id":customer_id, //! generado por openpay/paypal
        "subtotal":carrito.subtotal, //! en carrito
        "envio" :carrito.envio,  //! en carrito
        "descupon" :carrito.descupon,  //! en carrito
        "total" :carrito.total,  //! en carrito
        "carrier":carrier,
    }

    let dataFacturacion=''


    let insertPay = await payModel.create(dataPayment)

    //ocurre error al guardar el pago
    if(insertPay.status =='error') return res.status(200).send({
        status : 'error',
        message : 'Ha ocurrido un error al intentar guardar la informacion. No se ha realizado ningun cargo.',
    });



    let insertFac =''
    let insertItems=[]
    let insertCupons=[]
    if(insertPay.status=='success'){
        let id_payment  = insertPay.result.insertId
        
        // guardar datos de facturacion si es requerido
        if(facturar){

            dataFacturacion ={
                "id_payment":id_payment,
                "postal_code": f_postal_code,
                "country": f_country,
                "state": f_state,
                "city": f_city,
                "email": f_email,
                "phone": f_phone,
                "reason_social": reason_social,
                "fiscal_address":fiscal_address,
                "rfc":rfc
            }
    
            insertFac = await payModel.create_billing(dataFacturacion)

            if(insertFac.status =='error'){
                //borramos el pago.
                let delpay = await payModel.delete(id_payment)
                return res.status(200).send({
                    status : 'error',
                    message : 'Ha ocurrido un error al intentar guardar la informacion de facturación. No se ha realizado ningun cargo.',
                });
            }
        }

        //guardar items
        for (const item of carrito.items) {

          const atributos_valores  = await productM.getAttValuesByProd(item.item.id)

          let extra =''
          for (var i =0; i< atributos_valores.length; i++) {
            const atributo = atributos_valores[i].atributo
            const valor = atributos_valores[i].valor
            if(i==0){
                extra = extra + atributo +': '+valor
            }else{
                extra = extra +', '+ atributo +': '+valor
            }

            
          }


            let dataItem ={
                id_payment, 
                name:item.item.name, 
                price: item.item.price,
                quantity:item.cantidad ,
                subtotal:item.subtotal,  
                id_item:item.item.id, 
                type:'product',
                extra
            }
            let insertItem = await payModel.create_detail(dataItem)
            insertItems.push(insertItem) //guardo los resultados.
            if(insertItem.status =='error'){
                //borramos el pago.
                let delpay = await payModel.delete(id_payment)
                return res.status(200).send({
                    status : 'error',
                    message : 'Ha ocurrido un error al intentar guardar los productos. No se ha realizado ningun cargo.',
                });
              
            }
          
        }


        //guardar cupones usados.
        for (const cupon of carrito.cupon) {
            let dataCupon ={
                id_payment,  
                customer_email: carrito.cliente.email,
                code:cupon.code,
                freeShipping: cupon.freeShipping, 
                type:cupon.type, 
                value:cupon.value, 
                descupon:cupon.descuento,
                exclusivo: cupon.exclusivo
            }
            let insertCupon = await payModel.create_payment_coupons(dataCupon)
            insertCupons.push(insertCupon) //guardo los resultados.
            if(insertCupon.status =='error'){
                //borramos el pago.
                let delpay = await payModel.delete(id_payment)
                return res.status(200).send({
                    status : 'error',
                    message : 'Ha ocurrido un error al intentar guardar los cupones utilizados. No se ha realizado ningun cargo.',
                });
            }
            break;
        }


        //crear el pago openpay
        let customer = {
            'name' : name,
            'last_name' : lastname,
            'phone_number' : phone,
            'email' : email
        }
        //todo Crear customer.
        const fullname = name + ' ' + lastname;
        var customerRequest = {
          'name': fullname,
          'email': email,
          'requires_account': false 
      };
             
         
          let chargeData = {
             'method' : 'card',
             'source_id' : source_id,
             'amount' : carrito.total, // formato númerico con hasta dos dígitos decimales. 
             'description' : 'Pago de cuenta en Agriga.',
             'currency' : 'MXN',
             'device_session_id' : device_session_id,
             //'customer' :customer
             'use_3d_secure': 'true',
             //'redirect_url': 'http://localhost:8080/finalizado', 
             'redirect_url': 'https://huupa.xyz/finalizado', 
          }
        
         
         
           openpay.customers.create(customerRequest, async function(error, customer) {
            if(error){
              status ='error'
              message = error.description

               //Todo ->  borrar el pago
               let delpay = await payModel.delete(id_payment)

    
              return res.status(200).send({
                status: 'error',
                message: message, 
                result: ''
             });
            }


            const customerId = customer.id

           openpay.customers.charges.create(customerId , chargeData , async function (  error, body){
          //let result =  openpay.charges.create(chargeData , async function (  error, body){
          
            if(error){
              status ='error'
              message = error.description
            }
            
            result =  body
            let added ={}
        
            if(status =='success'){
             message ='Cargo realizado con exito'
              //* -> Finalizar el pago.
              let order_id = body.id
            



              let receip = JWTencode.encode({customerId, chargeData ,body})
              await payModel.updateCustomerID(id_payment, customerId)
              await payModel.updateOrderID(id_payment, order_id)
              await payModel.updateReceipt(id_payment, receip)
              await payModel.updateStatus(id_payment, 'CARGO PENDIENTE')
              

              //* RESTAR STOCK.
             
              for (const item of carrito.items) {
                let stock = await modelSItem.getByProduct(item.item.id);
               
                if(stock != 'No se encontraron coincidencias.' && stock !='error'){
                    let stockActual = parseFloat(stock[0].stock)
                    let cantidad_restar = parseFloat(item.cantidad)

                    let newStock = stockActual - cantidad_restar
                    let validateStock = _VS.validNum(newStock)
                    if(validateStock){
                        newStock <0? newStock =0 : newStock //evitamos numeros negativos.
                    }
                    let data ={ 
                        id:stock[0].id,
                        id_product:  stock[0].id_product,
                        stock: newStock
                    }
                    let updateStock = await modelSItem.update(data)
                }
              } 

              //*DEVOLVER ADDED
              let getPayment = await getPaymentByID(id_payment)
              if(getPayment.status !='error'){
                added = getPayment.result



              }
              
            }else{
              //Todo ->  borrar el pago
              let delpay = await payModel.delete(id_payment)

              //ENVIAR CORREO DE ERROR DE PAGO
            }
            
        
            return res.status(200).send( {
              status,
              message,
              result:added,
            });
          
          }); 

           //! fin user
         

        });
    }

    
  },
   //openpay
   validateCharge: async  (req, res) => {
    const payRepo = new paymentRepo();
    const payModel = new paymentModel( payRepo);

    let status='success';
   
    let message='Cargo actualizado';

    const validate = new validService()
        
    //! Validar role.
    //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

    let payload = req.user
    let validAdm = validate.validRole(payload.role)

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
    
   

    let {order_id} = req.body
   
    if(!order_id){
        return res.status(200).send({
            status: 'error',
            message: 'Datos no validos.',
            result: '',
        });
    }

  

    let payment = await payModel.getByOrderId(order_id)
    

   
    if(!payment.id){ //! no se encontro el payment
        return res.status(200).send({
            status: 'error',
            message: 'Cargo no valido.',
            result: ''
        });
    }

    //Validar que si es cliente sea de el.
    let role = payload.role
    let sub = payload.sub 

    if(role =='cliente' && payment.id_user != sub){ //no puede devolver pagos que son de otro cliente.
      return res.status(200).send({
          status: 'error',
          message: 'Cliente no valido.',
         
      });
    }

  

    const transactionId =  payment.order_id
    const customerId  = payment.customer_id
    /**
     * @param {string} transactionId -> order_id
     * @param {string} customerId -> customer_id
     */
    openpay.customers.charges.get(customerId, transactionId, async function(error, charge) {
        if(error){
          status ='error'
          message = error.description

          return res.status(200).send({
            status: 'error',
            message: message, 
            result: ''
         });
        }

       


        const itempay = await getPaymentByID(payment.id)
        if(itempay.status == 'error'){
          return res.status(200).send({
            status: 'error',
            message: message, 
            result: ''
         });
        }
        payment = itempay.result


        
        //actualizar status.
       //enviar email.
        if(payment.status =='CARGO PENDIENTE' && charge.status == 'completed'){
         await payModel.updateStatus(payment.id, 'RECIBIDA' )
             

           
           
        //! ENVIAR CORREO

        /*const mail = new emailShopcar(payment)
        mail.procesando*/
        //mail.pedidoNuevo

        }else if(charge.status == 'expired'){
            await payModel.updateStatus(payment.id, '3D SECURE EXPIRADO' )
        }else if(charge.status == 'failed'){
            await payModel.updateStatus(payment.id, 'FALLIDO' )
        }else if(charge.status == 'cancelled'){
            await payModel.updateStatus(payment.id, 'CANCELADO' )
        }
      
       

        return res.status(200).send({
            status: status,
            message: message, 
            result: charge,
            payment
         });
         

     });

     
     
    
     
     
     



    
  } ,

  createShipment: async  (req, res) => {
    const payRepo = new paymentRepo();
    const payModel = new paymentModel( payRepo);

    const shipRepo = new shipmentRepo();
    const shipModel = new shipmentModel( shipRepo);
  
    const validate = new validService()

    
    let {id_payment, shipment_data} =req.body


    //! Validar role.
    //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

    let payload = req.user
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
        message: 'Usuario no valido.',
        
      });
    }

    const validID = validate.validNum(id_payment)

    if(!validID){
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido.',
        
      });
    }

    //todo: validar shipment

    if(!shipment_data?.address_from || !shipment_data?.address_to){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos en la informacíon de envio.',
        
      });
    }

    if( !shipment_data.consignment_note_class_code || !shipment_data.consignment_note_packaging_code){
      return res.status(200).send({
        status: 'error',
        message: 'La clase y el embalaje son requeridos para crear el envío.',
        
      });
    }

    if( !shipment_data.descr_class || !shipment_data.descr_packaging){
      return res.status(200).send({
        status: 'error',
        message: 'La clase y el embalaje son requeridos para crear el envío [2].',
        
      });
    }


    
 
    let result =[]
    let message ='Envío creado.'
    let status ='success'
    let jsonres = ''
    let respostatus =''

    const token = apk //demo
    const headers = { "Content-Type": "application/json",
                        'Authorization': `Token token=${token}` };
     try{
      
       const   response = await axios.post(`${url}v1/shipments`, shipment_data, {headers});
       jsonres = response.data
       
      }catch (error){
        console.log(error.message)
        respostatus = error.response.status
        message = 'Ha ocurrido un error al intentar crear el envío.'
        status = 'error'
      }

      if(!jsonres?.data?.id || status =='error'){

        let msger ='Ha ocurrido un error al intentar crear el envío, vuelve a intentarlo.'

        if(respostatus == 500){
          msger = 'Lo sentimos, Skydropx esta teniendo problemas con su servidor. Vuelva a intentarlo más tarde.'
        }

        return res.status(200).send({
          status: 'error',
          message:msger ,
        });
      }
      
      let encode = ''
      try {
        encode = JWTencode.encode(jsonres)
      } catch (error) {
        encode = error.message
      }



      let data ={
        id_payment, 
        _class: shipment_data.consignment_note_class_code , 
        _packaging :shipment_data.consignment_note_packaging_code, 
        shipment_id: jsonres.data.id , 
        json_shipment_res:encode,
        descr_class:shipment_data.descr_class, 
        descr_packaging:shipment_data.descr_packaging
      }


      let createShipment = await shipModel.create(data);

      if(createShipment != 'success'){
        status='error';
        message=createShipment
        result=''
      }else{
        status='success';
        message= 'Envío creado'
        result = 'success'

        const value = 'CREANDO ENVÍO'
        let sent =  await payModel.updateStatus(id_payment, value)
      }
   
   

     return res.status(200).send({
        status,
        message,
        result,
        
     });



    
  },

  createLabel: async  (req, res) => {

    const payRepo = new paymentRepo();
    const payModel = new paymentModel( payRepo);

    const shipRepo = new shipmentRepo();
    const shipModel = new shipmentModel( shipRepo);
  
    const validate = new validService()

    //Skydropx
    const token = apk
    const headers = { "Content-Type": "application/json",
                    'Authorization': `Token token=${token}` };
    

    //req
    let {id, rate_id, shipment_id, id_payment} =req.body

    let result =[]
    let message ='Label creada.'
    let status ='success'


    //! Validar role.
    //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

    let payload = req.user
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
        message: 'Usuario no valido.',
        
      });
    }

    const validID = validate.validNum(id)
    const validid_payment = validate.validNum(id_payment)
    const validrate_id = validate.validParam(rate_id)
    const validshipment_id = validate.validParam(shipment_id)

    if(!validID  || !validid_payment){
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido.',
        
      });
    }

    if( !validrate_id){
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido [2].',
        
      });
    }
    if( !validshipment_id){
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido [3].',
        
      });
    }

    //* Validar que ese envio no tenga -> chosen_rate (label ya creada)
    

             

    let getShipmentByID =''
  
    try{

    getShipmentByID = await axios.get(`${url}v1/shipments/${shipment_id}`, {headers});
    if(getShipmentByID?.data?.data) getShipmentByID = getShipmentByID.data.data
    
    }catch (error){
      //console.log(error.message)
      getShipmentByID =error.message
    }

    if(getShipmentByID?.relationships?.chosen_rate?.data?.id && getShipmentByID?.relationships?.labels?.data[0]?.id ){
      
    
      rate_id = getShipmentByID.relationships.chosen_rate.data.id

      let label_id = getShipmentByID.relationships.labels.data[0].id

      //todo: obtener la label.
      let getLabelByID =''

      try{
  
        getLabelByID = await axios.get(`${url}v1/labels/${label_id}`, {headers});
          if(getLabelByID?.data?.data) getLabelByID = getLabelByID.data.data
        
      }catch (error){
        //console.log(error.message)
        getLabelByID =error.message
      }

      let encode = ''
      try {
        encode = JWTencode.encode(getLabelByID)
      } catch (error) {
        encode = error.message
      }

      let decode = ''
      try {
        decode = JWTdecode.decode(encode)
      } catch (error) {
        decode = error.message
      }

    
   

      const data ={id, rate_id  , json_label_res: encode, label_id }
   
      let createLabel = await shipModel.updateLabel(data);

      if(createLabel != 'success'){
        status='error';
        message=createLabel
        result=''
      }else{
        status='success';
        message= 'Label creada'
        result = 'success'
      }



      //* Actualizar numero de rastreo.
      let updateTrackingNumber =  await payModel.updateTrackingNumber(id_payment, getLabelByID.attributes.tracking_number)

      if(updateTrackingNumber == 'success'){
          
          //! ENVIAR CORREO CON NUMERO DE RASTREO
          //seguimiento
          const value = 'ENVIADO'
          let sent =  await payModel.updateStatus(id_payment, value)

          if(sent == 'success'){
            result ='Status actualizado con exito.'
            let datas =  await getPaymentByID(id_payment)
            let added = datas.result
            /*const mail = new emailShopcar(added)
            mail.enviado*/
          }
      }
      

      return res.status(200).send({
        status: 'success',
        message: message,
        result
       /* rate_id,
        label_id,
        getLabelByID,
        encode,
        decode,
        getShipmentByID */
      });
    }

    

    //* si no tiene label creada

    rate_id = parseInt(rate_id)

    const dataLabel = { "rate_id": rate_id, "label_format": "pdf" }

 
  
    let jsonres =''

  
     try{
      
       const   response = await axios.post(`${url}v1/labels`,dataLabel, {headers});
       jsonres = response.data
       
      }catch (error){
        console.log(error.message)
        message = 'Ha ocurrido un error al intentar crear la label.'
        status = 'error'
      }


      if(!jsonres?.data?.id || status =='error'){
        return res.status(200).send({
          status: 'error',
          message: 'Ha ocurrido un error al intentar crear la label, vuelve a intentarlo.',
        });
      }
      
      let encode = ''
      try {
        encode = JWTencode.encode(jsonres)
      } catch (error) {
        encode = error.message
      }

      const data ={id, rate_id, json_label_res: encode, label_id: jsonres.data.id }
   
      let createLabel = await shipModel.updateLabel(data);

      if(createLabel != 'success'){
        status='error';
        message=createLabel
        result=''

      }else{
        status='success';
        message= 'Label creada'
        result = 'success'

        let label_id =jsonres.data.id
        
        //* Actualizar envio
        try{
  
          let  getLabelByID = await axios.get(`${url}v1/labels/${label_id}`, {headers});
              if(getLabelByID?.data?.data){
                getLabelByID = getLabelByID.data.data
                   //* Actualizar numero de rastreo.
                let updateTrackingNumber =  await payModel.updateTrackingNumber(id_payment, getLabelByID.attributes.tracking_number)
               
  
                if(updateTrackingNumber == 'success'){
                    
                    //! ENVIAR CORREO CON NUMERO DE RASTREO
                    //seguimiento
                    const value = 'ENVIADO'
                    let sent =  await payModel.updateStatus(id_payment, value)
    
                    if(sent == 'success'){
                      result ='Status actualizado con exito.'
                      let datas =  await getPaymentByID(id_payment)
                      let added = datas.result
                      /*const mail = new emailShopcar(added)
                      mail.enviado*/
                    }
                }
              } 
  
              
             
            
          }catch (error){
            console.log(error.message)
          }
      }

     return res.status(200).send({
        status,
        message,
        result,
        
     });



    
  },
  cancelLabel: async  (req, res) => {

    const payRepo = new paymentRepo();
    const payModel = new paymentModel( payRepo);

    const shipRepo = new shipmentRepo();
    const shipModel = new shipmentModel( shipRepo);
  
    const validate = new validService()

    //Skydropx
    const token = apk
    const headers = { "Content-Type": "application/json",
                    'Authorization': `Token token=${token}` };
    

    //req
    let {tracking_number, reason, id_payment_shipment,id_payment} =req.body

    let status ='success'
    let message ='Etiqueta cancelada'
    let result =''


    //! Validar role.
    //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

    let payload = req.user
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
        message: 'Usuario no valido.',
        
      });
    }

    const validID = validate.validNum(id_payment_shipment)
    const validid_payment = validate.validNum(id_payment)
    const validreason = validate.validParam(reason)
    const validtracking_number = validate.validParam(tracking_number)

    if(!validID  || !validid_payment){
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido.',
        
      });
    }

    if( !validreason){
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido [2].',
        
      });
    }
    if( !validtracking_number){
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido [3].',
        
      });
    }



    const data = { "tracking_number": tracking_number, "reason": reason }
  
    try{
     
      const   response = await axios.post(`${url}v1/cancel_label_requests`,data, {headers});
      result = response.data
      
        //! CAMBIAR EL Estado del envío
      const value = 'ENVÍO CANCELADO'
      let sent =  await payModel.updateStatus(id_payment, value)

      if(result?.data?.attributes?.status){
          await shipModel.updateCancelado(id_payment_shipment)
          
      } 
      
     }catch (error){
       console.log(error.message)
       message = 'Ha ocurrido un error al intentar cancelar la label.'+ "["+error.message+"]"
       status = 'error'
     }
   

    return res.status(200).send({
      status,
      message,
      result,
   });
  },
  deleteShipment: async  (req, res) => {
    const payRepo = new paymentRepo();
    const payModel = new paymentModel( payRepo);

    const shipRepo = new shipmentRepo();
    const shipModel = new shipmentModel( shipRepo);
  
    const validate = new validService()

   

    //req
    let {id} =req.body

    //! Validar role.
    //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

    let payload = req.user
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
        message: 'Usuario no valido.',
        
      });
    }

    const validID = validate.validNum(id)

    if(!validID  ){
      return res.status(200).send({
        status: 'error',
        message: 'Formato no valido.',
        
      });
    }
    let getById = await shipModel.getById(id)
    if(!getById){
      return res.status(200).send({
        status: 'error',
        message: 'Envio no encontrado.',
      });
    }
   
    let result = await shipModel.delete(id)
    let message;
    let status ='success';
   

    if(result =='success'){
       
        message ='Pago eliminado'

         //! CAMBIAR EL Estado del envío
        const value = 'ENVIO ELIMINADO'
        let sent =  await payModel.updateStatus(getById.id_payment, value)

    }else{
      message= result
      status = 'error'
    }

    return res.status(200).send({
      message: message,
      status: status,
    });
  },



  delete: async  (req, res) => {
    const payRepo = new paymentRepo();
    const payModel = new paymentModel( payRepo);
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


    let result = await payModel.delete(id);
    let message;
    let status ='success';
    result == 'success' ? message ='Pago eliminado' : message= result

    result != 'success' ? status = 'error' : status

    return res.status(200).send({
      message: message,
      status: status,
    });
  },




  
};



let validateCart =  async  (carrito) =>{
    let status ='success'
    let message = 'Datos validos.'

    

    
    let _VS = new validService()

    let validcar = _VS.validParam(carrito)
    
    //Todo: Validamos que venga carrito.
    if(!validcar){
        return {
            status: 'error',
            message: 'Carrito no valido. (1)',
            result:''
        };
    }

    //Todo: validamos items
    let items = carrito.items;

    let validitems = _VS.validParam(carrito)

    if(!validitems){
        return {
            status: 'error',
            message: 'Carrito no valido. (2)',
            result:''
        };
    }

    let producto
    let stock;

  


    //Todo: Validar productos.
    for(var i =0; i<items.length; i++){

        let validate = await validateItem(items[i].item) //* validar todas las variables dentro del item */

        if(validate.status =='error'){

            return {
                status: validate.status,
                message: validate.message,
                result:''
             };
        }

        let response =await getProducto(items[i].item.id) //* buscar el producto. */

        if(response.status == 'error'){
            return {
                status: 'error',
                message: 'Producto no valido.',
                result:''
            };
        }

        producto = response.result

       //* Validar stock
        let resStock = await getStock(items[i].item.id)

        if(resStock.status =='error'){
            return {
            status: 'error',
            message: 'No se encontro stock para el producto.',
            result: resStock
            };
        }

        let stock = resStock.result
        let disponibles = parseInt(stock) 



       if(items[i].cantidad > disponibles){
           
            return {
                status: 'error',
                message: 'Tienes productos que han superdado el stock.',
                result: {producto: items[i], stock: disponibles } 
            };
        }

    
      

    
       
       

        //Todo validamos el precio

        if(items[i].item.price != producto.price){
            return {
                status: 'error',
                message: 'Datos no validos (3)',
                result: ''

            };
        }


        //Todo validamos el subtotal      cantidad x precio.
        
       let subtotal = items[i].item.price * items[i].cantidad
       subtotal =  subtotal 

     

       if(subtotal != items[i].subtotal){
        return {
            status: 'error',
            message: 'Datos no validos (4)',
            result: ''
        };
       }

    }


  

    //* TODO correcto con los items del carrito.

     //* Validar cliente 
    
     let cliente  = carrito.cliente
     let validcli = _VS.validParam(cliente)
     //! validar cliente.
     if(!validcli){
         return {
             status: 'error',
             message: 'Datos no validos (  10)',
             result: ''
         };
     }

   
     //Todo: Validar cupones  
   
     let cupon = carrito.cupon

    
     if(cupon == undefined || cupon == null ){
         return {
             status: 'error',
             message: 'Datos no validos (  10)',
             result: ''
         };
     }
   
     //* verificar si vienen cupones agregados al array de cupon y aplicarlos.



       // TODO: obtener el descuento por cupones.
       let descupon = carrito.descupon

       let validdesc = _VS.validNum(descupon)

       if(!validdesc){ //cupon == ''
         return {
             status: 'error',
             message: 'Datos no validos (11)',
             result: ''
         };
       }

    
       let cuponescar = carrito.cupon
       if(cuponescar == undefined || cuponescar == null ){
           return {
               status: 'error',
               message: '10.Datos no validos.',
               result: result
           };
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
        return {
            status: 'error',
            message: 'Cupones expirados / no validos.',
            result: resCuponesError
        };
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
       /*if(carrito.envio==99 || carrito.envio==0){
        totalenvio =carrito.envio
       }else{
        totalenvio =150
       }*/
       
    }

    totaldesc =  Math.round( totaldesc *100)/100;   //redondear 
 
    if(totaldesc != carrito.descupon ){
        return {
            status: 'error',
            message: 'Datos no validos (10)',
            result: ''
        };
    }


    if(totalenvio != carrito.envio ){
        return {
            status: 'error',
            message: 'Datos no validos (150)',
            result: ''
        };
    }



    
    //Todo: Validar subtotal 

    let subtotal = carrito.subtotal
    
    if(subtotal ==0 || subtotal == undefined || subtotal == null || subtotal ==''){
        return {
            status: 'error',
            message: 'Datos no validos (5)',
            result: ''
        };
    }

    let calcsubtotal=0;

    for(var i=0; i<items.length; i++){
        calcsubtotal =  calcsubtotal + items[i].subtotal
    }
    calcsubtotal =  Math.round( calcsubtotal *100)/100;  //redondear

    if(calcsubtotal != subtotal){
        return {
            status: 'error',
            message: 'Datos no validos (6)',
            result: ''
        };
    }


    if(carrito.envio == undefined || carrito.envio == null ){
        return {
            status: 'error',
            message: 'Datos no validos (7)',
            result: ''
        };
    }

   
    let total = (carrito.subtotal - carrito.descupon) + carrito.envio;
    total =   Math.round(total *100)/100;
   
    
    if(carrito.total == undefined || carrito.total ==null || carrito.total <0){
        return {
            status: 'error',
            message: 'Datos no validos (8)',
            result: ''
        };
    }
    
    
    if(carrito.total != total){
        return {
            status: 'error',
            message: 'Datos no validos (9)',
            result: ''
        };
    }


   
    return {
        status: status,
        message: message,
        result:''
     };

}

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

      let validcus = _VS.validEmail(cliente);
 
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
        model =`El carrito contiene productos que no estan disponibles actualmente.  [ ${result.name} ] `
      }else{
        model ={
            "id": result.id,
            "id_category": result.id_category,
            "category_name": result.category_name,
            "descrp": result.descrp,
            "url": result.url,
            "name": result.name,
            "status": result.status,
            "image": result.image,
            "price": result.price,
            "code": result.code,
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

let getPaymentByID = async (id) => {
   
        const payRepo = new paymentRepo();
        const payModel = new paymentModel( payRepo);

        const shipRepo = new shipmentRepo();
        const shipModel = new shipmentModel( shipRepo);

        const itemRepo = new productRepo();
        const modelItem = new productModel( itemRepo);
      
        const validate = new validService()
        
        let result =''
        //! Validar role.
        //si es admin puede consultar todos , si es cliente solo puede consultar si es sullo.

         id = parseInt(id);
    
       
        let validID = validate.validNum(id)
        if(!validID){
              return {
                status: 'error',
                message: 'Tipo de dato no valido.',
                result
              };
        }
    
    
        result = await payModel.getById(id);
     
       
        let status='success';
        let message='Pago encontrado.'

        if(result != 'No se encontraron coincidencias.' && result != 'error' ){

               let decode = ''
               try {
                decode = JWTdecode.decode(result.receipt)
               } catch (error) {
                decode = error.message
               }
               let coupons = await payModel.getPaymentCoupons(id)
               let billing = await payModel.getPaymentBilling(id)
               let detail = await payModel.getPaymentDetail(id)

               let payment_shipment = await shipModel.getByPayment(id)

               if(payment_shipment.id){
                    let decodeJson = ''
                    try {
                    decodeJson = JWTdecode.decode(payment_shipment.json_shipment_res)
                    } catch (error) {
                    decodeJson = error.message
                    }
    
                    let decodeJson2 = ''
                    try {
                    decodeJson2 = JWTdecode.decode(payment_shipment.json_label_res)
                    } catch (error) {
                    decodeJson2 = error.message
                    }

                    //* buscar shipment y label por sus id's
                    const token = apk
                    const headers = { "Content-Type": "application/json",
                                        'Authorization': `Token token=${token}` };

                      let getLabelByID =''
                      if(decodeJson2?.data?.id){
                        try{
                  
                          getLabelByID = await axios.get(`${url}v1/labels/${decodeJson2.data.id}`, {headers});
                          if(getLabelByID?.data?.data) getLabelByID = getLabelByID.data.data
                          
                        }catch (error){
                          //console.log(error.message)
                          getLabelByID =error.message
                        }
                      }

                      let getShipmentByID =''
                      if(decodeJson?.data?.id){
                        try{
                  
                          getShipmentByID = await axios.get(`${url}v1/shipments/${decodeJson.data.id}`, {headers});
                          if(getShipmentByID?.data?.data) getShipmentByID = getShipmentByID.data.data
                          
                        }catch (error){
                          //console.log(error.message)
                          getShipmentByID =error.message
                        }
                      }

                    const data = {
                      ...payment_shipment,
                     "json_shipment_res": decodeJson,
                     "json_label_res": decodeJson2,
                     "getLabelByID":getLabelByID,
                     "getShipmentByID":getShipmentByID
                    }

                    payment_shipment = data
               }
              
              


               
                
                let productos=[]
               
                for (const item of detail) {
                    const data = await modelItem.findById(item.id_item)
                    productos.push({...item,data})
                }
                
                var decodecarrier = dec.decode(result.carrier)
              !decodecarrier.provider ? decodecarrier ='Ninguna' :decodecarrier
               
               const obj = {
                "id": result.id,
                "status": result.status,
                "pay_num": result.pay_num,
                "method": result.method,
                "order_id": result.order_id,
                "customer_id": result.customer_id,
                "subtotal": result.subtotal,
                "envio": result.envio,
                "descupon": result.descupon,
                "total": result.total,
                "tracking_number": result.tracking_number,
                "shipping_option": result.shipping_option,
                "carrier": decodecarrier,
                "id_user": result.id_user,
                "name": result.name,
                "lastname": result.lastname,
                "email": result.email,
                "phone": result.phone,
                "address": result.address,
                "country": result.country,
                "state": result.state,
                "city": result.city,
                "postal_code": result.postal_code,
                "notes": result.notes,
                "created_at": result.created_at,
                "updated_at": result.updated_at,
               }
               


                 let model = {
                    ...obj,
                    "billing":billing,
                    "detail":productos,
                    "coupons":coupons,
                    "payment_shipment":payment_shipment,
                    "receipt": decode
                }
                 



                 result = model

            
         
        }else{
            status = 'error'
            message = result
        }
         
        return {
          status: status,
          message: message,
          result: result
        };
    
}

module.exports = controller;

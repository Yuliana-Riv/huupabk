"use strict"
var userModel =require( "./model");
var usersRepo = require("./repo");

var ncrypt = require("../../services/ncrypt/index")

var bcrypt = require('bcrypt');
var fs = require("fs");
var path = require('path')


var dayjs = require('dayjs')

const webp=require('webp-converter');

let validService = require("../../services/validator/validateParams")

var SendEmail = require('../../services/nodemailer/sendEmail')

var nodemailer = require("../../services/nodemailer/emailContact")



const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
    let users = await _model.getAll();
    let status ='success'


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


   
     if(users !='No se encontraron coincidencias.'){
      let cvtUsers = []

        if(payload.role == 'legrafica'){
            for(var i=0; i<users.length; i++){

          
          
              let model ={
                id: users[i].id,
                name: users[i].name,
                lastname: users[i].lastname,
               
                email: users[i].email,
                phone: users[i].phone,
                role: users[i].role, 
                image: users[i].image
            }
      
            cvtUsers.push(model);
          
          }
        }else{
          for(var i=0; i<users.length; i++){
            if(users[i].role !='legrafica'){
              let model ={
                id: users[i].id,
                name: users[i].name,
                lastname: users[i].lastname,
               
                email: users[i].email,
                phone: users[i].phone,
                role: users[i].role, 
                image: users[i].image
              }
        
              cvtUsers.push(model);
            }

        
        }
        }

        cvtUsers.length==0? cvtUsers ='No se encontraron coincidencias.': cvtUsers
  
        return res.status(200).send({
          message: "Usuarios.",
          status:status,
          result: cvtUsers
        });
      
     }else{
       status='error'
        return res.status(200).send({
          message: "No se encontraron coincidencias.",
          result: users,
          status:status
        });
     }
    
  },

  getById: async  (req, res) => {
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
    let id = parseInt(req.params.id);
    let users = await _model.getById(id);
    let cvtUser={};
    let status;
    let message='Usuario encontrado.'

    let payload = req.user
    const validate = new validService()
    let validRole = validate.validRole(payload.role)

    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
       
      });
    }

    if(!validRole){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
      
      });
    }
   


    if(users != 'No se encontraron coincidencias.'){
      cvtUser ={
        id: users.id,
        name: users.name,
        lastname: users.lastname,
        email: users.email,
        phone: users.phone,
        role: users.role, 
        image: users.image
      }
      status = 'success'
    }else{
      status = 'error'
      message = users
      cvtUser = users
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: cvtUser
    });
  },

  search: async  (req, res) => {
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
    let search = req.params.search;
    let users = await _model.search(search);
    
   
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
   


    let cvtUsers = []
    let status;
    let message='Se han encontrado coincidencias.'

    if(users != 'No se encontraron coincidencias.'){


          if(payload.role == 'legrafica'){
            for(var i=0; i<users.length; i++){

          
          
              let model ={
                id: users[i].id,
                name: users[i].name,
                lastname: users[i].lastname,
               
                email: users[i].email,
                phone: users[i].phone,
                role: users[i].role, 
                image: users[i].image
            }
      
            cvtUsers.push(model);
          
          }
        }else{
          for(var i=0; i<users.length; i++){
            if(users[i].role !='legrafica'){
              let model ={
                id: users[i].id,
                name: users[i].name,
                lastname: users[i].lastname,
               
                email: users[i].email,
                phone: users[i].phone,
                role: users[i].role, 
                image: users[i].image
              }
        
              cvtUsers.push(model);
            }

        
          }
        }

        cvtUsers.length == 0? cvtUsers = 'No se encontraron coincidencias.' : cvtUsers
      
      status = 'success'
    }else{
      status = 'error'
      message = users
      cvtUsers = users
   
    }

   
     
    return res.status(200).send({
      status: status,
      message:message,
      result: cvtUsers,
      
    });
  },

  delete: async  (req, res) => {
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
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

    let users = await _model.getById(id);
    if(users == 'error' || users =='No se encontraron coincidencias.'){
      return res.status(200).send({
        status: 'error',
        message: 'Usuario no valido.',
      });
    }


    let result = await _model.delete(id);
    let message;
    let status ='success';
    
    if(result =='success'){
      message ='Usuario eliminado'

      let img = users.image
      if( img != '' && img != null && img != undefined){
        let splitimg = img.split('.')
        let nimg = splitimg[0]
        nimg = nimg+'.webp'
    
        //let filePath2 = 'uploads\\users\\'+nimg
          let filePath2 = 'uploads/users/'+nimg   //! linux
        fs.unlink(filePath2, (err) => {/* console.log(err)*/})
    
       // let filePath = 'uploads\\users\\'+img
        let filePath = 'uploads/users/'+img  //! linux
        fs.unlink(filePath, (err) => {/* console.log(err)*/})
      }
 
     
    }else{
      status = 'error'
      message= result
    }

    return res.status(200).send({
      message: message,
      status: status,
    });
  },

  create: async (req, res) => {
    
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
    let {name , lastname, role, email, phone, password} = req.body
    let payload = req.user

  
    let status ='success';
    let message ='Usuario creado con exito.'
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
    let validLN = validate.validParam(lastname)
    let validEmail = validate.validEmail(email)
    let validPass = validate.validPass(password)
    let validPhone = validate.validPhone(phone)
    let validRole = validate.validRole(role)

    if(!validName || !validLN || !validRole){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    if(!validEmail ){
      return res.status(200).send({
        status: 'error',
        message: 'Email no valido.',
        result:result
      });
    }

    if(!validPhone ){
      return res.status(200).send({
        status: 'error',
        message: 'Teléfono no valido.',
        result:result
      });
    }

    if(!validPass ){
      return res.status(200).send({
        status: 'error',
        message: 'Contraseña no valida (8 ctrs min.).',
        result:result
      });
    }

    

    // Todo correcto
      bcrypt.hash(password, 10, async function(err, hash) {
      if(err) {
        console.error(err)
      }

       role = role.toLowerCase();

      let user={
        name:name,
        lastname: lastname,
        pass: hash,
        email: email,
        role: role, 
        phone: phone
      }

       result = await _model.create(user);
       let added ='_'
   
      if(result != 'success'){
        status='error'
        message=result
      }else{
          added = await _model.last()
          let js ={
            "id": added.id,
            "name":  added.name,
            "lastname":  added.lastname,
            "email":  added.email,
            "phone":  added.phone,
            "role":  added.role, 
            "image":  added.image,
          }

          added = js
      }

      
      
      return res.status(200).send({
          message:message,
          status:status,
          result:result,
          added:added,
          //payload
      });
  });
  

  },


  create2: async (req, res) => {
    
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
    let {name , lastname, role, email, password} = req.body
    /*let payload = req.user*/

    let status ='success';
    let message ='Usuario creado con exito.'
    let result =''

    const validate = new validService()
   
    let validName = validate.validParam(name)
    let validLN = validate.validParam(lastname)
    let validEmail = validate.validEmail(email)
    let validPass = validate.validPass(password) 
    let validRole = validate.validRole(role)

    if(!validName || !validLN || !validRole){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }

    if(!validEmail ){
      return res.status(200).send({
        status: 'error',
        message: 'Email no valido.',
        result:result
      });
    } 


    if(!validPass ){
      return res.status(200).send({
        status: 'error',
        message: 'Contraseña no valida (8 ctrs min.).',
        result:result
      });
    }

    

    // Todo correcto
      bcrypt.hash(password, 10, async function(err, hash) {
      if(err) {
        console.error(err)
      }

       role = role.toLowerCase();

      let user={
        name:name,
        lastname: lastname,
        pass: hash,
        email: email,
        role: role,  
      }



       result = await _model.create(user);
       let added ='_'
   
      if(result != 'success'){
        status='error'
        message=result
      }else{
          added = await _model.last()
          let js ={
            "id": added.id,
            "name":  added.name,
            "lastname":  added.lastname,
            "email":  added.email, 
            "role":  added.role, 
            "image":  added.image,
          }

          let maildata={
            "email":  added.email,
            "name":  added.name,
            "lastname":  added.lastname,
            "password":password
          }
          console.log(maildata)
          added = js
          /**/
          const mail = new nodemailer(maildata)
          mail.userCreated
      }

      
      
      return res.status(200).send({
          message:message,
          status:status,
          result:result,
          added:added,
          //payload
      });
  });
  

  },
  update: async(req, res) =>{
    const _repo = new usersRepo();
    const _model = new userModel( _repo);

    let {id, name , lastname, role,  email, phone, password}  = req.body

    let message='Usuario actualizado con exito.'
    let result =''


    const validate = new validService()

    let payload = req.user
    let validRole = validate.validRole(payload.role)


    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    if(!validRole){
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

    let getById = await _model.getById2(id);

    if(payload.role != 'legrafica' &&  getById.role =='legrafica'){
      return res.status(200).send({
        status: 'error',
        message: 'Acción no valida.',
        result:result
      });
    }
    //validar datos
    if(getById == 'No se encontraron coincidencias.'){
      return res.status(200).send({
        status: 'error',
        message: 'Usuario no encontrado.',
        result:result
      });
    }

    let validName = validate.validParam(name)
    //let validLN = validate.validParam(lastname)
    let validEmail = validate.validEmail(email)
    let validPass = validate.validPass(password)
    //let validPhone = validate.validPhone(phone)
   // let validRole = validate.validRole(role)


    !validPass ? password = getById.pass : password 
    !validName ? name = getById.name : name 
    //!validLN ? lastname = getById.lastname : lastname 
    !validEmail ? email = getById.email : email 
    //!validRole ? role = getById.role : role
    //!validPhone ? phone = getById.phone : phone 


    role = role.toLowerCase();
   
      if(validPass){

        bcrypt.hash(password, 10, async function(err, hash) {
          if(err) {
            console.error(err)
          }
           id = parseInt(id);

          let user={
            id: id,
            name: name,
            lastname: lastname,
            pass: hash,
            email: email,
            role: role, 
            phone: phone
          }
          console.log(user)
  
          result = await _model.update(user);

          let status ='success';
          if(result != 'success'){
            status='error'
            message =result
          }
         
          return res.status(200).send({
              message:message,
              status:status
             
          });
      });

      }else{


        let user={
          id: id,
          name: name,
          lastname: lastname,
          pass: password,
          email: email,
          role: role, 
          phone: phone
        }
       
        result = await _model.update(user);
        let status ='success';
        if(result != 'success'){
          status='error'
          message =result
        }
        return res.status(200).send({
            message:message,
            status:status
        });

      }
  

      
  },

  valSession: async (req,res) =>{
    const _repo = new usersRepo();
    const _model = new userModel( _repo);

    let payload = req.user
    if(payload == undefined || payload ==''){
      return res.status(200).send({
        status: 'error',
        message: 'Faltan datos.',
        result:result
      });
    }

    const validate = new validService()

    let validAdm = validate.validRole(payload.role);

    if(!validAdm){
      return res.status(200).send({
        status: 'error',
        message: 'Datos no validos.',
        result:result
      });
    }
 
    
    let {id, id_user, type, code} = req.body
    
    let validid = validate.validNum(id)
    let validid_user = validate.validNum(id_user)
    let validtype = validate.validRole(type)
    let validcode = validate.validParam(code)


    if(!validid || !validid_user || !validtype || !validcode ){
      return res.status(200).send({
        status:'error',
        message:'Datos no validos.',
        result:'',
      });
    }

    let result = await _model.getSession(id)

 
    if(result =='error'){
      return res.status(200).send({
        status:'error',
        message:'Session no valida.',
        result:'',
      });
    }
    id_user = parseInt(id_user)

    if(result.id_user == id_user && result.type == type && result.code ==code ){
      return res.status(200).send({
        status:'success',
        message:'Session validada',
        result:result,
      });
    }else{
      return res.status(200).send({
        status:'error',
        message:'Session no validada',
        result:'',
      });
    }


   

  },

  getData: async(req, res) =>{  
    let status ='success';
    let message ='usuario valido';
    let result = "";

    let data = req.body.data;

    if(data == null || data == undefined || data ==''){

      return res.status(200).send({
        status:'error',
        message:'Datos no validos.',
        result:result,
      });
    }

    try{
      const ncryptData = new ncrypt();

      result = ncryptData._decryptData(data)

      if(result.exp == undefined || result.exp =='' || result.exp == null){ // verificamos que exista el parametro exp.
        return res.status(200).send({
          status:'error',
          message:'Token no valido.',
          result:'',
        });
      }

      if(result.exp <=  dayjs().format()){ // validamos la expiración del token.
         status='error'
         message='Token expirado.'
         result=''
      }

    }catch(err){  // puede que el token no sea valido (este creado con otra llave) capturamos el error.
      status ='error'
      message= err.message
    }

    return res.status(200).send({
      status:status,
      message:message,
      result:result,
     
    });
  },

  
  
  cotizar: async  (req, res) => {
    let {name,
      email,
      phone,
      whatsapp,
      date,
      people,
      eventtype,
      address,
      note} = req.body
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

    if(phone == undefined || phone =='' || phone == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo telefono no es valido.'
     });
    }


    if(date == undefined || date =='' || date == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo fecha no es valido.'
     });
    }


    if(people == undefined || people =='' || people == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo número no es valido.'
     });
    }

    if(eventtype== undefined || eventtype =='' || eventtype == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo evento no es valido.'
     });
    }
    if(address== undefined || address =='' || address == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo dirección no es valido.'
     });
    }
    if(note== undefined || note =='' || note == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo notas no es valido.'
     });
    }
    let data = { 
      "email":email, 
      "name":name,
      "phone": phone,
      "whatsapp": whatsapp,
      "date": date,
      "people": people,
      "eventtype": eventtype,
      "address": address,
      "note": note,
    }

    const mail = new nodemailer(data)
  
    mail.cotizar
    
    return res.status(200).send({
       status: status,
       message:message,
       data
    });
},

  
  contacto: async  (req, res) => {
    let {name, email, mensaje} = req.body
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

    if(mensaje == undefined || mensaje =='' || mensaje == null){
      return res.status(200).send({
        status: 'error',
        message: 'El campo nombre no es valido.'
     });
    }


    let data = {
      "mensaje":mensaje, 
      "email":email, 
      "name":name
    }

    const mail = new nodemailer(data)
  
    mail.contacto
    mail.contactoUser
    
    return res.status(200).send({
       status: status,
       message:message,
       data
    });
},
  
  login: async (req, res) => {
    let result ='';
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
   
    //recoger parametros
    var params = req.body;
    if(params.email == undefined || params.password == undefined){
      return res.status(200).send({
        status:'error',
        message: "Datos no validos",
        result:result
      });
    }

    const validate = new validService()
    
    //validar datos
    var validEmail= validate.validEmail(params.email)
    var validPass = validate.validPass(params.password)

    if (!validPass || !validEmail) {
      return res.status(200).send({
        status:'error',
        message: "Credenciales incorrectas.",
        result:result
      });
    }


    




    let user = await _model.getByEmail(params.email);
    
    if (user.email) {
     
      let userPass = String(user.pass);
      let paramsPass = String(params.password);

      //comparar passwords
      bcrypt.compare( paramsPass, userPass, async function(err, result) {
        // result == true
        if(err) {
          console.error(err)
        }

        if(!result){
          return res.status(200).send({
            status: "error",
            message: "Credenciales incorrectas.",
            result:result
          });
        }

        //generar el codigo de auth
        var ctrs = "abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRTUVWXYZ123456789";
        var code = "";
        for (var k = 0; k < 6; k++) {
          code += ctrs.charAt(Math.floor(Math.random() * ctrs.length));
        }
        code ='legrafica22'

      

        //Enviar email con el codigo de auth
         if(user.role =='Admin' || user.role =='admin' || user.role =='legrafica' || user.role =='Legrafica'){
          const sendEmail = new SendEmail({user:user, code: code});

          sendEmail.code; 
          console.log('correo enviado')
        }

       
        let session = await _model.createSession(user.id, code, user.role)
        if(!session?.insertId){
          return res.status(200).send({
            status: "error",
            message: "Login no valido.",
            result:result
          });
        }

       
        
        const ncryptData = new ncrypt();
        const token = ncryptData._createToken(user, session.insertId)

       
        return res.status(200).send({
          status: "success",
          message:'Login valido',
          result: token,
          //user
        });

      });


    } else {
      
      return res.status(200).send({
        status: "error",
        message: "Credenciales incorrectas.",
        result:result,
      });
      
     
    }


  },

  reenviarCodigo: async(req,res) =>{
    const _repo = new usersRepo();
    const _model = new userModel( _repo);


      let {email, name, code} = req.body

     

      let user ={
        email:email,
        name:name
      }

      let result = await _model.getSession(code)
      
      if(result =='error'){
        return res.status(200).send({
          status: "error",
          message: "Sesión no valida, vuelva a iniciar sesión.",
         
        });
      }
      if(!result.code){
        return res.status(200).send({
          status: "error",
          message: "Sesión no valida, vuelva a iniciar sesión.",
         
        });
      }

    


      const sendEmail = new SendEmail({user:user, code: result.code});

      if(email==undefined || email==null || email==''){
        return res.status(200).send({
          status: "error",
          message: "1.Faltan datos.",
         
        });
      }

      if(name==undefined || name==null || name==''){
        return res.status(200).send({
          status: "error",
          message: "2.Faltan datos.",
         
        });
      }

      if(code==undefined || code==null || code==''){
        return res.status(200).send({
          status: "error",
          message: "3.Faltan datos.",
         
        });
      }

      sendEmail.code; 
      console.log('correo enviado')

      return res.status(200).send({
        status: "success",
        message:'Login valido',
        result: {email:email, nombre:name},
      });
  },

  createAuth: async(req,res ) =>{
    const ncryptData = new ncrypt();
    let result =  ncryptData._createAuth()

    return res.status(200).send({
      status: "success",
      message:'Auth valido',
      result:  result
    });
  },

  getAuth: async(req,res ) =>{

    let token  = req.body.token
    if(token==undefined || token==null || token==''){
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
        result: null,
       
      });
    }

    
    const ncryptData = new ncrypt();

    let result = ncryptData._decryptData(token)
    return res.status(200).send({
      status: "success",
      message:'Auth valido',
      result:  result
    });

  },



  uploadImage: async(req,res ) =>{
    const _repo = new usersRepo();
    const _model = new userModel( _repo);
    
        let id = req.params.id;
        let fileName = 'Imagen no subida';
        if(id== undefined || id==null || id == '' || isNaN(id)){
          return res.status(200).send({
            status: 'error',
            message: 'Datos no validos.',
          
          });
        }
        let users = await _model.getById(id);

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


        if(req.files){
          let filePath = req.files.image.path
          let fileSplit= filePath.split('/');
          fileName = fileSplit[2];
          let extSplit = fileName.split('\.')
          let fileExt = extSplit[1];
          fileExt = fileExt.toLowerCase();

          if(fileExt=='png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt =='gif'){
            let result = await _model.updateImage({image:fileName, id:id})


            if(result=='success'){
              if(users != 'error' && users != 'No se encontraron coincidencias.'){
                let img = users.image
                 if(img != undefined && img != ''){
                  let splitimg = img.split('.')
                  let nimg = splitimg[0]
                  nimg = nimg+'.webp'
  
                  //let filePath2 = 'uploads\\users\\'+nimg
                     let filePath2 = 'uploads/users/'+nimg   //! linux
                  fs.unlink(filePath2, (err) => {/* console.log(err)*/})
  
                  //let filePath = 'uploads\\users\\'+users.image
                   let filePath = 'uploads/users/'+img   //! linux
                  fs.unlink(filePath, (err) => {/* console.log(err)*/})
                 }
               }
            }else{
              let img = fileName
              let splitimg = img.split('.')
              let nimg = splitimg[0]
              nimg = nimg+'.webp'

                //let filePath2 = 'uploads\\users\\'+nimg
                 let filePath2 = 'uploads/users/'+nimg   //! linux
              fs.unlink(filePath2, (err) => {/* console.log(err)*/})

              //let filePath = 'uploads\\users\\'+img
               let filePath = 'uploads/users/'+img   //! linux
              fs.unlink(filePath, (err) => {/* console.log(err)*/})
            }
         
            return res.status(200).send({
              status: "success",
              message: "Imagen actualizada",
              file: req.files,
              result: result
            });
          }else{
            fs.unlink(filePath, (err) =>{
              return res.status(200).send({
                status: "error",
                message: "Extensión no valida"
              });
            })
          }
 
        }else{
          return res.status(200).send({
            status: "error",
            message: fileName
          });
        }
        

  },

  getImageFile: function(req,res){
      let image = req.params.image;
      if(image == undefined || image== null || image == ''){
        return  res.status(200).send({message:'No existe la imagen', status:'error'});
      }
  
  
       
      let splitimg = image.split('.')
      let ext = splitimg[1]
  
      let path_image = './uploads/users/'+image;
  
      if(ext == 'webp'){
        fs.access(path_image, fs.constants.F_OK,(err)=>{
          if(err){
              //buscarla como jpg
              let imagejpg = `${splitimg[0]}.jpg`
              let path_image2 = './uploads/users/'+imagejpg;
              fs.access(path_image2, fs.constants.F_OK,(err)=>{
                if(err){
                   //buscarla como png
                    let imagepng = `${splitimg[0]}.png`
                    let path_image2 = './uploads/users/'+imagepng;
                    fs.access(path_image2, fs.constants.F_OK,(err)=>{
                      if(err){
                         //buscarla como jpeg
                         let imagejpeg = `${splitimg[0]}.jpeg`
                         let path_image2 = './uploads/users/'+imagejpeg;
                         fs.access(path_image2, fs.constants.F_OK,(err)=>{
                           if(err){
                               return  res.status(200).send({message:'No existe la imagen', status:'error'});
                           }else{
                                 //convertir a webp
                                 let imagewebp = `${splitimg[0]}.webp`
                               
                                 const result3 =  webp.cwebp(`./uploads/users/${imagejpeg}`, `./uploads/users/${imagewebp}`,"-q 80"); 
                                 result3.then((response) => {
                                 
                                   let path_image3 = './uploads/users/'+imagewebp
                                   fs.access(path_image3, fs.constants.F_OK,(err)=>{
                                     if(err){
                                       return  res.status(200).send({message:'No existe la imagen', status:'error'});
                                     }else{
                                       return res.sendFile(path.resolve(path_image));
                                     }
                                   })
                                 });
                           }
                         })
                      }else{
                            //convertir a webp
                            let imagewebp = `${splitimg[0]}.webp`
                          
                            const result3 =  webp.cwebp(`./uploads/users/${imagepng}`, `./uploads/users/${imagewebp}`,"-q 80"); 
                            result3.then((response) => {
                            
                              let path_image3 = './uploads/users/'+imagewebp
                              fs.access(path_image3, fs.constants.F_OK,(err)=>{
                                if(err){
                                  return  res.status(200).send({message:'No existe la imagen', status:'error'});
                                }else{
                                  return res.sendFile(path.resolve(path_image));
                                }
                              })
                            });
                      }
                    })
  
  
                }else{
                      //convertir a webp
                      let imagewebp = `${splitimg[0]}.webp`
                     
                      const result3 =  webp.cwebp(`./uploads/users/${imagejpg}`, `./uploads/users/${imagewebp}`,"-q 80"); 
                      result3.then((response) => {
                       
                        let path_image3 = './uploads/users/'+imagewebp
                        fs.access(path_image3, fs.constants.F_OK,(err)=>{
                          if(err){
                            return  res.status(200).send({message:'No existe la imagen', status:'error'});
                          }else{
                            return res.sendFile(path.resolve(path_image));
                          }
                        })
                      });
                      
                
  
  
                }
              })
  
  
  
  
          }else{
            return res.sendFile(path.resolve(path_image));
          }
        })
      }else{
        fs.access(path_image, fs.constants.F_OK,(err)=>{
          if(err){
            return  res.status(200).send({message:'No existe la imagen', status:'error'});
          }else{
            return res.sendFile(path.resolve(path_image));
          }
        })
      }
  },

  getPublicImageFile: function(req,res){
    let image = req.params.image;
    if(image == undefined || image== null || image == ''){
      return  res.status(200).send({message:'No existe la imagen', status:'error'});
    }


     
    let splitimg = image.split('.')
    let ext = splitimg[1]

    let path_image = './uploads/images/'+image;

    if(ext == 'webp'){
      fs.access(path_image, fs.constants.F_OK,(err)=>{
        if(err){
            //buscarla como jpg
            let imagejpg = `${splitimg[0]}.jpg`
            let path_image2 = './uploads/images/'+imagejpg;
            fs.access(path_image2, fs.constants.F_OK,(err)=>{
              if(err){
                 //buscarla como png
                  let imagepng = `${splitimg[0]}.png`
                  let path_image2 = './uploads/images/'+imagepng;
                  fs.access(path_image2, fs.constants.F_OK,(err)=>{
                    if(err){
                       //buscarla como jpeg
                       let imagejpeg = `${splitimg[0]}.jpeg`
                       let path_image2 = './uploads/images/'+imagejpeg;
                       fs.access(path_image2, fs.constants.F_OK,(err)=>{
                         if(err){
                             return  res.status(200).send({message:'No existe la images', status:'error'});
                         }else{
                               //convertir a webp
                               let imagewebp = `${splitimg[0]}.webp`
                             
                               const result3 =  webp.cwebp(`./uploads/images/${imagejpeg}`, `./uploads/images/${imagewebp}`,"-q 80"); 
                               result3.then((response) => {
                               
                                 let path_image3 = './uploads/images/'+imagewebp
                                 fs.access(path_image3, fs.constants.F_OK,(err)=>{
                                   if(err){
                                     return  res.status(200).send({message:'No existe la images', status:'error'});
                                   }else{
                                     return res.sendFile(path.resolve(path_image));
                                   }
                                 })
                               });
                         }
                       })
                    }else{
                          //convertir a webp
                          let imagewebp = `${splitimg[0]}.webp`
                        
                          const result3 =  webp.cwebp(`./uploads/images/${imagepng}`, `./uploads/images/${imagewebp}`,"-q 80"); 
                          result3.then((response) => {
                          
                            let path_image3 = './uploads/images/'+imagewebp
                            fs.access(path_image3, fs.constants.F_OK,(err)=>{
                              if(err){
                                return  res.status(200).send({message:'No existe la images', status:'error'});
                              }else{
                                return res.sendFile(path.resolve(path_image));
                              }
                            })
                          });
                    }
                  })


              }else{
                    //convertir a webp
                    let imagewebp = `${splitimg[0]}.webp`
                   
                    const result3 =  webp.cwebp(`./uploads/image/${imagejpg}`, `./uploads/image/${imagewebp}`,"-q 80"); 
                    result3.then((response) => {
                     
                      let path_image3 = './uploads/image/'+imagewebp
                      fs.access(path_image3, fs.constants.F_OK,(err)=>{
                        if(err){
                          return  res.status(200).send({message:'No existe la imagen', status:'error'});
                        }else{
                          return res.sendFile(path.resolve(path_image));
                        }
                      })
                    });
                    
              


              }
            })




        }else{
          return res.sendFile(path.resolve(path_image));
        }
      })
    }else{
      fs.access(path_image, fs.constants.F_OK,(err)=>{
        if(err){
          return  res.status(200).send({message:'No existe la imagen', status:'error'});
        }else{
          return res.sendFile(path.resolve(path_image));
        }
      })
    }
},



};








module.exports = controller;

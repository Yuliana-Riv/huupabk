"use strict"
var colaboradoresModel =require( "./model");
var colaboradoresRepo = require("./repo");

var dec = require("../../services/jwt/decode");//../services/jwt/decode
var enc  = require("../../services/jwt/encode");

var fs = require("fs");
var path = require('path')
var dayjs = require('dayjs')

const webp=require('webp-converter');

let validService = require("../../services/validator/validateParams")



const controller = {
 
  getAll: async  (req, res) => {
    const _repo = new colaboradoresRepo();
    const _model = new colaboradoresModel( _repo);
    let colaboradores = await _model.getAll();
    let status ='success'
    let message ='Colaboradores'


    

   
     if(colaboradores !='No se encontraron coincidencias.' && colaboradores  !='error'){
        status ='success'
        let array  =[]
        for(const colaborador of colaboradores){
          
            let about = dec.decode(colaborador.about)
           
            let model = {
               
                    "id": colaborador.id,
                    "image": colaborador.image,
                    "name": colaborador.name,
                    "url": colaborador.url,
                    "descrp": colaborador.descrp,
                    "about": about,
                    "facebook": colaborador.facebook,
                    "instagram": colaborador.instagram,
                    "twiter": colaborador.twiter,
                    "linkedin": colaborador.linkedin,
                    "email": colaborador.email,
                    "created_at": colaborador.created_at,
                    "updated_at": colaborador.updated_at
                 
            }
            array.push(model)
        }

        colaboradores = array
      
     }else{
       status='error'
       message = colaboradores
     }

     return res.status(200).send({
        message: message,
        result: colaboradores,
        status:status
      });
    
  },

  getById: async  (req, res) => {
    const _repo = new colaboradoresRepo();
    const _model = new colaboradoresModel( _repo);
    let id = parseInt(req.params.id);

    const validate = new validService()
    let validid = validate.validNum(id)

    if(!validid){
      return res.status(200).send({
        status:'error',
        message: 'Dato no valido.',
      });
    }



    let colaboradores = await _model.getById(id);
    
    let status;
    let message='Colaborador encontrado.'

    
   


    if(colaboradores != 'No se encontraron coincidencias.' && colaboradores != 'error'){
      let about = dec.decode(colaboradores.about)
        let model = {
               
            "id": colaboradores.id,
            "image": colaboradores.image,
            "name": colaboradores.name,
            "url": colaboradores.url,
            "descrp": colaboradores.descrp,
            "about":about,
            "facebook": colaboradores.facebook,
            "instagram": colaboradores.instagram,
            "twiter": colaboradores.twiter,
            "linkedin": colaboradores.linkedin,
            "email": colaboradores.email,
            "created_at": colaboradores.created_at,
            "updated_at": colaboradores.updated_at
         
      }
      colaboradores = model


      status = 'success'
    }else{
      status = 'error'
      message = colaboradores
     
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: colaboradores
    });
  },

  getByUrl: async  (req, res) => {
    const _repo = new colaboradoresRepo();
    const _model = new colaboradoresModel( _repo);
    let url =req.params.id;

    const validate = new validService()
    let validurl = validate.validParam(url)

    if(!validurl){
      return res.status(200).send({
        status:'error',
        message: 'url no valida',
      });
    }


    let colaboradores = await _model.getByUrl(url);
    
    let status;
    let message='Colaborador encontrado.'

    
   


    if(colaboradores != 'No se encontraron coincidencias.' && colaboradores != 'error'){
      let about = dec.decode(colaboradores.about)
      
        let model = {
               
            "id": colaboradores.id,
            "image": colaboradores.image,
            "name": colaboradores.name,
            "url": colaboradores.url,
            "descrp": colaboradores.descrp,
            "about":about,
            "facebook": colaboradores.facebook,
            "instagram": colaboradores.instagram,
            "twiter": colaboradores.twiter,
            "linkedin": colaboradores.linkedin,
            "email": colaboradores.email,
            "created_at": colaboradores.created_at,
            "updated_at": colaboradores.updated_at
         
      }
      colaboradores = model


      status = 'success'
    }else{
      status = 'error'
      message = colaboradores
     
    }
     
    return res.status(200).send({
      status: status,
      message: message,
      result: colaboradores
    });
  },

  search: async  (req, res) => {
    const _repo = new colaboradoresRepo();
    const _model = new colaboradoresModel( _repo);
    let search = req.params.search;
    let colaboradores = await _model.search(search);
    
   
   


    let status;
    let message='Se han encontrado coincidencias.'

    if(colaboradores != 'No se encontraron coincidencias.' && colaboradores != 'error'){
      status = 'success'
      let array  =[]
        for(const colaborador of colaboradores){
          let about = dec.decode(colaborador.about)
            let model = {
               
                    "id": colaborador.id,
                    "image": colaborador.image,
                    "name": colaborador.name,
                    "url": colaborador.url,
                    "descrp": colaborador.descrp,
                    "about": about,
                    "facebook": colaborador.facebook,
                    "instagram": colaborador.instagram,
                    "twiter": colaborador.twiter,
                    "linkedin": colaborador.linkedin,
                    "email": colaborador.email,
                    "created_at": colaborador.created_at,
                    "updated_at": colaborador.updated_at
                 
            }
            array.push(model)
        }

        colaboradores = array


    }else{
      status = 'error'
      message = colaboradores
    
   
    }

   
     
    return res.status(200).send({
      status: status,
      message:message,
      result: colaboradores,
      
    });
  },

  delete: async  (req, res) => {
    const _repo = new colaboradoresRepo();
    const _model = new colaboradoresModel( _repo);
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

    let colaboradores = await _model.getById(id);
    if(colaboradores == 'error' || colaboradores =='No se encontraron coincidencias.'){
      return res.status(200).send({
        status: 'error',
        message: 'Colaborador no valido.',
      });
    }


    let result = await _model.delete(id);
    let message;
    let status ='success';
    
    if(result =='success'){
      message ='Colaborador eliminado'

      let img = colaboradores.image
      if( img != '' && img != null && img != undefined){
        let splitimg = img.split('.')
        let nimg = splitimg[0]
        nimg = nimg+'.webp'
    
        //let filePath2 = 'uploads\\colaboradores\\'+nimg
         let filePath2 = 'uploads/colaboradores/'+nimg   //! linux
        fs.unlink(filePath2, (err) => {/* console.log(err)*/})
    
        //let filePath = 'uploads\\colaboradores\\'+img
         let filePath = 'uploads/colaboradores/'+img  //! linux
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
    
    const _repo = new colaboradoresRepo();
    const _model = new colaboradoresModel( _repo);
    let {name , descrp, about, facebook, instagram, twiter, linkedin, email} = req.body
    let payload = req.user

  
    let status ='success';
    let message ='Colaborador creado con exito.'
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
    let validdescrp = validate.validParam(descrp)
    let validabout = validate.validParam(about)
   

    if(!validName  || !validabout || !validdescrp ){ 
      return res.status(200).send({
        status: 'error',
        message: 'Datos incompletos.',
        result:result
      });
    }

    let str = name
    let ss =  str.replace(/[\u0300-\u036f-\s]/g, "-"); 
    let url = ss.replace(/[^A-Za-z0-9]+/g,"-")

    about = enc.encode(about)
   
    
    let data={
        name ,url, descrp, about, facebook, instagram, twiter, linkedin, email
      }

       result = await _model.create(data);
       let added ='_'
   
      if(result != 'success'){
        status='error'
        message=result
      }else{
          added = await _model.last()
       
          let decabout = dec.decode(added.about)
          let model = {
                 
              "id": added.id,
              "image": added.image,
              "name": added.name,
              "url": added.url,
              "descrp": added.descrp,
              "about":decabout,
              "facebook": added.facebook,
              "instagram": added.instagram,
              "twiter": added.twiter,
              "linkedin": added.linkedin,
              "email": added.email,
              "created_at": added.created_at,
              "updated_at": added.updated_at
           
        }
        added = model
        
      }

      
      
      return res.status(200).send({
          message:message,
          status:status,
          result:result,
          added:added,
      });
    


  },

  update: async(req, res) =>{
    const _repo = new colaboradoresRepo();
    const _model = new colaboradoresModel( _repo);

    let {id, name , descrp, about, facebook, instagram, twiter, linkedin, email}  = req.body
    console.log(req.body)
    

    let message='Colaborador actualizado con exito.'
    let result =''


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
        message: 'Colaborador no encontrado.',
        result:result
      });
    }

    let validName = validate.validParam(name)
    let validdescrp = validate.validParam(descrp)
    let validabout = validate.validParam(about)
    let validfacebook = validate.validParam(facebook)
    let validinstagram = validate.validParam(instagram)
    let validtwiter = validate.validParam(twiter)
    let validlinkedin = validate.validParam(linkedin)
    let validemail = validate.validParam(email)
    


    !validName ? name = getById.name : name 
    !validdescrp ? descrp = getById.descrp : descrp 
    !validabout ? about = getById.about : about 
    !validfacebook ? facebook = getById.facebook : facebook 
    !validinstagram ? instagram = getById.instagram : instagram 
    !validtwiter ? twiter = getById.twiter : twiter 
    !validlinkedin ? linkedin = getById.linkedin : linkedin 
    !validemail ? email = getById.email : email 

    if(validabout){
      about = enc.encode(about)
    }

    id = parseInt(id);

    //* url 
    let cambionombre = false;
    let url = getById.url
    name != getById.name ? cambionombre= true: cambionombre

    if(cambionombre){ // si cambio el nombre generamos la url nueva.
      
      let str = name
      let ss =  str.replace(/[\u0300-\u036f-\s]/g, "-"); 
      url = ss.replace(/[^A-Za-z0-9]+/g,"-")
    }

    let data={
        id, name , url, descrp, about, facebook, instagram, twiter, linkedin, email
    }
    

    result = await _model.update(data);

    let status ='success';
    if(result != 'success'){
      status='error'
      message =result
    }
   
    return res.status(200).send({
        message:message,
        status:status
       
    });

   
   
  

      
  },

  uploadImage: async(req,res ) =>{
    const _repo = new colaboradoresRepo();
    const _model = new colaboradoresModel( _repo);
    
        let id = req.params.id;
        let fileName = 'Imagen no subida';
        if(id== undefined || id==null || id == '' || isNaN(id)){
          return res.status(200).send({
            status: 'error',
            message: 'Datos no validos.',
          
          });
        }
        let colaboradores = await _model.getById(id);

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
          let fileSplit= filePath.split('\\');/*** / or \\ */
          fileName = fileSplit[2];
          let extSplit = fileName.split('\.')
          let fileExt = extSplit[1];
          fileExt = fileExt.toLowerCase();

          if(fileExt=='png' || fileExt =='jpg' || fileExt =='jpeg' || fileExt =='gif'){
            let result = await _model.updateImage({image:fileName, id:id})


            if(result=='success'){
              if(colaboradores != 'error' && colaboradores != 'No se encontraron coincidencias.'){
                let img = colaboradores.image
                 if(img != undefined && img != ''){
                  let splitimg = img.split('.')
                  let nimg = splitimg[0]
                  nimg = nimg+'.webp'
  
                  //let filePath2 = 'uploads\\colaboradores\\'+nimg
                     let filePath2 = 'uploads/colaboradores/'+nimg   //! linux
                  fs.unlink(filePath2, (err) => {/* console.log(err)*/})
  
                  //let filePath = 'uploads\\colaboradores\\'+colaboradores.image
                   let filePath = 'uploads/colaboradores/'+img   //! linux
                  fs.unlink(filePath, (err) => {/* console.log(err)*/})
                 }
               }
            }else{
              let img = fileName
              let splitimg = img.split('.')
              let nimg = splitimg[0]
              nimg = nimg+'.webp'

                //let filePath2 = 'uploads\\colaboradores\\'+nimg
                 let filePath2 = 'uploads/colaboradores/'+nimg   //! linux
              fs.unlink(filePath2, (err) => {/* console.log(err)*/})

              //let filePath = 'uploads\\colaboradores\\'+img
               let filePath = 'uploads/colaboradores/'+img   //! linux
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
  
      let path_image = './uploads/colaboradores/'+image;
  
      if(ext == 'webp'){
        fs.access(path_image, fs.constants.F_OK,(err)=>{
          if(err){
              //buscarla como jpg
              let imagejpg = `${splitimg[0]}.jpg`
              let path_image2 = './uploads/colaboradores/'+imagejpg;
              fs.access(path_image2, fs.constants.F_OK,(err)=>{
                if(err){
                   //buscarla como png
                    let imagepng = `${splitimg[0]}.png`
                    let path_image2 = './uploads/colaboradores/'+imagepng;
                    fs.access(path_image2, fs.constants.F_OK,(err)=>{
                      if(err){
                         //buscarla como jpeg
                         let imagejpeg = `${splitimg[0]}.jpeg`
                         let path_image2 = './uploads/colaboradores/'+imagejpeg;
                         fs.access(path_image2, fs.constants.F_OK,(err)=>{
                           if(err){
                               return  res.status(200).send({message:'No existe la imagen', status:'error'});
                           }else{
                                 //convertir a webp
                                 let imagewebp = `${splitimg[0]}.webp`
                               
                                 const result3 =  webp.cwebp(`./uploads/colaboradores/${imagejpeg}`, `./uploads/colaboradores/${imagewebp}`,"-q 80"); 
                                 result3.then((response) => {
                                 
                                   let path_image3 = './uploads/colaboradores/'+imagewebp
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
                          
                            const result3 =  webp.cwebp(`./uploads/colaboradores/${imagepng}`, `./uploads/colaboradores/${imagewebp}`,"-q 80"); 
                            result3.then((response) => {
                            
                              let path_image3 = './uploads/colaboradores/'+imagewebp
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
                     
                      const result3 =  webp.cwebp(`./uploads/colaboradores/${imagejpg}`, `./uploads/colaboradores/${imagewebp}`,"-q 80"); 
                      result3.then((response) => {
                       
                        let path_image3 = './uploads/colaboradores/'+imagewebp
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

"use strict"


let validService = require("../../services/validator/validateParams")

const axios = require('axios')

//const apk = 'komuxJIzjPgrJUmQkQxutopTqJ3F96oo47IZE6vrnist' //demo
//const url = 'https://api-demo.skydropx.com/' //pruebas

const apk = '2F6QVLxQ8zdHn6rOY75PtFbppElfVPFTWuQCuQ2tcgQt' //live
const url = 'https://api.skydropx.com/'


const controller = {
 
/** 
 *  Carriers
 *  Get a list of carriers
 *   Returns the available carriers from the user account
 *
 *   HTTP Request
 *   GET https://api.skydropx.com/v1/carriers
*/
  getCarriers: async  (req, res) => {
    let result =[]
    let message ='Lista de paqueterías.'
    let status ='success'

    const token = apk
    const headers = { "Content-Type": "application/json",
                        'Authorization': `Token token=${token}` };
     try{

       const   response = await axios.get(`${url}v1/carriers`, {headers});
        if(response?.data?.data) result = response.data.data
       
      }catch (error){
        console.log(error.message)
        message = 'Ha ocurrido un error al intentar obtener las paqueterías.'
        status = 'error'
      }
   
   

     return res.status(200).send({
        status,
        message,
        result,
        
     });



    
  },

  /** 
 *  Consignment Note Categories
 *  Index of categories of products established by SAT and demanded for the consignment note
 *
 *   HTTP Request
 *   GET https://api.skydropx.com/v1/consignment_notes/categories
 * 
*/
getConsignmentNoteCategories: async  (req, res) => {
  let result =[]
  let message ='Lista de Categorías de notas de consignación.'
  let status ='success'

  const token = apk
  const headers = { "Content-Type": "application/json",
                      'Authorization': `Token token=${token}` };
   try{

     const   response = await axios.get(`${url}v1/consignment_notes/categories`, {headers});
      if(response?.data?.data){ 
       
        result = response.data.data
       /* const data = result
        let array =[]
        for (const categoria of data) {
          const CATEGORY_ID = categoria.id
          const  response2 = await axios.get(`${url}v1/consignment_notes/categories/${CATEGORY_ID}/subcategories`, {headers});
        
          
          if (response2?.data?.data){
            array.push({
              ...categoria,
              subcategorias:response2.data.data
            })
          }else{
            array.push({
              ...categoria,
              subcategorias:[]
            })
          }  
         
          
        }

        result = array*/
      
      }
     
    }catch (error){
      console.log(error.message)
      message = 'Ha ocurrido un error al intentar obtener las categorías.'
      status = 'error'
    }
 
 

   return res.status(200).send({
      status,
      message,
      result,
      
   });



  
},

 /** 
 *  Consignment Note Subcategories
 *   Index of subcategories of products established by SAT and demanded for the consignment note filter by Category
 *
 *   HTTP Request
 *   GET https://api.skydropx.com/v1/consignment_notes/categories/CATEGORY_ID/subcategories
 * 
 * @param {int} CATEGORY_ID
 * @returns  A list that contains all consignment note subcategories.
*/
getConsignmentNoteSubcategories: async  (req, res) => {
  let result =[]
  let message ='Lista de Subcategorías de la carta de porte.'
  let status ='success'

  const {CATEGORY_ID}  =  req.params //TODO  obtener ID
  if(!CATEGORY_ID){
    return res.status(200).send({
      status:'error',
      message:'Formato no valido.',
      result:[]
   });
  }

  const token = apk
  const headers = { "Content-Type": "application/json",
                      'Authorization': `Token token=${token}` };
   try{

     const   response = await axios.get(`${url}v1/consignment_notes/categories/${CATEGORY_ID}/subcategories`, {headers});
      if(response?.data?.data) result = response.data.data
     
    }catch (error){
      console.log(error.message)
      message = 'Ha ocurrido un error al intentar obtener las subcategorías.'
      status = 'error'
    }
 
 

   return res.status(200).send({
      status,
      message,
      result,
      
   });
  },


  /** 
 *  Consignment Note Classes
 *   Index of classes of products established by SAT and demanded for the consignment note filter by Subcategory. The code attribute is needed to create a shipment.
 *
 *   HTTP Request
 *   GET https://api.skydropx.com/v1/consignment_notes/subcategories/SUBCATEGORY_ID/classes
 * 
 * @param {int} SUBCATEGORY_ID
 * @returns  A list that contains all consignment note classes.
*/
getConsignmentNoteClasses: async  (req, res) => {
  let result =[]
  let message ='Lista de Clases de notas de consignación.'
  let status ='success'

  const {SUBCATEGORY_ID} =  req.params  //TODO  obtener ID
  if(!SUBCATEGORY_ID){
    return res.status(200).send({
      status:'error',
      message:'Formato no valido.',
      result:[]
   });
  }

  const token = apk
  const headers = { "Content-Type": "application/json",
                      'Authorization': `Token token=${token}` };
   try{

     const   response = await axios.get(`${url}v1/consignment_notes/subcategories/${SUBCATEGORY_ID}/classes`, {headers});
      if(response?.data?.data) result = response.data.data
     
    }catch (error){
      console.log(error.message)
      message = 'Ha ocurrido un error al intentar obtener las clases.'
      status = 'error'
    }
 
 

   return res.status(200).send({
      status,
      message,
      result,
      
   });



  
},

 /** 
 *  Consignment Note Packagings
 *  Index of packagings established by SAT and demanded for the consignment note. The code attribute is needed to create a shipment.
 *
 *   HTTP Request
 *   GET https://api.skydropx.com/v1/consignment_notes/packagings
 * 
*/
getConsignmentNotePackagings: async  (req, res) => {
  let result =[]
  let message ='Lista de Embalajes de la carta de porte.'
  let status ='success'

  const token = apk
  const headers = { "Content-Type": "application/json",
                      'Authorization': `Token token=${token}` };
   try{

     const   response = await axios.get(`${url}v1/consignment_notes/packagings`, {headers});
      if(response?.data?.data) result = response.data.data
     
    }catch (error){
      console.log(error.message)
      message = 'Ha ocurrido un error al intentar obtener los embalajes.'
      status = 'error'
    }
 
 

   return res.status(200).send({
      status,
      message,
      result,
      
   });



  
},

   /**
    * Quotations
    * Get a Quotation
    * This endpoint receives zip codes and parcel measures. It returns a list that contains all Rates found.
    *
    * HTTP Request
    * POST https://api.skydropx.com/v1/quotations
    * 
    * 
    * @param {String} zip_from .......... Zip code of origin.
    * @param {String} zip_to ............ Zip code of destination.
    * @param {Object} parcel ............ Used to specify the measures and total Parcel weight.
    * @param {Integer} weight ........... Weight of Parcel, must be in KG. peso
    * @param {Integer} height ........... Height of Parcel, must be in CM. altura
    * @param {Integer} width ............ Width of Parcel, must be in CM. ancho
    * @param {Integer} length ........... Length of Parcel, must be in CM. longitud
    * @param {Array} carriers ........... (optional) Quote with specific carriers
    * 
    * 
    * @returns A list that contains all Rates found.
    * 
    * more info:https://docs.skydropx.com/#quotations
    */
  getQuotations: async  (req, res) => {

    const example_data = {
    "zip_from": "83190", 
    "zip_to": "85338", 
    "parcel": { 
        "weight": "1", 
        "height": "10",
        "width": "10", 
        "length": "10" 
    }, 
   // "carriers": [ { "name": "DHL" },  { "name": "Fedex" } ] 
    }


    let result =[]
    let message ='Lista de cotizaciones.'
    let status ='success'

    const token = apk
    const headers = { "Content-Type": "application/json",
                        'Authorization': `Token token=${token}` };
     try{

       const   response = await axios.post(`${url}v1/quotations`,example_data, {headers});
         result = response.data
       
      }catch (error){
        console.log(error.message)
        message = 'Ha ocurrido un error al intentar obtener las cotizaciones.'
        status = 'error'
      }
   
   

     return res.status(200).send({
        status,
        message,
        result,
        
     });



    
  },

  /**
   * Create a Shipment
   * This endpoint creates a Shipment.
   *
   * HTTP Request
   * POST https://api.skydropx.com/v1/shipments
   * Description
   * The field contents under address_to object is used to indicate the description of package contents.
   * 
   * @param {string} contents description of package contents.
   *
   * @returns  a Shipment.
   */
  createShipment: async  (req, res) => {

    const example_data = {
      "address_from": {
        "province": "Ciudad de México",
        "city": "Azcapotzalco",
        "name": "Jose Fernando",
        "zip": "02900",
        "country": "MX",
        "address1": "Av. Principal #234",
        "company": "skydropx",
        "address2": "Centro",
        "phone": "5555555555",
        "email": "skydropx@email.com"
      },
      "parcels": [
        {
          "weight": 3,
          "distance_unit": "CM",
          "mass_unit": "KG",
          "height": 10,
          "width": 10,
          "length": 10
        }
      ],
      "address_to": {
        "province": "Jalisco",
        "city": "Guadalajara",
        "name": "Jorge Fernández",
        "zip": "44100",
        "country": "MX",
        "address1": " Av. Lázaro Cárdenas #234",
        "company": "-",
        "address2": "Americana",
        "phone": "5555555555",
        "email": "ejemplo@skydropx.com",
        "reference": "Frente a tienda de abarro",
        "contents": "packete de prueba"
      },
      "consignment_note_class_code": "53131600",
      "consignment_note_packaging_code": "1H1",
     /* "carriers": [
       
        {
          "name": "Fedex"
        }
      ]*/
    }

 
    let result =[]
    let message ='Envío creado.'
    let status ='success'

    const token = apk //demo
    const headers = { "Content-Type": "application/json",
                        'Authorization': `Token token=${token}` };
     try{
      
       const   response = await axios.post(`${url}v1/shipments`,example_data, {headers});
         result = response.data
       
      }catch (error){
        console.log(error.message)
        message = 'Ha ocurrido un error al intentar crear el envío.'
        status = 'error'
      }
   
   

     return res.status(200).send({
        status,
        message,
        result,
        
     });



    
  },


  /**
  * Shipments
  * Get All Shipments
  * This endpoint retrieves all Shipments.

  * HTTP Request
  * GET https://api.skydropx.com/v1/shipments
  * 
  * Query Parameters
  * @param {Integer} page default is 1
  * Number of page.

  * @param {Integer} per_page,default is 20
  * Quantity of records per page.
  * 
  * @returns  all Shipments
*/

 getAllShipments: async  (req, res) => {
  let result = []
  let message = 'Lista de envíos.'
  let status = 'success'

  const token = apk
  const headers = { "Content-Type": "application/json",
                      'Authorization': `Token token=${token}` };
   try{

     const   response = await axios.get(`${url}v1/shipments`, {headers});
      if(response?.data?.data) result = response.data
     
    }catch (error){
      console.log(error.message)
      message = 'Ha ocurrido un error al intentar obtener los envíos.'
      status = 'error'
    }
 
 

   return res.status(200).send({
      status,
      message,
      result,
      
   });

},

/**
 * Get a Specific Shipment
 * This endpoint retrieves a specific Shipment.

 * HTTP Request
 * GET https://api.skydropx.com/v1/shipments/ID
 * URL Parameters
 * @param {Integer} ID
 * The ID of the Shipment to retrieve.
 * 
 * @returns a specific Shipment.
 */

 getShipmentByID: async  (req, res) => {
  let result = []
  let message = 'Lista de envíos.'
  let status = 'success'

  const {ID} = req.params

  const token = apk
  const headers = { "Content-Type": "application/json",
                      'Authorization': `Token token=${token}` };
   try{

     const   response = await axios.get(`${url}v1/shipments/${ID}`, {headers});
      if(response?.data?.data) result = response.data.data
     
    }catch (error){
      console.log(error.message)
      message = 'Ha ocurrido un error al intentar obtener el envío.'
      status = 'error'
    }
 
 

   return res.status(200).send({
      status,
      message,
      result,
      
   });

},

  /** 
   * Labels
   * Get all labels
   * This endpoint retrieves all Labels.

  * HTTP Request
  * GET https://api.skydropx.com/v1/labels
  * 
  * @QueryParameters
  * 
  * 
  * @param {Integer} page , default is 1
  * Number of page.

  * @param {Integer} per_page , default is 20
  * Quantity of records per page.
  */
  getLabels: async  (req, res) => {
    let result =[]
    let message ='Lista de labels.'
    let status ='success'

    const token = apk
    const headers = { "Content-Type": "application/json",
                        'Authorization': `Token token=${token}` };
    try{

      const   response = await axios.get(`${url}v1/labels`, {headers});
        if(response?.data?.data) result = response.data.data
      
      }catch (error){
        console.log(error.message)
        message = 'Ha ocurrido un error al intentar obtener las labels.'
        status = 'error'
      }
  
  

    return res.status(200).send({
        status,
        message,
        result,
        
    });
    
  },

  /**
 * Get a Specific Label
This endpoint retrieves a specific Label.

 * HTTP Request
 * GET https://api.skydropx.com/v1/labels/ID
 * URL Parameters
 * @param {Integer} ID
 * TThe ID of the Label to retrieve.
 * 
 * @returns  a specific Label.
 */

 getLabelByID: async  (req, res) => {
  let result = []
  let message = 'Label.'
  let status = 'success'

  const {ID} = req.params

  const token = apk
  const headers = { "Content-Type": "application/json",
                      'Authorization': `Token token=${token}` };
   try{

     const   response = await axios.get(`${url}v1/labels/${ID}`, {headers});
      if(response?.data?.data) result = response.data.data
     
    }catch (error){
      console.log(error.message)
      message = 'Ha ocurrido un error al intentar obtener la label.'
      status = 'error'
    }
 
 

   return res.status(200).send({
      status,
      message,
      result,
      
   });

},

 /**
    * Create a label
    * This endpoint creates a Label.
    *
    * HTTP Request
    * POST https://api.skydropx.com/v1/labels
    * 
    * @param {int} rate_id .
    *
    * @returns  a Label.
   */
  createLabel: async  (req, res) => {

    const example_data = { "rate_id": 568334, "label_format": "pdf" }

 
    let result =[]
    let message ='Envío creado.'
    let status ='success'

    const token = apk //demo
    const headers = { "Content-Type": "application/json",
                        'Authorization': `Token token=${token}` };
     try{
      
       const   response = await axios.post(`${url}v1/labels`,example_data, {headers});
         result = response.data
       
      }catch (error){
        console.log(error.message)
        message = 'Ha ocurrido un error al intentar crear la label.'
        status = 'error'
      }
   
   

     return res.status(200).send({
        status,
        message,
        result,
        
     });



    
  },

  /**
    * Cancel Label Request
    * Create a Cancel Label Request
      This endpoint creates a Cancel Label Request.
    *
    * HTTP Request
    * POST https://api.skydropx.com/v1/cancel_label_requests
    * 
    * @param {int} tracking_number .
    * @param {string} reason
    *
    * @returns  a Label.
   */
   cancelLabel: async  (req, res) => {

    const example_data = { "tracking_number": 'XXXXXXXXXX', "reason": "Datos de dirección erróneos." }

 
    let result =[]
    let message ='Envío creado.'
    let status ='success'

    const token = apk //demo
    const headers = { "Content-Type": "application/json", 
                        'Authorization': `Token token=${token}` };
     try{
      
       const   response = await axios.post(`${url}v1/labels`,example_data, {headers});
         result = response.data
       
      }catch (error){
        console.log(error.message)
        message = 'Ha ocurrido un error al intentar crear la label.'
        status = 'error'
      }
   
   

     return res.status(200).send({
        status,
        message,
        result,
        
     });



    
  },


 /** 
   * Get All Cancel Label Request
This endpoint retrieves all Cancel Label Requests.

  * HTTP Request
  * GET https://api.skydropx.com/v1/cancel_label_requests
  * 
  * @QueryParameters
  * 
  * 
  * @param {String} status Status status="reviewing|rejected|approved".

  * @param {String} date Date date="2020-11-13".
  */
  getCanceledLabels: async  (req, res) => {
    let result =[]
    let message ='Lista de labels canceladas.'
    let status ='success'

    const token = apk
    const headers = { "Content-Type": "application/json",
                        'Authorization': `Token token=${token}` };
    try{

      const   response = await axios.get(`${url}v1/cancel_label_requests?status=reviewing|rejected|approved`, {headers});
        if(response?.data?.data) result = response.data.data
      
      }catch (error){
        console.log(error.message)
        message = 'Ha ocurrido un error al intentar obtener las labels canceladas.'
        status = 'error'
      }
  
  

    return res.status(200).send({
        status,
        message,
        result,
        
    });
    
  },








 


};


module.exports = controller;


//docs: https://docs.skydropx.com/
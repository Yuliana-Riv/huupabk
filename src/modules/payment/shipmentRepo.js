
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class paymentShipmentRepository {
    async last(){
        let response; 
        
        try {
            const queryString = `SELECT *   FROM payment_shipment   ORDER BY id DESC LIMIT 1`;
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'error'
            }else{
                response = response[0]
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

  
     async getAll() {
        let response; 
       
      
        try {
            const queryString = `SELECT *   FROM payment_shipment   `; 
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response
               
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }
        
        return response
    }


   
    async getById(id) {
     
        let response; 
       
        try {

            const queryString = `SELECT *   FROM payment_shipment   WHERE id = ${id} `;
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0]
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async getByPayment(id) {
     
        let response; 
       
        try {
            
            const queryString = `SELECT *   FROM payment_shipment   WHERE id_payment = ${id} `;
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0]
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    

    

    async delete(id) {
     
        let response; 
       
        try {
                const queryString2 = `SELECT * FROM payment_shipment  WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='Información de envio no encontrado.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar la información.'
        }


      
        try {
            const queryString3 = `DELETE FROM payment_shipment  WHERE id = ${id}`;
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar el envío.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar el envío'
        }

        return response
    }


    async create({id_payment, _class , _packaging , shipment_id, json_shipment_res, descr_class, descr_packaging }) {
        let response; 
        
        try {
            const queryString = `SELECT *   FROM payment_shipment   WHERE id_payment = ${id_payment} `;
            response =  await pool.query(queryString) 
            if(response.length >0) return 'Envío ya registrado';
        } catch(error) {
            console.log(error);
            return  'Error al intentar crear el envío';
        }


       
      
      
        try {
            const queryString2 = `INSERT INTO payment_shipment  (id_payment, _class , _packaging , shipment_id, json_shipment_res, descr_class, descr_packaging) VALUES ( ${id_payment}, '${_class}',  '${_packaging}' ,  '${shipment_id}',  '${json_shipment_res}', '${descr_class}', '${descr_packaging}')`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async updateLabel({id, rate_id, json_label_res, label_id }) {

      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
       
        const queryString3 = `SELECT * FROM payment_shipment  WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro el envío'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }


        const queryString2 = `UPDATE payment_shipment  SET  rate_id = '${rate_id}', json_label_res = '${json_label_res}' , label_id = '${label_id}' , updated_at = '${update}' WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }
    async updateCancelado(id) {

      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
       
        const queryString3 = `SELECT * FROM payment_shipment  WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro el envío'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }


        const queryString2 = `UPDATE payment_shipment  SET  cancelado = 'si', updated_at = '${update}' WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }





   





 


};

module.exports = paymentShipmentRepository;

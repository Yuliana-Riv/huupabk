
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class global_paramsRepository {
    async last(){
        let response; 
        const queryString = `SELECT *   FROM global_params  ORDER BY id DESC LIMIT 1`;
        try {
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
        const queryString = `SELECT *   FROM global_params  `; 
      
        try {
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
        const queryString = `SELECT *   FROM global_params  WHERE id = ${id} `;
        try {
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
        const queryString2 = `SELECT * FROM global_params WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='Información no encontrado.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar la información.'
        }


        const queryString3 = `DELETE FROM global_params WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar la información.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar la información'
        }

        return response
    }


    async create({shipping_price, free_shipping, texto}) {
        let response; 
      
        const queryString2 = `INSERT INTO global_params (shipping_price, free_shipping, texto) VALUES ( ${shipping_price} , ${free_shipping}, '${texto}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update({id, shipping_price, free_shipping, texto}) {

      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
       
        const queryString3 = `SELECT * FROM global_params WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro la información'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

    


        const queryString2 = `UPDATE global_params SET shipping_price = ${shipping_price}, free_shipping = ${free_shipping}, texto = '${texto}', updated_at = '${update}' WHERE id = ${id}`;
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

module.exports = global_paramsRepository;

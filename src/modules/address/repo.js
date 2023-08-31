
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class addressRepository {
    async last(){
        let response; 
        const queryString = `SELECT * FROM address ORDER BY id DESC LIMIT 1`;
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

    async search(value){
        let response; 
        const queryString = `SELECT * FROM address WHERE title LIKE "%${value}%"`; //`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

     async getAll() {
        let response; 
        const queryString = `SELECT * FROM address`; // WHERE  role !='legrafica'`;
      
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
        const queryString = `SELECT id, id_user, title, address, ref, zip, city, state, country FROM address WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0] /*** quitar [0] cuando son varios datos */
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async getByUser(id_user) {
        let response; 
        const queryString = `SELECT * FROM address WHERE id_user = '${id_user}' `;
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

    async delete(id) {

        let response; 
       /* const queryString3 = `DELETE FROM address WHERE id_user = ${id}`;
        try {
                response =  await pool.query(queryString3) 
        } catch(error) {
            console.log(error);
            response = 'error'
        }*/


        const queryString2 = `DELETE FROM address WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'error'
                }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }


    async create(data) {
        let response; 
      
       


        /*
        const queryString3 = `SELECT * FROM address WHERE id_user = '${data.id_user}'`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length > 0){
                response = 'Dirección de usuario ya registrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }*/
        

      
        const queryString2 = `INSERT INTO address (id_user, title, address, ref, zip, city, state, country) 
        VALUES ( '${data.id_user}', '${data.title}',  '${data.address}', '${data.ref}', 
        '${data.zip}', '${data.city}', '${data.state}', '${data.country}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update(data) {
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       console.log(data.id)
        const queryString3 = `SELECT * FROM address WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro el usuario'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }
        
       /* const queryString = `SELECT * FROM address WHERE email = '${data.email}'`;
        try {
            response =  await pool.query(queryString) 
            result = response.length
            if(result >0 && response[0].id != data.id){
               return   response='Email ya registrado'
            }
        } catch(error) {
            console.log(error);
           return response = 'error'
        
        }*/

        const queryString2 = `UPDATE address SET  
        title = '${data.title}' ,  address = '${data.address}' , ref = '${data.ref}' ,
        zip = '${data.zip}' , city = '${data.city}' , 
        state = '${data.state}' , country = '${data.country}' , 
        updated_at = '${update}' WHERE id = ${data.id}`;
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

module.exports = addressRepository;

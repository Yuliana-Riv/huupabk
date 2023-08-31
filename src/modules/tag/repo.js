
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class tagRepository {
    async last(){
        let response; 
        const queryString = `SELECT *   FROM tag  ORDER BY id DESC LIMIT 1`;
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
        const queryString = `SELECT *   FROM tag  WHERE name LIKE "%${value}%"  `; 
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
        const queryString = `SELECT *   FROM tag  `; 
      
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
        const queryString = `SELECT *   FROM tag  WHERE id = ${id} `;
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
        const queryString2 = `SELECT * FROM tag WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='Etiqueta no encontrado.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar la etiqueta.'
        }


        const queryString3 = `DELETE FROM tag WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar la etiqueta.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar la etiqueta'
        }

        return response
    }


    async create(name) {
        let response; 
      


        const queryString3 = `SELECT * FROM tag WHERE name = '${name}'`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length > 0){
                response = 'Nombre ya registrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }
        

      
        const queryString2 = `INSERT INTO tag (name) VALUES ( '${name}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update(id, name) {

      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
       
        const queryString3 = `SELECT * FROM tag WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro la etiqueta'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

       

        const queryString = `SELECT * FROM tag WHERE name = '${name}'`;
        try {
            response =  await pool.query(queryString) 
            result = response.length
            if(result >0 && response[0].id != id){
               return   response='Nombre ya registrado'
            }
        } catch(error) {
            console.log(error);
           return response = 'error'
        
        }

      

       



        const queryString2 = `UPDATE tag SET name = '${name}', updated_at = '${update}' WHERE id = ${id}`;
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

module.exports = tagRepository;

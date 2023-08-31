
'use strict'
var dayjs = require('dayjs');
const pool = require("../../db/appSQLClient");

class atributoRepository {
    async last(){
        let response; 
        
        try {
            const queryString = `SELECT *   FROM atributo  ORDER BY id DESC LIMIT 1`;
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
       
        try {
            const queryString = `SELECT *   FROM atributo  WHERE name LIKE "%${value}%"  `; 
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
       
      
        try {
            const queryString = `SELECT *   FROM atributo  `; 
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
            const queryString = `SELECT *   FROM atributo  WHERE id = ${id} `;
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


    async getAtributoValores(id_atributo) {
        let response =[]; 
        try {
            const queryString = `SELECT *   FROM atributo_valores WHERE id_atributo  = ${id_atributo} `; 
            response =  await pool.query(queryString) 
        } catch(error) {
            console.log(error);
        }
        
        return response
    }

    async create(name) {
        let response; 
      
       
        try {
            const queryString3 = `SELECT * FROM atributo WHERE name = '${name}'`;
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
        

      
       
        try {
            const queryString2 = `INSERT INTO atributo (name) VALUES ( '${name}')`;
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
      
       
       
        try {
            const queryString3 = `SELECT * FROM atributo WHERE id = ${id}`;
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro la atributo.'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

       

       
        try {
            const queryString = `SELECT * FROM atributo WHERE name = '${name}'`;
            response =  await pool.query(queryString) 
            result = response.length
            if(result >0 && response[0].id != id){
               return   response='Nombre ya registrado'
            }
        } catch(error) {
            console.log(error);
           return response = 'error'
        
        }


        try {
            const queryString2 = `UPDATE atributo SET name = '${name}', updated_at = '${update}' WHERE id = ${id}`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }




    async delete(id) {
     
        let response; 
      
        try {
            const queryString2 = `SELECT * FROM atributo WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='Atributo no encontrada.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar la atributo..'
        }

        
       
        try {
            const queryString4 = `DELETE FROM atributo_valores WHERE id_atributo = ${id}`;
            await pool.query(queryString4) 
        } catch(error) {
            console.log(error);
        }


       
        try {
            const queryString3 = `DELETE FROM atributo WHERE id = ${id}`;
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar la atributo..'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar la atributo.'
        }

        return response
    }




    async createValor(id_atributo, valor) {
        let response; 
      

        try {
            const queryString3 = `SELECT * FROM atributo WHERE id = ${id_atributo}`;
            response =  await pool.query(queryString3) 
            if(response.length == 0){
                response = 'Atributo no encontrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }

        
        try {
            const queryString4 = `SELECT * FROM atributo_valores WHERE valor = '${valor}'`;
            response =  await pool.query(queryString4) 
            if(response.length > 0){
                response = 'Valor ya registrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }
        
      
        try {
            const queryString2 = `INSERT INTO atributo_valores (id_atributo, valor) VALUES (${id_atributo}  ,'${valor}')`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }



    async deleteValor(id) {
     
        let response; 
      
        try {
            const queryString2 = `SELECT * FROM atributo_valores WHERE id = ${id}`;
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='Valor no encontrado.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar el registro.'
        }
       
        try {
            const queryString3 = `DELETE FROM atributo_valores WHERE id = ${id}`;
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar el valor.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar el valor'
        }

        return response
    }


   





 


};

module.exports = atributoRepository;

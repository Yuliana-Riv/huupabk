
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class blog_categoriesRepository {
    async last(){
        let response; 
        const queryString = `SELECT *   FROM blog_categories  ORDER BY id DESC LIMIT 1`;
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
        const queryString = `SELECT *   FROM blog_categories  WHERE name LIKE "%${value}%"  `; 
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
        const queryString = `SELECT *   FROM blog_categories  `; 
      
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

   
    async getByBlog(id) {
     
        let response; 
        const queryString = `SELECT bc.id, bc.id_blog, bc.id_category, c.name as 'category_name' FROM blog_categories as bc
        INNER JOIN categories as c on bc.id_category = c.id WHERE bc.id_blog = ${id} `;
        try {
            response =  await pool.query(queryString) 
            if(response.length >0){
                response
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
        const queryString = `SELECT *   FROM blog_categories  WHERE id = ${id} `;
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
        const queryString2 = `SELECT * FROM blog_categories WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='categoría no encontrado.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar la categoría.'
        }


        const queryString3 = `DELETE FROM blog_categories WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar la categoría.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar la categoría'
        }

        return response
    }


    async create(id_blog,id_category) {
        let response; 
      

      
        const queryString2 = `INSERT INTO blog_categories (id_blog, id_category) VALUES ( '${id_blog}', '${id_category}')`;
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
      
       
        const queryString3 = `SELECT * FROM blog_categories WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro la categoría'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

       

        const queryString = `SELECT * FROM blog_categories WHERE name = '${name}'`;
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

      

       



        const queryString2 = `UPDATE blog_categories SET name = '${name}', updated_at = '${update}' WHERE id = ${id}`;
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

module.exports = blog_categoriesRepository;

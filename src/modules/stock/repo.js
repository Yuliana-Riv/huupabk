
'use strict'
var dayjs = require('dayjs');
const pool = require("../../db/appSQLClient");

class product_stockRepository {
    async last(){
        let response; 
        const queryString = `SELECT ps.id, ps.id_product, ps.stock,   DATE_FORMAT(ps.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(ps.updated_at, "%Y-%m-%d") as 'updated_at',  
        p.name as 'producto', p.code as 'codigo_producto' FROM product_stock as ps INNER JOIN product as p ON p.id = ps.id_product  ORDER BY ps.id DESC LIMIT 1`;
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
        const queryString = `SELECT ps.id, ps.id_product, ps.stock,   DATE_FORMAT(ps.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(ps.updated_at, "%Y-%m-%d") as 'updated_at',  
        p.name as 'producto', p.code as 'codigo_producto' FROM product_stock as ps INNER JOIN product as p ON p.id = ps.id_product  WHERE p.name LIKE "%${value}%" ||  p.code LIKE "%${value}%"`; 
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
        const queryString = `SELECT ps.id, ps.id_product, ps.stock,   DATE_FORMAT(ps.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(ps.updated_at, "%Y-%m-%d") as 'updated_at',  
        p.name as 'producto', p.code as 'codigo_producto' FROM product_stock as ps INNER JOIN product as p ON p.id = ps.id_product `; 
      
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
        const queryString = `SELECT ps.id, ps.id_product, ps.stock,   DATE_FORMAT(ps.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(ps.updated_at, "%Y-%m-%d") as 'updated_at',  
        p.name as 'producto', p.code as 'codigo_producto' FROM product_stock as ps INNER JOIN product as p ON p.id = ps.id_product  WHERE ps.id = ${id} `;
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


    async getByProduct(id) {
        let response; 
        const queryString = `SELECT ps.id, ps.id_product, ps.stock,   DATE_FORMAT(ps.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(ps.updated_at, "%Y-%m-%d") as 'updated_at',  
        p.name as 'producto', p.code as 'codigo_producto' FROM product_stock as ps INNER JOIN product as p ON p.id = ps.id_product  WHERE ps.id_product = ${id}`; 
      
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
        const queryString2 = `SELECT * FROM product_stock WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='product_stock no encontrada.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar la product_stock..'
        }


        const queryString3 = `DELETE FROM product_stock WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar la product_stock..'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar la product_stock.'
        }

        return response
    }


    async create(data) {
        let response; 
      


        const queryString3 = `SELECT * FROM product WHERE id = ${data.id_product}`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length == 0){
                response = 'Producto no encontrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }
        

      
        const queryString2 = `INSERT INTO product_stock (id_product, stock) VALUES ( ${data.id_product}, ${data.stock})`;
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
      
       
        const queryString3 = `SELECT * FROM product_stock WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro el stock.'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

       

        const queryString4 = `SELECT * FROM product WHERE id = ${data.id_product}`;
        try {
            response =  await pool.query(queryString4) 
            if(response.length == 0){
                response = 'Producto no encontrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }


        const queryString2 = `UPDATE product_stock SET id_product =  ${data.id_product}, stock = ${data.stock}, updated_at = '${update}' WHERE id = ${data.id}`;
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

module.exports = product_stockRepository;

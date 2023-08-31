'use strict'
var dayjs = require('dayjs');
const pool = require("../../db/appSQLClient");

class productRepository {
    async search(value){
        let response; 
        const queryString = `SELECT pc.id, pc.id_product, p.name as 'product_name',
        pc.id_category, c.name as 'category_name'
        FROM product_category as pc
        INNER JOIN categories as c on pc.id_category = c.id 
        INNER JOIN product as p on pc.id_product = p.id 
        WHERE 
        pc.id LIKE "%${value}%" || 
        p.name LIKE "%${value}%" || 
        c.name LIKE "%${value}%"`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }
    async findAll(){
        let response; 
        const queryString = `SELECT pc.id, pc.id_product, p.name as 'product_name',
        pc.id_category, c.name as 'category_name' 
       FROM product_category as pc
       INNER JOIN categories as c on pc.id_category = c.id 
       INNER JOIN product as p on pc.id_product = p.id ORDER BY pc.id DESC`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }
    async findById(id){
        let response; 
        const queryString = `SELECT pc.id, pc.id_product, p.name as 'product_name',
        pc.id_category, c.name as 'category_name'
        FROM product_category as pc
        INNER JOIN categories as c on pc.id_category = c.id 
        INNER JOIN product as p on pc.id_product = p.id WHERE pc.id = ${id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length >0){
                response = response[0]
            }else if(response.length == 0){
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }
    async findByProduct(id){
        let response; 
        const queryString = `SELECT pc.id, pc.id_product, p.name as 'product_name',
        pc.id_category, c.name as 'category_name'
        FROM product_category as pc
        INNER JOIN categories as c on pc.id_category = c.id 
        INNER JOIN product as p on pc.id_product = p.id WHERE pc.id_product = ${id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }
    async findByCategory(id){
        let response; 
        const queryString = `SELECT pc.id, pc.id_product, p.name as 'product_name',
        pc.id_category, c.name as 'category_name'
        FROM product_category as pc
        INNER JOIN categories as c on pc.id_category = c.id 
        INNER JOIN product as p on pc.id_product = p.id WHERE pc.id_category = ${id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }
    async create(data) {
        let response; 

    

        const queryString4 = `SELECT * FROM categories WHERE id = ${data.id_category}`;
        try {
            response =  await pool.query(queryString4) 
            if(response.length == 0){
                response = 'Categoría no encontrada.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }

        const queryString6 = `SELECT * FROM product WHERE id = ${data.id_product}`;
        try {
            response =  await pool.query(queryString6) 
            if(response.length == 0){
                response = 'Producto no encontrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }


        const queryString2 = `INSERT INTO product_category (id_product, id_category) 
        VALUES ( '${data.id_product}', ${data.id_category})`;
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
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')


        const queryString = `SELECT * FROM product_category WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){

                response = 'Item no encontrado.'
                return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        const queryString4 = `SELECT * FROM categories WHERE id = ${data.id_category}`;
        try {
            response =  await pool.query(queryString4) 
            if(response.length == 0){
                response = 'Categoría no encontrada.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }

        const queryString6 = `SELECT * FROM product WHERE id = ${data.id_product}`;
        try {
            response =  await pool.query(queryString6) 
            if(response.length == 0){
                response = 'Producto no encontrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }

    

        const queryString5 = `UPDATE product_category SET 
        id_product =  ${data.id_product},
        id_category =  ${data.id_category},
         updated_at = '${update}'  WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString5) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       
    
        return response
    }
    async delete(id) {

        let response; 

        const queryString2 = `DELETE FROM product_category WHERE id = ${id}`;
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

};

module.exports = productRepository;

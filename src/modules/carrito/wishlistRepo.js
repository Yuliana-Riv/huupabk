"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class couponRepository {
    async last(){
        let response; 
        const queryString = `SELECT * FROM wishlist ORDER BY id DESC LIMIT 1`;
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

    async findAll(){
        let response; 
        const queryString = `SELECT * FROM wishlist as wl  
        INNER JOIN users as u on wl.id_user = u.id 
        INNER JOIN product as p on wl.id_product = p.id ORDER BY wl.id DESC`;

                                   
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
        const queryString = `SELECT * FROM wishlist as wl  
        INNER JOIN users as u on wl.id_user = u.id 
        INNER JOIN product as p on wl.id_product = p.id 
        WHERE wl.id = ${id} `;

                                   
        try {
            response =  await pool.query(queryString) 

            if(response.length >0){
                response = response[0]
            }else{
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async findByCustomer(id){
        let response; 
        const queryString = `SELECT * FROM wishlist as wl  
        INNER JOIN users as u on wl.id_user = u.id 
        INNER JOIN product as p on wl.id_product = p.id 
        WHERE wl.id_user = ${id} `;

                                   
        try {
            response =  await pool.query(queryString) 

            if(response.length >0){
                response = response
            }else{
                response = 'No se encontraron coincidencias'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    
    async search(value){
        let response; 
        const queryString = `SELECT * FROM wishlist as wl 
        INNER JOIN users as u on wl.id_user = u.id 
        INNER JOIN product as p on wl.id_product = p.id 
         WHERE p.name LIKE "%${value}%"`;
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
        /*let {
            id_product, id_user
         } = data;*/

        let response;


         
        const queryString1 = `SELECT * FROM wishlist WHERE id_product = '${data.id_product}' AND id_user = '${data.id_user}'`;
        try {
            response =  await pool.query(queryString1) 
            if(response.length > 0){
                response = 'Ya agregaste este producto a tu lista de deseos.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'Ha ocurrido un error'
            return response
        }



        const queryString2 = `INSERT INTO wishlist ( 
            id_product, id_user
        ) VALUES ( 
                '${data.id_product}',
                '${data.id_user}'
            )`;
        try {
            response = await pool.query(queryString2);
            
            response = 'success'
        } catch (error) {
            console.log(error);
            response = {"status":"error"};
        }

        return response;
    }


    async delete(id) {
     
        let response; 

        const queryString9 = `SELECT * FROM product WHERE id = ${id} `;

                                   
        try {
            response =  await pool.query(queryString9) 
            if(response.length ==0){
                 return response = 'Producto no encontrado.'
            }
        } catch(error) {
              console.log(error);
             return response = 'error'
        }


        const queryString5 = `DELETE FROM wishlist WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString5) 
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



    


    

    
   
}

module.exports = couponRepository;

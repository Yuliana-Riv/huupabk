'use strict'
var dayjs = require('dayjs');
const pool = require("../../db/appSQLClient");

class productRepository {

    async last(){
        let response; 
        const queryString = `SELECT p.id, p.skd_class, p.skd_class_descrp, p.skd_weight, p.skd_height, p.skd_width, p.skd_length, p.id_category, c.name as 'category_name', p.name, p.descrp, p.url, p.price, p.code, p.image , p.status FROM product as p
        INNER JOIN categories as c on p.id_category = c.id  ORDER BY p.id DESC LIMIT 1`;
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
        const queryString = `SELECT p.id, p.skd_class,  p.skd_class_descrp, p.skd_weight, p.skd_height, p.skd_width, p.skd_length, p.id_category, c.name as 'category_name', p.name, p.descrp, p.url, p.price, p.code, p.image , p.status FROM product as p
        INNER JOIN categories as c on p.id_category = c.id  
        WHERE p.name LIKE "%${value}%" || p.code LIKE "%${value}%" || c.name LIKE "%${value}%"`;
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
        const queryString = `SELECT p.id, p.skd_class, p.skd_class_descrp,  p.skd_weight, p.skd_height, p.skd_width, p.skd_length, p.id_category, c.name as 'category_name', p.name, p.descrp, p.url, p.price, p.code, p.image , p.status FROM product as p
        INNER JOIN categories as c on p.id_category = c.id ORDER BY id DESC`;
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
        const queryString = `SELECT p.id, p.skd_class, p.skd_class_descrp, p.skd_weight, p.skd_height, p.skd_width, p.skd_length, p.id_category, c.name as 'category_name', p.name, p.descrp, p.url, p.price, p.code, p.image , p.status FROM product as p
        INNER JOIN categories as c on p.id_category = c.id WHERE p.id = ${id}`;
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



    async findByUrl(url){
        let response; 
        const queryString = `SELECT p.id, p.skd_class, p.skd_class_descrp, p.skd_weight, p.skd_height, p.skd_width, p.skd_length, p.id_category, c.name as 'category_name', p.name, p.descrp, p.url, p.price, p.code, p.image , p.status FROM product as p
        INNER JOIN categories as c on p.id_category = c.id WHERE p.url = '${url}'`;
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

    async findByCategory(id){
        let response; 
        const queryString = `SELECT p.id, p.skd_class, p.skd_class_descrp, p.skd_weight, p.skd_height, p.skd_width, p.skd_length, p.id_category, c.name as 'category_name', p.name, p.descrp, p.url, p.price, p.code, p.image , p.status FROM product as p
        INNER JOIN categories as c on p.id_category = c.id WHERE p.id_category = ${id}`;
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

    async findByCategoryName(name){
        let response; 
        const queryString = `SELECT p.id, p.skd_class, p.skd_class_descrp,  p.skd_weight, p.skd_height, p.skd_width, p.skd_length, p.id_category, c.name as 'category_name', p.name, p.descrp, p.url, p.price, p.code, p.image , p.status FROM product as p
        INNER JOIN categories as c on p.id_category = c.id WHERE c.name = '${name}'`;
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


    


    async getAttValuesByProd(id_product){
        let response =[]; 
        const queryString = `SELECT  pav.id, pav.id_product, pav.id_atributo_valor , p.name as product_name, av.valor , a.id as id_atributo, a.name as atributo FROM product_atributo_valores as pav
        INNER JOIN product as p ON p.id = pav.id_product 
        INNER JOIN atributo_valores as av ON av.id = pav.id_atributo_valor 
        INNER JOIN atributo as a ON a.id = av.id_atributo WHERE pav.id_product = ${id_product} `;
        try {
            response =  await pool.query(queryString) 
        } catch(error) {
            console.log(error);
        }

        return response
    }
    async getVariantes(id_product){
        let response =[]; 
        const queryString = `SELECT * FROM product_variante WHERE id_product = ${id_product} OR id_variante  = ${id_product}`;
        try {
            response =  await pool.query(queryString) 
        } catch(error) {
            console.log(error);
        }

        return response
    }
    

   

    async createProductAttValue({id_product, id_atributo_valor}){
        let response =''
       
        try {
            const queryString7 = `SELECT * FROM product WHERE id = ${id_product}`;
            response =  await pool.query(queryString7) 
            if(response.length == 0) return 'Producto no encontrado.'
        } catch(error) {
            console.log(error);
            return 'error al buscar el producto.'
        }


        let atributo_valor =''
        try {
            const queryString9 = `SELECT * FROM atributo_valores WHERE id = ${id_atributo_valor}`;
            response =  await pool.query(queryString9) 
            if(response.length == 0) return 'Valor no encontrado.'
            atributo_valor = response[0]
        } catch(error) {
            console.log(error);
            return 'error al buscar el valor.'
        }

        if(!atributo_valor.id_atributo){
            return 'error al buscar el atributo'
        }

        try {
            const queryString502 = `SELECT  pav.id, pav.id_product, pav.id_atributo_valor , p.name as product_name, av.valor , a.id as id_atributo, a.name as atributo FROM product_atributo_valores as pav
            INNER JOIN product as p ON p.id = pav.id_product 
            INNER JOIN atributo_valores as av ON av.id = pav.id_atributo_valor 
            INNER JOIN atributo as a ON a.id = av.id_atributo WHERE pav.id_product = ${id_product} and pav.id_atributo_valor = ${id_atributo_valor}`;
            response =  await pool.query(queryString502) 
            if(response.length > 0) return 'Este valor ya se encuentra agregado al producto.'
        } catch(error) {
            console.log(error);
            return 'error al buscar coincidencias [1].'
        }

       
        try {
            const queryString500 = `SELECT  pav.id, pav.id_product, pav.id_atributo_valor , p.name as product_name, av.valor , a.id as id_atributo, a.name as atributo FROM product_atributo_valores as pav
            INNER JOIN product as p ON p.id = pav.id_product 
            INNER JOIN atributo_valores as av ON av.id = pav.id_atributo_valor 
            INNER JOIN atributo as a ON a.id = av.id_atributo WHERE pav.id_product = ${id_product} and a.id = ${atributo_valor.id_atributo}`;
            response =  await pool.query(queryString500) 
            if(response.length > 0) return 'El producto ya cuenta con un valor asignado para este atributo.'
        } catch(error) {
            console.log(error);
            return 'error al buscar coincidencias [2].'
        }
        
        

        try {
            const queryString2 = `INSERT INTO product_atributo_valores (id_product, id_atributo_valor) VALUES ( ${id_product}, ${id_atributo_valor})`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    
    async createProductVariante({id_product, id_variante}){
        let response =''
       
        try {
            const queryString7 = `SELECT * FROM product WHERE id = ${id_product}`;
            response =  await pool.query(queryString7) 
            if(response.length == 0) return 'Producto no encontrado.'
        } catch(error) {
            console.log(error);
            return 'error al buscar el producto.'
        }

        try {
            const queryString5 = `SELECT * FROM product WHERE id = ${id_variante}`;
            response =  await pool.query(queryString5) 
            if(response.length == 0) return 'Producto no encontrado [2].'
        } catch(error) {
            console.log(error);
            return 'error al buscar el producto [2].'
        }

        if(id_product == id_variante){
            return 'No se puede ser variante del mismo producto'
        }

        try {
            const queryString5 = `SELECT * FROM product_variante WHERE (id_product = ${id_product} and id_variante = ${id_variante}) OR (id_product = ${id_variante} and id_variante = ${id_product})`;
            response =  await pool.query(queryString5) 
            if(response.length > 0) return 'Variante ya registrada.'
        } catch(error) {
            console.log(error);
            return 'error al buscar coincidencias de variantes.'
        }


        try {
            const queryString2 = `INSERT INTO product_variante (id_product, id_variante) VALUES ( ${id_product}, ${id_variante})`;
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async deleteVariante(id) {

        let response; 

        try {
            const queryString76 = `SELECT * FROM product_variante WHERE id = ${id}`;
            response =  await pool.query(queryString76) 
            if(response.length == 0) return 'Variante no encontrada.'
        } catch(error) {
            console.log(error);
            return 'error al buscar la variante.'
        }
        
       
        

        const queryString2 = `DELETE FROM product_variante WHERE id = ${id}`;
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
        const queryString3 = `SELECT * FROM product WHERE code = '${data.code}'`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length > 0){
                    response = 'Código de producto ya registrado.'
                   return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }*/

        const queryString7 = `SELECT * FROM product WHERE url = '${data.url}'`;
        try {
            response =  await pool.query(queryString7) 
            if(response.length > 0){
              
                    response = 'URL de producto ya registrado.'
                    return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
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

        /*const queryString6 = `SELECT * FROM brand WHERE id = ${data.id_brand}`;
        try {
            response =  await pool.query(queryString6) 
            if(response.length == 0){
                response = 'Variante no encontrada.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }*/

     
        const queryString2 = `INSERT INTO product (name,  skd_weight, skd_height, skd_width, skd_length,  image, price, code, descrp, id_category,  url) VALUES ( '${data.name}',  ${data.skd_weight}, ${data.skd_height}, ${data.skd_width}, ${data.skd_length}, '${data.image}', ${data.price}, '${data.code}' , '${data.descrp}', ${data.id_category}, '${data.url}')`;
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


        const queryString = `SELECT * FROM product WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){

                response = 'Producto no encontrado.'
                return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }


        /*
        const queryString3 = `SELECT * FROM product WHERE code = '${data.code}'`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length > 0){
                if( response[0].id != data.id){
                    response = 'Código de producto ya registrado.'
                    return response
                }
               
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }*/

        const queryString7 = `SELECT * FROM product WHERE url = '${data.url}'`;
        try {
            response =  await pool.query(queryString7) 
            if(response.length > 0){
                if( response[0].id != data.id){
                    response = 'URL de producto ya registrado.'
                    return response
                }
               
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
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

        /*const queryString6 = `SELECT * FROM brand WHERE id = ${data.id_brand}`;
        try {
            response =  await pool.query(queryString6) 
            if(response.length == 0){
                response = 'Variante no encontrada.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }*/

      

        const queryString5 = `UPDATE product SET  skd_weight = ${data.skd_weight}, skd_height = ${data.skd_height}, skd_width = ${data.skd_width}, skd_length = ${data.skd_length},   url = '${data.url}', name = '${data.name}', image = '${data.image}', descrp = '${data.descrp}',status ='${data.status_prod}', price =  ${data.price} , id_category =  ${data.id_category}, code = '${data.code}', update_at = '${update}'  WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString5) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       
    
        return response
    }


    async update_skd_class({id,skd_class , skd_class_descrp}) {

      
        let response;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')


        const queryString = `SELECT * FROM product WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){

                response = 'Producto no encontrado.'
                return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }


    
      

        const queryString5 = `UPDATE product SET  skd_class  = '${skd_class }',   skd_class_descrp  = '${skd_class_descrp }',  update_at = '${update}'  WHERE id = ${id}`;
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

        try {
            const queryString76 = `SELECT * FROM product WHERE id = ${id}`;
            response =  await pool.query(queryString76) 
            if(response.length == 0) return 'Producto no encontrado.'
        } catch(error) {
            console.log(error);
            return 'error al buscar el producto.'
        }
        
        try {
            const queryString3 = `DELETE FROM images_product WHERE id_product = ${id}`;
            await pool.query(queryString3) 
        } catch(error) {
            console.log(error);
        }

        try {
            const queryString3 = `DELETE FROM product_variante WHERE id_product = ${id} OR id_variante = ${id}`;
            await pool.query(queryString3) 
        } catch(error) {
            console.log(error);
        }


        try {
            const queryString3 = `DELETE FROM product_atributo_valores WHERE id_product = ${id}`;
            await pool.query(queryString3) 
        } catch(error) {
            console.log(error);
        }
        try {
            const queryString3 = `DELETE FROM product_stock WHERE id_product = ${id}`;
            await pool.query(queryString3) 
        } catch(error) {
            console.log(error);
        }
        try {
            const queryString3 = `DELETE FROM product_category WHERE id_product = ${id}`;
            await pool.query(queryString3) 
        } catch(error) {
            console.log(error);
        }try {
            const queryString3 = `DELETE FROM wishlist WHERE id_product = ${id}`;
            await pool.query(queryString3) 
        } catch(error) {
            console.log(error);
        }
        

        const queryString2 = `DELETE FROM product WHERE id = ${id}`;
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

    async deleteProdAttValor(id) {

        let response; 
       
       
        const queryString6 = `SELECT * FROM product_atributo_valores WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString6) 
            if(response.length == 0) return 'error'
        } catch(error) {
            console.log(error);
            return 'error'
        }

        const queryString2 = `DELETE FROM product_atributo_valores WHERE id = ${id}`;
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


    //Imagenes del producto.
    async findImagesProd(id) {
        let response; 
        const queryString = `SELECT id, id_product, image FROM images_product WHERE id_product = ${id}`;
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

    async findImage(id) {
        let response; 
        const queryString = `SELECT  image FROM images_product WHERE id = ${id}`;
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

    async addImagesProd(id_prod,  image) {
        let response;
        const queryString4 = `SELECT * FROM product WHERE id = ${id_prod}`;
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

        const queryString2 = `INSERT INTO images_product (id_product,  image) VALUES (${id_prod}, '${image}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response

    }

    async deleteImageProd(id) {

        let response; 
        const queryString2 = `DELETE FROM images_product WHERE id = ${id}`;
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

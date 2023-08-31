"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class couponRepository {
    async last(){
        let response; 
        const queryString = `SELECT * FROM coupon ORDER BY id DESC LIMIT 1`;
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
        const queryString = `SELECT * FROM coupon ORDER BY id DESC`;

                                   
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

    async findCouponsPurchase(email, code){
        let response; 
        const queryString = `SELECT * FROM payment_coupons WHERE customer_email = '${email}' and code = '${code}'`;

                                   
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
        const queryString = `SELECT * FROM coupon WHERE id = ${id} `;

                                   
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

    async findByCode(code){
        let response; 
        const queryString = `SELECT * FROM coupon WHERE code = '${code}'`;

                                   
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

    
    async search(value){
        let response; 
        const queryString = `SELECT * FROM coupon WHERE  name LIKE "%${value}%"  || code LIKE "%${value}%" || status LIKE "%${value}%" || type LIKE "%${value}%"`;
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


    async findRCust(id){
        let response; 
        const queryString = `SELECT * FROM coupon_restrictions_customers WHERE id_coupon =${id}`;

                                   
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

    async findRProd(id){
        let response; 
        const queryString = `SELECT * FROM coupon_restrictions_products WHERE id_coupon =${id}`;

                                   
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


    async findRCat(id){
        let response; 
        const queryString = `SELECT * FROM coupon_restrictions_categories WHERE id_coupon =${id}`;

                                   
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


    async create(coupon) {
        let {
            name,
            descrp,
            code,
            cstatus,
            date_a, 
            date_b, 
            freeShipping, 
            totalAvailable,
            totalAvailableCustomer, 
            minAmount,
            maxAmount,
            type, 
            value,
            limitCustomers, 
            ExcludeCustomers, 
            limitCategories,  
            ExcludeCategories, 
            limitProducts, 
            ExcludeProducts, 
            exclusivo
         } = coupon;

        let response;


        /*const queryString9 = `SELECT * FROM coupon WHERE name = '${name}'`;
        try {
            response =  await pool.query(queryString9) 
            if(response.length > 0){
                response = 'Ya existe un cupón con este nombre.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'Ha ocurrido un error'
            return response
        }*/


         
        const queryString1 = `SELECT * FROM coupon WHERE code = '${code}'`;
        try {
            response =  await pool.query(queryString1) 
            if(response.length > 0){
                response = 'Ya existe un cupón con este código.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'Ha ocurrido un error'
            return response
        }










        const queryString2 = `INSERT INTO coupon ( name,
            descrp,
            code,
            status,
            date_a, 
            date_b, 
            freeShipping, 
            totalAvailable,
            totalAvailableCustomer, 
            minAmount,
            maxAmount,
            type, 
            value,
            limitCustomers, 
            ExcludeCustomers, 
            limitCategories,  
            ExcludeCategories, 
            limitProducts, 
            ExcludeProducts, exclusivo) VALUES ( 
                '${name}',
                '${descrp}',
                '${code}',
                '${cstatus}',
                '${date_a}', 
                '${date_b}', 
                '${freeShipping}', 
                ${totalAvailable},
                ${totalAvailableCustomer}, 
                ${minAmount},
                ${maxAmount},
                '${type}', 
                ${value},
                '${limitCustomers}', 
                '${ExcludeCustomers}', 
                '${limitCategories}',  
                '${ExcludeCategories}', 
                '${limitProducts}', 
                '${ExcludeProducts}',
                '${exclusivo}'
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


    async create_rcustomer(id_coupon, customer_email, type) {
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        let response;


        //Comprobar que no exista el cliente ya restringido para el mismo cupon , ya que no deberia estar limitado y excluido al mismo tiempo.
        const queryString1 = `SELECT * FROM coupon_restrictions_customers WHERE customer_email = '${customer_email}' and  id_coupon = ${id_coupon}`;
        try {
            response =  await pool.query(queryString1) 
            if(response.length > 0){ //Actualizo el cliente.
                const queryString6 = `UPDATE coupon_restrictions_customers SET  type =  '${type}' , updated_at = '${update}'  WHERE customer_email = '${customer_email}' and id_coupon = ${id_coupon}`;
                try {
                    response =  await pool.query(queryString6) 
                    response = 'success'
                } catch(error) {
                    console.log(error);
                    response = 'error al editar la restriccion.' 
                }

                return response
            }
        } catch(error) {
            console.log(error);
            response = 'Ha ocurrido un error'
            return response
        }



        const queryString2 = `INSERT INTO coupon_restrictions_customers ( id_coupon, customer_email, type) VALUES ( ${id_coupon}, '${customer_email}' , '${type}' )`;
        try {
            response = await pool.query(queryString2);
            
            response = 'success'
        } catch (error) {
            console.log(error);
            response =  'error';
        }

        return response;
    }

    async create_rcategory(id_coupon, category, type) {
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        let response;


        //Comprobar que no exista el cliente ya restringido para el mismo cupon , ya que no deberia estar limitado y excluido al mismo tiempo.
        const queryString1 = `SELECT * FROM coupon_restrictions_categories WHERE category = '${category}' and  id_coupon = ${id_coupon}`;
        try {
            response =  await pool.query(queryString1) 
            if(response.length > 0){ //Actualizo el cliente.
                const queryString6 = `UPDATE coupon_restrictions_categories SET  type =  '${type}' , updated_at = '${update}'  WHERE category = '${category}' and id_coupon = ${id_coupon}`;
                try {
                    response =  await pool.query(queryString6) 
                    response = 'success'
                } catch(error) {
                    console.log(error);
                    response = 'error al editar la restriccion.' 
                }

                return response
            }
        } catch(error) {
            console.log(error);
            response = 'Ha ocurrido un error'
            return response
        }



        const queryString2 = `INSERT INTO coupon_restrictions_categories ( id_coupon, category, type) VALUES ( ${id_coupon}, '${category}' , '${type}' )`;
        try {
            response = await pool.query(queryString2);
            
            response = 'success'
        } catch (error) {
            console.log(error);
            response =  'error';
        }

        return response;
    }



    async create_rproduct(id_coupon, product, type) {
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        let response;


        //Comprobar que no exista el cliente ya restringido para el mismo cupon , ya que no deberia estar limitado y excluido al mismo tiempo.
        const queryString1 = `SELECT * FROM coupon_restrictions_products WHERE product = '${product}' and  id_coupon = ${id_coupon}`;
        try {
            response =  await pool.query(queryString1) 
            if(response.length > 0){ //Actualizo el cliente.
                const queryString6 = `UPDATE coupon_restrictions_products SET  type =  '${type}' , updated_at = '${update}'  WHERE product = '${product}' and id_coupon = ${id_coupon}`;
                try {
                    response =  await pool.query(queryString6) 
                    response = 'success'
                } catch(error) {
                    console.log(error);
                    response = 'error al editar la restriccion.' 
                }

                return response
            }
        } catch(error) {
            console.log(error);
            response = 'Ha ocurrido un error'
            return response
        }



        const queryString2 = `INSERT INTO coupon_restrictions_products ( id_coupon, product, type) VALUES ( ${id_coupon}, '${product}' , '${type}' )`;
        try {
            response = await pool.query(queryString2);
            
            response = 'success'
        } catch (error) {
            console.log(error);
            response =  'error';
        }

        return response;
    }


    //Eliminar restricciones

    async delete_rproduct(id) {
     
        let response; 

        let id_cupon;
        const queryString9 = `SELECT * FROM coupon_restrictions_products WHERE id = ${id} `;

                                   
        try {
            response =  await pool.query(queryString9) 
            if(response.length >0){
                id_cupon = response[0].id_coupon
            }else{
                 return response = 'No se encontraron coincidencias'
            }
        } catch(error) {
              console.log(error);
             return response = 'error'
        }


        const queryString2 = `DELETE FROM coupon_restrictions_products WHERE id = ${id}`;
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


         //Actualizar las restriccciones en cupon.

         let result;
      
         var update = dayjs().format('YYYY-MM-DD h:mm:ss')
 
     
             const queryString4 = `SELECT * FROM coupon_restrictions_products WHERE type ='LIMITAR' `;
             try {
                 result =  await pool.query(queryString4) 
               
                 if(result.length == 0){
                    
                     const queryString6 = `UPDATE coupon SET  limitProducts =  'NO' , updated_at = '${update}'  WHERE  id = ${id_cupon}`;
                     try {
                     
                      result =  await pool.query(queryString6) 
                     
                     } catch(error) {
                         console.log(error);
                       
                     }
                 }   
             } catch(error) {
                 console.log(error);
                 
             }
     
             const queryString7 = `SELECT * FROM coupon_restrictions_products WHERE type ='EXCLUIR' `;
             try {
                 result =  await pool.query(queryString7) 
                 if(result.length == 0){
                     const queryString8 = `UPDATE coupon SET  ExcludeProducts =  'NO' , updated_at = '${update}'  WHERE  id = ${id_cupon}`;
                     try {
                      result =  await pool.query(queryString8) 
                     
                     } catch(error) {
                         console.log(error);
                       
                     }
                 }
             } catch(error) {
                 console.log(error); 
             }
    
             
      
        return response
    }

    async delete_rcustomer(id) {

        
     
        let response; 

        let id_cupon;
        const queryString9 = `SELECT * FROM coupon_restrictions_customers WHERE id = ${id} `;

                                   
        try {
            response =  await pool.query(queryString9) 
            if(response.length >0){
                id_cupon = response[0].id_coupon
            }else{
                 return response = 'No se encontraron coincidencias'
            }
        } catch(error) {
              console.log(error);
             return response = 'error'
        }




        const queryString2 = `DELETE FROM coupon_restrictions_customers WHERE id = ${id}`;
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


        //Actualizar las restriccciones en cupon.

        let result;
      
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')

    
            const queryString4 = `SELECT * FROM coupon_restrictions_customers WHERE type ='LIMITAR' `;
            try {
                result =  await pool.query(queryString4) 
              
                if(result.length == 0){
                   
                    const queryString6 = `UPDATE coupon SET  limitCustomers =  'NO' , updated_at = '${update}'  WHERE  id = ${id_cupon}`;
                    try {
                    
                     result =  await pool.query(queryString6) 
                    
                    } catch(error) {
                        console.log(error);
                      
                    }
                }   
            } catch(error) {
                console.log(error);
                
            }
    
            const queryString7 = `SELECT * FROM coupon_restrictions_customers WHERE type ='EXCLUIR' `;
            try {
                result =  await pool.query(queryString7) 
                if(result.length == 0){
                    const queryString8 = `UPDATE coupon SET  ExcludeCustomers =  'NO' , updated_at = '${update}'  WHERE  id = ${id_cupon}`;
                    try {
                     result =  await pool.query(queryString8) 
                    
                    } catch(error) {
                        console.log(error);
                      
                    }
                }
            } catch(error) {
                console.log(error); 
            }
    
        

      




      
        return response
    }


    async delete_rcategory(id) {
     
        let response; 

        let id_cupon;
        const queryString9 = `SELECT * FROM coupon_restrictions_categories WHERE id = ${id} `;

                                   
        try {
            response =  await pool.query(queryString9) 
            if(response.length >0){
                id_cupon = response[0].id_coupon
            }else{
                 return response = 'No se encontraron coincidencias'
            }
        } catch(error) {
              console.log(error);
             return response = 'error'
        }


        
        const queryString2 = `DELETE FROM coupon_restrictions_categories WHERE id = ${id}`;
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


        //Actualizar las restriccciones en cupon.

        let result;
      
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')

    
            const queryString4 = `SELECT * FROM coupon_restrictions_categories WHERE type ='LIMITAR' `;
            try {
                result =  await pool.query(queryString4) 
              
                if(result.length == 0){
                   
                    const queryString6 = `UPDATE coupon SET  limitCategories =  'NO' , updated_at = '${update}'  WHERE  id = ${id_cupon}`;
                    try {
                    
                     result =  await pool.query(queryString6) 
                    
                    } catch(error) {
                        console.log(error);
                      
                    }
                }   
            } catch(error) {
                console.log(error);
                
            }
    
            const queryString7 = `SELECT * FROM coupon_restrictions_categories WHERE type ='EXCLUIR' `;
            try {
                result =  await pool.query(queryString7) 
                if(result.length == 0){
                    const queryString8 = `UPDATE coupon SET  ExcludeCategories =  'NO' , updated_at = '${update}'  WHERE  id = ${id_cupon}`;
                    try {
                     result =  await pool.query(queryString8) 
                    
                    } catch(error) {
                        console.log(error);
                      
                    }
                }
            } catch(error) {
                console.log(error); 
            }


      
        return response
    }



    async update(coupon) {
        let {
            id,
            name,
            descrp,
            code,
            cstatus,
            date_a, 
            date_b, 
            freeShipping, 
            totalAvailable,
            totalAvailableCustomer, 
            minAmount,
            maxAmount,
            type, 
            value,
            limitCustomers, 
            ExcludeCustomers, 
            limitCategories,  
            ExcludeCategories, 
            limitProducts, 
            ExcludeProducts,
            exclusivo
         } = coupon;

        let response;


        const queryString33 = `SELECT * FROM coupon WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString33) 
                if(response.length == 0 ){
                    return response = 'Cupón no encontrado.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al intentar guardar la entrada.'
        }

         
        const queryString1 = `SELECT * FROM coupon WHERE code = '${code}'`;
        try {
            response =  await pool.query(queryString1) 
            if(response.length > 0 && response[0].id != id){
                response = 'Ya existe un cupón con este código.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'Ha ocurrido un error'
            return response
        }


        /*
        const queryString11 = `SELECT * FROM coupon WHERE name = '${name}'`;
        try {
            response =  await pool.query(queryString11) 
            if(response.length > 0 && response[0].id != id){
                response = 'Ya existe un cupón con este nombre.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'Ha ocurrido un error'
            return response
        }*/










        const queryString2 = `UPDATE  coupon SET  name = '${name}',
            descrp = '${descrp}',
            exclusivo = '${exclusivo}',
            code = '${code}',
            status = '${cstatus}',
            date_a = '${date_a}', 
            date_b = '${date_b}', 
            freeShipping = '${freeShipping}', 
            totalAvailable = ${totalAvailable},
            totalAvailableCustomer = ${totalAvailableCustomer}, 
            minAmount =  ${minAmount},
            maxAmount = ${maxAmount},
            type = '${type}', 
            value =  ${value},
            limitCustomers = '${limitCustomers}', 
            ExcludeCustomers = '${ExcludeCustomers}', 
            limitCategories = '${limitCategories}',  
            ExcludeCategories = '${ExcludeCategories}', 
            limitProducts = '${limitProducts}', 
            ExcludeProducts = '${ExcludeProducts}'
                WHERE id = ${id} `;
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

        const queryString9 = `SELECT * FROM coupon WHERE id = ${id} `;

                                   
        try {
            response =  await pool.query(queryString9) 
            if(response.length ==0){
                 return response = 'Cupón no encontrado.'
            }
        } catch(error) {
              console.log(error);
             return response = 'error'
        }




        const queryString2 = `DELETE FROM coupon_restrictions_customers WHERE id_coupon = ${id}`;
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


        const queryString3 = `DELETE FROM coupon_restrictions_categories WHERE id_coupon = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            
            if(response.affectedRows > 0){
                response = 'success'
            }else{
                response = 'error'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }


        const queryString4 = `DELETE FROM coupon_restrictions_products WHERE id_coupon = ${id}`;
        try {
            response =  await pool.query(queryString4) 
            
            if(response.affectedRows > 0){
                response = 'success'
            }else{
                response = 'error'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        const queryString5 = `DELETE FROM coupon WHERE id = ${id}`;
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


'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class paymentRepository {
    async last(){
        let response; 
        const queryString = `SELECT p.id, p.status, p.pay_num, p.method, p.order_id, p.customer_id, p.subtotal, p.envio, p.descupon, p.total, p.tracking_number, p.shipping_option,
        p.carrier, p.id_user, p.name, p.lastname, p.email, p.phone, p.address, p.country, p.state, p.city, p.postal_code, p.notes, DATE_FORMAT(p.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(p.updated_at, "%Y-%m-%d") as 'updated_at', p.receipt FROM payment as p   ORDER BY p.id DESC LIMIT 1`;
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

    async getAll(){
        let response; 
        const queryString = `SELECT p.id, p.status, p.pay_num, p.method, p.order_id, p.customer_id, p.subtotal, p.envio, p.descupon, p.total, p.tracking_number, p.shipping_option,
        p.carrier, p.id_user, p.name, p.lastname, p.email, p.phone, p.address, p.country, p.state, p.city, p.postal_code, p.notes, DATE_FORMAT(p.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(p.updated_at, "%Y-%m-%d") as 'updated_at' , p.receipt  FROM payment as p   ORDER BY p.id DESC`;
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

    async getByClient(id){
        let response; 
        const queryString = `SELECT p.id, p.status, p.pay_num, p.method, p.order_id, p.customer_id, p.subtotal, p.envio, p.descupon, p.total, p.tracking_number, p.shipping_option,
        p.carrier, p.id_user, p.name, p.lastname, p.email, p.phone, p.address, p.country, p.state, p.city, p.postal_code, p.notes, DATE_FORMAT(p.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(p.updated_at, "%Y-%m-%d") as 'updated_at' , p.receipt  FROM payment as p WHERE p.id_user = ${id}  ORDER BY p.id DESC`;
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

    async search(value){
        let response; 
        const queryString = `SELECT p.id, p.status, p.pay_num, p.method, p.order_id, p.customer_id, p.subtotal, p.envio, p.descupon, p.total, p.tracking_number, p.shipping_option,
        p.carrier, p.id_user, p.name, p.lastname, p.email, p.phone, p.address, p.country, p.state, p.city, p.postal_code, p.notes, DATE_FORMAT(p.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(p.updated_at, "%Y-%m-%d") as 'updated_at' , p.receipt  FROM payment as p WHERE p.pay_num LIKE "%${value}%" || p.order_id LIKE "%${value}%"  || p.email LIKE "%${value}%"   ORDER BY p.id DESC`;
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


    async getById(id){
        let response; 
        const queryString = `SELECT p.id, p.status, p.pay_num, p.method, p.order_id, p.customer_id, p.subtotal, p.envio, p.descupon, p.total, p.tracking_number, p.shipping_option,
        p.carrier, p.id_user, p.name, p.lastname, p.email, p.phone, p.address, p.country, p.state, p.city, p.postal_code, p.notes, DATE_FORMAT(p.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(p.updated_at, "%Y-%m-%d") as 'updated_at' , p.receipt  FROM payment as p  WHERE p.id = ${id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias.'
            }else{
                response = response[0]
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async getByOrderId(id){
        let response; 
        const queryString = `SELECT p.id, p.status, p.pay_num, p.method, p.order_id, p.customer_id, p.subtotal, p.envio, p.descupon, p.total, p.tracking_number, p.shipping_option,
        p.carrier, p.id_user, p.name, p.lastname, p.email, p.phone, p.address, p.country, p.state, p.city, p.postal_code, p.notes, DATE_FORMAT(p.created_at, "%Y-%m-%d") as 'created_at',  DATE_FORMAT(p.updated_at, "%Y-%m-%d") as 'updated_at' , p.receipt  FROM payment as p  WHERE p.order_id = '${id}'`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias.'
            }else{
                response = response[0]
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }


    async getPaymentBilling(id){
        let response; 
        const queryString = `SELECT   * FROM payment_billing WHERE id_payment = ${id}`;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                response = 'No se encontraron coincidencias.'
            }else{
                response = response[0] //solo puede haber un registro asi que solo devuelvo el primero.
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async getPaymentCoupons(id){
        let response; 
        const queryString = `SELECT   * FROM payment_coupons WHERE id_payment = ${id}`;
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

    async getPaymentDetail(id){
        let response; 
        const queryString = `SELECT   * FROM payment_detail WHERE id_payment = ${id}`;
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

  


    //por cliente
    //todas
    //buscador 





    async create(data) {
        let response; 
      
    
        const queryString2 = `INSERT INTO payment (pay_num, method, order_id, customer_id, 
            subtotal, envio , descupon , total , shipping_option, id_user, name, lastname, 
            email, phone, address, country, state, city,postal_code, notes, carrier) VALUES ( '${data.pay_num}',
            '${data.method}', '${data.order_id}' , '${data.customer_id}' ,  ${data.subtotal}, 
             ${data.envio} ,  ${data.descupon} ,   ${data.total} , '${data.shipping_option}',
             ${data.id_user}, '${data.name}', '${data.lastname}', '${data.email}', '${data.phone}',
             '${data.address}',  '${data.country}',  '${data.state}',  '${data.city}' , '${data.postal_code}', '${data.notes}', '${data.carrier}')`;
        try {
            response =  await pool.query(queryString2) 
            response = {status:'success', result: response}
        } catch(error) {
            console.log(error);
            response = {status:'error', result: error.message}
        }
    
        return response
    }

    async create_billing (data) {
        let response; 
        
        const queryString3 = `SELECT * FROM payment WHERE id = ${data.id_payment}`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length == 0){
               return {status:'error', result: 'Pago no encontrado.'}
            }
        } catch(error) {
            console.log(error);
            return {status:'error', result: error.message}
        }
        
    
        const queryString2 = `INSERT INTO payment_billing (id_payment, postal_code, fiscal_address,
            country,  state, city, email,  phone, reason_social, rfc  ) VALUES ( ${data.id_payment}, '${data.postal_code}',
            '${data.fiscal_address}', '${data.country}', '${data.state}',  '${data.city}',  '${data.email}', 
             '${data.phone}', '${data.reason_social}', '${data.rfc}')`;
        try {
            response =  await pool.query(queryString2) 
            response = {status:'success', result: response}
        } catch(error) {
            console.log(error);
            response = {status:'error', result: error.message}
        }
    
        return response
    }

    async create_detail (data) {
        let response; 
        
        const queryString3 = `SELECT * FROM payment WHERE id = ${data.id_payment}`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length == 0){
               return {status:'error', result: 'Pago no encontrado.'}
            }
        } catch(error) {
            console.log(error);
            return {status:'error', result: error.message}
        }
        
    
        const queryString2 = `INSERT INTO payment_detail (id_payment, name, price,
            quantity , subtotal,  id_item, type , extra ) VALUES ( ${data.id_payment}, '${data.name}',
            ${data.price}, ${data.quantity}, ${data.subtotal}, ${data.id_item}, '${data.type}', '${data.extra}')`;
        try {
            response =  await pool.query(queryString2) 
            response = {status:'success', result: response}
        } catch(error) {
            console.log(error);
            response = {status:'error', result: error.message}
        }
    
        return response
    }

    async create_payment_coupons (data) {
        let response; 
        
        const queryString3 = `SELECT * FROM payment WHERE id = ${data.id_payment}`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length == 0){
               return {status:'error', result: 'Pago no encontrado.'}
            }
        } catch(error) {
            console.log(error);
            return {status:'error', result: error.message}
        }
        
    
        const queryString2 = `INSERT INTO payment_coupons (id_payment,customer_email, code,
            freeShipping, type, value, descupon, exclusivo ) VALUES ( ${data.id_payment}, '${data.customer_email}',
            '${data.code}', '${data.freeShipping}', '${data.type}', ${data.value}, ${data.descupon} ,'${data.exclusivo}')`;
        try {
            response =  await pool.query(queryString2) 
            response = {status:'success', result: response}
        } catch(error) {
            console.log(error);
            response = {status:'error', result: error.message}
        }
    
        return response
    }


    async delete(id) {
     
        let response; 
        const queryString2 = `SELECT * FROM payment WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='Pago no encontrada.'
                }
        } catch(error) {
            console.log(error);
            return  'Error al buscar el pago.'
        }

        const queryString4 = `DELETE FROM payment_billing WHERE id_payment = ${id}`;
        try {
                response =  await pool.query(queryString4) 
        } catch(error) {
            console.log(error);
           return  'Error al intentar eliminar los datos de facturación.'
        }

        const queryString5 = `DELETE FROM payment_coupons WHERE id_payment = ${id}`;
        try {
                response =  await pool.query(queryString5) 
        } catch(error) {
            console.log(error);
           return  'Error al intentar eliminar los cupones del pago.'
        }

        
        const queryString6 = `DELETE FROM payment_detail WHERE id_payment = ${id}`;
        try {
                response =  await pool.query(queryString6) 
        } catch(error) {
            console.log(error);
           return  'Error al intentar eliminar los items del pago.'
        }


        const queryString7 = `DELETE FROM payment_shipment WHERE id_payment = ${id}`;
        try {
                response =  await pool.query(queryString7) 
        } catch(error) {
            console.log(error);
           return  'Error al intentar eliminar los datos de envío del pago.'
        }


        const queryString3 = `DELETE FROM payment WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar el pago.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar el pago.'
        }

        return response
    }


    async updateReceipt(id, value) {
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        
        const queryString2 = `SELECT * FROM payment WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            result = response.length
            if(result == 0){
                return response='No se encontro el pago.'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

        const queryString3 = `UPDATE payment SET receipt = '${value}', updated_at = '${update}' WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       

        return response
    }

    async updateOrderID(id, value) {
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        
        const queryString2 = `SELECT * FROM payment WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            result = response.length
            if(result == 0){
                return response='No se encontro el pago.'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

        const queryString3 = `UPDATE payment SET order_id = '${value}', updated_at = '${update}' WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       

        return response
    }

    async updateCustomerID(id, value) {
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        
        const queryString2 = `SELECT * FROM payment WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            result = response.length
            if(result == 0){
                return response='No se encontro el pago.'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

        const queryString3 = `UPDATE payment SET customer_id = '${value}', updated_at = '${update}' WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       

        return response
    }

    async updateStatus(id, value) {
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        
        const queryString2 = `SELECT * FROM payment WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            result = response.length
            if(result == 0){
                return response='No se encontro el pago.'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

        const queryString3 = `UPDATE payment SET status = '${value}', updated_at = '${update}' WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       

        return response
    }

    async updateTrackingNumber(id, value) {
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        
        const queryString2 = `SELECT * FROM payment WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString2) 
            result = response.length
            if(result == 0){
                return response='No se encontro el pago.'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

        const queryString3 = `UPDATE payment SET tracking_number = '${value}', updated_at = '${update}' WHERE id = ${id}`;
        try {
            response =  await pool.query(queryString3) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
       

        return response
    }







   





 


};

module.exports = paymentRepository;

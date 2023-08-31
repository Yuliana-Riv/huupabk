
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class colaboradoresRepository {
    async last(){
        let response; 
        const queryString = `SELECT * FROM colaboradores ORDER BY id DESC LIMIT 1`;
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
        const queryString = `SELECT * FROM colaboradores WHERE name LIKE "%${value}%"  `; //`;
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
        const queryString = `SELECT * FROM colaboradores  `; // WHERE  role !='legrafica'`;
      
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
        const queryString = `SELECT * FROM colaboradores WHERE id = ${id} `;
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

    async getByUrl(url) {

        let response; 
        const queryString = `SELECT * FROM colaboradores WHERE url = '${url}' `;
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
        const queryString2 = `SELECT * FROM colaboradores WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length >0){
                    const queryString2 = `DELETE FROM colaboradores WHERE id = ${id}`;
                    try {
                            response =  await pool.query(queryString2) 
                            if(response.affectedRows > 0){
                                response = 'success'
                            }else{
                                response = 'No fue posible eliminar el colaborador.'
                            }
                    } catch(error) {
                        console.log(error);
                        response = 'Error al intentar eliminar el colaborador'
                    }
                }else{
                    response ='colaborador no encontrado.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al buscar el colaborador.'
        }

        return response
    }


    async create(item) {
        let response; 
      
        const queryString3 = `SELECT * FROM colaboradores WHERE name = '${item.name}'`;
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

      
        const queryString2 = `INSERT INTO colaboradores ( name, url, descrp, about, facebook, instagram, twiter, linkedin, email ) VALUES ( '${item.name}',  '${item.url}',  '${item.descrp}',  '${item.about}',  '${item.facebook}',  '${item.instagram}',  '${item.twiter}',  '${item.linkedin}',  '${item.email}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }


    async update(item) {
      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        //validar que no exista el email en la bd
       
        const queryString3 = `SELECT * FROM colaboradores WHERE id = ${item.id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro el colaborador'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

       
       

        const queryString = `SELECT * FROM colaboradores WHERE name = '${item.name}'`;
        try {
            response =  await pool.query(queryString) 
            result = response.length
            if(result >0 && response[0].id != item.id){
               return   response='Nombre ya registrado'
            }
        } catch(error) {
            console.log(error);
           return response = 'error'
        
        }

       

    

        const queryString2 = `UPDATE colaboradores SET url =  '${item.url}', name = '${item.name}' , descrp = '${item.descrp}', about = '${item.about}' ,facebook = '${item.facebook}', instagram = '${item.instagram}', linkedin = '${item.linkedin}' , twiter = '${item.twiter}', email = '${item.email}',   updated_at = '${update}' WHERE id = ${item.id}`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }





    async updateImage(data) {
        let response; 
        let result
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
        const queryString = `SELECT * FROM colaboradores WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString) 
            result = response.length
            if(result>0){
                const queryString2 = `UPDATE colaboradores SET image = '${data.image}' , updated_at = '${update}' WHERE id = ${data.id}`;
                            try {
                                response =  await pool.query(queryString2) 
                            
                                response = 'success'
                            } catch(error) {
                                console.log(error);
                                response = 'error'
                            }
            }else{
               response='No se encontro el colaborador'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
          
        }
       
        return response
    }


    




};

module.exports = colaboradoresRepository;

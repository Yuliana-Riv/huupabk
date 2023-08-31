
'use strict'
var dayjs = require('dayjs');
const pool  = require ('../../db/appSQLClient');

class blogRepository {
    async last(){
        let response; 
        const queryString = `SELECT  b.id, b.title, b.url, b.descrp, b.id_autor, u.name as 'autor_name', u.lastname as 'autor_lastname', b.id_category, c.name as 'category_name', b.id_colaborador, b.image, DATE_FORMAT(b.dateblog, "%Y-%m-%d") as 'dateblog' , b.formato, b.body , b.orden, b.statusblog   FROM blog  as b 
        INNER JOIN users as u ON u.id = b.id_autor
        INNER JOIN categories as c ON c.id = b.id_category  ORDER BY b.id DESC LIMIT 1`;
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
        const queryString = `SELECT  b.id, b.title, b.url, b.descrp, b.id_autor, u.name as 'autor_name', u.lastname as 'autor_lastname', b.id_category, c.name as 'category_name', b.id_colaborador, b.image, DATE_FORMAT(b.dateblog, "%Y-%m-%d") as 'dateblog' , b.formato, b.body , b.orden, b.statusblog   FROM blog  as b 
        INNER JOIN users as u ON u.id = b.id_autor
        INNER JOIN categories as c ON c.id = b.id_category  WHERE b.title LIKE "%${value}%"  `; 
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
        const queryString = `SELECT  b.id, b.title, b.url, b.descrp, b.id_autor, u.name as 'autor_name', u.lastname as 'autor_lastname', b.id_category, c.name as 'category_name', b.id_colaborador, b.image, DATE_FORMAT(b.dateblog, "%Y-%m-%d") as 'dateblog' , b.formato, b.body , b.orden, b.statusblog  FROM blog  as b 
        INNER JOIN users as u ON u.id = b.id_autor
        INNER JOIN categories as c ON c.id = b.id_category order by b.dateblog desc`; 
      
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
        const queryString = `SELECT  b.id, b.title, b.url, b.descrp, b.id_autor, u.name as 'autor_name', u.lastname as 'autor_lastname', b.id_category, c.name as 'category_name', b.id_colaborador, b.image, DATE_FORMAT(b.dateblog, "%Y-%m-%d") as 'dateblog' , b.formato, b.body , b.orden, b.statusblog  FROM blog  as b 
        INNER JOIN users as u ON u.id = b.id_autor
        INNER JOIN categories as c ON c.id = b.id_category  WHERE b.id = ${id} `;
        try {
            response =  await pool.query(queryString) 
            if(response.length >0){
                response  = response[0]
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async getByCategory(id) {
     
        let response; 
        const queryString = `SELECT  b.id, b.title, b.url, b.descrp, b.id_autor, u.name as 'autor_name', u.lastname as 'autor_lastname', b.id_category, c.name as 'category_name', b.id_colaborador, b.image, DATE_FORMAT(b.dateblog, "%Y-%m-%d") as 'dateblog' , b.formato, b.body , b.orden, b.statusblog  FROM blog  as b 
        INNER JOIN users as u ON u.id = b.id_autor
        INNER JOIN categories as c ON c.id = b.id_category  WHERE c.id = ${id} order by b.dateblog desc`;
        try {
            response =  await pool.query(queryString) 
            if(response.length >0){
                response  = response
            }else{
                response = 'No se encontraron coincidencias.'
            }
        } catch(error) {
            console.log(error);
            response = 'error'
        }

        return response
    }

    async getByEtiqueta(id) {
     
        let response; 
        const queryString = `SELECT  b.id, b.title, b.url, b.descrp, b.id_autor, u.name as 'autor_name', u.lastname as 'autor_lastname', b.id_category, c.name as 'category_name', b.id_colaborador, b.image, DATE_FORMAT(b.dateblog, "%Y-%m-%d") as 'dateblog' , b.formato, b.body , b.orden, b.statusblog  FROM blog  as b 
        INNER JOIN users as u ON u.id = b.id_autor
        INNER JOIN categories as c ON c.id = b.id_category 
        INNER JOIN blog_tags as t ON t.id_blog = b.id WHERE t.id_tag = ${id} `;
        try {
            response =  await pool.query(queryString) 
            if(response.length >0){
                response  = response
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
        const queryString = `SELECT  b.id, b.title, b.url, b.descrp, b.id_autor, u.name as 'autor_name', u.lastname as 'autor_lastname', b.id_category, c.name as 'category_name', b.id_colaborador, b.image, DATE_FORMAT(b.dateblog, "%Y-%m-%d") as 'dateblog' , b.formato, b.body , b.orden, b.statusblog  FROM blog  as b 
        INNER JOIN users as u ON u.id = b.id_autor
        INNER JOIN categories as c ON c.id = b.id_category  WHERE b.url = '${url}' `;
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



    async getTags(id) {
     
        let response; 
        const queryString = `SELECT bt.id, t.name, t.id as 'id_tag', bt.id_blog FROM blog_tags as bt 
        INNER JOIN tag as t ON t.id = bt.id_tag  WHERE bt.id_blog = ${id} `;
        try {
            response =  await pool.query(queryString) 
            if(response.length == 0){
                //response = []
                response='No se encontraron coincidencias.'
            }

        } catch(error) {
            console.log(error);
            response = []
        }

        return response
    }


    async getColab(id) {
     
        let response; 
        const queryString = `SELECT * FROM colaboradores  WHERE id = ${id} `;
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
        /**/
        
        const queryString2 = `SELECT * FROM blog WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='blog no encontrado.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar el blog.'
        }
        
        const queryString5 = `DELETE FROM blog_images WHERE id_blog = ${id}`;
        try {
                response =  await pool.query(queryString5) 
        } catch(error) {
            console.log(error);
        }

        const queryString7 = `DELETE FROM blog_tags WHERE id_blog = ${id}`;
        try {
                response =  await pool.query(queryString7) 
        } catch(error) {
            console.log(error);
        }

        const queryString8 = `DELETE FROM blog_categories WHERE id_blog = ${id}`;
        try {
                response =  await pool.query(queryString8) 
        } catch(error) {
            console.log(error);
        }

        const queryString3 = `DELETE FROM blog WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar el blog.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar el blog'
        }

        return response
    }


    async create(data) {
        let response; 
      

        const queryString3 = `SELECT * FROM blog WHERE url = '${data.url}'`;
        try {
            response =  await pool.query(queryString3) 
            if(response.length > 0){
                response = 'Url ya registrado.'
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

        const queryString5 = `SELECT * FROM users WHERE id = ${data.id_autor}`;
        try {
            response =  await pool.query(queryString5) 
            if(response.length == 0){
                response = 'Usuario no encontrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }

       
        

      
        const queryString2 = `INSERT INTO blog (title, url, descrp, id_autor, id_category, id_colaborador, image, dateblog, formato, body) VALUES ( '${data.title}', '${data.url}', '${data.descrp}', ${data.id_autor}, ${data.id_category}, ${data.id_colaborador}, '${data.image}', '${data.dateblog}', '${data.formato}', '${data.body}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }

    async createTag(data){
        let response; 
      

       

        const queryString4 = `SELECT * FROM tag WHERE id = ${data.id_tag}`;
        try {
            response =  await pool.query(queryString4) 
            if(response.length == 0){
                response = 'Etiqueta no encontrada.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }

        const queryString5 = `SELECT * FROM blog WHERE id = ${data.id_blog}`;
        try {
            response =  await pool.query(queryString5) 
            if(response.length == 0){
                response = 'Blog no encontrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }

       
        

      
        const queryString2 = `INSERT INTO blog_tags (id_tag, id_blog) VALUES (  ${data.id_tag}, ${data.id_blog})`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }

    async createImg(image){
        let response; 
      
      
        const queryString2 = `INSERT INTO blog_images (image) VALUES (  '${image}')`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }
    
        return response
    }

    async updateImg(id_blog, image){
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
        const queryString2 = `UPDATE blog_images SET id_blog = ${id_blog}, updated_at = '${update}' WHERE image = '${image}'`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }

    
        return response
    }

    async deleteTag(id) {
     
        let response; 
        const queryString2 = `SELECT * FROM blog_tags WHERE id = ${id}`;
        try {
                response =  await pool.query(queryString2) 
                if(response.length == 0){
                   return response ='Etiqueta no encontrada.'
                }
        } catch(error) {
            console.log(error);
            return response = 'Error al buscar la etiqueta.'
        }


        const queryString3 = `DELETE FROM blog_tags WHERE id = ${id}`;
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

    


    async update(data) {

      
        let response; 
        let result;
        var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
       
        const queryString3 = `SELECT * FROM blog WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString3) 
            result = response.length
            if(result == 0){
                return response='No se encontro el blog'
            }
        } catch(error) {
            console.log(error);
            return  response = 'error'
          
        }

       

        const queryString = `SELECT * FROM blog WHERE url = '${data.url}'`;
        try {
            response =  await pool.query(queryString) 
            result = response.length
            if(result >0 && response[0].id != data.id){
               return   response='Url ya registrado'
            }
        } catch(error) {
            console.log(error);
           return response = 'error'
        
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

        const queryString5 = `SELECT * FROM users WHERE id = ${data.id_autor}`;
        try {
            response =  await pool.query(queryString5) 
            if(response.length == 0){
                response = 'Usuario no encontrado.'
               return response
            }
        } catch(error) {
            console.log(error);
            response = 'error'
            return response
        }

        //cambiar a NA el actual en caso de que ya haya uno con esta posicion..
        if(data.orden !='NA'){
            
            const queryString5 = `SELECT * FROM blog WHERE orden = ${data.orden}`;
            try {
                response =  await pool.query(queryString5) 
                if(response.length > 0  && response[0].id != data.id){
                    console.log(response)

                    const queryString7 = `UPDATE blog SET  orden =  'NA' ,  updated_at = '${update}' WHERE id = ${response[0].id}`;
                    try {
                        response =  await pool.query(queryString7) 
                    } catch(error) {
                        console.log(error);
                    }
                   
                }
            } catch(error) {
                console.log(error);
            }
        }
      

       



        const queryString2 = `UPDATE blog SET statusblog = '${data.statusblog}', orden =  '${data.orden}', id_autor = ${data.id_autor},  id_category = ${data.id_category}, id_colaborador = ${data.id_colaborador}, title = '${data.title}', url = '${data.url}',  descrp = '${data.descrp}',  image = '${data.image}',  dateblog = '${data.dateblog}',  formato = '${data.formato}', body = '${data.body}',  updated_at = '${update}' WHERE id = ${data.id}`;
        try {
            response =  await pool.query(queryString2) 
            response = 'success'
        } catch(error) {
            console.log(error);
            response = 'error'
        }


       
       
        return response
    }



    async getImages() {
        let response; 
        const queryString = `SELECT id,  image , id_blog FROM blog_images  `; 
      
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

    async delImg(image) {
        let response; 
        const queryString3 = `DELETE FROM blog_images WHERE image = '${image}'`;
        try {
                response =  await pool.query(queryString3) 
                if(response.affectedRows > 0){
                    response = 'success'
                }else{
                    response = 'No fue posible eliminar la imagen.'
                }
        } catch(error) {
            console.log(error);
            response = 'Error al intentar eliminar la imagen'
        }

        return response
    }


   





 


};

module.exports = blogRepository;

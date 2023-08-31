"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class clients_quotesRepository {
  async last() {
    let response;
    const queryString = `SELECT *   FROM clients_quotes  ORDER BY id DESC LIMIT 1`;
    try {
      response = await pool.query(queryString);
      if (response.length == 0) {
        response = "error";
      } else {
        response = response[0];
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async search(value) {
    let response;
    const queryString = `SELECT *   FROM clients_quotes  WHERE fullname LIKE "%${value}%"  `;
    try {
      response = await pool.query(queryString);
      if (response.length == 0) {
        response = "No se encontraron coincidencias.";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async getAll() {
    let response;
    const queryString = `SELECT *   FROM clients_quotes  `;

    try {
      response = await pool.query(queryString);
      if (response.length > 0) {
        response = response;
      } else {
        response = "No se encontraron coincidencias.";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async getById(id) {
    let response;
    const queryString = `SELECT *  FROM clients_quotes  WHERE id = ${id} `;
    try {
      response = await pool.query(queryString);
      if (response.length > 0) {
        response = response[0];
      } else {
        response = "No se encontraron coincidencias.";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async delete(id) {
    let response;
    const queryString2 = `SELECT * FROM clients_quotes WHERE id = ${id}`;
    try {
      response = await pool.query(queryString2);
      if (response.length == 0) {
        return (response = "Suscripción no encontrada.");
      }
    } catch (error) {
      console.log(error);
      return (response = "Error al buscar la suscripción");
    }

    const queryString3 = `DELETE FROM clients_quotes WHERE id = ${id}`;
    try {
      response = await pool.query(queryString3);
      if (response.affectedRows > 0) {
        response = "success";
      } else {
        response = "No fue posible eliminar la suscripción.";
      }
    } catch (error) {
      console.log(error);
      response = "Error al intentar eliminar la suscripción.";
    }

    return response;
  }

  async create(data) {
    let response;

    const queryString3 = `SELECT * FROM clients_quotes WHERE fullname = '${data.fullname}'`;
    try {
      response = await pool.query(queryString3);
      if (response.length > 0) {
        response = "Email ya registrado.";
        return response;
      }
    } catch (error) {
      console.log(error);
      response = "error";
      return response;
    }

    const queryString2 = `INSERT INTO clients_quotes (fullname, quote, image) VALUES ( '${data.fullname}', '${data.quote}', '${data.image}')`;
    try {
      response = await pool.query(queryString2);
      response = "success";
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }


  async update(data) {

      
    let response; 
    let result;
    var update = dayjs().format('YYYY-MM-DD h:mm:ss')
      
       
    const queryString3 = `SELECT * FROM clients_quotes WHERE id = ${data.id}`;
    try {
        response =  await pool.query(queryString3) 
        result = response.length
        if(result == 0){
            return response='No se encontro la cita'
        }
    } catch(error) {
        console.log(error);
        return  response = 'error'
      
    }

    const queryString2 = `UPDATE clients_quotes SET fullname = '${data.fullname}', quote = '${data.quote}', image = '${data.image}',  updated_at = '${update}' WHERE id = ${data.id}`;
    try {
        response =  await pool.query(queryString2) 
        response = 'success'
    } catch(error) {
        console.log(error);
        response = 'error'
    }


   
   
    return response
}


  async createImg(image) {
    let response;

    const queryString2 = `INSERT INTO clients_quotes (image) VALUES (  '${image}')`;
    try {
      response = await pool.query(queryString2);
      response = "success";
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async updateImg(id, image) {
    let response;
    let result;
    var update = dayjs().format("YYYY-MM-DD h:mm:ss");

    const queryString2 = `UPDATE clients_quotes SET id = ${id}, updated_at = '${update}' WHERE image = '${image}'`;
    try {
      response = await pool.query(queryString2);
      response = "success";
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async delImg(image) {
      let response; 
      const queryString3 = `DELETE FROM clients_quotes WHERE image = '${image}'`;
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
}

module.exports = clients_quotesRepository;

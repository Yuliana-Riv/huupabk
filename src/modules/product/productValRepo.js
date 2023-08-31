"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class productValRepository {
  async last() {
    let response;
    const queryString = `SELECT p.id, pd.name as 'product_name', p.id_product,  p.name,  p.email,  p.comment,  p.valuation FROM product_valuation as p INNER JOIN product as pd on p.id_product = pd.id ORDER BY p.id DESC LIMIT 1`;
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
  async findAll() {
    let response;
    const queryString = `SELECT p.id, pd.name as 'product_name', p.id_product,  p.name,  p.email,  p.comment,  p.valuation FROM product_valuation as p INNER JOIN product as pd on p.id_product = pd.id ORDER BY p.id DESC`;
    try {
      response = await pool.query(queryString);
      if (response.length == 0) {
        response = "error";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }
    return response;
  }

  async findById(id) {
    let response;
    //`SELECT p.id, pd.name as 'product_name', p.id_product,  p.name,  p.email,  p.comment,  p.valuation FROM product_valuation as p INNER JOIN product as pd on p.id_product = pd.id WHERE p.id = ${id}`
    const queryString = `SELECT * FROM product WHERE id = ${id}`;
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

  async findByIdProduct(id_product) {
    let response;
    const queryString = `SELECT p.id, pd.name as 'product_name', p.id_product,  p.name,  p.email,  p.comment,  p.valuation, DATE_FORMAT(p.created_at, "%Y-%m-%d") as 'dateproduct', DATE_FORMAT(p.created_at, "%k:%i %p") as 'hourproduct',  p.valuation  FROM product_valuation as p INNER JOIN product as pd on p.id_product = pd.id WHERE p.id_product = ${id_product} ORDER BY p.id DESC`;
    try {
      response = await pool.query(queryString);
      if (response.length == 0) {
        response = "error";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }
    return response;
  }

  async search(value) {
    let response;
    const queryString = `SELECT p.id, pd.name as 'product_name', p.id_product,  p.name,  p.email,  p.comment,  p.valuation FROM product_valuation as p INNER JOIN product as pd on p.id_product = pd.id WHERE p.name LIKE "%${value}%" OR pd.name LIKE "%${value}%"`;
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

  async create(data) {
    let response;
    const queryString2 = `INSERT INTO product_valuation (id_product, name, email, comment, valuation) VALUES (${data.id_product}, '${data.name}', '${data.email}', '${data.comment}', ${data.valuation})`;
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
    var update = dayjs().format('YYYY-MM-DD h:mm:ss')
    const queryString5 = `UPDATE product_valuation SET comment = '${data.comment}', valuation = ${data.valuation}, updated_at = '${update}'  WHERE id = ${data.id}`;
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
    const queryString2 = `DELETE FROM product_valuation WHERE id = ${id}`;
    try {
      response = await pool.query(queryString2);
      if (response.affectedRows > 0) {
        response = "success";
      } else {
        response = "error";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }
}

module.exports = productValRepository;

"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class blogCommentsRepository {
  async last() {
    let response;
    const queryString = `SELECT p.id,  p.id_blog, bg.title as 'blog_name', p.name,  p.email,  p.comment  FROM blog_comments as p INNER JOIN blog as bg on p.id_blog = bg.id ORDER BY p.id DESC LIMIT 1`;
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
    const queryString = `SELECT p.id,  p.id_blog, bg.title as 'blog_name', p.name,  p.email,  p.comment  FROM blog_comments as p INNER JOIN blog as bg on p.id_blog = bg.id ORDER BY p.id DESC`;
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
    const queryString = `SELECT p.id,  p.id_blog, bg.title as 'blog_name', p.name,  p.email,  p.comment  FROM blog_comments as p INNER JOIN blog as bg on p.id_blog = bg.id WHERE p.id = ${id}`;
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

  async findByIdBlog(id_blog) {
    let response;
    const queryString = `SELECT p.id,  p.id_blog, bg.title as 'blog_name', p.name,  p.email,  p.comment, DATE_FORMAT(p.created_at, "%Y-%m-%d") as 'dateblogc', DATE_FORMAT(p.created_at, "%k:%i %p") as 'hourblogc'  FROM blog_comments as p INNER JOIN blog as bg on p.id_blog = bg.id WHERE p.id_blog = ${id_blog} ORDER BY p.id DESC`;
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

  async search(value) {
    let response;
    const queryString = `SELECT p.id,  p.id_blog, bg.title as 'blog_name', p.name,  p.email,  p.comment  FROM blog_comments as p INNER JOIN blog as bg on p.id_blog = bg.id WHERE p.name LIKE "%${value}%" OR bg.title LIKE "%${value}%"`;
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

    const queryString2 = `INSERT INTO blog_comments (id_blog, name, email, comment) VALUES (${data.id_blog}, '${data.name}', '${data.email}', '${data.comment}')`;
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
    const queryString5 = `UPDATE blog_comments SET comment = '${data.comment}', updated_at = '${update}'  WHERE id = ${data.id}`;
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
    const queryString2 = `DELETE FROM blog_comments WHERE id = ${id}`;
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

module.exports = blogCommentsRepository;

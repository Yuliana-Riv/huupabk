"use strict";
var dayjs = require("dayjs");
const pool = require("../../db/appSQLClient");

class categoryRepository {
  async last() {
    let response;
    const queryString = `SELECT * FROM categories ORDER BY id DESC LIMIT 1`;
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
    const queryString = `SELECT * FROM categories WHERE name LIKE "%${value}%" ORDER BY id DESC`;
    try {
      response = await pool.query(queryString);
      if (response.length == 0) {
        response = "No se encontraron coincidencias";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async findCategories() {
    let response;
    const queryString = `SELECT * FROM categories ORDER BY id_parent`;
    try {
      response = await pool.query(queryString);
      response = await pool.query(queryString);
      if (response.length == 0) {
        response = "No se encontraron coincidencias";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async findCategoryById(id) {
    let response;
    const queryString = `SELECT * FROM categories WHERE id = ${id}`;
    try {
      response = await pool.query(queryString);
      if (response.length > 0) {
        response = response[0];
      } else {
        response = "Categoría no encontrada";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async findByParent(id) {
    let response;
    const queryString = `SELECT * FROM categories where id_parent = ${id}`;
    try {
      response = await pool.query(queryString);
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async create(name, id_parent) {
    let response;
    let result;
  
    const queryString = `SELECT * FROM categories WHERE id = ${id_parent}`;
    try {
      response = await pool.query(queryString);
      if (response.length > 0) {
        //validar que no exista la categoria en la bd
        const queryString = `SELECT * FROM categories WHERE name = '${name}' and id_parent = ${id_parent}`;
        try {
          response = await pool.query(queryString);
          result = response.length;
          if (result == 0) {
            const queryString2 = `INSERT INTO categories ( name, id_parent) VALUES ( '${name}',${id_parent} )`;
            try {
              response = await pool.query(queryString2);
              response = "success";
            } catch (error) {
              console.log(error);
              response = "error";
            }
          } else {
            response = "categoria ya registrada.";
          }
        } catch (error) {
          console.log(error);
          response = "error";
        }
      } else {
        response = "Categoría padre no encontrada.";
      }
    } catch (error) {
      console.log(error);
      response = "error";
    }

    return response;
  }

  async update(id, name, id_parent) {

    let result;
    let response;
    var update = dayjs().format("YYYY-MM-DD h:mm:ss");
    if (id == 1) {
      //modificar solo el nombre si es la categoria padre unica..
      const queryString = `SELECT * FROM categories WHERE id = ${id}`;
      try {
        response = await pool.query(queryString);
        if (response.length > 0) {
          response = response[0];
          //validar que no exista la categoria en la bd
        
          const queryString2 = `SELECT * FROM categories WHERE name = '${name}'  and  id_parent =  ${id_parent}`;
          try {
            response = await pool.query(queryString2);
            result = response.length;
            if (result == 0) {
              const queryString2 = `UPDATE categories SET name = '${name}', updated_at = '${update}'  WHERE id = ${id}`;
              try {
                response = await pool.query(queryString2);
                response = "success";
              } catch (error) {
                console.log(error);
                response = "error";
              }
            } else {
              response = "categoria ya registrada.";
            }
          } catch (error) {
            console.log(error);
            response = "error";
          }
        } else {
          response = "Categoría no encontrada.";
        }
      } catch (error) {
        console.log(error);
        response = "error";
      }
    } else {
      // no es la categoria padre unica..
      const queryString = `SELECT * FROM categories WHERE id = ${id_parent}`;
      try {
        response = await pool.query(queryString);
        if (response.length > 0) {
          const queryString = `SELECT * FROM categories WHERE id = ${id}`;
          try {
            response = await pool.query(queryString);
            if (response.length > 0) {
              response = response[0];
              //validar que no exista la categoria en la bd
              const queryString2 = `SELECT * FROM categories WHERE name = '${name}'  and  id_parent =  ${id_parent}`;
              try {
                response = await pool.query(queryString2);
               
                result = response.length;
                if (result == 0) {
                  const queryString2 = `UPDATE categories SET name = '${name}', id_parent = ${id_parent}, updated_at = '${update}'  WHERE id = ${id}`;
                  try {
                    response = await pool.query(queryString2);
                    response = "success";
                  } catch (error) {
                    console.log(error);
                    response = "error";
                  }
                } else {
                  response = "Categoría ya registrada.";
                }
              } catch (error) {
                console.log(error);
                response = "error";
              }
            } else {
              response = "Categoría no encontrada.";
            }
          } catch (error) {
            console.log(error);
            response = "error";
          }
        } else {
          response = "Categoría padre no encontrada.";
        }
      } catch (error) {
        console.log(error);
        response = "error";
      }
    }

    return response;
  }

  async delete(id) {
  

    let response;

    try { //existen categorias hijas.
      const queryString = `SELECT * FROM categories WHERE id = ${id}`;
      response = await pool.query(queryString);
      if (response.length == 0) return "Categoría no encontrada"
    } catch (error) {
      console.log(error);
      return "error [0]";
    }

    try { //existen categorias hijas.
      const queryString = `SELECT * FROM categories WHERE id_parent = ${id}`;
      response = await pool.query(queryString);
      if (response.length > 0) return "No se puede eliminar la categoría ya que existen categorías hijas."
    } catch (error) {
      console.log(error);
      return "error [1]";
    }

 
 
    try {
      const queryString2 = `SELECT * FROM product WHERE id_category = ${id}`;
      response = await pool.query(queryString2);
      if (response.length > 0) return  "No se puede eliminar la categoría ya que existen productos con dicha categoría.";
    } catch (error) {
      console.log(error);
      return"error [2]";
    }

    try {
      const queryString2 = `SELECT * FROM product_category WHERE id_category = ${id}`;
      response = await pool.query(queryString2);
      if (response.length > 0) return  "No se puede eliminar la categoría ya que existen productos con dicha categoría [2].";
    } catch (error) {
      console.log(error);
      return"error [2]";
    }


    
     
     try {
      const queryString3 = `DELETE FROM categories WHERE id = ${id}`;
       response = await pool.query(queryString3);
       if (response.affectedRows > 0) {
         response = "success";
       } 
     } catch (error) {
       console.log(error);
       response = "error";
     }

    return response;
  }
}

module.exports = categoryRepository;

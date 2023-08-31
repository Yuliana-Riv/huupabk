var productValModel = require("./productValModel");
var productValRepo = require("./productValRepo");

let validService = require("../../services/validator/validateParams");

var fs = require("fs");
var path = require("path");
const webp = require("webp-converter");
const controller = {
  last: async (req, res) => {
    const itemRepo = new productValModel();
    const modelItem = new productValRepo(itemRepo);

    let result = await modelItem.last();

    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";
    } else {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      result: result,
    });
  },
  findAll: async (req, res) => {
    const itemRepo = new productValModel();
    const modelItem = new productValRepo(itemRepo);

    let result = await modelItem.findAll();

    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";
    } else {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      result: result,
    });
  },
  findById: async (req, res) => {
    const itemRepo = new productValModel();
    const modelItem = new productValRepo(itemRepo);

    let id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }
    
    let result = await modelItem.findById(id);

    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";
    } else {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      result: result,
    });
  },
  findByIdProduct: async (req, res) => {
    const itemRepo = new productValModel();
    const modelItem = new productValRepo(itemRepo);

    let id_product = parseInt(req.params.id_product);

    if (isNaN(id_product)) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }
    let result = await modelItem.findByIdProduct(id_product);

    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";
    } else {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      result: result,
    });
  },
  search: async (req, res) => {
    const itemRepo = new productValModel();
    const modelItem = new productValRepo(itemRepo);

    let value = req.params.value;
    
    let result = await modelItem.search(value);
    console.log(result)
    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";
    } else {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      result: result,
    });
  },

  create: async (req, res) => {
    const itemRepo = new productValModel();
    const modelItem = new productValRepo(itemRepo);
    let { id_product, name, email, comment, valuation } = req.body;

    if (id_product == undefined || id_product == null || id_product == "") {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }

    if (name == undefined || name == null || name == "") {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }

    if (email == undefined || email == null || email == "") {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }

    if (valuation == undefined || valuation == null || valuation == "") {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }
    let arrco = comment.split(" ");

    for (let i = 0; i < arrco.length; i++) {
      let atagval = new RegExp(/<a(?=\s|>)(?!(?:[^>=]|=(['"])(?:(?!\1).)*\1)*?\href=['"])[^>]*>.*?<\/a>/g)
      let pageval = new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)
      let cval = arrco[i].includes('http')
      let cval1 = arrco[i].includes('https')
      let com = arrco[i].includes('com')
      let mx = arrco[i].includes('.mx')
      let gob = arrco[i].includes('.gob')
      let org = arrco[i].includes('.org')
      let co = arrco[i].includes('.co')
      let ru = arrco[i].includes('.ru')

      if (cval == true || cval1 == true || com == true || mx == true || gob == true || org == true || co == true || ru == true ) {
        return res.status(200).send({
          status: "error",
          message: "No se acepta enlaces.",
        });
      }

      if (atagval.test(arrco[i]) == true) {
        return res.status(200).send({
          status: "error",
          message: "No se acepta enlaces.",
        });
      }
      
      if (pageval.test(arrco[i]) == true) {
        return res.status(200).send({
          status: "error",
          message: "No se acepta enlaces.",
        }); /**/
      }
    }
    /*

    
    */
    let data = {
      id_product: id_product,
      name: name,
      email: email,
      comment: comment,
      valuation: valuation,
    };
    //guardar
    let result = await modelItem.create(data);
    let status = "success";

    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  update: async (req, res) => {
    const itemRepo = new productValModel();
    const modelItem = new productValRepo(itemRepo);
    let { id, comment, valuation } = req.body;

    if (id == undefined || id == null || id == "") {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }

    if (valuation == undefined || valuation == null || valuation == "") {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }
    let arrco = comment.split(" ");

    for (let i = 0; i < arrco.length; i++) {
      let atagval = new RegExp(/<a(?=\s|>)(?!(?:[^>=]|=(['"])(?:(?!\1).)*\1)*?\href=['"])[^>]*>.*?<\/a>/g)
      let pageval = new RegExp(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)
      let cval = arrco[i].includes('http')
      let cval1 = arrco[i].includes('https')
      let com = arrco[i].includes('com')
      let mx = arrco[i].includes('.mx')
      let gob = arrco[i].includes('.gob')
      let org = arrco[i].includes('.org')
      let co = arrco[i].includes('.co')
      let ru = arrco[i].includes('.ru')

      if (cval == true || cval1 == true || com == true || mx == true || gob == true || org == true || co == true || ru == true ) {
        return res.status(200).send({
          status: "error",
          message: "No se acepta enlaces.",
        });
      }

      if (atagval.test(arrco[i]) == true) {
        return res.status(200).send({
          status: "error",
          message: "No se acepta enlaces.",
        });
      }
      
      if (pageval.test(arrco[i]) == true) {
        return res.status(200).send({
          status: "error",
          message: "No se acepta enlaces.",
        }); /**/
      }
    }
    
    let data = {
      id: id,
      comment: comment,
      valuation: valuation,
    };
    //guardar
    let result = await modelItem.update(data);
    let status = "success";

    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  delete: async (req, res) => {
    const itemRepo = new productValModel();
    const modelItem = new productValRepo(itemRepo);
    let params = req.body;

    let id = params.id;

    if (isNaN(id) || id == undefined || id == "" || id == null) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = await modelItem.delete(id);

    let status = "success";
    result != "success" ? (status = "error") : status;

    return res.status(200).send({
      message: result,
      status: status,
    });
  },
};
module.exports = controller;

"use strict";
var productCatModel = require("./productCatModel");
var productCatRepo = require("./productCatRepo");
var stockModel =require( "../stock/model");
var stockRepo = require("../stock/repo");

var productModel = require("./model");
var productRepo = require("./repo");
let validService = require("../../services/validator/validateParams");

var validator = require("validator");
var fs = require("fs");
var path = require("path");
const webp = require("webp-converter");
const controller = {
  findAll: async (req, res) => {
    const itemRepo = new productCatRepo();
    const modelItem = new productCatModel(itemRepo);
    let result = await modelItem.findAll();

    let addStock = [];
    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";

      for (var i = 0; i < result.length; i++) {
        let model = {
          id: result[i].id,
          id_product: result[i].id_product,
          product_name: result[i].product_name,
          id_category: result[i].id_category,
          category_name: result[i].category_name,
        };

        addStock.push(model);
      }
    } else {
      status = "error";
      addStock = result;
    }

    return res.status(200).send({
      status: status,
      result: addStock,
    });
  },

  findByCategory: async (req, res) => {
    const itemRepo = new productCatRepo();
    const modelItem = new productCatModel(itemRepo);

    let id = parseInt(req.params.id);

    let result = [];
    result = await modelItem.findByCategory(id);

    let addStock = [];
    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";

      for (var i = 0; i < result.length; i++) {
        let model = {
          id: result[i].id,
          id_product: result[i].id_product,
          product_name: result[i].product_name,
          id_category: result[i].id_category,
          category_name: result[i].category_name,
        };
        addStock.push(model);
      }
    } else {
      status = "error";
      addStock = result;
    }

    return res.status(200).send({
      status: status,
      result: addStock,
    });
  },

  findByProduct: async (req, res) => {
    const itemRepo = new productCatRepo();
    const modelItem = new productCatModel(itemRepo);

    let id = parseInt(req.params.id);

    let result = [];
    result = await modelItem.findByProduct(id);

    let addStock = [];
    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";

      for (var i = 0; i < result.length; i++) {
        let model = {
          id: result[i].id,
          id_product: result[i].id_product,
          product_name: result[i].product_name,
          id_category: result[i].id_category,
          category_name: result[i].category_name,
        };
        addStock.push(model);
      }
    } else {
      status = "error";
      addStock = result;
    }

    return res.status(200).send({
      status: status,
      result: addStock,
    });
  },

  findById: async (req, res) => {
    const itemRepo = new productCatRepo();
    const modelItem = new productCatModel(itemRepo);

    let id = parseInt(req.params.id);
    const validate = new validService();

    let validid = validate.validNum(id);
    if (!validid) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = [];
    result = await modelItem.findById(id);
    let model;
    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";
      model = {
        id: result.id,
        id_product: result.id_product,
        product_name: result.product_name,
        id_category: result.id_category,
        category_name: result.category_name,
      };
    } else {
      status = "error";
      model = result;
    }
    

    return res.status(200).send({
      status: status,
      result: model,
    });
  },

  search: async (req, res) => {
    const itemRepo = new productCatRepo();
    const modelItem = new productCatModel(itemRepo);

    let search = req.params.search;

    let result = [];
    result = await modelItem.search(search);

    let addStock = [];
    let status;

    if (result != "No se encontraron coincidencias") {
      status = "success";

      for (var i = 0; i < result.length; i++) {
        let model = {
          id: result[i].id,
          id_product: result[i].id_product,
          product_name: result[i].product_name,
          id_category: result[i].id_category,
          category_name: result[i].category_name,
        };
        addStock.push(model);
      }
    } else {
      status = "error";
      addStock = result;
    }

    return res.status(200).send({
      status: status,
      result: addStock,
    });
  },

  create: async (req, res) => {
    const itemRepo = new productCatRepo();
    const modelItem = new productCatModel(itemRepo);
    let params = req.body;

    let status = "success";
    let message = "Categoria de producto creada con exito.";

    //* procedemos a validar primero el cupon.
    let validParams = validateParams(params);

    if (validParams.status == "error") {
      return res.status(200).send({
        status: validParams.status,
        result: validParams.result,
        message: validParams.message,
      });
    }

    let product_cat = {
      id_product: params.id_product,
      id_category: params.id_category,
    };

    /**VALIDAR CATEGORÍAS REPETIDAS */
    const itemProRepo = new productRepo();
    const modelProItem = new productModel(itemProRepo);

    
    let fbyp = await modelItem.findByCategory(params.id_category);

    if(Array.isArray(fbyp)){
        for (let i = 0; i < fbyp.length; i++) {
          if (fbyp[i].id_product == params.id_product) {
            return res.status(200).send({
              status: "error",
              message: "No se puede repetir la categoría",
            });
          }
        }
    }
    

    /**SI PASA VALIDACIÓN*/
    let result = await modelItem.create(product_cat);

    let added = "_";

    if (result != "success") {
      status = "error";
      message = result;
    } else {
      added = await modelItem.findByProduct(product_cat.id_product);
    }

    return res.status(200).send({
      status: status,
      message: message,
      added: added,
    });
  },

  update: async (req, res) => {
    const itemRepo = new productCatRepo();
    const modelItem = new productCatModel(itemRepo);
    let params = req.body;

    let status = "success";
    let message = "Categoria de producto creada con exito.";

    //* procedemos a validar primero el cupon.
    let validParams = validateParams(params);

    if (validParams.status == "error") {
      return res.status(200).send({
        status: validParams.status,
        result: validParams.result,
        message: validParams.message,
      });
    }

    let product_cat = {
      id: params.id,
      id_product: params.id_product,
      id_category: params.id_category,
    };

    let result = await modelItem.update(product_cat);

    let added = "_";

    if (result != "success") {
      status = "error";
      message = result;
    } else {
      added = await modelItem.findByProduct(product_cat.id_product);
    }

    return res.status(200).send({
      status: status,
      message: message,
      added: added,
    });
  },

  delete: async (req, res) => {
    const itemRepo = new productCatRepo();
    const modelItem = new productCatModel(itemRepo);
    let params = req.body;
    let result = "";
    let id = params.id;
  
    if (id == undefined || id == null || id == "") {
      return res.status(200).send({
        status: "error",
        message: "Dato no valido.",
      });
    }
    id = parseInt(id);

    let item = await modelItem.findById(id);
    if (item == "No se encontraron coincidencias" || item == "error") {
      return res.status(200).send({
        status: "error",
        message: "Item no valido.",
      });
    }

    result = await modelItem.delete(id);
    let status = "success";

    result != "success" ? (status = "error") : status;

    return res.status(200).send({
      message: result,
      status: status,
      item,
    });
  },
};

let validateParams = (params) => {
  let { id_product, id_category } = params;

  /*if (id == undefined || id == "" || id == null) {
    return {
      status: "error",
      message: "Valor no validos.",
      result: 2,
    };
  }*/

  if (id_product == undefined || id_product == "" || id_product == null) {
    return {
      status: "error",
      message: "Valor no validos.",
      result: 2,
    };
  }

  if (id_category == undefined || id_category == "" || id_category == null) {
    return {
      status: "error",
      message: "Valor no validos.",
      result: 3,
    };
  }

  return {
    status: "success",
    message: "Datos validos.",
    result: 0,
  };
  //code
};

module.exports = controller;

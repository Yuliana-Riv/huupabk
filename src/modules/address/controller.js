"use strict";
var addressModel = require("../address/model");
var addressRepo = require("../address/repo");

let validService = require("../../services/validator/validateParams");

var validator = require("validator");
var fs = require("fs");
var path = require("path");
const webp = require("webp-converter");
const controller = {
  getAll: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);

    let address = await modelItem.getAll();
    let status = "success";
    let message = "Address";

    if (address == "No se encontraron coincidencias." || address == "error") {
      status = "error";
      message = address;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: address,
    });
  },

  getById: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);
    let id = parseInt(req.params.id);
    const validate = new validService();

    let validid = validate.validNum(id);

    if (!validid) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = await modelItem.getById(id);

    let status;
    let model = {};

    if (result != "No se encontraron coincidencias") {
      status = "success";
      model = {
        id: result.id,
        id_user: result.id_user,
        title: result.title,
        address: result.address,
        ref: result.ref,
        zip: result.zip,
        city: result.city,
        state: result.state,
        country: result.country,
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

  getByUser: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);
    let id_user = parseInt(req.params.id_user);
    const validate = new validService();
    let validid = validate.validNum(id_user);

    if (!validid) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = [];
    result = await modelItem.getByUser(id_user);

    let arrayU = [];
    let status;
    if (result != "No se encontraron coincidencias.") {
      status = "success";
      for (var i = 0; i < result.length; i++) {
        let model = {
          id: result[i].id,
          id_user: result[i].id_user,
          title: result[i].title,
          address: result[i].address,
          ref: result[i].ref,
          zip: result[i].zip,
          city: result[i].city,
          state: result[i].state,
          country: result[i].country,
        };
        arrayU.push(model)
      }
    } else {
      status = "error";
      arrayU = "No se encontraron coincidencias.";
    }
    console.log(status);

    return res.status(200).send({
      status: status,
      result: arrayU,
    });
  },

  search: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);

    let search = req.params.search;
    let address = await modelItem.search(search);
    console.log(address);
    let status = "success";
    let message = "Se han encontrado coincidencias.";

    if (address == "No se encontraron coincidencias." || address == "error") {
      status = "error";
      message = address;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: address,
    });
  },
  create: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);

    let { /*id */ id_user, title, address, ref, zip, city, state, country } =
      req.body;

    const validate = new validService();

    //let validate_id = validate.validNum(id);
    let validate_id_user = validate.validNum(id_user);
    let validate_title = validate.validParam(title);
    let validate_address = validate.validParam(address);
    let validate_ref = validate.validParam(ref);
    let validate_zip = validate.validNum(zip);
    let validate_city = validate.validParam(city);
    let validate_state = validate.validParam(state);
    let validate_country = validate.validParam(country);

    if (
      //!validate_id ||
      !validate_id_user ||
      !validate_title ||
      !validate_address ||
      !validate_ref ||
      !validate_zip ||
      !validate_city ||
      !validate_state ||
      !validate_country
    ) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
      });
    }

    id_user = parseInt(id_user);
    zip = parseInt(zip);

    let data = {
      //id,
      id_user,
      title,
      address,
      ref,
      zip,
      city,
      state,
      country,
    };
    let product = await modelItem.create(data);
    let status = "success";

    let added = "_";

    if (product != "success") {
      status = "error";
    } else {
      added = await modelItem.last();

      let model = {
        //id: added.id,
        id_user: added.id_user,
        title: added.title,
        address: added.address,
        ref: added.ref,
        zip: added.zip,
        city: added.city,
        state: added.state,
        country: added.country,
      };
      added = model;
    }

    return res.status(200).send({
      status: status,
      message: product,
      added: added,
    });
  },

  update: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);
    let { id, title, address, ref, zip, city, state, country } = req.body;

    const validate = new validService();

    let validate_title = validate.validParam(title);
    let validate_address = validate.validParam(address);
    let validate_ref = validate.validParam(ref);
    let validate_zip = validate.validNum(zip);
    let validate_city = validate.validParam(city);
    let validate_state = validate.validParam(state);
    let validate_country = validate.validParam(country);

    let validate_id = validate.validNum(id);

    /**/ if (!validate_id) {
      return res.status(200).send({
        status: "error",
        message: "Formato no valido.",
      });
    }

    let addressing = await modelItem.getById(id);

    if (
      addressing == "No se encontraron coincidencias" ||
      addressing == "error"
    ) {
      return res.status(200).send({
        status: "error",
        message: "Dirección no valida.",
      });
    }

    !validate_title ? (title = addressing.title) : title;
    !validate_address ? (address = addressing.address) : address;
    !validate_ref ? (ref = addressing.ref) : ref;
    !validate_zip ? (zip = addressing.zip) : zip;
    !validate_city ? (city = addressing.city) : city;
    !validate_state ? (state = addressing.state) : state;
    !validate_country ? (country = addressing.country) : country;

    zip = parseFloat(zip);

    let data = {
      id,
      title,
      address,
      ref,
      zip,
      city,
      state,
      country,
    };

    let result = await modelItem.update(data);
    let status = "success";

    if (result != "success") {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      message: result,
      data: data,
    });
  },

  delete: async (req, res) => {
    const itemRepo = new addressRepo();
    const modelItem = new addressModel(itemRepo);
    let params = req.body;
    let payload = req.user;

    if (payload == undefined || payload == "") {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos.",
      });
    }

    let id = parseInt(params.id);
    if (id == undefined || isNaN(id)) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let users = await modelItem.getById(id);
    if (users == "error" || users == "No se encontraron coincidencias.") {
      return res.status(200).send({
        status: "error",
        message: "Id no encontrado.",
      });
    }

    let result = await modelItem.delete(id);
    let message;
    let status = "success";

    if (result == "success") {
      message = "Dirección eliminada";
    } else {
      status = "error";
      message = result;
    }

    return res.status(200).send({
      message: message,
      status: status,
    });
  },
};

module.exports = controller;

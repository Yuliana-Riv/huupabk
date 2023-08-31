"use strict";
var productModel = require("./model");
var productRepo = require("./repo");

var productCatModel = require("./productCatModel");
var productCatRepo = require("./productCatRepo");

var stockModel = require("../stock/model");
var stockRepo = require("../stock/repo");

var atributoModel =require( "./atributoModel");
var atributoRepo = require("./atributoRepo");


let validService = require("../../services/validator/validateParams");

var validator = require("validator");
var fs = require("fs");
var path = require("path");
const webp = require("webp-converter"); 
const controller = {
  findAll: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
    let result = await modelItem.findAll();

    let addStock = [];
    let status;

    if (Array.isArray(result)) {
      status = "success";

      for (var i = 0; i < result.length; i++) {
        let reorderImg = [];
        if (
          result[i].image != "" &&
          result[i].image != null &&
          result[i].image != undefined
        ) {
          let img = {
            image: result[i].image,
            id: null,
            type: "primera",
            id_product: result[i].id,
          };
          reorderImg.push(img);
        }

        let imagenes = await modelItem.findImagesProd(result[i].id);
        if (
          imagenes == "No se encontraron coincidencias" ||
          imagenes == "error"
        ) {
          imagenes = "No se encontraron coincidencias";
        } else {
          if (imagenes.length > 0) {
            for (var k = 0; k < imagenes.length; k++) {
              reorderImg.push({
                image: imagenes[k].image,
                id: imagenes[k].id,
                type: "Imagenes",
                id_product: imagenes[k].id_product,
              });
            }
          }
        }

        const itemSRepo = new stockRepo();
        const modelSItem = new stockModel(itemSRepo);
        let stock = await modelSItem.getByProduct(result[i].id);

        if (stock == "No se encontraron coincidencias." || stock == "error") {
          stock = "Sin stock";
        } else {
          let cant = 0;
          for (const item of stock) {
            cant += item.stock;
          }
          stock = cant;
        }

        const itemRepo2 = new productCatRepo();
        const modelItem2 = new productCatModel(itemRepo2);
        let prod_cat = await modelItem2.findByProduct(result[i].id);

        if (
          prod_cat == "No se encontraron coincidencias" ||
          prod_cat == "error"
        ) {
          prod_cat = "Sin categorías extra";
        }

        let masvendido = "No";

        for (let i = 0; i < prod_cat.length; i++) {
          if (prod_cat[i].category_name == "LO MAS VENDIDO") {
            masvendido = "Si";
          }
        }

        /*if (prod_cat == "Sin categorías extra") {
          masvendido = "No";
        }*/

        const product_atributo_valores = await modelItem.getAttValuesByProd(
          result[i].id
        );

        const product_variantes = await modelItem.getVariantes(result[i].id);
        let filt = [];
        for (const item of product_variantes) {
          if (result[i].id == item.id_product) {
            const producto = await productById(item.id_variante);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          } else {
            const producto = await productById(item.id_product);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          }
        }

        let atributosFilt = [];

        for (const item of product_atributo_valores) {
          const att = atributosFilt.filter(
            (item2) => item2.atributo == item.atributo
          );

          if (att.length > 0) {
            const encontrado = att[0];
            let values = [];
            for (const value of encontrado.values) {
              values.push(value);
            }

            if (!values.includes(item.valor)) {
              values.push(item.valor);
            }

            const newatt = {
              atributo: encontrado.atributo,
              values: values,
              sel: encontrado.sel,
            };

            let arr = [];
            for (const att of atributosFilt) {
              if (att.atributo != encontrado.atributo) arr.push(att);
            }
            arr.push(newatt);
            atributosFilt = arr;
          } else {
            atributosFilt.push({
              atributo: item.atributo,
              values: [item.valor],
              sel: item.valor,
            });
          }
        }

        for (const obj of filt) {
          for (const item of obj.producto.product_atributo_valores) {
            const att = atributosFilt.filter(
              (item2) => item2.atributo == item.atributo
            );

            if (att.length > 0) {
              const encontrado = att[0];
              let values = [];
              for (const value of encontrado.values) {
                values.push(value);
              }

              if (!values.includes(item.valor)) {
                values.push(item.valor);
              }
              const newatt = {
                atributo: encontrado.atributo,
                values: values,
                sel: encontrado.sel,
              };

              let arr = [];
              for (const att of atributosFilt) {
                if (att.atributo != encontrado.atributo) arr.push(att);
              }
              arr.push(newatt);
              atributosFilt = arr;
            } else {
              atributosFilt.push({
                atributo: item.atributo,
                values: [item.valor],
                sel: "",
              });
            }
          }
        }

        let model = {
          id: result[i].id,
          id_category: result[i].id_category,
          //id_brand: result[i].id_brand,
          category_name: result[i].category_name,
          //  "parent_cat_name": result[i].parent_cat_name,
          //brand_name: result[i].brand_name,
          descrp: result[i].descrp,
          url: result[i].url,
          name: result[i].name,
          status: result[i].status,
          image: result[i].image,
          price: result[i].price,
          code: result[i].code,
          skd_weight: result[i].skd_weight,
          skd_height: result[i].skd_height,
          skd_width: result[i].skd_width,
          skd_length: result[i].skd_length,
          skd_class: result[i].skd_class,
          skd_class_descrp: result[i].skd_class_descrp,
          imagenes: reorderImg,
          stock: stock,
          product_categories: prod_cat,
          lomasvendido: masvendido,
          product_atributo_valores,
          product_variantes: filt,
          atributosFilt,
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
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

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
    result = await modelItem.findByCategory(id);

    let addStock = [];
    let status;

    if (Array.isArray(result)) {
      status = "success";

      for (var i = 0; i < result.length; i++) {
        let reorderImg = [];
        if (
          result[i].image != "" &&
          result[i].image != null &&
          result[i].image != undefined
        ) {
          let img = {
            image: result[i].image,
            id: null,
            type: "primera",
            id_product: result[i].id,
          };
          reorderImg.push(img);
        }

        let imagenes = await modelItem.findImagesProd(result[i].id);
        if (
          imagenes == "No se encontraron coincidencias" ||
          imagenes == "error"
        ) {
          imagenes = "No se encontraron coincidencias";
        } else {
          if (imagenes.length > 0) {
            for (var k = 0; k < imagenes.length; k++) {
              reorderImg.push({
                image: imagenes[k].image,
                id: imagenes[k].id,
                type: "Imagenes",
                id_product: imagenes[k].id_product,
              });
            }
          }
        }

        const itemSRepo = new stockRepo();
        const modelSItem = new stockModel(itemSRepo);
        let stock = await modelSItem.getByProduct(result[i].id);

        if (stock == "No se encontraron coincidencias." || stock == "error") {
          stock = "Sin stock";
        } else {
          let cant = 0;
          for (const item of stock) {
            cant += item.stock;
          }
          stock = cant;
        }

        const itemRepo2 = new productCatRepo();
        const modelItem2 = new productCatModel(itemRepo2);
        let prod_cat = await modelItem2.findByProduct(result[i].id);

        if (
          prod_cat == "No se encontraron coincidencias" ||
          prod_cat == "error"
        ) {
          prod_cat = "Sin categorías extra";
        }

        const product_atributo_valores = await modelItem.getAttValuesByProd(
          result[i].id
        );

        const product_variantes = await modelItem.getVariantes(result[i].id);
        let filt = [];
        for (const item of product_variantes) {
          if (result[i].id == item.id_product) {
            const producto = await productById(item.id_variante);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          } else {
            const producto = await productById(item.id_product);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          }
        }

        let atributosFilt = [];

        for (const item of product_atributo_valores) {
          const att = atributosFilt.filter(
            (item2) => item2.atributo == item.atributo
          );

          if (att.length > 0) {
            const encontrado = att[0];
            let values = [];
            for (const value of encontrado.values) {
              values.push(value);
            }

            if (!values.includes(item.valor)) {
              values.push(item.valor);
            }

            const newatt = {
              atributo: encontrado.atributo,
              values: values,
              sel: encontrado.sel,
            };

            let arr = [];
            for (const att of atributosFilt) {
              if (att.atributo != encontrado.atributo) arr.push(att);
            }
            arr.push(newatt);
            atributosFilt = arr;
          } else {
            atributosFilt.push({
              atributo: item.atributo,
              values: [item.valor],
              sel: item.valor,
            });
          }
        }

        for (const obj of filt) {
          for (const item of obj.producto.product_atributo_valores) {
            const att = atributosFilt.filter(
              (item2) => item2.atributo == item.atributo
            );

            if (att.length > 0) {
              const encontrado = att[0];
              let values = [];
              for (const value of encontrado.values) {
                values.push(value);
              }

              if (!values.includes(item.valor)) {
                values.push(item.valor);
              }
              const newatt = {
                atributo: encontrado.atributo,
                values: values,
                sel: encontrado.sel,
              };

              let arr = [];
              for (const att of atributosFilt) {
                if (att.atributo != encontrado.atributo) arr.push(att);
              }
              arr.push(newatt);
              atributosFilt = arr;
            } else {
              atributosFilt.push({
                atributo: item.atributo,
                values: [item.valor],
                sel: "",
              });
            }
          }
        }

        let model = {
          id: result[i].id,
          id_category: result[i].id_category,
          //id_brand: result[i].id_brand,
          category_name: result[i].category_name,
          //  "parent_cat_name": result[i].parent_cat_name,
          //brand_name: result[i].brand_name,
          descrp: result[i].descrp,
          url: result[i].url,
          name: result[i].name,
          status: result[i].status,
          image: result[i].image,
          price: result[i].price,
          code: result[i].code,
          skd_weight: result[i].skd_weight,
          skd_height: result[i].skd_height,
          skd_width: result[i].skd_width,
          skd_length: result[i].skd_length,
          skd_class: result[i].skd_class,
          skd_class_descrp: result[i].skd_class_descrp,
          imagenes: reorderImg,
          stock: stock,
          product_categories: prod_cat,
          product_atributo_valores,
          product_variantes: filt,
          atributosFilt,
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

  findByCategoryName: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

    let name = req.params.name;
    const validate = new validService();

    let validname = validate.validParam(name);

    if (!validname) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = [];

    let titlecvt = name.replace(/-/g, " ");
    result = await modelItem.findByCategoryName(titlecvt);

    /**const repoStock = new stockRepo();
    const modelStock = new stockModel( repoStock);**/

    let addStock = [];
    let status;

    if (Array.isArray(result)) {
      status = "success";

      for (var i = 0; i < result.length; i++) {
        let reorderImg = [];
        if (
          result[i].image != "" &&
          result[i].image != null &&
          result[i].image != undefined
        ) {
          let img = {
            image: result[i].image,
            id: null,
            type: "primera",
            id_product: result[i].id,
          };
          reorderImg.push(img);
        }

        let imagenes = await modelItem.findImagesProd(result[i].id);
        if (
          imagenes == "No se encontraron coincidencias" ||
          imagenes == "error"
        ) {
          imagenes = "No se encontraron coincidencias";
        } else {
          if (imagenes.length > 0) {
            for (var k = 0; k < imagenes.length; k++) {
              reorderImg.push({
                image: imagenes[k].image,
                id: imagenes[k].id,
                type: "Imagenes",
                id_product: imagenes[k].id_product,
              });
            }
          }
        }

        const itemSRepo = new stockRepo();
        const modelSItem = new stockModel(itemSRepo);
        let stock = await modelSItem.getByProduct(result[i].id);

        if (stock == "No se encontraron coincidencias." || stock == "error") {
          stock = "Sin stock";
        } else {
          let cant = 0;
          for (const item of stock) {
            cant += item.stock;
          }
          stock = cant;
        }

        const itemRepo2 = new productCatRepo();
        const modelItem2 = new productCatModel(itemRepo2);
        let prod_cat = await modelItem2.findByProduct(result[i].id);

        if (
          prod_cat == "No se encontraron coincidencias" ||
          prod_cat == "error"
        ) {
          prod_cat = "Sin categorías extra";
        }

        const product_atributo_valores = await modelItem.getAttValuesByProd(
          result[i].id
        );

        const product_variantes = await modelItem.getVariantes(result[i].id);
        let filt = [];
        for (const item of product_variantes) {
          if (result[i].id == item.id_product) {
            const producto = await productById(item.id_variante);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          } else {
            const producto = await productById(item.id_product);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          }
        }

        let atributosFilt = [];

        for (const item of product_atributo_valores) {
          const att = atributosFilt.filter(
            (item2) => item2.atributo == item.atributo
          );

          if (att.length > 0) {
            const encontrado = att[0];
            let values = [];
            for (const value of encontrado.values) {
              values.push(value);
            }

            if (!values.includes(item.valor)) {
              values.push(item.valor);
            }

            const newatt = {
              atributo: encontrado.atributo,
              values: values,
              sel: encontrado.sel,
            };

            let arr = [];
            for (const att of atributosFilt) {
              if (att.atributo != encontrado.atributo) arr.push(att);
            }
            arr.push(newatt);
            atributosFilt = arr;
          } else {
            atributosFilt.push({
              atributo: item.atributo,
              values: [item.valor],
              sel: item.valor,
            });
          }
        }

        for (const obj of filt) {
          for (const item of obj.producto.product_atributo_valores) {
            const att = atributosFilt.filter(
              (item2) => item2.atributo == item.atributo
            );

            if (att.length > 0) {
              const encontrado = att[0];
              let values = [];
              for (const value of encontrado.values) {
                values.push(value);
              }

              if (!values.includes(item.valor)) {
                values.push(item.valor);
              }
              const newatt = {
                atributo: encontrado.atributo,
                values: values,
                sel: encontrado.sel,
              };

              let arr = [];
              for (const att of atributosFilt) {
                if (att.atributo != encontrado.atributo) arr.push(att);
              }
              arr.push(newatt);
              atributosFilt = arr;
            } else {
              atributosFilt.push({
                atributo: item.atributo,
                values: [item.valor],
                sel: "",
              });
            }
          }
        }

        let model = {
          id: result[i].id,
          id_category: result[i].id_category,
          //id_brand: result[i].id_brand,
          category_name: result[i].category_name,
          //  "parent_cat_name": result[i].parent_cat_name,
          //brand_name: result[i].brand_name,
          descrp: result[i].descrp,
          url: result[i].url,
          name: result[i].name,
          status: result[i].status,
          image: result[i].image,
          price: result[i].price,
          code: result[i].code,
          skd_weight: result[i].skd_weight,
          skd_height: result[i].skd_height,
          skd_width: result[i].skd_width,
          skd_length: result[i].skd_length,
          skd_class: result[i].skd_class,
          skd_class_descrp: result[i].skd_class_descrp,
          imagenes: reorderImg,
          stock: stock,
          product_categories: prod_cat,
          product_atributo_valores,
          product_variantes: filt,
          atributosFilt,
        };

        addStock.push(model);
      }
    } else {
      status = "error";
      addStock = [];
    }

    return res.status(200).send({
      status: status,
      result: addStock,
    });
  },

  findById: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
    let id = parseInt(req.params.id);
    const validate = new validService();

    let validid = validate.validNum(id);

    if (!validid) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = await modelItem.findById(id);

    let status;
    let model;

    if (result != "No se encontraron coincidencias") {
      status = "success";

      let reorderImg = [];
      if (
        result.image != "" &&
        result.image != null &&
        result.image != undefined
      ) {
        let img = {
          image: result.image,
          id: null,
          type: "primera",
          id_product: result.id,
        };
        reorderImg.push(img);
      }

      let imagenes = await modelItem.findImagesProd(result.id);
      if (
        imagenes == "No se encontraron coincidencias" ||
        imagenes == "error"
      ) {
        imagenes = "No se encontraron coincidencias";
      } else {
        if (imagenes.length > 0) {
          for (var k = 0; k < imagenes.length; k++) {
            reorderImg.push({
              image: imagenes[k].image,
              id: imagenes[k].id,
              type: "Imagenes",
              id_product: imagenes[k].id_product,
            });
          }
        }
      }

      const itemSRepo = new stockRepo();
      const modelSItem = new stockModel(itemSRepo);
      let stock = await modelSItem.getByProduct(result.id);

      if (stock == "No se encontraron coincidencias." || stock == "error") {
        stock = "Sin stock";
      } else {
        let cant = 0;
        for (const item of stock) {
          cant += item.stock;
        }
        stock = cant;
      }

      const itemRepo2 = new productCatRepo();
      const modelItem2 = new productCatModel(itemRepo2);
      let prod_cat = await modelItem2.findByProduct(result.id);

      if (
        prod_cat == "No se encontraron coincidencias" ||
        prod_cat == "error"
      ) {
        prod_cat = "Sin categorías extra";
      }

      const product_atributo_valores = await modelItem.getAttValuesByProd(
        result.id
      );

      const product_variantes = await modelItem.getVariantes(result.id);
      let filt = [];
      for (const item of product_variantes) {
        if (result.id == item.id_product) {
          const producto = await productById(item.id_variante);

          if (producto.id) {
            filt.push({
              ...item,
              producto,
            });
          }
        } else {
          const producto = await productById(item.id_product);

          if (producto.id) {
            filt.push({
              ...item,
              producto,
            });
          }
        }
      }

      let atributosFilt = [];

      for (const item of product_atributo_valores) {
        const att = atributosFilt.filter(
          (item2) => item2.atributo == item.atributo
        );

        if (att.length > 0) {
          const encontrado = att[0];
          let values = [];
          for (const value of encontrado.values) {
            values.push(value);
          }

          if (!values.includes(item.valor)) {
            values.push(item.valor);
          }

          const newatt = {
            atributo: encontrado.atributo,
            values: values,
            sel: encontrado.sel,
          };

          let arr = [];
          for (const att of atributosFilt) {
            if (att.atributo != encontrado.atributo) arr.push(att);
          }
          arr.push(newatt);
          atributosFilt = arr;
        } else {
          atributosFilt.push({
            atributo: item.atributo,
            values: [item.valor],
            sel: item.valor,
          });
        }
      }

      for (const obj of filt) {
        for (const item of obj.producto.product_atributo_valores) {
          const att = atributosFilt.filter(
            (item2) => item2.atributo == item.atributo
          );

          if (att.length > 0) {
            const encontrado = att[0];
            let values = [];
            for (const value of encontrado.values) {
              values.push(value);
            }

            if (!values.includes(item.valor)) {
              values.push(item.valor);
            }
            const newatt = {
              atributo: encontrado.atributo,
              values: values,
              sel: encontrado.sel,
            };

            let arr = [];
            for (const att of atributosFilt) {
              if (att.atributo != encontrado.atributo) arr.push(att);
            }
            arr.push(newatt);
            atributosFilt = arr;
          } else {
            atributosFilt.push({
              atributo: item.atributo,
              values: [item.valor],
              sel: "",
            });
          }
        }
      }

      model = {
        id: result.id,
        id_category: result.id_category,
        //id_brand: result.id_brand,
        category_name: result.category_name,
        // "parent_cat_name": result.parent_cat_name,
        //brand_name: result.brand_name,
        descrp: result.descrp,
        url: result.url,
        name: result.name,
        status: result.status,
        image: result.image,
        price: result.price,
        code: result.code,
        imagenes: reorderImg,
        stock: stock,
        product_categories: prod_cat,
        product_atributo_valores,
        product_variantes: filt,
        atributosFilt,
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

  findByUrl: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
    let url = req.params.url;
console.log('entramos')
    const validate = new validService();

    let validurl = validate.validParam(url);

    if (!validurl) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = await modelItem.findByUrl(url);

    let status;
    let model;

    if (result != "No se encontraron coincidencias") {
      status = "success";

      let reorderImg = [];
      if (
        result.image != "" &&
        result.image != null &&
        result.image != undefined
      ) {
        let img = {
          image: result.image,
          id: null,
          type: "primera",
          id_product: result.id,
        };
        reorderImg.push(img);
      }

      let imagenes = await modelItem.findImagesProd(result.id);
      if (
        imagenes == "No se encontraron coincidencias" ||
        imagenes == "error"
      ) {
        imagenes = "No se encontraron coincidencias";
      } else {
        if (imagenes.length > 0) {
          for (var k = 0; k < imagenes.length; k++) {
            reorderImg.push({
              image: imagenes[k].image,
              id: imagenes[k].id,
              type: "Imagenes",
              id_product: imagenes[k].id_product,
            });
          }
        }
      }

      const itemSRepo = new stockRepo();
      const modelSItem = new stockModel(itemSRepo);
      let stock = await modelSItem.getByProduct(result.id);

      if (stock == "No se encontraron coincidencias." || stock == "error") {
        stock = "Sin stock";
      } else {
        let cant = 0;
        for (const item of stock) {
          cant += item.stock;
        }
        stock = cant;
      }

      const itemRepo2 = new productCatRepo();
      const modelItem2 = new productCatModel(itemRepo2);
      let prod_cat = await modelItem2.findByProduct(result.id);

      if (
        prod_cat == "No se encontraron coincidencias" ||
        prod_cat == "error"
      ) {
        prod_cat = "Sin categorías extra";
      }

      const product_atributo_valores = await modelItem.getAttValuesByProd(
        result.id
      );

      const product_variantes = await modelItem.getVariantes(result.id);
      let filt = [];
      for (const item of product_variantes) {
        if (result.id == item.id_product) {
          const producto = await productById(item.id_variante);

          if (producto.id) {
            filt.push({
              ...item,
              producto,
            });
          }
        } else {
          const producto = await productById(item.id_product);

          if (producto.id) {
            filt.push({
              ...item,
              producto,
            });
          }
        }
      }

      let atributosFilt = [];

      for (const item of product_atributo_valores) {
        const att = atributosFilt.filter(
          (item2) => item2.atributo == item.atributo
        );

        if (att.length > 0) {
          const encontrado = att[0];
          let values = [];
          for (const value of encontrado.values) {
            values.push(value);
          }

          if (!values.includes(item.valor)) {
            values.push(item.valor);
          }

          const newatt = {
            atributo: encontrado.atributo,
            values: values,
            sel: encontrado.sel,
          };

          let arr = [];
          for (const att of atributosFilt) {
            if (att.atributo != encontrado.atributo) arr.push(att);
          }
          arr.push(newatt);
          atributosFilt = arr;
        } else {
          atributosFilt.push({
            atributo: item.atributo,
            values: [item.valor],
            sel: item.valor,
          });
        }
      }

      for (const obj of filt) {
        for (const item of obj.producto.product_atributo_valores) {
          const att = atributosFilt.filter(
            (item2) => item2.atributo == item.atributo
          );

          if (att.length > 0) {
            const encontrado = att[0];
            let values = [];
            for (const value of encontrado.values) {
              values.push(value);
            }

            if (!values.includes(item.valor)) {
              values.push(item.valor);
            }
            const newatt = {
              atributo: encontrado.atributo,
              values: values,
              sel: encontrado.sel,
            };

            let arr = [];
            for (const att of atributosFilt) {
              if (att.atributo != encontrado.atributo) arr.push(att);
            }
            arr.push(newatt);
            atributosFilt = arr;
          } else {
            atributosFilt.push({
              atributo: item.atributo,
              values: [item.valor],
              sel: "",
            });
          }
        }
      }

      model = {
        id: result.id,
        id_category: result.id_category,
        //id_brand: result.id_brand,
        category_name: result.category_name,
        // "parent_cat_name": result.parent_cat_name,
        //brand_name: result.brand_name,
        descrp: result.descrp,
        url: result.url,
        name: result.name,
        status: result.status,
        image: result.image,
        price: result.price,
        code: result.code,
        imagenes: reorderImg,
        stock: stock,
        product_categories: prod_cat,
        product_atributo_valores,
        product_variantes: filt,
        atributosFilt,
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
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
    let search = req.params.search;

    const validate = new validService();

    let validsearch = validate.validParam(search);

    if (!validsearch) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = await modelItem.search(search);

    let status;
    let addStock = [];

    if (result != "No se encontraron coincidencias") {
      status = "success";

      for (var i = 0; i < result.length; i++) {
        let reorderImg = [];
        if (
          result[i].image != "" &&
          result[i].image != null &&
          result[i].image != undefined
        ) {
          let img = {
            image: result[i].image,
            id: null,
            type: "primera",
            id_product: result[i].id,
          };
          reorderImg.push(img);
        }

        let imagenes = await modelItem.findImagesProd(result[i].id);
        if (
          imagenes == "No se encontraron coincidencias" ||
          imagenes == "error"
        ) {
          imagenes = "No se encontraron coincidencias";
        } else {
          if (imagenes.length > 0) {
            for (var k = 0; k < imagenes.length; k++) {
              reorderImg.push({
                image: imagenes[k].image,
                id: imagenes[k].id,
                type: "Imagenes",
                id_product: imagenes[k].id_product,
              });
            }
          }
        }

        const itemSRepo = new stockRepo();
        const modelSItem = new stockModel(itemSRepo);
        let stock = await modelSItem.getByProduct(result[i].id);

        if (stock == "No se encontraron coincidencias." || stock == "error") {
          stock = "Sin stock";
        } else {
          let cant = 0;
          for (const item of stock) {
            cant += item.stock;
          }
          stock = cant;
        }

        const itemRepo2 = new productCatRepo();
        const modelItem2 = new productCatModel(itemRepo2);
        let prod_cat = await modelItem2.findByProduct(result[i].id);

        if (
          prod_cat == "No se encontraron coincidencias" ||
          prod_cat == "error"
        ) {
          prod_cat = "Sin categorías extra";
        }

        const product_atributo_valores = await modelItem.getAttValuesByProd(
          result[i].id
        );

        const product_variantes = await modelItem.getVariantes(result[i].id);
        let filt = [];
        for (const item of product_variantes) {
          if (result[i].id == item.id_product) {
            const producto = await productById(item.id_variante);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          } else {
            const producto = await productById(item.id_product);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          }
        }

        let atributosFilt = [];

        for (const item of product_atributo_valores) {
          const att = atributosFilt.filter(
            (item2) => item2.atributo == item.atributo
          );

          if (att.length > 0) {
            const encontrado = att[0];
            let values = [];
            for (const value of encontrado.values) {
              values.push(value);
            }

            if (!values.includes(item.valor)) {
              values.push(item.valor);
            }

            const newatt = {
              atributo: encontrado.atributo,
              values: values,
              sel: encontrado.sel,
            };

            let arr = [];
            for (const att of atributosFilt) {
              if (att.atributo != encontrado.atributo) arr.push(att);
            }
            arr.push(newatt);
            atributosFilt = arr;
          } else {
            atributosFilt.push({
              atributo: item.atributo,
              values: [item.valor],
              sel: item.valor,
            });
          }
        }

        for (const obj of filt) {
          for (const item of obj.producto.product_atributo_valores) {
            const att = atributosFilt.filter(
              (item2) => item2.atributo == item.atributo
            );

            if (att.length > 0) {
              const encontrado = att[0];
              let values = [];
              for (const value of encontrado.values) {
                values.push(value);
              }

              if (!values.includes(item.valor)) {
                values.push(item.valor);
              }
              const newatt = {
                atributo: encontrado.atributo,
                values: values,
                sel: encontrado.sel,
              };

              let arr = [];
              for (const att of atributosFilt) {
                if (att.atributo != encontrado.atributo) arr.push(att);
              }
              arr.push(newatt);
              atributosFilt = arr;
            } else {
              atributosFilt.push({
                atributo: item.atributo,
                values: [item.valor],
                sel: "",
              });
            }
          }
        }

        let model = {
          id: result[i].id,
          id_category: result[i].id_category,
          //id_brand: result[i].id_brand,
          category_name: result[i].category_name,
          //   "parent_cat_name": result[i].parent_cat_name,
          //brand_name: result[i].brand_name,
          descrp: result[i].descrp,
          url: result[i].url,
          name: result[i].name,
          status: result[i].status,
          image: result[i].image,
          price: result[i].price,
          code: result[i].code,
          skd_weight: result[i].skd_weight,
          skd_height: result[i].skd_height,
          skd_width: result[i].skd_width,
          skd_length: result[i].skd_length,
          skd_class: result[i].skd_class,
          skd_class_descrp: result[i].skd_class_descrp,
          imagenes: reorderImg,
          stock: stock,
          product_categories: prod_cat,
          product_atributo_valores,
          product_variantes: filt,
          atributosFilt,
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

  createProductAttValue: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
    let { id_product, id_atributo_valor } = req.body;
    let payload = req.user;

    let status = "success";
    let message = "Valor agregado con exito.";
    let result = "";

    const validate = new validService();

    let validAdm = validate.validAdm(payload.role);

    if (payload == undefined || payload == "") {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos.",
        result: result,
      });
    }

    if (!validAdm) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
        result: result,
      });
    }

    let validid_product = validate.validNum(id_product);
    let validid_atributo_valor = validate.validNum(id_atributo_valor);
    if (!validid_product || !validid_atributo_valor) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos [2].",
        result: result,
      });
    }

    result = await modelItem.createProductAttValue({
      id_product,
      id_atributo_valor,
    });

    if (result != "success") {
      status = "error";
      message = result;
    }

    return res.status(200).send({
      message: message,
      status: status,
      result: result,
    });
  },

  createProductVariante: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
    let { id_product, id_variante } = req.body;
    let payload = req.user;

    let status = "success";
    let message = "Valor agregado con exito.";
    let result = "";

    const validate = new validService();

    let validAdm = validate.validAdm(payload.role);

    if (payload == undefined || payload == "") {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos.",
        result: result,
      });
    }

    if (!validAdm) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
        result: result,
      });
    }

    let validid_product = validate.validNum(id_product);
    let validid_variante = validate.validNum(id_variante);
    if (!validid_product || !validid_variante) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos [2].",
        result: result,
      });
    }

    result = await modelItem.createProductVariante({ id_product, id_variante });

    if (result != "success") {
      status = "error";
      message = result;
    }

    return res.status(200).send({
      message: message,
      status: status,
      result: result,
    });
  },

  create: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

    let {
      name,
      price,
      code,
      descrp,
      id_category,
      //id_brand,
      url,
      skd_weight,
      skd_height,
      skd_width,
      skd_length,
    } = req.body;

    const validate = new validService();

    let validate_name = validate.validParam(name);
    let validate_url = validate.validParam(url);
    let validate_price = validate.validNum(price);
    let validate_id_category = validate.validNum(id_category);
    //let validate_id_brand = validate.validNum(id_brand);
    let validate_descrp = validate.validParam(descrp);
    let validate_code = validate.validParam(code);

    let validate_skd_weight = validate.validNum(skd_weight);
    let validate_skd_height = validate.validNum(skd_height);
    let validate_skd_width = validate.validNum(skd_width);
    let validate_skd_length = validate.validNum(skd_length);

    if (
      !validate_name ||
      !validate_id_category ||
      !validate_descrp ||
      !validate_price ||
      !validate_url ||
      //!validate_id_brand ||
      !validate_skd_weight ||
      !validate_skd_height ||
      !validate_skd_width ||
      !validate_skd_length
    ) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
      });
    }

    !validate_code ? (code = "N/A") : code;

    price = parseFloat(price);
    id_category = parseInt(id_category);

    // IMAGEN
    let fileName = "Imagen no subida";
    //console.log(req.files)
    if (req.files != undefined && req.files.image != undefined) {
      let filePath = req.files.image.path;
      let fileSplit =
        filePath.split('/'); /**(/) for cpanel or ('\\') for local*/
      fileName = fileSplit[2];
      let extSplit = fileName.split(".");
      let fileExt = extSplit[1];
      fileExt = fileExt.toLowerCase();
      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        //guardar
        let data = {
          name,
          image: fileName,
          price,
          code,
          descrp,
          id_category,
          url,
          //id_brand,
          skd_weight,
          skd_height,
          skd_width,
          skd_length,
        };
        let product = await modelItem.create(data);
        let status = "success";

        let added = "_";
        if (product != "success") {
          status = "error";

          let img = fileName;

          let splitimg = img.split(".");
          let nimg = splitimg[0];
          nimg = nimg + ".webp";

          //let filePath2 = "uploads\\product\\" + nimg;
          let filePath2 = "uploads/product/" + nimg; //! linux
          fs.unlink(filePath2, (err) => {
            /*console.log(err)*/
          });

          //let filePath = "uploads\\product\\" + img;
          let filePath = "uploads/product/" + img; //! linux
          fs.unlink(filePath, (err) => {
            /*console.log(err)*/
          });
        } else {
          added = await modelItem.last();

          let reorderImg = [];
          if (
            added.image != "" &&
            added.image != null &&
            added.image != undefined
          ) {
            let img = {
              image: added.image,
              id: null,
              type: "primera",
              id_product: added.id,
            };
            reorderImg.push(img);
          }

          let imagenes = await modelItem.findImagesProd(added.id);
          if (
            imagenes == "No se encontraron coincidencias" ||
            imagenes == "error"
          ) {
            imagenes = "No se encontraron coincidencias";
          } else {
            if (imagenes.length > 0) {
              for (var k = 0; k < imagenes.length; k++) {
                reorderImg.push({
                  image: imagenes[k].image,
                  id: imagenes[k].id,
                  type: "Imagenes",
                  id_product: imagenes[k].id_product,
                });
              }
            }
          }

          const itemSRepo = new stockRepo();
          const modelSItem = new stockModel(itemSRepo);
          let stock = await modelSItem.getByProduct(added.id);

          if (stock == "No se encontraron coincidencias." || stock == "error") {
            stock = "Sin stock";
          } else {
            let cant = 0;
            for (const item of stock) {
              cant += item.stock;
            }
            stock = cant;
          }

          let data = { id_product: added.id, stock: 0 };
          let stockI = await modelSItem.create(data);

          const itemRepo2 = new productCatRepo();
          const modelItem2 = new productCatModel(itemRepo2);
          let prod_cat = await modelItem2.findByProduct(added.id);

          if (
            prod_cat == "No se encontraron coincidencias" ||
            prod_cat == "error"
          ) {
            prod_cat = "Sin categorías extra";
          }

          /*
          let data2 = {
            id_product:added.id,
            id_category:added.id_category,
          };
          let pro_cat = await modelItem2.create(data2); */
          const product_atributo_valores = await modelItem.getAttValuesByProd(
            added.id
          );

          const product_variantes = await modelItem.getVariantes(added.id);
          let filt = [];
          for (const item of product_variantes) {
            if (added.id == item.id_product) {
              const producto = await productById(item.id_variante);

              if (producto.id) {
                filt.push({
                  ...item,
                  producto,
                });
              }
            } else {
              const producto = await productById(item.id_product);

              if (producto.id) {
                filt.push({
                  ...item,
                  producto,
                });
              }
            }
          }

          let atributosFilt = [];

          for (const item of product_atributo_valores) {
            const att = atributosFilt.filter(
              (item2) => item2.atributo == item.atributo
            );

            if (att.length > 0) {
              const encontrado = att[0];
              let values = [];
              for (const value of encontrado.values) {
                values.push(value);
              }

              if (!values.includes(item.valor)) {
                values.push(item.valor);
              }

              const newatt = {
                atributo: encontrado.atributo,
                values: values,
                sel: encontrado.sel,
              };

              let arr = [];
              for (const att of atributosFilt) {
                if (att.atributo != encontrado.atributo) arr.push(att);
              }
              arr.push(newatt);
              atributosFilt = arr;
            } else {
              atributosFilt.push({
                atributo: item.atributo,
                values: [item.valor],
                sel: item.valor,
              });
            }
          }

          for (const obj of filt) {
            for (const item of obj.producto.product_atributo_valores) {
              const att = atributosFilt.filter(
                (item2) => item2.atributo == item.atributo
              );

              if (att.length > 0) {
                const encontrado = att[0];
                let values = [];
                for (const value of encontrado.values) {
                  values.push(value);
                }

                if (!values.includes(item.valor)) {
                  values.push(item.valor);
                }
                const newatt = {
                  atributo: encontrado.atributo,
                  values: values,
                  sel: encontrado.sel,
                };

                let arr = [];
                for (const att of atributosFilt) {
                  if (att.atributo != encontrado.atributo) arr.push(att);
                }
                arr.push(newatt);
                atributosFilt = arr;
              } else {
                atributosFilt.push({
                  atributo: item.atributo,
                  values: [item.valor],
                  sel: "",
                });
              }
            }
          }

          let model = {
            id: added.id,
            id_category: added.id_category,
            //id_brand: added.id_brand,
            category_name: added.category_name,
            //  "parent_cat_name": added.parent_cat_name,
            //brand_name: added.brand_name,
            descrp: added.descrp,
            url: added.url,
            name: added.name,
            status: added.status,
            image: added.image,
            price: added.price,
            code: added.code,
            skd_weight: added.skd_weight,
            skd_height: added.skd_height,
            skd_width: added.skd_width,
            skd_length: added.skd_length,
            skd_class: added.skd_class,
            skd_class_descrp: added.skd_class_descrp,
            imagenes: reorderImg,
            stock: stock,
            product_categories: prod_cat,
            product_atributo_valores,
            product_variantes: filt,
            atributosFilt,
          };

          added = model;
        }

        return res.status(200).send({
          status: status,
          message: product,
          added: added,
        });
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({
            status: "error",
            message: "Extensión no valida",
          });
        });
      }
    } else {
      let image = "gwIupRH0KFywmuqdeCWM4gMV.png";
      let data = {
        name,
        image,
        price,
        code,
        descrp,
        id_category,
        url,
        //id_brand,
        //id_brand,
        skd_weight,
        skd_height,
        skd_width,
        skd_length,
      };
      let product = await modelItem.create(data);
      let status = "success";

      let added = "_";

      if (product != "success") {
        status = "error";
      } else {
        added = await modelItem.last();

        let reorderImg = [];
        if (
          added.image != "" &&
          added.image != null &&
          added.image != undefined
        ) {
          let img = {
            image: added.image,
            id: null,
            type: "primera",
            id_product: added.id,
          };
          reorderImg.push(img);
        }
        let imagenes = await modelItem.findImagesProd(added.id);
        if (
          imagenes == "No se encontraron coincidencias" ||
          imagenes == "error"
        ) {
          imagenes = "No se encontraron coincidencias";
        } else {
          if (imagenes.length > 0) {
            for (var k = 0; k < imagenes.length; k++) {
              reorderImg.push({
                image: imagenes[k].image,
                id: imagenes[k].id,
                type: "Imagenes",
                id_product: imagenes[k].id_product,
              });
            }
          }
        }

        const itemSRepo = new stockRepo();
        const modelSItem = new stockModel(itemSRepo);
        let stock = await modelSItem.getByProduct(added.id);

        if (stock == "No se encontraron coincidencias." || stock == "error") {
          stock = "Sin stock";
        } else {
          let cant = 0;
          for (const item of stock) {
            cant += item.stock;
          }
          stock = cant;
        }

        let data = { id_product: added.id, stock: 0 };
        let stockI = await modelSItem.create(data);

        const itemRepo2 = new productCatRepo();
        const modelItem2 = new productCatModel(itemRepo2);
        let prod_cat = await modelItem2.findByProduct(added.id);

        if (
          prod_cat == "No se encontraron coincidencias" ||
          prod_cat == "error"
        ) {
          prod_cat = "Sin categorías extra";
        }

        /*
        let data2 = {
          id_product:added.id,
          id_category:added.id_category,
        };
        let pro_cat = await modelItem2.create(data2); */
        const product_atributo_valores = await modelItem.getAttValuesByProd(
          added.id
        );

        const product_variantes = await modelItem.getVariantes(added.id);
        let filt = [];
        for (const item of product_variantes) {
          if (added.id == item.id_product) {
            const producto = await productById(item.id_variante);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          } else {
            const producto = await productById(item.id_product);

            if (producto.id) {
              filt.push({
                ...item,
                producto,
              });
            }
          }
        }

        let atributosFilt = [];

        for (const item of product_atributo_valores) {
          const att = atributosFilt.filter(
            (item2) => item2.atributo == item.atributo
          );

          if (att.length > 0) {
            const encontrado = att[0];
            let values = [];
            for (const value of encontrado.values) {
              values.push(value);
            }

            if (!values.includes(item.valor)) {
              values.push(item.valor);
            }

            const newatt = {
              atributo: encontrado.atributo,
              values: values,
              sel: encontrado.sel,
            };

            let arr = [];
            for (const att of atributosFilt) {
              if (att.atributo != encontrado.atributo) arr.push(att);
            }
            arr.push(newatt);
            atributosFilt = arr;
          } else {
            atributosFilt.push({
              atributo: item.atributo,
              values: [item.valor],
              sel: item.valor,
            });
          }
        }

        for (const obj of filt) {
          for (const item of obj.producto.product_atributo_valores) {
            const att = atributosFilt.filter(
              (item2) => item2.atributo == item.atributo
            );

            if (att.length > 0) {
              const encontrado = att[0];
              let values = [];
              for (const value of encontrado.values) {
                values.push(value);
              }

              if (!values.includes(item.valor)) {
                values.push(item.valor);
              }
              const newatt = {
                atributo: encontrado.atributo,
                values: values,
                sel: encontrado.sel,
              };

              let arr = [];
              for (const att of atributosFilt) {
                if (att.atributo != encontrado.atributo) arr.push(att);
              }
              arr.push(newatt);
              atributosFilt = arr;
            } else {
              atributosFilt.push({
                atributo: item.atributo,
                values: [item.valor],
                sel: "",
              });
            }
          }
        }

        let model = {
          id: added.id,
          id_category: added.id_category,
          //id_brand: added.id_brand,
          category_name: added.category_name,
          //  "parent_cat_name": added.parent_cat_name,
          //brand_name: added.brand_name,
          descrp: added.descrp,
          url: added.url,
          name: added.name,
          status: added.status,
          image: added.image,
          price: added.price,
          code: added.code,
          skd_weight: added.skd_weight,
          skd_height: added.skd_height,
          skd_width: added.skd_width,
          skd_length: added.skd_length,
          skd_class: added.skd_class,
          skd_class_descrp: added.skd_class_descrp,
          imagenes: reorderImg,
          stock: stock,
          product_categories: prod_cat,
          product_atributo_valores,
          product_variantes: filt,
          atributosFilt,
        };
        added = model;
      }

      return res.status(200).send({
        status: status,
        message: product,
        added: added,
      });
    }
  },

  update: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

    const itemRepo2 = new productCatRepo();
    const modelItem2 = new productCatModel(itemRepo2);

    let {
      id,
      name,
      price,
      code,
      descrp,
      id_category,
      status_prod,
      url,
      //id_brand,
      skd_weight,
      skd_height,
      skd_width,
      skd_length,
    } = req.body;

    const validate = new validService();

    let validate_name = validate.validParam(name);
    let validate_status_prod = validate.validStatus(status_prod);
    let validate_url = validate.validParam(url);
    let validate_price = validate.validNum(price);
    let validate_id_category = validate.validNum(id_category);
    //let validate_id_brand = validate.validNum(id_brand);
    let validate_descrp = validate.validParam(descrp);
    let validate_code = validate.validParam(code);

    let validate_skd_weight = validate.validNum(skd_weight);
    let validate_skd_height = validate.validNum(skd_height);
    let validate_skd_width = validate.validNum(skd_width);
    let validate_skd_length = validate.validNum(skd_length);

    let validate_id = validate.validNum(id);

    if (!validate_id) {
      return res.status(200).send({
        status: "error",
        message: "Formato no valido.",
      });
    }

    let product = await modelItem.findById(id);

    if (product == "No se encontraron coincidencias" || product == "error") {
      return res.status(200).send({
        status: "error",
        message: "Producto no valido.",
      });
    }

    !validate_name ? (name = product.name) : name;
    !validate_code ? (code = product.code) : code;
    !validate_price ? (price = product.price) : price;
    !validate_id_category ? (id_category = product.id_category) : id_category;
    //!validate_id_brand ? (id_brand = product.id_brand) : id_brand;
    !validate_url ? (url = product.url) : url;
    !validate_descrp ? (descrp = product.descrp) : descrp;
    !validate_status_prod ? (status_prod = product.status) : status_prod;

    !validate_skd_weight ? (skd_weight = product.skd_weight) : skd_weight;
    !validate_skd_height ? (skd_height = product.skd_height) : skd_height;
    !validate_skd_width ? (skd_width = product.skd_width) : skd_width;
    !validate_skd_length ? (skd_length = product.skd_length) : skd_length;

    price = parseFloat(price);
    id_category = parseInt(id_category);

    // IMAGEN
    let fileName = "Imagen no subida";

    if (req.files?.image != undefined) {
      let filePath = req.files.image.path;
      let fileSplit = filePath.split("/");
      fileName = fileSplit[2];
      let extSplit = fileName.split(".");
      let fileExt = extSplit[1];
      fileExt = fileExt.toLowerCase();
      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        //guardar
        let data = {
          id,
          name,
          image: fileName,
          price,
          code,
          descrp,
          id_category,
          status_prod,
          url,
          //id_brand,
          skd_weight,
          skd_height,
          skd_width,
          skd_length,
        };
        let result = await modelItem.update(data);

        let status = "success";

        if (result != "success") {
          status = "error";
          let img = fileName;
          if (img != "" && img != null && img != undefined) {
            let splitimg = img.split(".");
            let nimg = splitimg[0];
            nimg = nimg + ".webp";

            //let filePath2 = "uploads\\product\\" + nimg;
            let filePath2 = "uploads/product/" + nimg; //! linux
            fs.unlink(filePath2, (err) => {
              /*console.log(err)*/
            });

            //let filePath = "uploads\\product\\" + img;
            let filePath = "uploads/product/" + img; //! linux
            fs.unlink(filePath, (err) => {
              /*console.log(err)*/
            });
          }
        } else {
          let img = product.image;
          if (
            img != "" &&
            img != null &&
            img != undefined &&
            img != "gwIupRH0KFywmuqdeCWM4gMV.png"
          ) {
            let splitimg = img.split(".");
            let nimg = splitimg[0];
            nimg = nimg + ".webp";

            //let filePath2 = "uploads\\product\\" + nimg;
            let filePath2 = "uploads/product/" + nimg; //! linux
            fs.unlink(filePath2, (err) => {
              /*console.log(err)*/
            });

            //let filePath = "uploads\\product\\" + img;
            let filePath = "uploads/product/" + img; //! linux
            fs.unlink(filePath, (err) => {
              /*console.log(err)*/
            });
          }
        }

        return res.status(200).send({
          status: status,
          message: result,
        });
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({
            status: "error",
            message: "Extensión no valida",
          });
        });
      }
    } else {
      let image = product.image;
      let data = {
        id,
        name,
        image,
        price,
        code,
        descrp,
        id_category,
        status_prod,
        url,
        //id_brand,
        skd_weight,
        skd_height,
        skd_width,
        skd_length,
      };
      let result = await modelItem.update(data);
      let status = "success";

      if (result != "success") {
        status = "error";
      }

      return res.status(200).send({
        status: status,
        message: result,
      });
    }
  },

  update_skd_class: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

    let { id, skd_class, skd_class_descrp } = req.body;

    const validate = new validService();

    let validate_skd_class = validate.validParam(skd_class);
    let validate_skd_class_descrp = validate.validParam(skd_class_descrp);

    let validate_id = validate.validNum(id);

    if (!validate_id) {
      return res.status(200).send({
        status: "error",
        message: "Formato no valido.",
      });
    }

    let product = await modelItem.findById(id);

    if (!product.id) {
      return res.status(200).send({
        status: "error",
        message: "Producto no valido.",
      });
    }

    !validate_skd_class_descrp ? (skd_class_descrp = null) : skd_class_descrp;

    if (!validate_skd_class) {
      skd_class = null;
      skd_class_descrp = null;
    }

    let data = {
      id,
      skd_class,
      skd_class_descrp,
    };

    let result = await modelItem.update_skd_class(data);
    let status = "success";

    if (result != "success") {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      message: result,
    });
  },

  delete: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
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

    let producto = await modelItem.findById(id);
    if (producto == "No se encontraron coincidencias" || producto == "error") {
      return res.status(200).send({
        status: "error",
        message: "Producto no valido.",
      });
    }

    let imgagesprod = await modelItem.findImagesProd(id);

    result = await modelItem.delete(id);
    let status = "success";

    result != "success" ? (status = "error") : status;
    if (result == "success") {
      //poner success
      //borrar imagenes
      let img = producto.image;
      if (
        img != "" &&
        img != null &&
        img != undefined &&
        img != "gwIupRH0KFywmuqdeCWM4gMV.png"
      ) {
        let splitimg = img.split(".");
        let nimg = splitimg[0];
        nimg = nimg + ".webp";

        //let filePath2 = "uploads\\product\\" + nimg;
        let filePath2 = "uploads/product/" + nimg; //! linux
        fs.unlink(filePath2, (err) => {
          /*console.log(err)*/
        });

        //let filePath = "uploads\\product\\" + img;
        let filePath = "uploads/product/" + img; //! linux
        fs.unlink(filePath, (err) => {
          /*console.log(err)*/
        });

        //! Borrar las imagenes de product images
        if (
          imgagesprod != "No se encontraron coincidencias" &&
          imgagesprod != "error"
        ) {
          for (const item of imgagesprod) {
            let img = item.image;
            if (
              img != "" &&
              img != null &&
              img != undefined &&
              img != "gwIupRH0KFywmuqdeCWM4gMV.png"
            ) {
              let splitimg = img.split(".");
              let nimg = splitimg[0];
              nimg = nimg + ".webp";

              //let filePath2 = "uploads\\product\\" + nimg;
              let filePath2 = "uploads/product/" + nimg; //! linux
              fs.unlink(filePath2, (err) => {
                /*console.log(err)*/
              });

              //let filePath = "uploads\\product\\" + img;
              let filePath = "uploads/product/" + img; //! linux
              fs.unlink(filePath, (err) => {
                /*console.log(err)*/
              });
            }
          }
        } //fin borrart imagenes producto
      }
    }

    return res.status(200).send({
      message: result,
      status: status,
      producto,
      imgagesprod,
    });
  },

  deleteProdAttValor: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

    let { id } = req.body;

    const validate = new validService();
    const validid = validate.validNum(id);

    if (!validid) {
      return res.status(200).send({
        status: "error",
        message: "Dato no valido.",
      });
    }

    const result = await modelItem.deleteProdAttValor(id);
    let status = "success";

    result != "success" ? (status = "error") : status;

    return res.status(200).send({
      message: result,
      status: status,
    });
  },
  deleteVariante: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

    let { id } = req.body;

    const validate = new validService();
    const validid = validate.validNum(id);

    if (!validid) {
      return res.status(200).send({
        status: "error",
        message: "Dato no valido.",
      });
    }

    const result = await modelItem.deleteVariante(id);
    let status = "success";

    result != "success" ? (status = "error") : status;

    return res.status(200).send({
      message: result,
      status: status,
    });
  },
  findImagesProd: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

    let id = req.params.id;

    if (id == undefined || id == null || isNaN(id)) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }

    id = parseInt(id);

    let result = await modelItem.findImagesProd(id);

    let status;

    if (result != "No se encontraron coincidencias" && result != "error") {
      status = "success";
    } else {
      status = "error";
    }

    return res.status(200).send({
      status: status,
      result: result,
    });
  },

  addImagesProd: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);

    let { id_product } = req.body;

    if (id_product == undefined || isNaN(id_product) || id_product == null) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }

    id_product = parseInt(id_product);

    // IMAGEN
    let fileName = "Imagen no subida";

    if (req.files.image != undefined) {
      let filePath = req.files.image.path;

      let fileSplit = filePath.split("/");
      fileName = fileSplit[2];
      let extSplit = fileName.split(".");
      let fileExt = extSplit[1];
      fileExt = fileExt.toLowerCase();
      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        //guardar
        let result = await modelItem.addImagesProd(id_product, fileName);
        let status = "success";

        if (result != "success") {
          status = "error";
          let img = fileName;
          if (img != "" && img != null && img != undefined) {
            let splitimg = img.split(".");
            let nimg = splitimg[0];
            nimg = nimg + ".webp";

            //let filePath2 = "uploads\\product\\" + nimg;
            let filePath2 = "uploads/product/" + nimg; //! linux
            fs.unlink(filePath2, (err) => {
              /*console.log(err)*/
            });

            //let filePath = "uploads\\product\\" + img;
            let filePath = "uploads/product/" + img; //! linux
            fs.unlink(filePath, (err) => {
              /*console.log(err)*/
            });
          }
        }

        return res.status(200).send({
          status: status,
          message: result,
        });
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({
            status: "error",
            message: "Extensión no valida",
          });
        });
      }
    } else {
      return res.status(200).send({
        status: "error",
        message: fileName,
      });
    }
  },

  deleteImageProd: async (req, res) => {
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
    let id = req.body.id;

    if (id == undefined || id == null || isNaN(id)) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos",
      });
    }

    let resultImg = await modelItem.findImage(id);

    if (resultImg != "error") {
      let img = resultImg.image;
      if (img != "" && img != null && img != undefined) {
        let splitimg = img.split(".");
        let nimg = splitimg[0];
        nimg = nimg + ".webp";

        //let filePath2 = "uploads\\product\\" + nimg;
        let filePath2 = "uploads/product/" + nimg; //! linux
        fs.unlink(filePath2, (err) => {
          /*console.log(err)*/
        });

        //let filePath = "uploads\\product\\" + img;
        let filePath = "uploads/product/" + img; //! linux
        fs.unlink(filePath, (err) => {
          /*console.log(err)*/
        });
      }
    }

    id = parseInt(id);
    let result = await modelItem.deleteImageProd(id);

    let status = "success";
    result != "success" ? (status = "error") : status;

    return res.status(200).send({
      message: result,
      status: status,
    });
  },

  getImageFile: async function (req, res) {
    let image = req.params.image;
console.log(image)
    let splitimg = image.split(".");
    let ext = splitimg[1];

    let path_image = "./uploads/product/" + image;

    //metodo que busca la imagen
    const readFile = (path, opts = "utf8") =>
      new Promise((resolve, reject) => {
        try {
          fs.readFile(path, opts, (err, data) => {
            if (err) resolve({ error: err.message });
            else resolve(data);
          });
        } catch (err) {
          resolve({ error: err.message });
        }
      });

    //busqueda
    try {
      if (ext == "webp") {
        const result = await readFile(path_image);
        if (!result.error) {
          return await res.sendFile(path.resolve(path_image));
        }

        //buscarla como jpg
        let imagejpg = `${splitimg[0]}.jpg`;
        let path_jpg = "./uploads/product/" + imagejpg;

        const resultjpg = await readFile(path_jpg);

        if (!resultjpg.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/product/${imagejpg}`,
            `./uploads/product/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/product/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como JPG
        let imageJPG = `${splitimg[0]}.JPG`;
        let path_JPG = "./uploads/product/" + imageJPG;

        const resultJPG = await readFile(path_JPG);

        if (!resultJPG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/product/${imageJPG}`,
            `./uploads/product/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/product/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como png
        let imagepng = `${splitimg[0]}.png`;
        let path_png = "./uploads/product/" + imagepng;

        const resultpng = await readFile(path_png);

        if (!resultpng.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/product/${imagepng}`,
            `./uploads/product/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/product/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como PNG
        let imagePNG = `${splitimg[0]}.PNG`;
        let path_PNG = "./uploads/product/" + imagePNG;

        const resultPNG = await readFile(path_PNG);

        if (!resultPNG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/product/${imagePNG}`,
            `./uploads/product/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/product/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como jpeg
        let imagejpeg = `${splitimg[0]}.jpeg`;
        let path_jpeg = "./uploads/product/" + imagejpeg;

        const resultjpeg = await readFile(path_jpeg);

        if (!resultjpeg.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/product/${imagejpeg}`,
            `./uploads/product/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/product/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        //buscarla como JPEG
        let imageJPEG = `${splitimg[0]}.JPEG`;
        let path_JPEG = "./uploads/product/" + imageJPEG;

        const resultJPEG = await readFile(path_JPEG);

        if (!resultJPEG.error) {
          //procedemos a convertir
          let imagewebp = `${splitimg[0]}.webp`;
          await webp.cwebp(
            `./uploads/product/${imageJPEG}`,
            `./uploads/product/${imagewebp}`,
            "-q 80"
          );
          const path_webp = "./uploads/product/" + imagewebp;
          const resultwebp = await readFile(path_webp);
          if (!resultwebp.error) {
            return await res.sendFile(path.resolve(path_webp));
          }
        }

        return res
          .status(200)
          .send({ message: "No existe la imagen", status: "error" });
      } else {
        const result = await readFile(path_image);
        if (!result.error) {
          return await res.sendFile(path.resolve(path_image));
        } else {
          return res
            .status(200)
            .send({ message: "No existe la imagen", status: "error" });
        }
      }
    } catch (err) {
      return res
        .status(200)
        .send({ message: "No existe la imagen", status: "error" });
    }
  },
};

let productById = async (id) =>{
  
    const itemRepo = new productRepo();
    const modelItem = new productModel(itemRepo);
    
    let product ={}
    const validate = new validService();

    let validid = validate.validNum(id);

    if (!validid) return product

    product = await modelItem.findById(id);



    if (product.id) {
      

      let reorderImg = [];
      if (
        product.image != "" &&
        product.image != null &&
        product.image != undefined
      ) {
        let img = {
          image: product.image,
          id: null,
          type: "primera",
          id_product: product.id,
        };
        reorderImg.push(img);
      }

      let imagenes = await modelItem.findImagesProd(product.id);
      if (
        imagenes == "No se encontraron coincidencias" ||
        imagenes == "error"
      ) {
        imagenes = "No se encontraron coincidencias";
      } else {
        if (imagenes.length > 0) {
          for (var k = 0; k < imagenes.length; k++) {
            reorderImg.push({
              image: imagenes[k].image,
              id: imagenes[k].id,
              type: "Imagenes",
              id_product: imagenes[k].id_product,
            });
          }
        }
      }

      const itemSRepo = new stockRepo();
      const modelSItem = new stockModel(itemSRepo);
      let stock = await modelSItem.getByProduct(product.id);

      if (stock == "No se encontraron coincidencias." || stock == "error") {
        stock = "Sin stock";
      } else {
        let cant = 0;
        for (const item of stock) {
          cant += item.stock;
        }
        stock = cant;
      }

      const itemRepo2 = new productCatRepo();
      const modelItem2 = new productCatModel(itemRepo2);
      let prod_cat = await modelItem2.findByProduct(product.id);

      if (prod_cat == "No se encontraron coincidencias" || prod_cat == "error") {
        prod_cat = "Sin categorías extra";
      } 

      const product_atributo_valores = await modelItem.getAttValuesByProd(product.id)
    

      let model = {
        id: product.id,
        id_category: product.id_category,
        //id_brand: product.id_brand,
        category_name: product.category_name,
        //brand_name: product.brand_name,
        descrp: product.descrp,
        url: product.url,
        name: product.name,
        status: product.status,
        image: product.image,
        price: product.price,
        code: product.code,
        skd_weight: product.skd_weight,
        skd_height: product.skd_height,
        skd_width: product.skd_width, 
        skd_length: product.skd_length,
        skd_class: product.skd_class,
        skd_class_descrp:  product.skd_class_descrp,
        imagenes: reorderImg,
        stock: stock,
        product_categories: prod_cat,
        product_atributo_valores,
      };

      product = model
    }else{
      product ={}
    }

    return product
  
}
module.exports = controller;

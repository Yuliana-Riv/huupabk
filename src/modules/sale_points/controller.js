"use strict";
var sale_pointsModel = require("./model");
var sale_pointsRepo = require("./repo");

let validService = require("../../services/validator/validateParams");
//let nodemailer = require('../../services/nodemailer/sendEmail')

var fs = require("fs");
var path = require("path");

const controller = {
  getAll: async (req, res) => {
    const _repo = new sale_pointsRepo();
    const _model = new sale_pointsModel(_repo);

    let sale_points = await _model.getAll();
    let status = "success";
    let message = "sale_points";

    if (
      sale_points == "No se encontraron coincidencias." ||
      sale_points == "error"
    ) {
      status = "error";
      message = sale_points;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: sale_points,
    });
  },

  getById: async (req, res) => {
    const _repo = new sale_pointsRepo();
    const _model = new sale_pointsModel(_repo);

    let id = parseInt(req.params.id);

    const validate = new validService();
    let validID = validate.validNum(id);
    if (!validID) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let sale_points = await _model.getById(id);

    let status;
    let message = "sale_points encontrado.";

    if (
      sale_points == "No se encontraron coincidencias." ||
      sale_points == "error"
    ) {
      status = "error";
      message = sale_points;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: sale_points,
    });
  },

  search: async (req, res) => {
    const _repo = new sale_pointsRepo();
    const _model = new sale_pointsModel(_repo);

    let search = req.params.search;
    let sale_points = await _model.search(search);

    let status = "success";
    let message = "Se han encontrado coincidencias.";

    if (
      sale_points == "No se encontraron coincidencias." ||
      sale_points == "error"
    ) {
      status = "error";
      message = sale_points;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: sale_points,
    });
  },

  create: async (req, res) => {
    const _repo = new sale_pointsRepo();
    const _model = new sale_pointsModel(_repo);
    let { name, link, city, image } = req.body;
    console.log(req.body)
    let status = "success";
    let message = "sale_points creada con exito.";
    let result = "";
    console.log(name, link, city, image)
    const validate = new validService();

    let validname = validate.validParam(name);
    let validlink = validate.validParam(link);
    let validcity = validate.validParam(city);
    if (!validname) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos 1.",
        result: result,
      });
    }

    if (!validlink) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos 2.",
        result: result,
      });
    }

    if (!validcity) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos 3.",
        result: result,
      });
    }
    let fileName = "Imagen no subida";
    if (req.files?.image) {
      let filePath = req.files.image.path;
      let fileSplit = filePath.split("/"); //.split('/') split('\\');
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
        let data = {
          name,
          link,
          city,
          image: fileName,
        };

        result = await _model.create(data);
        let added = "_";

        if (result == "success") {
          added = await _model.last(); 

          let model = {
            name: added.name,
            link: added.link,
            city: added.city,
            image: added.image,
          };
          added = model;
        } else {
          status = "error";
          message = result;

          //borrar imagen subida.
          let img = fileName;
          let splitimg = img.split(".");
          let nimg = splitimg[0];
          nimg = nimg + ".webp";

          // let filePath = 'uploads\\blog\\'+img
          let filePath = "uploads/sale_points/" + img; //! linux
          fs.unlink(filePath, (err) => {
            /* console.log(err)*/
          });
        }

        return res.status(200).send({
          message: message,
          status: status,
          result: result,
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
      return res.status(200).send({
        status: "error",
        message: fileName,
      });
    }
  },


  update: async (req, res) => {
    const _repo = new sale_pointsRepo();
    const _model = new sale_pointsModel(_repo);
    
    let {
      id,
      name,
      link,
      city, 
    } = req.body;

    let message = "item actualizado con exito.";
    let result = "";
    let status = "success";

    const validate = new validService();

    let payload = req.user;
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

    let validId = validate.validNum(id);

    if (!validId) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
        result: result,
      });
    }

    let getById = await _model.getById(id);

    //validar datos
    if (getById == "No se encontraron coincidencias." || getById == "error") {
      return res.status(200).send({
        status: "error",
        message: "item no encontrado.",
        result: result,
      });
    }
    let validname = validate.validParam(name); 
    let validlink    = validate.validParam(link); 
    let validcity    = validate.validParam(city); 

    !validname ? (name = getById.name) : name; 
    !validlink ? (link = getById.link) : link; 
    !validcity ? (city = getById.city) : city; 

    id = parseInt(id); 

    let fileName = "Imagen no subida";
    if (req.files?.image) {
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
        let data = {
          id, 
          name,
          link,
          city,
          image: fileName, 
        };

        result = await _model.update(data);  

        if (result == "success") {
          let image = getById.image;
          status = "success";

          //borrar imagen anterior
          let img = image;
          let splitimg = img.split(".");
          let nimg = splitimg[0];
          nimg = nimg + ".webp";

          //let filePath2 = 'uploads\\blog\\'+nimg
          /*let filePath2 = "uploads/sale_points/" + nimg; //! linux
          fs.unlink(filePath2, (err) => {*/
            /* console.log(err)*/
         /* });*/

          //let filePath = 'uploads\\blog\\'+img
          let filePath = "uploads/sale_points/" + img; //! linux
          fs.unlink(filePath, (err) => {
            /* console.log(err)*/
          });
        } else {
          status = "error";
          message = result;

          //borrar imagen subida.
          let img = fileName;
          let splitimg = img.split(".");
          let nimg = splitimg[0];
          nimg = nimg + ".webp"; 

          //let filePath = 'uploads\\blog\\'+img
          let filePath = "uploads/sale_points/" + img; //! linux
          fs.unlink(filePath, (err) => {
            /* console.log(err)*/
          });
        }

        return res.status(200).send({
          message: message,
          status: status,
          result: result,
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
      let image = getById.image;

      let data = {
        id,
        name,
        link,
        city,
        image, 
      };

      result = await _model.update(data);
 

      if (result != "success") {
        status = "error";
        message = result;
      }
      return res.status(200).send({
        message: message,
        status: status,
      });
    }
  },
  delete: async (req, res) => {
    const _repo = new sale_pointsRepo();
    const _model = new sale_pointsModel(_repo);
    let params = req.body;

    let payload = req.user;
    const validate = new validService();
    let validAdm = validate.validAdm(payload.role);

    if (payload == undefined || payload == "") {
      return res.status(200).send({
        status: "error",
        message: "Faltan datos.",
      });
    }

    if (!validAdm) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
      });
    }

    let id = parseInt(params.id);
    if (id == undefined || isNaN(id)) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let result = await _model.delete(id);
    let message;
    let status = "success";
    result == "success"
      ? (message = "suscripción eliminada")
      : (message = result);

    result != "success" ? (status = "error") : status;

    return res.status(200).send({
      message: message,
      status: status,
    });
  },

  getImageFile: function (req, res) {
    let image = req.params.image;
    if (image == undefined || image == null || image == "") {
      return res
        .status(200)
        .send({ message: "No existe la imagen", status: "error" });
    }

    let splitimg = image.split(".");
    let ext = splitimg[1];

    let path_image = "./uploads/sale_points/" + image;

    if (ext == "webp") {
      fs.access(path_image, fs.constants.F_OK, (err) => {
        if (err) {
          //buscarla como jpg
          let imagejpg = `${splitimg[0]}.jpg`;
          let path_image2 = "./uploads/sale_points/" + imagejpg;
          fs.access(path_image2, fs.constants.F_OK, (err) => {
            if (err) {
              //buscarla como png
              let imagepng = `${splitimg[0]}.png`;
              let path_image2 = "./uploads/sale_points/" + imagepng;
              fs.access(path_image2, fs.constants.F_OK, (err) => {
                if (err) {
                  //buscarla como jpeg
                  let imagejpeg = `${splitimg[0]}.jpeg`;
                  let path_image2 = "./uploads/sale_points/" + imagejpeg;
                  fs.access(path_image2, fs.constants.F_OK, (err) => {
                    if (err) {
                      return res.status(200).send({
                        message: "No existe la imagen",
                        status: "error",
                      });
                    } else {
                      //convertir a webp
                      let imagewebp = `${splitimg[0]}.webp`;

                      const result3 = webp.cwebp(
                        `./uploads/sale_points/${imagejpeg}`,
                        `./uploads/sale_points/${imagewebp}`,
                        "-q 80"
                      );
                      result3.then((response) => {
                        let path_image3 =
                          "./uploads/sale_points/" + imagewebp;
                        fs.access(path_image3, fs.constants.F_OK, (err) => {
                          if (err) {
                            return res.status(200).send({
                              message: "No existe la imagen",
                              status: "error",
                            });
                          } else {
                            return res.sendFile(path.resolve(path_image));
                          }
                        });
                      });
                    }
                  });
                } else {
                  //convertir a webp
                  let imagewebp = `${splitimg[0]}.webp`;

                  const result3 = webp.cwebp(
                    `./uploads/sale_points/${imagepng}`,
                    `./uploads/sale_points/${imagewebp}`,
                    "-q 80"
                  );
                  result3.then((response) => {
                    let path_image3 = "./uploads/sale_points/" + imagewebp;
                    fs.access(path_image3, fs.constants.F_OK, (err) => {
                      if (err) {
                        return res.status(200).send({
                          message: "No existe la imagen",
                          status: "error",
                        });
                      } else {
                        return res.sendFile(path.resolve(path_image));
                      }
                    });
                  });
                }
              });
            } else {
              //convertir a webp
              let imagewebp = `${splitimg[0]}.webp`;

              const result3 = webp.cwebp(
                `./uploads/sale_points/${imagejpg}`,
                `./uploads/sale_points/${imagewebp}`,
                "-q 80"
              );
              result3.then((response) => {
                let path_image3 = "./uploads/sale_points/" + imagewebp;
                fs.access(path_image3, fs.constants.F_OK, (err) => {
                  if (err) {
                    return res.status(200).send({
                      message: "No existe la imagen",
                      status: "error",
                    });
                  } else {
                    return res.sendFile(path.resolve(path_image));
                  }
                });
              });
            }
          });
        } else {
          return res.sendFile(path.resolve(path_image));
        }
      });
    } else {
      fs.access(path_image, fs.constants.F_OK, (err) => {
        if (err) {
          return res
            .status(200)
            .send({ message: "No existe la imagen", status: "error" });
        } else {
          return res.sendFile(path.resolve(path_image));
        }
      });
    }
  },

  uploadImage: async (req, res) => {
    const _repo = new sale_pointsRepo();
    const _model = new sale_pointsModel(_repo);
    let payload = req.user;

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
        message: "Datos no validos2.",
        result: result,
      });
    }

    let fileName = "Imagen no subida";

    if (req.files?.image) {
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
        let insert = await _model.createImg(fileName);

        return res.status(200).send({
          status: "success",
          message: "Imagen subida",
          file: req.files,
          fileName: fileName,
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
        message: "Datos no validos",
      });
    }
  },

  delImage: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);

    let payload = req.user;
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
        message: "Datos no validos2.",
        result: result,
      });
    }

    let { id } = req.body;
    let image = id;
    if (image == "" || image == undefined || image == null) {
      return res.status(200).send({
        status: "error",
        message: "Imagen no valida.",
        result: result,
      });
    }

    let deleteimg = await _model.delImg(image);

    //todo eliminar imagen
    //borrar imagen subida.
    let img = image;
    let splitimg = img.split(".");
    let nimg = splitimg[0];
    nimg = nimg + ".webp";

    //let filePath2 = 'uploads\\blog\\'+nimg
    let filePath2 = "uploads/sale_points/" + nimg; //! linux
    fs.unlink(filePath2, (err) => {
      /* console.log(err)*/
    });

    //let filePath = 'uploads\\blog\\'+img
    let filePath = "uploads/sale_points/" + img; //! linux
    fs.unlink(filePath, (err) => {
      /* console.log(err)*/
    });

    return res.status(200).send({
      status: "success",
      message: "Imagen eliminada",
      result: deleteimg,
    });

    // return console.log(status)
  },
};

module.exports = controller;

"use strict";
var blogModel = require("./blogModel");
var blogRepo = require("./blogRepo");

var blogCatModel = require("./blog_categoryModel");
var blogCatRepo = require("./blog_categoryRepo");

let validService = require("../../services/validator/validateParams");

var dec = require("../../services/jwt/decode");
var enc = require("../../services/jwt/encode");

var fs = require("fs");
var path = require("path");

const controller = {
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
    let filePath2 = "uploads/blog/" + nimg; //! linux
    fs.unlink(filePath2, (err) => {
      /* console.log(err)*/
    });

    //let filePath = 'uploads\\blog\\'+img
    let filePath = "uploads/blog/" + img; //! linux
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
  getAll: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);

    let item = await _model.getAll();
    let status = "success";
    let message = "item";

    const validate = new validService();

    if (item == "No se encontraron coincidencias." || item == "error") {
      status = "error";
      message = item;
    } else {
      const itemRepo2 = new blogCatRepo();
      const modelItem2 = new blogCatModel(itemRepo2);

      let array = [];
      for (const blog of item) {
        let tags = await _model.getTags(blog.id);
        let blog_cat = await modelItem2.getByBlog(blog.id);
        let colab = "No se encontraron coincidencias.";
        if (
          blog.id_colaborador != null &&
          blog.id_colaborador != "" &&
          blog.id_colaborador != undefined
        ) {
          colab = await _model.getColab(blog.id_colaborador);
          if (colab != "No se encontraron coincidencias." && colab != "error") {
            let about = dec.decode(colab.about);
            let model = {
              id: colab.id,
              image: colab.image,
              name: colab.name,
              url: colab.url,
              descrp: colab.descrp,
              about: about,
              facebook: colab.facebook,
              instagram: colab.instagram,
              twiter: colab.twiter,
              linkedin: colab.linkedin,
              created_at: colab.created_at,
              updated_at: colab.updated_at,
            };
            colab = model;
          } else {
            colab = "No se encontraron coincidencias.";
          }
        }

        let body = dec.decode(blog.body);
        body == "" ? (body = []) : (body = JSON.parse(body));

        let model = {
          id: blog.id,
          title: blog.title,
          url: blog.url,
          descrp: blog.descrp,
          id_autor: blog.id_autor,
          autor_name: blog.autor_name,
          autor_lastname: blog.autor_lastname,
          id_category: blog.id_category,
          category_name: blog.category_name,
          id_colaborador: blog.id_colaborador,
          image: blog.image,
          dateblog: blog.dateblog,
          formato: blog.formato,
          body: body,
          statusblog: blog.statusblog,
          orden: blog.orden,
          tags: tags,
          blog_categories: blog_cat,
          colaborador: colab,
        };

        array.push(model);
      }

      item = array;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: item,
    });
  },

  getById: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);

    let id = parseInt(req.params.id);

    const validate = new validService();
    let validID = validate.validNum(id);
    if (!validID) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let item = await _model.getById(id);

    let status;
    let message = "item encontrado.";

    if (item == "No se encontraron coincidencias." || item == "error") {
      status = "error";
      message = item;
    } else {
      const itemRepo2 = new blogCatRepo();
      const modelItem2 = new blogCatModel(itemRepo2);
      let tags = await _model.getTags(item.id);
      let blog_cat = await modelItem2.getByBlog(item.id);
      let colab = "No se encontraron coincidencias.";
      if (
        item.id_colaborador != null &&
        item.id_colaborador != "" &&
        item.id_colaborador != undefined
      ) {
        colab = await _model.getColab(item.id_colaborador);
        if (colab != "No se encontraron coincidencias." && colab != "error") {
          let about = dec.decode(colab.about);
          let model = {
            id: colab.id,
            image: colab.image,
            name: colab.name,
            url: colab.url,
            descrp: colab.descrp,
            about: about,
            facebook: colab.facebook,
            instagram: colab.instagram,
            twiter: colab.twiter,
            linkedin: colab.linkedin,
            created_at: colab.created_at,
            updated_at: colab.updated_at,
          };
          colab = model;
        } else {
          colab = "No se encontraron coincidencias.";
        }
      }

      let body = dec.decode(item.body);
      body == "" ? (body = []) : (body = JSON.parse(body));

      let model = {
        id: item.id,
        title: item.title,
        url: item.url,
        descrp: item.descrp,
        id_autor: item.id_autor,
        autor_name: item.autor_name,
        autor_lastname: item.autor_lastname,
        id_category: item.id_category,
        category_name: item.category_name,
        id_colaborador: item.id_colaborador,
        image: item.image,
        dateblog: item.dateblog,
        formato: item.formato,
        statusblog: item.statusblog,
        orden: item.orden,
        body: body,
        tags: tags,
        blog_categories: blog_cat,
        colaborador: colab,
      };
      item = model;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: item,
    });
  },

  getByCategory: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);

    let id = parseInt(req.params.id);

    const validate = new validService();
    let validID = validate.validNum(id);
    if (!validID) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let item = await _model.getByCategory(id);
    let status = "success";
    let message = "item";

    if (item == "No se encontraron coincidencias." || item == "error") {
      status = "error";
      message = item;
    } else {
      let array = [];
      for (const blog of item) {
        let tags = await _model.getTags(blog.id);
        let colab = "No se encontraron coincidencias.";
        if (
          blog.id_colaborador != null &&
          blog.id_colaborador != "" &&
          blog.id_colaborador != undefined
        ) {
          colab = await _model.getColab(blog.id_colaborador);
          if (colab != "No se encontraron coincidencias." && colab != "error") {
            let about = dec.decode(colab.about);
            let model = {
              id: colab.id,
              image: colab.image,
              name: colab.name,
              url: colab.url,
              descrp: colab.descrp,
              about: about,
              facebook: colab.facebook,
              instagram: colab.instagram,
              twiter: colab.twiter,
              linkedin: colab.linkedin,
              created_at: colab.created_at,
              updated_at: colab.updated_at,
            };
            colab = model;
          } else {
            colab = "No se encontraron coincidencias.";
          }
        }

        let body = dec.decode(blog.body);
        body == "" ? (body = []) : (body = JSON.parse(body));

        let model = {
          id: blog.id,
          title: blog.title,
          url: blog.url,
          descrp: blog.descrp,
          id_autor: blog.id_autor,
          autor_name: blog.autor_name,
          autor_lastname: blog.autor_lastname,
          id_category: blog.id_category,
          category_name: blog.category_name,
          id_colaborador: blog.id_colaborador,
          image: blog.image,
          dateblog: blog.dateblog,
          formato: blog.formato,
          body: body,
          statusblog: blog.statusblog,
          orden: blog.orden,
          tags: tags,
          colaborador: colab,
        };

        array.push(model);
      }

      item = array;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: item,
    });
  },

  getByEtiqueta: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);

    let id = parseInt(req.params.id);

    const validate = new validService();
    let validID = validate.validNum(id);
    if (!validID) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let item = await _model.getByEtiqueta(id);
    let status = "success";
    let message = "item";

    if (item == "No se encontraron coincidencias." || item == "error") {
      status = "error";
      message = item;
    } else {
      let array = [];
      for (const blog of item) {
        let tags = await _model.getTags(blog.id);
        let colab = "No se encontraron coincidencias.";
        if (
          blog.id_colaborador != null &&
          blog.id_colaborador != "" &&
          blog.id_colaborador != undefined
        ) {
          colab = await _model.getColab(blog.id_colaborador);
          if (colab != "No se encontraron coincidencias." && colab != "error") {
            let about = dec.decode(colab.about);
            let model = {
              id: colab.id,
              image: colab.image,
              name: colab.name,
              url: colab.url,
              descrp: colab.descrp,
              about: about,
              facebook: colab.facebook,
              instagram: colab.instagram,
              twiter: colab.twiter,
              linkedin: colab.linkedin,
              created_at: colab.created_at,
              updated_at: colab.updated_at,
            };
            colab = model;
          } else {
            colab = "No se encontraron coincidencias.";
          }
        }

        let body = dec.decode(blog.body);
        body == "" ? (body = []) : (body = JSON.parse(body));

        let model = {
          id: blog.id,
          title: blog.title,
          url: blog.url,
          descrp: blog.descrp,
          id_autor: blog.id_autor,
          autor_name: blog.autor_name,
          autor_lastname: blog.autor_lastname,
          id_category: blog.id_category,
          category_name: blog.category_name,
          id_colaborador: blog.id_colaborador,
          image: blog.image,
          dateblog: blog.dateblog,
          formato: blog.formato,
          body: body,
          statusblog: blog.statusblog,
          orden: blog.orden,
          tags: tags,
          colaborador: colab,
        };

        array.push(model);
      }

      item = array;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: item,
    });
  },

  getByUrl: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);

    let url = req.params.id;

    const validate = new validService();
    let validurl = validate.validParam(url);
    if (!validurl) {
      return res.status(200).send({
        status: "error",
        message: "Tipo de dato no valido.",
      });
    }

    let item = await _model.getByUrl(url);

    let status;
    let message = "item encontrado.";

    if (item == "No se encontraron coincidencias." || item == "error") {
      status = "error";
      message = item;
    } else {
      let tags = await _model.getTags(item.id);
      let colab = "No se encontraron coincidencias.";
      if (
        item.id_colaborador != null &&
        item.id_colaborador != "" &&
        item.id_colaborador != undefined
      ) {
        colab = await _model.getColab(item.id_colaborador);
        if (colab != "No se encontraron coincidencias." && colab != "error") {
          let about = dec.decode(colab.about);
          let model = {
            id: colab.id,
            image: colab.image,
            name: colab.name,
            url: colab.url,
            descrp: colab.descrp,
            about: about,
            facebook: colab.facebook,
            instagram: colab.instagram,
            twiter: colab.twiter,
            linkedin: colab.linkedin,
            created_at: colab.created_at,
            updated_at: colab.updated_at,
          };
          colab = model;
        } else {
          colab = "No se encontraron coincidencias.";
        }
      }

      let body = dec.decode(item.body);
      body == "" ? (body = []) : (body = JSON.parse(body));

      let model = {
        id: item.id,
        title: item.title,
        url: item.url,
        descrp: item.descrp,
        id_autor: item.id_autor,
        autor_name: item.autor_name,
        autor_lastname: item.autor_lastname,
        id_category: item.id_category,
        category_name: item.category_name,
        id_colaborador: item.id_colaborador,
        image: item.image,
        dateblog: item.dateblog,
        formato: item.formato,
        statusblog: item.statusblog,
        orden: item.orden,
        body: body,
        tags: tags,
        colaborador: colab,
      };
      item = model;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: item,
    });
  },

  search: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);

    let search = req.params.search;
    let item = await _model.search(search);

    const validate = new validService();

    let status = "success";
    let message = "Se han encontrado coincidencias.";

    if (item == "No se encontraron coincidencias." || item == "error") {
      status = "error";
      message = item;
    } else {
      let array = [];
      for (const blog of item) {
        let tags = await _model.getTags(blog.id);
        let colab = "No se encontraron coincidencias.";
        if (
          blog.id_colaborador != null &&
          blog.id_colaborador != "" &&
          blog.id_colaborador != undefined
        ) {
          colab = await _model.getColab(blog.id_colaborador);
          if (colab != "No se encontraron coincidencias." && colab != "error") {
            let about = dec.decode(colab.about);
            let model = {
              id: colab.id,
              image: colab.image,
              name: colab.name,
              url: colab.url,
              descrp: colab.descrp,
              about: about,
              facebook: colab.facebook,
              instagram: colab.instagram,
              twiter: colab.twiter,
              linkedin: colab.linkedin,
              created_at: colab.created_at,
              updated_at: colab.updated_at,
            };
            colab = model;
          } else {
            colab = "No se encontraron coincidencias.";
          }
        }

        let body = dec.decode(blog.body);
        body == "" ? (body = []) : (body = JSON.parse(body));

        let model = {
          id: blog.id,
          title: blog.title,
          url: blog.url,
          descrp: blog.descrp,
          id_autor: blog.id_autor,
          autor_name: blog.autor_name,
          autor_lastname: blog.autor_lastname,
          id_category: blog.id_category,
          category_name: blog.category_name,
          id_colaborador: blog.id_colaborador,
          image: blog.image,
          dateblog: blog.dateblog,
          formato: blog.formato,
          statusblog: blog.statusblog,
          orden: blog.orden,
          body: body,
          tags: tags,
          colaborador: colab,
        };

        array.push(model);
      }

      item = array;
    }

    return res.status(200).send({
      status: status,
      message: message,
      result: item,
    });
  },

  uploadImage: async (req, res) => {
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

  create: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);
    let {
      title,
      descrp,
      id_autor,
      id_category,
      id_colaborador,
      dateblog,
      formato,
      body,
      tags,
      imagenes,
      url,
    } = req.body;
    let payload = req.user;

    let status = "success";
    let message = "item creada con exito.";
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

    let validtitle = validate.validParam(title);
    let validurl = validate.validParam(url);
    let validdescrp = validate.validParam(descrp);
    let validbody = validate.validParam(body);
    let validdateblog = validate.validParam(dateblog);
    let validformato = validate.validParam(formato);
    let validid_autor = validate.validNum(id_autor);
    let validid_category = validate.validNum(id_category);
    let validid_colaborador = validate.validNum(id_colaborador);

    //! el cuerpo debe ser almenos 1 bloque.
    if (!validid_colaborador) {
      id_colaborador = null;
    }

    if (
      !validtitle ||
      !validdescrp ||
      !validdateblog ||
      !validformato ||
      !validid_autor ||
      !validid_category ||
      !validbody ||
      !validurl
    ) {
      return res.status(200).send({
        status: "error",
        message: "Datos no validos.",
        result: result,
      });
    }

    let bodyenc = enc.encode(body);
    /*
    //* crear url.
    let str = title
    let ss =  str.replace(/[\u0300-\u036f-\s]/g, "-"); 
    let url = ss.replace(/[^A-Za-z0-9]+/g,"-")
    */

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
          title,
          descrp,
          dateblog,
          formato,
          id_autor,
          id_category,
          image: fileName,
          body: bodyenc,
          url,
          id_colaborador,
        };

        result = await _model.create(data);
        let added = "_";

        if (result == "success") {
          added = await _model.last();

          //! insertar las etiquetas
          tags = JSON.parse(tags);

          for (const tag of tags) {
            let model = { id_tag: tag.id, id_blog: added.id };
            let insert = await _model.createTag(model);
          }

          //! insertar las imagenes
          imagenes = JSON.parse(imagenes);

          for (const img of imagenes) {
            let insert = await _model.updateImg(added.id, img);
          }

          //* reordenar added
          let etiquetas = await _model.getTags(added.id);
          let colab = "No se encontraron coincidencias.";
          if (
            added.id_colaborador != null &&
            added.id_colaborador != "" &&
            added.id_colaborador != undefined
          ) {
            colab = await _model.getColab(added.id_colaborador);
            if (
              colab != "No se encontraron coincidencias." &&
              colab != "error"
            ) {
              let about = dec.decode(colab.about);
              let model = {
                id: colab.id,
                image: colab.image,
                name: colab.name,
                url: colab.url,
                descrp: colab.descrp,
                about: about,
                facebook: colab.facebook,
                instagram: colab.instagram,
                twiter: colab.twiter,
                linkedin: colab.linkedin,
                created_at: colab.created_at,
                updated_at: colab.updated_at,
              };
              colab = model;
            } else {
              colab = "No se encontraron coincidencias.";
            }
          }

          let body = dec.decode(added.body);
          body == "" ? (body = []) : (body = JSON.parse(body));

          let model = {
            id: added.id,
            title: added.title,
            url: added.url,
            descrp: added.descrp,
            id_autor: added.id_autor,
            autor_name: added.autor_name,
            autor_lastname: added.autor_lastname,
            id_category: added.id_category,
            category_name: added.category_name,
            id_colaborador: added.id_colaborador,
            image: added.image,
            dateblog: added.dateblog,
            formato: added.formato,
            body: body,
            tags: etiquetas,
            colaborador: colab,
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

          //let filePath2 = 'uploads\\blog\\'+nimg
          let filePath2 = "uploads/blog/" + nimg; //! linux
          fs.unlink(filePath2, (err) => {
            /* console.log(err)*/
          });

          // let filePath = 'uploads\\blog\\'+img
          let filePath = "uploads/blog/" + img; //! linux
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
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);

    let {
      id,
      title,
      descrp,
      id_autor,
      id_category,
      id_colaborador,
      dateblog,
      formato,
      body,
      tags,
      images,
      statusblog,
      orden,
      url,
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
    let validtitle = validate.validParam(title);
    let validurl = validate.validParam(url);
    let validdescrp = validate.validParam(descrp);
    let validbody = validate.validParam(body);
    let validdateblog = validate.validParam(dateblog);
    let validformato = validate.validParam(formato);
    let validid_autor = validate.validNum(id_autor);
    let validid_category = validate.validNum(id_category);
    let validid_colaborador = validate.validNum(id_colaborador);
    let validstatusblog = validate.validVisible(statusblog);
    let validorden = validate.validOrden(orden);

    !validtitle ? (title = getById.title) : title;
    !validurl ? (url = getById.url) : url;
    !validbody ? (body = getById.body) : body;
    !validdescrp ? (descrp = getById.descrp) : descrp;
    !validdateblog ? (dateblog = getById.dateblog) : dateblog;
    !validformato ? (formato = getById.formato) : formato;
    !validid_autor ? (id_autor = getById.id_autor) : id_autor;
    !validid_category ? (id_category = getById.id_category) : id_category;
    !validid_colaborador ? (id_colaborador = null) : id_colaborador;
    !validorden ? (orden = getById.orden) : orden;
    !validstatusblog ? (statusblog = getById.statusblog) : statusblog;

    id = parseInt(id);

    let bodyenc = enc.encode(body);

    /*
     //* url del store
     let cambionombre = false;
     let url = getById.url
     title != getById.title ? cambionombre= true: cambionombre
    

     if(cambionombre){ // si cambio el nombre generamos la url nueva.
       
       let str = title
       let ss =  str.replace(/[\u0300-\u036f-\s]/g, "-"); 
       url = ss.replace(/[^A-Za-z0-9]+/g,"-")
     }
*/

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
          title,
          descrp,
          dateblog,
          formato,
          id_autor,
          id_category,
          image: fileName,
          body: bodyenc,
          url,
          id_colaborador,
          orden,
          statusblog,
        };

        result = await _model.update(data);

        //! insertar las etiquetas
        tags = JSON.parse(tags);

        for (const tag of tags) {
          let model = { id_tag: tag.id, id_blog: id };
          let insert = await _model.createTag(model);
        }

        //! insertar las imagenes
        images = JSON.parse(images);

        for (const img of images) {
          let insert = await _model.updateImg(id, img);
        }

        if (result == "success") {
          let image = getById.image;
          status = "success";

          //borrar imagen anterior
          let img = image;
          let splitimg = img.split(".");
          let nimg = splitimg[0];
          nimg = nimg + ".webp";

          //let filePath2 = 'uploads\\blog\\'+nimg
          let filePath2 = "uploads/blog/" + nimg; //! linux
          fs.unlink(filePath2, (err) => {
            /* console.log(err)*/
          });

          //let filePath = 'uploads\\blog\\'+img
          let filePath = "uploads/blog/" + img; //! linux
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

          //let filePath2 = 'uploads\\blog\\'+nimg
          let filePath2 = "uploads/blog/" + nimg; //! linux
          fs.unlink(filePath2, (err) => {
            /* console.log(err)*/
          });

          //let filePath = 'uploads\\blog\\'+img
          let filePath = "uploads/blog/" + img; //! linux
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
        title,
        descrp,
        id_autor,
        id_category,
        id_colaborador,
        dateblog,
        formato,
        body: bodyenc,
        url,
        image,
        orden,
        statusblog,
      };

      result = await _model.update(data);

      //! insertar las etiquetas
      tags = JSON.parse(tags);

      for (const tag of tags) {
        let model = { id_tag: tag.id, id_blog: id };
        let insert = await _model.createTag(model);
      }

      //! insertar las imagenes
      images = JSON.parse(images);

      for (const img of images) {
        let insert = await _model.updateImg(id, img);
      }

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
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);
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

    let response = await _model.getImages();
    let array = [];
    if (response != "error" && response != "No se encontraron coincidencias.") {
      for (const item of response) {
        if (typeof item.id_blog == "number" && item.id_blog == id) {
          array.push(item);
        }
      }
    }

    let item = await _model.getById(id);

    let portada = item.image;

    let result = await _model.delete(id);
    let message;
    let status = "success";
    result == "success" ? (message = "item eliminado") : (message = result);

    result != "success" ? (status = "error") : status;

    if (result == "success") {
      for (const blogimg of array) {
        let deleteimg = await _model.delImg(blogimg.image);

        //todo eliminar imagen
        //borrar imagen subida.
        let img = blogimg.image;
        let splitimg = img.split(".");
        let nimg = splitimg[0];
        nimg = nimg + ".webp";

        //let filePath2 = 'uploads\\blog\\'+nimg
        let filePath2 = "uploads/blog/" + nimg; //! linux
        fs.unlink(filePath2, (err) => {
          /* console.log(err)*/
        });

        //let filePath = 'uploads\\blog\\'+img
        let filePath = "uploads/blog/" + img; //! linux
        fs.unlink(filePath, (err) => {
          /* console.log(err)*/
        });
      }

      //eliminar la portada
      let img = portada;
      let splitimg = img.split(".");
      let nimg = splitimg[0];
      nimg = nimg + ".webp";

      //let filePath2 = 'uploads\\blog\\'+nimg
      let filePath2 = "uploads/blog/" + nimg; //! linux
      fs.unlink(filePath2, (err) => {
        /* console.log(err)*/
      });

      //let filePath = 'uploads\\blog\\'+img
      let filePath = "uploads/blog/" + img; //! linux
      fs.unlink(filePath, (err) => {
        /* console.log(err)*/
      });
    }

    return res.status(200).send({
      message: message,
      status: status,
    });
  },

  deleteTag: async (req, res) => {
    const _repo = new blogRepo();
    const _model = new blogModel(_repo);
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

    let result = await _model.deleteTag(id);
    let message;
    let status = "success";
    result == "success" ? (message = "item eliminado") : (message = result);

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

    let path_image = "./uploads/blog/" + image;

    if (ext == "webp") {
      fs.access(path_image, fs.constants.F_OK, (err) => {
        if (err) {
          //buscarla como jpg
          let imagejpg = `${splitimg[0]}.jpg`;
          let path_image2 = "./uploads/blog/" + imagejpg;
          fs.access(path_image2, fs.constants.F_OK, (err) => {
            if (err) {
              //buscarla como png
              let imagepng = `${splitimg[0]}.png`;
              let path_image2 = "./uploads/blog/" + imagepng;
              fs.access(path_image2, fs.constants.F_OK, (err) => {
                if (err) {
                  //buscarla como jpeg
                  let imagejpeg = `${splitimg[0]}.jpeg`;
                  let path_image2 = "./uploads/blog/" + imagejpeg;
                  fs.access(path_image2, fs.constants.F_OK, (err) => {
                    if (err) {
                      return res
                        .status(200)
                        .send({
                          message: "No existe la imagen",
                          status: "error",
                        });
                    } else {
                      //convertir a webp
                      let imagewebp = `${splitimg[0]}.webp`;

                      const result3 = webp.cwebp(
                        `./uploads/blog/${imagejpeg}`,
                        `./uploads/blog/${imagewebp}`,
                        "-q 80"
                      );
                      result3.then((response) => {
                        let path_image3 = "./uploads/blog/" + imagewebp;
                        fs.access(path_image3, fs.constants.F_OK, (err) => {
                          if (err) {
                            return res
                              .status(200)
                              .send({
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
                    `./uploads/blog/${imagepng}`,
                    `./uploads/blog/${imagewebp}`,
                    "-q 80"
                  );
                  result3.then((response) => {
                    let path_image3 = "./uploads/blog/" + imagewebp;
                    fs.access(path_image3, fs.constants.F_OK, (err) => {
                      if (err) {
                        return res
                          .status(200)
                          .send({
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
                `./uploads/blog/${imagejpg}`,
                `./uploads/blog/${imagewebp}`,
                "-q 80"
              );
              result3.then((response) => {
                let path_image3 = "./uploads/blog/" + imagewebp;
                fs.access(path_image3, fs.constants.F_OK, (err) => {
                  if (err) {
                    return res
                      .status(200)
                      .send({
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
};

module.exports = controller;

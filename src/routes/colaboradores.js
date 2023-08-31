'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/colaboradores'})
// colaboradoress

const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'


let colaboradores = require ('../modules/colaboradores/controller');

router.get(`/${cGet}`+'/colaboradores',  colaboradores.getAll);
router.get(`/${cGet}`+'/colaboradores/:id',  colaboradores.getById);
router.get(`/${cGet}`+'/colaboradores-url/:id',  colaboradores.getByUrl);
router.get(`/${cGet}`+'/buscar/colaboradores/:search',  colaboradores.search);

router.post(`/${cPost}`+'/colaboradores/create', md_auth.authenticated, colaboradores.create);
router.put(`/${cPut}`+'/colaboradores/update/', md_auth.authenticated , colaboradores.update);
router.put(`/${cPut}`+'/colaboradores/upload/image/:id', multipartMiddleware,md_auth.authenticated , colaboradores.uploadImage)
router.delete(`/${cDel}`+'/colaboradores/delete', md_auth.authenticated , colaboradores.delete)

router.get(`/${cGet}`+'/colaboradores-img/:image', colaboradores.getImageFile);


module.exports = router;
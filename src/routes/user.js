'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/users'})
let multipartMiddleware2 = multipart({ uploadDir: './tmp'})
// users

const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'


let user = require ('../modules/user/controller');

router.get(`/${cGet}`+'/usuarios', md_auth.authenticated , user.getAll);
router.get(`/${cGet}`+'/user/:id', md_auth.authenticated , user.getById);
router.get(`/${cGet}`+'/buscar/usuarios/:search', md_auth.authenticated , user.search);
router.post(`/${cPost}`+'/login', user.login);
router.post(`/${cPost}`+'/reenviar-codigo', user.reenviarCodigo);
router.post(`/${cPost}`+'/create-auth', md_auth.authenticated, user.createAuth);
router.post(`/${cPost}`+'/get-auth', md_auth.authenticated, user.getAuth);
router.post(`/${cPost}`+'/user/create', md_auth.authenticated, user.create);
router.put(`/${cPut}`+'/user/update/', md_auth.authenticated , user.update);
router.put(`/${cPut}`+'/user/upload/image/:id', multipartMiddleware,md_auth.authenticated , user.uploadImage)
router.delete(`/${cDel}`+'/user/delete', md_auth.authenticated , user.delete)

router.get(`/${cGet}`+'/user-img/:image', user.getImageFile);
router.get(`/${cGet}`+'/public-img/:image', user.getPublicImageFile);
router.post(`/${cPost}`+'/info_usr',  md_auth.authenticated , user.getData)
router.post(`/${cPost}`+'/user-register/create', user.create2);
router.post(`/${cPost}`+'/session/create',  md_auth.authenticated , user.valSession)

router.post('/j43-wdrDE4s_wffs2/contacto', user.contacto);
router.post('/j43-wdrDE4s_wffs2/cotizar', user.cotizar);
module.exports = router;
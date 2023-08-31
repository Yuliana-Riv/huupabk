'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/banner'})

const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'

// banners

let address = require ('../modules/address/controller');

router.get(`/${cGet}`+'/address' , address.getAll);
router.get(`/${cGet}`+'/address/:id', address.getById);
router.get(`/${cGet}`+'/address/user/:id_user', address.getByUser);
router.get(`/${cGet}`+'/buscar/address/:search' ,address.search);

router.post(`/${cPost}`+'/address/create', md_auth.authenticated,  address.create);
router.put(`/${cPut}`+'/address/update',md_auth.authenticated, address.update);
router.delete(`/${cDel}`+'/address/delete', md_auth.authenticated, address.delete);


module.exports = router;
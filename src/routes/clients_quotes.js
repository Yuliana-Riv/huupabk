'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/clients_quotes'})


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'


let clients_quotes = require ('../modules/clients_quotes/controller');


router.get(`/${cGet}`+'/clients_quotes',  clients_quotes.getAll);
router.get(`/${cGet}`+'/clients_quotes/:id',  clients_quotes.getById);
router.get(`/${cGet}`+'/buscar/clients_quotes/:search', clients_quotes.search);

router.post(`/${cPost}`+'/clients_quotes/create', multipartMiddleware, md_auth.authenticated, clients_quotes.create);
router.put(`/${cPut}`+'/clients_quotes/update/', multipartMiddleware, md_auth.authenticated , clients_quotes.update);
router.delete(`/${cDel}`+'/clients_quotes/delete', md_auth.authenticated , clients_quotes.delete)

router.post(`/${cPost}`+'/clients_quotes-image/create', multipartMiddleware, md_auth.authenticated, clients_quotes.uploadImage);  
router.get(`/${cGet}`+'/clients_quotes-img/:image', clients_quotes.getImageFile); 
router.delete(`/${cDel}`+'/clients_quotes/delete', md_auth.authenticated , clients_quotes.delImage)



module.exports = router;
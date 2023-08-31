
'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/logo'})

const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'


let personalize = require ('../modules/personalize/controller');

router.get(`/${cGet}`+'/personalize',  personalize.getAll);
router.get(`/${cGet}`+'/personalize/:id',  personalize.getById);

router.put(`/${cPut}`+'/personalize/update/',multipartMiddleware ,  md_auth.authenticated , personalize.update);
router.get(`/${cGet}`+'/personalize-img/:image', personalize.getImageFile);


module.exports = router;




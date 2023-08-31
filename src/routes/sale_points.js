'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/sale_points'})


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'


let sale_points = require ('../modules/sale_points/controller');


router.get(`/${cGet}`+'/sale_points',  sale_points.getAll);
router.get(`/${cGet}`+'/sale_points/:id',  sale_points.getById);
router.get(`/${cGet}`+'/buscar/sale_points/:search', sale_points.search);

router.post(`/${cPost}`+'/sale_points/create', multipartMiddleware, md_auth.authenticated, sale_points.create);
router.put(`/${cPut}`+'/sale_points/update/', multipartMiddleware, md_auth.authenticated , sale_points.update);
router.delete(`/${cDel}`+'/sale_points/delete', md_auth.authenticated , sale_points.delete)

router.post(`/${cPost}`+'/sale_points-image/create', multipartMiddleware, md_auth.authenticated, sale_points.uploadImage);  
router.get(`/${cGet}`+'/sale_points-img/:image', sale_points.getImageFile); 
router.delete(`/${cDel}`+'/sale_points/delete', md_auth.authenticated , sale_points.delImage)



module.exports = router;
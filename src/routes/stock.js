'use strict'

let express = require ('express')
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/product'})


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'


let stock = require ('../modules/stock/controller');


router.get(`/${cGet}`+'/stock',  stock.getAll);
router.get(`/${cGet}`+'/stock/:id',  stock.getById);
router.get(`/${cGet}`+'/stock_product/:id',  stock.getByProduct);
router.get(`/${cGet}`+'/buscar/stock/:search', stock.search);


router.post(`/${cPost}`+'/stock/create', md_auth.authenticated, stock.create);
router.put(`/${cPut}`+'/stock/update/', md_auth.authenticated , stock.update);
router.delete(`/${cDel}`+'/stock/delete', md_auth.authenticated , stock.delete)



module.exports = router;
'use strict'

let express = require ('express')
const router = express.Router();
let md_auth = require('../middlewares/authenticated');


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'

let category = require('../modules/category/controller');

router.get(`/${cGet}`+'/category' , category.categories);
router.get(`/${cGet}`+'/category/:id', category.categoryById);
router.get(`/${cGet}`+'/category/bycategory/:id', category.categoryByCategory);
router.get(`/${cGet}`+'/buscar/category/:search', category.search);
router.post(`/${cPost}`+'/category/create', md_auth.authenticated, category.create);
router.put(`/${cPut}`+'/category/update', md_auth.authenticated, category.updateCategory);
router.delete(`/${cDel}`+'/category/delete', md_auth.authenticated,category.deleteCategory);

module.exports = router;
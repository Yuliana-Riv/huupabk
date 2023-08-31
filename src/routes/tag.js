'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'

let tag = require ('../modules/tag/controller');


router.get(`/${cGet}`+'/tag' , tag.getAll);
router.get(`/${cGet}`+'/tag/:id',  tag.getById);
router.get(`/${cGet}`+'/buscar/tag/:search',  tag.search);


router.post(`/${cPost}`+'/tag/create', md_auth.authenticated, tag.create);
router.put(`/${cPut}`+'/tag/update/', md_auth.authenticated , tag.update);
router.delete(`/${cDel}`+'/tag/delete', md_auth.authenticated , tag.delete)



module.exports = router;
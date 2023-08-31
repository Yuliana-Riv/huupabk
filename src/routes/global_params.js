'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');

const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'

let global_params = require ('../modules/global_params/controller');


router.get(`/${cGet}`+'/global_params' , global_params.getAll);
router.get(`/${cGet}`+'/global_params/:id',md_auth.authenticated,  global_params.getById);


router.post(`/${cPost}`+'/global_params/create', md_auth.authenticated, global_params.create);
router.put(`/${cPut}`+'/global_params/update/', md_auth.authenticated , global_params.update);
router.delete(`/${cDel}`+'/global_params/delete', md_auth.authenticated , global_params.delete)



module.exports = router;
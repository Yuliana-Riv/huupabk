
'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'


let profile = require ('../modules/profile/controller');

router.get(`/${cGet}`+'/profile',  profile.getAll);
router.get(`/${cGet}`+'/profile/:id',  profile.getById);

router.post(`/${cPost}`+'/profile/create', md_auth.authenticated, profile.create);
router.put(`/${cPut}`+'/profile/update/', md_auth.authenticated , profile.update);
router.delete(`/${cDel}`+'/profile/delete', md_auth.authenticated , profile.delete)



module.exports = router;
'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'


let suscripciones = require ('../modules/suscripciones/controller');


router.get(`/${cGet}`+'/suscripciones',  suscripciones.getAll);
router.get(`/${cGet}`+'/suscripciones/:id',  suscripciones.getById);
router.get(`/${cGet}`+'/buscar/suscripciones/:search', suscripciones.search);

router.post(`/${cPost}`+'/suscripciones/create', suscripciones.create);
router.delete(`/${cDel}`+'/suscripciones/delete', md_auth.authenticated , suscripciones.delete)



module.exports = router;
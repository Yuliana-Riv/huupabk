'use strict'

let express = require ('express')
const router = express.Router();
let md_auth = require('../middlewares/authenticated');



const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'



let cupon = require ('../modules/cupon/controller')

router.get(`/${cGet}`+'/cupones',  md_auth.authenticated,  cupon.findAll)
router.get(`/${cGet}`+'/cupon/:id',  md_auth.authenticated,  cupon.findById)
router.get(`/${cGet}`+'/cupon/code/:code',  md_auth.authenticated,  cupon.findByCode)
router.get(`/${cGet}`+'/buscar/cupones/:search',  md_auth.authenticated,  cupon.search)
router.post(`/${cPost}`+'/cupon/create',  md_auth.authenticated,  cupon.cuponCreate)
router.put(`/${cPut}`+'/cupon/update',  md_auth.authenticated,  cupon.cuponUpdate)
router.delete(`/${cDel}`+'/cupon/delete',  md_auth.authenticated,  cupon.delete)

//Eliminar restricciones 
router.delete(`/${cDel}`+'/rcustomer/delete', md_auth.authenticated, cupon.deleteRCustomer);
router.delete(`/${cDel}`+'/rproduct/delete', md_auth.authenticated, cupon.deleteRProduct);
router.delete(`/${cDel}`+'/rcategory/delete', md_auth.authenticated, cupon.deleteRCategory);

module.exports = router;
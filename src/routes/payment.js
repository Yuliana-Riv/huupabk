'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'

// banners

let payment = require ('../modules/payment/controller');


router.get(`/${cGet}`+'/payment' , md_auth.authenticated, payment.getAll);
router.get(`/${cGet}`+'/payment/:id',  md_auth.authenticated,  payment.getById);
router.get(`/${cGet}`+'/payment/user/:id', md_auth.authenticated, payment.getByClient);
router.get(`/${cGet}`+'/buscar/payment/:search' , md_auth.authenticated, payment.search);


router.post(`/${cPost}`+'/payment/create', md_auth.authenticated,  payment.paymentCreate);
router.post(`/${cPost}`+'/charge_test/create', md_auth.authenticated,  payment.createCharge);//pruebas
router.put(`/${cPut}`+'/charge_status/update',md_auth.authenticated, payment.validateCharge);
router.put(`/${cPut}`+'/payment_status/update',md_auth.authenticated, payment.paymentStatus);
router.put(`/${cPut}`+'/payment_tracking_number/update',md_auth.authenticated, payment.paymentTrackingNumber);
router.delete(`/${cDel}`+'/payment/delete', md_auth.authenticated, payment.delete);


router.post(`/${cPost}`+'/shipment/create', md_auth.authenticated,  payment.createShipment);
router.post(`/${cPost}`+'/label/create', md_auth.authenticated,  payment.createLabel);
router.post(`/${cPost}`+'/cancel_label_requests/create', md_auth.authenticated,  payment.cancelLabel);
router.delete(`/${cDel}`+'/shipment/delete', md_auth.authenticated, payment.deleteShipment);


module.exports = router;
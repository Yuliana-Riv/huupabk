'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let md_authcar = require('../middlewares/auth_car_token')

let carrito = require ('../modules/carrito/controller');


const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'

//router.post(`/${cPost}`+'/tokenauth/create' ,  carrito.tokenAuth);  //tokenvoid
router.post(`/${cPost}`+'/set_cart/create' , md_authcar.authenticated, carrito.setCart);  //CARRITO EN BLANCO
router.post(`/${cPost}`+'/get_cart/create' , md_authcar.authenticated, carrito.getCart);  //DEVOLVER EL CARRITO DECODIFICADO


//Agregar / eliminar /editar items.
router.put(`/${cPut}`+'/add_item/update' , md_authcar.authenticated, carrito.addItemToCart); 
router.delete(`/${cDel}`+'/del_item/delete' , md_authcar.authenticated, carrito.deleteItem);
router.put(`/${cPut}`+'/upt_item/update' ,  md_authcar.authenticated, carrito.updateCart);

router.post(`/${cPost}`+'/valid_cart/create' ,  md_authcar.authenticated, carrito.validateCart); //validar el carrito...

//Agregar / eliminar cupones
router.put(`/${cPut}`+'/add_cupon/update' , md_authcar.authenticated, carrito.addCupon);
router.delete(`/${cDel}`+'/del_cupon/delete' , carrito.delCupon);


/***Enviar correo "prueba" */
router.post('/j43-wdrDE4s_wffs2/pago', carrito.pruebaPlantillasPago);

module.exports = router;
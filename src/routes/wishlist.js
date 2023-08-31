'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');



let wishlist = require ('../modules/carrito/wishlistController')

const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv' 
const cDel = 'bpc_nzQ/GtU-TgA'


//wishlist
//router.post('/code/create',  md_auth.authenticated,  wishlist.codeCreate)
router.get(`/${cGet}`+'/wishlist',  md_auth.authenticated,  wishlist.findAll)
router.get(`/${cGet}`+'/wishlist/:id',  md_auth.authenticated,  wishlist.findById)
router.get(`/${cGet}`+'/wishlist/customer/:id',  md_auth.authenticated,  wishlist.findByCustomer)
router.get(`/${cGet}`+'/buscar/wishlist/:search',  md_auth.authenticated,  wishlist.search)
router.post(`/${cPost}`+'/wishlist/create',  md_auth.authenticated,  wishlist.wishCreate)
router.delete(`/${cDel}`+'/wishlist/delete',  md_auth.authenticated,  wishlist.delete)

module.exports = router;
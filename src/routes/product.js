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


let product = require ('../modules/product/controller');

router.get(`/${cGet}`+'/product' , product.findAll);
router.get(`/${cGet}`+'/product/:id', product.findById);
router.get(`/${cGet}`+'/product/url/:url', product.findByUrl);
router.get(`/${cGet}`+'/product/by/category/:id', product.findByCategory);
router.get(`/${cGet}`+'/product/by/categoryname/:name', product.findByCategoryName);
router.get(`/${cGet}`+'/buscar/product/:search' ,product.search);

router.post(`/${cPost}`+'/product_value/create', md_auth.authenticated, product.createProductAttValue);
router.post(`/${cPost}`+'/product_variante/create', md_auth.authenticated, product.createProductVariante);
router.post(`/${cPost}`+'/product/create',multipartMiddleware, md_auth.authenticated, product.create);
router.put(`/${cPut}`+'/product/update',multipartMiddleware, md_auth.authenticated, product.update);
router.put(`/${cPut}`+'/product_class/update',multipartMiddleware, md_auth.authenticated, product.update_skd_class);
router.delete(`/${cDel}`+'/product/delete', md_auth.authenticated, product.delete);
router.delete(`/${cDel}`+'/product_value/delete', md_auth.authenticated, product.deleteProdAttValor);
router.delete(`/${cDel}`+'/product_variante/delete', md_auth.authenticated, product.deleteVariante);
//Productos por categoria


let productcat = require ('../modules/product/productCatController');

router.get(`/${cGet}`+'/product_cat' , productcat.findAll);
/**/
router.get(`/${cGet}`+'/product_cat/:id', productcat.findById);
router.get(`/${cGet}`+'/product_cat/by/product/:id', productcat.findByProduct);

router.get(`/${cGet}`+'/product_cat/by/category/:id', productcat.findByCategory);
router.get(`/${cGet}`+'/buscar/product_cat/:search' ,productcat.search);/**/

router.post(`/${cPost}`+'/product_cat/create', md_auth.authenticated, productcat.create);
router.put(`/${cPut}`+'/product_cat/update',multipartMiddleware, md_auth.authenticated, productcat.update);
router.delete(`/${cDel}`+'/product_cat/delete', md_auth.authenticated, productcat.delete);/**/


//Imagenes producto.
router.post(`/${cPost}`+'/product/image/create',multipartMiddleware, md_auth.authenticated, product.addImagesProd);
router.delete(`/${cDel}`+'/product/image/delete', md_auth.authenticated, product.deleteImageProd);
router.get(`/${cGet}`+'/product/images/:id', product.findImagesProd);

router.get(`/${cGet}`+'/get-product-image/:image', product.getImageFile);





let productval = require ('../modules/product/productValController');

router.get(`/${cGet}`+'/product_val' , productval.findAll);
router.get(`/${cGet}`+'/product_val/:id' , productval.findById);
router.get(`/${cGet}`+'/product/product_val/:id_product' , productval.findByIdProduct);
router.get(`/${cGet}`+'/buscar/product_val/:value' , productval.search);

router.post(`/${cPost}`+'/product_val/create',  productval.create);
router.put(`/${cPut}`+'/product_val/update',  productval.update);
router.delete(`/${cDel}`+'/product_val/delete',   productval.delete)




let atributo = require ('../modules/product/atributoController');


router.get(`/${cGet}`+'/atributo',  atributo.getAll);
router.get(`/${cGet}`+'/atributo/:id',  atributo.getById);
router.get(`/${cGet}`+'/buscar/atributo/:search', atributo.search);


router.post(`/${cPost}`+'/atributo/create', md_auth.authenticated, atributo.create);
router.put(`/${cPut}`+'/atributo/update/', md_auth.authenticated , atributo.update);
router.delete(`/${cDel}`+'/atributo/delete', md_auth.authenticated , atributo.delete)

router.post(`/${cPost}`+'/atributo_valor/create', md_auth.authenticated, atributo.createValor);
router.delete(`/${cDel}`+'/atributo_valor/delete', md_auth.authenticated , atributo.deleteValor)



/*let brand = require ('../modules/product/brandController');

router.get(`/${cGet}`+'/brand',  brand.getAll);
router.get(`/${cGet}`+'/brand/:id',  brand.getById);
router.get(`/${cGet}`+'/buscar/brand/:search', brand.search);

router.post(`/${cPost}`+'/brand/create', md_auth.authenticated, brand.create);
router.put(`/${cPut}`+'/brand/update/', md_auth.authenticated , brand.update);
router.delete(`/${cDel}`+'/brand/delete', md_auth.authenticated , brand.delete)
*/


module.exports = router;
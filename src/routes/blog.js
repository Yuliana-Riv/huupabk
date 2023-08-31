'use strict'

let  express = require('express');
const router = express.Router();
let md_auth = require('../middlewares/authenticated');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({ uploadDir: './uploads/blog'})



const cPost = 'f4p_HC4/42v-UHc'
const cGet = 'ayn_Rqv/WW9-AGv'
const cPut = '6su_DPB/toj-YBD'
const cDel = 'bpc_nzQ/GtU-TgA'

let blog_category = require ('../modules/blog/blogController');


router.get(`/${cGet}`+'/blog_category' , blog_category.getAll);
router.get(`/${cGet}`+'/blog_category/:id', blog_category.getById);
router.get(`/${cGet}`+'/buscar/blog_category/:search',  blog_category.search);


router.post(`/${cPost}`+'/blog_category/create', md_auth.authenticated, blog_category.create);
router.put(`/${cPut}`+'/blog_category/update/', md_auth.authenticated , blog_category.update);
router.delete(`/${cDel}`+'/blog_category/delete', md_auth.authenticated , blog_category.delete)


let blog = require ('../modules/blog/blogController');

router.get(`/${cGet}`+'/blog' , blog.getAll);
router.get(`/${cGet}`+'/blog/:id', blog.getById);
router.get(`/${cGet}`+'/blog-by-category/:id', blog.getByCategory);
router.get(`/${cGet}`+'/blog-by-tag/:id', blog.getByEtiqueta);
router.get(`/${cGet}`+'/blog-url/:id', blog.getByUrl);
router.get(`/${cGet}`+'/buscar/blog/:search',  blog.search);


router.post(`/${cPost}`+'/blog/create', multipartMiddleware, md_auth.authenticated, blog.create);
router.put(`/${cPut}`+'/blog/update/', multipartMiddleware, md_auth.authenticated , blog.update);
router.delete(`/${cDel}`+'/blog/delete', md_auth.authenticated , blog.delete)
router.delete(`/${cDel}`+'/blog-tag/delete', md_auth.authenticated , blog.deleteTag)

router.post(`/${cPost}`+'/blog-image/create', multipartMiddleware, md_auth.authenticated, blog.uploadImage);


router.get(`/${cGet}`+'/blog-img/:image', blog.getImageFile);

router.delete(`/${cDel}`+'/blogimage/delete', md_auth.authenticated , blog.delImage)


let blogcomments = require ('../modules/blog/blogCommentsController');

router.get(`/${cGet}`+'/blog_comments' , blogcomments.findAll);
router.get(`/${cGet}`+'/blog_comments/:id' , blogcomments.findById);
router.get(`/${cGet}`+'/blog/blog_comments/:id_blog' , blogcomments.findByIdBlog);
router.get(`/${cGet}`+'/buscar/blog_comments/:value' , blogcomments.search);

router.post(`/${cPost}`+'/blog_comments/create', blogcomments.create);
router.put(`/${cPut}`+'/blog_comments/update',  blogcomments.update);
router.delete(`/${cDel}`+'/blog_comments/delete', blogcomments.delete)
module.exports = router;
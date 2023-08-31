'use strict'

let  express = require('express');
const router = express.Router();

// users
let test = require ('../modules/test/controller');

router.get('/test' , test.test);




module.exports = router;
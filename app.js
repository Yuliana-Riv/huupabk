'use strict'
var cron = require ('node-cron');
let  express = require ('express');
let  morgan = require ('morgan');
let  cors = require  ('cors');
let path = require ('path');

//NodeCron
let session = require('./src/services/cron/delExpSessions')

const app = express();
const local_port = 3778;

cron.schedule('30 * * * *', function() { 
    session.execute();
});





app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//  Cargar archivos de rutas

let test = require('./src/routes/test');
let user = require('./src/routes/user');
let blog = require('./src/routes/blog');
let colaboradores = require('./src/routes/colaboradores');
let tag = require('./src/routes/tag');
let profile = require('./src/routes/profile');
let personalize = require('./src/routes/personalize');
let category = require('./src/routes/category');
let product = require('./src/routes/product');
let stock = require('./src/routes/stock');
let cupon = require('./src/routes/cupon');
let global_params = require('./src/routes/global_params');
let carrito = require('./src/routes/carrito');
let suscripciones = require('./src/routes/suscripciones');
let payment = require('./src/routes/payment');
let skydropx = require('./src/routes/skydropx');
let address = require('./src/routes/address');
let wishlist = require('./src/routes/wishlist');
let clients_quotes = require('./src/routes/clients_quotes');
let sale_points = require('./src/routes/sale_points');

const baseStr = '/api/mFy_ebp/sYR-33o';

app.use(baseStr, test);
app.use(baseStr, user);
app.use(baseStr, blog);
app.use(baseStr, tag);
app.use(baseStr, colaboradores);
app.use(baseStr, profile);
app.use(baseStr, personalize);
app.use(baseStr, category);
app.use(baseStr, product);
app.use(baseStr, stock);
app.use(baseStr, cupon);
app.use(baseStr, global_params);
app.use(baseStr, carrito);
app.use(baseStr, suscripciones);
app.use(baseStr, payment);
app.use(baseStr, skydropx);
app.use(baseStr, address);
app.use(baseStr, wishlist);
app.use(baseStr, clients_quotes);
app.use(baseStr, sale_points);

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || local_port);
const server = app.listen(app.get('port'), () => {
    console.log('Listening on port: ', app.get('port'));
});

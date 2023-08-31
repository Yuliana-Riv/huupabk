CREATE DATABASE huupa_db_32fhd;

use huupa_db_32fhd;

CREATE TABLE users(
id  int(11) auto_increment not null,
name varchar(100) not null,
lastname varchar(100) not null,
email varchar(150) not null,
pass varchar(300) not null,
phone varchar (30),
birthdate varchar (30),
role varchar(50) not null DEFAULT 'user',
image varchar(255),
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_user PRIMARY KEY(id)
)ENGINE=InnoDb;

INSERT INTO users  (name, lastname, email, pass, phone, role, image) VALUES ('Brayan', 'Miranda', 'brayan.miiranda12@gmail.com', '$2b$10$JaIYejy6vdcRaP233dDNTuHdbpE/GOS0ywufXCyA0sCu3.sloBsN2', '6221270622', 'legrafica', 'sin imagen');

CREATE TABLE session (
id  int(11) auto_increment not null,
id_user int not null,
type varchar(30) not null,
code varchar(30) not null,
exp DATE,
created_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_session PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE profile(
id  int(11) auto_increment not null,
name varchar(150) not null,
code varchar(50) not null,
main varchar(50) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_profile PRIMARY KEY(id)
)ENGINE=InnoDb; 


INSERT INTO profile(name, code, main) VALUES('Color Resalte','#E21F1D','si');
INSERT INTO profile(name, code, main) VALUES('Color Principal','#242424','si');
INSERT INTO profile(name, code, main) VALUES('Links','#A7A7A7','si');
INSERT INTO profile(name, code, main) VALUES('Title','#8D8D8D','si');
INSERT INTO profile(name, code, main) VALUES('Body Text','#ffffff','si');
INSERT INTO profile(name, code, main) VALUES('Sidebar Text/Lines','#E5E5E5','si');
INSERT INTO profile(name, code, main) VALUES('Blanco','#ffffff','si');

CREATE TABLE personalize(
id  int(11) auto_increment not null,
logo varchar(150),
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_personalize PRIMARY KEY(id)
)ENGINE=InnoDb; 
INSERT INTO personalize(logo) VALUES('logo.png');















CREATE TABLE categories(
id  int(11) auto_increment not null,
name varchar(150) not null,
id_parent int(11) not null DEFAULT '0',
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_category PRIMARY KEY(id)
)ENGINE=InnoDb;

INSERT INTO categories (name, id_parent) VALUES ('INICIO', 0);


CREATE TABLE product(
id  int(11) auto_increment not null,
id_category int(11) not null,
/*id_brand int(11) not null,*/
name varchar(250) not null,
descrp  varchar(300),
skd_weight int(11) not null DEFAULT 0,
skd_height int(11) not null DEFAULT 0,
skd_width int(11) not null DEFAULT 0,
skd_length int(11) not null DEFAULT 0,
url  varchar(1000),
status varchar(100) not null DEFAULT 'INACTIVO',
price decimal(15,2) not null,
code  varchar(250) not null,
image varchar(255) not null,
skd_class  varchar(300),
skd_class_descrp varchar(500),
created_at timestamp  DEFAULT current_timestamp,
update_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_product PRIMARY KEY(id),
CONSTRAINT fk_category_product FOREIGN KEY (id_category)
    REFERENCES categories(id)/*,
CONSTRAINT fk_brand_product FOREIGN KEY (id_brand)
    REFERENCES brand(id)*/
)ENGINE=InnoDb; 


CREATE TABLE images_product(
id  int(11) auto_increment not null,
id_product int not null,
image varchar(255) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_images_product PRIMARY KEY(id),
CONSTRAINT fk_product_ip FOREIGN KEY (id_product)
    REFERENCES product(id)
)ENGINE=InnoDb;

CREATE TABLE product_stock(
id  int(11) auto_increment not null,
id_product int not null,
stock decimal(15,2) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_product_stock PRIMARY KEY(id),
CONSTRAINT fk_product_ps FOREIGN KEY (id_product)
    REFERENCES product(id)
)ENGINE=InnoDb;


CREATE TABLE coupon (
id  int(11) auto_increment not null,  
name varchar(150) not null,
descrp varchar(150) not null,
exclusivo  varchar(150) not null DEFAULT 'NO', -- NO -> puede usarse junto a otros cupones SI -> debe ser solo ese cupon sin otros mas.
code varchar(150) not null,
status varchar(50) not null DEFAULT 'INACTIVO',
date_a varchar(150) not null,
date_b varchar(150) not null,
freeShipping  varchar(10) not null DEFAULT 'NO',
totalAvailable int(11) not null,
totalAvailableCustomer int(11) not null,
minAmount decimal(15,2) not null,
maxAmount decimal(15,2) not null,
type varchar(50) not null DEFAULT 'IMPORTE',
value decimal(15,2) not null,
limitCustomers varchar(10) not null DEFAULT 'NO',
ExcludeCustomers varchar(10) not null DEFAULT 'NO',
limitCategories varchar(10) not null DEFAULT 'NO',
ExcludeCategories varchar(10) not null DEFAULT 'NO',
limitProducts varchar(10) not null DEFAULT 'NO',
ExcludeProducts varchar(10) not null DEFAULT 'NO',
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_coupon PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE coupon_restrictions_customers (
    id  int(11) auto_increment not null,  
    id_coupon int not null,
    customer_email varchar(250) not null,
    type  varchar(50) not null,
    created_at timestamp  DEFAULT current_timestamp,
    updated_at timestamp  DEFAULT current_timestamp, 
    CONSTRAINT pk_cr_cms PRIMARY KEY(id),
    CONSTRAINT fk_coupon_cr_cms FOREIGN KEY (id_coupon)
    REFERENCES coupon(id)
)ENGINE=InnoDb;

CREATE TABLE coupon_restrictions_products (
    id  int(11) auto_increment not null,  
    id_coupon int not null,
    product varchar(150) not null,
    type  varchar(50) not null,
    created_at timestamp  DEFAULT current_timestamp,
    updated_at timestamp  DEFAULT current_timestamp,
    CONSTRAINT pk_cr_pdc PRIMARY KEY(id),
    CONSTRAINT fk_coupon_cr_pdc FOREIGN KEY (id_coupon)
    REFERENCES coupon(id)
)ENGINE=InnoDb;

CREATE TABLE coupon_restrictions_categories (
    id  int(11) auto_increment not null,  
    id_coupon int not null,
    category varchar(150) not null,
    type  varchar(50) not null,
    created_at timestamp  DEFAULT current_timestamp,
    updated_at timestamp  DEFAULT current_timestamp,
    CONSTRAINT pk_cr_ctg PRIMARY KEY(id),
    CONSTRAINT fk_coupon_cr_ctg FOREIGN KEY (id_coupon)
    REFERENCES coupon(id)
)ENGINE=InnoDb;


CREATE TABLE product_category( 
    id int(11) auto_increment not null, 
    id_product int not null, 
    id_category int not null, 
    created_at timestamp DEFAULT current_timestamp, 
    updated_at timestamp DEFAULT current_timestamp, 
    CONSTRAINT pk_product_cat PRIMARY KEY(id), 
    CONSTRAINT fk_product_ps1 FOREIGN KEY (id_product) 
    REFERENCES product(id), 
    CONSTRAINT fk_product_cat FOREIGN KEY (id_category) 
    REFERENCES categories(id) )
    ENGINE=InnoDb;

    

CREATE TABLE payment( 
    id int(11) auto_increment not null, 
   
    status  varchar(150) not null  DEFAULT 'PAGANDO',
    pay_num varchar(150) not null, 
    method varchar(150) DEFAULT 'tarjeta',
    order_id varchar(250), 
    customer_id varchar(250), 
    
    subtotal decimal(15,2) not null,
    envio decimal(15,2) not null,
    descupon decimal(15,2) not null,
    total decimal(15,2) not null,

    tracking_number varchar(300),
    shipping_option varchar(100)  DEFAULT 'Home delivery',
    carrier varchar(5000) not null  DEFAULT 'Ninguna',
    
    
     id_user int,
     name varchar(150) not null,
     lastname varchar(150) not null,
     email varchar(150) not null,
     phone varchar(150) not null,
    
     address varchar(250) not null,
     country varchar(150) not null,
     state varchar(150) not null,
     city varchar(150) not null,
       postal_code varchar(50) not null,
     notes varchar(150),

     receipt  varchar(25000),
   

    created_at timestamp DEFAULT current_timestamp, 
    updated_at timestamp DEFAULT current_timestamp, 
    CONSTRAINT pk_payment PRIMARY KEY(id)
 )
ENGINE=InnoDb;

CREATE TABLE  payment_billing (
id  int(11) auto_increment not null,
id_payment  int not null,
postal_code varchar(50) not null,
fiscal_address varchar(250) not null,
country varchar(150) not null,
state varchar(150) not null,
city varchar(150) not null,
email varchar(150) not null,
phone varchar(150) not null,
reason_social varchar(150) not null,
rfc varchar(150) not null,
created_at timestamp  DEFAULT current_timestamp,
update_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_payment_billing PRIMARY KEY(id),
CONSTRAINT fk_pb_payment FOREIGN KEY (id_payment)
           REFERENCES payment(id)
)ENGINE=InnoDb;


CREATE TABLE  payment_shipment (
id  int(11) auto_increment not null,
id_payment  int not null,
shipment_id varchar(150),
_class varchar(150),
_packaging varchar(150),
descr_class  varchar(700),
descr_packaging  varchar(700),
json_shipment_res varchar(20000),
json_label_res varchar(20000),
rate_id  varchar(150),
label_id varchar(150),
cancelado varchar(150) not null  DEFAULT 'no',
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_payment_shipment PRIMARY KEY(id),
CONSTRAINT fk_ps_payment FOREIGN KEY (id_payment)
           REFERENCES payment(id)
)ENGINE=InnoDb;





CREATE TABLE payment_detail (
id  int(11) auto_increment not null,   
id_payment  int not null,
name varchar(150) not null,
price  decimal(15,2) not null,
quantity  int not null,
subtotal  decimal(15,2) not null,
id_item int,
extra  varchar(1000),
type varchar(250) not null DEFAULT 'product', 
created_at timestamp  DEFAULT current_timestamp,
update_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_payment_detail PRIMARY KEY(id),
 CONSTRAINT fk_pd_payment FOREIGN KEY (id_payment)
            REFERENCES payment(id)
)ENGINE=InnoDb;


CREATE TABLE  payment_coupons (
id  int(11) auto_increment not null,  
customer_email varchar(150) not null,
id_payment  int not null,
code varchar(150) not null,
freeShipping  varchar(10) not null,
type varchar(50) not null ,
value decimal(15,2) not null,
exclusivo varchar(150),
descupon decimal(15,2) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_payment_coupons PRIMARY KEY(id),
CONSTRAINT fk_pc_payment FOREIGN KEY (id_payment)
        REFERENCES payment(id)
 )ENGINE=InnoDb; 


CREATE TABLE atributo(
id  int(11) auto_increment not null,
name varchar(150) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_atributo PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE atributo_valores(
id  int(11) auto_increment not null,
id_atributo int(11) not null,
valor varchar(150) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_atributo_valores PRIMARY KEY(id),
CONSTRAINT fk_atributo_av FOREIGN KEY (id_atributo)
    REFERENCES atributo(id)
)ENGINE=InnoDb;



CREATE TABLE product_atributo_valores(
id  int(11) auto_increment not null,
id_product int(11) not null,
id_atributo_valor int(11) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_product_atributo_valores PRIMARY KEY(id),
CONSTRAINT fk_atributo_valor_pav FOREIGN KEY (id_atributo_valor)
    REFERENCES atributo_valores(id),
CONSTRAINT fk_product_pav FOREIGN KEY (id_product)
    REFERENCES product(id)
)ENGINE=InnoDb;


CREATE TABLE product_variante(
id  int(11) auto_increment not null,
id_product int(11) not null,
id_variante int(11) not null,
CONSTRAINT pk_product_variante PRIMARY KEY(id),
CONSTRAINT fk_product_pv FOREIGN KEY (id_product)
    REFERENCES product(id),
CONSTRAINT fk_variante_pv FOREIGN KEY (id_variante)
    REFERENCES product(id)
)ENGINE=InnoDb;

CREATE TABLE product_valuation (
    id  int(11) auto_increment not null,
     id_product int,
     name varchar(150) not null,
     email varchar(150) not null,
     comment varchar(150) not null,
     valuation  int(11),
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
     CONSTRAINT pk_product_val PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE global_params (
    id  int(11) auto_increment not null,
    shipping_price decimal(15,2),
    free_shipping decimal(15,2),
    texto varchar(500),
    created_at timestamp  DEFAULT current_timestamp,
    updated_at timestamp  DEFAULT current_timestamp,
    CONSTRAINT pk_global_params PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE suscripciones(
id  int(11) auto_increment not null,
email varchar(250) not null,
sub_date DATE,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_suscripciones PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE address(
id  int(11) auto_increment not null,
id_user int not null,
title varchar(60) not null,
address varchar(200) not null,
ref varchar(500) null,
zip int(8) null,
city varchar(60) not null,
state varchar(60) not null,
country varchar(60) not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_address PRIMARY KEY(id),
CONSTRAINT fk_address_user FOREIGN KEY (id_user)
    REFERENCES users(id)
)ENGINE=InnoDb;


CREATE TABLE  wishlist (
id  int(11) auto_increment not null,  
id_product  int not null,
id_user int not null,
created_at timestamp  DEFAULT current_timestamp,
updated_at timestamp  DEFAULT current_timestamp,
CONSTRAINT pk_wishlist PRIMARY KEY(id),
CONSTRAINT fk_product_w FOREIGN KEY (id_product)
    REFERENCES product(id),
CONSTRAINT fk_users_w FOREIGN KEY (id_user)
    REFERENCES users(id)
)ENGINE=InnoDb; 



/**blog**/
CREATE TABLE tag (
     id  int(11) auto_increment not null,
     name varchar(150) not null,
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
     CONSTRAINT pk_tag PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE colaboradores (
     id  int(11) auto_increment not null,
     image  varchar(255) ,
     name varchar(150) not null,
     url varchar(200) not null,
     descrp  varchar(350) ,
     about varchar(5000) ,
     facebook varchar(250) ,
     instagram varchar(250) ,
     twiter varchar(250) ,
     linkedin varchar(250) ,
     email varchar(250) ,
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
     CONSTRAINT pk_colaboradores PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE blog (
     id  int(11) auto_increment not null,
     title varchar(250) not null,
     url varchar(350) not null,
     descrp  varchar(550) not null,
     id_autor  int not null,
     id_category int not null,
     id_colaborador int,
     image  varchar(400),
     dateblog DATE not null,
     formato varchar(50) not null DEFAULT 'F1',
     statusblog varchar(50) not null DEFAULT 'OCULTO',
     orden varchar(50) not null DEFAULT 'NA',
     body varchar(60000) not null,
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
     CONSTRAINT fk_blog_bc FOREIGN KEY (id_category)
        REFERENCES categories(id),
     CONSTRAINT fk_blog_users FOREIGN KEY (id_autor)
        REFERENCES users(id),
     CONSTRAINT pk_blog PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE blog_images (
    id  int(11) auto_increment not null,
     id_blog int,
     image varchar(400),
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
     CONSTRAINT pk_blog_images PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE blog_tags (
    id  int(11) auto_increment not null,
     id_blog int not null,
     id_tag int not null,
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
    CONSTRAINT fk_blog_bt FOREIGN KEY (id_blog)
        REFERENCES blog(id),
     CONSTRAINT fk_tag_bt FOREIGN KEY (id_tag)
        REFERENCES tag(id),
     CONSTRAINT pk_blog_tags PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE blog_categories (
    id  int(11) auto_increment not null,
     id_blog int not null,
     id_category int not null,
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
    CONSTRAINT fk_blog_bct FOREIGN KEY (id_blog)
        REFERENCES blog(id),
    CONSTRAINT fk_category_bc FOREIGN KEY (id_category)
        REFERENCES categories(id),
    CONSTRAINT pk_blog_categories PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE blog_comments (
    id  int(11) auto_increment not null,
     id_blog int,
     name varchar(150) not null,
     email varchar(150) not null,
     comment varchar(150) not null,
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
     CONSTRAINT pk_blog_comments PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE clients_quotes (
     id  int(11) auto_increment not null,
     fullname varchar(150) not null,
     quote  varchar(500) not null, 
     image varchar(255),
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
     CONSTRAINT pk_blog_comments PRIMARY KEY(id)
)ENGINE=InnoDb;


CREATE TABLE sale_points (
     id  int(11) auto_increment not null,
     name varchar(150) not null, 
     link varchar(150) not null, 
     city varchar(60) not null, 
     image varchar(255),
     created_at timestamp  DEFAULT current_timestamp,
     updated_at timestamp  DEFAULT current_timestamp,
     CONSTRAINT pk_blog_comments PRIMARY KEY(id)
)ENGINE=InnoDb;

"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[816],{1673:function(t,a,s){s.d(a,{Z:function(){return l}});var e=function(){var t=this,a=t._self._c;return a("div",{staticClass:"Footer",attrs:{id:"Contacto"}},[a("div",{staticClass:"pd"},[a("p",{staticClass:"tl"},[t._v("Contáctanos")]),a("div",{staticClass:"form-c"},[t._m(0),a("div",{staticClass:"form"},[a("section",[a("p",{staticClass:"tl-i"},[t._v("NOMBRE")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",name:"name",id:"name"},domProps:{value:t.name},on:{input:function(a){a.target.composing||(t.name=a.target.value)}}})]),a("section",[a("p",{staticClass:"tl-i"},[t._v("CORREO")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",name:"correo",id:"correo"},domProps:{value:t.email},on:{input:function(a){a.target.composing||(t.email=a.target.value)}}})]),a("section",[a("p",{staticClass:"tl-i"},[t._v("MENSAJE")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.mensaje,expression:"mensaje"}],attrs:{name:"mensaje",id:"mensaje"},domProps:{value:t.mensaje},on:{input:function(a){a.target.composing||(t.mensaje=a.target.value)}}})]),a("section",[a("div",{staticClass:"btn",on:{click:function(a){return t.enviarMail(t.name,t.email,t.mensaje)}}},[t._v("ENVIAR MENSAJE")]),"success"==this.status?a("div",[a("p",{staticClass:"cart_msg cart_success"},[t._v(t._s(this.msg))])]):t._e(),"error"==this.status?a("div",[a("p",{staticClass:"cart_msg cart_error"},[t._v(t._s(this.msg))])]):t._e()])])]),a("p",{staticClass:"copyright"},[t._v("© 2023 Huupa. Todos los derechos reservados.")]),t._m(1)])])},i=[function(){var t=this,a=t._self._c;return a("div",{staticClass:"info"},[a("p",[t._v(" No pierdas la oportunidad de probar el mejor sabor de café de México. ")]),a("p",[t._v(" Ponte en contacto con nosotros para hacernos llegar tus comentarios y resolver cualquier duda. ")])])},function(){var t=this,a=t._self._c;return a("div",{staticClass:"dwn-menu"},[a("a",{staticClass:"logo",attrs:{href:""}},[a("img",{attrs:{src:s(1335),alt:"logo"}})]),a("section",{staticClass:"md"},[a("a",{attrs:{href:""}},[t._v("Home")]),a("a",{attrs:{href:""}},[t._v("Nosotros")]),a("a",{attrs:{href:""}},[t._v("Tienda")]),a("a",{attrs:{href:""}},[t._v("Contacto")])]),a("div",{staticClass:"sm-c"},[a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(7111),alt:"fb"}})]),a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(7205),alt:"ig"}})]),a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(7221),alt:"yt"}})])])])}],o={data(){return{name:"",email:"",mensaje:"",status:"",msg:""}},methods:{delStatus:function(){setTimeout((()=>this.delMsgs()),5e3)},delMsgs:function(){this.status="",this.msg=""},enviarMail:async function(t,a,s){if(this.msg="",this.status="",void 0==t||""==t||null==t)this.msg="El campo nombre no es valido.",this.status="error";else if(void 0==a||""==a||null==a)this.msg="El campo correo no es valido.",this.status="error";else if(void 0==s||""==s||null==s)this.msg="El campo comentarios no es valido.",this.status="error";else{let e={name:t,email:a,mensaje:s},i=await this.$store.dispatch("admin/enviarMailContacto",e);console.log(i),"success"==i.status?(this.status="success",this.msg="Mensaje enviado con exito.",this.name="",this.email="",this.mensaje="",this.delStatus()):(this.status="error",this.msg="Lo sentimos ha ocurrido un error al intentar entregar tu mensaje.")}}}},r=o,n=s(3736),c=(0,n.Z)(r,e,i,!1,null,null,null),l=c.exports},417:function(t,a,s){s.d(a,{Z:function(){return l}});var e=function(){var t=this,a=t._self._c;return a("div",{staticClass:"Nav",class:{adjust:t.scrollP>0}},[t._m(0),a("div",{staticClass:"hd-n"},[a("div",{staticClass:"col1"},[a("div",{staticClass:"msec"},[t._m(1),t._m(2),a("img",{staticClass:"btnmenu",attrs:{src:s(7808),alt:"logo"},on:{click:function(a){t.menu_it=!0}}})]),a("div",{staticClass:"menu-nav",class:{active:1==t.menu_it}},[a("div",{staticClass:"twoitems"},[t._m(3),a("img",{staticClass:"btnmenu",attrs:{src:s(3585),alt:"logo"},on:{click:function(a){t.menu_it=!1}}})]),a("div",{staticClass:"menu-items-l"},[a("a",{class:{act:"Home"==t.$route.name},attrs:{href:"/"}},[t._v("HOME")]),a("a",{class:{act:"Catalogo"==t.$route.name},attrs:{href:"/catalogo"}},[t._v("TIENDA")]),a("a",{attrs:{href:""}},[t._v("SOBRE NOSOTROS")]),a("a",{class:{act:"Suscripcion"==t.$route.name},attrs:{href:"/suscripcion"}},[t._v("SUSCRIPCIÓN")]),a("a",{attrs:{href:""}},[t._v("BLOG")]),a("a",{attrs:{href:"#Contacto"}},[t._v("CONTACTO")])]),t._m(4),t._m(5),t._m(6)])]),a("div",{staticClass:"col2"},[a("div",{staticClass:"search pc"},[1==t.search_it?a("input",{attrs:{type:"text",name:"",id:"",placeholder:"Buscar..."}}):t._e(),a("img",{staticClass:"lupa",attrs:{src:s(7340),alt:"lupa"},on:{click:function(a){1==t.search_it?t.search_it=!1:t.search_it=!0}}})]),t._m(7),t._m(8)])])])},i=[function(){var t=this,a=t._self._c;return a("div",{staticClass:"up-n"},[a("div",{staticClass:"pd"},[a("div",{staticClass:"sm-c pc"},[a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(7379),alt:"fb"}})]),a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(2499),alt:"ig"}})]),a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(3867),alt:"yt"}})])]),a("p",{staticClass:"tl"},[t._v("¡Bienvenidos a una tienda bien Sonorense!")]),a("div",{staticClass:"snt pc"},[a("img",{attrs:{src:s(4690),alt:"truck"}}),a("p",[t._v("Envío GRATIS a todo México a partir de $500MXN")])])])])},function(){var t=this,a=t._self._c;return a("a",{staticClass:"carrito mo",attrs:{href:""}},[a("img",{attrs:{src:s(1102),alt:"cart"}})])},function(){var t=this,a=t._self._c;return a("a",{staticClass:"logo",attrs:{href:"/"}},[a("img",{attrs:{src:s(1335),alt:"logo"}})])},function(){var t=this,a=t._self._c;return a("a",{staticClass:"user mo",attrs:{href:""}},[a("img",{attrs:{src:s(8874),alt:"user"}})])},function(){var t=this,a=t._self._c;return a("div",{staticClass:"search mo"},[a("input",{attrs:{type:"text",name:"",id:""}}),a("img",{staticClass:"lupa",attrs:{src:s(7340),alt:"lupa"}})])},function(){var t=this,a=t._self._c;return a("div",{staticClass:"sm-c mo"},[a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(7111),alt:"fb"}})]),a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(7205),alt:"ig"}})]),a("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[a("img",{attrs:{src:s(7221),alt:"yt"}})])])},function(){var t=this,a=t._self._c;return a("div",{staticClass:"snt mo"},[a("img",{attrs:{src:s(6015),alt:"truck"}}),a("p",[t._v("Envío GRATIS a todo México a partir de $500MXN")])])},function(){var t=this,a=t._self._c;return a("a",{staticClass:"user pc",attrs:{href:""}},[a("img",{attrs:{src:s(8874),alt:"user"}})])},function(){var t=this,a=t._self._c;return a("a",{staticClass:"carrito pc",attrs:{href:""}},[a("img",{attrs:{src:s(1102),alt:"cart"}})])}],o={data(){return{menu_it:!1,search_it:!1,scrollP:0}},methods:{scroll(t){let a=t.target.documentElement.scrollTop,s=1*a;localStorage.setItem("scroll",s),this.scrollP=localStorage.getItem("scroll")}},mounted(){window.addEventListener("scroll",this.scroll)}},r=o,n=s(3736),c=(0,n.Z)(r,e,i,!1,null,null,null),l=c.exports},8816:function(t,a,s){s.r(a),s.d(a,{default:function(){return g}});var e=function(){var t=this,a=t._self._c;return a("div",{staticClass:"Producto"},[a("Navigator"),t._m(0),a("div",{staticClass:"producto-body"},[a("div",{staticClass:"pro-sec"},[a("section",{staticClass:"producto-cont"},[a("div",{attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("div",{staticClass:"prod-image pc"}),t.data.imagenes&&t.data.imagenes.length>1?a("carousel",{staticClass:"gallery-sl pc",attrs:{perPage:3,navigationEnabled:"",paginationActiveColor:"#fe9128",paginationColor:"#b1b1b1"}},t._l(t.data.imagenes,(function(t,s){return a("slide",{key:s,staticClass:"gallery-item"})})),1):t._e()],1),a("div",{staticClass:"info-cont"},[a("p",{staticClass:"titulo-info",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[t._v(" "+t._s(t.data.name)+" ")]),a("p",{staticClass:"brand-info",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[t._v(" Categoría "+t._s(t.data.category_name)+" ")]),a("p",{staticClass:"price-info",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[t._v(" $"+t._s(t.data.price)+"MXN ")]),a("div",{attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("div",{staticClass:"prod-image mo"}),t.data.imagenes&&t.data.imagenes.length>1?a("carousel",{staticClass:"gallery-sl mo",attrs:{perPage:3,navigationEnabled:"",paginationActiveColor:"#fe9128",paginationColor:"#b1b1b1"}},t._l(t.data.imagenes,(function(t,s){return a("slide",{key:s,staticClass:"gallery-item"})})),1):t._e()],1),a("p",{staticClass:"descrp-info",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[t._v(" "+t._s(t.data.descrp)+" ")]),this.messageError?a("p",{staticClass:"message-error"},[t._v(" "+t._s(this.messageError)+" ")]):t._e(),t._l(t.data.atributosFilt,(function(s,e){return a("div",{key:e,staticClass:"atributos-cont",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("div",{staticClass:"dflx"},[a("p",{staticClass:"atributo"},[t._v(t._s(s.atributo)+":")]),a("div",{staticClass:"content-valor-select"},[a("p",{staticClass:"valor-select"},[t._v(t._s(s.sel))])])]),a("div",{staticClass:"dflx"},t._l(s.values,(function(e,i){return a("div",{key:i},[a("p",{staticClass:"pvalue",class:{"active-value":e==s.sel},on:{click:function(a){s.sel=e,t.findProd(s.atributo,e,t.data)}}},[t._v(" "+t._s(e)+" ")])])})),0)])})),a("div",{staticClass:"cantidad-cont",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("p",{staticClass:"cnt"},[t._v("Cantidad:")]),a("div",{staticClass:"cantidad-op-cont"},[a("input",{attrs:{type:"checkbox",name:"check",id:"checkoptions"}}),a("label",{attrs:{for:"checkoptions"}},[a("div",{staticClass:"cant-select"},[a("div",{staticClass:"c-s-cont"},[a("p",[t._v(t._s(t.selectNumb))]),a("img",{attrs:{src:"",alt:"flecha"}})])])]),a("div",{staticClass:"number-selects",attrs:{id:"numbSel"}},[a("div",{staticClass:"number-s-cont",on:{click:function(a){return t.isfalse()}}},t._l(100,(function(s){return a("p",{key:s,on:{click:function(a){t.selectNumb=s}}},[t._v(" "+t._s(s)+" ")])})),0)])])]),a("div",{staticClass:"two-btn-cont"},[a("div",{attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("div",{staticClass:"add-cart",on:{click:function(a){return t.agregarItem(t.selectNumb)}}},[a("p",[t._v("AGREGAR EL CARRITO")])])]),a("div",{attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("div",{staticClass:"shop-cart",on:{mouseover:function(a){t.hover1=!0},mouseleave:function(a){t.hover1=!1},click:function(a){return t.agregarItem2(t.selectNumb)}}},[(t.hover1,a("img",{attrs:{src:"",alt:"cart"}})),a("p",[t._v("COMPRAR AHORA")])])])]),""!=t.status?a("div",{staticClass:"status_messages"},["success"==t.status?a("div",{staticClass:"msg msg_success"},[a("p",[t._v(t._s(t.message))])]):t._e(),"error"==t.status?a("div",{staticClass:"msg msg_error"},[a("p",[t._v(t._s(t.message))])]):t._e()]):t._e()],2)]),a("p",{staticClass:"comments-title",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[t._v(" COMENTARIOS ")]),a("section",{staticClass:"comments-sec",attrs:{id:"comentarios"}},["error"!==t.addedCo?a("div",{staticClass:"comments-box"},[t._l(t.addedCo,(function(s,e){return a("section",{key:e,staticClass:"comment-i",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("p",{staticClass:"user"},[a("b",[t._v(t._s(s.name))])]),a("div",{staticClass:"five-stars"},[a("div",{staticClass:"star-i small-star",class:{active:s.valuation>=1}}),a("div",{staticClass:"star-i small-star",class:{active:s.valuation>=2}}),a("div",{staticClass:"star-i small-star",class:{active:s.valuation>=3}}),a("div",{staticClass:"star-i small-star",class:{active:s.valuation>=4}}),a("div",{staticClass:"star-i small-star",class:{active:s.valuation>=5}})]),a("p",{staticClass:"comments"},[t._v(t._s(s.comment)+" ")]),1==t.logisav?a("section",{staticClass:"edit-c"},[t.identity.email==s.email?a("p",{on:{click:function(a){(t.editco=s.id)&&(t.comment=s.comment)}}},[t._v("Editar comentario")]):t._e()]):t._e(),a("p",{staticClass:"date"},[t._v(t._s(s.dateproduct)+" "),a("span",[t._v(t._s(s.hourproduct))])])])})),t.arraylength>3?a("div",{staticClass:"pagination",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("img",{staticClass:"pointer",class:{disabled:1==t.pageNum},attrs:{src:"",alt:"prev"},on:{click:function(a){t.pageNum-=1}}}),a("img",{staticClass:"pointer",class:{disabled:t.pageNum==t.totalPages},attrs:{src:"",alt:"next"},on:{click:function(a){t.pageNum+=1}}})]):t._e()],2):a("div",{staticClass:"comments-box",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("p",{staticClass:"comments"},[t._v("No hay comentarios.")])]),1==t.logisav?a("form",{attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"},on:{submit:function(a){return a.preventDefault(),t.sendValuation(t.data.id,t.identity.fullname,t.identity.email,t.comment,t.valuation,t.tosave)}}},[a("div",{staticClass:"form-inputs",class:{hgt:t.closeU}},[a("div",{staticClass:"valuation-c",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("p",[t._v(" TU PUNTUACIÓN*: ")]),a("div",{staticClass:"five-stars"},[a("div",{staticClass:"star-i pointer",class:{active:t.valuation>=1||t.hoverval>=1},on:{mouseover:function(a){t.hoverval=1},mouseout:function(a){t.hoverval=0},click:function(a){t.valuation=1}}}),a("div",{staticClass:"star-i pointer",class:{active:t.valuation>=2||t.hoverval>=2},on:{mouseover:function(a){t.hoverval=2},mouseout:function(a){t.hoverval=0},click:function(a){t.valuation=2}}}),a("div",{staticClass:"star-i pointer",class:{active:t.valuation>=3||t.hoverval>=3},on:{mouseover:function(a){t.hoverval=3},mouseout:function(a){t.hoverval=0},click:function(a){t.valuation=3}}}),a("div",{staticClass:"star-i pointer",class:{active:t.valuation>=4||t.hoverval>=4},on:{mouseover:function(a){t.hoverval=4},mouseout:function(a){t.hoverval=0},click:function(a){t.valuation=4}}}),a("div",{staticClass:"star-i pointer",class:{active:t.valuation>=5||t.hoverval>=5},on:{mouseover:function(a){t.hoverval=5},mouseout:function(a){t.hoverval=0},click:function(a){t.valuation=5}}})])]),a("section",[1==t.closeU?a("p",{staticClass:"close pointer",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"},on:{click:function(a){return t.closeLS()}}},[t._v(" Eliminar usuario ")]):t._e()]),a("section",{attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("p",{staticClass:"comments-p",class:{coblue:t.editco>0}},[t._v("COMENTARIO:")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.comment,expression:"comment"}],staticClass:"txtarea",class:{bblue:t.editco>0},attrs:{name:"comentario",placeholder:"¿Qué te pareció este producto?"},domProps:{value:t.comment},on:{input:function(a){a.target.composing||(t.comment=a.target.value)}}})])]),a("div",{staticClass:"two-rows",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[0==t.editco?a("input",{staticClass:"send-comment",attrs:{type:"submit",value:"ENVIAR"}}):a("input",{staticClass:"send-comment editco",attrs:{type:"button",value:"EDITAR"},on:{click:function(a){return t.editValuation(t.editco,t.comment,t.valuation)}}})]),""!=t.status2?a("div",{staticClass:"status_messages"},["success"==t.status2?a("div",{staticClass:"msg msg_success"},[a("p",[t._v(t._s(t.message2))])]):t._e(),"error"==t.status2?a("div",{staticClass:"msg msg_error"},[a("p",[t._v(t._s(t.message2))])]):t._e()]):t._e()]):a("div",{staticClass:"not-logged-com"},[t._m(1)])])])]),a("Footer")],1)},i=[function(){var t=this,a=t._self._c;return a("div",{staticClass:"head-nav-cont"},[a("div",{staticClass:"nav-product"},[a("div",{staticClass:"nav-pro-cont"},[a("input",{attrs:{type:"checkbox",name:"check",id:"checknav"}}),a("label",{staticClass:"label1",attrs:{for:"checknav"}},[a("div",{staticClass:"nav-btn"},[a("p",[t._v("Categoría")]),a("img",{attrs:{src:"",alt:"arrow"}})])])])])])},function(){var t=this,a=t._self._c;return a("div",{staticClass:"nlc-cont",attrs:{"data-aos":"fade-zoom-in","data-aos-easing":"ease-in-back","data-aos-duration":"700"}},[a("p",[a("b",[t._v("¿Quieres hacer una reseña del producto?")]),t._v(" "),a("a",{attrs:{href:"/login"}},[t._v("Inicia sesión aquí")]),t._v(" o si no tienes una cuenta, "),a("a",{attrs:{href:"/login"}},[t._v("regístrate")])])])}],o=(s(7658),s(417)),r=s(1673),n=s(629),c=s(7409);let l=s(3631);var d={name:"ProductoShop",data(){return{hover1:!1,editco:0,selectNumb:1,urlpath:l,status:"",message:"",status2:"",message2:"",name:null===localStorage.getItem("sdel")?"":localStorage.getItem("sdel"),email:null===localStorage.getItem("sdel")?"":localStorage.getItem("sdel"),comment:"",valuation:0,hoverval:0,tosave:!1,closeU:null!==localStorage.getItem("sdne")||null!==localStorage.getItem("sdel"),messageError:"",titlego:"",imagesel:"",pageNum:1,pageSize:3,arraylength:0,logisav:null!==localStorage.getItem("tkn")}},components:{Carousel:c.Carousel,Slide:c.Slide,Navigator:o.Z,Footer:r.Z},metaInfo(){return{title:this.data.name,titleTemplate:"%s | Agriga de México",htmlAttrs:{lang:"es"},meta:[{charset:"utf-8"},{name:"description",content:this.data.descrp},{name:"viewport",content:"width=device-width, initial-scale=1"}]}},async created(){let t={option:"product/url",url:this.$route.params.url};await this.findByUrlPro(t);let a={option:"product/product_val",id:1},s=await this.getInfoByIdProVal(a);await this.setAddedProVal(s),await this.getIdentity()},computed:{identity(){return this.$store.getters["admin/getIdentity"]},data(){let t=this.$store.getters["product/data"];return console.log(t),this.titlego=t.name,t},addedCo(){let t=this.$store.getters["product_val/getAdded"];if(this.arraylength=t.length,"error"==t)return"error";{let a=t.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize);return a}},proId2(){let t=this.$store.getters["product_val/data"];if(0==this.editco)return"error";{let a=[];for(let s=0;s<t.length;s++)t[s].id==this.editco&&a.push(t[s]);return a}},totalPages(){let t=Math.ceil(this.arraylength/this.pageSize);return t<this.pageNum&&(this.pageNum=1),t},gp(){let t=this.$store.getters["global_params/data"],a=[];return Array.isArray(t)?(a=t,a):[]}},methods:{...(0,n.nv)("product",["findByUrlPro"]),...(0,n.nv)("product",["getInfoByIdPro"]),...(0,n.nv)("product_val",["setAddedProVal"]),...(0,n.nv)("product_val",["getInfoByIdProVal"]),...(0,n.nv)("product_val",["getAllInfoProVal"]),...(0,n.nv)("global_params",["getAllInfoGlp"]),getIdentity:async function(){let t=await this.$store.dispatch("admin/getData");return t},isfalse(){let t=document.getElementById("checkoptions");t.checked=!1},agregarItem:async function(t){let a={item:this.data,_ctk:localStorage.getItem("_ctk"),cantidad:t},s=await this.$store.dispatch("carrito/editItemCrt",{option:"add_item",item:a});"error"==s.status?(this.status="error",this.message=s.message,this.delStatus()):this.$router.push("/carrito").catch((t=>{}))},agregarItem2:async function(t){let a={item:this.data,_ctk:localStorage.getItem("_ctk"),cantidad:t},s=await this.$store.dispatch("carrito/editItemCrt",{option:"add_item",item:a});"error"==s.status?(this.status="error",this.message=s.message,this.delStatus()):this.$router.push("/check-out").catch((t=>{}))},delStatus:function(){setTimeout((()=>this.delMsgs()),2e3)},delMsgs:function(){this.status="",this.message="",this.status2="",this.message2="",this.messageError=""},findProd:async function(t,a,s){this.messageError="";let e=[];for(const c of s.atributosFilt)c.atributo!=t&&e.push({atributo:c.atributo,valor:c.sel});let i=[];for(const c of s.product_variantes)for(const s of c.producto.product_atributo_valores)if(s.atributo==t&&s.valor==a){i.push(c.producto);break}if(0==i.length){const s=t.toLowerCase();return this.messageError=`No hay mas variantes disponibles por el momento para ${s} ${a}.`,this.delStatus(),null}let o=[],r=i[0];if(i.length>1){for(const s of i){let t=0;for(const a of s.product_atributo_valores)for(const s of e)if(a.atributo==s.atributo&&a.valor==s.valor){t++;break}o.push(t)}let t=o[0],a=0;for(var n=1;n<i.length;n++)o[n]>t&&(t=o[n],a=n);r=i[a]}if(console.log("---------------encontrado----------"),console.log(r),r.id){let t={option:"product",id:r.id};await this.getInfoByIdPro(t);const a="/producto/"+this.data.url;this.$router.push(a).catch((t=>{}))}},sendValuation:async function(t,a,s,e,i){if(this.message2="",this.status2="",void 0==i||""==i||null==i)this.message2="Califíca el producto.",this.status2="error";else{let o={name:a,id_product:t,email:s,comment:e,valuation:i},r=await this.$store.dispatch("product_val/addItemProVal",{option:"product_val",item:o});if(console.log(r),"success"==r.status){this.status2="success",this.message2="Se agregó el comentario con éxito.";let t={option:"product/product_val",id:this.data.id};const a=await this.getInfoByIdProVal(t);await this.setAddedProVal(a),this.comment="",this.valuation=0,this.delStatus()}else this.status2="error",this.message2="Lo sentimos ha ocurrido un error al intentar enviar tu comentario."}},editValuation:async function(t,a,s){if(this.message2="",this.status2="",void 0==s||""==s||null==s)this.message2="Califíca el producto.",this.status2="error";else{let e={id:t,comment:a,valuation:s},i=await this.$store.dispatch("product_val/editItemProVal",{option:"product_val",item:e});if("success"==i.status){this.status2="success",this.message2="Se editó el comentario con éxito.";let t={option:"product/product_val",id:this.data.id};const a=await this.getInfoByIdProVal(t);await this.setAddedProVal(a),this.comment="",this.valuation=0,this.editco=0,this.delStatus()}else this.status2="error",this.message2="Lo sentimos ha ocurrido un error al intentar enviar tu comentario."}},regexImg(t){let a=t.split(".");return a[0]+".webp"},isWebp(t,a){let s=navigator.userAgent.toLowerCase();return s.indexOf("chrome")>-1||s.indexOf("firefox")>-1||s.indexOf("opera")>-1?t:s.indexOf("safari")>-1?a:void 0}}},u=d,m=s(3736),v=(0,m.Z)(u,e,i,!1,null,null,null),g=v.exports},1102:function(t,a,s){t.exports=s.p+"img/cart1.6070b835.svg"},7111:function(t,a,s){t.exports=s.p+"img/fb1.fca8fa07.svg"},7379:function(t,a,s){t.exports=s.p+"img/fb2.a339989d.svg"},7205:function(t,a,s){t.exports=s.p+"img/ig1.e2756e1e.svg"},2499:function(t,a,s){t.exports=s.p+"img/ig2.8e7cbb7d.svg"},1335:function(t,a,s){t.exports=s.p+"img/logo1.73c81943.svg"},7340:function(t,a,s){t.exports=s.p+"img/lupa1.7c4e8e86.svg"},7808:function(t,a,s){t.exports=s.p+"img/menu1.3efc3626.svg"},3585:function(t,a,s){t.exports=s.p+"img/menu2.220b9c86.svg"},6015:function(t,a,s){t.exports=s.p+"img/truck.6ea3a8e7.svg"},4690:function(t,a,s){t.exports=s.p+"img/truck2.c2e7ce81.svg"},8874:function(t,a,s){t.exports=s.p+"img/user1.1e80775d.svg"},7221:function(t,a,s){t.exports=s.p+"img/yt1.28c6421e.svg"},3867:function(t,a,s){t.exports=s.p+"img/yt2.741af806.svg"}}]);
//# sourceMappingURL=816.8d5c5939.js.map
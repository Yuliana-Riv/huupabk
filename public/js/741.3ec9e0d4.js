"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[741],{1673:function(t,s,a){a.d(s,{Z:function(){return l}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Footer",attrs:{id:"Contacto"}},[s("div",{staticClass:"pd"},[s("p",{staticClass:"tl"},[t._v("Contáctanos")]),s("div",{staticClass:"form-c"},[t._m(0),s("div",{staticClass:"form"},[s("section",[s("p",{staticClass:"tl-i"},[t._v("NOMBRE")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",name:"name",id:"name"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}})]),s("section",[s("p",{staticClass:"tl-i"},[t._v("CORREO")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",name:"correo",id:"correo"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}})]),s("section",[s("p",{staticClass:"tl-i"},[t._v("MENSAJE")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.mensaje,expression:"mensaje"}],attrs:{name:"mensaje",id:"mensaje"},domProps:{value:t.mensaje},on:{input:function(s){s.target.composing||(t.mensaje=s.target.value)}}})]),s("section",[s("div",{staticClass:"btn",on:{click:function(s){return t.enviarMail(t.name,t.email,t.mensaje)}}},[t._v("ENVIAR MENSAJE")]),"success"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_success"},[t._v(t._s(this.msg))])]):t._e(),"error"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_error"},[t._v(t._s(this.msg))])]):t._e()])])]),s("p",{staticClass:"copyright"},[t._v("© 2023 Huupa. Todos los derechos reservados.")]),t._m(1)])])},i=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"info"},[s("p",[t._v(" No pierdas la oportunidad de probar el mejor sabor de café de México. ")]),s("p",[t._v(" Ponte en contacto con nosotros para hacernos llegar tus comentarios y resolver cualquier duda. ")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"dwn-menu"},[s("a",{staticClass:"logo",attrs:{href:""}},[s("img",{attrs:{src:a(1335),alt:"logo"}})]),s("section",{staticClass:"md"},[s("a",{attrs:{href:""}},[t._v("Home")]),s("a",{attrs:{href:""}},[t._v("Nosotros")]),s("a",{attrs:{href:""}},[t._v("Tienda")]),s("a",{attrs:{href:""}},[t._v("Contacto")])]),s("div",{staticClass:"sm-c"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7111),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7205),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7221),alt:"yt"}})])])])}],r={data(){return{name:"",email:"",mensaje:"",status:"",msg:""}},methods:{delStatus:function(){setTimeout((()=>this.delMsgs()),5e3)},delMsgs:function(){this.status="",this.msg=""},enviarMail:async function(t,s,a){if(this.msg="",this.status="",void 0==t||""==t||null==t)this.msg="El campo nombre no es valido.",this.status="error";else if(void 0==s||""==s||null==s)this.msg="El campo correo no es valido.",this.status="error";else if(void 0==a||""==a||null==a)this.msg="El campo comentarios no es valido.",this.status="error";else{let e={name:t,email:s,mensaje:a},i=await this.$store.dispatch("admin/enviarMailContacto",e);console.log(i),"success"==i.status?(this.status="success",this.msg="Mensaje enviado con exito.",this.name="",this.email="",this.mensaje="",this.delStatus()):(this.status="error",this.msg="Lo sentimos ha ocurrido un error al intentar entregar tu mensaje.")}}}},c=r,o=a(3736),n=(0,o.Z)(c,e,i,!1,null,null,null),l=n.exports},417:function(t,s,a){a.d(s,{Z:function(){return l}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Nav",class:{adjust:t.scrollP>0}},[t._m(0),s("div",{staticClass:"hd-n"},[s("div",{staticClass:"col1"},[s("div",{staticClass:"msec"},[t._m(1),t._m(2),s("img",{staticClass:"btnmenu",attrs:{src:a(7808),alt:"logo"},on:{click:function(s){t.menu_it=!0}}})]),s("div",{staticClass:"menu-nav",class:{active:1==t.menu_it}},[s("div",{staticClass:"twoitems"},[t._m(3),s("img",{staticClass:"btnmenu",attrs:{src:a(3585),alt:"logo"},on:{click:function(s){t.menu_it=!1}}})]),s("div",{staticClass:"menu-items-l"},[s("a",{class:{act:"Home"==t.$route.name},attrs:{href:"/"}},[t._v("HOME")]),s("a",{class:{act:"Catalogo"==t.$route.name},attrs:{href:"/catalogo"}},[t._v("TIENDA")]),s("a",{attrs:{href:""}},[t._v("SOBRE NOSOTROS")]),s("a",{class:{act:"Suscripcion"==t.$route.name},attrs:{href:"/suscripcion"}},[t._v("SUSCRIPCIÓN")]),s("a",{attrs:{href:""}},[t._v("BLOG")]),s("a",{attrs:{href:"#Contacto"}},[t._v("CONTACTO")])]),t._m(4),t._m(5),t._m(6)])]),s("div",{staticClass:"col2"},[s("div",{staticClass:"search pc"},[1==t.search_it?s("input",{attrs:{type:"text",name:"",id:"",placeholder:"Buscar..."}}):t._e(),s("img",{staticClass:"lupa",attrs:{src:a(7340),alt:"lupa"},on:{click:function(s){1==t.search_it?t.search_it=!1:t.search_it=!0}}})]),t._m(7),t._m(8)])])])},i=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"up-n"},[s("div",{staticClass:"pd"},[s("div",{staticClass:"sm-c pc"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7379),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(2499),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(3867),alt:"yt"}})])]),s("p",{staticClass:"tl"},[t._v("¡Bienvenidos a una tienda bien Sonorense!")]),s("div",{staticClass:"snt pc"},[s("img",{attrs:{src:a(4690),alt:"truck"}}),s("p",[t._v("Envío GRATIS a todo México a partir de $500MXN")])])])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"carrito mo",attrs:{href:""}},[s("img",{attrs:{src:a(1102),alt:"cart"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"logo",attrs:{href:"/"}},[s("img",{attrs:{src:a(1335),alt:"logo"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"user mo",attrs:{href:""}},[s("img",{attrs:{src:a(8874),alt:"user"}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"search mo"},[s("input",{attrs:{type:"text",name:"",id:""}}),s("img",{staticClass:"lupa",attrs:{src:a(7340),alt:"lupa"}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"sm-c mo"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7111),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7205),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7221),alt:"yt"}})])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"snt mo"},[s("img",{attrs:{src:a(6015),alt:"truck"}}),s("p",[t._v("Envío GRATIS a todo México a partir de $500MXN")])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"user pc",attrs:{href:""}},[s("img",{attrs:{src:a(8874),alt:"user"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"carrito pc",attrs:{href:""}},[s("img",{attrs:{src:a(1102),alt:"cart"}})])}],r={data(){return{menu_it:!1,search_it:!1,scrollP:0}},methods:{scroll(t){let s=t.target.documentElement.scrollTop,a=1*s;localStorage.setItem("scroll",a),this.scrollP=localStorage.getItem("scroll")}},mounted(){window.addEventListener("scroll",this.scroll)}},c=r,o=a(3736),n=(0,o.Z)(c,e,i,!1,null,null,null),l=n.exports},741:function(t,s,a){a.r(s),a.d(s,{default:function(){return m}});var e=function(){var t=this,s=t._self._c;return s("div",[t._v(" "+t._s(t.data)+" "),s("Navigator"),t._m(0),s("div",{staticClass:"B2"},[s("div",{staticClass:"B2B1"},[t._m(1),s("div",{staticClass:"B2B1_F2"},t._l(4,(function(e,i){return s("div",{key:i},[i<3?s("div",{staticClass:"B2B1_F2B1"},[s("img",{attrs:{src:a(1090)}})]):t._e()])})),0),t._m(2)]),s("div",{staticClass:"B2B2"},[s("p",{staticClass:"B2B2_T1"},[t._v("HUUPA EXTREMO")]),s("p",{staticClass:"B2B2_T2"},[t._v("$160.00 MXN")]),s("p",{staticClass:"B2B2_T3"},[t._v("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")]),s("p",{staticClass:"B2B2_T4"},[t._v("Más detalles")]),s("p",{staticClass:"B2B2_T5"},[t._v("Gramos")]),s("div",{staticClass:"B2B2_F6"},[s("div",{staticClass:"B2B2_F6F",class:{B2B2_F6FRed:"250 gr"==t.Gramos},on:{click:function(s){t.Gramos="250 gr"}}},[s("p",[t._v("250 gr")])]),s("div",{staticClass:"B2B2_F6F",class:{B2B2_F6FRed:"500 gr"==t.Gramos},on:{click:function(s){t.Gramos="500 gr"}}},[s("p",[t._v("500 gr")])]),s("div",{staticClass:"B2B2_F6F",class:{B2B2_F6FRed:"1 gr"==t.Gramos},on:{click:function(s){t.Gramos="1 gr"}}},[s("p",[t._v("1 kg")])])]),s("p",{staticClass:"B2B2_T5"},[t._v("Molido")]),s("div",{staticClass:"B2B2_F6"},[s("div",{staticClass:"B2B2_F6F",class:{B2B2_F6FRed:"fino"==t.Molido},on:{click:function(s){t.Molido="fino"}}},[s("p",[t._v("fino")])]),s("div",{staticClass:"B2B2_F6F",class:{B2B2_F6FRed:"medio"==t.Molido},on:{click:function(s){t.Molido="medio"}}},[s("p",[t._v("medio")])]),s("div",{staticClass:"B2B2_F6F",class:{B2B2_F6FRed:"grueso"==t.Molido},on:{click:function(s){t.Molido="grueso"}}},[s("p",[t._v("grueso")])])]),s("p",{staticClass:"B2B2_T5"},[t._v("Opción de compra")]),s("div",{staticClass:"B2B2_F7"},[s("div",{staticClass:"B2B2_FF",on:{click:function(s){t.selectM="Susnt",t.openWeeks=!1}}},[s("div",{staticClass:"B2B2_F",class:{B2B2_FRed:"Susnt"==t.selectM}})]),s("p",[t._v("Comprar una vez")])]),s("div",{staticClass:"B2B2_F8"},[s("div",{staticClass:"B2B2_F8F"},[s("div",{staticClass:"B2B2_FF",on:{click:function(s){t.selectM="Sus"}}},[s("div",{staticClass:"B2B2_F",class:{B2B2_FRed:"Sus"==t.selectM}})]),s("p",{staticClass:"B2B2_F8B2"},[t._v("suscripción")]),s("img",{staticClass:"B2B2_F8B3"})]),"Sus"==t.selectM?s("div",{staticClass:"B2B2_F8F2"},[s("div",{staticClass:"BLine"}),s("div",{staticClass:"B2B2_F8F3",on:{click:function(s){t.openWeeks=!t.openWeeks}}},[s("div",{staticClass:"B2B2_F8C"},[s("p",{staticClass:"B2B2_F8T1"},[t._v("Frecuencia")]),s("div",{staticClass:"B2B2_F8T2"},[s("p",[t._v(t._s(t.selectWeek))]),s("img",{attrs:{src:a(9020)}})])]),t.openWeeks?s("div",t._l(t.weeks,(function(a,e){return s("div",{key:e,staticClass:"B2B2_F8T",on:{click:function(s){t.selectWeek=a}}},[s("p",[t._v(t._s(a))])])})),0):t._e()]),s("p",{staticClass:"B2B2_F8F4"},[t._v("Obtendrás 5% de descuento en cada orden recurrente")])]):t._e()]),s("p",{staticClass:"B2B2_T5"},[t._v("Cantidad")]),s("div",{staticClass:"B2B2_F9"},[s("img",{staticClass:"showMV",attrs:{src:a(4686)},on:{click:function(s){t.cantidad>1?t.cantidad=t.cantidad-1:t.cantidad}}}),s("img",{staticClass:"showDK",attrs:{src:a(6033)},on:{click:function(s){t.cantidad>1?t.cantidad=t.cantidad-1:t.cantidad}}}),s("p",[t._v(t._s(t.cantidad))]),s("img",{staticClass:"showMV",attrs:{src:a(7900)},on:{click:function(s){t.cantidad=t.cantidad+1}}}),s("img",{staticClass:"showDK",attrs:{src:a(2826)},on:{click:function(s){t.cantidad=t.cantidad+1}}})]),t._m(3)])]),t._m(4),s("Footer")],1)},i=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"B1"},[s("p",{staticClass:"B1T1"},[t._v("Tienda")]),s("p",{staticClass:"B1T2"},[t._v("Un café para cada momento")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"B2B1_F1"},[s("img",{attrs:{src:a(1090)}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"showDK B2B1_F3"},[s("img",{attrs:{src:a(1090)}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"B2B2_F10"},[s("div",{staticClass:"B2B2_F10B1"},[s("p",[t._v("AGREGAR")]),s("img",{attrs:{src:a(4405)}})]),s("div",{staticClass:"B2B2_F10B2"},[s("p",[t._v("PAGAR")])])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"B3"},[s("p",{staticClass:"B3T1"},[t._v("Detalles del producto:")]),s("div",{staticClass:"B3B"},[s("div",{staticClass:"B3B1"},[s("div",{staticClass:"B3B1_B1"},[s("p",{staticClass:"B3B1_B1T"},[t._v("Tostado")]),s("p",{staticClass:"showMV"},[t._v("Oscuro")]),s("p",{staticClass:"B3B1_B1T"},[t._v("Región")]),s("p",{staticClass:"showMV"},[t._v("Chiapas")]),s("p",{staticClass:"B3B1_B1T"},[t._v("Especie")]),s("p",{staticClass:"showMV"},[t._v("Robusta")]),s("p",{staticClass:"B3B1_B1T"},[t._v("Cafeína")]),s("p",{staticClass:"showMV"},[t._v("Muy alto")])]),s("div",{staticClass:"WLine"}),s("div",{staticClass:"showDK B3B1_B2"},[s("p",[t._v("Oscuro")]),s("p",[t._v("Chiapas")]),s("p",[t._v("Robusta")]),s("p",[t._v("Muy alto")])])]),s("div",{staticClass:"B3B2"},[s("p",[t._v("Nuestra selección de café es de granos orgánicos de "),s("span",[t._v("Chiapas")]),t._v(", la tierra del café, de nuestro país un orgullo.")]),s("p",[t._v("Tostamos con leña de mezquite de "),s("span",[t._v("Sonora")]),t._v(" (Huupa®) por su alta calidad de poder calorífico, ya que ésta resalta el aroma, cuerpo y sabor del café.")])])])])}],r=a(629),c=a(417),o=a(1673),n={name:"Producto",data(){return{selectM:"",cantidad:1,selectWeek:"1 semana",weeks:["4 semanas","1 semana","2 semanas","3 semanas"],openWeeks:!1,Gramos:"",Molido:""}},components:{Navigator:c.Z,Footer:o.Z},async created(){await this.getAllInfoPro("product"),await this.getAllInfoPro2("product"),await this.getAllInfoPro3("product")},computed:{data(){let t=this.$store.getters["product/data"];return t},data2(){let t=this.$store.getters["product/data2"];return t}},methods:{...(0,r.nv)("product",["getAllInfoPro"]),...(0,r.nv)("product",["getAllInfoPro2"]),...(0,r.nv)("product",["getAllInfoPro3"])}},l=n,u=a(3736),d=(0,u.Z)(l,e,i,!1,null,"07e59df5",null),m=d.exports},1102:function(t,s,a){t.exports=a.p+"img/cart1.6070b835.svg"},4405:function(t,s,a){t.exports=a.p+"img/Car.9f22b59f.svg"},7111:function(t,s,a){t.exports=a.p+"img/fb1.fca8fa07.svg"},7379:function(t,s,a){t.exports=a.p+"img/fb2.a339989d.svg"},7205:function(t,s,a){t.exports=a.p+"img/ig1.e2756e1e.svg"},2499:function(t,s,a){t.exports=a.p+"img/ig2.8e7cbb7d.svg"},1335:function(t,s,a){t.exports=a.p+"img/logo1.73c81943.svg"},7340:function(t,s,a){t.exports=a.p+"img/lupa1.7c4e8e86.svg"},7808:function(t,s,a){t.exports=a.p+"img/menu1.3efc3626.svg"},3585:function(t,s,a){t.exports=a.p+"img/menu2.220b9c86.svg"},2826:function(t,s,a){t.exports=a.p+"img/PlusBlack.fcda83ba.svg"},7900:function(t,s,a){t.exports=a.p+"img/PlusRed.cc932c72.svg"},6033:function(t,s,a){t.exports=a.p+"img/RestBlack.e7aa0cfa.svg"},4686:function(t,s,a){t.exports=a.p+"img/RestRed.c2490a49.svg"},9020:function(t,s,a){t.exports=a.p+"img/RowDown.726d729d.svg"},6015:function(t,s,a){t.exports=a.p+"img/truck.6ea3a8e7.svg"},4690:function(t,s,a){t.exports=a.p+"img/truck2.c2e7ce81.svg"},8874:function(t,s,a){t.exports=a.p+"img/user1.1e80775d.svg"},7221:function(t,s,a){t.exports=a.p+"img/yt1.28c6421e.svg"},3867:function(t,s,a){t.exports=a.p+"img/yt2.741af806.svg"},1090:function(t,s,a){t.exports=a.p+"img/HCOF_MV.2279e0ff.png"}}]);
//# sourceMappingURL=741.3ec9e0d4.js.map
"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[908],{1673:function(t,s,a){a.d(s,{Z:function(){return l}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Footer",attrs:{id:"Contacto"}},[s("div",{staticClass:"pd"},[s("p",{staticClass:"tl"},[t._v("Contáctanos")]),s("div",{staticClass:"form-c"},[t._m(0),s("div",{staticClass:"form"},[s("section",[s("p",{staticClass:"tl-i"},[t._v("NOMBRE")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",name:"name",id:"name"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}})]),s("section",[s("p",{staticClass:"tl-i"},[t._v("CORREO")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",name:"correo",id:"correo"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}})]),s("section",[s("p",{staticClass:"tl-i"},[t._v("MENSAJE")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.mensaje,expression:"mensaje"}],attrs:{name:"mensaje",id:"mensaje"},domProps:{value:t.mensaje},on:{input:function(s){s.target.composing||(t.mensaje=s.target.value)}}})]),s("section",[s("div",{staticClass:"btn",on:{click:function(s){return t.enviarMail(t.name,t.email,t.mensaje)}}},[t._v("ENVIAR MENSAJE")]),"success"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_success"},[t._v(t._s(this.msg))])]):t._e(),"error"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_error"},[t._v(t._s(this.msg))])]):t._e()])])]),s("p",{staticClass:"copyright"},[t._v("© 2023 Huupa. Todos los derechos reservados.")]),t._m(1)])])},r=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"info"},[s("p",[t._v(" No pierdas la oportunidad de probar el mejor sabor de café de México. ")]),s("p",[t._v(" Ponte en contacto con nosotros para hacernos llegar tus comentarios y resolver cualquier duda. ")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"dwn-menu"},[s("a",{staticClass:"logo",attrs:{href:""}},[s("img",{attrs:{src:a(1335),alt:"logo"}})]),s("section",{staticClass:"md"},[s("a",{attrs:{href:""}},[t._v("Home")]),s("a",{attrs:{href:""}},[t._v("Nosotros")]),s("a",{attrs:{href:""}},[t._v("Tienda")]),s("a",{attrs:{href:""}},[t._v("Contacto")])]),s("div",{staticClass:"sm-c"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7111),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7205),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7221),alt:"yt"}})])])])}],i={data(){return{name:"",email:"",mensaje:"",status:"",msg:""}},methods:{delStatus:function(){setTimeout((()=>this.delMsgs()),5e3)},delMsgs:function(){this.status="",this.msg=""},enviarMail:async function(t,s,a){if(this.msg="",this.status="",void 0==t||""==t||null==t)this.msg="El campo nombre no es valido.",this.status="error";else if(void 0==s||""==s||null==s)this.msg="El campo correo no es valido.",this.status="error";else if(void 0==a||""==a||null==a)this.msg="El campo comentarios no es valido.",this.status="error";else{let e={name:t,email:s,mensaje:a},r=await this.$store.dispatch("admin/enviarMailContacto",e);console.log(r),"success"==r.status?(this.status="success",this.msg="Mensaje enviado con exito.",this.name="",this.email="",this.mensaje="",this.delStatus()):(this.status="error",this.msg="Lo sentimos ha ocurrido un error al intentar entregar tu mensaje.")}}}},n=i,o=a(3736),c=(0,o.Z)(n,e,r,!1,null,null,null),l=c.exports},89:function(t,s,a){a.d(s,{Z:function(){return l}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Nav",class:{adjust:t.scrollP>0}},[t._m(0),s("div",{staticClass:"hd-n"},[s("div",{staticClass:"col1"},[s("div",{staticClass:"msec"},[t._m(1),t._m(2),s("img",{staticClass:"btnmenu",attrs:{src:a(7808),alt:"logo"},on:{click:function(s){t.menu_it=!0}}})]),s("div",{staticClass:"menu-nav",class:{active:1==t.menu_it}},[s("div",{staticClass:"twoitems"},[t._m(3),s("img",{staticClass:"btnmenu",attrs:{src:a(3585),alt:"logo"},on:{click:function(s){t.menu_it=!1}}})]),s("div",{staticClass:"menu-items-l"},[s("a",{class:{act:"Home"==t.$route.name},attrs:{href:"/"}},[t._v("HOME")]),s("a",{class:{act:"Catalogo"==t.$route.name},attrs:{href:"/catalogo"}},[t._v("TIENDA")]),s("a",{attrs:{href:""}},[t._v("SOBRE NOSOTROS")]),s("a",{class:{act:"Suscripcion"==t.$route.name},attrs:{href:"/suscripcion"}},[t._v("SUSCRIPCIÓN")]),s("a",{attrs:{href:""}},[t._v("BLOG")]),s("a",{attrs:{href:"#Contacto"}},[t._v("CONTACTO")])]),t._m(4),t._m(5),t._m(6)])]),s("div",{staticClass:"col2"},[s("div",{staticClass:"search pc"},[1==t.search_it?s("input",{attrs:{type:"text",name:"",id:"",placeholder:"Buscar..."}}):t._e(),s("img",{staticClass:"lupa",attrs:{src:a(7340),alt:"lupa"},on:{click:function(s){1==t.search_it?t.search_it=!1:t.search_it=!0}}})]),t._m(7),t._m(8)])])])},r=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"up-n"},[s("div",{staticClass:"pd"},[s("div",{staticClass:"sm-c pc"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7379),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(2499),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(3867),alt:"yt"}})])]),s("p",{staticClass:"tl"},[t._v("¡Bienvenidos a una tienda bien Sonorense!")]),s("div",{staticClass:"snt pc"},[s("img",{attrs:{src:a(4690),alt:"truck"}}),s("p",[t._v("Envío GRATIS a todo México a partir de $500MXN")])])])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"carrito mo",attrs:{href:"/carrito"}},[s("img",{attrs:{src:a(1102),alt:"cart"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"logo",attrs:{href:"/"}},[s("img",{attrs:{src:a(1335),alt:"logo"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"user mo",attrs:{href:""}},[s("img",{attrs:{src:a(8874),alt:"user"}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"search mo"},[s("input",{attrs:{type:"text",name:"",id:""}}),s("img",{staticClass:"lupa",attrs:{src:a(7340),alt:"lupa"}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"sm-c mo"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7111),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7205),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(7221),alt:"yt"}})])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"snt mo"},[s("img",{attrs:{src:a(6015),alt:"truck"}}),s("p",[t._v("Envío GRATIS a todo México a partir de $500MXN")])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"user pc",attrs:{href:""}},[s("img",{attrs:{src:a(8874),alt:"user"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"carrito pc",attrs:{href:"/carrito"}},[s("img",{attrs:{src:a(1102),alt:"cart"}})])}],i={data(){return{menu_it:!1,search_it:!1,scrollP:0}},methods:{scroll(t){let s=t.target.documentElement.scrollTop,a=1*s;localStorage.setItem("scroll",a),this.scrollP=localStorage.getItem("scroll")}},mounted(){window.addEventListener("scroll",this.scroll)}},n=i,o=a(3736),c=(0,o.Z)(n,e,r,!1,null,null,null),l=c.exports},9908:function(t,s,a){a.r(s),a.d(s,{default:function(){return v}});var e=function(){var t=this,s=t._self._c;return s("div",[s("Navigator"),t._m(0),s("div",{staticClass:"B2"},[t._l(t.data2,(function(e,r){return s("div",{key:r,staticClass:"B2B"},[r<8?s("div",{staticClass:"B2Item",on:{click:function(s){return t.sendURL(e.url)}}},[s("img",{staticClass:"B2I1",attrs:{src:a(9203)}}),s("p",{staticClass:"B2T1"},[t._v(t._s(e.name)+" "),s("span",[t._v("454gr")])]),s("p",{staticClass:"B2T2"},[t._v("$"+t._s(e.price)+" MXN")]),s("img",{staticClass:"B2I2",attrs:{src:a(4405)},on:{click:function(s){return t.sendURL(e.url)}}})]):t._e()])})),t._m(1)],2),s("Footer")],1)},r=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"B1"},[s("p",{staticClass:"B1T1"},[t._v("Tienda")]),s("p",{staticClass:"B1T2"},[t._v("Un café para cada momento")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"B2F2"},[s("p",[t._v("VER TODOS")])])}],i=a(629),n=a(89),o=a(1673),c={name:"Catalogo",data(){return{}},components:{Navigator:n.Z,Footer:o.Z},async created(){await this.getAllInfoPro2("product")},computed:{data2(){let t=this.$store.getters["product/data2"];return t}},methods:{...(0,i.nv)("product",["getAllInfoPro"]),...(0,i.nv)("product",["getAllInfoPro2"]),...(0,i.nv)("product",["getAllInfoPro3"]),sendURL:function(t){window.location.href="producto/"+t}}},l=c,u=a(3736),m=(0,u.Z)(l,e,r,!1,null,"afec00fe",null),v=m.exports},1102:function(t,s,a){t.exports=a.p+"img/cart1.6070b835.svg"},4405:function(t,s,a){t.exports=a.p+"img/Car.9f22b59f.svg"},7111:function(t,s,a){t.exports=a.p+"img/fb1.fca8fa07.svg"},7379:function(t,s,a){t.exports=a.p+"img/fb2.a339989d.svg"},7205:function(t,s,a){t.exports=a.p+"img/ig1.e2756e1e.svg"},2499:function(t,s,a){t.exports=a.p+"img/ig2.8e7cbb7d.svg"},1335:function(t,s,a){t.exports=a.p+"img/logo1.73c81943.svg"},7340:function(t,s,a){t.exports=a.p+"img/lupa1.7c4e8e86.svg"},7808:function(t,s,a){t.exports=a.p+"img/menu1.3efc3626.svg"},3585:function(t,s,a){t.exports=a.p+"img/menu2.220b9c86.svg"},6015:function(t,s,a){t.exports=a.p+"img/truck.6ea3a8e7.svg"},4690:function(t,s,a){t.exports=a.p+"img/truck2.c2e7ce81.svg"},8874:function(t,s,a){t.exports=a.p+"img/user1.1e80775d.svg"},7221:function(t,s,a){t.exports=a.p+"img/yt1.28c6421e.svg"},3867:function(t,s,a){t.exports=a.p+"img/yt2.741af806.svg"},9203:function(t,s,a){t.exports=a.p+"img/HCOF_DK.e31412ad.png"}}]);
//# sourceMappingURL=908.efb01c8a.js.map
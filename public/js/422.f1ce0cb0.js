"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[422],{1673:function(t,s,e){e.d(s,{Z:function(){return c}});var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Footer",attrs:{id:"Contacto"}},[s("div",{staticClass:"pd"},[s("p",{staticClass:"tl"},[t._v("Contáctanos")]),s("div",{staticClass:"form-c"},[t._m(0),s("div",{staticClass:"form"},[s("section",[s("p",{staticClass:"tl-i"},[t._v("NOMBRE")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",name:"name",id:"name"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}})]),s("section",[s("p",{staticClass:"tl-i"},[t._v("CORREO")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",name:"correo",id:"correo"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}})]),s("section",[s("p",{staticClass:"tl-i"},[t._v("MENSAJE")]),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.mensaje,expression:"mensaje"}],attrs:{name:"mensaje",id:"mensaje"},domProps:{value:t.mensaje},on:{input:function(s){s.target.composing||(t.mensaje=s.target.value)}}})]),s("section",[s("div",{staticClass:"btn",on:{click:function(s){return t.enviarMail(t.name,t.email,t.mensaje)}}},[t._v("ENVIAR MENSAJE")]),"success"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_success"},[t._v(t._s(this.msg))])]):t._e(),"error"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_error"},[t._v(t._s(this.msg))])]):t._e()])])]),s("p",{staticClass:"copyright"},[t._v("© 2023 Huupa. Todos los derechos reservados.")]),t._m(1)])])},r=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"info"},[s("p",[t._v(" No pierdas la oportunidad de probar el mejor sabor de café de México. ")]),s("p",[t._v(" Ponte en contacto con nosotros para hacernos llegar tus comentarios y resolver cualquier duda. ")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"dwn-menu"},[s("a",{staticClass:"logo",attrs:{href:""}},[s("img",{attrs:{src:e(1335),alt:"logo"}})]),s("section",{staticClass:"md"},[s("a",{attrs:{href:""}},[t._v("Home")]),s("a",{attrs:{href:""}},[t._v("Nosotros")]),s("a",{attrs:{href:""}},[t._v("Tienda")]),s("a",{attrs:{href:""}},[t._v("Contacto")])]),s("div",{staticClass:"sm-c"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(7111),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(7205),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(7221),alt:"yt"}})])])])}],i={data(){return{name:"",email:"",mensaje:"",status:"",msg:""}},methods:{delStatus:function(){setTimeout((()=>this.delMsgs()),5e3)},delMsgs:function(){this.status="",this.msg=""},enviarMail:async function(t,s,e){if(this.msg="",this.status="",void 0==t||""==t||null==t)this.msg="El campo nombre no es valido.",this.status="error";else if(void 0==s||""==s||null==s)this.msg="El campo correo no es valido.",this.status="error";else if(void 0==e||""==e||null==e)this.msg="El campo comentarios no es valido.",this.status="error";else{let a={name:t,email:s,mensaje:e},r=await this.$store.dispatch("admin/enviarMailContacto",a);console.log(r),"success"==r.status?(this.status="success",this.msg="Mensaje enviado con exito.",this.name="",this.email="",this.mensaje="",this.delStatus()):(this.status="error",this.msg="Lo sentimos ha ocurrido un error al intentar entregar tu mensaje.")}}}},o=i,n=e(3736),l=(0,n.Z)(o,a,r,!1,null,null,null),c=l.exports},89:function(t,s,e){e.d(s,{Z:function(){return c}});var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Nav",class:{adjust:t.scrollP>0}},[t._m(0),s("div",{staticClass:"hd-n"},[s("div",{staticClass:"col1"},[s("div",{staticClass:"msec"},[t._m(1),t._m(2),s("img",{staticClass:"btnmenu",attrs:{src:e(7808),alt:"logo"},on:{click:function(s){t.menu_it=!0}}})]),s("div",{staticClass:"menu-nav",class:{active:1==t.menu_it}},[s("div",{staticClass:"twoitems"},[t._m(3),s("img",{staticClass:"btnmenu",attrs:{src:e(3585),alt:"logo"},on:{click:function(s){t.menu_it=!1}}})]),s("div",{staticClass:"menu-items-l"},[s("a",{class:{act:"Home"==t.$route.name},attrs:{href:"/"}},[t._v("HOME")]),s("a",{class:{act:"Catalogo"==t.$route.name},attrs:{href:"/catalogo"}},[t._v("TIENDA")]),s("a",{attrs:{href:""}},[t._v("SOBRE NOSOTROS")]),s("a",{class:{act:"Suscripcion"==t.$route.name},attrs:{href:"/suscripcion"}},[t._v("SUSCRIPCIÓN")]),s("a",{attrs:{href:""}},[t._v("BLOG")]),s("a",{attrs:{href:"#Contacto"}},[t._v("CONTACTO")])]),t._m(4),t._m(5),t._m(6)])]),s("div",{staticClass:"col2"},[s("div",{staticClass:"search pc"},[1==t.search_it?s("input",{attrs:{type:"text",name:"",id:"",placeholder:"Buscar..."}}):t._e(),s("img",{staticClass:"lupa",attrs:{src:e(7340),alt:"lupa"},on:{click:function(s){1==t.search_it?t.search_it=!1:t.search_it=!0}}})]),t._m(7),t._m(8)])])])},r=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"up-n"},[s("div",{staticClass:"pd"},[s("div",{staticClass:"sm-c pc"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(7379),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(2499),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(3867),alt:"yt"}})])]),s("p",{staticClass:"tl"},[t._v("¡Bienvenidos a una tienda bien Sonorense!")]),s("div",{staticClass:"snt pc"},[s("img",{attrs:{src:e(4690),alt:"truck"}}),s("p",[t._v("Envío GRATIS a todo México a partir de $500MXN")])])])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"carrito mo",attrs:{href:"/carrito"}},[s("img",{attrs:{src:e(1102),alt:"cart"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"logo",attrs:{href:"/"}},[s("img",{attrs:{src:e(1335),alt:"logo"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"user mo",attrs:{href:""}},[s("img",{attrs:{src:e(8874),alt:"user"}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"search mo"},[s("input",{attrs:{type:"text",name:"",id:""}}),s("img",{staticClass:"lupa",attrs:{src:e(7340),alt:"lupa"}})])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"sm-c mo"},[s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(7111),alt:"fb"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(7205),alt:"ig"}})]),s("a",{attrs:{href:"",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:e(7221),alt:"yt"}})])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"snt mo"},[s("img",{attrs:{src:e(6015),alt:"truck"}}),s("p",[t._v("Envío GRATIS a todo México a partir de $500MXN")])])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"user pc",attrs:{href:""}},[s("img",{attrs:{src:e(8874),alt:"user"}})])},function(){var t=this,s=t._self._c;return s("a",{staticClass:"carrito pc",attrs:{href:"/carrito"}},[s("img",{attrs:{src:e(1102),alt:"cart"}})])}],i={data(){return{menu_it:!1,search_it:!1,scrollP:0}},methods:{scroll(t){let s=t.target.documentElement.scrollTop,e=1*s;localStorage.setItem("scroll",e),this.scrollP=localStorage.getItem("scroll")}},mounted(){window.addEventListener("scroll",this.scroll)}},o=i,n=e(3736),l=(0,n.Z)(o,a,r,!1,null,null,null),c=l.exports},4422:function(t,s,e){e.r(s),e.d(s,{default:function(){return u}});var a=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Ctz"},[s("Navigator"),t._m(0),s("div",{staticClass:"bd-ctz"},[s("div",{staticClass:"pd"},[s("p",{staticClass:"tl"},[t._v("Cotiza Huupa en tu evento")]),s("p",{staticClass:"sbtl"},[t._v(" ¿Tendrás una reunión con tus clientes? ¿Vas a invitar a tus amigos un cafecito? ")]),s("p",{staticClass:"sbtl"},[t._v(" ¡Nosotros te ayudamos! Contamos con servicio de Coffee Break para tus reuniones, conferencias, fiestas o, simplemente, el café con los amigos. ")]),s("form",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],attrs:{type:"text",name:"",id:"",placeholder:"NOMBRE COMPLETO"},domProps:{value:t.name},on:{input:function(s){s.target.composing||(t.name=s.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"email",name:"",id:"",placeholder:"CORREO ELECTRÓNICO"},domProps:{value:t.email},on:{input:function(s){s.target.composing||(t.email=s.target.value)}}}),s("p",[t._v(" Correo electrónico en uso, nos pondremos en contacto por este medio. ")]),s("section",{staticClass:"i2c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],staticClass:"w50i",attrs:{type:"tel",name:"",id:"",placeholder:"TELÉFONO"},domProps:{value:t.phone},on:{input:function(s){s.target.composing||(t.phone=s.target.value)}}}),s("section",{staticClass:"check-c"},[s("div",{staticClass:"check",on:{click:function(s){1==t.whatsapp?t.whatsapp=!1:t.whatsapp=!0}}},[t.whatsapp?s("div",{staticClass:"checked"}):t._e()]),s("p",[t._v("PREFIERO MENSAJES POR WHATSAPP")])])]),s("p",[t._v(" De preferencia utilizar un número celular, nos pondremos en contacto por este medio. ")]),s("section",{staticClass:"i2c"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],staticClass:"w50i",attrs:{type:"date",name:"",id:"",placeholder:"FECHA DEL EVENTO"},domProps:{value:t.date},on:{input:function(s){s.target.composing||(t.date=s.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.people,expression:"people"}],staticClass:"w50i",attrs:{type:"number",name:"",id:"",placeholder:"NO. DE PERSONAS"},domProps:{value:t.people},on:{input:function(s){s.target.composing||(t.people=s.target.value)}}})]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.eventtype,expression:"eventtype"}],attrs:{type:"text",name:"",id:"",placeholder:"TIPO DE EVENTO"},domProps:{value:t.eventtype},on:{input:function(s){s.target.composing||(t.eventtype=s.target.value)}}}),s("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],attrs:{type:"text",name:"",id:"",placeholder:"DIRECCIÓN DEL EVENTO"},domProps:{value:t.address},on:{input:function(s){s.target.composing||(t.address=s.target.value)}}}),s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.note,expression:"note"}],attrs:{name:"",id:"",placeholder:"DUDAS Y/O NOTAS"},domProps:{value:t.note},on:{input:function(s){s.target.composing||(t.note=s.target.value)}}}),s("div",{staticClass:"btn",on:{click:function(s){return t.enviarMail(t.name,t.email,t.phone,t.whatsapp,t.date,t.people,t.eventtype,t.address,t.note)}}},[t._v("ENVIAR")]),"success"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_success"},[t._v(t._s(this.msg))])]):t._e(),"error"==this.status?s("div",[s("p",{staticClass:"cart_msg cart_error"},[t._v(t._s(this.msg))])]):t._e()])])]),s("Footer")],1)},r=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"hd-ctz"},[s("div",{staticClass:"pd"},[s("p",{staticClass:"tl"},[t._v("Mayoreo")]),s("p",{staticClass:"sbtl"},[t._v("Café al mayoreo para tu empresa/negocio")])])])}],i=e(89),o=e(1673),n={components:{Navigator:i.Z,Footer:o.Z},data(){return{status:"",msg:"",name:"",email:"",phone:"",whatsapp:!1,date:"",people:"",eventtype:"",address:"",note:""}},methods:{delStatus:function(){setTimeout((()=>this.delMsgs()),5e3)},delMsgs:function(){this.status="",this.msg=""},enviarMail:async function(t,s,e,a,r,i,o,n,l){if(this.msg="",this.status="",void 0==t||""==t||null==t)this.msg="El campo nombre no es valido.",this.status="error";else if(void 0==s||""==s||null==s)this.msg="El campo correo no es valido.",this.status="error";else if(void 0==e||""==e||null==e)this.msg="El campo telefono no es valido.",this.status="error";else if(void 0==r||""==r||null==r)this.msg="El campo fecha no es valido.",this.status="error";else if(void 0==i||""==i||null==i)this.msg="El campo número de personas no es valido.",this.status="error";else if(void 0==o||""==o||null==o)this.msg="El campo tipo de evento no es valido.",this.status="error";else if(void 0==n||""==n||null==n)this.msg="El campo dirección de envío no es valido.",this.status="error";else if(void 0==l||""==l||null==l)this.msg="El campo notas no es valido.",this.status="error";else{let c={name:t,email:s,phone:e,whatsapp:a,date:r,people:i,eventtype:o,address:n,note:l},m=await this.$store.dispatch("admin/enviarCotizar",c);console.log(m),"success"==m.status?(this.status="success",this.msg="Mensaje enviado con exito.",this.name="",this.email="",this.phone="",this.whatsapp=!1,this.date="",this.people="",this.eventtype="",this.address="",this.note="",this.delStatus()):(this.status="error",this.msg="Lo sentimos ha ocurrido un error al intentar entregar tu mensaje.")}}}},l=n,c=e(3736),m=(0,c.Z)(l,a,r,!1,null,null,null),u=m.exports},1102:function(t,s,e){t.exports=e.p+"img/cart1.6070b835.svg"},7111:function(t,s,e){t.exports=e.p+"img/fb1.fca8fa07.svg"},7379:function(t,s,e){t.exports=e.p+"img/fb2.a339989d.svg"},7205:function(t,s,e){t.exports=e.p+"img/ig1.e2756e1e.svg"},2499:function(t,s,e){t.exports=e.p+"img/ig2.8e7cbb7d.svg"},1335:function(t,s,e){t.exports=e.p+"img/logo1.73c81943.svg"},7340:function(t,s,e){t.exports=e.p+"img/lupa1.7c4e8e86.svg"},7808:function(t,s,e){t.exports=e.p+"img/menu1.3efc3626.svg"},3585:function(t,s,e){t.exports=e.p+"img/menu2.220b9c86.svg"},6015:function(t,s,e){t.exports=e.p+"img/truck.6ea3a8e7.svg"},4690:function(t,s,e){t.exports=e.p+"img/truck2.c2e7ce81.svg"},8874:function(t,s,e){t.exports=e.p+"img/user1.1e80775d.svg"},7221:function(t,s,e){t.exports=e.p+"img/yt1.28c6421e.svg"},3867:function(t,s,e){t.exports=e.p+"img/yt2.741af806.svg"}}]);
//# sourceMappingURL=422.f1ce0cb0.js.map
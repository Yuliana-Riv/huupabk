"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[567],{5201:function(t,s,a){a.d(s,{Z:function(){return o}});var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"routeCont"},["/carrito/products"==this.$route.path?s("div",{staticClass:"route-dir"},[s("a",{attrs:{href:""}},[t._v("Home")]),t._v(" > "),s("a",{attrs:{href:"/tienda"}},[t._v("Tienda")]),t._v(" > "),s("a",{staticClass:"real",attrs:{href:""}},[t._v("Carrito")])]):t._e(),"/carrito/empty"==this.$route.path?s("div",{staticClass:"route-dir"},[s("a",{attrs:{href:""}},[t._v("Home")]),t._v(" > "),s("a",{attrs:{href:"/tienda"}},[t._v("Tienda")]),t._v(" > "),s("a",{staticClass:"real",attrs:{href:""}},[t._v("Carrito")])]):"/check-out"==this.$route.path?s("div",{staticClass:"route-dir"},[s("a",{attrs:{href:""}},[t._v("Home")]),t._v(" > "),s("a",{attrs:{href:"/tienda"}},[t._v("Tienda")]),t._v(" > "),s("a",{attrs:{href:""}},[t._v("Carrito")]),t._v(" > "),s("a",{staticClass:"real",attrs:{href:""}},[t._v("Check out")])]):"/finished"==this.$route.path?s("div",{staticClass:"route-dir"},[s("a",{attrs:{href:""}},[t._v("Home")]),t._v(" > "),s("a",{attrs:{href:"/tienda"}},[t._v("Tienda")]),t._v(" > "),s("a",{attrs:{href:""}},[t._v("Carrito")]),t._v(" > "),s("a",{attrs:{href:""}},[t._v("Check out")]),t._v(" > "),s("a",{staticClass:"real",attrs:{href:""}},[t._v("Finalizado")])]):t._e()])},e=[],l={},r=l,n=a(3736),c=(0,n.Z)(r,i,e,!1,null,null,null),o=c.exports},2722:function(t,s,a){a.r(s),a.d(s,{default:function(){return v}});var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Finished"},[s("Navigator"),s("RouteDir"),1==t.charge_pending?s("div",{staticClass:"finished-cont"},[t.payment.status?"CARGO PENDIENTE"==t.payment.status?s("div",{staticClass:"header"},[s("p",{staticClass:"m1"},[t._v("CARGO PENDIENTE")]),s("p",{staticClass:"m2"},[t._v("Tu cargo esta en proceso de validación.")])]):s("div",{staticClass:"header"},[s("p",{staticClass:"m1"},[t._v("NO SE HA PODIDO COMPLETAR LA TRANSACCIÓN")]),"FALLIDO"==t.payment.status?s("p",{staticClass:"m2"},[t._v("CARGO FALLIDO")]):t._e(),"CANCELADO"==t.payment.status?s("p",{staticClass:"m2"},[t._v("CARGO CANCELADO")]):t._e(),"3D SECURE EXPIRADO"==t.payment.status?s("p",{staticClass:"m2"},[t._v("EL PROCESO DE VALIDACIÓN HA EXPIRADO")]):t._e()]):s("div",[0==t.error?s("div",{staticClass:"header"},[s("p",{staticClass:"m1"},[t._v("CARGANDO...")])]):s("div",{staticClass:"header"},[s("p",{staticClass:"m1"},[t._v("ERROR")]),s("p",{staticClass:"m2"},[t._v("NO SE HA ENCONTRADO LA TRANSACCIÓN")])])])]):s("div",{staticClass:"finished-cont"},[t._m(0),s("div",{staticClass:"rowCont f1"},[s("div",{staticClass:"colCont"},[s("p",{staticClass:"titulo"},[t._v("NO. DE PEDIDO")]),s("p",[t._v(t._s(t.payment.pay_num))])]),s("div",{staticClass:"colCont"},[s("p",{staticClass:"titulo"},[t._v("FECHA")]),s("p",[t._v(t._s(t.payment.created_at))])]),s("div",{staticClass:"colCont"},[s("p",{staticClass:"titulo"},[t._v("TOTAL")]),s("p",[t._v("$"+t._s(t.payment.total))])]),s("div",{staticClass:"colCont"},[s("p",{staticClass:"titulo"},[t._v("MÉTODO DE PAGO")]),s("p",[t._v(t._s(t.payment.method))])])]),s("div",{staticClass:"rowCont"},[s("div",{staticClass:"tabla-pedido"},[s("div",{staticClass:"header-tab"},[t._v("DETALLES DEL PEDIDO")]),s("div",{staticClass:"t-p-cont"},[s("div",{staticClass:"rowCont"},[s("div",{staticClass:"colCont"},[t._m(1),t._l(t.payment.detail,(function(a,i){return s("div",{key:i,staticClass:"row-t sbtwn"},[s("div",{staticClass:"product-c"},[s("p",[s("b",[t._v(t._s(a.name))])]),s("p",{staticClass:"cant-p"},[t._v("x"+t._s(a.quantity))]),s("p",{staticClass:"cant-extra"},[t._v(t._s(a.extra))])]),s("p",[t._v("$"+t._s(a.subtotal))])])}))],2),s("div",{staticClass:"colCont mdl dp1"},[s("div",{staticClass:"row-t sbtwn"},[t._m(2),s("p",{staticClass:"second-c"},[t._v("$"+t._s(t.payment.subtotal))])]),s("div",{staticClass:"row-t sbtwn"},[t._m(3),s("p",{staticClass:"second-c"},[t._v(t._s(t.payment.envio))])])]),s("div",{staticClass:"colCont dp1"},[s("div",{staticClass:"row-t sbtwn"},[t._m(4),s("p",{staticClass:"second-c"},[t._v(t._s(t.payment.method))])]),s("div",{staticClass:"row-t sbtwn"},[s("p",{staticClass:"titulo-1 we-c totale"},[t._v("TOTAL")]),s("p",{staticClass:"titulo-1 orange second-c totale"},[t._v("$"+t._s(t.payment.total))])])])]),t.validBilling(t.payment)?s("div",{staticClass:"rowCont listRowCont"},[s("div",{staticClass:"row-t"},[s("p",{staticClass:"titulo-1 orange"},[t._v("RAZÓN SOCIAL")]),s("p",[t._v(t._s(t.payment.billing.reason_social))])]),s("div",{staticClass:"row-t"},[s("p",{staticClass:"titulo-1 orange"},[t._v("RFC")]),s("p",[t._v(t._s(t.payment.billing.rfc))])]),s("div",{staticClass:"row-t"},[s("p",{staticClass:"titulo-1 orange"},[t._v("DIRECCIÓN FISCAL")]),s("p",[t._v(t._s(t.payment.billing.fiscal_address))])]),s("div",{staticClass:"row-t"},[s("p",{staticClass:"titulo-1 orange"},[t._v("CÓDIGO POSTAL")]),s("p",[t._v(t._s(t.payment.billing.postal_code))])]),s("div",{staticClass:"row-t"},[s("p",{staticClass:"titulo-1 orange"},[t._v("CORREO ELECTRÓNICO")]),s("p",[t._v(t._s(t.payment.billing.email))])])]):t._e()])])])]),s("Footer")],1)},e=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"header"},[s("p",{staticClass:"m1"},[t._v("¡GRACIAS!")]),s("p",{staticClass:"m2"},[t._v("TU PEDIDO HA SIDO RECIBIDO")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"row-t sbtwn tw1"},[s("p",{staticClass:"titulo-1"},[t._v("PRODUCTO")]),s("p",{staticClass:"titulo-1"},[t._v("PRECIO")])])},function(){var t=this,s=t._self._c;return s("p",{staticClass:"titulo-2"},[s("b",[t._v("SUBTOTAL")])])},function(){var t=this,s=t._self._c;return s("p",{staticClass:"titulo-2 second-c"},[s("b",[t._v("ENVÍO")])])},function(){var t=this,s=t._self._c;return s("p",{staticClass:"titulo-2 we-c"},[s("b",[t._v("MÉTODO DE PAGO")])])}],l=(a(7658),a(4263)),r=a(268),n=a(5201),c={components:{Navigator:l.Z,Footer:r.Z,RouteDir:n.Z},data(){return{payment:"",charge_pending:!0,error:!1}},async created(){const{id:t}=this.$route.query;t||this.$router.push("/").catch((t=>{}));const s=await this.$store.dispatch("main/editItem",{option:"charge_status",item:{order_id:t}});this.payment=s.payment,"error"==s.status&&(this.charge_pending=!0,this.error=!0),this.payment=s.payment,"charge_pending"==s.result.status||"completed"!=s.result.status?this.charge_pending=!0:this.charge_pending=!1},watch:{$route:{immediate:!0,handler(t,s){this.titulo;document.title=t.meta.title||"Finalizado - Huupa"}}},methods:{validBilling(t){return!!t&&("error"!=t.billing&&"No se encontraron coincidencias."!=t.billing&&(!t?.billing?.reason_social&&(!t?.billing?.rfc&&(!t?.billing?.fiscal_address&&(!t?.billing?.postal_code&&!t?.billing?.email)))))}}},o=c,_=a(3736),C=(0,_.Z)(o,i,e,!1,null,"30e1abad",null),v=C.exports}}]);
//# sourceMappingURL=567.c2a1679a.js.map
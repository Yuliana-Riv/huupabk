"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[937],{5201:function(t,s,a){a.d(s,{Z:function(){return l}});var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"routeCont"},["/carrito/products"==this.$route.path?s("div",{staticClass:"route-dir"},[s("a",{attrs:{href:""}},[t._v("Home")]),t._v(" > "),s("a",{attrs:{href:"/tienda"}},[t._v("Tienda")]),t._v(" > "),s("a",{staticClass:"real",attrs:{href:""}},[t._v("Carrito")])]):t._e(),"/carrito/empty"==this.$route.path?s("div",{staticClass:"route-dir"},[s("a",{attrs:{href:""}},[t._v("Home")]),t._v(" > "),s("a",{attrs:{href:"/tienda"}},[t._v("Tienda")]),t._v(" > "),s("a",{staticClass:"real",attrs:{href:""}},[t._v("Carrito")])]):"/check-out"==this.$route.path?s("div",{staticClass:"route-dir"},[s("a",{attrs:{href:""}},[t._v("Home")]),t._v(" > "),s("a",{attrs:{href:"/tienda"}},[t._v("Tienda")]),t._v(" > "),s("a",{attrs:{href:""}},[t._v("Carrito")]),t._v(" > "),s("a",{staticClass:"real",attrs:{href:""}},[t._v("Check out")])]):"/finished"==this.$route.path?s("div",{staticClass:"route-dir"},[s("a",{attrs:{href:""}},[t._v("Home")]),t._v(" > "),s("a",{attrs:{href:"/tienda"}},[t._v("Tienda")]),t._v(" > "),s("a",{attrs:{href:""}},[t._v("Carrito")]),t._v(" > "),s("a",{attrs:{href:""}},[t._v("Check out")]),t._v(" > "),s("a",{staticClass:"real",attrs:{href:""}},[t._v("Finalizado")])]):t._e()])},e=[],r={},c=r,o=a(3736),n=(0,o.Z)(c,i,e,!1,null,null,null),l=n.exports},2350:function(t,s,a){a.r(s),a.d(s,{default:function(){return m}});var i=function(){var t=this,s=t._self._c;return s("div",{staticClass:"miCarrito"},[s("Navigator"),s("div",{staticClass:"mycart-body"},[s("div",{staticClass:"mycart-cont"},[s("div",{staticClass:"grid-mycart"},[s("p",{staticClass:"titulo-p"},[t._v("Mi Carrito ")]),""==t.carrito.items?s("div",{staticClass:"empty-car-cont"},[s("p",{staticClass:"adv-empty"},[t._v("Tu carrito aún está vacío.")]),s("div",{staticClass:"btn-return",on:{click:function(s){return t.toStore()}}},[s("p",{staticClass:"t"},[t._v("VOLVER A LA TIENDA")])])]):t._e(),""!=t.carrito.items?s("div",{staticClass:"table-cart-cont"},[s("div",{staticClass:"list-cart-cont"},[s("div",{staticClass:"list-cart"},t._l(t.update.items,(function(a,i){return s("div",{key:i,staticClass:"product-cart"},[s("div",{staticClass:"close-btn",on:{click:function(s){return t.deleteItem(i)}}},[t._v("X")]),s("div",{staticClass:"pro-c-cont"},[s("div",{staticClass:"img-pro-cont"},[s("div",{staticClass:"img-c"},[s("img",{staticClass:"pro-img",attrs:{src:t.urlpath.url+"/ayn_Rqv/WW9-AGv/get-product-image/"+t.isWebp(t.regexImg(a.item.image),a.item.image),alt:"pro"}})]),s("div",{staticClass:"pro-info"},[s("p",{staticClass:"name-pro"},[s("b",[t._v(t._s(a.item.name))])]),s("p",{staticClass:"cant-pro"},[t._v(t._s(a.item.descrp))])])]),s("div",{staticClass:"c-pr-cont"},[s("div",{staticClass:"change-cant-cont"},[s("div",{staticClass:"sign-c",class:{eventBlock:1==a.cantidad},on:{click:function(t){a.cantidad-=1}}},[t._v(" - ")]),s("input",{directives:[{name:"model",rawName:"v-model",value:a.cantidad,expression:"item.cantidad"}],staticClass:"num-pro",attrs:{type:"text",name:"",id:""},domProps:{value:a.cantidad},on:{input:function(s){s.target.composing||t.$set(a,"cantidad",s.target.value)}}}),s("div",{staticClass:"sign-c",on:{click:function(t){a.cantidad+=1}}},[t._v("+")])]),s("p",{staticClass:"price-pro"},[t._v(" $"+t._s(t.calcTotal(a.item.price,a.cantidad))+" ")])])])])})),0),s("div",{staticClass:"dflx"},[s("div",{staticClass:"btn-return uno",on:{click:function(s){return t.toShop()}}},[t._m(0)]),s("div",{staticClass:"btn-return",class:{inac:0==t.upd},on:{click:function(s){return t.actualizarCarrito(t.update)}}},[s("p",{staticClass:"t"},[t._v("ACTUALIZAR CARRITO")])])])]),s("div",{staticClass:"miPedido-cont"},[t._m(1),s("div",{staticClass:"miPedido-body"},[s("div",{staticClass:"products-mp-c"},[t._m(2),t._l(t.carrito.items,(function(a,i){return s("div",{key:i,staticClass:"product-mp"},[s("div",{staticClass:"c1"},[s("p",{staticClass:"titulo"},[s("b",[t._v(t._s(a.item.name))])]),s("p",{staticClass:"titulo"},[t._v(t._s(a.item.descrp))]),s("p",{staticClass:"titulo azul-span"},[s("b",[t._v("x"+t._s(a.cantidad))])])]),s("div",{staticClass:"c2"},[s("p",{staticClass:"precio"},[t._v(" $"+t._s(t.calcTotal(a.item.price,a.cantidad))+" ")])])])}))],2),s("div",{staticClass:"totals-mp-c"},[s("div",{staticClass:"sb-mp"},[s("p",{staticClass:"gray"},[t._v("Subtotal")]),s("p",{staticClass:"precio"},[t._v("$"+t._s(t.carrito.subtotal))])]),s("div",{staticClass:"sb-mp"},[s("p",{staticClass:"gray"},[t._v("Cupón")]),s("p",{staticClass:"precio"},[t._v("-$"+t._s(t.carrito.descupon))])]),s("div",{staticClass:"cupon-cont"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.cupon,expression:"cupon"}],staticClass:"cupon-txt",attrs:{type:"text",name:"cupon",id:"cupon",placeholder:"#CUPÓN"},domProps:{value:t.cupon},on:{input:function(s){s.target.composing||(t.cupon=s.target.value)}}}),s("input",{staticClass:"cupon-btn",attrs:{type:"button",value:"APLICAR"},on:{click:function(s){return t.aplicarCupon(t.cupon)}}})]),s("div",{staticClass:"cupon-list"},t._l(t.carrito.cupon,(function(a,i){return s("div",{key:i,staticClass:"cupon-item dflx"},[s("p",[t._v("#"+t._s(a.code))])])})),0)]),s("div",{staticClass:"total-mp-c"},[s("p",{staticClass:"totale"},[t._v("Total")]),s("p",{staticClass:"total precio"},[t._v("$"+t._s(t.carrito.total))])]),s("div",{staticClass:"btn-return",on:{click:function(s){return t.toCheckout()}}},[s("p",{staticClass:"t"},[t._v("CONTINUAR")])])])])]):t._e(),""!=t.status?s("div",{staticClass:"status_messages"},["success"==t.status?s("div",{staticClass:"msg msg_success"},[s("p",[t._v(t._s(t.message))])]):t._e(),"error"==t.status?s("div",{staticClass:"msg msg_error"},[s("p",[t._v(t._s(t.message))])]):t._e()]):t._e()])])]),s("Footer")],1)},e=[function(){var t=this,s=t._self._c;return s("p",{staticClass:"t"},[s("span",[t._v("❮")]),t._v(" IR A TIENDA")])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"header-mp"},[s("p",[t._v("MI PEDIDO")])])},function(){var t=this,s=t._self._c;return s("div",{staticClass:"header-mp-c"},[s("p",{staticClass:"m1"},[t._v("Producto")]),s("p",{staticClass:"m2"},[t._v("Precio")])])}],r=(a(7658),a(4567)),c=a(268),o=a(5201),n=a(629);let l=a(3631);var u={components:{Navigator:r.Z,Footer:c.Z,RouteDir:o.Z},data(){return{numPro:1,urlpath:l,status:"",message:"",cupon:"",cart:localStorage.getItem("cart"),upd:!1}},async created(){await this.obtenerCarritos(),await this.getIdentity()},computed:{carrito(){return this.$store.getters["carrito/getcar"]},update(){let t=this.$store.getters["carrito/getupd"];if(Array.isArray(t.items))for(var s=0;s<t.items.length;s++){if(t.items[s].cantidad!=this.carrito.items[s].cantidad){this.upd=!0;break}this.upd=!1}return t},identity(){return this.$store.getters["admin/getIdentity"]}},methods:{...(0,n.nv)("carrito",["getCart"]),...(0,n.nv)("carrito",["getCartCopy"]),calcTotal(t,s){let a=t*s;return a.toFixed(2)},async obtenerCarritos(){await this.getCart(),await this.getCartCopy()},toStore(){return this.$router.push("/catalogo").catch((t=>{}))},actualizarCarrito:async function(t){let s={carrito:t},a=await this.$store.dispatch("carrito/editItemCrt",{option:"upt_item",item:s});"error"==a.status?(this.status="error",this.message="Ha ocurrido un error al intentar actualizar el carrito.",this.delStatus()):(this.status="success",this.message="Carrito actualizado",this.delStatus(),await this.obtenerCarritos())},deleteItem:async function(t){let s={index:t,_ctk:localStorage.getItem("_ctk")},a=await this.$store.dispatch("carrito/deleteItemCrt",{option:"del_item",item:s});"error"==a.status?(this.status="error",this.message="Ha ocurrido un error al intentar eliminar el producto.",this.delStatus()):(this.status="success",this.message="Producto eliminado.",this.delStatus(),this.wait())},aplicarCupon:async function(t){if(""!=t){let s={sub:null,email:""};this.identity?.sub&&(s=this.identity);let a={cupon:t,cliente:s,_ctk:localStorage.getItem("_ctk")},i=await this.$store.dispatch("carrito/editItemCrt",{option:"add_cupon",item:a});"error"==i.status?(this.status="error",this.message=i.message,this.delStatus()):(this.status="success",this.message="Cupón agregado con éxito.",this.delStatus(),await this.obtenerCarritos())}},deleteCupon:async function(t){if(""!=t){let s={cupon:t,_ctk:localStorage.getItem("_ctk")},a=await this.$store.dispatch("carrito/deleteItemCrt",{option:"del_cupon",item:s});"error"==a.status?(this.status="error",this.message=a.message,this.delStatus()):(this.status="success",this.message="Cupón eliminado con éxito.",this.delStatus(),await this.obtenerCarritos())}},toShop(){return this.$router.push("/catalogo").catch((t=>{}))},toCheckout:async function(){await this.obtenerCarritos();let t={carrito:this.carrito},s=await this.$store.dispatch("carrito/validateCrt",{option:"valid_cart",item:t});if("error"!=s.status)return localStorage.getItem("lastv"),localStorage.setItem("lastv","car"),this.$router.push("/check-out").catch((t=>{}));this.status="error",this.message=s.message,this.delStatus()},wait:function(){setTimeout((()=>this.$router.go()),200)},getIdentity:async function(){let t=await this.$store.dispatch("admin/getData");return t},delStatus:function(){setTimeout((()=>this.delMsgs()),2e3)},delMsgs:function(){this.status="",this.message=""},carItems(){localStorage.setItem("cart",this.update.items.length)},regexImg(t){let s=t.split(".");return s[0]+".webp"},isWebp(t,s){let a=navigator.userAgent.toLowerCase();return a.indexOf("chrome")>-1||a.indexOf("firefox")>-1||a.indexOf("opera")>-1?t:a.indexOf("safari")>-1?s:void 0}},mounted(){this.carItems},watch:{$route:{immediate:!0,handler(t,s){this.titulo;document.title=t.meta.title||"Mi Carrito - Agriga de México"}}}},d=u,p=a(3736),v=(0,p.Z)(d,i,e,!1,null,"4f80a5e1",null),m=v.exports}}]);
//# sourceMappingURL=937.1005f12a.js.map
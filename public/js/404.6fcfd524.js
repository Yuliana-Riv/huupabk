"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[404],{7600:function(t,s,n){n.r(s),n.d(s,{default:function(){return f}});var a=function(){var t=this,s=t._self._c;return s("div",[s("Navigator"),t._m(0),"No se encontraron coincidencias"!==t.data2?s("section",[s("div",{staticClass:"B2"},t._l(t.data2.slice(0,t.proco),(function(a,c){return s("div",{key:c,staticClass:"B2B"},[s("div",{staticClass:"B2Item",on:{click:function(s){return t.sendURL(a.url)}}},[s("img",{staticClass:"B2I1",attrs:{src:t.srcImg(a.image)}}),s("p",{staticClass:"B2T1"},[t._v(t._s(a.name)+" "),s("span",[t._v("454gr")])]),s("p",{staticClass:"B2T2"},[t._v("$"+t._s(a.price)+" MXN")]),s("img",{staticClass:"B2I2",attrs:{src:n(4405)},on:{click:function(s){return t.sendURL(a.url)}}})])])})),0),t.proco<t.data2.length?s("div",{staticClass:"B2F2",on:{click:function(s){return t.multi()}}},[s("p",[t._v("VER MÁS")])]):t._e()]):s("section",{staticClass:"comming-soon"},[s("p",[t._v("En construcción")])]),s("Footer")],1)},c=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"B1"},[s("p",{staticClass:"B1T1"},[t._v("Tienda")]),s("p",{staticClass:"B1T2"},[t._v("Un café para cada momento")])])}],r=(n(7658),n(629)),o=n(7534),e=n(9753);let i=n(3631);var u={name:"Catalogo",data(){return{urlpath:i,numb:1,proco:8}},components:{Navigator:o.Z,Footer:e.Z},async created(){await this.getAllInfoPro2("product")},computed:{data2(){let t=this.$store.getters["product/data2"],s=[];if("No se encontraron coincidencias"==t)return t;for(let n=0;n<t.length;n++)"ACTIVO"==t[n].status&&s.push(t[n]);return s}},methods:{...(0,r.nv)("product",["getAllInfoPro2"]),multi(){++this.numb,this.proco=8*this.numb},sendURL:function(t){window.location.href="producto/"+t},srcImg:function(t){let s=`${i.url}/ayn_Rqv/WW9-AGv/get-product-image/${t}`;return s}}},l=u,d=n(1001),p=(0,d.Z)(l,a,c,!1,null,"defe67be",null),f=p.exports},4405:function(t,s,n){t.exports=n.p+"img/Car.9f22b59f.svg"}}]);
//# sourceMappingURL=404.6fcfd524.js.map
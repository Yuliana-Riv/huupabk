"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[276],{1276:function(t,e,s){s.r(e),s.d(e,{default:function(){return u}});var i=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"Login"}},[e("div",{staticClass:"content_login"},[t._m(0),e("div",{staticClass:"B1"},[t._m(1),e("div",{staticClass:"B1F2"},[e("div",{staticClass:"form_login"},[e("p",{staticClass:"B1Text"},[t._v("Ingresa el código que fue enviado a tu correo electrónico")]),e("form",{attrs:{id:"logincodeapp"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.code_form,expression:"code_form"}],attrs:{id:"code",type:"text",name:"code",required:"",placeholder:"Código"},domProps:{value:t.code_form},on:{input:function(e){e.target.composing||(t.code_form=e.target.value)}}}),e("input",{staticClass:"Vbuton",attrs:{type:"button",value:"Verificar"},on:{click:function(e){return t.verify()}}}),e("p",{staticClass:"form-reenviar-codigo"},[t._v("¿Problemas? "),e("span",{on:{click:function(e){return t.sendCode()}}},[t._v(" Solicita un nuevo código aquí")])]),"error"==t.status?e("p",{staticClass:"error-code"},[t._v(t._s(t.message))]):t._e()])])])]),t._m(2)])])},a=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"B0"},[e("img",{attrs:{src:""}})])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"fondo-logo"},[e("img",{attrs:{src:s(5884),alt:"Logo sitio web"}})])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"B2"},[e("img",{attrs:{src:""}})])}],r=(s(7658),s(7270)),o={name:"autentificacion",data:()=>({code_form:"",status:"",message:""}),created(){this.getIdentity()},computed:{identity(){return this.$store.getters["admin/getIdentity"]}},methods:{getIdentity:async function(){let t=await this.$store.dispatch("admin/getData");return t},delMsg(){this.status="",this.message=""},refresh:function(){setTimeout((()=>this.delMsg()),1500)},async verify(){this.getIdentity();let t=this.identity,e=String(t.code),s=String(t.sub),i={id:e,id_user:s,type:t.role,code:this.code_form},a=await this.$store.dispatch("main/addItem",{option:"session",item:i});if("success"==a.status){let t=await r.Z.createAuth();"success"==t.status?(r.Z.setAth(t.result),this.$router.push("/administrador").catch((t=>{}))):(this.status="error",this.message="Ha ocurrido un error.",this.refresh())}else this.status="error",this.message="El codigo no coincide.",this.refresh()},async sendCode(){this.getIdentity();let t=this.identity;try{await this.$store.dispatch("admin/resendCode",{email:t.email,name:t.name,code:t.code}),"success"!=result.data.status&&(localStorage.removeItem("tkn"),this.$router.push("/login").catch((t=>{})))}catch(e){this.status="error"}}}},n=o,c=s(1001),d=(0,c.Z)(n,i,a,!1,null,"5bb5073a",null),u=d.exports}}]);
//# sourceMappingURL=276.644a77fd.js.map
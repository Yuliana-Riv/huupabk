"use strict";(self["webpackChunkhuupa_ft"]=self["webpackChunkhuupa_ft"]||[]).push([[740],{4182:function(t,s,a){a.d(s,{Z:function(){return n}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Search"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.busqueda,expression:"busqueda"}],attrs:{type:"text",placeholder:"Buscar blog"},domProps:{value:t.busqueda},on:{keypress:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.submit(t.busqueda)},input:function(s){s.target.composing||(t.busqueda=s.target.value)}}}),s("img",{staticClass:"btn",attrs:{src:a(3242),alt:"btn"},on:{click:function(s){return t.submit(t.busqueda)}}})])},i=[],l={data(){return{busqueda:""}},methods:{submit(t){if(""!==t)return window.location.replace("/busqueda-blog/"+t)}}},o=l,c=a(1001),r=(0,c.Z)(o,e,i,!1,null,null,null),n=r.exports},9717:function(t,s,a){a.d(s,{Z:function(){return d}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"WidgetB"},[s("section",{staticClass:"pccont"},[s("SearchInput")],1),t._m(0),s("div",{staticClass:"RO-c"},[s("p",{staticClass:"tl"},[t._v("Más populares")]),t.blog?s("div",{staticClass:"ro-items"},t._l(t.blog.slice(0,2),(function(a,e){return s("a",{key:e,attrs:{href:"/blog/"+a.url}},[s("div",{staticClass:"item c2"},[s("div",{staticClass:"pd2 imgco"},[s("img",{staticClass:"bk",attrs:{src:t.srcImg(a.image),alt:"bk"}}),s("p",{staticClass:"cat"},[t._v(t._s(a.category_name))])]),s("div",{staticClass:"pd2"},[s("section",{staticClass:"info"},[s("section",[s("p",{staticClass:"date"},[t._v(t._s(a.dateblog))]),s("p",{staticClass:"title"},[t._v(t._s(a.title))])]),s("p",{staticClass:"read"},[t._v("Leer más")])])])])])})),0):t._e()])])},i=[function(){var t=this,s=t._self._c;return s("a",{staticClass:"adv",attrs:{href:"/",target:"_blank",rel:"noopener noreferrer"}},[s("img",{attrs:{src:a(6884),alt:"adv"}})])}],l=(a(7658),a(4182)),o=a(629);let c=a(3631);var r={components:{SearchInput:l.Z},async created(){await this.getAllInfoBlo2("blog")},computed:{blog(){let t=this.$store.getters["blog/data2"],s=[];for(let a=0;a<t.length;a++)"VISIBLE"==t[a].statusblog&&s.push(t[a]);return s}},methods:{...(0,o.nv)("blog",["getAllInfoBlo2"]),srcImg:function(t){let s=`${c.url}/ayn_Rqv/WW9-AGv/blog-img/${t}`;return s}}},n=r,u=a(1001),g=(0,u.Z)(n,e,i,!1,null,null,null),d=g.exports},3642:function(t,s,a){a.r(s),a.d(s,{default:function(){return m}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"Blog"},[s("Navigator"),s("div",{staticClass:"blog-c"},[t._m(0),s("div",{staticClass:"b-blog"},[s("div",{staticClass:"pd"},["No se encontraron coincidencias"!==t.blog?s("div",{staticClass:"CO1"},[s("section",{staticClass:"mocont"},[s("SearchInput")],1),"BlogResults"==t.$route.name?s("div",{staticClass:"RO-c due"},[s("p",{staticClass:"tl"},[t._v(" Resultados de busqueda: '"+t._s(t.$route.params.result)+"': ")]),"No se encontraron coincidencias."!==t.resultsblogs?s("div",{staticClass:"ro-items"},t._l(t.resultsblogs,(function(a,e){return s("a",{key:e,attrs:{href:"/blog/"+a.url}},[s("div",{staticClass:"item c2"},[s("div",{staticClass:"pd2 imgco"},[s("img",{staticClass:"bk",attrs:{src:t.srcImg(a.image),alt:"bk"}}),s("p",{staticClass:"cat"},[t._v(t._s(a.category_name))])]),s("div",{staticClass:"pd2"},[s("section",{staticClass:"info"},[s("section",[s("p",{staticClass:"date"},[t._v(t._s(a.dateblog))]),s("p",{staticClass:"title"},[t._v(t._s(a.title))])]),s("p",{staticClass:"read"},[t._v("Leer más")])])])])])})),0):s("div",[s("p",{staticClass:"noresult"},[t._v("No se encontraron coincidencias.")])])]):t._e(),"BlogAutores"==t.$route.name?s("div",{staticClass:"RO-c due"},[s("p",{staticClass:"tl"},[t._v("Blogs por "+t._s(t.$route.params.autor)+":")]),s("div",{staticClass:"ro-items"},t._l(t.autorblogs,(function(a,e){return s("a",{key:e,attrs:{href:"/blog/"+a.url}},[s("div",{staticClass:"item c2"},[s("div",{staticClass:"pd2 imgco"},[s("img",{staticClass:"bk",attrs:{src:t.srcImg(a.image),alt:"bk"}}),s("p",{staticClass:"cat"},[t._v(t._s(a.category_name))])]),s("div",{staticClass:"pd2"},[s("section",{staticClass:"info"},[s("section",[s("p",{staticClass:"date"},[t._v(t._s(a.dateblog))]),s("p",{staticClass:"title"},[t._v(t._s(a.title))])]),s("p",{staticClass:"read"},[t._v("Leer más")])])])])])})),0)]):"Blog"==t.$route.name?s("section",[s("div",{staticClass:"RO-c item-lmr"},[s("p",{staticClass:"tl"},[t._v("Lo más reciente")]),s("div",{staticClass:"ro-items"},t._l(t.blog.slice(0,2),(function(a,e){return s("a",{key:e,attrs:{href:"/blog/"+a.url}},[s("div",{staticClass:"item",style:{"background-image":"url("+t.srcImg(a.image)+")"}},[s("div",{staticClass:"pd2"},[s("p",{staticClass:"cat"},[t._v(t._s(a.category_name))]),s("section",{staticClass:"info"},[s("p",{staticClass:"date"},[t._v(t._s(a.dateblog))]),s("p",{staticClass:"title"},[t._v(t._s(a.title))])])])])])})),0)]),"No se encontraron coincidencias."!==t.tipsblogs?s("div",{staticClass:"RO-c due"},[s("p",{staticClass:"tl"},[t._v("Tips y recetas")]),s("div",{staticClass:"ro-items"},t._l(t.tipsblogs.slice(0,4),(function(a,e){return s("a",{key:e,attrs:{href:"/blog/"+a.url}},[s("div",{staticClass:"item c2"},[s("div",{staticClass:"pd2 imgco"},[s("img",{staticClass:"bk",attrs:{src:t.srcImg(a.image),alt:"bk"}}),s("p",{staticClass:"cat"},[t._v(t._s(a.category_name))])]),s("div",{staticClass:"pd2"},[s("section",{staticClass:"info"},[s("section",[s("p",{staticClass:"date"},[t._v(t._s(a.dateblog))]),s("p",{staticClass:"title"},[t._v(t._s(a.title))])]),s("p",{staticClass:"read"},[t._v("Leer más")])])])])])})),0)]):t._e(),"No se encontraron coincidencias."!==t.sonorablogs?s("div",{staticClass:"RO-c due pc item-son"},[s("p",{staticClass:"tl"},[t._v("Sonora")]),s("div",{staticClass:"ro-items"},[s("a",{attrs:{href:"/blog/"+t.sonorablogs[0].url}},[s("div",{staticClass:"item",style:{"background-image":"url("+t.srcImg(t.sonorablogs[0].image)+")"}},[s("div",{staticClass:"pd2"},[s("p",{staticClass:"cat"},[t._v(t._s(t.sonorablogs[0].category_name))]),s("section",{staticClass:"info"},[s("p",{staticClass:"date"},[t._v(t._s(t.sonorablogs[0].dateblog))]),s("p",{staticClass:"title"},[t._v(t._s(t.sonorablogs[0].title))])])])])]),t._l(t.sonorablogs.slice(1,3),(function(a,e){return s("a",{key:e,attrs:{href:"/blog/"+a.url}},[s("div",{staticClass:"item c2"},[s("div",{staticClass:"pd2 imgco"},[s("img",{staticClass:"bk",attrs:{src:t.srcImg(a.image),alt:"bk"}}),s("p",{staticClass:"cat"},[t._v(t._s(a.category_name))])]),s("div",{staticClass:"pd2"},[s("section",{staticClass:"info"},[s("section",[s("p",{staticClass:"date"},[t._v(t._s(a.dateblog))]),s("p",{staticClass:"title"},[t._v(t._s(a.title))])]),s("p",{staticClass:"read"},[t._v("Leer más")])])])])])}))],2)]):t._e()]):t._e()]):s("div",{staticClass:"CO1 comming-soon"},[s("p",[t._v("En construcción")])]),"No se encontraron coincidencias."!==t.blog?s("div",{staticClass:"CO2"},[s("WidgetBlog")],1):t._e()])])]),s("Footer")],1)},i=[function(){var t=this,s=t._self._c;return s("div",{staticClass:"h-blog"},[s("div",{staticClass:"pd"},[s("p",[t._v("BLOG")])])])}],l=(a(7658),a(629)),o=a(8310),c=a(7095),r=a(9717),n=a(4182);let u=a(3631);var g={components:{Navigator:o.Z,Footer:c.Z,WidgetBlog:r.Z,SearchInput:n.Z},data(){return{urlpath:u}},async created(){await this.getAllInfoBlo("blog"),await this.getAllInfoCat("category");let t={option:"blog",search:"BlogResults"==this.$route.name?this.$route.params.result:""};await this.searchBlo3(t)},metaInfo(){return{title:"Blog",titleTemplate:"%s | Huupa",htmlAttrs:{lang:"es"},meta:[{charset:"utf-8"},{name:"description",content:"..."},{name:"viewport",content:"width=device-width, initial-scale=1"}]}},computed:{blog(){let t=this.$store.getters["blog/data"],s=[];for(let a=0;a<t.length;a++)"VISIBLE"==t[a].statusblog&&s.push(t[a]);return 0==s.length?"No se encontraron coincidencias.":s},tipsblogs(){let t=this.blog;if("No se encontraron coincidencias"==t)return t;{let s=[];for(let a=0;a<t.length;a++)"TIPS Y RECETAS"==t[a].category_name&&s.push(t[a]);return 0==s.length?"No se encontraron coincidencias.":s}},sonorablogs(){let t=this.blog;if("No se encontraron coincidencias."==t)return t;{let s=[];for(let a=0;a<t.length;a++)"SONORA"==t[a].category_name&&s.push(t[a]);return 0==s.length?"No se encontraron coincidencias.":s}},autorblogs(){let t=this.blog,s=[];if("BlogAutores"==this.$route.name){let a=this.$route.params.autor;for(let e=0;e<t.length;e++){let i=t[e].autor_name+" "+t[e].autor_lastname;i==a&&s.push(t[e])}}else s="No se encontraron coincidencias.";return s},resultsblogs(){return this.$store.getters["blog/data3"]},categorias(){return this.$store.getters["category/data"]}},methods:{...(0,l.nv)("blog",["getAllInfoBlo"]),...(0,l.nv)("blog",["searchBlo3"]),...(0,l.nv)("category",["getAllInfoCat"]),srcImg:function(t){let s=`${u.url}/ayn_Rqv/WW9-AGv/blog-img/${t}`;return s}}},d=g,v=a(1001),p=(0,v.Z)(d,e,i,!1,null,null,null),m=p.exports},3242:function(t,s,a){t.exports=a.p+"img/lupa2.0fc7f404.svg"},6884:function(t,s,a){t.exports=a.p+"img/adv.2be34d7e.png"}}]);
//# sourceMappingURL=740.97085c5b.js.map
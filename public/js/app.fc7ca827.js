(function(e){function t(t){for(var o,c,i=t[0],u=t[1],l=t[2],s=0,d=[];s<i.length;s++)c=i[s],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&d.push(a[c][0]),a[c]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);f&&f(t);while(d.length)d.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,c=1;c<n.length;c++){var i=n[c];0!==a[i]&&(o=!1)}o&&(r.splice(t--,1),e=u(u.s=n[0]))}return e}var o={},c={app:0},a={app:0},r=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-7647491f":"fdbec626","chunk-579e1ea3":"8c45675e","chunk-49fe205c":"e2596d31","chunk-6803e396":"830aad9e","chunk-3636f85b":"5c02fb53","chunk-1759dca8":"71001237","chunk-400a95cf":"2c9cc4d0","chunk-443afc2a":"76a1e564","chunk-61853d70":"4ff59fea","chunk-6dbc1a8f":"24e07fdb","chunk-50cc5de4":"97e6dbcf","chunk-39fced96":"32664fe3","chunk-938c6f68":"fb085a5e","chunk-800e3ed0":"279b88d7","chunk-8b8342c6":"b60204ae"}[e]+".js"}function u(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-7647491f":1,"chunk-579e1ea3":1,"chunk-49fe205c":1,"chunk-6803e396":1,"chunk-3636f85b":1,"chunk-400a95cf":1,"chunk-61853d70":1,"chunk-6dbc1a8f":1,"chunk-39fced96":1,"chunk-800e3ed0":1,"chunk-8b8342c6":1};c[e]?t.push(c[e]):0!==c[e]&&n[e]&&t.push(c[e]=new Promise((function(t,n){for(var o="css/"+({}[e]||e)+"."+{"chunk-7647491f":"023713fd","chunk-579e1ea3":"105dd787","chunk-49fe205c":"f4eee6de","chunk-6803e396":"103f8848","chunk-3636f85b":"499fd9a6","chunk-1759dca8":"31d6cfe0","chunk-400a95cf":"367140dd","chunk-443afc2a":"31d6cfe0","chunk-61853d70":"317e07e8","chunk-6dbc1a8f":"976c72ec","chunk-50cc5de4":"31d6cfe0","chunk-39fced96":"f613719f","chunk-938c6f68":"31d6cfe0","chunk-800e3ed0":"f613719f","chunk-8b8342c6":"10778335"}[e]+".css",a=u.p+o,r=document.getElementsByTagName("link"),i=0;i<r.length;i++){var l=r[i],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===o||s===a))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){l=d[i],s=l.getAttribute("data-href");if(s===o||s===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var o=t&&t.target&&t.target.src||a,r=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=o,delete c[e],f.parentNode.removeChild(f),n(r)},f.href=a;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){c[e]=0})));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var r=new Promise((function(t,n){o=a[e]=[t,n]}));t.push(o[2]=r);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=i(e);var d=new Error;l=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+o+": "+c+")",d.name="ChunkLoadError",d.type=o,d.request=c,n[1](d)}a[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=o,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)u.d(n,o,function(t){return e[t]}.bind(null,o));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=s;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"inspire"}},[n("v-navigation-drawer",{attrs:{app:""},scopedSlots:e._u([e.loggedAs?{key:"append",fn:function(){return[n("div",{staticClass:"pa-2"},[n("v-btn",{attrs:{block:"",color:"red",tile:"",dark:""},on:{click:e.logout}},[e._v("Logout")])],1)]},proxy:!0}:null],null,!0),model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",{attrs:{dense:""}},[e.loggedAs?n("div",[n("v-list-item",{attrs:{link:"",to:"/"}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-home")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Home")])],1)],1),n("v-list-item",{attrs:{link:"",to:"/students"}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-school")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Students")])],1)],1),"school"==e.loggedAs?n("v-list-item",{attrs:{link:"",to:"/teachers"}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-account")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Teachers")])],1)],1):e._e(),"school"==e.loggedAs?n("v-list-item",{attrs:{link:"",to:"/courses"}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-book")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Courses")])],1)],1):e._e(),n("v-list-item",{attrs:{link:"",to:"/offers"}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-teach")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Offers")])],1)],1),"school"==e.loggedAs?n("v-list-item",{attrs:{link:"",to:"/test"}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-test")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Test")])],1)],1):e._e()],1):n("div",[n("v-list-item",{attrs:{link:"",to:"/login"}},[n("v-list-item-action",[n("v-icon",[e._v("mdi-login")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Login")])],1)],1)],1)])],1),n("v-app-bar",{attrs:{app:"",color:"indigo",dark:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),n("v-toolbar-title",[e._v("Application")])],1),n("v-content",[n("v-container",{staticClass:"fill-height",attrs:{fluid:"","align-start":""}},[n("v-row",{attrs:{align:"start",justify:"start"}},[n("v-col",[n("router-view",{on:{logged:e.logged}})],1)],1)],1)],1)],1)},a=[],r=n("bc3a"),i=n.n(r),u={props:{source:String},data:function(){return{drawer:null,loggedAs:""}},created:function(){var e=this;localStorage.token&&(i.a.defaults.headers.common["Authorization"]="Bearer "+localStorage.token,i.a.post("/verify",{token:localStorage.token}).then((function(e){return e.data})).then((function(t){localStorage.loggedAs=t.loggedAs,e.loggedAs=t.loggedAs})))},methods:{logout:function(){localStorage.removeItem("token"),this.loggedAs="",this.$router.push("Login")},logged:function(e,t){this.loggedAs=t,localStorage.setItem("token",e),localStorage.setItem("loggedAs",t)}}},l=u,s=n("2877"),d=n("6544"),f=n.n(d),h=n("7496"),m=n("40dc"),p=n("5bc1"),k=n("8336"),v=n("62ad"),g=n("a523"),b=n("a75b"),_=n("132d"),w=n("8860"),y=n("da13"),A=n("1800"),S=n("5d23"),P=n("f774"),V=n("0fd9"),O=n("2a7f"),C=Object(s["a"])(l,c,a,!1,null,null,null),I=C.exports;f()(C,{VApp:h["a"],VAppBar:m["a"],VAppBarNavIcon:p["a"],VBtn:k["a"],VCol:v["a"],VContainer:g["a"],VContent:b["a"],VIcon:_["a"],VList:w["a"],VListItem:y["a"],VListItemAction:A["a"],VListItemContent:S["a"],VListItemTitle:S["b"],VNavigationDrawer:P["a"],VRow:V["a"],VToolbarTitle:O["a"]});n("b0c0"),n("a9e3"),n("d3b7");var L=n("8c4f"),T=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},j=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("h1",[e._v("home")])])}],E={name:"Home"},x=E,N=Object(s["a"])(x,T,j,!1,null,null,null),B=N.exports;o["a"].use(L["a"]);var $=[{path:"/",name:"Home",component:B},{path:"/login",name:"Login",component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-800e3ed0")]).then(n.bind(null,"a55b"))}},{path:"/test",name:"Test",component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-6803e396"),n.e("chunk-50cc5de4"),n.e("chunk-938c6f68")]).then(n.bind(null,"78c1"))}},{path:"/students",name:"Students",component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-6803e396"),n.e("chunk-3636f85b"),n.e("chunk-6dbc1a8f")]).then(n.bind(null,"4929"))}},{path:"/student/:studentId",name:"ViewStudent",props:{student:null},component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-6803e396"),n.e("chunk-50cc5de4"),n.e("chunk-39fced96")]).then(n.bind(null,"1239"))}},{path:"/offer/:offerId",name:"ViewOffer",props:{offer:null},component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-6803e396"),n.e("chunk-3636f85b"),n.e("chunk-61853d70")]).then(n.bind(null,"9ee2"))}},{path:"/assignments/:assignmentId",name:"ViewAssignment",props:{homeworkId:Number,studentId:Number},component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-49fe205c")]).then(n.bind(null,"3356"))}},{path:"/homework/:homeworkId",name:"Assignments",component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-8b8342c6")]).then(n.bind(null,"dac3"))}},{path:"/teachers",name:"Teachers",component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-6803e396"),n.e("chunk-3636f85b"),n.e("chunk-400a95cf")]).then(n.bind(null,"a37d"))}},{path:"/offers",name:"Offers",component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-6803e396"),n.e("chunk-3636f85b"),n.e("chunk-1759dca8")]).then(n.bind(null,"d7e1"))}},{path:"/courses",name:"Courses",component:function(){return Promise.all([n.e("chunk-7647491f"),n.e("chunk-579e1ea3"),n.e("chunk-6803e396"),n.e("chunk-3636f85b"),n.e("chunk-443afc2a")]).then(n.bind(null,"1a2f"))}}],H=new L["a"]({base:"/",routes:$});H.beforeEach((function(e,t,n){"Login"===e.name||localStorage.token?n():n({name:"Login"})}));var M=H,D=n("f309"),q=n("fcf4");o["a"].use(D["a"]);var J=new D["a"]({theme:{themes:{light:{primary:q["a"].indigo.darken4,secondary:q["a"].indigo.lighten4,accent:q["a"].indigo.base}}}});n("4633");o["a"].use(n("84b5")),o["a"].config.productionTip=!1,new o["a"]({router:M,vuetify:J,render:function(e){return e(I)}}).$mount("#app")}});
//# sourceMappingURL=app.fc7ca827.js.map
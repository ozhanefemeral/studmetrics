(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63f2337b"],{"1a2f":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-row",[r("v-col",{attrs:{cols:"2"}},[r("v-textarea",{attrs:{rows:"1",label:"Course Name",outlined:""},model:{value:e.inputName,callback:function(t){e.inputName=t},expression:"inputName"}})],1),r("v-col",{attrs:{cols:"2"}},[r("v-btn",{attrs:{color:"primary"},on:{click:e.create}},[e._v("New Course")])],1)],1),r("v-card",{attrs:{outlined:"",raised:""}},[r("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.courses},scopedSlots:e._u([{key:"item.action",fn:function(t){var n=t.item;return[r("v-icon",{attrs:{color:"error"},on:{click:function(t){return e.deleteItem(n)}}},[e._v(" mdi-delete ")])]}}])})],1)],1)},a=[],u=(r("c975"),r("a434"),r("c4af")),o={data:function(){return{courses:[],headers:[{text:"Name",align:"start",value:"name"},{text:"Group 1",value:"group1"},{text:"Group 2",value:"group2"},{text:"Group 3",value:"group3"},{text:"Actions",value:"action",sortable:!1}],inputName:""}},created:function(){var e=this;u["a"].GetCourses().then((function(t){e.courses=t}))},methods:{deleteItem:function(e){var t=this,r=this.courses.indexOf(e),n=confirm("Are you sure you want to delete this item?");n&&u["a"].DeleteCourse(e.id).then((function(){t.courses.splice(r,1)}))},create:function(){var e=this;u["a"].CreateCourse({name:this.inputName}).then((function(){e.$router.go()}))}}},c=o,s=r("2877"),i=r("6544"),l=r.n(i),p=r("8336"),f=r("b0af"),d=r("62ad"),v=r("8fea"),m=r("132d"),h=r("0fd9"),b=r("a844"),w=Object(s["a"])(c,n,a,!1,null,null,null);t["default"]=w.exports;l()(w,{VBtn:p["a"],VCard:f["a"],VCol:d["a"],VDataTable:v["a"],VIcon:m["a"],VRow:h["a"],VTextarea:b["a"]})},c4af:function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=r("d4ec"),u=r("bee2"),o=r("bc3a"),c=r.n(o),s="/api/courses/",i=function(){function e(){Object(a["a"])(this,e)}return Object(u["a"])(e,null,[{key:"CreateCourse",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.post(s,{courseBody:t});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetCourseById",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get(s+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"DeleteCourse",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.delete(s+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetCourses",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get(s);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),e}();t["a"]=i}}]);
//# sourceMappingURL=chunk-63f2337b.ec76c2b6.js.map
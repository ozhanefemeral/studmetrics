(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-443afc2a"],{"1a2f":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-row",[r("v-col",{attrs:{cols:"2"}},[r("v-textarea",{attrs:{rows:"1",label:"Course Name",outlined:""},model:{value:e.inputName,callback:function(t){e.inputName=t},expression:"inputName"}})],1),r("v-col",{attrs:{cols:"2"}},[r("v-btn",{attrs:{color:"accent"},on:{click:e.create}},[e._v("New Course")])],1)],1),r("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.courses,dark:""},scopedSlots:e._u([{key:"item.action",fn:function(t){var n=t.item;return[r("v-icon",{attrs:{color:"error"},on:{click:function(t){return e.deleteItem(n)}}},[e._v(" mdi-delete ")])]}}])})],1)},a=[],u=(r("c975"),r("a434"),r("9aeb")),c=r("c4af"),o={data:function(){return{courses:[],headers:[{text:"Name",align:"start",value:"name"},{text:"Group 1",value:"group1"},{text:"Group 2",value:"group2"},{text:"Group 3",value:"group3"},{text:"Actions",value:"action",sortable:!1}],inputName:""}},created:function(){var e=this;u["a"].GetCourses(1).then((function(t){e.courses=t}))},methods:{deleteItem:function(e){var t=this,r=this.courses.indexOf(e),n=confirm("Are you sure you want to delete this item?");n&&c["a"].DeleteCourse(e.id).then((function(){t.courses.splice(r,1)}))},create:function(){var e=this;c["a"].CreateCourse({name:this.inputName}).then((function(){e.$router.go()}))}}},s=o,i=r("2877"),p=r("6544"),l=r.n(p),f=r("8336"),v=r("62ad"),h=r("8fea"),d=r("132d"),m=r("0fd9"),w=r("a844"),b=Object(i["a"])(s,n,a,!1,null,null,null);t["default"]=b.exports;l()(b,{VBtn:f["a"],VCol:v["a"],VDataTable:h["a"],VIcon:d["a"],VRow:m["a"],VTextarea:w["a"]})},"9aeb":function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=r("d4ec"),u=r("bee2"),c=r("bc3a"),o=r.n(c),s="/api/schools/",i=function(){function e(){Object(a["a"])(this,e)}return Object(u["a"])(e,null,[{key:"Restart",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post("/api/test/restart");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"GetCourses",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(s+t+"/courses");case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetOffers",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(s+t+"/offers");case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetHomeworks",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(s+t+"/homeworks");case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"CreateSchool",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post(s,t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"DeleteSchool",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.delete(s+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"LoginSchool",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post("".concat(s,"login"),{email:t,password:r});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"GetTeachers",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("".concat(s,"teachers"));case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),e}();t["a"]=i},c4af:function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=r("d4ec"),u=r("bee2"),c=r("bc3a"),o=r.n(c),s="/api/courses/",i=function(){function e(){Object(a["a"])(this,e)}return Object(u["a"])(e,null,[{key:"CreateCourse",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post(s,{courseBody:t});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetCourseById",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(s+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"DeleteCourse",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.delete(s+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}();t["a"]=i}}]);
//# sourceMappingURL=chunk-443afc2a.c74906f5.js.map
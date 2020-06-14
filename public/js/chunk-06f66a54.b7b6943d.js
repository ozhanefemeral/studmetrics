(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06f66a54"],{"78c1":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.waitingResponse?e._e():r("div",[r("v-row",[r("v-col",{attrs:{cols:"2"},on:{click:e.restart}},[r("v-btn",{staticClass:"ma-5",attrs:{color:"error"},on:{click:e.restart}},[e._v("Restart only")])],1)],1),r("v-divider"),r("v-row",[r("v-btn",{staticClass:"ma-5",attrs:{color:"primary"},on:{click:e.createStudents}},[e._v("Create Students")]),r("v-btn",{staticClass:"ma-5",attrs:{color:"primary"},on:{click:e.createTeachers}},[e._v("Create Teachers")]),r("v-btn",{staticClass:"ma-5",attrs:{color:"primary"},on:{click:e.createCourse}},[e._v("Create Course")])],1),r("v-divider"),r("v-row",[r("v-col",{attrs:{cols:"2"}},[r("v-select",{attrs:{label:"Offers",outlined:"","item-text":"code","item-value":"id",items:e.offers},model:{value:e.selectedOffer,callback:function(t){e.selectedOffer=t},expression:"selectedOffer"}})],1),r("v-col",{attrs:{cols:"2"}},[r("v-btn",{attrs:{color:"primary"},on:{click:e.createHomework}},[e._v("Create Homework")])],1)],1),r("v-divider"),r("v-row",[r("v-col",{attrs:{cols:"2"}},[r("v-select",{attrs:{label:"Homeworks",outlined:"","item-text":"name","item-value":"id",items:e.homeworks},model:{value:e.selectedHomework,callback:function(t){e.selectedHomework=t},expression:"selectedHomework"}})],1),r("v-btn",{staticClass:"ml-5 mt-5",attrs:{color:"primary"},on:{click:e.answerAssignments}},[e._v("Answer")]),r("v-btn",{staticClass:"ml-5 mt-5",attrs:{color:"primary"},on:{click:e.reviewAssignments}},[e._v("Review")])],1)],1)},a=[],s=(r("fb6a"),r("b0c0"),r("a9e3"),r("d3b7"),r("3ca3"),r("ddb0"),r("96cf"),r("1da1")),u=r("9aeb"),o=r("c4af"),c=r("93f5"),i=r("b8da"),l=r("bc3a"),p=r.n(l),f={data:function(){return{dummyCourseNames:["Algorithms","Data Structures","Philosophy","Calculus","History","Physics","English"],homeworkAmount:5,questionAmount:5,offers:[],teachers:[],homeworks:[],selectedOffer:Number,selectedHomework:Number,isCreated:!1,waitingResponse:!1}},created:function(){var e=this;c["a"].GetOffers(1).then((function(t){e.offers=t})),u["a"].GetTeachers(1).then((function(t){e.teachers=t})),u["a"].GetHomeworks(1).then((function(t){e.homeworks=t}))},methods:{restart:function(){var e=this;this.waitingResponse=!0,u["a"].Restart().then((function(){return u["a"].CreateSchool({name:"Çukurova Üniversitesi",email:"ozhanefemeral@gmail.com",password:"efemeral1"})})).then((function(){return u["a"].LoginSchool("ozhanefemeral@gmail.com","efemeral1")})).then((function(t){e.$emit("logged",t.token,"school"),e.waitingResponse=!1}))},createCourse:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.waitingResponse=!0,r=Math.floor(Math.random()*e.dummyCourseNames.length),n={name:e.dummyCourseNames[r],schoolId:1},o["a"].CreateCourse(n).then((function(t){c["a"].CreateOffer({courseId:t.id,teacherId:e.teachers[0].id,semester:"Summer",code:n.name.slice(0,3)+t.id}).then((function(){e.waitingResponse=!1}))}));case 4:case"end":return t.stop()}}),t)})))()},createHomework:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:r=m(e.selectedOffer),e.waitingResponse=!0,i["a"].GiveHomework(r).then((function(t){return e.homeworks.push(t),i["a"].GetAssignments(t.id)})).then((function(){e.waitingResponse=!1}));case 3:case"end":return t.stop()}}),t)})))()},createStudents:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.waitingResponse=!0,p.a.post("/api/test/students").then((function(){e.waitingResponse=!1}));case 2:case"end":return t.stop()}}),t)})))()},createTeachers:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.waitingResponse=!0,p.a.post("/api/test/teachers").then((function(t){e.teachers.push(t.data),e.waitingResponse=!1}));case 2:case"end":return t.stop()}}),t)})))()},answerAssignments:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.waitingResponse=!0,i["a"].GetHomework(e.selectedHomework).then((function(e){return i["a"].GetAssignments(e.id)})).then((function(e){for(var t=[],r=0;r<e.length;r++){for(var n=e[r],a=[],s=0;s<5;s++){var u=Math.floor(5*Math.random());u>0?a.push(0):a.push(1)}t.push(p.a.patch("/api/assignments/"+n.id,{answers:a}))}return Promise.all(t)})).then((function(){e.waitingResponse=!1}));case 2:case"end":return t.stop()}}),t)})))()},reviewAssignments:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.waitingResponse=!0,i["a"].GetHomework(e.selectedHomework).then((function(e){return i["a"].GetAssignments(e.id)})).then((function(e){for(var t=[],r=0;r<e.length;r++){var n=e[r];t.push(i["a"].ReviewAssignment(n))}return Promise.all(t)})).then((function(){e.waitingResponse=!1}));case 2:case"end":return t.stop()}}),t)})))()}}};function m(e){for(var t=[],r=0;r<5;r++)t.push({text:"Example question",answerType:"multiple",point:20,answer:0,choices:["Choice A","Choice B","Choice C","Choice D"]});var n={questions:t,offerId:e};return n}var h=f,v=r("2877"),w=r("6544"),d=r.n(w),g=r("8336"),k=r("62ad"),b=r("ce7e"),R=r("0fd9"),y=r("b974"),x=Object(v["a"])(h,n,a,!1,null,null,null);t["default"]=x.exports;d()(x,{VBtn:g["a"],VCol:k["a"],VDivider:b["a"],VRow:R["a"],VSelect:y["a"]})},"93f5":function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=r("d4ec"),s=r("bee2"),u=r("bc3a"),o=r.n(u),c=r("4328"),i=r.n(c),l="/api/offers/",p=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,null,[{key:"CreateOffer",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post(l,{offerBody:t});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetOffer",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(l+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetOffers",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(l);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"GetHomeworks",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(l+t+"/homeworks");case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"DeleteOffer",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.delete(l+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetEnrolleds",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(l+t+"/enrolleds",{params:{attributes:r},paramsSerializer:function(e){return i.a.stringify(e)}});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"UnenrollStudents",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.delete(l+t+"/unenroll",r);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"UploadFile",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=new FormData,n.append("file",r),e.next=4,o.a.post(l+t+"/upload",n,{headers:{"Content-Type":"multipart/form-data"}});case 4:return a=e.sent,e.abrupt("return",a.data);case 6:case"end":return e.stop()}}),e)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"GetEnrolledAssignmentsMarks",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("/api/enrolleds/".concat(t,"/assignments/marks"));case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()}]),e}();t["a"]=p},"9aeb":function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=r("d4ec"),s=r("bee2"),u=r("bc3a"),o=r.n(u),c="/api/schools/",i=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,null,[{key:"Restart",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post("/api/test/restart");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"GetHomeworks",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(c+t+"/homeworks");case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"CreateSchool",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post(c,t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"DeleteSchool",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.delete(c+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"LoginSchool",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post("/api/login/school",{email:t,password:r});case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"GetTeachers",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("".concat(c,"teachers"));case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),e}();t["a"]=i},c4af:function(e,t,r){"use strict";r("96cf");var n=r("1da1"),a=r("d4ec"),s=r("bee2"),u=r("bc3a"),o=r.n(u),c="/api/courses/",i=function(){function e(){Object(a["a"])(this,e)}return Object(s["a"])(e,null,[{key:"CreateCourse",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.post(c,{courseBody:t});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetCourseById",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(c+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"DeleteCourse",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.delete(c+t);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"GetCourses",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get(c);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}]),e}();t["a"]=i}}]);
//# sourceMappingURL=chunk-06f66a54.b7b6943d.js.map
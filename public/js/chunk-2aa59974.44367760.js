(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2aa59974"],{1681:function(t,e,a){},"2c64":function(t,e,a){},"2fa4":function(t,e,a){"use strict";a("20f6");var s=a("80d2");e["a"]=Object(s["i"])("spacer","div","v-spacer")},3356:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-row",[a("v-col",{attrs:{cols:"3"}},[a("v-card",{attrs:{raised:"",outlined:""}},[a("v-card-text",{staticClass:"text-left body-1"},[a("strong",[t._v("Homework Name:")]),t._v(" "+t._s(t.homework.name)+" "),a("br"),a("strong",[t._v("Student Name:")]),t._v(" "+t._s(t.student.firstName)+" "),t.student.middleName?a("span",[t._v(t._s(t.student.middleName))]):t._e(),t._v(" "+t._s(t.student.lastName)+" "),a("br"),a("strong",[t._v("Sent At:")]),t._v(" "+t._s(t.assignment.updatedAt)+" "),a("br")])],1)],1),a("v-col",{attrs:{cols:"3"}},[a("v-card",{attrs:{outlined:"",raised:""}},[t.homework.questions?a("v-card-text",{staticClass:"text-left body-1"},[a("strong",[t._v("Question Count:")]),t._v(" "+t._s(t.homework.questions.length)+" "),a("br"),a("strong",[t._v("Correct:")]),t._v(" "+t._s(t.correctCount)+" "),a("br"),a("strong",[t._v("False:")]),t._v(" "+t._s(t.falseCount)+" "),a("br"),a("strong",[t._v("Average:")]),t._v(" "+t._s(t.average)+" ")]):t._e()],1)],1),a("v-spacer")],1),a("v-btn",{staticClass:"ma-2",attrs:{color:"primary"},on:{click:t.completeReview}},[a("v-icon",{staticClass:"mr-1"},[t._v("mdi-content-save")]),t._v(" Save ")],1),a("v-divider"),a("v-row",t._l(t.homework.questions,(function(e,s){return a("v-col",{key:s,attrs:{cols:"6"}},[a("v-card",{attrs:{raised:"",outlined:""}},[a("v-card-title",[a("v-row",{staticClass:"text-left headline font-weight-black"},[a("v-col",{attrs:{cols:"10"}},[a("span",{staticClass:"font-weight-light"},[t._v("Question: ")]),t._v(t._s(t.homework.questions[s].text))]),a("v-col",{staticClass:"headline pa-0",attrs:{cols:"2"}},["multiple"==!e.answerType?a("v-textarea",{staticClass:"green--text ma-0",attrs:{rows:"1","no-resize":"",outlined:"",type:"number"},model:{value:t.assignment.points[s],callback:function(e){t.$set(t.assignment.points,s,t._n(e))},expression:"assignment.points[index]"}}):a("span",{staticClass:"red--text",class:{"green--text":1==t.assignment.isCorrect[s]}},[t._v(" "+t._s(t.assignment.points[s])+" / "+t._s(e.point)+" ")]),1==t.assignment.isCorrect[s]?a("v-icon",{attrs:{large:"",color:"green"}},[t._v("mdi-check-circle ")]):0==t.assignment.isCorrect[s]?a("v-icon",{attrs:{large:"",color:"red"}},[t._v("mdi-close-circle ")]):t._e()],1)],1)],1),a("v-card-text",{staticClass:"text-left font-weight-black headline",class:{"green--text":t.assignment.points[s]>0,"red--text":0==t.assignment.isCorrect[s]}},[e.choices.length>0?a("div",[a("v-radio-group",{model:{value:e.answer,callback:function(a){t.$set(e,"answer",a)},expression:"question.answer"}},t._l(e.choices,(function(t,e){return a("v-radio",{key:e,attrs:{disabled:"",label:t}})})),1),a("v-divider"),a("span",{staticClass:"font-weight-light"},[t._v("Student answer: ")]),t._v(" "+t._s(e.choices[t.assignment.answers[s]])+" ")],1):a("div",[a("v-divider"),a("span",{staticClass:"font-weight-light"},[t._v("Student answer: ")]),t._v(" "+t._s(t.assignment.answers[s])+" ")],1)])],1)],1)})),1)],1)},i=[],n=(a("a9e3"),a("b8da")),o={data:function(){return{assignmentId:Number,assignment:{},correctCount:0,homework:{},student:{},falseCount:0,average:Number}},created:function(){var t=this;this.assignmentId=this.$route.params.assignmentId;var e=["answers","points","isCorrect","updatedAt","mark"];n["a"].GetAssignment(this.assignmentId,e).then((function(e){t.assignment=e,t.student=e.Student,t.homework=e.Homework,delete t.assignment.Student,delete t.assignment.Homework;for(var a=0;a<e.isCorrect.length;a++){var s=e.isCorrect[a];1==s?t.correctCount++:0==s&&t.falseCount++}}))},methods:{completeReview:function(){var t=this;n["a"].ReviewAssignment(this.assignment).then((function(){t.$router.go()}))}}},r=o,c=(a("be6e"),a("2877")),l=a("6544"),u=a.n(l),d=a("8336"),h=a("b0af"),p=a("99d9"),v=a("62ad"),m=a("ce7e"),f=a("132d"),g=a("67b6"),b=a("43a6"),_=a("0fd9"),w=a("2fa4"),C=a("a844"),x=Object(c["a"])(r,s,i,!1,null,null,null);e["default"]=x.exports;u()(x,{VBtn:d["a"],VCard:h["a"],VCardText:p["b"],VCardTitle:p["c"],VCol:v["a"],VDivider:m["a"],VIcon:f["a"],VRadio:g["a"],VRadioGroup:b["a"],VRow:_["a"],VSpacer:w["a"],VTextarea:C["a"]})},"3d86":function(t,e,a){},"3e49":function(t,e,a){},"43a6":function(t,e,a){"use strict";a("a9e3");var s=a("5530"),i=(a("ec29"),a("3d86"),a("c37a")),n=a("604c"),o=a("8547"),r=a("58df"),c=Object(r["a"])(o["a"],n["a"],i["a"]);e["a"]=c.extend({name:"v-radio-group",provide:function(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes:function(){return Object(s["a"])({},i["a"].options.computed.classes.call(this),{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row})}},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},i["a"].options.methods.genDefaultSlot.call(this))},genInputSlot:function(){var t=i["a"].options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel:function(){var t=i["a"].options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:n["a"].options.methods.onClick}})},"615b":function(t,e,a){},"67b6":function(t,e,a){"use strict";a("b0c0");var s=a("5530"),i=(a("2c64"),a("ba87")),n=a("9d26"),o=a("c37a"),r=a("7e2b"),c=a("a9ad"),l=a("4e82"),u=a("5311"),d=a("7560"),h=a("fe09"),p=a("80d2"),v=a("58df"),m=Object(v["a"])(r["a"],c["a"],u["a"],Object(l["a"])("radioGroup"),d["a"]);e["a"]=m.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:function(){return{isFocused:!1}},computed:{classes:function(){return Object(s["a"])({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses,{},this.groupClasses)},computedColor:function(){return h["a"].options.computed.computedColor.call(this)},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},computedId:function(){return o["a"].options.computed.computedId.call(this)},hasLabel:o["a"].options.computed.hasLabel,hasState:function(){return(this.radioGroup||{}).hasState},isDisabled:function(){return this.disabled||!!(this.radioGroup||{}).disabled},isReadonly:function(){return this.readonly||!!(this.radioGroup||{}).readonly},computedName:function(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-".concat(this.radioGroup._uid)},rippleState:function(){return h["a"].options.computed.rippleState.call(this)},validationState:function(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput:function(t){return h["a"].options.methods.genInput.call(this,"radio",t)},genLabel:function(){var t=this;return this.hasLabel?this.$createElement(i["a"],{on:{click:function(e){e.preventDefault(),t.onChange()}},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(p["q"])(this,"label")||this.label):null},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(n["a"],this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput(Object(s["a"])({name:this.computedName,value:this.value},this.attrs$)),this.genRipple(this.setTextColor(this.rippleState))])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:function(){}},render:function(t){var e={staticClass:"v-radio",class:this.classes};return t("div",e,[this.genRadio(),this.genLabel()])}})},"8ce9":function(t,e,a){},"99d9":function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return c}));var s=a("b0af"),i=a("80d2"),n=Object(i["i"])("v-card__actions"),o=Object(i["i"])("v-card__subtitle"),r=Object(i["i"])("v-card__text"),c=Object(i["i"])("v-card__title");s["a"]},a844:function(t,e,a){"use strict";a("a9e3");var s=a("5530"),i=(a("1681"),a("8654")),n=a("58df"),o=Object(n["a"])(i["a"]);e["a"]=o.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(s["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},i["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"}},genInput:function(){var t=i["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){i["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},b0af:function(t,e,a){"use strict";a("0481"),a("4069"),a("a9e3");var s=a("5530"),i=(a("615b"),a("10d2")),n=a("297c"),o=a("1c87"),r=a("58df");e["a"]=Object(r["a"])(n["a"],o["a"],i["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},outlined:Boolean,raised:Boolean,shaped:Boolean},computed:{classes:function(){return Object(s["a"])({"v-card":!0},o["a"].options.computed.classes.call(this),{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--outlined":this.outlined,"v-card--raised":this.raised,"v-card--shaped":this.shaped},i["a"].options.computed.classes.call(this))},styles:function(){var t=Object(s["a"])({},i["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=n["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),a=e.tag,s=e.data;return s.style=this.styles,this.isClickable&&(s.attrs=s.attrs||{},s.attrs.tabindex=0),t(a,this.setBackgroundColor(this.color,s),[this.genProgress(),this.$slots.default])}})},be6e:function(t,e,a){"use strict";var s=a("3e49"),i=a.n(s);i.a},ce7e:function(t,e,a){"use strict";var s=a("5530"),i=(a("8ce9"),a("7560"));e["a"]=i["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(s["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(s["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})}}]);
//# sourceMappingURL=chunk-2aa59974.44367760.js.map
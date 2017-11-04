webpackJsonp([1],{13:function(e,t,s){"use strict";function n(){var e=this;this.fetch=function(){return JSON.parse(localStorage.getItem(c)||"{}")},this.save=function(t,s){var n=t||(new Date).getTime(),i=e.fetch();i[n]=s,localStorage.setItem(c,r()(i))},this.remove=function(t){var s=e.fetch();delete s[t],localStorage.setItem(c,r()(s));var n=u+"_"+t;localStorage.removeItem(n)}}function i(){var e=this;this.checkin=function(e,t,s){var n={objectiveId:e,option:t,startTime:s};localStorage.setItem(o,r()(n))},this.getCurrentActivity=function(){var e=localStorage.getItem(o);return e?JSON.parse(e):null},this.getActivities=function(e){var t=u+"_"+e;return JSON.parse(localStorage.getItem(t)||"[]")},this.checkout=function(t){var s=e.getCurrentActivity();if(s){s.endTime=t;var n=u+"_"+s.objectiveId,i=e.getActivities(s.objectiveId);i.push(s),localStorage.setItem(n,r()(i)),localStorage.removeItem(o)}}}var a=s(14),r=s.n(a),c="@GH_OBJECTIVE",o="@GH_TEMP_ACTIVITY",u="@GH_ACTIVITY";t.a={objective:new n,activity:new i}},142:function(e,t,s){function n(e){s(232)}var i=s(8)(s(150),s(262),n,"data-v-f77572cc",null);e.exports=i.exports},143:function(e,t,s){"use strict";var n=s(3),i=s(263),a=s(255),r=s.n(a),c=s(256),o=s.n(c),u=s(254),l=s.n(u);n.default.use(i.a),t.a=new i.a({mode:"history",routes:[{path:"/",name:"Home",component:r.a},{path:"/home",name:"Home",component:r.a},{path:"/objective",name:"Objective",component:o.a},{path:"/chart",name:"Chart",component:l.a}]})},144:function(e,t,s){function n(e){s(227)}var i=s(8)(s(148),s(257),n,null,null);e.exports=i.exports},146:function(e,t,s){"use strict";var n=s(248),i=(s.n(n),n.mixins.reactiveProp);t.a=n.Line.extend({mixins:[i],props:["options"],mounted:function(){this.renderChart(this.chartData,this.options)}})},147:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(3),i=s(145),a=s.n(i),r=s(144),c=s.n(r),o=s(143);n.default.config.productionTip=!1,n.default.use(a.a,{prefix:new Date,dev:!0,shortname:!0,levels:["log","warn","debug","error","dir"]}),new n.default({el:"#app",router:o.a,template:"<App/>",components:{App:c.a}})},148:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app"}},149:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(142),i=s.n(n);t.default={components:{CustomPopup:i.a},name:"Confirm",props:["close","confirm","message","title"],methods:{closePopup:function(){this.$emit("close")},confirmIt:function(){this.$emit("confirm")}}}},150:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"CustomPopup",props:["close","title"],methods:{closePopup:function(){this.$emit("close")}}}},151:function(e,t,s){"use strict";function n(){for(var e=[],t=(new Date).getDate(),s=1;s<=t;s++)e.push(s);return e}function i(e){return v[e]}function a(e,t,s){var n=u.a.activity.getActivities(e),i=n.filter(function(e){return new Date(e.startTime).getMonth()+1===t});r.default.console.debug("thisMonthActivities",e,i);var a=o.a.groupBy(i,function(e){return new Date(e.startTime).getDate()});r.default.console.debug("groupActivities",e,a);var c=o.a.mapValues(a,function(e){return o.a.sumBy(e,function(e){return(e.endTime-e.startTime)/1e3})});return r.default.console.debug("usedTime",e,c),s.map(function(e){return c[e]?Math.round(c[e]/60,0):0})}Object.defineProperty(t,"__esModule",{value:!0});var r=s(3),c=s(234),o=s.n(c),u=s(13),l=s(146),v=["#F44336","#E91E63","#9C27B0","#673AB7","#3F51B5","#2196F3","#03A9F4","#00BCD4","#009688","#4CAF50","#8BC34A","#CDDC39","#FFEB3B","#FFC107","#FF9800","#FF5722","#795548","#9E9E9E"];t.default={components:{LineChart:l.a},data:function(){return{today:new Date,objectives:u.a.objective.fetch(),currentObjectives:[],dataCollection:{}}},methods:{updateChart:function(){var e=this.today.getMonth()+1,t=n(),s=this.objectives,c=this.currentObjectives,o=[];r.default.console.debug("currentObjectives",c),c&&c.length>0&&(o=c.map(function(n,r){return{label:s[n],backgroundColor:i(r),data:a(n,e,t)}})),this.dataCollection={labels:t,datasets:o}}},filters:{displayMonth:function(e){return e.toLocaleString("en-us",{month:"long"})}}}},152:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(15),i=s.n(n),a=s(13),r=s(142),c=s.n(r);t.default={components:{CustomPopup:c.a},name:"Home",data:function(){var e=a.a.objective.fetch();return{checkinActive:!1,hasObjective:null!==e&&i()(e).length>0,objectives:e,selectedObjective:"",currentActivity:a.a.activity.getCurrentActivity()}},methods:{openCheckin:function(){this.checkinActive=!0},closeCheckin:function(){this.checkinActive=!1},checkin:function(){var e=(new Date).getTime(),t=this.selectedObjective;t&&(a.a.activity.checkin(t,{},e),this.currentActivity=a.a.activity.getCurrentActivity(),this.checkinActive=!1)},checkout:function(){if(this.currentActivity){var e=(new Date).getTime();a.a.activity.checkout(e),this.currentActivity=a.a.activity.getCurrentActivity()}}},filters:{displayTime:function(e){return e.getHours()+":"+e.getMinutes()}}}},153:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(13),i=s(253),a=s.n(i);t.default={components:{Confirm:a.a},name:"Objective",data:function(){return{newObjective:"",objectives:n.a.objective.fetch(),showConfirmRemove:!1,currentRemoveId:null}},methods:{addNew:function(){var e=this.newObjective&&this.newObjective.trim();this.newObjective="",e&&(n.a.objective.save(null,e),this.newObjective="",this.objectives=n.a.objective.fetch())},confirmRemove:function(e){this.showConfirmRemove=!0,this.currentRemoveId=e},closeConfirmRemove:function(){this.showConfirmRemove=!1,this.currentRemoveId=!1},remove:function(){var e=this.currentRemoveId;e&&(n.a.objective.remove(e),this.objectives=n.a.objective.fetch(),this.showConfirmRemove=!1,this.currentRemoveId=!1)}}}},227:function(e,t){},228:function(e,t){},229:function(e,t){},230:function(e,t){},231:function(e,t){},232:function(e,t){},235:function(e,t,s){function n(e){return s(i(e))}function i(e){var t=a[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}var a={"./af":27,"./af.js":27,"./ar":34,"./ar-dz":28,"./ar-dz.js":28,"./ar-kw":29,"./ar-kw.js":29,"./ar-ly":30,"./ar-ly.js":30,"./ar-ma":31,"./ar-ma.js":31,"./ar-sa":32,"./ar-sa.js":32,"./ar-tn":33,"./ar-tn.js":33,"./ar.js":34,"./az":35,"./az.js":35,"./be":36,"./be.js":36,"./bg":37,"./bg.js":37,"./bn":38,"./bn.js":38,"./bo":39,"./bo.js":39,"./br":40,"./br.js":40,"./bs":41,"./bs.js":41,"./ca":42,"./ca.js":42,"./cs":43,"./cs.js":43,"./cv":44,"./cv.js":44,"./cy":45,"./cy.js":45,"./da":46,"./da.js":46,"./de":49,"./de-at":47,"./de-at.js":47,"./de-ch":48,"./de-ch.js":48,"./de.js":49,"./dv":50,"./dv.js":50,"./el":51,"./el.js":51,"./en-au":52,"./en-au.js":52,"./en-ca":53,"./en-ca.js":53,"./en-gb":54,"./en-gb.js":54,"./en-ie":55,"./en-ie.js":55,"./en-nz":56,"./en-nz.js":56,"./eo":57,"./eo.js":57,"./es":59,"./es-do":58,"./es-do.js":58,"./es.js":59,"./et":60,"./et.js":60,"./eu":61,"./eu.js":61,"./fa":62,"./fa.js":62,"./fi":63,"./fi.js":63,"./fo":64,"./fo.js":64,"./fr":67,"./fr-ca":65,"./fr-ca.js":65,"./fr-ch":66,"./fr-ch.js":66,"./fr.js":67,"./fy":68,"./fy.js":68,"./gd":69,"./gd.js":69,"./gl":70,"./gl.js":70,"./gom-latn":71,"./gom-latn.js":71,"./he":72,"./he.js":72,"./hi":73,"./hi.js":73,"./hr":74,"./hr.js":74,"./hu":75,"./hu.js":75,"./hy-am":76,"./hy-am.js":76,"./id":77,"./id.js":77,"./is":78,"./is.js":78,"./it":79,"./it.js":79,"./ja":80,"./ja.js":80,"./jv":81,"./jv.js":81,"./ka":82,"./ka.js":82,"./kk":83,"./kk.js":83,"./km":84,"./km.js":84,"./kn":85,"./kn.js":85,"./ko":86,"./ko.js":86,"./ky":87,"./ky.js":87,"./lb":88,"./lb.js":88,"./lo":89,"./lo.js":89,"./lt":90,"./lt.js":90,"./lv":91,"./lv.js":91,"./me":92,"./me.js":92,"./mi":93,"./mi.js":93,"./mk":94,"./mk.js":94,"./ml":95,"./ml.js":95,"./mr":96,"./mr.js":96,"./ms":98,"./ms-my":97,"./ms-my.js":97,"./ms.js":98,"./my":99,"./my.js":99,"./nb":100,"./nb.js":100,"./ne":101,"./ne.js":101,"./nl":103,"./nl-be":102,"./nl-be.js":102,"./nl.js":103,"./nn":104,"./nn.js":104,"./pa-in":105,"./pa-in.js":105,"./pl":106,"./pl.js":106,"./pt":108,"./pt-br":107,"./pt-br.js":107,"./pt.js":108,"./ro":109,"./ro.js":109,"./ru":110,"./ru.js":110,"./sd":111,"./sd.js":111,"./se":112,"./se.js":112,"./si":113,"./si.js":113,"./sk":114,"./sk.js":114,"./sl":115,"./sl.js":115,"./sq":116,"./sq.js":116,"./sr":118,"./sr-cyrl":117,"./sr-cyrl.js":117,"./sr.js":118,"./ss":119,"./ss.js":119,"./sv":120,"./sv.js":120,"./sw":121,"./sw.js":121,"./ta":122,"./ta.js":122,"./te":123,"./te.js":123,"./tet":124,"./tet.js":124,"./th":125,"./th.js":125,"./tl-ph":126,"./tl-ph.js":126,"./tlh":127,"./tlh.js":127,"./tr":128,"./tr.js":128,"./tzl":129,"./tzl.js":129,"./tzm":131,"./tzm-latn":130,"./tzm-latn.js":130,"./tzm.js":131,"./uk":132,"./uk.js":132,"./ur":133,"./ur.js":133,"./uz":135,"./uz-latn":134,"./uz-latn.js":134,"./uz.js":135,"./vi":136,"./vi.js":136,"./x-pseudo":137,"./x-pseudo.js":137,"./yo":138,"./yo.js":138,"./zh-cn":139,"./zh-cn.js":139,"./zh-hk":140,"./zh-hk.js":140,"./zh-tw":141,"./zh-tw.js":141};n.keys=function(){return Object.keys(a)},n.resolve=i,e.exports=n,n.id=235},238:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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"},252:function(e,t){e.exports={_from:"vue-chartjs@^2.8.1",_id:"vue-chartjs@2.8.7",_inBundle:!1,_integrity:"sha512-XNNCQHwP1zUe739q0h0DdObx7qC+umJ50P8N4uab4N964rHSSq7sbRAdyoevObI3K2eYuCTLhnzjA1F90uQwtQ==",_location:"/vue-chartjs",_phantomChildren:{},_requested:{type:"range",registry:!0,raw:"vue-chartjs@^2.8.1",name:"vue-chartjs",escapedName:"vue-chartjs",rawSpec:"^2.8.1",saveSpec:null,fetchSpec:"^2.8.1"},_requiredBy:["/"],_resolved:"https://registry.npmjs.org/vue-chartjs/-/vue-chartjs-2.8.7.tgz",_shasum:"bcd1cda1a1ef8ed80581638a02cf88182d437d09",_spec:"vue-chartjs@^2.8.1",_where:"/Users/dattran/projects/github/good-habit",author:{name:"Jakub Juszczak",email:"jakub@posteo.de"},babel:{presets:["es2015"]},browserify:{transform:["babelify"]},bugs:{url:"https://github.com/apertureless/vue-chartjs/issues"},bundleDependencies:!1,contributors:[{name:"Thorsten Lünborg",url:"https://github.com/LinusBorg"},{name:"Juan Carlos Alonso",url:"https://github.com/jcalonso"}],dependencies:{"lodash.merge":"^4.6.0"},deprecated:!1,description:"Vue.js wrapper for chart.js for creating beautiful charts.",devDependencies:{"babel-cli":"^6.24.1","babel-core":"^6.25.0","babel-loader":"^7.0.0","babel-plugin-transform-object-assign":"^6.22.0","babel-plugin-transform-runtime":"^6.23.0","babel-preset-es2015":"^6.24.1","babel-preset-stage-2":"^6.24.1","babel-runtime":"^6.23.0",chai:"^3.5.0","chart.js":"^2.7.0",chromedriver:"^2.28.0","connect-history-api-fallback":"^1.1.0","cross-env":"^3.2.4","cross-spawn":"^5.1.0","css-loader":"^0.28.0",eslint:"^3.19.0","eslint-config-standard":"^10.2.1","eslint-friendly-formatter":"^2.0.7","eslint-loader":"^1.7.1","eslint-plugin-html":"^2.0.1","eslint-plugin-import":"^2.2.0","eslint-plugin-node":"^4.2.2","eslint-plugin-promise":"^3.5.0","eslint-plugin-standard":"^3.0.1","eventsource-polyfill":"^0.9.6",express:"^4.15.2","extract-text-webpack-plugin":"^1.0.1","file-loader":"^0.10.1","function-bind":"^1.0.2","html-webpack-plugin":"^2.28.0","http-proxy-middleware":"^0.17.4","inject-loader":"^3.0.0","isparta-loader":"^2.0.0","jasmine-core":"^2.5.2","json-loader":"^0.5.4",karma:"^1.5.0","karma-coverage":"^1.1.1","karma-jasmine":"^1.0.2","karma-mocha":"^1.2.0","karma-phantomjs-launcher":"^1.0.4","karma-sinon-chai":"^1.2.0","karma-sourcemap-loader":"^0.3.7","karma-spec-reporter":"0.0.30","karma-webpack":"1.8.1",lolex:"^1.6.0",mocha:"^3.1.0",nightwatch:"^0.9.14",ora:"^1.2.0","phantomjs-prebuilt":"^2.1.13","selenium-server":"^3.3.1",shelljs:"^0.7.7",sinon:"^2.1.0","sinon-chai":"^2.9.0","url-loader":"^0.5.8",vue:"^2.4.4","vue-hot-reload-api":"^2.1.0","vue-html-loader":"^1.2.4","vue-loader":"^12.2.2","vue-style-loader":"^3.0.1","vue-template-compiler":"^2.4.2",webpack:"^1.13.2","webpack-dev-middleware":"^1.10.1","webpack-hot-middleware":"^2.17.1","webpack-merge":"1.1.1"},engines:{node:">=6.9.0"},files:["src","dist","es"],greenkeeper:{ignore:["extract-text-webpack-plugin","karma-webpack","webpack","webpack-merge"]},homepage:"http://vue-chartjs.org","jsnext:main":"es/index.js",keywords:["ChartJs","Vue","Visualisation","Wrapper","Charts"],license:"MIT",main:"dist/vue-chartjs.js",maintainers:[{name:"Jakub Juszczak",email:"jakub@posteo.de",url:"http://www.jakubjuszczak.de"}],module:"es/index.js",name:"vue-chartjs",peerDependencies:{"chart.js":"^2.7.0",vue:"^2.4.4"},repository:{type:"git",url:"git+ssh://git@github.com/apertureless/vue-chartjs.git"},scripts:{build:"yarn run release && yarn run build:es","build:es":"cross-env BABEL_ENV=es babel src --out-dir es",dev:"node build/dev-server.js",e2e:"node test/e2e/runner.js",lint:"eslint --ext .js,.vue src test/unit/specs test/e2e/specs",prepublish:"yarn run lint && yarn run test && yarn run build",release:"webpack --progress --hide-modules --config  ./build/webpack.release.js && NODE_ENV=production webpack --progress --hide-modules --config  ./build/webpack.release.min.js && webpack --progress --hide-modules --config  ./build/webpack.release.full.js && NODE_ENV=production webpack --progress --hide-modules --config  ./build/webpack.release.full.min.js",test:"npm run unit",unit:"karma start test/unit/karma.conf.js --single-run"},unpkg:"dist/vue-chartjs.full.min.js",version:"2.8.7"}},253:function(e,t,s){function n(e){s(231)}var i=s(8)(s(149),s(261),n,"data-v-6368aac2",null);e.exports=i.exports},254:function(e,t,s){function n(e){s(230)}var i=s(8)(s(151),s(260),n,"data-v-4b9b8f0e",null);e.exports=i.exports},255:function(e,t,s){function n(e){s(229)}var i=s(8)(s(152),s(259),n,"data-v-429bb2d8",null);e.exports=i.exports},256:function(e,t,s){function n(e){s(228)}var i=s(8)(s(153),s(258),n,"data-v-426abad4",null);e.exports=i.exports},257:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("header",{attrs:{id:"app-header"}},[n("div",{staticClass:"container"},[n("img",{attrs:{id:"logo",src:s(238)}}),e._v(" "),n("nav",{attrs:{id:"main-nav"}},[n("ul",[n("router-link",{attrs:{activeClass:"active",to:"/home"}},[e._v("Check In")]),e._v(" "),n("router-link",{attrs:{activeClass:"active",to:"/objective"}},[e._v("Objective")]),e._v(" "),n("router-link",{attrs:{activeClass:"active",to:"/chart"}},[e._v("Chart")])],1)])])]),e._v(" "),n("div",{staticClass:"container",attrs:{id:"main-content"}},[n("router-view")],1),e._v(" "),e._m(0)])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("footer",[s("div",{staticClass:"container"},[s("div",{staticClass:"wrapper"},[s("p",[e._v("Copyright 2017 - Dat Tran")])])])])}]}},258:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"objective"},[e._m(0),e._v(" "),s("section",{staticClass:"main-content"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.newObjective,expression:"newObjective"}],staticClass:"new-objective",attrs:{autofocus:"",autocomplete:"off",placeholder:"What's your objective"},domProps:{value:e.newObjective},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.addNew(t)},input:function(t){t.target.composing||(e.newObjective=t.target.value)}}}),e._v(" "),s("section",{staticClass:"main"},[s("ul",{staticClass:"objective-list"},e._l(e.objectives,function(t,n){return s("li",{key:n,staticClass:"objective"},[s("span",[e._v(e._s(t))]),e._v(" "),s("a",{on:{click:function(t){e.confirmRemove(n)}}},[e._v("×")])])}))])]),e._v(" "),e.showConfirmRemove?s("confirm",{attrs:{title:"Remove Objective",message:"Are you sure to remove this objective?"},on:{close:e.closeConfirmRemove,confirm:e.remove}}):e._e()],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",[s("h1",{staticClass:"main-header"},[e._v("Objective")])])}]}},259:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"activity"},[e._m(0),e._v(" "),s("section",{staticClass:"main-content"},[e.hasObjective?e._e():s("div",[e._m(1),e._v(" "),s("router-link",{staticClass:"btn primary",attrs:{to:"/objective"}},[e._v("Create Objective")])],1),e._v(" "),e.hasObjective?s("div",[null==e.currentActivity?s("button",{staticClass:"primary",on:{click:e.openCheckin}},[e._v("\n        Check In\n      ")]):e._e(),e._v(" "),null!=e.currentActivity?s("div",[s("span",[e._v("You have started ")]),e._v(" "),s("b",[e._v(e._s(e.objectives[e.currentActivity.objectiveId]))]),e._v(" "),s("span",[e._v(" since ")]),e._v(" "),s("b",[e._v(e._s(e._f("displayTime")(new Date(e.currentActivity.startTime))))])]):e._e(),e._v(" "),null!=e.currentActivity?s("button",{on:{click:e.checkout}},[e._v("\n        Check Out\n      ")]):e._e()]):e._e()]),e._v(" "),e.checkinActive?s("custom-popup",{attrs:{title:"Check in your activity"},on:{close:e.closeCheckin}},[s("section",[s("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedObjective,expression:"selectedObjective"}],on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.selectedObjective=t.target.multiple?s:s[0]}}},[s("option",{attrs:{value:""}},[e._v("Select Objective")]),e._v(" "),e._l(e.objectives,function(t,n){return s("option",{domProps:{value:n}},[e._v("\n          "+e._s(t)+"\n        ")])})],2)]),e._v(" "),s("footer",[e.selectedObjective?s("button",{staticClass:"primary",on:{click:e.checkin}},[e._v("\n        Check In\n      ")]):e._e(),e._v(" "),s("button",{on:{click:e.closeCheckin}},[e._v("\n        Cancel\n      ")])])]):e._e()],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",[s("h1",{staticClass:"main-header"},[e._v("Log Your Activity")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("span",{staticClass:"alert"},[e._v("\n          You have not created any objective yet.\n        ")])])}]}},260:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"chart"},[e._m(0),e._v(" "),s("section",{staticClass:"main-content"},[s("ul",{attrs:{id:"filterBox"}},e._l(e.objectives,function(t,n){return s("li",{key:n},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.currentObjectives,expression:"currentObjectives"}],attrs:{type:"checkbox",id:n},domProps:{value:n,checked:Array.isArray(e.currentObjectives)?e._i(e.currentObjectives,n)>-1:e.currentObjectives},on:{click:e.updateChart,change:function(t){var s=e.currentObjectives,i=t.target,a=!!i.checked;if(Array.isArray(s)){var r=n,c=e._i(s,r);i.checked?c<0&&(e.currentObjectives=s.concat([r])):c>-1&&(e.currentObjectives=s.slice(0,c).concat(s.slice(c+1)))}else e.currentObjectives=a}}}),e._v(" "),s("label",{attrs:{for:n}},[e._v("\n          "+e._s(t)+"\n        ")])])})),e._v(" "),s("line-chart",{attrs:{width:2,height:1,"chart-data":e.dataCollection}}),e._v(" "),s("div",{staticClass:"chartName"},[e._v("\n      Time spent on "+e._s(e._f("displayMonth")(e.today))+" (min/day)\n    ")])],1)])},staticRenderFns:[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",[s("h1",{staticClass:"main-header"},[e._v("Chart")])])}]}},261:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("custom-popup",{attrs:{title:e.title},on:{close:e.closePopup}},[s("section",[s("div",{staticClass:"content"},[e._v("\n      "+e._s(e.message)+"\n    ")])]),e._v(" "),s("footer",[s("button",{staticClass:"primary",on:{click:e.confirmIt}},[e._v("OK")]),e._v(" "),s("button",{on:{click:e.closePopup}},[e._v("Cancel")])])])},staticRenderFns:[]}},262:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"overlay"},[s("div",{staticClass:"popup"},[s("header",[s("h2",[e._v(e._s(e.title))]),e._v(" "),s("a",{staticClass:"close",on:{click:e.closePopup}},[e._v("×")])]),e._v(" "),e._t("default",[e._v("\n      This is for the body\n    ")])],2)])},staticRenderFns:[]}}},[147]);
//# sourceMappingURL=app.9b3e698c7c97824731a8.js.map
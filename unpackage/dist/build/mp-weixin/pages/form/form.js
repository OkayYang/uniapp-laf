(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/form/form"],{"06ef":function(e,t,n){},3781:function(e,t,n){"use strict";n.r(t);var o=n("ac64"),u=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=u.a},"67a2":function(e,t,n){"use strict";var o=n("06ef"),u=n.n(o);u.a},ac64:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n("a34a")),u=r(n("6cac"));function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t,n,o,u,r,a){try{var i=e[r](a),s=i.value}catch(c){return void n(c)}i.done?t(s):Promise.resolve(s).then(o,u)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(o,u){var r=e.apply(t,n);function a(e){c(r,o,u,a,i,"next",e)}function i(e){c(r,o,u,a,i,"throw",e)}a(void 0)}))}}var f={data:function(){return{apiHost:u.default.getHost(),err:!0,isShow:!0,rel_status:null,navbar:null,showCampus:!1,showSort:!1,model1:{userInfo:{name:null,campus:null,value:null,contact:null,title:null}},actions:[{name:"南昌校区"},{name:"红旗校区"},{name:"黄金校区"}],sortActions:[{name:"学生证"},{name:"身份证"},{name:"其他"}],submitBtnStyle:{width:"100%",margin:"auto",borderRadius:" 10rpx 10rpx"},rules:{"userInfo.sort":{type:"string",trigger:["blur","change"]},"userInfo.campus":{type:"string",max:1,required:!0,message:"请选择校区",trigger:["blur","change"]},"userInfo.title":{type:"string",required:!0,message:"请填写失物",trigger:["blur","change"]},"userInfo.contact":{type:"string",required:!0,message:"请填写联系方式",trigger:["blur","change"]}},radio:"",switchVal:!1,value3:null,photoUrl:null,fileList1:[],name:"",type:"",campusText:null,id:"",status:"",thumb:"",check:!1,isActive:!1}},onLoad:function(e){this.onLoadClone3389(e)},methods:{onLoadClone3389:function(t){var n=this;null==this.qq&&e.getStorage({key:"userInfo",success:function(e){null!=e.data.stuQq&&(n.model1.userInfo.contact="QQ:"+e.data.stuQq)}});u.default.getRequest("/wx/api/category/treeData",null,(function(e){var t=[];e.data.forEach((function(e){t.push({name:e.name,value:e.id})})),n.sortActions=t}));var o=t.type;1==o?(e.setNavigationBarTitle({title:"失物招领"}),this.navbar="发布一条失物招领",this.rel_status=o):2==o?(e.setNavigationBarTitle({title:"寻物启事"}),this.navbar="发布一条寻物启事",this.rel_status=o):e.showToast({title:"非法访问!",icon:"error",duration:1e3,success:function(){e.switchTab({url:"../index/index"})}})},campusSelect:function(e){this.model1.userInfo.campus=e.name},sortSelect:function(e){this.model1.userInfo.sort=e.name,this.model1.userInfo.value=e.value,console.log(e.name),console.log(e.value)},deletePic:function(e){this["fileList".concat(e.name)].splice(e.index,1)},afterRead:function(e){var t=this;return l(o.default.mark((function n(){var u,r,a,s,c;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:u=[].concat(e.file),r=t["fileList".concat(e.name)].length,u.map((function(n){t["fileList".concat(e.name)].push(i(i({},n),{},{status:"uploading",message:"上传中"}))})),a=0;case 4:if(!(a<u.length)){n.next=14;break}return n.next=7,t.uploadFilePromise(u[a].url);case 7:s=n.sent,c=t["fileList".concat(e.name)][r],t["fileList".concat(e.name)].splice(r,1,Object.assign(c,{status:"success",message:"",url:s,thumb:t.apiHost+t.photoUrl})),r++;case 11:a++,n.next=4;break;case 14:case"end":return n.stop()}}),n)})))()},uploadFilePromise:function(t){var n=this;return new Promise((function(o,u){var r=n;e.uploadFile({url:n.apiHost+"/wx/api/release/upload",filePath:t,name:"file",formData:{user:"test"},success:function(e){setTimeout((function(){o(e.data.data)}),1e3),console.log(e);var t=e.data;if(r.status=e.statusCode,r.name=JSON.parse(t).name,r.type=JSON.parse(t).type,r.number=JSON.parse(t).number,r.photoUrl=JSON.parse(t).photoUrl,console.log(r.type),"sfz"==r.type){var u=r.number.replace(/^(.{4})(?:\d+)(.{4})$/,"$1******$2");r.model1.userInfo.title="捡到"+n.name+"的身份证",r.value3="身份证号为"+u,r.model1.userInfo.sort="身份证",r.model1.userInfo.value=2,console.log("捡到身份证")}else if("xsz"==r.type){u=r.number.replace(/^(.{2})(?:\d+)(.{2})$/,"$1******$2");r.model1.userInfo.title="捡到"+n.name+"的学生证",r.value3="学生证号为"+u,r.model1.userInfo.sort="学生证",r.model1.userInfo.value=3}null!=r.model1.userInfo.campus&&""!=r.model1.userInfo.campus||(r.model1.userInfo.campus="南昌校区")}})}))},postForm:function(){var t=this,n=this;this.isActive=!1,this.$refs.form1.validate().then((function(o){t.check?u.default.postRequest("/wx/api/release/auth/add/check",{relCampus:n.model1.userInfo.campus,relCateId:n.model1.userInfo.value,relContact:n.model1.userInfo.contact,relDesc:n.value3,relImage:n.photoUrl,relStatus:n.rel_status,relTitle:n.model1.userInfo.title,createPlace:n.model1.userInfo.clue},(function(t){0==t.data.code?e.switchTab({url:"../index/index",success:function(){var e=getCurrentPages().pop();void 0!=e&&null!=e&&e.onLoad()}}):n.$refs.uToast.show({type:"error",message:"发布失败!",iconUrl:"https://cdn.uviewui.com/uview/demo/toast/error.png"})})):t.isActive=!0}))},openWord:function(){e.navigateTo({url:"../word/word"})},changeRadio:function(){this.check?this.check=!1:(this.check=!0,this.isActive=!1)}}};t.default=f}).call(this,n("543d")["default"])},ae3c:function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={uUpload:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-upload/u-upload")]).then(n.bind(null,"f887"))},"u-Form":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--form/u--form")]).then(n.bind(null,"8032"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"7ca2"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"5be4"))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"1ad2"))},uActionSheet:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-action-sheet/u-action-sheet")]).then(n.bind(null,"d878"))},"u-Textarea":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(n.bind(null,"66d0"))}},u=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showSort=!0},e.e1=function(t){e.showSort=!1},e.e2=function(t){e.showCampus=!0},e.e3=function(t){e.showCampus=!1})},r=[]},ecc4:function(e,t,n){"use strict";n.r(t);var o=n("ae3c"),u=n("3781");for(var r in u)"default"!==r&&function(e){n.d(t,e,(function(){return u[e]}))}(r);n("67a2");var a,i=n("f0c5"),s=Object(i["a"])(u["default"],o["b"],o["c"],!1,null,"c1387532",null,!1,o["a"],a);t["default"]=s.exports},fa0d:function(e,t,n){"use strict";(function(e){n("c83d");o(n("66fd"));var t=o(n("ecc4"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])}},[["fa0d","common/runtime","common/vendor"]]]);
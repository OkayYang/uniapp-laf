(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-read-more/u-read-more"],{"0f0f":function(t,n,e){"use strict";e.r(n);var u=e("ae39"),o=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=o.a},"545f":function(t,n,e){},"6c8c":function(t,n,e){"use strict";e.r(n);var u=e("b6bb"),o=e("0f0f");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("856c");var r,s=e("f0c5"),a=Object(s["a"])(o["default"],u["b"],u["c"],!1,null,"47ca9a7f",null,!1,u["a"],r);n["default"]=a.exports},"856c":function(t,n,e){"use strict";var u=e("545f"),o=e.n(u);o.a},ae39:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=i(e("a34a")),o=i(e("8435"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t,n,e,u,o,i,r){try{var s=t[i](r),a=s.value}catch(c){return void e(c)}s.done?n(a):Promise.resolve(a).then(u,o)}function s(t){return function(){var n=this,e=arguments;return new Promise((function(u,o){var i=t.apply(n,e);function s(t){r(i,u,o,s,a,"next",t)}function a(t){r(i,u,o,s,a,"throw",t)}s(void 0)}))}}var a={name:"u-read-more",mixins:[t.$u.mpMixin,t.$u.mixin,o.default],data:function(){return{isLongContent:!1,status:"close",elId:t.$u.guid(),contentHeight:100}},computed:{innerShadowStyle:function(){return"open"===this.status?{}:this.shadowStyle}},mounted:function(){this.init()},methods:{init:function(){var n=this;return s(u.default.mark((function e(){return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.getContentHeight().then((function(e){n.contentHeight=e,e>t.$u.getPx(n.showHeight)&&(n.isLongContent=!0,n.status="close")}));case 1:case"end":return e.stop()}}),e)})))()},getContentHeight:function(){var n=this;return s(u.default.mark((function e(){return u.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$u.sleep(30);case 2:return e.abrupt("return",new Promise((function(t){n.$uGetRect("."+n.elId).then((function(n){t(n.height)}))})));case 3:case"end":return e.stop()}}),e)})))()},toggleReadMore:function(){this.status="close"===this.status?"open":"close",0==this.toggle&&(this.isLongContent=!1),this.$emit(this.status,this.name)}}};n.default=a}).call(this,e("543d")["default"])},b6bb:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return u}));var u={"u-Text":function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u--text/u--text")]).then(e.bind(null,"523e"))},uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"4493"))}},o=function(){var t=this,n=t.$createElement,e=(t._self._c,t.isLongContent&&"close"===t.status?t.$u.addUnit(t.showHeight):null),u=t.isLongContent&&"close"===t.status?null:t.$u.addUnit(t.contentHeight),o=t.isLongContent?t.__get_style([t.innerShadowStyle]):null;t.$mp.data=Object.assign({},{$root:{g0:e,g1:u,s0:o}})},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-read-more/u-read-more-create-component',
    {
        'uni_modules/uview-ui/components/u-read-more/u-read-more-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6c8c"))
        })
    },
    [['uni_modules/uview-ui/components/u-read-more/u-read-more-create-component']]
]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-tabbar/u-tabbar"],{"09dd":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}));var u={uSafeBottom:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-safe-bottom/u-safe-bottom")]).then(n.bind(null,"b680"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.tabbarStyle]));t.$mp.data=Object.assign({},{$root:{s0:n}})},a=[]},"57d1":function(t,e,n){"use strict";n.r(e);var u=n("09dd"),r=n("f6d8");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("8da5");var i,o=n("f0c5"),c=Object(o["a"])(r["default"],u["b"],u["c"],!1,null,"2a5dc234",null,!1,u["a"],i);e["default"]=c.exports},"5b15":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=a(n("a34a")),r=a(n("91ad"));function a(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,u,r,a,i){try{var o=t[a](i),c=o.value}catch(d){return void n(d)}o.done?e(c):Promise.resolve(c).then(u,r)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(u,r){var a=t.apply(e,n);function o(t){i(a,u,r,o,c,"next",t)}function c(t){i(a,u,r,o,c,"throw",t)}o(void 0)}))}}var c={name:"u-tabbar",mixins:[t.$u.mpMixin,t.$u.mixin,r.default],data:function(){return{placeholderHeight:0}},computed:{tabbarStyle:function(){var e={zIndex:this.zIndex};return t.$u.deepMerge(e,t.$u.addStyle(this.customStyle))},updateChild:function(){return[this.value,this.activeColor,this.inactiveColor]},updatePlaceholder:function(){return[this.fixed,this.placeholder]}},watch:{updateChild:function(){this.updateChildren()},updatePlaceholder:function(){this.setPlaceholderHeight()}},created:function(){this.children=[]},mounted:function(){this.setPlaceholderHeight()},methods:{updateChildren:function(){this.children.length&&this.children.map((function(t){return t.updateFromParent()}))},setPlaceholderHeight:function(){var e=this;return o(u.default.mark((function n(){return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.fixed&&e.placeholder){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,t.$u.sleep(20);case 4:e.$uGetRect(".u-tabbar__content").then((function(t){var n=t.height,u=void 0===n?50:n;e.placeholderHeight=u}));case 5:case"end":return n.stop()}}),n)})))()}}};e.default=c}).call(this,n("543d")["default"])},"8da5":function(t,e,n){"use strict";var u=n("98a2"),r=n.n(u);r.a},"98a2":function(t,e,n){},f6d8:function(t,e,n){"use strict";n.r(e);var u=n("5b15"),r=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-tabbar/u-tabbar-create-component',
    {
        'uni_modules/uview-ui/components/u-tabbar/u-tabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("57d1"))
        })
    },
    [['uni_modules/uview-ui/components/u-tabbar/u-tabbar-create-component']]
]);

(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-text/u-text"],{"0583":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"4493"))},uLink:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-link/u-link")]).then(n.bind(null,"ea45"))}},u=function(){var e=this,t=e.$createElement,n=(e._self._c,e.show&&"price"===e.mode?e.__get_style([e.valueStyle]):null),i=e.show&&e.prefixIcon?e.$u.addStyle(e.iconStyle):null,u=e.show&&"link"!==e.mode&&e.openType&&e.isMp?e.__get_style([e.valueStyle]):null,o=!e.show||"link"===e.mode||e.openType&&e.isMp?null:e.__get_style([e.valueStyle]),l=e.show&&e.suffixIcon?e.$u.addStyle(e.iconStyle):null;e.$mp.data=Object.assign({},{$root:{s0:n,g0:i,s1:u,s2:o,g1:l}})},o=[]},"56f0":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=s(n("716d")),u=s(n("6e32")),o=s(n("ed46")),l=s(n("c958"));function s(e){return e&&e.__esModule?e:{default:e}}var r={name:"u--text",mixins:[e.$u.mpMixin,e.$u.mixin,i.default,u.default,o.default,l.default],computed:{valueStyle:function(){var t={textDecoration:this.decoration,fontWeight:this.bold?"bold":"normal",wordWrap:this.wordWrap,fontSize:e.$u.addUnit(this.size)};return!this.type&&(t.color=this.color),this.isNvue&&this.lines&&(t.lines=this.lines),this.lineHeight&&(t.lineHeight=e.$u.addUnit(this.lineHeight)),!this.isNvue&&this.block&&(t.display="block"),e.$u.deepMerge(t,e.$u.addStyle(this.customStyle))},isNvue:function(){var e=!1;return e},isMp:function(){var e=!1;return e=!0,e}},data:function(){return{}},methods:{clickHandler:function(){this.call&&"phone"===this.mode&&e.$u.test.mobile(this.text)&&e.makePhoneCall({phoneNumber:this.text}),this.$emit("click")}}};t.default=r}).call(this,n("543d")["default"])},"5b93":function(e,t,n){},6957:function(e,t,n){"use strict";n.r(t);var i=n("56f0"),u=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=u.a},e7f0:function(e,t,n){"use strict";var i=n("5b93"),u=n.n(i);u.a},f1c4:function(e,t,n){"use strict";n.r(t);var i=n("0583"),u=n("6957");for(var o in u)"default"!==o&&function(e){n.d(t,e,(function(){return u[e]}))}(o);n("e7f0");var l,s=n("f0c5"),r=Object(s["a"])(u["default"],i["b"],i["c"],!1,null,"4387f918",null,!1,i["a"],l);t["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-text/u-text-create-component',
    {
        'uni_modules/uview-ui/components/u-text/u-text-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f1c4"))
        })
    },
    [['uni_modules/uview-ui/components/u-text/u-text-create-component']]
]);
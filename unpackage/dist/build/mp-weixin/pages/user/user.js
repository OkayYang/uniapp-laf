(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"22a9":function(t,n,e){"use strict";var o=e("41bb"),i=e.n(o);i.a},3771:function(t,n,e){"use strict";e.r(n);var o=e("41b2"),i=e("cab2");for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("22a9");var s,a=e("f0c5"),r=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=r.exports},"41b2":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var o={uAvatar:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(e.bind(null,"bfc9"))},uButton:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-button/u-button")]).then(e.bind(null,"612d"))},uGrid:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-grid/u-grid")]).then(e.bind(null,"ad91"))},uGridItem:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-grid-item/u-grid-item")]).then(e.bind(null,"7fa5"))},uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"c73b"))},uToast:function(){return e.e("uni_modules/uview-ui/components/u-toast/u-toast").then(e.bind(null,"243f"))},uModal:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(e.bind(null,"1a89"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.baseList,(function(n,e){var o=t.__get_orig(n),i={paddingTop:"20rpx"};return{$orig:o,a0:i}})));t.$mp.data=Object.assign({},{$root:{l0:e}})},u=[]},"41bb":function(t,n,e){},"6ded":function(t,n,e){"use strict";(function(t){e("8dfe");o(e("66fd"));var n=o(e("3771"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},b7b8:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(e("c84c"));function i(t){return t&&t.__esModule?t:{default:t}}var u={name:"user",data:function(){return{isLogin:!1,src:"/static/avatar.png",nickName:"",notify:{show:!1,content:"是否退出登录？",title:"警告"},baseList:[{name:"/static/love.png",title:"我的订阅",url:"/pages/subscribe/subscribe"},{name:"/static/message.png",title:"我的消息",url:"/pages/message/message"},{name:"/static/output.png",title:"我的发布",url:"/pages/myPublish/myPublish?id=1"},{name:"/static/claim.png",title:"我的认领",url:"/pages/myPublish/myPublish?id=4"}],itemList:[{title:"个人信息",icon:"/static/personInfo.png",url:"/pages/personal/personal",show:!1,now:!1,open:""},{title:"绑定教务",icon:"/static/bind.png",url:"/pages/school/school",show:!1,now:!1,open:""},{title:"联系客服",icon:"/static/aboutMe.png",url:"#",show:!0,now:!0,open:"contact"},{title:"反馈与投诉",icon:"/static/help.png",url:"#",show:!0,now:!1,open:"feedback"},{title:"分享小程序",icon:"/static/share.png",url:"#",show:!0,now:!0,open:"share"},{title:"打赏开发者",icon:"/static/gift.png",url:"#",show:!0,now:!1,open:""}]}},onLoad:function(){var n=this;t.getStorage({key:"userInfo",success:function(t){n.isLogin=!0,n.src=t.data.stuImage,n.nickName=t.data.stuNick,n.itemList[0].show=!0,n.itemList[1].show=!0}})},onShow:function(){t.showTabBar(),this.onChange()},methods:{login:function(){var n=this;this.isLogin||t.getUserProfile({desc:"展示用户信息",success:function(e){console.log(e),t.login({success:function(i){n.itemList[0].show=!0,n.itemList[1].show=!0,o.default.postRequest("/wx/api/login/check",{code:i.code,nickName:e.userInfo.nickName,gender:e.userInfo.gender,avatarUrl:e.userInfo.avatarUrl},(function(e){console.log(e),n.isLogin=!0,n.src=e.data.userInfo.stuImage,n.nickName=e.data.userInfo.stuNick,t.showToast({title:"登录成功!",duration:1e3})}),(function(n){t.showToast({icon:"error",title:"登陆失败!",duration:1e3})}))}})}})},exit:function(){this.notify.show=!0},confirm:function(){this.notify.show=!1,this.itemList[0].show=!1,this.itemList[1].show=!1;var n=this;t.removeStorage({key:"userInfo"}),t.removeStorage({key:"token",success:function(){t.showToast({title:"已退出登录!",duration:1e3}),n.isLogin=!1,n.src="/static/avatar.png",n.itemList[0].show=!1,n.itemList[1].show=!1},fail:function(){t.showToast({icon:"error",title:"退出失败!",duration:1e3})}})},cancel:function(){this.notify.show=!1},itemClick:function(n){this.isLogin?t.navigateTo({url:n}):this.$refs.uToast.show({type:"error",message:"请先登陆!",iconUrl:"https://cdn.uviewui.com/uview/demo/toast/error.png"})},onChange:function(){var n=this;o.default.getRequest("/wx/api/student/auth/my",{},(function(e){console.log(e),t.setStorage({key:"userInfo",data:e.data}),n.nickName=e.data.stuNick}))},open:function(t){wx.navigateTo({url:t})}}};n.default=u}).call(this,e("543d")["default"])},cab2:function(t,n,e){"use strict";e.r(n);var o=e("b7b8"),i=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=i.a}},[["6ded","common/runtime","common/vendor"]]]);
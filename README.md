# uniapp-laf 江理失物招领用户界面

##项目部署
HBuilder+微信开发者工具
  ~~~
  1.npm install
  ~~~
  2.配置好HBuilder的运行配置（微信开发者工具的启动路径)
  
  3.发行到微信小程序
  4.最后把微信原生开发中的文件直接拖到项目的\unpackage\dist\build\mp-weixin下即可



## 1.前言

  江理失物招领用户页面采用微信小程序原生开发+uniapp混合式开发开发微信小程序.

## 2.小程序演示
  ![微信小程序](https://laf.ywenrou.cn/img/user/tiezi/xcxonline.jpg)
  
  ![首页](https://laf.ywenrou.cn/img/user/tiezi/index.jpg)![发布](https://laf.ywenrou.cn/img/user/tiezi/middle.jpg)
  
  ![用户](https://laf.ywenrou.cn/img/user/tiezi/user.jpg)![个人](https://laf.ywenrou.cn/img/user/tiezi/info.jpg)
  
  ![订阅](https://laf.ywenrou.cn/img/user/tiezi/push.jpg)![表单](https://laf.ywenrou.cn/img/user/tiezi/publish.jpg)
  
  ![详细](https://laf.ywenrou.cn/img/user/tiezi/detail.jpg)
## 3.所用技术 

1. Vue2.0
2. Vuex
3. ES6
4. webpack
5. Node.js
6. 第三方SDK 百度OCR识别
7. uVIew
8. thorui

## 4.项目目录介绍

~~~
├─App.vue  
├─index.html	//主页面
├─main.js		//初始化vue实例并使用需要的插件
├─manifest.json	  //环境设置
├─package-lock.json	//包信息
├─pages.json   //路由页面
├─README.md	
├─t.txt
├─test.txt
├─uni.scss 
│      
├─components
│  ├─ren-dropdown-filter    //下拉框组件
│  │      ren-dropdown-filter.vue
│  │      
│  ├─thorui 	//thorui组件库
│  │          
│  │                  
├─node_modules npm   //加载的项目依赖模块
│  │                 
├─pages 			//页面
│  ├─detail
│  │      detail.vue 		//帖子页面
│  │      
│  ├─form
│  │      form.vue			//失物招领、寻物启示表单页面
│  │      
│  ├─index
│  │      index.vue			 //首页页面
│  │      
│  │      
│  ├─myPublish
│  │      myPublish.vue 	 //我的发布页面
│  │    
│  │      
│  ├─personal
│  │      personal.vue	//个人信息页面
│  │      
│  ├─public
│  │      public.vue	//发布页面
│  │      
│  ├─subscribe
│  │      subscribe.vue //订阅页面    
│  │      
│  ├─user
│  │      user.vue 	   //用户页面
│  │      	
│  └─word
│          word.vue   //用户条款
│          
├─static	静态文件
│  
│          
├─store
│      index.js      //页面路径           
└─utils		
        formatTime.js		//格式化时间函数
        jinrishici.js		//动态获取诗词函数
        request.js			//封装request请求函数，过滤请求，需要认证的需要带上本地token
~~~

## 5.项目介绍

   用户可以发布自己丢失或找寻到物品的帖子
   如果是身份证或者学生证则会将上面的信息自动打码，并且信息自动填充
   发布帖子成功后，其他用户可以对该帖子进行评论，认领。
   用户还可以订阅某件物品，若有其他用户发布了你订阅的相关
   物品，小程序会自动提醒你去查看该物品是否是你丢的，方便
   用户不用时时查看小程序，减少不必要的时间。

## 6.功能介绍  

 ### 登陆界面

 采用微信授权登陆
 用户不登录可以使用的功能包括联系客服,反馈与投诉，分享小程序，打赏开发者

 ### 首页

 寻物启示和失物招领的信息全部在这里，用户可以使用搜索框搜索自己想寻找的物品
 或者使用类型查找，目前支持(时间查找，物品类别查找，是否解决查找，帖子种类查找)

 ### 详细界面

 详细界面是用户所发布的帖子的具体的信息，帖子显示了浏览次数，物品种类，校区，联系方式，地点
 等信息，用户可以在这个页面进行转发，认领，评论操作，但是必须登陆才可以进行这些操作，未登陆用户只可以对帖子进行浏览。

 ### 发布界面

 发布界面包括每日诗词，失物招领，寻物启示，服务推送功能，这些功能也必须要登陆才可以进行操作

 ### 失物招领/寻物启示界面

 用户可以选择是否上传照片，如果是身份证或者学生证则会将上面的信息自动打码，自动根据信息填充表单，方便用户
 
 ### 订阅信息

 用户可以订阅一些物品关键字，例如学生卡，张某某。当发布信息中包含该关键字将会自动推送消息
 
 ### 消息通知

 用户可以查看系统消息和收到别人的信息回复（开发中）
 ### 我的发布
 用户可以查看自己发布，认领，进行删除操作
 
 ### 我的信息
 用户可以修改查看个人信息，绑定教务（开发中）
 
 ### 

import WxParse from '../../wxParse/wxParse.js';
import request from '../../utils/request';
import Toast from '../../wxcomponents/vant/toast/toast';
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    news:null,
    isReady:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
    let url = '/wx/api/article/week'
    if(options.id!=null){
        url = url+"?id="+options.id;

    }
    Toast({
      type: 'loading',
      message: '加载中...',
      forbidClick: true,
      duration:2000,
    });
    request.getRequest(url,{},
    (res)=>{
      Toast.clear();
      if(res.data.code==0){
        console.log(res.data.object)
        WxParse.wxParse('article', 'html', res.data.object.content, this, 0);
        this.setData({
          news:res.data.object,
          isReady:true
        })
      }
    },
    (error)=>{
      Toast.clear();
    }
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
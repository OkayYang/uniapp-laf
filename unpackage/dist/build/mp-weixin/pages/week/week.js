import request from '../../utils/request'
import Toast from '../../wxcomponents/vant/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    steps:null,
    isReady:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Toast({
        type: 'loading',
        message: '加载中...',
        forbidClick: true,
        duration:2000,
      });
      let array=[];
    request.getRequest('/wx/api/article/list',{},
    (res)=>{
        console.log(res)

        for (let index = 0; index < res.data.length; index++) {
            array.push({
                'text':res.data[index].createTime,
                'desc':res.data[index].title,
                'id' : res.data[index].id
            })   
        }
       
        this.setData({
            steps:array,
            isReady:true
        })
        Toast.clear();

    },
    (error)=>{
        Toast.clear();
    }
    )
  },
  onClick(event){
      let id = event.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/news/news?id=' +id,
    })
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
    
  },
  
  
})
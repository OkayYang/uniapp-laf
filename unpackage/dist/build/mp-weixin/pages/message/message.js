// pages/massage/massage.js
import request from '../../utils/request'
import Toast from '../../wxcomponents/vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isReady:false,
        active: 0,
        systemNotice:[],
        userNotice:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //加载公告
        request.getRequest("/wx/api/announce/list",null,
        (res)=>{
            console.log(res)
            this.setData({
                systemNotice:res.data,
                //isReady:true,
            })
            Toast({
                type: 'loading',
                message: '加载中...',
                forbidClick: true,
                duration:800,
                onClose: () => {
                    this.setData({
                        isReady:true,
                    })
                },
              });
        
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
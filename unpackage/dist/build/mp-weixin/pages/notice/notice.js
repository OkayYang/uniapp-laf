// pages/notice/notice.js
import request from '../../utils/request';
import Toast from '../../wxcomponents/vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isReady:false,
        artical:null,
        loading:true

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let sid = options.sid;
        let url1 = '/wx/api/announce/detail?sid='+sid;
        let url2 = '/wx/api/announce/skim?sid='+sid;
        request.getRequest(url1,
            {},
            (res)=>{
                this.setData({
                    artical:res.data
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
        );
        request.getRequest(url2)
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
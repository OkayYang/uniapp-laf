// pages/massage/massage.js
import request from '../../utils/request'
import Toast from '../../wxcomponents/vant/toast/toast';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:0,
        isLogin:false,
        nickName: null,
        isReady: false,
        flag1:false,
        flag2:false,
        active: 0,
        pageNum:1,
        isFirstPage:true,
        isEnd:false,
        systemNotice: [],
        userNotice: [],
        host:request.getHost(),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                this.setData({
                    nickName: res.data.stuNick,
                    isLogin:true
                })
            }
        })
        Toast({
            type: 'loading',
            message: '加载中...',
            forbidClick: true,
            duration: 0,
        });
        //加载公告
        request.getRequest("/wx/api/announce/list", null,
            (res) => {
                this.setData({
                    systemNotice: res.data,
                    flag1:true,
                })
                if(this.data.flag1&&this.data.flag2){
                    Toast.clear();
                    this.setData({
                        isReady:true
                    })
                }
            },
            (error)=>{
                Toast.fail("网络异常")
            }
        )

        request.getRequest("/wx/api/announce/auth/msg?pageNum="+this.data.pageNum+"&pageSize="+5, null,
        (res) => {
            this.setData({
                userNotice: res.data.list,
                isEnd:res.data.isLastPage,
                isFirstPage:res.data.isFirstPage,
                flag2:true
            })
            if(this.data.flag1&&this.data.flag2){
                Toast.clear();
                this.setData({
                    isReady:true
                })
            }
        },
        (error)=>{
            Toast.fail("网络异常")
        }
    )

        

    },
    onReachBottom() {
        if(this.data.index==1){
            if(!this.data.isEnd){
                Toast({
                    type: 'loading',
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0,
                });
                this.setData({
                    pageNum:this.data.pageNum+1
                })
                request.getRequest("/wx/api/announce/auth/msg?pageNum="+this.data.pageNum+"&pageSize=5", null,
                (res) => {
                    //console.log(...res.data.list);
                    this.setData({
                        userNotice:this.data.userNotice.concat(...res.data.list),
                        isEnd:res.data.isLastPage,
                        isFirstPage:res.data.isFirstPage
                    })
                    Toast.clear();
                },
                (error)=>{
                    Toast.fail("网络异常")
                }
            )
            }
            
        }
        
        
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
  

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    watchTieZi(event) {
        console.log(event.currentTarget.dataset.tid);
        wx.navigateTo({
            url: '/pages/detail/detail?tid=' + event.currentTarget.dataset.tid,
        })
    },
    onChange(event) {
        this.setData({
            index:event.detail.index
        })
      },
   
})

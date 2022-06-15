// pages/publish_all/publish_all.js
import request from '../../utils/request'
import Toast from '../../wxcomponents/vant/toast/toast';
import Dialog from '../../wxcomponents/vant/dialog/dialog';
import Notify from '../../wxcomponents/vant/notify/notify';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isReady: false,
        flag1:false,
        flag2:false,
        flag2:false,
        index:0,
        baseUrl:request.getHost(),
        value:null,
        shiwu:[],
        zhaoling:[],
        successlist:[],

    },
    /**
     * 用户搜索
     */
    onSearch(event) {
        console.log(event);
      },
    /**
     * 标签切换
     */
    onChange(event) {
        this.setData({
            index:event.detail.name
        })
    },
    /**
     * 重新获取数据
     */
    refresh(id){
        switch(id){
            case '0':
                request.getRequest("/wx/api/release/auth/publish",
                {
                    id:"1"
                },
                (res)=>{
                    let array = res.data.rows
                    this.setData({
                        shiwu:array,
                        flag1:true,
                    })
                    if(this.data.flag1&&this.data.flag2&&this.data.flag3){
                        Toast.clear();
                        this.setData({
                            isReady:true
                        })
                    }
                },
                (error)=>{
                    Toast.fail('网络开小差了');
                }
                );
                break;
            case '1':
                    request.getRequest("/wx/api/release/auth/publish",
                    {
                        id:"2"
                    },
                    (res)=>{
                        let array = res.data.rows
                        this.setData({
                            zhaoling:array,
                            flag2:true,
                        })
                        if(this.data.flag1&&this.data.flag2&&this.data.flag3){
                            Toast.clear();
                            this.setData({
                                isReady:true
                            })
                        }
                    },
                    (error)=>{
                        Toast.fail('网络开小差了');
                    }
                    );
                    break;
            case '2':
                        request.getRequest("/wx/api/release/auth/publish",
                        {
                            id:"4"
                        },
                        (res)=>{
                            let array = res.data.rows
                            this.setData({
                                successlist:array,
                                flag3:true
                            })
                            if(this.data.flag1&&this.data.flag2&&this.data.flag3){
                                Toast.clear();
                                this.setData({
                                    isReady:true
                                })
                            }
                        },
                        (error)=>{
                            Toast.fail('网络开小差了');
                        }
                        );
                        break;
        }

            

    },
    /**
     * 点击列表
     * @param {*} event 
     */
    clickCard(event){
        if(event.detail=='cell'){
            const tid = event.currentTarget.dataset.relid;
            wx.navigateTo({
                url: '/pages/detail/detail?tid='+tid,
                success: function(res) {
                  // 通过eventChannel向被打开页面传送数据
                  res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
                },
                fail:()=>{
                    Notify({ type: 'danger', message: '网络开小差~~~',duration: 1000, });
                }
              })
        }
    },
    /**
     * 删除 
     */
    onClose(event) {
        console.log(event)
        const { position, instance } = event.detail;
        const tid = event.currentTarget.dataset.relid;
        const index = event.currentTarget.dataset.index;
        console.log(index)
        if("right"==position){
            Dialog.confirm({
                message: '确定删除吗？',
              }).then(() => {
                  request.getRequest("/wx/api/release/auth/delete",
                  {
                    id:tid
                  },
                  
                  (res)=>{
                    if(res.data.code==0){
                        Notify({ type: 'success', message: '删除成功',duration: 1000, });
                        // 重新列表
                        this.onLoad()
                    }else{
                        Notify({ type: 'danger', message: '系统开小差了~~',duration: 1000, });
                    }
                   
                    
                  },
                  (error)=>{
                    Notify({ type: 'danger', message: '删除失败,请检查下网络',duration: 1000, });
                  }

                  )
               
              })
        }
        instance.close();
       
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options!=undefined){
            if(options.id==4){
                this.setData({
                    index:2
                })
            }
        }
        
        
        Toast({
            type: 'loading',
            message: '加载中...',
            forbidClick: true,
            duration: 0,
        });
        this.refresh('0');
        this.refresh('1');
        this.refresh('2');
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
        wx.showNavigationBarLoading()
        wx.stopPullDownRefresh({
        success: (res) => {
            this.onLoad()
            wx.hideNavigationBarLoading()
        },
        })

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
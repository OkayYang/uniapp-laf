<template>

	<view class="square">
		<view class="header" style="margin-top: 20rpx;width: 700rpx; margin: 20rpx auto;height: 165rpx;">

			<u-search placeholder="请输入搜索内容" v-model="msg" shape="round" bgColor="#f4f4f4" :showAction="false" @search="onSearch">
			</u-search>
			<ren-dropdown-filter :filterData='filterData' :defaultIndex='defaultIndex' @onSelected='onSelected'
				@dateCauseList='dateCauseList'>
			</ren-dropdown-filter>
		</view>

		<view v-for="info in releaseList">
			<view class="item"
				style="box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.1), 0 0rpx 5rpx 0 rgba(0, 0, 0, 0.19);width: 720rpx;margin:0 auto"
				@click='navigateDetail(info.relId)'>
				<view class="item-header" style="display: flex;margin: 30rpx 0 0 0;">
					<view @click.stop="previewImage(info.stuAvatar)" style="margin:28rpx 0 0 15rpx ;">
						<u-avatar :src="info.stuAvatar" size="30"></u-avatar>
					</view>
					<view class="info" style="display: flex;flex-direction: column;">
						<view style="margin: 22rpx 0 0 20rpx;">
							<b style="font-size: 25rpx;">{{info.stuNick}}</b>
						</view>
						<view style="margin: 0 0 0 20rpx;">
							<text style="font-size: 25rpx;color:#909399">{{info.createTime}}</text>
						</view>
					</view>
					<view class="tag"
						style="width:370rpx;display: flex; align-items:flex-end;justify-content: space-around">
						<view style="margin: 0 0 0 30rpx;width: 155rpx;">
							<u-tag shape="circle" :text="info.relStatus==1?'失物招领':'寻物启事'"
								:type="info.relStatus==1?'primary':'warning'" ></u-tag>
						</view>
						<view style="margin: 0 0 0 0rpx;">
							<u-tag shape="circle" :type="info.relFlag==1?'error':'success'"
								:text="info.relFlag==1?'待解决':'已解决'" ></u-tag>
						</view>
					</view>
				</view>
				<view class="detail" style="display: flex;height: 200rpx;">
					<image :src="baseUrl+info.relImage"
						style="height:170rpx;width: 170rpx;border-radius: 30rpx;margin:20rpx 0 10rpx 20rpx;"
						mode="aspectFill" @click.stop="previewImage(baseUrl+info.relImage)" />
					<view class="content" style="margin: 20rpx 0 0 50rpx;">
						<view style="display: flex;">
							<text style="color:#909399;margin: 5rpx 0 0 0;font-size: 27rpx; ">物品种类：</text>
							<view>
								<u-tag :text="category[info.relCateId]" plain size="mini"></u-tag>
							</view>
						</view>
						<view style="display: flex;margin: 5rpx 0 0 0;">
							<view style="width: 85rpx;">
								<text style="color: #909399;font-size: 28rpx;flex-basis: 0;">标题：</text>
							</view>
							<view>
								<text style="font-size: 27rpx;">{{info.relTitle|ellipsis}}</text>
							</view>
						</view>
						<view style="display: flex;margin: 8rpx 0 0 0;">
							<view style="width: 85rpx;">
								<text style="color: #909399;font-size: 27rpx;">描述：</text>
							</view>
							<view>
								<text style="font-size: 27rpx;">{{info.relDesc| ellipsis}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	// import data from '../../static/json/list.json'
	export default {
		name: 'square',
		filters: {
			ellipsis(value) {
				if (!value) return ''
				if (value.length > 15) {
					return value.slice(0, 15) + '...'
				}
				return value
			}
		},
		// onLoad() {
		// 	// let that=this;
		// 	// uni.request({
		// 	// 	url: '/static/json/list.json',
		// 	// 	success: (res) => {
		// 	// 		that.infos=res.data.infos;

		// 	// 		// console.log("success");
		// 	// 	}
		// 	// })
		// 	request.postRequest('/wx/api/release/list?pageNum=1&pageSize=1',
		// 		{},
		// 		(open)=>{
		// 			console.log(open);
		// 		}


		// 	)

		// 	this.filterInfos('全部', '全部类型', '待解决');

		// },
		data() {
			return {
				msg: '',
				filterData: [
					[{
						text: '所有发布',
						value: '0'
					}, {
						text: '失物招领',
						value: '1'
					}, {
						text: '寻物启事',
						value: '2'
					}],
					[{
							text: '待解决',
							value: '1',
						},
						{
							text: '已解决',
							value: '2'
						}, {
							text: '全部状态',
							value: '0',
						}
					],

					[{
						text: '所有种类',
						value: '0',
					}, ],

				],
				defaultIndex: [0, 0, 0],
				selectInfos: [],
				type: '全部',
				species: '全部类型',
				status: '待解决',
				baseUrl: request.getHost(),
				userInfo: {},
				notice: '在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准',
				searchValue: '',
				isLastPage: false,
				pageNum: 1,
				pageSize: 5,
				isEnd: false,
				releaseList: [],
				lafRelease: {
					relTitle: null,
					relDesc: null,
					relCateId: null,
					relCampus: null,
					relStatus: null,
					relFlag: null,
					createTime: null
				},
				category: [],

			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function() {
			console.log('onLoad');
			this.onLoadClone3389();
			
		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			console.log('onready');


		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {

			console.log('onshow'); //页面刷新显示发布列表请求

		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			uni.showNavigationBarLoading();
			uni.stopPullDownRefresh({
				success: (res) => {
					this.onLoadClone3389({});
					uni.hideNavigationBarLoading();
				}
			});
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {

			// 最后一页了，取消下拉功能
			if (this.isLastPage) {

				this.isEnd = true;

				return;
			}
			uni.showToast({
				icon: 'loading',
				title: '加载中...',
				duration: 300,
				success: () => {
					this.loadRelease();
				}
			})


		},

		
		methods: {
			test: function() {

			},
			share: function() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},

			// changeLove: function(info) {
			// 	if (info.isLove !== true) {
			// 		uni.showToast({
			// 			title: '收藏成功!',
			// 			duration: 1000
			// 		});
			// 	}
			// 	info.isLove = !info.isLove;
			// },
			onSelected(res) {
				this.initSearchData();
				console.log(res);
				if (res[0][0].value == 0) {
					this.lafRelease.relStatus = null;
				} else {
					this.lafRelease.relStatus = res[0][0].value;
				}
				if (res[1][0].value == 0) {
					this.lafRelease.relFlag = null;
				} else {
					this.lafRelease.relFlag = res[1][0].value;
				}
				if (res[2][0].value == 0) {
					this.lafRelease.relCateId = null;
				} else {
					this.lafRelease.relCateId = res[2][0].value;
				}
				this.loadRelease();
			},


			navigateDetail(tid) {
				uni.navigateTo({
					url: "/pages/detail/detail?tid=" + tid,
				});
			},
			previewImage(src) {
				uni.previewImage({
					urls: [src],
				})
			},


			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoadClone3389: function() {
				this.initSearchData();
				request.getRequest('/wx/api/announce/list', null, (res) => {
					this.notice = res.data.annContent
				});

				request.getRequest('/wx/api/category/treeData', null, (res) => {
					let option = [];
					res.data.forEach((element) => {
						option.push({
							text: element.name,
							value: element.id
						});
					});
					this.filterData[2].push(...option);
					this.filterData[2].forEach((item) => {
						this.category.push(item.text);
					});
					this.loadRelease();

				});
				console.log("!!!!");

			},

			initSearchData() {

				this.isEnd = false;
				this.isLastPage = false;
				this.pageNum = 1;
				this.pageSize = 5;
				this.releaseList = [];

			},

			loadRelease() {
				if (this.isLastPage == false) {
					request.postRequest(
						'/wx/api/release/list?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize,
						this.lafRelease,
						(res) => {
							// console.log(res);

							if (res.data.code == 500) {
								console.log('服务器开小差');
								// Toast.fail('服务器开小差');
							} else {
								let array = this.releaseList.concat(res.data.list);
								this.releaseList = array;
								this.isLastPage = res.data.isLastPage;
								this.pageNum = res.data.nextPage;
							}
						},
						(res) => {
							console.log('网络拥挤');
						}
					);
				}
			},

			

			onSearch(res) {
				let out = res.replace(/\ +/g, "")
				if(out==''){
					this.msg = '';
					this.initSearchData();
					this.lafRelease.relTitle = null;
					this.loadRelease();
				}else{
					console.log(res)
					this.initSearchData();
					this.lafRelease.relTitle = res;
					this.loadRelease();
				}
				
				
				
				//console.log(res)
				
				//console.log('搜索' + this.searchValue);
			},

			

			//下拉事件
			//失物招领筛选


			showinfo(res) {
				let id = res.currentTarget.dataset.info.relId;
				console.log(id);
				uni.navigateTo({
					url: '/pages/list_detail/list_detail?id=' + id,
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						acceptDataFromOpenedPage: function(data) {
							console.log(data);
						},
						someEvent: function(data) {
							console.log(data);
						}
					},
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: 'test'
						});
					}
				});
			},
			dateCauseList(res) {
				this.initSearchData();
				if (res === '选择日期') {
					this.lafRelease.createTime = null;
				} else {
					this.lafRelease.createTime = res + " 00:00:00";
				}
				this.loadRelease();

			},







		}

	}
</script>

<style>
	page {

		width: 100%;
		background-color: #ffffff;
		min-height: 100%;

	}
</style>

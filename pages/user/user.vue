<template>
	<view>
		<!-- <view class='avatar'
			style="width:720rpx;margin: 50rpx auto;box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.1), 0 0rpx 5rpx 0 rgba(0, 0, 0, 0.19);overflow: hidden;background-color: #FFFFFF;border-radius: 20rpx">
			
		</view> -->
		<view style="width: 100%;height: 300rpx;overflow: hidden;position: relative;top:0">
			<view
				style="width: 800rpx;height: 800rpx;border-radius: 800rpx;background:#449bf8;position: absolute;top:-370rpx;left:-26rpx;display: flex;justify-content: center;align-items: center;">
				<view class='userInfo' @click="login"
					style="height:270rpx;margin: 250rpx 0 0 0;display:flex;flex-direction:column;justify-content: flex-end;align-items: center;">
					<view class="avatar">
						<u-avatar :src="src" size="70"></u-avatar>
					</view>

					<view class='name'
						style="height: 90rpx;margin: 25rpx 0 0 0;display: flex;justify-content: center;">
						<u-button v-if="!isLogin" shape="circle" text="请先登录" style="width: 200rpx;"></u-button>
						<text v-else>{{nickName}}</text>
					</view>
				</view>
				<!-- <view style="display: flex;justify-content: center;margin: 20rpx 0 0 0 ;">
					<text>{{nickName}}</text>
					
				</view> -->
			</view>
		</view>
		<view class='item'
			style="width:720rpx;margin: 30rpx auto;box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.1), 0 0rpx 5rpx 0 rgba(0, 0, 0, 0.19);overflow: hidden;background-color: #FFFFFF;border-radius: 20rpx;">
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="itemClick(baseListItem.url)">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="baseListItem.name" :size="22"></u-icon>
					<text class="grid-text" style="font-size: 30rpx;margin: 10rpx 0 5rpx;">{{baseListItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class='list' style="width:720rpx;margin: 30rpx auto;border-radius: 20rpx;background-color: #FFFFFF;">
			<view v-for="item in itemList">
				<button type="default" plain=true :open-type='item.open'
					style="border: none;height: 100rpx;font-size: 30rpx;display: flex;align-items: center;"
					@click='open(item.url)' v-show="item.show">
					<image :src='item.icon' mode="aspectFit" style="width: 55rpx;height:55rpx;float: left;"></image>
					<text style="float: left;margin-left: 40rpx;">{{item.title}}</text>
					<view class="rightArrow"></view>
					<!--右箭头 -->
				</button>
				<view class="underline"></view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<view v-if='isLogin' class="exit" style="width: 95%;margin: 0 auto 100rpx;">
			<u-button type="error" size="large" text="退出登录" @click="exit" plain></u-button>
		</view>

		<u-modal :title="notify.title" :show="notify.show" @confirm="confirm" @cancel="cancel" ref="uModal"
			:showCancelButton="true" :content="notify.content" :zoom="false"></u-modal>
	</view>
</template>

<script>
	import request from '@/utils/request.js';
	export default {
		name: 'user',
		data() {
			return {
				isLogin: false,
				src: '/static/avatar.png',
				nickName: '',
				notify: {
					show: false,
					content: '是否退出登录？',
					title: '警告',
				},
				baseList: [{
						name: '/static/love.png',
						title: '我的订阅',
						url: '/pages/subscribe/subscribe'
					},
					{
						name: '/static/message.png',
						title: '我的消息',
						url: '/pages/message/message'
					},
					{
						name: '/static/output.png',
						title: '我的发布',
						url: '/pages/myPublish/myPublish?id=1'
					},

					{
						name: '/static/claim.png',
						title: '我的认领',
						url: '/pages/myPublish/myPublish?id=4'
					},
				],
				itemList: [{
						title: '个人信息',
						icon: '/static/personInfo.png',
						url: '/pages/personal/personal',
						show: false,
						now: false,
						open: ''
					},
					{
						title: '绑定教务',
						icon: '/static/bind.png',
						url: '/pages/school/school',
						show: false,
						now: false,
						open: ''
					},
					{
						title: '联系客服',
						icon: '/static/aboutMe.png',
						url: '#',
						show: true,
						now: true,
						open: 'contact'
					},
					{
						title: '反馈与投诉',
						icon: '/static/help.png',
						url: '#',
						show: true,
						now: false,
						open: 'feedback'
					},
					{
						title: '分享小程序',
						icon: '/static/share.png',
						url: '#',
						show: true,
						now: true,
						open: 'share'
					},
					{
						title: '打赏开发者',
						icon: '/static/gift.png',
						url: '#',
						show: true,
						now: false,
						open: ''
					},
				]

			}
		},

		onLoad() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.isLogin = true;
					this.src = res.data.stuImage;
					this.nickName = res.data.stuNick;
					this.itemList[0].show = true
					this.itemList[1].show = true
				}
			});
		},
		onShow() {
			uni.showTabBar();
			this.onChange();

		},
		methods: {
			// show() {
			// 	if (this.nickName != '') {
			// 		this.itemList[0].show = true
			// 		this.itemList[1].show = true
			// 	}
			// },
			login() {
				let that = this;

				if (!this.isLogin) {
					uni.getUserProfile({
						desc: '展示用户信息',
						// 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (file) => {
							console.log(file);
							uni.login({
								success: (res) => {
									that.itemList[0].show = true
									that.itemList[1].show = true
									request.postRequest(
										'/wx/api/login/check', {
											code: res.code,
											nickName: file.userInfo.nickName,
											gender: file.userInfo.gender,
											avatarUrl: file.userInfo.avatarUrl
										},
										(open) => {
											console.log(open);
											that.isLogin = true;
											that.src = open.data.userInfo.stuImage;
											that.nickName = open.data.userInfo.stuNick;
											uni.showToast({
												title: '登录成功!',
												duration: 1000
											});
										},
										(error) => {
											uni.showToast({
												icon: "error",
												title: '登陆失败!',
												duration: 1000
											});
										}
									)
								},
							});

						}

					});
				}

			},
			exit() {
				this.notify.show = true;
			},

			confirm() {
				this.notify.show = false;
				this.itemList[0].show = false
				this.itemList[1].show = false
				let that = this;
				uni.removeStorage({
						key: "userInfo"
					}),
					uni.removeStorage({
						key: "token",
						success() {
							uni.showToast({
								title: '已退出登录!',
								duration: 1000
							});
							that.isLogin = false;
							that.src = '/static/avatar.png';
							that.itemList[0].show = false
							that.itemList[1].show = false
						},
						fail() {
							uni.showToast({
								icon: "error",
								title: '退出失败!',
								duration: 1000
							});
						}
					})


			},
			cancel() {
				this.notify.show = false;
			},
			itemClick(url) {
				if (this.isLogin) {
					uni.navigateTo({
						url: url,
					})
				} else {
					this.$refs.uToast.show({
						type: 'error',
						message: "请先登陆!",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					});
				}

			},
			onChange() {
				let that = this
				request.getRequest('/wx/api/student/auth/my', {},
					(res) => {
						console.log(res)
						uni.setStorage({
							key: 'userInfo',
							data: res.data
						})
						that.nickName = res.data.stuNick;
					}

				)
			},
			open(url) {
				wx.navigateTo({
					url: url
				});
			}

		},


	}
</script>

<style>
	page {
		background-color: #f6f7fa;

	}

	.u-cell__title-text {
		margin: 0 0 0 30rpx;
	}

	button {
		background-color: #FFFFFF;
	}

	button::after {
		border: none;

	}

	button::after {
		border: 0;
	}

	button[disabled] {
		background-color: #FFFFFF;
		color: #FFFFFF;
	}

	.button-hover {
		color: rgba(0, 0, 0, 0.6);
		background-color: #f3f3f3;
	}

	.rightArrow {
		width: 19rpx;
		height: 19rpx;
		border-top: 1.5px solid #999;
		border-right: 1.5px solid #999;
		transform: rotate(45deg);
		margin-left: auto;
	}

	.underline {
		border: 4rpx solid rgb(241, 242, 244);
		width: 99%;
	}
</style>

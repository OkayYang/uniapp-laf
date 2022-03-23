<template>
	<view class="public01">

		<!-- 这里是发布 -->

		<view class="text" style="margin-top: 20rpx;">


			<view style="width: 100%; height: 100rpx;">
				<view style="font-size: 80rpx;float: left;margin-right: 30rpx; ">
					{{day01}}
				</view>
				<view style="float: left;font-size: 30rpx;margin-top:15rpx ;color: grey;">
					{{month01}}
					<br>
					{{year01}}
				</view>
				<view style="float: right;margin-top:30rpx ;font-size: 30rpx;color: grey;">
					{{week01}}
				</view>
			</view>




			<view class="blur">
				<view class="poem" style="width: 580rpx;  margin: auto;margin-top: 100rpx;">
					世之奇伟、瑰怪、非常之观，常在于险远。
				</view>
				<view class="info" style="text-align: center;  margin: auto;margin: 20rpx 0 100rpx;">[宋] 王安石</view>

			</view>
		</view>



		<view class="btn">
			<u-grid :border="false">
				<u-grid-item v-for="(item,index) in choose" :key="index">
					<!-- <u-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.src" :size="60" @click="jump(item.url)"></u-icon> -->
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="item.src" :size="60" @click="present(item.url)">
					</u-icon>
					<text class="grid-text" style="font-size: 25rpx;margin-top: 10rpx;">{{item.name}}</text>
				</u-grid-item>
			</u-grid>
		</view>



		<view class="img" style="position: absolute;top: 88%;left: 50%;margin-left:-25rpx ;">
			<image src="../../static/closePage.png" mode="" @click="close" style="width: 50rpx;height: 50rpx;display: block;"></image>
		</view>


		<tui-modal :show="loginPane.show" custom>
			<view class="tui-modal-custom">

				<view class="tui-modal-custom-text" style="display: flex;justify-content: center;margin: 0 0 20rpx 0;">
					<text style="color: #606266;font-size: 30rpx;">您还未登陆，请先登录!</text>
				</view>
				<view style="display: flex;justify-content: center;">
					<view class="alert" style="margin: 0 30rpx 0 0;">
						<tui-button height="72rpx" :size="28" type="danger" shape="circle" @click="loginPane.show=false"
							:plain="true">取消</tui-button>
					</view>
					<view class="alert" style="margin: 0 0 0 30rpx;">
						<tui-button height="72rpx" :size="28" type="danger" shape="circle" @click="login()">登陆
						</tui-button>
					</view>
				</view>
			</view>
		</tui-modal>


	</view>

</template>

<script>
	import request from '@/utils/request.js';
	import tuiModal from "@/components/thorui/tui-modal/tui-modal"
	export default {
		components: {
			tuiModal,
		},
		data() {
			return {
				choose: [{
						'src': require('@/static/lostandfound.png'),
						'name': '失物招领',
						'url': '../form/form?type=1'
					}, {
						'src': require('@/static/searchthing.png'),
						'name': '寻物启事',
						'url': '../form/form?type=2'
					},
					{
						'src': require('@/static/messagePush.png'),
						'name': '服务推送'
					},
				],
				week01: '',
				year01: '',
				month01: '',
				day01: '',
				info: null,
				author: {
					"uid": null,
				},
				loginPane: {
					show: false,
				},

			}
		},


		onLoad() {
			this.reload();
			var time = this.getTime();
			console.log(time + 'hhhhhhhh');
			var that = this;

			setInterval(function() {
				that.getTime();

			}, 1000);

		},
		onShow() {
			this.author.uid = null;
			this.reload();
			uni.hideTabBar();
		},
		onHide() {
			uni.showTabBar();
		},


		methods: {
			jump(url) {
				wx.navigateTo({
					url: url
				})
			},
			close() {
				wx.switchTab({
					url: '../index/index' //因为我的是本目录，路径就是这样，把路径写对就能实现跳转了
				})
			},


			getTime: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

				this.year01 = year;
				var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
					'October', 'November', 'December'
				];
				for (var i = 1; i <= months.length; i++) {
					if (month == i) {
						month = months[i - 1];
					}
				}
				this.month01 = month;
				this.day01 = day;
				var h = date.getDay();
				var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', ];
				this.week01 = week[h];
			},


			reload() {
				if (this.author.uid == null) {
					uni.getStorage({
						key: 'userInfo',
						success: (res) => {
							this.author.uid = res.data.stuId;
						}
					});
				}

			},
			login() {
				this.loginPane.show = false;
				wx.switchTab({
					url: '../user/user',
				})
			},
			present(url) {
				if (this.author.uid != null) {
					this.loginPane.show = false;
					this.jump(url);
					console.log("已登录成功");
				} else {
					this.loginPane.show = true;
					console.log("请先登录")
				}
			}

		},




	}
</script>

<style lang="scss" scoped>
	.text {
		width: 650rpx;
		height: 350rpx;
		margin: auto;
	}

	.btn {
			position: fixed;
			bottom: 250rpx;
			display: flex;
			justify-content: center;
			width: 100%;
		}

	.blur {
		position: absolute;
		top: 20%;
		width: 35%;
		min-height: 170rpx;
		min-width: 650rpx;
		max-width: 200rpx;
		background: hsla(0, 0%, 100%, 0.3);
		border-radius: 50rpx 50rpx;
		box-shadow: 10rpx 10rpx 5rpx #d0d1d2;

	}



	.alert {
		width: 250rpx;
	}

	.public01 {}
</style>

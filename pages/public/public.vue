<template>
	<view class="public01">
		<view class="text">

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
				<view style="margin-top:-25rpx;margin-bottom: 15rpx;">
					<image src="../../static/present.png" mode="" style="width: 50rpx;height: 50rpx;margin-left: 5%; margin-right:10rpx ;margin-bottom:-8rpx ;"></image>
					每日诗词
				</view>
				<view style="border:1rpx solid rgba(230,225,215,0.8);width: 90%;margin: auto;margin-bottom: 60rpx;"></view>
				<view class="poem">
					{{content}}
				</view>
			
			</view>
		</view>



		<view class="btn">
			<u-grid :border="false">
				<u-grid-item v-for="(item,index) in choose" :key="index">
					<view class="icon">
						<u-icon  :name="item.src" :size="40" @click="present(item.url)">
						</u-icon>
					</view>
					<text class="grid-text" style="font-size: 25rpx;margin-top: 20rpx;">{{item.name}}</text>
				</u-grid-item>
			</u-grid>
		</view>



		<view class="img">
			<image src="/static/closePage.png" mode="" @click="close"
				style="width: 50rpx;height: 50rpx;margin-left: 25rpx;"></image>
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
	const jinrishici = require('../../utils/jinrishici.js')
	import request from '@/utils/request.js';
	import tuiModal from "@/components/thorui/tui-modal/tui-modal"
	export default {
		components: {
			tuiModal,
		},
		data() {
			return {
				choose: [{
						'src': '/static/lost.png',
						'name': '失物招领',
						'url': '../form/form?type=1'
					}, {
						'src': '/static/found.png',
						'name': '寻物启事',
						'url': '../form/form?type=2'
					},
					{
						'src': '/static/notice.png',
						'name': '关键字订阅',
						//'url':'#'
						'url':'../subscribtion/subscribtion'
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
				content:''

			}
		},

// onLaunch(){
// 	 uni.hideTabBar({})
// },
		onLoad() {
			this.reload();
			var time = this.getTime();
			console.log(time + 'hhhhhhhh');
			var that = this;

			setInterval(function() {
				that.getTime();

			}, 1000);
			jinrishici.load(result => {
			  // 下面是处理逻辑示例
			  console.log(result)
			  let data = result.data
			  console.log(data.content)
			  this.content=data.content
			})
		},
	
		onShow() {
			this.author.uid = null;
			this.reload();
			uni.hideTabBar({});
		
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

	.blur {
		margin-top: 120rpx;
		padding: 50rpx 0rpx;
		position: absolute;
		min-height: 150rpx;
		width: 650rpx;
		background: hsla(0, 0%, 100%, 0.3);
		border-radius: 40rpx;
		box-shadow: 10rpx 10rpx 5rpx #d0d1d2;
		height:200rpx;
	}

	.poem {
		width: 600rpx;
		position: absolute;
		left: 30rpx;
	}

	.info {
		position: absolute;
		bottom: 20%;
		width: 650rpx;
		margin: auto;
	}

	.alert {
		width: 250rpx;
	}

	.img {
		display: flex;
		align-items: center;
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		bottom: 50rpx;
		left: 50%;
		margin-left: -50rpx;
		margin-top: 150rpx;
		background: linear-gradient(225deg, rgba(230,230,230,.8), rgba(255,255,255,.6));
		border-radius: 60rpx;
		box-shadow: -10px 10px 44px rgb(204,204,204),
			12px -12px 44px rgb(255,255,255);
	}

	.public01 {
		width: 100%;	
			height: 1000rpx;
	}


	.btn {
		width: 100%;
		position: absolute;
		bottom: 300rpx;
	}

	.icon {
		// width: 120rpx;
		// height: 120rpx;
		// border-radius: 50%;
		// box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.8),
		// inset 18px 18px 30px rgba(0, 0, 0, 0.1),
		// inset -18px -18px 30px rgba(255, 255, 255, 1);
		
		display: flex;
		align-items: center;
		margin-top: 650rpx;
		transition: all 0.2s easy-out;
	}

	

</style>
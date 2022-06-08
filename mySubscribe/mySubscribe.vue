<template>

	<!-- 第一层首页 -->
	<view class="first" v-show="button_show">



		<!-- 添加 /银河系-->
		<view class="circle" style="display:flex;justify-content:center;">
			<view class="out">
				<view class="breath-light">
					<view class="centerblue center">

					</view>
					<view class="centerblue2 center">

					</view>
					<view class="centerblue1 center">
					</view>
				</view>
			</view>
			<image src="../../static/subscribtion/提示.png" mode="aspectFit"
				style="width:100rpx;position:absolute;left:50%;	transform: translate(-50%, 50%);opacity: border-radius:50%;"
				@click='open_tip'>
			</image>
		</view>

		<view class="">
			<image src="../../static/subscribtion/星星.png" mode="aspectFit"
				style="width:150rpx;position:absolute;top:100rpx;left:100rpx" @click='open_box'
				:class="{'text1':isActive[0]}"></image>
			<image src="../../static/subscribtion/太阳.png" mode="aspectFit"
				style="width:200rpx;position:absolute;top:400rpx;left:20rpx" class="  " @click='open_box'
				:class="{'text1':isActive[1]}"></image>
			<image src="../../static/subscribtion/彗星.png" mode="aspectFit"
				style="width:150rpx;position:absolute;top:-50rpx;left:500rpx" class="  " @click='open_box'
				:class="{'text1':isActive[2]}"></image>
			<image src="../../static/subscribtion/土星.png" mode="aspectFit"
				style="width:150rpx;position:absolute;top:400rpx;left:550rpx" class="  " @click='open_box'
				:class="{'text1':isActive[3]}">
			</image>
			<image src="../../static/subscribtion/旗帜.png" mode="aspectFit"
				style="width:150rpx;position:absolute;top:600rpx;left:300rpx" class="  " @click='open_box'
				:class="{'text1':isActive[4]}">
			</image>

			<view :class="{'text1':!isActive[0]}" style="width:150rpx;position:absolute;top:350rpx;left:100rpx;">
				<view class="container" @click="opendetail(0)">
					{{datas[0].keyword[0]}}
				</view>
			</view>
			<view :class="{'text2':!isActive[1]}" style="width:200rpx;position:absolute;top:600rpx;left:20rpx">
				<view class="container" @click="opendetail(1)">
					{{datas[1].keyword[0]}}
				</view>
			</view>
			<view :class="{'text3':!isActive[2]}" style="width:150rpx;position:absolute;top:250rpx;left:500rpx">
				<view class="container" @click="opendetail(2)">
					{{datas[2].keyword[0]}}
				</view>
			</view>
			<view :class="{'text4':!isActive[3]}" style="width:150rpx;position:absolute;top:650rpx;left:550rpx">
				<view class="container" @click="opendetail(3)">
					{{datas[3].keyword[0]}}
				</view>
			</view>
			<view :class="{'text5':!isActive[4]}" style="width:150rpx;position:absolute;top:900rpx;left:300rpx">
				<view class="container" @click="opendetail(4)">
					{{datas[4].keyword[0]}}
				</view>
			</view>
		</view>

		<!-- <view>
			<button @click="openAll">所有关键字订阅</button>
		</view> -->

		<!-- 弹窗详细信息 -->
		<u-popup :show="showdetail" @close="closedetail" mode="center" round=10>

			<view style="width: 600rpx;height: 800rpx;position:relative;">
				<view style="text-align:center" class="box_text">
					标题
				</view>
				<view
					style="border:1px solid rgba(222, 218, 208, 0.8);width:80%;height:100rpx;margin:auto;padding:10rpx 0 0 20rpx;margin-top:10rpx;background-color:white;overflow-y:auto;border-radius:20rpx;">
					{{describeDetail}}
				</view>
				<view style="text-align:center" class="box_text">关键字</view>
				<view class=""
					style="width:80%;height:37%;border:1px solid rgba(222, 218, 208, 0.8);margin:auto;padding-left:20rpx;background-color:white;overflow-y:auto;border-radius:20rpx;">
					<view v-for="(item,index) in keywordDetail" style="text-align:center">
						<view class="" style="margin-top:5rpx">
							{{item}}
						</view>
					</view>
				</view>

				<button type="default" @click="delectPush()" class="btn"
					style="width:400rpx;height:80rpx;line-height:80rpx;font-size:40rpx;position:absolute;bottom:50rpx;left:50%;transform:translate(-50%)">删除此推送
				</button>
			</view>

		</u-popup>

		<!-- 点击照片出现的弹窗 -->
		<u-popup :show="imageShow" @close="close_box" mode="center" round=20 closeable=true>
			<view style="width: 600rpx;height: 220rpx;position:relative;">
				<view style="width: 550rpx;height: 220rpx;position:absolute;top:100rpx;left:30rpx">
					您还没有在这个位置添加订阅哦
				</view>
			</view>
		</u-popup>

		<!-- 点击中间的灯出现的弹窗 -->
		<u-popup :show="tipShow" @close="close_tip" mode="center" round=20 closeable=true>
			<view style="width: 600rpx;height: 250rpx;position:relative;">
				<view style="width: 550rpx;height: 250rpx;position:absolute;top:100rpx;left:40rpx">
					点击关键字可看到详细信息和并进行信息管理哦！
				</view>
			</view>
		</u-popup>


	</view>



</template>

<script>
	import request from '@/utils/request.js';
	export default {

		data() {
			return {
				datas: [],
				data_formInput: {
					keyword: [], //关键字  
					title: '', //描述
					index: null,
					pushId: null
				},
				show_title: '',
				show: false,
				box_show: false,
				button_show: true,
				isActive: [false, false, false, false, false],

				// openObj: [],
				showdetail: false,
				describeDetail: '',
				keywordDetail: '',
				obj: '',
				allDatas: [],
				pushId: null,
				imageShow: false, //点击照片出现的提示
				tipShow: false,
			}
		},
		mounted() {
			request.getRequest('/wx/api/push/auth/list', null, (res) => {
				let option = [];
				console.log(res.data)
				let str = res.data.rows.slice(0, 6);
				for (let item in str) {

					option.push({
						title: str[item].pushTitle,
						keyword: str[item].pushClue.split(";"),
						pushId: str[item].pushId
					});


				}
				this.datas.push(...option);
				for (let key in this.datas) {
					this.isActive[key] = true;

				}

				let optionAll = []
				let strAll = res.data.rows
				for (let item in strAll) {
					if (strAll[item].pushTitle != "" && strAll[item].pushClue != "") {
						optionAll.push({
							title: strAll[item].pushTitle,
							keyword: strAll[item].pushClue.split(";")
						});
					}
				}
				this.allDatas.push(...optionAll);

			})
			// this.selIndex = this.defaultIndex;
			// this.keepStatus();
			// this.selDate = getCurDateTime().formatDate;
		},
		methods: {

			opendetail(num) {
				this.showdetail = true;
				this.obj = this.datas[num];
				this.describeDetail = this.obj.title;
				this.keywordDetail = this.obj.keyword;
				this.pushId = this.obj.pushId;
				console.log(this.describeDetail)
				console.log(this.obj)
				this.data_formInput.index = num
			},
			closedetail() {
				this.showdetail = false
			},



			// 删除推送
			delectPush() {
				this.isActive[this.data_formInput.index] = false
				this.showdetail = false
				request.getRequest('/wx/api/push/auth/del', {
					pid: this.pushId
				}, (success) => {}, (error) => {})
			},

			open_box() {
				this.imageShow = true
			},

			close_box() {
				this.imageShow = false
			},


			open_tip() {
				this.tipShow = true
			},
			close_tip() {
				this.tipShow = false
			}





		}

	}
</script>

<style scoped>
	/* 显示页的样式 */
	.first {
		position: relative;

		width: 100%;
		min-height: 2000rpx;
		background: url(https://pic.imgdb.cn/item/627aab8d0947543129e4c300.jpg) repeat center;
		background-size: cover;
		overflow: hidden;
	}


	.circle {
		position: absolute;
		left: 50%;
		transform: translate(-50%);

	}

	.out {
		position: relative;
		left: 50%;
		transform: translateX(-50%) translateY(40%);
		border: 313rpx solid;
		background-color: #00c1de;
		opacity: 0.7;
		-moz-box-shadow: 0px 0px 20px #00c1de;
		-webkit-box-shadow: 0px 0px 20px #00c1de;
		box-shadow: 0px 0px 20px #00c1de;
		border-radius: 400rpx;
	}


	.breath-light {
		width: 0px;
		height: 0px;
		border: 200rpx solid;
		position: absolute;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		background-color: #00c1de;
		opacity: 0.7;
		-moz-box-shadow: 0px 0px 20rpx #00c1de;
		-webkit-box-shadow: 0px 0px 20rpx #00c1de;
		box-shadow: 0px 0px 20rpx #00c1de;
		border-radius: 200rpx;
	}

	/* 添加页的样式 */
	.box_text {
		text-align: center;
		border: solid 1px rgba(230, 225, 215, 0.8);
		width: 200rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin: 20rpx auto;
		border-radius: 60rpx;
	}


	.btn {
		width: 83%;
		height: 100rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 0 rgba(227, 236, 237, 0.2), 0 0 0 rgba(255, 255, 255, 0.8);
		cursor: pointer;
		border: none;
		transition: 0.3s ease;
	}

	.center {
		position: absolute;
		transform: translate(-50%, -50%);
		border-radius: 50%;
	}

	.centerblue2 {


		width: 200rpx;
		height: 200rpx;
		background: #a6afc8;
		opacity: 0.2;
		animation: breath1 1s ease 1s infinite alternate; // 呼吸动画实现
	}

	.centerblue {


		width: 140rpx;
		height: 140rpx;
		background: #6e72c8;
		opacity: 0.2;
		animation: breath1 1s ease 1s infinite alternate; // 呼吸动画实现
	}

	.centerblue1 {
		width: 60rpx;
		height: 60rpx;
		background: #7f0fff;
		opacity: 1;
		animation: breath1 1s ease 1s infinite alternate; // 呼吸动画实现
	}

	@keyframes breath1 {

		// 关键帧规则
		0% {
			opacity: 0.2;
		}

		100% {
			opacity: 0;
		}
	}


	.text1 {
		display: none;
	}

	.text2 {
		display: none;
	}

	.text3 {
		display: none;
	}

	.text4 {
		display: none;
	}

	.text5 {
		display: none;
	}


	.container {
		min-width: 200rpx;
		min-height: 80rpx;
		/* border: 1px solid rgb(255, 255, 255); */
		border: 1px solid rgb(230, 230, 230);
		color: white;
		text-align: center;
		line-height: 80rpx;
		border-radius: 20rpx;
		background-color: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(rpx);
		box-shadow: 0 0 10px #333;
	}
</style>

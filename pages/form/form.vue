<template>
	<view class="main">
		<!-- 失物招领 -->
		<view class="form">
			<!-- <view >
			      <u-notice-bar :text="navbar" style="width: 100%;" bgColor="#ecf9ff" speed ="0"></u-notice-bar>
			    </view> -->
			<view class="head">
				<!-- <view class="bgcard">
					<view class="card">
						<view class="indentityCard"> -->
				<view class="identityCard_front" style="">
					<image src="https://pic.imgdb.cn/item/62240bb65baa1a80abf3b97a.png" class="images"
						style="margin: auto;width: 250rpx;display: block;" mode='widthFix'></image>
					<view class="imgs"
						style="text-align: center;font-size: 27rpx;color:#121415;margin: -20rpx 0 50rpx;">[上传图片]
						<!-- 		</view>
							</view>
						</view> -->
					</view>
				</view>

			</view>


			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">



				<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="类 别:"
					prop="userInfo.sort" borderBottom @click="showSort = true" ref="item1" labelWidth="120rpx">
					<u--input v-model="model1.userInfo.sort" disabled disabledColor="#f5f5f5" placeholder=" 请选择物品类别"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>

				<u-action-sheet :show="showSort" :actions="sortActions" title="请选择类别" description="请选择类别"
					@close="showSort = false" @select="sortSelect">
				</u-action-sheet>




				<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="校 区:"
					prop="userInfo.campus" borderBottom @click="showCampus = true" ref="item1" labelWidth="120rpx">
					<u--input v-model="model1.userInfo.campus" disabled disabledColor="#f5f5f5" placeholder=" 请选择校区"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>

				<u-action-sheet :show="showCampus" :actions="actions" title="请选择校区" description="请选择校区"
					@close="showCampus = false" @select="campusSelect">
				</u-action-sheet>
				<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="标 题:"
					prop="userInfo.title" borderBottom ref="item1" labelWidth="120rpx">
					<u--input v-model="model1.userInfo.title" border="none" placeholder=" 如:丢失一卡通"></u--input>
				</u-form-item>


				<u-form-item label="内 容:" borderBottom ref="item1" labelWidth="120rpx">
					<u--textarea v-model="value3" placeholder="请输入内容" autoHeight style="background-color: #F7F8FA;">
					</u--textarea>
				</u-form-item>


				<u-form-item :label="rel_status==1?'领 取 地 点:':'丢 失 地 点:'" borderBottom ref="item1" labelWidth="200rpx">
					<u--input v-model="model1.userInfo.clue" border="none" placeholder=" 失物大概丢失地"></u--input>
				</u-form-item>

				<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="联 系 方 式:"
					prop="userInfo.contact" borderBottom ref="item1" labelWidth="200rpx">
					<u--input v-model="model1.userInfo.contact" border="none" placeholder=" QQ/电话等"></u--input>
				</u-form-item>

				<view style="margin-top: 50rpx; ">
					<u-button :custom-style="submitBtnStyle" @click="submit" :ripple="true" ripple-bg-color="#909399"
						size="large" color="#07c160">
						提 &nbsp;&nbsp;交
					</u-button>
				</view>

			</u--form>




		</view>

	</view>


</template>

<script>
	import request from '@/utils/request.js';
	export default {
		data() {
			return {
				rel_status: null,
				navbar: null,
				showCampus: false,
				model1: {
					userInfo: {
						name: '',
						campus: '',
					},
				},
				showSort: false,
				model1: {
					userInfo: {
						name: '',
						sort: '',
					},
				},
				actions: [{
						name: '南昌校区',
					},
					{
						name: '红旗校区',
					},
					{
						name: '黄金校区',
					},
				],
				sortActions: [{
						name: '校园卡',
					},
					{
						name: '身份证',
					},
					{
						name: '其他',
					},
				],
				submitBtnStyle: {
					width: '100%',
					margin: 'auto',
					borderRadius: ' 10rpx 10rpx',
				},

				rules: {
					'userInfo.sort': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择失物类别',
						trigger: ['blur', 'change']
					},
					'userInfo.campus': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择校区',
						trigger: ['blur', 'change']
					},
					'userInfo.title': {
						type: 'string',
						required: true,
						message: '请填写失物',
						trigger: ['blur', 'change']
					},
					'userInfo.contact': {
						type: 'string',
						required: true,
						message: '请填写联系方式',
						trigger: ['blur', 'change']
					},

				},
				radio: '',
				switchVal: false,
				value3: ''
			};
		},
		onLoad: function(options) {
			// request.postRequest('/wx/api/release/auth/add/check', {
			// 			"relCampus": "南昌校区", //校区
			// 			"relCateId": 2, //类别的value
			// 			"relContact": "1", //联系方式
			// 			"relDesc": "sdsadasd", //内容
			// 			"relImage": "/img/user/tiezi/wDEbmeeRgTWMc6f76911d74279584875503a867e7d4f.png", //upload返回的image
			// 			"relSatus": "1", //进入页面的type值
			// 			"relTitle": "1", //标题
			// 		},
			// 		(success) => {
			// 			console.log("success");
			// 			console.log(success);
			
			// 		},
			// 		(error) => {
						
			// 			console.log("error");
			// 			console.log(error);
			// 		}
			// 	);
			
			this.onLoadClone3389(options)
		},
		methods: {
			onLoadClone3389: function(options) {
				let that = this;
				//option列表
				request.getRequest('/wx/api/category/treeData', null, (res) => {
					let option = [];
					res.data.forEach((element) => {
						option.push({
							name: element.name,
							value: element.id
						});
					});
					this.sortActions = option;
				});
				let type = options.type;

				if (type == 1) {

					this.navbar = '发布一条失物招领';
					this.rel_status = type

				} else {
					if (type == 2) {

						this.navbar = '发布一条寻物启事';
						this.rel_status = type

					} else {
						uni.showToast({
							title: '非法访问!',
							icon: "error",
							duration: 1000,
							success: function() {
								uni.switchTab({
									url: '../index/index'
								})
							}
						});
					}
				}
			},



			campusSelect(e) {
				this.model1.userInfo.campus = e.name
				// this.$refs.form1.validateField('userInfo.campus')
			},
			sortSelect(e) {
				this.model1.userInfo.sort = e.name
				// this.$refs.form1.validateField('userInfo.campus')
			},
			add() {
				request.postRequest('/wx/api/release/auth/add/check', {
						"relCampus": "南昌校区", //校区
						"relCateId": 2, //类别的value
						"relContact": "1", //联系方式
						"relDesc": "sdsadasd", //内容
						"relImage": "/img/user/tiezi/wDEbmeeRgTWMc6f76911d74279584875503a867e7d4f.png", //upload返回的image
						"relSatus": "1", //进入页面的type值
						"relTitle": "1", //标题
					},
					(success) => {
						console.log(success);

					},
					(error) => {
						console.log(error);
					}
				)
			}

		},
	};
</script>
<style scoped>
	.form {
		width: 92%;
		margin: auto;

	}

	.u-input /deep/ .input-placeholder {
		color: red;
	}

	.head {
		margin: 0;
	}


	.bgcard {
		position: relative;
		margin: auto;
		display: flex;
		width: 96%;
		height: 40%;
		justify-content: center;
		background: url(https://pic.imgdb.cn/item/622348ad5baa1a80ab787abd.png) no-repeat fixed center;
		background-size: 670rpx;
		background-position: 40% 1%;
		border-radius: 50rpx;
	}

	.card {
		width: 100%;
		height: 100%;
		/* margin: 50rpx 0; */
		/*设置阴影*/
		box-shadow: 15rpx 15rpx 20rpx rgba(0, 0, 0, 0.3);
		/*设置圆角*/
		border-radius: 50rpx;
		/*设置上边界和左边界亮纹，使card有一种层次感*/
		border-top: 1px solid rgba(255, 0, 0, 0.5);
		border-left: 1px solid rgba(255, 0, 0, 0.5);

		/*设置背景样式*/
		background: rgba(255, 0, 0, 0.1);
		/*让透过card的底部元素模糊化,达到毛玻璃效果*/
		backdrop-filter: blur(5rpx);
	}

	page {
		height: 100%;
		background-color: #f5f5f5;
	}
</style>

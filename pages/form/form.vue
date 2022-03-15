<template>
	<view class="main">
		<!-- 失物招领 -->
		<view class="form">
			<view>
				<u-notice-bar :text="navbar" style="width: 100%;" bgColor="#ededed" color="#a7b2ef" speed="0">
				</u-notice-bar>
			</view>
			<view class="head">
				<!-- <view class="bgcard">
					<view class="card">
						<view class="indentityCard"> -->
				<view class="identityCard_front" style="">
					<!-- <image src="https://pic.imgdb.cn/item/62240bb65baa1a80abf3b97a.png" class="images"
						style="margin: auto;width: 250rpx;display: block;" mode='widthFix' @click="chooseImage()"
						@afterRead="afterRead()" @delete="deletePic()"></image>
						<image :src="photoUrl" mode=""></image> -->

					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
						:previewFullImage="true" width="210rpx" height="210rpx">
					</u-upload>
				</view>
				<view class="imgs" style="text-align: center;font-size: 27rpx;color:#121415;margin: -20rpx 0 50rpx;">
					[上传图片]
					<!--</view>
							</view>
						</view> -->
				</view>
			</view>

		</view>


		<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1" bindsubmit="submit">
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
				<u--textarea v-model="value3" placeholder="请输入内容" autoHeight style="background-color: #F5F5F5;">
				</u--textarea>
			</u-form-item>


			<u-form-item :label="rel_status==1?'领 取 地 点:':'丢 失 地 点:'" borderBottom ref="item1" labelWidth="200rpx">
				<u--input v-model="model1.userInfo.clue" border="none" placeholder=" 失物大概丢失地"></u--input>
			</u-form-item>

			<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="联 系 方 式:"
				prop="userInfo.contact" borderBottom ref="item1" labelWidth="200rpx">
				<u--input v-model="model1.userInfo.contact" border="none" placeholder=" QQ/电话等" bin></u--input>
			</u-form-item>

			<view style="margin-top: 50rpx; ">
				<u-button :ripple="true" ripple-bg-color="#909399" size="large" color="#07c160" @click="postForm()">
					提 &nbsp;&nbsp;交
				</u-button>
			</view>

			<u-toast ref="uToast"></u-toast>

		</u--form>

	</view>
	</view>


</template>

<script>
	import request from '@/utils/request.js';
	export default {
		data() {
			return {
				baseUrl: request.getHost(),
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
						value: ''
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
						name: '学生证',

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
				value3: '',
				photoUrl: null,
				fileList1: [],
				name: '',
				type: '',
				campusText: '',
				id: '',

			};
		},
		onLoad: function(options) {
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
				this.model1.userInfo.value = e.value
				console.log(e.name)
				console.log(e.value)
				// this.$refs.form1.validateField('userInfo.campus')
			},


			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})

				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}

			},


			uploadFilePromise(url) {

				return new Promise((resolve, reject) => {
					var that = this
					let a = uni.uploadFile({
						url: that.baseUrl + '/wx/api/release/upload',
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
							console.log(res)
							let data = res.data
							// console.log(data)
							// console.log(JSON.parse(data).name)
							that.name = JSON.parse(data).name;
							that.type = JSON.parse(data).type;
							that.number = JSON.parse(data).number;
							that.photoUrl = JSON.parse(data).photoUrl;
							console.log(that.type)
							if (that.type == 'sfz') {
								var strcard = that.number.replace(/^(.{4})(?:\d+)(.{4})$/,
									"$1******$2");
								that.model1.userInfo.title = '捡到' + this.name + '的身份证'
								that.value3 = '身份证号为' + strcard;
								that.model1.userInfo.sort = "身份证"
								that.model1.userInfo.value = 2

								console.log('捡到身份证')
							} else if (that.type == 'xsz') {
								var strcard = that.number.replace(/^(.{2})(?:\d+)(.{2})$/,
									"$1******$2");
								that.model1.userInfo.title = '捡到' + this.name + '的学生证'
								that.value3 = '学生证号为' + strcard;
								that.model1.userInfo.sort = "学生证"
								that.model1.userInfo.value = 3
							}
							console.log(that.type);
						}
					});
				})
			},


			postForm() {
				request.postRequest('/wx/api/release/auth/add/check', {
						relCampus: this.model1.userInfo.campus,
						relCateId: this.model1.userInfo.value,
						relContact: this.model1.userInfo.contact,
						relDesc: this.value3,
						relImage: this.photoUrl,
						relStatus: this.rel_status,
						relTitle: this.model1.userInfo.title,
						createPlace: this.model1.userInfo.clue,
					},
					(res) => {
						if (res.data.code == 0) {
							uni.switchTab({
									url: '../index/index',
									success() {
										var page = getCurrentPages().pop();
										if (page == undefined || page == null) return;
										page.onLoad();
									}
							})
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: "发布失败!",
							iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						});
					}
				}


			)
		},



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

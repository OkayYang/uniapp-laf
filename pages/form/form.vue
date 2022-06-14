<template>
	<view class="main">
		<!-- 失物招领 -->

		<view class="head" style="height: 300rpx;">
			<view class="identityCard_front" style="margin-left: 270rpx;margin-top: 75rpx;">
				<!-- //照片下来100rpx,对应的原来占位的图就要上去100rpx -->
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="1" :previewFullImage="true" width="210rpx" height="210rpx" >
						<image src="../../static/camera.png" mode="widthFix"
							style="width: 350rpx;height: 350rpx;margin:auto;margin-left: -70rpx;margin-top: -85rpx;display:block">
						</image>
						<view style="position:absolute;top:270rpx;font-size:35rpx;color:grey;margin:auto;margin-left:25rpx">[上传照片]</view>
					
			
				</u-upload>
			</view>

		</view>



		<view style="width: 85%;margin: auto;">


			<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1" bindsubmit="submit">

				<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="类 别:" borderBottom
					@click="showSort = true" labelWidth="120rpx" prop="userInfo.sort">
					<u--input v-model="model1.userInfo.sort" disabled disabledColor="#f5f5f5" placeholder=" 请选择物品类别"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-action-sheet :show="showSort" :actions="sortActions" title="请选择类别" description="请选择类别"
					@close="showSort = false" @select="sortSelect">
				</u-action-sheet>

				<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="校 区:"
					borderBottom @click="showCampus = true" labelWidth="120rpx">
					<u--input v-model="model1.userInfo.campus" disabled disabledColor="#f5f5f5" placeholder=" 南昌校区"
						border="none" prop="userInfo.campus"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>

				<u-action-sheet :show="showCampus" :actions="actions" title="请选择校区" description="请选择校区"
					@close="showCampus = false" @select="campusSelect">
				</u-action-sheet>
				<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="标 题:"
					prop="userInfo.title" borderBottom labelWidth="120rpx">
					<u--input v-model="model1.userInfo.title" border="none" placeholder=" 如:丢失一卡通"></u--input>
				</u-form-item>


				<u-form-item label="内 容:" borderBottom labelWidth="120rpx">
					<u--textarea v-model="value3" placeholder="请输入内容" autoHeight style="background-color: #F5F5F5;">
					</u--textarea>
				</u-form-item>


				<u-form-item :label="rel_status==1?'领 取 地 点:':'丢 失 地 点:'" borderBottom labelWidth="200rpx">
					<u--input v-model="model1.userInfo.clue" border="none" placeholder=" 失物大概丢失地"></u--input>
				</u-form-item>

				<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="联 系 方 式:"
					prop="userInfo.contact" borderBottom labelWidth="200rpx">
					<u--input v-model="model1.userInfo.contact" border="none" placeholder=" QQ/电话等" bin></u--input>
				</u-form-item>


				<view style="font-size: 30rpx;margin-top: 30rpx;color: grey;" :class="{'move':isActive}">

					<radio :checked="check" style="transform:scale(.6) translateY(-5rpx) ;" color='#449bf8'
						@click='changeRadio' />
					已阅读并同意<text style='color:#449bf8' @click="openWord">江理失物招领小程序隐私保护指引</text>

				</view>

				<view style="margin-top: 100rpx; ">
					<button class="btn" style="width: 500rpx;height: 100rpx;" @click="postForm()">发
						&nbsp;&nbsp;&nbsp;布</button>
				</view>

			</u--form>
			<tui-loading text="发布中..." v-if="isRequest"></tui-loading>
			<u-toast ref="uToast"></u-toast>
			<u-overlay :show="mask" :opacity="0.3"></u-overlay>


		</view>
	</view>



	</view>





</template>

<script>
	import tuiLoading from "@/components/thorui/tui-loading/tui-loading"
	import request from '@/utils/request.js';
	export default {
		components: {
			tuiLoading
		},
		data() {
			return {
				apiHost: request.getHost(),
				err: true,
				mask: false,
				isShow: true,
				isRequest: false,
				rel_status: null,
				navbar: null,
				showCampus: false,
				showSort: false,
				model1: {
					userInfo: {
						name: null,
						campus: null,

						value: null,
						contact: null,
						title: null
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
				// submitBtnStyle: {
				// 	width: '50%',
				// 	margin: 'auto',
				// 	borderRadius: ' 50rpx 50rpx',
				// },
				submitBtnStyle: {
					width: '100%',
					margin: 'auto',
					borderRadius: ' 10rpx 10rpx',
				},

				rules: {
					'userInfo.sort': {
						type: 'string',
						// max: 1,
						// required: true,
						// message: '请选择失物类别',
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
				value3: null,
				photoUrl: null,
				fileList1: [],
				name: '',
				type: '',
				campusText: null,
				id: '',
				status: '',
				thumb: '',
				check: false,
				isActive: false,
			};
		},
		onLoad: function(options) {

			this.onLoadClone3389(options)
		},
		methods: {
			onLoadClone3389: function(options) {
				let type = options.type;
				
				if (type == 1) {
					uni.setNavigationBarTitle({
						title: "失物招领"
					})
				
					this.navbar = '发布一条失物招领';
					this.rel_status = type
				
				} else {
					if (type == 2) {
						uni.setNavigationBarTitle({
							title: "寻物启事"
						})
				
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


				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						
						let msg = null;
						
						let qq = res.data.stuQq;
						let tel = res.data.stuEmail;
						if(qq.replace(/\ +/g, "")==''){
							qq =null;
						}
						if(tel.replace(/\ +/g, "")==''){
							tel =null;
						}

						if (qq != null && tel == null) {
							msg = 'QQ:' + qq;
						}
						if (qq == null && tel != null) {
							msg = 'TEL:' + tel;
						}
						if (tel != null && qq != null) {
							msg = 'QQ:' + qq+ '/TEL:' + tel;
						}

						this.model1.userInfo.contact = msg;
					}
				});


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
						url: result,
						thumb: this.apiHost + this.photoUrl

					}))
					fileListLen++
				}


			},


			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					var that = this
					let a = uni.uploadFile({
						url: this.apiHost + '/wx/api/release/upload',
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							console.log(res);
							let result = JSON.parse(res.data)
							console.log(result.code);
							if (result.code == 0) {
								console.log(1);
								resolve()
								// setTimeout(() => {
								// 	resolve()
								// }, 1000)

								let data = result.object;
								console.log(data);
								that.status = data.statusCode;
								that.name = data.name;
								that.type = data.type;
								that.number = data.number;
								that.photoUrl = data.photoUrl;
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
									that.model1.userInfo.value = 3;

								}
								if (that.model1.userInfo.campus == null || that.model1.userInfo
									.campus ==
									'') {
									that.model1.userInfo.campus = "南昌校区"
								}

							} else if (result.code == 406) {
								that.$refs.uToast.show({
									type: 'error',
									message: "图片包含敏感信息!",
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
								});
							} else {
								that.$refs.uToast.show({
									type: 'error',
									message: "上传失败!",
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
								});
							}

						},
						fail: (res) => {
							that.$refs.uToast.show({
								type: 'error',
								message: "上传失败!",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
							});
						}

					});
				})
			},


			//提交表单
			postForm() {

				var that = this;
				if (that.model1.userInfo.title == null || that.model1.userInfo.title.replace(/\ +/g, "") == '') {
					that.model1.userInfo.title = null;
				}
				if (that.value3 == null || that.value3.replace(/\ +/g, "") == '') {
					that.value3 = null;
				}
				this.isActive = false;
				this.$refs.form1.validate().then(res => {
					if (!this.check) {
						this.isActive = true;
						return
					}
					uni.requestSubscribeMessage({
						tmplIds: ['WjSjw0WyRL-bTJ8KLZ0mL6bJLevOi3Qfw727iWPjdvg',
							'ePAwjtm9WKRLyGdrce0IiQtO9jE6l7mnY1KhT2Nvm6U',
							'yN2LMy5FBS8ha9Fq-akQTag3SWgx9uvgTG5J3ABVGYw'
						],
						success(res) {
							console.log("SubscribeMessageSuccess");
							console.log(res);
						},
						fail(res) {
							console.log("SubscribeMessageError");
							console.log(res);
						},
						complete() {
							if (that.isRequest == false) {
								that.isRequest = true;
								that.mask = true;
								request.postRequest('/wx/api/release/auth/add/check', {
										relCampus: that.model1.userInfo.campus,
										relCateId: that.model1.userInfo.value,
										relContact: that.model1.userInfo.contact,
										relDesc: that.value3,
										relImage: that.photoUrl,
										relStatus: that.rel_status,
										relTitle: that.model1.userInfo.title,
										createPlace: that.model1.userInfo.clue,
									},
									(res) => {
										if (res.data.code == 0) {
											// setTimeout(function(){
											that.isRequest = false;
											that.mask = false;
											uni.switchTab({
												url: '../index/index',
												success() {
													var page = getCurrentPages().pop();
													if (page == undefined || page == null)
														return;
													page.onLoad();
												}
											})
											// },2000)

										} else if (res.data.code == 406) {
											that.isRequest = false;
											that.mask = false;
											that.$refs.uToast.show({
												type: 'error',
												message: "内容包含敏感信息",
												iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
											});
										} else {
											that.isRequest = false;
											that.mask = false;
											that.$refs.uToast.show({
												type: 'error',
												message: "发布失败!",
												iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
											});
										}
									},
									(error) => {
										that.isRequest = false;
										that.mask = false;
										that.$refs.uToast.show({
											type: 'error',
											message: "服务器异常!",
											iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
										});
									}
								)
							}

						}
					})



				})




			},


			//打开服务协议
			openWord() {
				uni.navigateTo({
					url: '../word/word'
				})
			},

			changeRadio() {
				if (this.check) {
					this.check = false
				} else {
					this.check = true
					this.isActive = false
				}

			}


		},



	};
</script>
<style scoped>
	.u-input /deep/ .input-placeholder {
		color: red;
	}


	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	.btn {
		width: 15rem;
		height: 4rem;
		box-shadow: 0 0 0 rgba(227, 236, 237, 0.2), 0 0 0 rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		transition: 0.3s ease;
	}

	.move {
		animation: finger .5s;

	}

	@keyframes finger {
		0% {

			transform: translate(-5px)
		}


		25% {
			transform: translate(5px)
		}


		50% {
			transform: translate(-5px)
		}


		75% {
			transform: translate(5px)
		}

		100% {
			transform: translate(-5px)
		}

	}
</style>

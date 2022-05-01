<template>
	<view>
		<view class="info">
			<view class="" style="height: 20rpx;"></view>
			<u-popup :show="show" @close="close" mode="center" round=20 closeable=true>
				<view style="width: 500rpx;height: 350rpx;">
					<view style="text-align: center;margin:40rpx 0;">修改{{title}}</view>
					<input type="text" v-model="change" confirm-type="done" cursor-spacing=3
						style="background-color: #e5eeff;width: 400rpx;height: 70rpx; margin: auto;border-radius: 20rpx;padding-left:.5rem;" />
					<button style="width: 150rpx;height: 80rpx;margin-top: 50rpx;line-height: 200%;"
						@click="save">确定</button>
				</view>
			</u-popup>
			<u-cell-group>
				<u-cell icon="https://pic.imgdb.cn/item/62177c832ab3f51d91a39e09.png" title="头像" isLink="true">
					<image :src="userInfo.stuImage" slot="value"
						style="border-radius: 30rpx;width: 120rpx;height: 120rpx;overflow: hidden;"></image>
				</u-cell>


				<u-cell icon="https://pic.imgdb.cn/item/621f65285baa1a80abff47d1.png" title="昵称"
					:value="userInfo.stuNick" isLink="true"></u-cell>

				<u-cell icon="https://pic.imgdb.cn/item/621f66725baa1a80ab0005ce.png" title="QQ" :value="userInfo.stuQq"
					isLink="true" @click="open('QQ')"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/626dd8b2239250f7c5483124.png" title="TEL"
					:value="userInfo.stuEmail" isLink="true" @click="open('TEL')"></u-cell>
			</u-cell-group>
			<view class="" style="height: 60rpx;margin-top: 30rpx;margin-left:35rpx;font-size: 35rpx;color: grey;">
				[教务信息]</view>
			<u-cell-group>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284ae.png" title="姓名"
					:value="userInfo.stuName" isLink="true"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284ba.png" title="学号" :value="userInfo.stuXh"
					isLink="true"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284a8.png" title="专业"
					:value="userInfo.stuMajor" isLink="true"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284c3.png" title="班级"
					:value="userInfo.stuClassname" isLink="true"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284a3.png" title="院系"
					:value="userInfo.stuDepartment" isLink="true"></u-cell>

			</u-cell-group>
		</view>
		<u-toast ref="uToast"></u-toast>
		<tui-loading text="保存中..." v-if="isRequest"></tui-loading>
		<u-overlay :show="mask" :opacity="0.3"></u-overlay>
		<u-loading-page :loading="load.show"></u-loading-page>
	</view>
</template>

<script>
	import request from '@/utils/request.js';
	import tuiLoading from "@/components/thorui/tui-loading/tui-loading"
	export default {
		components: {
			tuiLoading
		},
		data() {
			return {
				load: {
					show: true,
				},
				uploadPath: '',
				baseUrl: request.getHost(),
				userInfo: {
					"stuNick": "某某",
					"stuName": "某某某",
					"stuSex": "3",
					"stuXh": "********",
					"stuDepartment": "********",
					"stuMajor": "********",
					"stuClassname": "********",
					"stuQq": "********",
					"stuEmail": "********",
					"stuImage": ''

				},
				show: false,
				title: '',
				change: '', //修改的信息
				mask: false,
				isRequest: false,
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					that.load.show = false;
					this.userInfo = res.data;
				}
			});

		},

		methods: {
			paneAlert() {
				this.$refs.uToast.show({
					type: 'fail',
					message: "异常错误",
					duration: 700,
				});
			},
			open(t) {
				this.show = true
				this.title = t //在这里设置打开时提示是修改QQ还是昵称
			},
			close() {
				this.show = false

			},
			save() {
				this.show = false
				//判断修改的是qq还是昵称
				let name = null;
				let qq = null;
				let phone = null;
				
				if (this.change!=null&&this.change.replace(/\ +/g, "") != '') {
					if (this.title == "昵称") {
						name = this.change
					} else if (this.title == "QQ") {
						qq = this.change
						let reg = /^[1-9][0-9]{4,9}$/;
						let result = reg.test(qq)
						if (result == false) {
							this.$refs.uToast.show({
								type: 'fail',
								message: "QQ号不合规！",
								duration: 700,
							});
							return;
						}
					
					} else if (this.title == "TEL") {
						phone = this.change
						let reg = /^1[3-9][0-9]{9}$/
						let result = reg.test(phone)
						if (result == false) {
							this.$refs.uToast.show({
								type: 'fail',
								message: "手机号不合规！",
								duration: 700,
							});
							return;
						}
					}
				}else{
					if (this.title == "昵称") {
						name = ''
					} 
					else if (this.title == "QQ") {
						qq = ''
						
					} 
					else if (this.title == "TEL") {
						phone = ''
						
					}
				}

				
				this.change = null;
				this.isRequest = true;
				this.mask = true;

				request.postRequest('/wx/api/student/auth/edit', {
						stuNick: name,
						stuQq: qq,
						stuEmail: phone
					},
					(res) => {
						if (res.data.code == 0 && res.statusCode == 200) {
							this.isRequest = false;
							this.mask = false;
							if (name != null) {
								this.userInfo.stuNick = name;
							} else if (qq != null) {
								this.userInfo.stuQq = qq;
							} else if (phone != null) {
								this.userInfo.stuEmail = phone;
							}

							uni.showToast({
								title: '修改成功!',
								duration: 1000
							});
							request.getRequest('/wx/api/student/auth/my', {},
								(res) => {
									console.log(res)
									uni.setStorage({
										key: 'userInfo',
										data: res.data
									})
								}

							)
						} else if (res.data.code == 406) {
							this.isRequest = false;
							this.mask = false;
							this.$refs.uToast.show({
								type: 'fail',
								message: "内容包含敏感信息",
								duration: 700,
							});
						} else {
							this.isRequest = false;
							this.mask = false;
							this.$refs.uToast.show({
								type: 'fail',
								message: "修改失败",
								duration: 700,
							});
						}
					},
					(error) => {
						this.isRequest = false;
						this.mask = false;
						this.paneAlert();
					}

				)

			},
			changeImage() {
				let that = this;
				let urlImage = null;
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album'],
					success(res) {
						that.isRequest = true;
						that.mask = true;
						that.uploadPath = res.tempFilePaths[0];
						uni.uploadFile({
							url: that.baseUrl + '/wx/api/info/upload',
							filePath: that.uploadPath,
							name: 'file',
							success: (res) => {
								res = JSON.parse(res.data);
								if (res.code == 0) {
									urlImage = that.baseUrl + res.msg;
									request.postRequest('/wx/api/student/auth/edit', {
											stuImage: that.baseUrl + res.msg,
										},
										(res) => {
											if (res.data.code == 0 && res.statusCode == 200) {
												that.isRequest = false;
												that.mask = false;
												that.userInfo.stuImage = urlImage;
												uni.showToast({
													title: '修改成功!',
													duration: 1000
												});
												request.getRequest('/wx/api/student/auth/my', {},
													(res) => {
														uni.setStorage({
															key: 'userInfo',
															data: res.data
														})
													}

												)
											} else if (res.data.code == 406) {
												this.isRequest = false;
												this.mask = false;
												this.$refs.uToast.show({
													type: 'fail',
													message: "图片包含敏感信息",
													duration: 700,
												});
											} else {
												this.isRequest = false;
												this.mask = false;
												this.$refs.uToast.show({
													type: 'fail',
													message: "修改失败",
													duration: 700,
												});
											}
										},
										(error) => {
											this.isRequest = false;
											this.mask = false;
											this.paneAlert();
										}

									)
								}
							}
						})
					}

				});

				// uni.uploadFile()
			}


		}




	}
</script>

<style scoped>
	.img {
		margin-top: -40rpx;
		margin-bottom: -40rpx;
	}
</style>

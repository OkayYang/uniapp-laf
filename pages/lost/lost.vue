<template>

	<!-- 失物招领 -->
	<view class="form">
		<view class="head">
			<!-- <view class="bgcard">
				<view class="card">
					<view class="indentityCard"> -->
			<view class="identityCard_front" style="margin-top: 30rpx;">
				<!-- <image src="https://pic.imgdb.cn/item/62237ee95baa1a80aba4ef20.png" class="images"
					style="margin: auto;width: 250rpx;display: block;" mode='widthFix'></image> -->
				<!-- <view  style="margin: auto;width: 180rpx;"> -->
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:previewFullImage="true" width="210rpx" height="210rpx">

				</u-upload>

				<view class="imgs" style="text-align: center;font-size: 27rpx;color:#121415;margin: -20rpx 0 50rpx;">

					<!-- 		</view>
						</view>
					</view> -->


				</view>
			</view>

		</view>



		<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
			<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="类 别"
				prop="userInfo.sort" borderBottom @click="showSort = true" ref="item1" labelWidth="120rpx">
				<u--input v-model="model1.userInfo.sort" disabled disabledColor="#ffffff" placeholder=" 请选择物品类别"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-action-sheet :show="showSort" :actions="sortActions" title="请选择类别" description="请选择类别"
				@close="showSort = false" @select="sortSelect">
			</u-action-sheet>




			<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="校 区"
				prop="userInfo.campus" borderBottom @click="showCampus = true" ref="item1" labelWidth="120rpx">
				<u--input v-model="model1.userInfo.campus" disabled disabledColor="#ffffff" placeholder=" 请选择校区"
					border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-action-sheet :show="showCampus" :actions="actions" title="请选择校区" description="请选择校区"
				@close="showCampus = false" @select="campusSelect">
			</u-action-sheet>


			<u-form-item label="内 容" borderBottom ref="item1" labelWidth="120rpx">
				<view class="" @click="connected()">
				<u--textarea v-model="content" placeholder="请输入内容" autoHeight ></u--textarea>	
				</view>
				</u-form-item>

			<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="标 题"
				prop="userInfo.title" borderBottom ref="item1" labelWidth="120rpx">
				<u--input v-model="model1.userInfo.title" border="none" placeholder=" 如:捡到一卡通"></u--input>
			</u-form-item>


			<u-form-item :required="true" :leftIconStyle="{color: '#888', fontSize: '32rpx'}" label="线 索"
				prop="userInfo.clue" borderBottom ref="item1" labelWidth="120rpx">
				<u--input v-model="model1.userInfo.clue" border="none" placeholder=" 失物当前存放地"></u--input>
			</u-form-item>

			<u-form-item label="联 系 方 式" borderBottom ref="item1" labelWidth="200rpx">
				<u--input v-model="model1.userInfo.contact" border="none" placeholder=" QQ/电话等"></u--input>
			</u-form-item>

			<view style="margin-top: 30rpx;">
				<u-button :custom-style="submitBtnStyle" @click="submit" :ripple="true" ripple-bg-color="#909399">
					提 &nbsp;&nbsp;交
				</u-button>
			</view>



		</u--form>


	</view>
</template>

<script>
	export default {
		data() {
			return {
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
					width: '200rpx',
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
					'userInfo.clue': {
						type: 'string',
						required: true,
						message: '请填写失物招领的具体地点',
						trigger: ['blur', 'change']
					},

				},
				radio: '',
				switchVal: false,
				content: '',
				fileList1: [],
				name:'',
				type:'',
			};
		},
		methods: {
			campusSelect(e) {
				this.model1.userInfo.campus = e.name
			},
			sortSelect(e) {
				this.model1.userInfo.sort = e.name
			},
			//选取图片

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
						url: 'http://101.42.222.167/wx/api/release/upload',
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
							console.log(that.type)
						}
					});
				})
			},
			
			connected(){
				if(this.type=='sfz'){
					var strcard=this.number.replace(/^(.{4})(?:\d+)(.{4})$/,"$1******$2");
					this.content +='捡到'+this.name+'的身份证'+'，身份证号为'+strcard;
					
					console.log('捡到身份证')
				}
				console.log(this.type);
			}

		},
		
		// mounted(){
		// 	var that = this;
		// 	setTimeout(function() {
		// 			that.connected();
			
		// 	}, 1000);
		
		// }

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
		margin: 30rpx 0;
	}

	.pic {
		float: left;
		position: relative;
		margin-right: 9px;
		margin-bottom: 9px;
	}

	.delete-btn {
		position: absolute;
		top: 0;
		right: 0;
	}

	.weui-uploader {
		padding: 10rpx;
	}
</style>

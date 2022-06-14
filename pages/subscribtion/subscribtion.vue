<template>

	<!-- 这里是输入关键字和描述 -->
	<view class="" v-show="!button_show" style="width:100%;height:1200rpx;position:relative;">


		<!-- <view class="box_text">描述</view> -->
		<textarea type="text" v-model="data_formInput.title" maxlength="50"
			style="border:1px solid rgba(222, 218, 208, 0.8);width:83%;box-sizing: border-box;height:250rpx;margin:auto;padding:30rpx;margin-top:40rpx;background-color:white;border-radius: 30rpx;"
			placeholder="编辑标题,记录失物描述……">
			</textarea>
		<view class=""
			style="position:relative;width:78%;height:50%;border:1px solid rgba(222, 218, 208, 0.8);margin:50rpx auto 0;background-color:white;overflow-y:auto;padding-left:30rpx;padding-top:50rpx;border-radius: 30rpx;">

			<view style="display:flex;align-items:center;width:100%;margin-bottom:20rpx;"
				v-for="(item,i) of data_formInput.keyword">
				<input type="text" v-model="data_formInput.keyword[i]" :key="i"
					style="border:1px solid rgba(230,225,215,0.8);width:80%;height:70rpx;margin-bottom:10rpx;padding-left:20rpx;display:inline-block;border-radius: 20rpx;" />
				<!-- <view style="display:inline-block;height:70rpx;line-height:70rpx;margin:0 0 10rpx 30rpx;"
					@click="delInput(item,i)"> -->
				<image src="/static/subscribtion/del.png" mode="aspectFit"
					style="display:inline-block;height:70rpx;line-height:70rpx;margin:0 0 10rpx 20rpx;width:50rpx"
					@click="delInput(item,i)">
				</image>
				<!-- </view> -->
			</view>
			<view @click='addInput' style="display:flex;align-items:center;height:30rpx;margin-top:50rpx;">
				<image src="/static/subscribtion/add.png" mode="aspectFit"
					style="display:inline;width:50rpx;height:50rpx;padding-right:20rpx;"></image> 添加关键字
			</view>
		</view>


		<!-- 使用帮助 -->
		<view class=""
			style="display:flex;align-items:center;position:relative;width:78%;height:3%;font-size:35rpx;color:grey;margin:auto;padding-left:30rpx;margin-top:50rpx;"  @click="openHelp"
			>
				<image src="/static/subscribtion/help.png" mode="aspectFit"
					style="display:inline;width:50rpx;height:50rpx;padding-right:20rpx;">
				</image>使用帮助
			
		
		</view>
		<button @click='create' class="btn"
			style="position:absolute;top:1150rpx;left:50%;transform:translateX(-50%)">确&nbsp;&nbsp;&nbsp;定</button>
		<!-- 输入的关键字不为空时才能添加新的空的输入框 -->

		<u-popup :show="newTip" @close="close_new" mode="center" round=20 closeable=true>
			<view style="width: 600rpx;height: 260rpx;position:relative;">
				<view style="width: 400rpx;height: 220rpx;position:absolute;top:100rpx;left:100rpx;text-align:center">
					输入框不为空时才能添加新的输入框哦！
				</view>
			</view>
		</u-popup>


		<!-- 关键字个数超过5个时出现的弹窗 -->
		<u-popup :show="maxTip" @close="close_box" mode="center" round=20 closeable=true>
			<view style="width: 600rpx;height: 220rpx;position:relative;">
				<view style="width: 550rpx;height: 220rpx;position:absolute;top:100rpx;text-align:center">
					添加的关键字不能超过5个哦！
				</view>
			</view>
		</u-popup>


		<u-popup :show="nullTip" @close="close_null" mode="center" round=20 closeable=true>
			<view style="width: 600rpx;height: 220rpx;position:relative;">
				<view style="width: 550rpx;height: 220rpx;position:absolute;top:100rpx;text-align:center">
					添加的关键字不能为空哦！
				</view>

			</view>
		</u-popup>
		<u-popup :show="totalTip" @close="close_total" mode="center" round=20 closeable=true>
			<view style="width: 600rpx;height: 300rpx;position:relative;display:flex;justify-content:center">
				<view style="height: 220rpx;position:absolute;top:100rpx;">
					添加的推送不能超过5个哦!
				</view>
				<view
					style="position:absolute;top:190rpx;border:1rpx solid rgba(0, 0, 0, 0.1);width:200rpx;height:70rpx;border-radius:30rpx;text-align:center;line-height:70rpx;background-color: rgba(170, 170, 255, 0.1);"
					@click="jumpMySub">管理推送</view>
			</view>
		</u-popup>



		<u-popup :show="helpTip" @close="close_help" mode="center" round=10 closeable=true>
			<view style="width: 650rpx;height: 950rpx;position:relative;display:flex;justify-content:center;font-size:40rpx;">
				
				<view style="height: 300rpx;position:absolute;top:80rpx;">
					<view  style="width:90%;margin:20rpx auto 30rpx;">【关键字的作用】<view style="margin:30rpx auto"></view>
					在输入框中添加关键字后，系统会将您的关键字与最新发布的失物/寻物信息作匹配，如果匹配到包含您的关键字的发布内容，系统将会自动为您推送该发布的内容。方便您第一时间收到相关信息。
						
					</view>
					<view  style="width:90%;margin:20rpx auto 30rpx;">【添加关键字的步骤】
						
					</view>
					<view style="width:90%;margin:20rpx auto 30rpx;">1.在编辑标题框可以编辑标题，作用仅为写给用户本人看的失物描述，<text
							style="color:orange">可不写</text>。</view>
					<view style="width:90%;margin:20rpx auto">2.点击添加关键字可添加输入框写入关键字，提交的推送中<text
							style="color:orange">至少包含一个关键字</text>。</view>
						
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
				},
				maxTip: false,
				nullTip: false,
				totalTip: false,
				helpTip: false,
				newTip: false,
			}
		},

		onShow() {
			this.addInput()
		},
		methods: {
			create() {


				request.getRequest('/wx/api/push/auth/list', null, (res) => {
					// 推送个数不超过5个
					if (res.data.total > 4) {
						this.totalTip = true
					} else {
						let obj = {
							keyword: this.data_formInput.keyword,
							title: this.data_formInput.title
						}
						this.datas.push(obj);
						let arr = obj.keyword;
						console.log(arr);
						let str = arr.join(';'); //join
						//判断关键字是否为空，不为空才提交，为空提示
						if (arr == 0) {
							this.nullTip = true;
						} else {
							request.postRequest('/wx/api/push/auth/add', {
								pushTitle: obj.title,
								pushClue: str,
							}, (res) => {
								if (res.data.code == 0) {
									console.log("11111111")
									uni.switchTab({
										url: '../index/index',
									})
								}
							})
						}

					}


				})

			},
			// 点击生成input
			addInput() {
				let num = this.data_formInput.keyword.length;
				let arr = this.data_formInput.keyword;
				let flag = false;
				if (num < 5) {

					for (let i = 0; i < num; i++) {
						console.log(arr[i])
						//判断是否有未填写的输入框，如果有则不能继续添加						
						if (arr[i] == '') {
							flag = true;
						}
					}
					if (flag) {
						this.newTip=true;
					} else {
						let keyInput = this.data_formInput.keyword
						keyInput.push('');
					}


				} else {
					this.maxTip = true;
				}
			},

			close_box() {
				this.maxTip = false
			},
			close_new() {
				this.newTip = false
			},

			close_null() {
				this.nullTip = false
			},

			close_total() {
				this.totalTip = false
			},

			//删除input框及相应的关键字
			delInput(item, num) {
				console.log(item)
				this.data_formInput.keyword = this.data_formInput.keyword.filter((i) => {
					return i != item;
				})

			},
			jumpMySub() {
				uni.redirectTo({
					url: '../mySubscribe/mySubscribe'
				})
			},
			openHelp() {
				this.helpTip = true;
			},
			close_help() {
				this.helpTip = false;
			}
		}
	}
</script>

<style scoped>
	.btn {
		width: 83%;
		height: 3rem;
		box-shadow: 0 0 0 rgba(227, 236, 237, 0.2), 0 0 0 rgba(255, 255, 255, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		transition: 0.3s ease;
	}
</style>

<template>
	<view class="">
		
		
		<!-- 这里是输入关键字和描述 -->
		<view class="box" v-show="box_show">
			<view class="box_text">请输入关键字</view><input type="text" v-model="data_formInput.keyword" />
			<view class="box_text">请输入描述</view><input type="text" v-model="data_formInput.describe" />
			<button type="default" @click='create'>确定</button>
		</view>
		
		
		
		<!-- 这里显示已提交的关键字以及添加关键字按钮 -->
		<view v-show="button_show">
			<button type="default" v-for="(item,index) in datas" :key='index'
				@click='open(item.describe)'>{{item.keyword}}</button>
			<u-popup :show="show" @close="close" mode="center" round=20 closeable=true>
				<view>
					{{show_describe}}
				</view>
			</u-popup>
			<button type="default" @click='open_box'>添加关键字</button>
		</view>
		
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				datas: [],
				data_formInput: {
					keyword: '', //关键字
					describe: '', //描述
				},
				show_describe: '',
				show: false,
				box_show: false,
				button_show: true,
			}
		},
		methods: {
			create() {
				let obj = {
					keyword: this.data_formInput.keyword,
					describe: this.data_formInput.describe
				}
				this.datas.push(obj);
				this.data_formInput.keyword = ''//提交input之后置空
				this.data_formInput.describe = ''
				this.box_show = false
				this.button_show = true
			},
			// 打开描述
			open(t) {
				this.show = true
				this.show_describe = t
			},
			close() {
				this.show = false
			},
			open_box() {
				this.box_show = true
				this.button_show = false
			}
		}
	}
</script>

<style scoped>
	.box {
		width: 100%;
		height: 500rpx;
		overflow: hidden;
		/* margin-top: 50rpx; */
		/* background-image: url(https://pic.imgdb.cn/item/624c0962239250f7c58f97a2.png); */
		background-repeat: no-repeat;
		background-size: cover;
	}

	.box_text {
		text-align: center;
		margin-bottom: 20rpx;
	}

	input {
		width: 80%;
		height: 30rpx;
		border: 1rpx solid black;
		margin-top: 50rpx;
		overflow: hidden;
		margin: 10rpx auto;
		padding-left: 20rpx;
		font-size: 25rpx;
	}
</style>

<template>
	<view>
		<view class="info">
			<view class="" style="height: 20rpx;"></view>
			<!-- <u-popup :show="show" @close="close" @open="open" mode="center" round=20 closeable=true>
			            <view style="width: 500rpx;height: 350rpx;">
							<view style="text-align: center;margin:40rpx 0;">修改你的昵称</view>
			                <input type="text" v-model="wname2" confirm-type="done" 	cursor-spacing=3 style="background-color: #e5eeff;width: 400rpx;height: 70rpx; margin: auto;border-radius: 20rpx;"/>
							<button   style="width: 150rpx;height: 80rpx;line-height: calc(170%);margin-top: 50rpx;" @click="save">确定</button>
			            </view>
					</u-popup> -->
			<u-cell-group>
				<u-cell icon="https://pic.imgdb.cn/item/62177c832ab3f51d91a39e09.png" title="头像" isLink="true">

					<open-data type="userAvatarUrl" slot="value"
						style="border-radius: 30rpx;width: 120rpx;height: 120rpx;overflow: hidden;"></open-data>
				</u-cell>


				<u-cell icon="https://pic.imgdb.cn/item/621f65285baa1a80abff47d1.png" title="昵称" :value="item.wname"
					isLink="true" @click="show = true"></u-cell>

				<u-cell icon="https://pic.imgdb.cn/item/621f66725baa1a80ab0005ce.png" title="QQ" :value="item.qq"
					isLink="true"></u-cell>
			</u-cell-group>
			<view class="" style="height: 60rpx;margin-top: 30rpx;margin-left:35rpx;font-size: 35rpx;color: grey;">[教务信息]</view>
			<u-cell-group>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284ae.png" title="姓名" :value="item.name"
					isLink="true"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284ba.png" title="学号" :value="item.sno"
					isLink="true"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284c3.png" title="班级" :value="item.class"
					isLink="true"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284a3.png" title="院系"
					:value="item.department" isLink="true"></u-cell>
				<u-cell icon="https://pic.imgdb.cn/item/62177c1f2ab3f51d91a284a8.png" title="专业" :value="item.major"
					isLink="true"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: {
					'qq': '2330295306',
					'wname': 'Evy',
					'wname2':'',
					'name': '曹嘉雯',
					'sno': 5720191601,
					'class': '软开193班',
					'department': '软件工程',
					'major': '软件开发',
					'sex': '女',
					'sname': 'Evy',

				},
				show: false

			}
		},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},
			// save(){
			// 	this.show = false
			// }
			
		},
		
		


	}
</script>

<style scoped>
	.img {
		margin-top: -40rpx;
		margin-bottom: -40rpx;
	}
</style>

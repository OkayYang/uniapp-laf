<template>
	<view class="u-demo-block">
		<view class="index">
			<view class="swipe">
				<u-swiper :list="swipePicture" @change="(e) =>{current = e.current}" :autoplay="true" :circular="true">
					<view slot="indicator" class="indicator">
						<view class="indicator__dot" v-for="(item, index) in swipePicture" :key="index"
							:class="[index === current && 'indicator__dot--active']">
						</view>
					</view>
				</u-swiper>
				<u-gap bgColor="transparent" height="15"></u-gap>
			</view>
			<view class="output"
				style="display:flex;align-items:center;border-radius: 32rpx;width: 500rpx;height: 150rpx;margin: 0 auto;background-color:#ffffff;box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 0px 5px 0 rgba(0, 0, 0, 0.19);">
				<u-grid :border="true" style="width: 500rpx;" col="2">
					<u-grid-item v-for="midBarItem in midBar" style="display: flex;align-items: center;">
						<view :class="midBarItem.class" style="font-size: 60rpx;color: #2979FF"></view>
						<text style="font-size: 35rpx;">{{midBarItem.text}}</text>
					</u-grid-item>
				</u-grid>
			</view>
			<view style="display: flex;margin-top: 30rpx;">
				<view class="custom-icon custom-icon-gonggao" style="color: #007AFF;font-size: 70rpx;"></view>
				<text style="font-size: 35rpx;">公告</text>
			</view>
			<view style="background-color:#ffffff;margin-top: 20rpx;box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 0px 5px 0 rgba(0, 0, 0, 0.19);">
				<u--text text="asdff"></u--text>
				<u--text text="asdff"></u--text>
				<u--text text="asdff"></u--text>
				<u--text text="asdff"></u--text>
				<u--text text="asdff"></u--text>
				<u--text text="asdff"></u--text>
				<u--text text="asdff"></u--text>
				<u--text text="asdff"></u--text>
				<u--text text="asdff"></u--text>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		onLoad() {
			uni.navigateTo({
				url:"../message/message?tid=1"
			})
		},
		data() {
			return {
				current: 0,
				currentNum: 0,
				//#ifdef MP-WEIXIN
				swipePicture: ['/static/dog1.jpg', '/static/dog2.jpg',
					'/static/dog3.jpg'
				],
				// #endif
				//#ifndef MP-WEIXIN
				swipePicture: ['../../static/dog1.jpg', '../../static/dog2.jpg',
					'../../static/dog3.jpg'
				],
				//#endif
				midBar: [{
					text: '寻物启示',
					class: 'custom-icon custom-icon-xunwuqishi'
				}, {
					text: '失物招领',
					class: 'custom-icon custom-icon-shiwuzhaoling'
				}],


			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.indicator {
		@include flex(row);
		justify-content: center;


		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}

	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 100px;
		width: 35px;
		@include flex;
		justify-content: center;

		&__text {
			color: #FFFFFF;
			font-size: 12px;
		}
	}

	.u-swiper {
		margin: 0 auto;
		margin-top: 40rpx;
		width: 660rpx;

	}

	.index {
		width: 660rpx;
		margin: 0 auto;
	}

	page {
	
		width: 100%;
		background-color: #fcfcfc;
		
		min-height: 100%;

	}
</style>

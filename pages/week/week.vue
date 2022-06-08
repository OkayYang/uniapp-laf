<template>
	<view>
		<tui-time-axis>
			<tui-timeaxis-item backgroundColor="transparent">
				<template v-slot:node>
					<view class="tui-node">
						<tui-icon name="check" color="#fff" :size="14" bold></tui-icon>
					</view>
				</template>
		
				<template v-slot:content>
					<view>
						<view class="tui-order-title">已签收</view>
						<view class="tui-order-desc">您的订单已由本人签收。感谢您在商城购物，欢迎再次光临。</view>
						<view class="tui-order-time tui-gray">2019-05-01 18:48:26</view>
					</view>
				</template>
			</tui-timeaxis-item>
		</tui-time-axis>

	</view>
</template>

<script>
	import request from '@/utils/request.js';
	import tuiTimeAxis from "@/components/thorui/tui-time-axis/tui-time-axis"
	import tuiTimeaxisItem from "@/components/thorui/tui-timeaxis-item/tui-timeaxis-item"
	export default {
		components: {
			tuiTimeAxis,
			tuiTimeaxisItem
		},
		data() {
			return {
				lists: '',
			}
		},
		onLoad() {
			let that = this;
			request.getRequest('/wx/api/article/list', {},
				(res) => {
					that.lists = res.data;
				}
			)
		},
		methods: {

		}
	}
</script>

<style>
	.u-steps-item__wrapper.data-v-3ae6176e {

		background-color: #ff0000;


	}
</style>

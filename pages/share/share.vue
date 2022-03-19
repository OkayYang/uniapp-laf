<template>
	<view>
		<button open-type="share">分享</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShareAppMessage() {
			
			return {
				title: '小程序分享',
				path: '/pages/index/index'
			}
		},
		methods: {
			
		}
	}
	
</script>

<style>

</style>

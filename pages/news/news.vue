<template>
	<view>
		<u-parse :content="content" :lazyLoad="true"></u-parse>
		<u-loading-page :loading="loading"></u-loading-page>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				content:null,
				loading:true,
			}
		},
		onLoad: function() {
			let that=this;
			request.getRequest('/wx/api/article/week', null,
				(res) => {
					that.loading=false;
					console.log(res.data.object.content);
					that.content=res.data.object.content;
				});

		},
		methods: {

		}
	}
</script>

<style>

</style>

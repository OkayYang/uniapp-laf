<template>
	<view>
		<view style="margin-top: 50rpx;display: flex;justify-content: center;">
			<image @click="PreviewImage(imageUrl)" :src="imageUrl" mode="aspectFit"  ></image>
		</view>
		<view style="text-align: center;margin-top: 50rpx;">
			<view>
				<text>各位同学打赏的每一笔费用都将会用于本系统维护。</text>
			</view>
			<view>
				<text>后续费用明细将会通过系统公告方式公布。</text>
			</view>
			<view>
				<text>如有打赏请备注姓名,谢谢。</text>
			</view>
			<view style="margin-top: 50rpx;">
				<text>点击图片长按保存。</text>
			</view>
			
			
			
		</view>
		
		
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	export default {
		data() {
			return {
				"imageUrl":request.getHost+'/img/user/tiezi/wxpay.jpg'
			}
		},
		methods: {
			PreviewImage(imageUrl){ 
			        var images = [];
			        images.push(imageUrl);
			        uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
			            current:0,
			            urls:images,
			            longPressActions: {  //长按保存图片到相册
			                itemList: ['保存图片'],
			                success: (data)=> {
			                    console.log(data);
			                    uni.saveImageToPhotosAlbum({ //保存图片到相册
			                        filePath: payUrl,
			                        success: function () {
			                            uni.showToast({icon:'success',title:'保存成功'})
			                        },
			                        fail: (err) => {
			                            uni.showToast({icon:'none',title:'保存失败，请重新尝试'})
			                        }
			                    });
			                },
			                fail: (err)=> {
			                    console.log(err.errMsg);
			                }
			        }
			        });
					}

		}
	}
</script>

<style>

</style>

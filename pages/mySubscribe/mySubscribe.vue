<template>
	<view>
		<u-loading-page :loading="show"></u-loading-page>
		<view v-if="!show">
			<view v-if="size>0">
				<view class="list" v-for="item in list">
					<view class="content">
						<view class="top">
							<view class="sid">订阅号：{{getUnixTime(item.createTime)+item.pushId*3}}</view>
							<view v-if="item.pushCount>0">
								<u--text type="success" :text="'已推送'+item.pushCount+'次'"></u--text>
							</view>
							<view v-else="item.pushCount!=0"><u--text type="warning" text="寻找中"></u--text></view>
						</view>
						<view style="margin-bottom: 10rpx;"><u-line  ></u-line></view>
						
						<view class="middle">
							<view class="name middle_txt">物品名称：{{item.pushTitle}}</view>
							<view class="key middle_txt">关键字信息：{{item.pushClue}}</view>
						</view>
						<view style="margin-top: 25rpx;"><u-line ></u-line></view>
						<view class="bottom">
							<view style="color: #909399;">订阅时间：{{item.createTime}}</view>
							<view class="btn"><u-button type="error" size="mini" text="取消订阅" @click="confirmbtn(item.pushId)"></u-button></view>
						</view>
					</view>
				</view>
			</view>
			<view v-else="size==0">
				<u-empty
				        mode="list"
						text="订阅列表为空"
				        icon="http://cdn.uviewui.com/uview/empty/list.png"
				>
				</u-empty>
			</view>
		</view>
		<tui-loading text="发布中..." v-if="isRequest"></tui-loading>
		<u-toast ref="uToast"></u-toast>
		<u-overlay :show="mask" :opacity="0.3"></u-overlay>
		<view >
				<u-modal :show="confirm"  content="是否取消订阅?" showCancelButton @cancel="confirm=false" @confirm="cancelbtn(selectId)"></u-modal>
				
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import tuiLoading from "@/components/thorui/tui-loading/tui-loading"
	export default {
		data() {
			return {
				confirm:false,
				size:0,
				list:null,
				show:true,
				isRequest: false,
				mask: false,
				selectId:null
				
				
			}
		},
		onLoad:function(){
			this.created()
			
		},
		methods: {
			created(){
				request.getRequest('/wx/api/push/auth/list',null,
					(res)=>{
						
						this.list=res.data.rows;
						
						this.size =res.data.total;
						
						this.show=false;
						
						
					},
					(error)=>{
						
					}
				)
			},
			getUnixTime(dateStr){
			    var newstr = dateStr.replace(/-/g,'/'); 
			    var date =  new Date(newstr); 
			    var time_str = date.getTime().toString();
			    return time_str.substr(0, 10);
			},
			confirmbtn(id){
				this.selectId = id;
				this.confirm=true;
			},
			cancelbtn(id){
				this.confirm=false;
				if(id!=null){
					let that = this;
					if (that.isRequest == false) {
						that.isRequest = true;
						that.mask = true;
						request.getRequest('/wx/api/push/auth/del',{pid:id},
						(res)=>{
							if(res.data.code==0){
								that.isRequest = false;
								that.mask = false;
								this.created();
								
							}else{
								that.isRequest = false;
								that.mask = false;
								that.$refs.uToast.show({
									type: 'error',
									message: "网络失败!",
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
								});
							}
							
						},
						(error)=>{
							that.isRequest = false;
							that.mask = false;
							that.$refs.uToast.show({
								type: 'error',
								message: "服务器异常!",
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
							});
						}
						)
						
					}
				}else{
					that.$refs.uToast.show({
						type: 'error',
						message: "异常错误!",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					});
				}
				
				
				
			}

		}
	}
</script>

<style>
	.list{
		
		margin:0 auto;
		width: 95%;
		border-radius: 7rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		background-color: white;
	}
	.content{
		padding-left: 25rpx;
		padding-right: 25rpx;
	}
	.top{
		line-height: 70rpx;
		
		height: 70rpx;
		display: flex;
		justify-content: space-between;
	}
	.middle{
		
	}
	.name{
		height: 70rpx;
		line-height: 70rpx;
	}
	.bottom{
		line-height: 70rpx;
		height: 70rpx;
		display: flex;
		justify-content: space-between;
	}
	.btn{
		
		margin-top: 12rpx;
	}

</style>

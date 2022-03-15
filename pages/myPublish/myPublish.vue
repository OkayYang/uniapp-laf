<template>
	<view style="height: 300rpx;height: 300rpx;">
		<van-tabs :active="active" @change="change">
			<van-tab title="失物招领">
			</van-tab>
			<van-tab title="寻物启示">
			</van-tab>
			<van-tab title="我的认领"></van-tab>
		</van-tabs>
		<view>
			<view class="swipe-action u-border-top u-border-bottom">
				<view class="swipe-action__content" v-for="(lost,index) in lostList">
					<u-swipe-action style="margin: -30rpx 0 0 0;">
						<u-swipe-action-item :options="options1" @click="deleteItem(lost.relId)" :name="index" :key="lost.relId">
							<view class="item"
								style="box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.1), 0 0rpx 5rpx 0 rgba(0, 0, 0, 0.19);width: 720rpx;height: 300rpx;margin:0 auto"
								@click='navigateDetail(lost.relId)'>
								<view class="item-header" style="display: flex;margin: 0rpx 0 0 0;">
									<view @click.stop="previewImage(lost.stuAvatar)" style="margin:28rpx 0 0 15rpx ;">
										<u-avatar :src="lost.stuAvatar" size="30"></u-avatar>
									</view>
									<view class="info" style="display: flex;flex-direction: column;">
										<view style="margin: 22rpx 0 0 20rpx;">
											<b style="font-size: 25rpx;">{{lost.stuNick}}</b>
										</view>
										<view style="margin: 0 0 0 20rpx;">
											<text style="font-size: 25rpx;color:#909399">{{lost.createTime}}</text>
										</view>
									</view>
									<view class="tag"
										style="width:370rpx;display: flex; align-items:flex-end;justify-content: space-around">
										<view style="margin: 0 0 0 30rpx;width: 155rpx;">
											<u-tag shape="circle" :text="lost.relStatus==1?'失物招领':'寻物启事'"
												:type="lost.relStatus==1?'primary':'warning'"></u-tag>
										</view>
										<view style="margin: 0 0 0 0rpx;">
											<u-tag shape="circle" :type="lost.relFlag==1?'error':'success'"
												:text="lost.relFlag==1?'待解决':'已解决'"></u-tag>
										</view>
									</view>
								</view>
								<view class="detail" style="display: flex;height: 200rpx;">
									<image :src="baseUrl+lost.relImage"
										style="height:170rpx;width: 170rpx;border-radius: 30rpx;margin:20rpx 0 10rpx 20rpx;"
										mode="aspectFill" @click.stop="previewImage(baseUrl+lost.relImage)" />
									<view class="content" style="margin: 20rpx 0 0 50rpx;">
										<view style="display: flex;">
											<text
												style="color:#909399;margin: 5rpx 0 0 0;font-size: 27rpx; ">物品种类：</text>
											<view>
												<u-tag :text="category[lost.relCateId]" plain size="mini"></u-tag>
											</view>
										</view>
										<view style="display: flex;margin: 5rpx 0 0 0;">
											<view style="width: 85rpx;">
												<text style="color: #909399;font-size: 28rpx;flex-basis: 0;">标题：</text>
											</view>
											<view>
												<text style="font-size: 27rpx;">{{lost.relTitle|ellipsis}}</text>
											</view>
										</view>
										<view style="display: flex;margin: 8rpx 0 0 0;">
											<view style="width: 85rpx;">
												<text style="color: #909399;font-size: 27rpx;">描述：</text>
											</view>
											<view>
												<text style="font-size: 27rpx;">{{lost.relDesc| ellipsis}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</u-swipe-action-item>
					</u-swipe-action>
				</view>
			</view>
		</view>
		<tui-modal :show="deletePane.show" title="提示" content="确定删除该帖子吗？" @click="handleDelete"></tui-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import tuiModal from "@/components/thorui/tui-modal/tui-modal"

	export default {
		components: {
			tuiModal
		},
		filters: {
			ellipsis(value) {
				if (!value) return ''
				if (value.length > 15) {
					return value.slice(0, 15) + '...'
				}
				return value
			}
		},
		data() {
			return {
				deletePane: {
					show: false,
					tid:null,
				},
				active: 0,
				lostList: '',
				findList: '',
				baseUrl: request.getHost(),
				options1: [{
					text: '删除',
					style: {
						backgroundColor: '#ff0004'
					}
				}],
				options2: [{
					text: '删除',
					style: {
						backgroundColor: '#ff0004'
					}
				}],

				category: [],


			}
		},
		onLoad(res) {
			console.log("onload,my");
			this.onLoad1(res.id);
		},
		methods: {
			onLoad1(id){
				this.active=id;
				console.log(this.active);
				request.getRequest('/wx/api/category/treeData', null, (res) => {
					let option = [];
					res.data.forEach((element) => {
						option.push({
							text: element.name,
							value: element.id
						});
					});
					option.forEach((item) => {
						this.category.push(item.text);
					});
				});
				request.getRequest(
					'/wx/api/release/auth/publish', {
						id:id 
					},
					(res) => {
						this.lostList = res.data.rows;
					},
					(error) => {
				
					}
				);
			},
			navigateDetail(tid) {
				uni.navigateTo({
					url: "/pages/detail/detail?tid=" + tid,
				});
			},
			previewImage(src) {
				uni.previewImage({
					urls: [src],
				})
			},
			change(res) {
				let id =1;
				if(res.detail.index==2){
					id = 4;
				}else{
					id = res.detail.index + 1;
				}
				
				this.active = res.detail.index;
				request.getRequest(
					'/wx/api/release/auth/publish', {
						id: id,
					},
					(res) => {
						this.lostList = res.data.rows;
					},
					(error) => {

					}
				);
			},
			deleteItem(tid) {
				this.deletePane.show = true;
				this.deletePane.tid=tid;
			},
			handleDelete(res) {
				if (res.index == 0) {
					this.deletePane.show = false;
				} else {
					request.getRequest(
							'/wx/api/release/auth/delete', {
								id: this.deletePane.tid
							},
							(res) => {
								this.$refs.uToast.show({
									type: 'success',
									message: "删除帖子成功",
									duration: 700,
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
								});
								this.onLoad1(this.active);
							}
							
						),
						this.deletePane.show = false;
				}
			}
		}
	}
</script>

<style>
	.swipe-action__content {
		margin: 10rpx 0 0 0;
	}
</style>

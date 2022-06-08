<template>
	<view>
		<u-loading-page :loading="load.show"></u-loading-page>
		<view v-if="!load.show" class="MainPage">
			<view class='message'
				style="background-color: #FFFFFF;width: 95%;margin: 0 auto;box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.1), 0 0rpx 5rpx 0 rgba(0, 0, 0, 0.19);border-radius: 20rpx;"
				@click="blur()">
				<view class="basicInfo" style="display: flex;margin: 15rpx 0 0 15rpx;">
					<view style="margin-top: 15rpx;">
						<u-avatar :src="info.stuAvatar"></u-avatar>
					</view>
					<view style="display: flex;flex-direction: column;margin: 10rpx 0 0 20rpx;">
						<view>
							<b style="width: 200rpx;">{{info.stuNick}}</b>
						</view>
						<view style="width: 240rpx;margin: 1rpx 0 0 0;">
							<text style="color:#909399;font-size: 23rpx;">{{info.createTime}}</text>
							<!-- <text style="color:#909399;font-size: 23rpx;">{{store.state.username}}</text> -->
						</view>
					</view>
					<view class="special" style="display: flex;align-items: center;padding: 0 0 0 40rpx;">
						<view>
							<u-tag shape="circle" :text="info.relStatus==1?'失物招领':'寻物启事'"
								:type="info.relStatus==1?'primary':'warning'"></u-tag>
						</view>

						<view style="margin: 0 0 0 20rpx;">
							<u-tag shape="circle" :type="info.relFlag==1?'error':'success'"
								:text="info.relFlag==1?'待解决':'已解决'"></u-tag>
						</view>
					</view>
				</view>
				<view class="detail" style="width: 93%;margin:20rpx auto 0 auto;">
					<!-- <u--text :text="info.describe"></u--text> -->

					<view style="margin: 0 0 20rpx 0;display: flex;">
						<view style="margin: 10rpx 0 0 0;">
							<text style="font-weight: 700;">标题:{{info.relTitle}}</text>
						</view>
					</view>
					<view style="margin: 0 0 20rpx 0rpx;" v-if="!stringIsNull(info.relDesc)">
						<text>内容:{{info.relDesc}}</text>
					</view>
					<view style="display: flex;">
						<text>物品种类:</text>
						<view style="margin: 0 0 8rpx 20rpx;">
							<u-tag :text="category[info.relCateId-1]" plain size="mini"></u-tag>
						</view>
					</view>
					<view v-if="info.relCampus!=null" style="margin: 0 0 20rpx 0;">
						<text>校区:{{info.relCampus}}</text>
					</view>
					<view v-if="!stringIsNull(info.relContact)" style="margin: 0 0 20rpx 0;display: flex;">
						<view>
							<text>联系方式:</text>
						</view>
						<view style="margin: 5rpx 0 0 0;">
							<u-tooltip v-if="info.relContact!=null" :text='info.relContact' size="17" bgColor="#e3e4e6"
								style="margin: 20rpx 0 0 0;"></u-tooltip>
						</view>
					</view>

					<view v-if="!stringIsNull(info.createPlace)" style="">
						<text>地点:{{info.createPlace}}</text>
					</view>

					<view v-if="!stringIsNull(info.relImage)">
						<image :src="baseUrl+info.relImage" mode="aspectFit" style="width: 350rpx;height: 350rpx;"
							@click.stop="previewImage(baseUrl+info.relImage)">
						</image>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<view>
							<text style="color: #909399;font-size: 30rpx;">阅读量:{{info.relFlow}}</text>
						</view>
						<view @click="showInfo()" v-if="info.relFlag==2">
							<text style="color:#2979ff" v-if="info.relStatus==1">查看认领者信息</text>
							<text style="color:#2979ff" v-else>查看归还者信息</text>
						</view>
					</view>


				</view>

			</view>
			<view v-if="comments.length!=0" class='comment'
				style="background-color: #FFFFFF;;width: 95%;margin: 0 auto;box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.1), 0 0rpx 5rpx 0 rgba(0, 0, 0, 0.19);border-radius: 20rpx;margin: 20rpx auto 0 auto;">
				<view>
					<view class="comment_header" style="display: flex;justify-content: space-between;" @click="blur()">
						<view style="margin: 18rpx 0 0 25rpx;">
							<text>评论</text>
						</view>
					</view>
					<view v-for="comment in comments" style="margin: 15rpx 0 0 0;">
						<view class="userComment" style="margin: -5rpx 0 15rpx 0;" @click="blur()">
							<view class="user-header" style="display: flex;margin: 0 0 0 20rpx;">
								<view @click.stop="previewImage(comment.mainComments.comm_user.avatar)">
									<u-avatar :src="comment.mainComments.comm_user.avatar" style="margin-top: 10rpx;"
										size="72rpx">
									</u-avatar>
								</view>
								<view class="info" style="display: flex;flex-direction: column;margin: 0 0 0 20rpx;">
									<b>{{comment.mainComments.comm_user.nickName}}</b>
									<text
										style="font-size: 25rpx;color:#909399">{{comment.mainComments.comment.createTime}}</text>
								</view>
								<view style="margin: 20rpx 0 0 250rpx;"
									v-if="comment.mainComments.comm_user.uid===author.uid"
									@click="longClick(comment.mainComments.comment.comId)">
									<text style="color:#19a3ff;font-size: 30rpx;">删除</text>
								</view>
							</view>
							<view class="comment_describe" style="margin: 12rpx 0 0 80rpx;width: 590rpx;">
								<u-read-more showHeight="160" :toggle="true" :shadowStyle="shadowStyle" textIndent="1em"
									closeText="展开">
									<text>{{comment.mainComments.comment.comContent}}</text>
								</u-read-more>
								<view v-if="comment.mainComments.comment.comImage!=null">
									<image @click.stop="previewImage(baseUrl+comment.mainComments.comment.comImage)"
										mode="aspectFit" :src="baseUrl+comment.mainComments.comment.comImage"
										style="width: 150rpx;height: 150rpx;"></image>
								</view>
							</view>
							<view class="comment_function"
								style="display: flex;justify-content: flex-start;margin: 30rpx 0 0 0;">
								<view style="margin:0 0 0 450rpx;display: flex;">

								</view>
								<view class="reply"
									style="display: flex;align-items: center;justify-content: center;height: 100rpx;width:50rpx;margin: -30rpx 0 0 145rpx;"
									@click.stop="replyInfo(comment.mainComments,comment.mainComments.comment.comId)">
									<view style="margin: 0 0 0 0;">
										<image src="../../static/comment.png" style="width: 45rpx;height: 45rpx;">
										</image>
									</view>
								</view>
							</view>
						</view>
						<view v-if="comment.replyComments!==null" class="reply_position"
							style="background-color: #f3f3f3;width: 85%;margin: 0 0 15rpx 80rpx;box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.1), 0 0rpx 5rpx 0 rgba(0, 0, 0, 0.19);border-radius: 5rpx;">
							<view class="reply_details" style="margin: 0 0 0 20rpx;"
								v-for="reply in comment.replyComments">
								<view @touchend="touchend(reply,reply.comment.comId)" @touchmove="touchmove()"
									@touchstart="touchstart(reply,reply.comment.comId)"
									:style="{backgroundColor:reply.comment.comStar}">
									<span v-if="reply.comment.parentId===comment.mainComments.comment.comId"
										style="color: #19a3ff;">{{reply.comm_user.nickName}}：</span>
									<span v-else><span
											style="color:  #19a3ff;">{{reply.comm_user.nickName}}</span>回复<span
											style="color: #19a3ff;">{{reply.reply_user.nickName}}：</span></span>
									<text>{{reply.comment.comContent}}</text>
									<view v-if="reply.comment.comImage!==null">
										<image @touchstart.stop="previewImage(baseUrl+reply.comment.comImage)"
											mode="aspectFit" :src="baseUrl+reply.comment.comImage"
											style="width: 150rpx;height: 150rpx;"></image>
									</view>
								</view>
							</view>
						</view>
						<u-line color="#d4d8dd"></u-line>
					</view>
				</view>
			</view>
			<view v-else @click="blur()" style="padding: 30rpx 0 0 0;">
				<u-empty mode="message" icon="http://cdn.uviewui.com/uview/empty/message.png" :text="emptyComment.text"
					width="200" height="200">
					<view style="margin: -85rpx 0 0 0;">
						<text style="color: #c0c4cc;">评论为空</text>
					</view>
				</u-empty>
			</view>
			<!-- <u-toast ref="uToast"></u-toast> -->
			<!-- <u-popup :show="isPopup" mode="bottom" bgColor="transparent">
				<view style="background-color: #b4b4b4;border-radius: 30rpx;">
					<view class="popup" style="margin: 0 0 10rpx 0;" @click.stop="deleteComment()"><text
							style="color: #ff0004;">删除</text>
					</view>
					<view class="popup" @click.stop="isPopup=false"><text style="color: #2979FF;">取消</text>
					</view>
				</view>
			</u-popup> -->
			<view>
				<tui-actionsheet :show="isPopup" :item-list="itemList" tips="确定删除该评论吗？" @click="deleteComment()"
					@cancel="isPopup=false">
				</tui-actionsheet>
			</view>
			<u-tabbar style="display: flex;align-items: center;position:relative;top:0;" :border="false">
				<view v-if="!input.focus" class="unfocus-tabbar" style="display: flex;width: 100%;align-items: center;">
					<view>
						<view style="margin: 0 0 0 30rpx;display: flex;">
							<view style="margin: 5rpx 0 0 10rpx;">
								<button open-type="share" style="display: flex;">
									<image src="../../static/forwarding.png"
										style="width: 50rpx;height: 50rpx;margin: 15rpx 0 0 0;"></image>
									<view style="margin: -10rpx 0 0 10rpx;">
										<text style="color: #767a82;font-size:35rpx;">转发</text>
									</view>
								</button>
							</view>
						</view>
					</view>
					<view>
						<view style="margin: 0 0 0 100rpx;display: flex;" @click="doComment()">

							<image src="../../static/comment.png" style="width: 50rpx;height: 50rpx;">
								<view style="margin: 5rpx 0 0 10rpx;">
									<text style="color: #767a82;">评论</text>
								</view>
						</view>
					</view>
					<view>
						<view v-if="info.relFlag!=2" style="margin: 0 0 0 140rpx;display: flex;" @click="accept()">
							<image src="../../static/accept.png" style="width: 50rpx;height: 50rpx;">
								<view style="margin: 5rpx 0 0 10rpx;" v-if="info.relStatus==1">
									<text style="color: #767a82;" user-select>认领</text>
								</view>
								<view style="margin: 5rpx 0 0 10rpx;" v-if="info.relStatus==2">
									<text style="color: #767a82;" user-select>归还</text>
								</view>
						</view>
						<view v-else-if="info.relClaimId==author.uid" style="margin: 0 0 0 100rpx;display: flex;"
							@click="returnThing">
							<image src="../../static/accept.png" style="width: 50rpx;height: 50rpx;">
								<view style="margin: 5rpx 0 0 10rpx;" v-if="info.relStatus==1">
									<text style="color: #767a82;" user-select>取消认领</text>
								</view>
								<view style="margin: 5rpx 0 0 10rpx;" v-if="info.relStatus==2">
									<text style="color: #767a82;" user-select>取消归还</text>
								</view>
						</view>
						<view v-else style="margin: 0 0 0 130rpx;display: flex;">
							<image src="../../static/accept.png" style="width: 50rpx;height: 50rpx;">
								<view style="margin: 7rpx 0 0 0;">
									<text style="color: #767a82;" user-select>已认领</text>
								</view>
						</view>
					</view>
					<tui-modal :show="renling.show" :title="info.relStatus==1?'请勿冒领！':'提示'"
						:content="info.relStatus==1?'确定认领吗？':'确定已找到该物品？'" :button="renling.button" shape="circle"
						@click="acceptClick" :size="30" color="#606266"></tui-modal>
					<tui-modal :show="renling.reShow" title="提示" content="确定取消认领吗？" :button="renling.button1"
						shape="circle" @click="cancelAccept" :size="30" color="#606266"></tui-modal>

				</view>
				<view v-else style="display: flex;">
					<view v-if="input.isUpload" style="position: absolute;top:-160rpx;left:20rpx;">
						<image :src="input.uploadPath" mode="aspectFit" @click.stop="previewImage(input.uploadPath)"
							style="height: 150rpx;width: 150rpx;">
						</image>
						<view style="position: absolute;top:-20rpx;left:130rpx;font-size: 40rpx;color: #767A82;"
							@click="cancelUpload">
							<image src="../../static/close.png" style="width: 50rpx;height: 50rpx;"></image>
						</view>
					</view>
					<image src="/static/picture.png" mode="scaleToFill"
						style="width: 60rpx;height: 40rpx;margin: 35rpx 0 0 15rpx;" @click="uploadPicture"></image>
					<view class="comment" style="width: 480rpx;margin: 20rpx 0 0 20rpx;">
						<u-search :searchIcon="input.commentIcon" :placeholder="input.placeholder" shape="round"
							bgColor="#f4f5e9" :showAction="false" @clear="clear" v-model="input.msg" :animation="true"
							:focus="input.focus">
						</u-search>

					</view>
					<view class="submit" style="width: 150rpx;height: 20rpx;margin:20rpx 0 0 35rpx">
						<tui-button width="120rpx" height="60rpx" type="blue" plain @click="comment">评论</tui-button>
					</view>
				</view>

			</u-tabbar>
			<tui-modal :show="loginPane.show" custom>
				<view class="tui-modal-custom">
					<view style="display: flex;justify-content: center;margin: -20rpx 0 20rpx 0;">
						<image src="/static/alert.png" class="tui-tips-img" style="width: 120rpx;height: 120rpx;">
						</image>
					</view>
					<view class="tui-modal-custom-text"
						style="display: flex;justify-content: center;margin: 0 0 20rpx 0;">
						<text style="color: #606266;font-size: 30rpx;">您还未登陆，请先登录!</text>
					</view>
					<view style="display: flex;justify-content: center;">
						<view  style="margin: 0 30rpx 0 0;width: 250rpx;">
							<tui-button height="72rpx" :size="28" type="danger" shape="circle" @click="check"  plain>取消</tui-button>
						</view>
						<view  style="margin: 0 0 0 30rpx;width: 250rpx;">
							<tui-button height="72rpx" :size="28" type="danger" shape="circle" @click="login()">登陆</tui-button>
						</view>
					</view>
				</view>
			</tui-modal>
			
		</view>
		<tui-loading text="加载中..." v-if="isRequest"></tui-loading>
		<u-toast ref="uToast"></u-toast>
		<u-overlay :show="mask" :opacity="0.3"></u-overlay>
		<u-popup :show="drawer.visible" @close="closeDrawer" mode="center" round=10 :closeable="true"
			:closeOnClickOverlay="false" :overlayOpacity="0.7">
			<view class="d-container"
				style="border-radius: 10rpx;width: 600rpx;box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.1), 0 0rpx 5rpx 0 rgba(0, 0, 0, 0.19);overflow: hidden;display: flex;align-items: center;">
				<view style="width: 85%;margin: 0 auto 30rpx auto">
					<view class="avatar"
						style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin: 30rpx 0 0 ;">
						<u-avatar v-if="info.claimAvatar!=null" :src="info.claimAvatar" size="60"></u-avatar>
						<view style="display: flex;align-items: center;justify-content: center;margin:20rpx 0 20rpx 0"
							v-if="info.claimName!==null&&!stringIsNull(info.claimName)">
							<u-tooltip :text="info.claimName" bgColor="#e3e4e6"></u-tooltip>
						</view>
					</view>
					<view class="form" style="width: 500rpx;margin: 0 80% 0 1%;">
						<view style="display: flex; margin: 20rpx 0 0 0;" v-if="!stringIsNull(info.claimQq)&&info.relStatus==1">
							<view style="display: flex;align-items: center;width: 210rpx;justify-content: flex-end;">QQ：
							</view>
							<u-tooltip :text="info.claimQq" bgColor="#e3e4e6"></u-tooltip>
						</view>
						<view style="display: flex;margin: 20rpx 0 0 0;" v-if="!stringIsNull(info.claimTel)&&info.relStatus==1">
							<view style="display: flex;align-items: center;width: 210rpx;justify-content: flex-end;">电话：
							</view>
							<u-tooltip :text="info.claimTel" bgColor="#e3e4e6"></u-tooltip>
						</view>

						<view style="display: flex;margin: 20rpx 0 0 0;" v-if="!stringIsNull(info.claimNick)">
							<view style="display: flex;align-items: center;width: 210rpx;justify-content: flex-end;">
								微信名：</view>
							<u-tooltip :text="info.claimNick" bgColor="#e3e4e6"></u-tooltip>
						</view>
						<view style="display: flex;margin: 20rpx 0 0 0;" v-if="!stringIsNull(info.relTime)">
							<view v-if="info.relStatus==1" style="display: flex;align-items: center;width: 210rpx;justify-content: flex-end;;">
								认领时间：
							</view>
							<view v-else="info.relStatus==1" style="display: flex;align-items: center;width: 210rpx;justify-content: flex-end;;">
								归还时间：
							</view>
							<u-tooltip :text="info.relTime" bgColor="#e3e4e6"></u-tooltip>
						</view>

					</view>
				</view>
			</view>
		</u-popup>
	</view>


</template>

<script>
	import tuiButton from "@/components/thorui/tui-button/tui-button"
	import tuiModal from "@/components/thorui/tui-modal/tui-modal"
	import tuiLoading from "@/components/thorui/tui-loading/tui-loading"
	import tuiDrawer from "@/components/thorui/tui-drawer/tui-drawer"
	import tuiActionsheet from "@/components/thorui/tui-actionsheet/tui-actionsheet"
	import formatTime from "@/utils/formatTime.js"
	import request from "@/utils/request.js"
	import strIsNull from "@/utils/strIsNull.js"


	export default {
		components: {
			tuiButton,
			tuiModal,
			tuiLoading,
			tuiActionsheet,
			tuiDrawer

		},

		data() {
			return {

				load: {
					show: true,
					list: false,
					comment: false,
				},
				drawer: {
					visible: false,
					

				},
				mask: false,
				isRequest: false,
				baseUrl: request.getHost(),
				author: {
					uid: null,
					avatar: null,
					nickName: null,
				},
				comments: [],
				info: null,
				input: {
					uid: null,
					cid: 1000,
					commented: null,
					msg: '',
					commentIcon: '',
					isUpload: false,
					uploadPath: '',
					focus: false,
					placeholder: '请发送一条友善的评论',
					mainComment: null,
					acceptPeople: null,
				},
				delete: {
					id: '',
				},
				option: '',
				tid: '',
				category: [],
				shadowStyle: {
					"backgroundImage": "none",
					'paddingTop': "0",
					'marginTop': "20rpx"
				},
				timeout: 0,
				waitTime: 5,
				isPopup: false,
				renling: {
					show: false,
					reShow: false,
					button: [{
							text: "取消",
							type: "red",
							plain: true
						},
						{
							text: "5s",
							type: "gray",
						}
					],
					button1: [{
							text: "取消",
							type: "red",
							plain: true
						},
						{
							text: "确认",
							type: "red",
						}
					],
				},
				loginPane: {
					show: false,
				},
				emptyComment: {
					text: " ",
				},
				itemList: [{
					text: "删除",
					color: "#fe2c02"
				}]


			}
		},
		onLoad(option) {
			this.reload(option);
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '页面详细',
				path: 'pages/detail/detail?tid=' + this.tid,
			}
		},
		onPullDownRefresh() {
			uni.showNavigationBarLoading();
			uni.stopPullDownRefresh({
				success: (res) => {
					this.reload(this.option);
					uni.hideNavigationBarLoading();
				}
			});

		},

		methods: {
			reload(option) {

				this.option = option;
				this.tid = option.tid;
				this.category = [];
				request.getRequest('/wx/api/category/treeData', null, (res) => {
					res.data.forEach((element) => {
						this.category.push(element.name);
					});
				});
				request.getRequest('/wx/api/release/skim?tid=' + this.tid, null);
				if (this.author.uid == null) {
					uni.getStorage({
						key: 'userInfo',
						success: (res) => {
							this.author.uid = res.data.stuId;
							this.author.avatar = res.data.stuImage;
							this.author.nickName = res.data.stuNick;
						}
					});
				}
				request.getRequest(
					'/wx/api/info/list', {
						relId: this.tid
					},
					(res) => {
						var info = res.data;
						this.info = info;
						this.load.list = true;
						if (this.load.comment) {
							this.load.show = false;
						}

					}
				);
				request.getRequest(
					'/wx/api/info/test', {
						relId: this.tid
					},
					(res) => {
						var comments = res.data;
						this.comments = comments;
						this.load.comment = true;
						if (this.load.list) {
							this.load.show = false;
						}

					}
				);
				// while(true){
				// 	if(this.load.comment&this.load.list){
				// 		this.load.show = false;
				// 		this.load.comment=false;
				// 		this.load.list=false;
				// 	}

				// }
			},
			clear() {
				this.input.msg = '';
			},
			uploadPicture() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album'],
					success(res) {
						that.input.uploadPath = res.tempFilePaths[0];
						that.input.isUpload = true;
					}
				})
			},
			cancelUpload() {
				this.input.isUpload = false;
			},
			previewImage(src) {
				uni.previewImage({
					urls: [src],
				})
			},
			changeGood(comment) {
				if (comment.isGood) {
					comment.goodNum--;
				} else {
					comment.goodNum++;
				}
				comment.isGood = !comment.isGood;

			},
			comment() {
				if (this.isLogin()) {
					let that = this;
					uni.requestSubscribeMessage({
						tmplIds: ['WjSjw0WyRL-bTJ8KLZ0mL6bJLevOi3Qfw727iWPjdvg',
							'ePAwjtm9WKRLyGdrce0IiQtO9jE6l7mnY1KhT2Nvm6U',
							'yN2LMy5FBS8ha9Fq-akQTag3SWgx9uvgTG5J3ABVGYw'
						],
						success(res) {
							console.log("SubscribeMessageSuccess");
							console.log(res);
						},
						fail(res) {
							console.log("SubscribeMessageError");
							console.log(res);
						},
						complete() {
							that.comment1();
						}
					});

				} else {
					this.loginPane.show = true;
				}

			},
			comment1() {
				if (strIsNull(this.input.msg) && !this.input.isUpload) {
					this.$refs.uToast.show({
						type: 'default',
						message: "评论不能为空!",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
					});
				} else {
					this.isRequest = true;
					this.mask = true;
					let that = this;
					let now = new Date();
					let time = formatTime(now);
					let urlImage = null;
					if (this.input.isUpload) {
						uni.uploadFile({
							url: that.baseUrl + '/wx/api/info/upload',
							filePath: that.input.uploadPath,
							name: 'file',
							success: (res) => {
								console.log(res);
								res = JSON.parse(res.data)
								if (res.code == 0) {
									urlImage = res.msg;
									console.log(that.input);
									request.postRequest(
										'/wx/api/info/auth/comment/add', {
											comRelId: that.tid,
											comContent: that.input.msg,
											parentId: that.input.acceptPeople,
											comImage: urlImage,
										},
										(res) => {
											if (res.data.code == 0) {
												that.isRequest = false;
												that.mask = false;
												request.getRequest(
													'/wx/api/info/test?relId=' + this.tid, null, (
														res) => {
														that.comments = res.data;
													}
												)
												this.$refs.uToast.show({
													type: 'success',
													message: "发布评论成功",
													duration: 700,
													iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
												});
												this.input.msg = '';
												this.input.isUpload = false;
												this.input.focus = false;
												this.input.mainComment = null;
												this.input.acceptPeople = null;
												this.input.cid++;
												this.input.placeholder = "请发送一条友善的评论";
											} else if (res.data.code == 406) {
												that.isRequest = false;
												that.mask = false;
												that.paneAlertMsg("内容包含敏感信息");

											} else {
												that.isRequest = false;
												that.mask = false;
												that.paneAlert();
											}

										},
										(error) => {
											that.isRequest = false;
											that.mask = false;
											that.paneAlert();

										}

									);
								} else if (res.code == 406) {
									that.isRequest = false;
									that.mask = false;
									that.paneAlertMsg("图片包含敏感信息！");
								} else {
									that.isRequest = false;
									that.mask = false;
									that.paneAlert();
								}

							}
						})
					} else {
						let that = this;
						that.isRequest = true;
						that.mask = true;
						request.postRequest(
							'/wx/api/info/auth/comment/add', {
								comRelId: that.tid,
								comContent: that.input.msg,
								parentId: that.input.acceptPeople,
								comImage: urlImage,
							},
							(res) => {
								if (res.data.code == 0) {
									that.isRequest = false;
									that.mask = false;
									request.getRequest(
										'/wx/api/info/test?relId=' + this.tid, null, (res) => {
											that.comments = res.data;
										}
									)
									this.$refs.uToast.show({
										type: 'success',
										message: "发布评论成功",
										duration: 700,
										iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
									});
									this.input.msg = '';
									this.input.isUpload = false;
									this.input.focus = false;
									this.input.mainComment = null;
									this.input.acceptPeople = null;
									this.input.cid++;
									this.input.placeholder = "请发送一条友善的评论";
								} else if (res.data.code == 406) {
									that.isRequest = false;
									that.mask = false;
									that.paneAlertMsg("内容包含敏感信息");
								} else {
									that.isRequest = false;
									that.mask = false;
									that.paneAlert();
								}
							},
							(error) => {
								that.isRequest = false;
								that.mask = false;
								that.paneAlert();
							}
						);
					}



				}
			},
			replyInfo(mainComment, acceptPeople) {

				this.input.focus = true;
				this.input.placeholder = "回复:" + mainComment.comm_user.nickName;
				this.input.mainComment = mainComment;
				this.input.acceptPeople = acceptPeople;

			},

			blur() {
				this.input.msg = '';
				this.input.isUpload = false;
				this.input.focus = false;
				this.input.mainComment = null;
				this.input.acceptPeople = null;
				this.input.placeholder = "请发送一条友善的评论";

			},

			judgeComment(reply, replys) {
				let result;
				this.comments.forEach((item) => {
					if (item.cid == reply.pid) {
						result = reply.name;
					}
				})
				if (result === undefined) {
					replys.forEach((temp) => {
						if (temp.cid == reply.pid) {
							result = temp.name;
						}
					})
				}
				return result;
			},
			touchend(mainComment, acceptPeople) {
				clearTimeout(this.timeout);
				mainComment.comment.comStar = "#f3f3f3;";
				if (this.timeout < 700) {
					this.replyInfo(mainComment, acceptPeople);
				}
			},
			touchstart(mainComment, acceptPeople) {

				let that = this;
				that.timeout = 0;
				if (mainComment.comm_user.uid === that.author.uid) {
					clearTimeout(that.timeout); //清除定时器
					mainComment.comment.comStar = "#cbcbcb";
					that.timeout = setTimeout(function() {
						that.longClick(acceptPeople);
						that.timeout = 701;
					}, 700); //这里设置定时
				}
			},
			touchmove() {
				clearTimeout(this.timeout); //清除定时器
				this.timeout = 701;
			},
			longClick(acceptPeople) {
				let that = this;
				this.isPopup = true;
				this.delete.id = acceptPeople;

			},
			deleteComment() {
				this.isRequest = true;
				this.mask = true;
				request.getRequest(
					'/wx/api/info/auth/comment/delete?id=' + this.delete.id, null,
					(res) => {
						if (res.data.code == 0) {
							this.$refs.uToast.show({
								type: 'success',
								message: "删除评论成功",
								duration: 700,
								iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
							});
							request.getRequest(
								'/wx/api/info/test?relId=' + this.tid, null, (res) => {
									this.comments = res.data;
									this.isRequest = false;
									this.mask = false;
									this.isPopup = false;
								}
							)
						} else {
							this.isPopup = false;
							this.isRequest = false;
							this.mask = false;
							paneAlert();
						}
					},
					(error) => {
						that.isRequest = false;
						that.mask = false;
						paneAlert();
					});
			},
			accept() {
				if (this.isLogin()) {
					this.renling.show = true;
					this.timer = setInterval(() => {
						this.waitTime--;
						console.log(this.waitTime);
						// console.log(this.renling.button[2]);
						this.renling.button[1].text = this.waitTime + "s";
						if (this.waitTime === 0) {
							clearInterval(this.timer);
							this.renling.button[1].text = "确认";
							this.renling.button[1].type = "red";
						}
					}, 1000)
				} else {
					this.loginPane.show = true;
				}
			},
			acceptClick(res) {
				if (res.index == 0) {
					clearInterval(this.timer);
					this.waitTime = 5;
					this.renling.show = false;
					this.renling.button[1].text = "5s";
					this.renling.button[1].type = "gray";
				} else {
					if (this.waitTime == 0) {
						this.isRequest = true;
						this.mask = true;
						request.getRequest(
							'/wx/api/info/auth/claim?relId=' + this.tid, null,
							(res) => {
								if (res.data.code == 0) {
									this.isRequest = false;
									this.mask = false;
									this.renling.show = false;
									this.$refs.uToast.show({
										type: 'success',
										message: "认领成功",
										duration: 700,
										iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
									});

									this.renling.show = false;
									this.waitTime = 5;
									this.renling.button[1].text = "5s";
									this.renling.button[1].type = "gray";
									this.$store.state.fresh = true;
									this.reload(this.option);

								} else {
									this.isRequest = false;
									this.mask = false;
									this.renling.show = false;
									this.paneAlert();
								}
							},
							(error) => {
								this.isRequest = false;
								this.mask = false;
								this.paneAlert();
							}
						)
					}
				}
			},
			/**
			 *
			 * @param {t帖子ID} event
			 */

			doComment() {
				this.input.focus = true;
			},
			isLogin() {
				if (this.author.uid === null) {
					return false;
				} else {
					return true;
				}
			},
			login() {
				uni.switchTab({
					url: '../user/user',
				})
			},
			cancelAccept(res) {
				if (res.index == 0) {
					this.renling.reShow = false;
				} else {
					this.renling.reShow = false;
					this.isRequest = true;
					this.mask = true;
					request.getRequest(
						'/wx/api/info/auth/unClaim?relId=' + this.tid, null,
						(suc) => {
							if (suc.data.code == 0) {
								this.isRequest = false;
								this.mask = false;
								this.$refs.uToast.show({
									type: 'success',
									message: "取消认领成功",
									duration: 700,
									iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png',
								});
								this.reload(this.option);
								this.$store.state.fresh = true;
							} else {
								this.isRequest = false;
								this.mask = false;
								this.paneAlert();
							}

						},
						(error) => {
							this.isRequest = false;
							this.mask = false;
							this.paneAlert();
						}
					);
				}

			},
			paneAlert() {
				this.$refs.uToast.show({
					type: 'fail',
					message: "异常错误",
					duration: 700,
				});
			},
			paneAlertMsg(msg) {
				this.$refs.uToast.show({
					type: 'fail',
					message: msg,
					duration: 700,
				});
			},
			showInfo() {
				if(this.isLogin()){
					this.drawer.visible = true;
				}else{
					this.loginPane.show=true;
				}
				
			},
			closeDrawer() {
				this.drawer.visible = false;
			},
			stringIsNull(str) {
				return strIsNull(str);
			},
			check(){
				this.loginPane.show=false;
			},
			returnThing(){
				this.renling.reShow=true;
			}
		}

	}
</script>

<style>
	page {
		background-color: #f6f7fa;
	}

	

	.tui-modal-content {
		margin: 20rpx 0 0 0;
	}

	.comment_function_num {
		font-size: 30rpx;
		margin: 0 0 0 15rpx;

	}

	.u-read-more__toggle {
		width: 90rpx;
		height: 40rpx;
	}


	.popup {
		background-color: #d9d9d9;
		height: 130rpx;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	button {
		background-color: #FFFFFF;
	}

	button::after {
		border: none;

	}

	button::after {
		border: 0;
	}

	button[disabled] {
		background-color: #FFFFFF;
		color: #FFFFFF;
	}

	.button-hover {
		color: rgba(0, 0, 0, 0.6);
		background-color: #f3f3f3;
	}

	.u-tooltip__wrapper__text {
		font-family: simsun;
	}
</style>

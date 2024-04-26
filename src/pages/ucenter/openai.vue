<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<view class="container">
				<uniNavHeader :title="$t('聊天支持')" isback></uniNavHeader>
				<view class="bs-wrapper">
					<!-- open Ai -->
					<scroll-view scroll-y="true" style="height: calc(100vh - 200px);" :scroll-into-view="scrollMsg">
						<view class="u-flex u-col-top" v-for="(item,index) in openMsg" :key="`openMsg${index}`"
							:class="[item.type == 2?'u-row-right':'',index>0?'u-m-t-30':'']" :id="'msg'+index">
							<image src="@/static/images/ucenter/logo.png" class="openAiImgClass" v-if="item.type == 1">
							</image>
							<view :class="item.type == 1 ? 'u-m-l-14' : 'u-m-r-14'">
								<view class="u-m-b-10" v-if="item.type == 1">{{$t('open')}}</view>
								<view :class="item.type == 1 ? 'openMsgClass' : 'userMsgClass'">{{item.msg}}</view>
							</view>
							<template v-if="userInfo_common.head_img && item.type == 2">
								<image :src="userInfo_common.head_img" class="openAiImgClass"></image>
							</template>
							<template v-if="!userInfo_common.head_img && item.type == 2">
								<image src="@/static/images/vip/avatar.png" class="openAiImgClass"></image>
							</template>
						</view>
					</scroll-view>
				</view>
				<view class="bottomSendClass">
					<view class="u-flex u-flex-nowrap" style="overflow-x: scroll;">
						<!-- <view class="quickQuestionsItem u-c-g u-m-r-24" v-if="openAiQuickQuestions1">{{$t('openAiQuickQuestions1')}}</view> -->
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions1"
							@click="sendChange($t('openAiQuickQuestions1'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions1')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions2"
							@click="sendChange($t('openAiQuickQuestions2'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions2')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions3"
							@click="sendChange($t('openAiQuickQuestions3'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions3')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions4"
							@click="sendChange($t('openAiQuickQuestions4'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions4')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions5"
							@click="sendChange($t('openAiQuickQuestions5'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions5')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions6"
							@click="sendChange($t('openAiQuickQuestions6'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions6')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions7"
							@click="sendChange($t('openAiQuickQuestions7'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions7')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions8"
							@click="sendChange($t('openAiQuickQuestions8'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions8')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions9"
							@click="sendChange($t('openAiQuickQuestions9'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions9')}}
								</view>
							</view>
						</view>
						<view class="zd-name-wrap quickQuestionsItem u-m-r-24" v-if="openAiQuickQuestions10"
							@click="sendChange($t('openAiQuickQuestions10'))">
							<view class="zd-name-content">
								<view class="zd-name-marquee m-font-16">
									{{$t('openAiQuickQuestions10')}}
								</view>
							</view>
						</view>
					</view>
					<view class="u-flex u-m-t-20">
						<u-search bg-color="rgba(30, 23, 57, 1)" height="72" placeholder-color="var(--link-color)"
							:placeholder="$t('请输入您的问题')" v-model="openKeys" @search="sendChange" :show-action="false"
							:input-style="customStyle" :disabled="searchDisabled">
						</u-search>
						<image src="@/static/images/ucenter/sendMsg.png" class="openAiImgClass u-m-l-20"
							@click="sendChange(openKeys)"></image>
					</view>
				</view>
			</view>
		</view>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import quSelect from "@/components/easy-select/easy-select.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			quSelect,
		},
		data() {
			return {
				openKeys: '',
				searchDisabled: false,
				customStyle: {
					color: '#fff',
				},
				scrollMsg: '',
				openMsg: [],
				openAiQuickQuestions1: false,
				openAiQuickQuestions2: false,
				openAiQuickQuestions3: false,
				openAiQuickQuestions4: false,
				openAiQuickQuestions5: false,
				openAiQuickQuestions6: false,
				openAiQuickQuestions7: false,
				openAiQuickQuestions8: false,
				openAiQuickQuestions9: false,
				openAiQuickQuestions10: false
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('openAi')
			});
			this.getQuickQuestionsItem();
			if (this.$helper.get('openMsg')) {
				this.openMsg = this.$helper.get('openMsg');
				this.limitArrayLength(this.openMsg, 20);
				setTimeout(_ => {
					this.scrollMsgChnage();
				}, 800);
			}
		},
		methods: {
			getQuickQuestionsItem() {
				for (let i = 1; i <= 10; i++) {
					const key = `openAiQuickQuestions${i}`;
					this[key] = this.$t(key) !== key;
				}
			},
			async sendChange(content) {
				uni.showLoading({
					title: this.$t('loading')
				});
				this.searchDisabled = true;
				let res = await this.$u.api.gpt_send_p({content});
				uni.hideLoading();
				if (res && res.code == 1) {
					this.openMsg.push({
						msg: content,
						type: 2,
						date: new Date().toLocaleTimeString()
					})
					if (res.data) {
						this.searchDisabled = false;
						this.openMsg.push({
							msg: res.data,
							type: 1,
							date: new Date().toLocaleTimeString()
						});
						this.limitArrayLength(this.openMsg, 20);
						this.$helper.set('openMsg', this.openMsg);
						this.openKeys = '';
						setTimeout(_ => {
							this.scrollMsgChnage();
						}, 800);
					}
				}
			},
			scrollMsgChnage() {
				this.scrollMsg = 'msg' + (this.openMsg.length - 1);
			},
			limitArrayLength(arr, maxLength) {
				if (arr.length > maxLength) {
					arr.splice(0, arr.length - maxLength);
				}
				this.$helper.set('openMsg', arr);
			}
		}
	}
</script>

<style lang="scss">
	.bs-wrapper {
		overflow: hidden;
		padding: 70px 0 80px 10px !important;
	}

	.bs-wrapper ::v-deep .uni-scroll-view {
		padding-right: 10px;
	}

	.openMsgClass {
		max-width: 268px;
		padding: 8px 12px;
		border-radius: 0 16px 16px 16px;
		background: rgba(49, 43, 79, 1);
	}

	.userMsgClass {
		max-width: 268px;
		padding: 8px 12px;
		border-radius: 16px 0 16px 16px;
		background: rgba(100, 76, 188, 1);
	}

	.bottomSendClass {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10px 20px;
		background: rgba(62, 54, 100, 1);
	}

	.openAiImgClass {
		width: 32px;
		height: 32px;
		min-width: 32px;
		min-height: 32px;
		max-width: 32px;
		max-height: 32px;
	}

	.quickQuestionsItem {
		min-width: 140px;
		text-align: center;
		padding: 10px 20px;
		border-radius: 20px;
		border: 1px solid rgba(100, 76, 188, 1);
	}

	::-webkit-scrollbar {
		display: none;
	}
</style>

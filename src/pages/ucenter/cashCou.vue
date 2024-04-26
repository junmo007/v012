<template>
	<view class="content" :data-theme="themeMode">
		<view class="container">
			<uniNavHeader :title="$t('public3')"></uniNavHeader>
			<view class="mar-panel">
				<view class="site-head u-flex u-m-b-20">
					<view class="site-tit">
						<text>{{$t('现金券')}}</text>
					</view>
					<view class="site-back" @click="common_back">
						<text class="iconfont icon-close"></text>
					</view>
				</view>
			</view>
			<view class="bs-content">
				<!-- 个人通知-消息 -->
				<template v-if="showEmpty == 1">
					<view class="fan-card news-list" v-for="(item,index) in msgList" :key="`list${index}`">
						<view class="news-list-head">
							<view class="person-title ">{{$t('邀请人数')}}</view>
							<view class="list-time u-m-auto">{{item.invite}}</view>
						</view>
						<view class="news-list-head">
							<view class="person-title ">{{$t('充值金额')}}</view>
							<view class="list-time u-m-auto">{{item.recharge}}</view>
						</view>
						<view class="news-list-head">
							<view class="person-title ">{{$t('兑换金额')}}</view>
							<view class="list-time u-m-auto">{{item.amount}}</view>
						</view>
						<view class="btn btn--gray" @click="redemption(item.id,item.lottery_id)"><text
								class="blue-color">{{$t('兑换')}}</text></view>
					</view>
					<view class="load-more-box">
						<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
					</view>
				</template>
				<template v-if="showEmpty == 0">
					<listEmpty :isDefault="true" class="u-bd-8" :listHighly='400'>
					</listEmpty>
				</template>
			</view>
		</view>
		<pcBg></pcBg>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
		</u-top-tips>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			listEmpty,
			pcBg
		},
		data() {
			return {
				sideshow: false,
				// 加载
				msgList: [],
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('现金券')
			});
			this.getmsgList('add');
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getmsgList();
		},
		methods: {
			async redemption(id,lottery_id) {
				let res = await this.$u.api.lottery_setcashvolume_p({
					id,
					lottery_id
				});
				if (res) {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
					this.getmsgList('add');
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getmsgList(add) {
				uni.showLoading({
					title: this.$t("loading")
				});
				// lottery_cashvolume_p msglist_p
				let ret = await this.$u.api.lottery_cashvolume_p({
					page: this.page,
					limit: 10
				});
				if (ret) {
					uni.hideLoading();
					if (add) {
						this.msgList = ret.data;
					} else {
						this.msgList = this.msgList.concat(ret.data);
					}
					if (ret.data.length == 10) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.msgList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	// 新闻列表
	.news-list {
		position: relative;
		padding: 15px;
		cursor: pointer;
		border-radius: 12px;
		margin-bottom: 12px;

		.btn--gray {
			width: 100%;
			border-radius: 4px;
		}

		.news-list-head {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
		}

		.news-list-title {
			font-size: 15px;
		}

		.person-title {
			font-weight: bold;
			background: var(--font-color);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.list-desc {
			line-height: 1.8;
		}

		.list-cate .dot {
			display: inline-flex;
			width: 8px;
			height: 8px;
			background: var(--tab-active);
			border-radius: 2px;
			margin-right: 5px;
		}

		.list-cate .text {
			font-weight: bold;
			background: var(--font-color);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.list-time {
			font-size: 12px;
		}

		.news-pic {
			margin-right: 15px;
			font-size: 0;

			image {
				display: block;
				width: 160px;
				height: 110px;
				border-radius: 10px;
			}
		}
	}


	.container {
		::v-deep .uni-navbar {
			background: var(--mar-bg);
		}
	}
</style>

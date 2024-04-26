<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex w_70">
				<pcSideBar :pageIndex="15" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper flex_bd">
					<view class="pc-wrapper-head u-flex u-m-b-20">
						<text class="iconfont icon-more-info u-font-36 u-m-r-16"></text>
						<text class="u-font-36">{{$t('public3')}}</text>
					</view>
					<view class="panel panel-hall m-rela">
						<view class="art-content">
							<view class="art-heading">
								<view class="art-title">{{$t(action.c_title)}}</view>
							</view>
							<view class="art-body" v-html="action.c_detail"></view>
							<!-- <image :src="action.c_img" mode="widthFix" style="width: 100%;"></image> -->
						</view>
						<view class="apl-btn-footer-pc pc_box" v-if="action.base_type != 5 && action.base_type > 0">
							<button type="default" class="btn btn--submit" @click="apply">{{$t('agent66')}}</button>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container" :class="sideshow?'is-mask':''">
					<uniNavHeader isback :title="this.$t('活动详情')" @clickLeft="menuClick"></uniNavHeader>
					<view class="bs-wrapper">
						<!-- main -->
						<view class="gooLight">
							<view class="panel panel-hall">
								<view class="art-content">
									<view class="art-heading">
										<view class="art-title">{{$t(action.c_title)}}</view>
									</view>
									<u-line-progress active-color="#E9AE3A" inactive-color="#5C46AD" height="48"
										:show-percent="false" :percent="action.plan">
										<view class="m-font-13" :class="action.plan <= 30 ? 'u-line-progress-no-data':''">
											{{(action.now?action.now:'0')+'/'+(action.goal?action.goal:'0')}}
										</view>
									</u-line-progress>
									<view class="art-body u-m-t-20" v-html="action.c_detail"></view>
									<!-- <image :src="action.c_img" mode="widthFix" style="width: 100%;"></image> -->
								</view>
							</view>
						</view>
						<view class="apl-btn-footer pc_box"
							v-if="action.base_type != 5 && action.base_type > 0 && action.is_play == 1">
							<button type="default" class="btn btn--submit" @click="apply">{{$t('agent66')}}</button>
						</view>
					</view>
					<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
					</u-top-tips>
				</view>
			</view>
		</template>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcNavHeader,
			pcBg,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				background: {
					backgroundColor: 'var(--ui-color-normal)',
				},
				backText: {
					color: '#ffffff'
				},
				href: '',
				sideshow: false,
				action_id: '',
				action: [],
			}
		},
		async onLoad(options) {
			uni.setNavigationBarTitle({
				title: this.$t('活动详情')
			});
			if (options.id) {
				this.action_id = options.id;
				this.getaction();
			}
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async apply() {
				uni.showLoading({
					mask: true,
					title: this.$t('loading')
				});
				let ret = await this.$u.api.actionapply_p({
					action_id: this.action.id,
				});
				if (ret) {
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
				}
			},
			async getaction() {
				let ret = await this.$u.api.actiondetail_p({
					action_id: this.action_id
				});
				if (ret) {
					this.action = ret.data;
				}
			},
		}
	}
</script>

<style lang="scss">
	.panel-hall {
		min-height: calc(100vh - 120px);
	}

	// 新闻列表
	.news-list {
		position: relative;
		padding: 20px;
		cursor: pointer;

		.news-list-title {
			font-size: 16px;
			margin-bottom: 10px;
		}

		.list-desc {
			font-size: 14px;
		}

		.list-time {
			color: #999;
			margin-top: 20px;
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

		&::after {
			content: '';
			width: 100%;
			height: 1px;
			background-color: #DDDDDD;
			position: absolute;
			left: 20px;
			right: 20px;
			bottom: 0;
		}
	}


	.apl-btn-footer {
		position: fixed;
		background-color: var(--apl-btn-footer-bg);
		box-shadow: var(--shadow-bg);
		bottom: 0;
		padding: 10px 30rpx;
		left: 0;
		right: 0;
	}

	.apl-btn-footer .btn {
		width: 100%;
		height: 46px;
		display: block;
		padding: 0;
		line-height: 44px;
		border-radius: 8px;
	}

	.space-ht {
		height: 50px;
	}

	.site-head {
		background: var(--mar-bg);
		margin: -10px -16px 0 !important;
		padding: 0 27px 15px;
	}

	.bs-wrapper {
		background: var(--mar-bg);
		padding: 70px 0 0 0 !important;
	}

	.gooLight {
		border-radius: 15px 15px 0 0;
		padding: 15px 15px 81px 15px;
	}

	.container ::v-deep .uni-navbar {
		background: var(--mar-bg);
	}

	.apl-btn-footer-pc {
		position: absolute;
		box-shadow: var(--shadow-bg);
		bottom: 0;
		padding: 10px 30rpx;
		left: 20%;
		right: 20%;
	}

	.apl-btn-footer-pc .btn {
		width: 100%;
		height: 46px;
		display: block;
		padding: 0;
		line-height: 44px;
		border-radius: 8px;
	}

	.u-line-progress-no-data {
		width: 135px;
		min-width: 130px;
		padding-left: 15px;
	}
</style>

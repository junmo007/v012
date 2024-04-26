<template>
	<view class="content">
		<view class="container">
			<view class="bs-wrapper m-rela">
				<view class="search-navbar u-flex">
					<u-search bg-color="#3E3664" border-color="#3E3664" search-icon-color="#9792B2"
						placeholder-color="var(--link-color)" color="var(--body-color)" shape="square" height="88"
						:show-action="false" v-model="searchKey" :placeholder="$t('Please Enter')"
						@search="marketSearch" @clear="clearChange">
					</u-search>
					<view class="text-yellow m-font-16 u-m-l-26" @click="clearChange">{{$t('清除')}}</view>
				</view>
				<template v-if="showEmpty == 1">
					<uni-collapse ref="collapse" v-model="collvalue">
						<uni-collapse-item class="collapseClass collapseTradingListClass"
							v-for="(res,index) in tradingList" :class="res.is_vip == 1 ? 'vip-item' : ''"
							:key="`list1${index}`" :open="collOpen">
							<template v-slot:title>
								<view class="tra-title tradingList-top-one">
									<view class="col-status m-font-16 u-c-g">
										{{'№ ' + res.zd_number}}
									</view>
									<view class="col-value m-font-18">
										{{res.tz_price?res.tz_price+' ₽':'0.00 ₽'}}
									</view>
								</view>
								<view class="line"></view>
								<view class="u-flex u-p-l-24 u-p-r-24 u-p-t-36 u-p-b-24">
									<view class="u-flex">
										<view class="ksgt-1">
											<image :src="res.zd_logo" v-if="res.zd_logo"></image>
											<image :src="marketHeaderZD" v-if="!res.zd_logo">
											</image>
										</view>
										<view class="ksgt-1 ksgt-2">
											<image :src="res.kd_logo" v-if="res.kd_logo"></image>
											<image :src="marketHeaderKD" v-if="!res.kd_logo">
											</image>
										</view>
									</view>
									<view class="u-m-l-20">
										<view class="u-flex w_100">
											<view class="zd-name-wrap tradeing-market-name">
												<view class="zd-name-content">
													<view class="zd-name-marquee m-font-16">
														{{res.zd_name}}
													</view>
												</view>
											</view>
											<view class="u-c-9 u-m-l-10 u-m-r-10 u-text-center m-font-16"
												style="min-width: 30px;">VS</view>
											<view class="zd-name-wrap tradeing-market-name">
												<view class="zd-name-content">
													<view class="zd-name-marquee m-font-16">
														{{res.kd_name}}
													</view>
												</view>
											</view>
										</view>
										<view class="u-c-g u-m-t-8">{{res.add_time}}</view>
										<view class="vip-item-label u-m-t-8" v-if="res.is_vip == 1">
											<view class="u-flex m-font-11">
												<view class="iconfont icon-shoucang4 m-font-12 u-m-r-12"></view>
												<view class="m-font-11 u-font-xs">VIP</view>
											</view>
										</view>
									</view>
								</view>
							</template>
							<view class="collapse-body">
								<view class="collapse-row">
									<view class="collapse-label">{{$t("game53")}}</view>
									<view class="collapse-value">
										{{res.tz_price?res.tz_price+' ₽':'0.00 ₽'}}
									</view>
								</view>
								<view class="collapse-row" v-if="res.status == 3 || res.status == 4">
									<view class="collapse-label">{{$t("结算时间")}}</view>
									<view class="collapse-value">{{res.update_time}}</view>
								</view>
								<view class="collapse-row">
									<view class="collapse-label">
										{{$t(res.zd_name)}} VS {{$t(res.kd_name)}}
									</view>
									<view class="collapse-value">
										{{res.zd_fs}}-{{res.kd_fs}}
									</view>
								</view>
								<view class="collapse-row">
									<view class="collapse-label">{{$t('赔率')}}</view>
									<view class="collapse-value">{{res.peilv}}%</view>
								</view>
								<view class="collapse-row">
									<view class="collapse-label">{{$t('user34')}}</view>
									<view class="collapse-value">
										<text v-if="res.status == 1">{{$t('进行中')}}</text>
										<text v-if="res.status == 2">{{$t('已撤单')}}</text>
										<text v-if="res.status == 3" style="color:#f00;">{{$t('输')}}</text>
										<text v-if="res.status == 4" style="color:green;">{{$t('赢')}}</text>
									</view>
								</view>
								<view class="collapse-row" v-if="showCel_order == 1 && res.status == 1">
									<view @click="revoke(res.id)" class="revokeBtn u-flex u-row-center">
										<image src="@/static/images/index/list-btn-close.png"
											style="width: 20px;height: 20px;"></image>
										<view class="u-m-l-20 m-font-16">{{$t("gencz1")}}</view>
									</view>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
					<view class="load-more-box">
						<uni-load-more :status="status" :contentText="contentText">
						</uni-load-more>
					</view>
				</template>
				<template v-if="showEmpty == 0">
					<listEmpty :isDefault="true"></listEmpty>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			uniNavHeader,
			listEmpty
		},
		data() {
			return {
				showEmpty: 0,
				searchKey: '',
				page: 1,
				tradingList: [],
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				collvalue: '',
				collOpen: false,
				showCel_order: null,
			}
		},
		onLoad() {
			this.showCleOrder();
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getList();
		},
		methods: {
			//判断是否显示撤单功能
			showCleOrder() {
				let posi = this.$helper.get('rule');
				if (posi) {
					this.showCel_order = posi.revoke_order;
				}
			},
			marketSearch(e) {
				this.page = 1;
				this.tradingList = [];
				this.searchKey = e;
				this.getList('add');
			},
			clearChange(e) {
				this.page = 1;
				this.tradingList = [];
				this.searchKey = '';
				this.showEmpty = 0;
			},
			async getList(add) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.trading_p({
					limit: 10,
					page: this.page,
					keywords: this.searchKey
				});
				uni.hideLoading();
				if (res && res.code == 1) {
					if (add) {
						this.tradingList = res.data.list;
					} else {
						this.tradingList = this.tradingList.concat(res.data.list);
					}
					if (res.data.list.length == 10) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.tradingList.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
				} else {
					this.showEmpty = 0;
				}
			},
		}
	}
</script>


<style lang="scss" scoped>
	.search-navbar {
		padding: 0 15px;
		height: 70px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	.search-navbar ::v-deep .u-content {
		border-radius: 16px !important;
	}

	.collapseClass {
		position: relative;
		border-radius: 16px;
		background-color: #3E3664;
		overflow: hidden;
		margin-bottom: 8px;
	
		.collapse-label {
			color: #D1CCE9;
		}
	
		.col-value {
			margin-right: 10px;
			font-size: 18px;
		}
	
		.collapse-body {
			background-color: #312B4F;
			color: #ffffff;
		}
	
		.collapse-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 12px;
			border-bottom: 1px solid #1d1737;
		}
	
		::v-deep .uni-collapse-item__title-arrow {
			width: 32px;
			height: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #D1CCE9;
			border-radius: 50%;
			background-color: #4D4886;
		}
	}
	
	.collapseClass .line {
		position: absolute;
		left: 10px;
		right: 10px;
		top: 58px;
		border-bottom: 1px solid rgba(77, 72, 134, 1);
	}
	
	.tradeing-market-name {
		max-width: 32%;
		overflow: hidden;
	}
	
	.revokeBtn {
		width: 100%;
		padding: 12px 20px;
		border-radius: 12px;
		background: rgba(100, 76, 188, 1);
		text-align: center;
	}
	
	.collapseTradingListClass ::v-deep .uni-collapse-item--animation {
		position: absolute;
		right: 0;
		min-width: 32px;
		min-height: 32px;
		margin-top: -60px;
	}
	
	.tradingList-top-one {
		padding-right: 45px !important;
	}
	
	.tra-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 0 12px 12px;
	
		.col-status {
			display: flex;
			align-items: center;
		}
	}
</style>

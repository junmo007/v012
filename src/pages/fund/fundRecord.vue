<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<u-navbar back-icon-color="#fff" title-color="#fff" :custom-back="mrShowStatus"
				:back-text-style="{color: '#fff',fontSize:'16px',paddingBottom: '3px'}" :background="navbarBack"
				height=60 :back-text="$t('投资记录')" :border-bottom="false">
			</u-navbar>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="-1"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<view class="bs-container">
				<view class="bs-content">
					<u-sticky :enable="enable" h5-nav-height="60" bg-color="none">
						<view class="top-link-tabs flex-center justify-center">
							<view class="n-tab_item" @click="change(index)" :class="current == index ? 'active':''"
								v-for="(item,index) in list">
								<text class="item-text">{{item.name}}</text>
							</view>
						</view>
					</u-sticky>
					<template v-if="current == 0">
						<template v-if="showEmpty == 1">
							<view v-for="(item,index) in dataType" :key="index">

								<view class="fun-list-card u-m-t-20" :class="index>0?'':''"
									@click="investment(item.id)">
									<view class="u-flex u-row-between">
										<view>{{$t(item.name)}}</view>
										<view>{{$t(item.price)}}</view>
									</view>
									<view class="u-flex u-row-between u-m-t-20">
										<view>{{$t('利率')}}</view>
										<view>{{$t(item.interest)}}</view>
									</view>
									<view class="u-flex u-row-between u-m-t-20">
										<view>{{$t('周期')}}</view>
										<view>{{$t(item.few_days)}}</view>
									</view>
									<view class="u-flex u-row-between u-m-t-20">
										<view>{{$t(item.add_time)}}</view>
										<view :class="item.f_status==1?'u-c-p':'u-c-g'">
											{{item.f_status==1?$t('进行中'):item.f_status==2?$t('已返还'):item.f_status==3?$t('手动返还'):''}}
										</view>
									</view>
								</view>
							</view>
							<view class="load-more-box">
								<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
							</view>
						</template>
						<template v-if="showEmpty == 0">
							<listEmpty :isDefault="true" fullLiftText="暂无投资记录" class="u-bd-8" :listHighly='480'>
							</listEmpty>
						</template>
					</template>
					<template v-if="current == 1">
						<template v-if="showEmpty_two == 1">
							<view v-for="(item,index) in dataType2" :key="index">
								<view class="fun-list-card u-m-t-20" :class="index>0?'':''" @click="getFundData(item)">
									<view class="u-flex u-row-between">
										<view>{{$t(item.msg)}}</view>
										<view class="" :class="item.type == 1?'u-c-g':'u-c-r'">
											{{item.type == 1?'+' + $t(item.price) : '-' + $t(item.price)}}
										</view>
									</view>
									<view class="u-flex u-row-between u-m-t-20">
										<view>{{$t('时间')}}</view>
										<view>{{$t(item.add_time)}}</view>
									</view>
								</view>
							</view>
							<view class="load-more-box">
								<uni-load-more :status="status2" :contentText="contentText2"></uni-load-more>
							</view>
						</template>
						<template v-if="showEmpty_two == 0">
							<listEmpty :isDefault="true" fullLiftText="暂时没有数据哟!" class="u-bd-8" :listHighly='480'>
							</listEmpty>
						</template>
					</template>


				</view>
			</view>
			<!-- 新增-投资详情 -->
			<uni-popup ref="investmentPop" type="bottom">
				<view class="bs-popup ">
					<view class="iconfont icon-close " @click="closeInvestmentPop()"></view>
					<view class="bs-popup-hd">
						<view>{{$t('投资详情')}}</view>
					</view>
					<view class="m-pd-xl">
						<view class="u-flex u-row-between">
							<view>{{$t('基金简称')}}</view>
							<view>{{$t(fundItem.name)}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('投资金额')}}</view>
							<view>{{fundItem.price}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('利率')}}</view>
							<view>{{fundItem.interest}}%</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('预计总收益')}}</view>
							<view>{{fundItem.all_earnings}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('投资周期')}}</view>
							<view>{{fundItem.few_days}}{{$t('天')}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('投资时间')}}</view>
							<view>{{fundItem.add_time}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('收益时间')}}</view>
							<view>{{fundItem.fund_start_time}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('收益结束时间')}}</view>
							<view>{{fundItem.fund_end_time}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('基金状态')}}</view>
							<view :class="fundItem.f_status==1?'u-c-p':'u-c-g'">
								{{fundItem.f_status==1?$t('进行中'):fundItem.f_status==2?$t('已返还'):fundItem.f_status==3?$t('手动返还'):''}}
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
			<!-- 定期出入金 详情 -->
			<uni-popup ref="dingFundDetalisPop" type="bottom">
				<view class="bs-popup ">
					<view class="iconfont icon-close " @click="closeFundDetalisPop()"></view>
					<view class="bs-popup-hd">
						<view>{{$t(fundType.type==1?'转入金额':'转出金额')}}</view>
					</view>
					<view class="m-pd-xl">
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('简称')}}</view>
							<view>{{$t(fundType.msg)}}</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t(fundType.type==1?'转入':'转出')}}</view>
							<view :class="fundType.type == 1?'u-c-g':'u-c-r'">
								{{fundType.type == 1?'+' + $t(fundType.price) : '-' + $t(fundType.price)}}
							</view>
						</view>
						<view class="u-flex u-row-between u-m-t-20">
							<view>{{$t('投资时间')}}</view>
							<view>{{fundType.add_time}}</view>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<pcBg></pcBg>
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
				p: 1,
				p2: 1,
				status: 'more',
				status2: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				contentText2: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				dataType: [],
				dataType2: [],
				fundItem: {},
				showEmpty: null,
				list: [{
						name: this.$t('定期详细')
					},
					{
						name: this.$t('定期出入金记录')
					}
				],
				current: 0,
				navbarBack: {
					background: 'var(--ui-color-normal)'
				},
				fundType: {},
				enable: true,
				showEmpty_two: null
			}
		},
		async onLoad() {
			await this.getSavingsFundsLists();

		},
		onReachBottom() {
			if (this.current == 0) {
				if (this.status == 'noMore') {
					return;
				}
				this.getSavingsFundsLists();
			}
			if (this.current == 1) {
				if (this.status2 == 'noMore') {
					return;
				}
				this.getSavingsFundsLists2();
			}
		},
		onShow() {
			this.enable = true;
		},
		onHide() {
			this.enable = false;
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			getFundData(e) {
				this.fundType = e;
				this.$refs.dingFundDetalisPop.open();
			},
			closeFundDetalisPop() {
				this.$refs.dingFundDetalisPop.close();
			},
			mrShowStatus() {
				let pages = getCurrentPages();
				if (pages && pages.length > 1) {
					uni.navigateBack({
						delta: 1,
					});
				} else {
					history.back();
				}
			},
			change(e) {
				this.current = e;
				if (this.current == 0) {
					this.p = 1;
					this.dataType = [];
					this.getSavingsFundsLists();
				}
				if (this.current == 1) {
					this.p2 = 1;
					this.dataType2 = [];
					this.getSavingsFundsLists2();
				}
			},
			// 获取投资记录
			async investment(id) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.savings_funds_details_p({
					id
				});
				if (res) {
					uni.hideLoading();
					this.fundItem = res.data;
					this.$refs.investmentPop.open();
				}
			},
			closeInvestmentPop() {
				this.$refs.investmentPop.close();
			},
			// 获取基金列表
			async getSavingsFundsLists() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res1 = await this.$u.api.savings_funds_get_fund_order_list_p({
					f_status: 'all',
					page: this.p,
					limit: 20
				});
				if (res1) {
					uni.hideLoading();
					if (res1.data.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < res1.data.length; i++) {
							this.dataType.push(res1.data[i]);
						}
						if (res1.data.length < 20) {
							this.status = "noMore";
						} else {
							this.status = "loading";
							this.p++;
						}
					} else {
						this.showEmpty = 0;
						this.status = "noMore";
					}
				}
			},
			// 获取定期出入金列表
			async getSavingsFundsLists2() {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res1 = await this.$u.api.savings_funds_mx_list_p({
					f_type: 2,
					page: this.p2,
					limit: 20
				});
				if (res1) {
					uni.hideLoading();
					if (res1.data.length > 0) {
						this.showEmpty_two = 1;
						for (let i = 0; i < res1.data.length; i++) {
							this.dataType2.push(res1.data[i]);
						}
						if (res1.data.length < 20) {
							this.status2 = "noMore";
						} else {
							this.status2 = "loading";
							this.p2++;
						}
					} else {
						this.showEmpty_two = 0;
						this.status2 = "noMore";
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@media (max-width:990px) {
		.w_580 {
			width: 94vw !important;
		}

	}

	@media (min-width:991px) {
		.w_580 {
			width: 580px !important;
		}

		.m-pd-xl {
			padding: 0 20px;
		}
	}

	.u-c-g {
		color: #00ca00;
	}

	.u-c-p {
		color: #ff9500;
	}

	.u-c-r {
		color: #FF1900;
	}
</style>

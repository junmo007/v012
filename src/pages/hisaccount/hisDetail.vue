<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<uniNavHeader isback :title="this.$t('menu3')" @clickLeft="menuClick"></uniNavHeader>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="2"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->
			<view class="bs-container">
				<view class="bs-content">
					<view class="trade-card">
						<view class="trade-card_bd">
							<view class="trade-data flex-center justify-zBetween" style="height: 80px;">
								<view class="col">
									<view class="txt">{{$t('trade2')}}</view>
									<view class="val text-orange">{{total_money}}</view>
								</view>
								<view class="col">
									<view class="txt">{{$t('agent60')}}</view>
									<view class="val text-green">{{total_income}}</view>
								</view>
							</view>
						</view>
					</view>
					<!-- table -->
					<template v-if="showEmpty == 1">
						<view class="trade-main">
							<view class="panel">
								<view class="bs-table">
									<view class="bs-row header">
										<view class="cell">{{$t('trade2')}}/{{$t('trade5')}}</view>
										<view class="cell">{{$t('trade6')}}</view>
										<view class="cell cell-3">{{$t('game17')}}</view>
										<view class="cell cell-4">{{$t('game10')}}</view>
										<view class="cell cell-5">{{$t('user51')}}</view>
										<view class="cell cell-6">{{$t('获利')}}</view>
										<!-- 211232123232323 -->
										<view class="cell cell-6">{{$t('赛事结果')}}</view>
										<view class="cell cell-7">{{$t('user34')}}</view>
									</view>
									<view class="bs-row" v-for="(item, index) in tradingList" :key="`list${index}`">
										<view class="cell" :data-title="$t('trade2')">
											<view class="item">#{{item.zd_number}}</view>
											<view class="item">{{item.add_time}}</view>
										</view>

										<view class="cell" :data-title="$t('trade6')">
											<view class="item">{{$t(item.zd_name)}} VS {{$t(item.kd_name)}}</view>
											<view class="item">{{item.sc_time}} {{$t(item.ls_name)}}</view>
										</view>
										<view class="cell cell-3" :data-title="$t('game17')" v-if="item.zd_type == 1">
											{{$t('game17')}} {{item.zd_fs}}-{{item.kd_fs}} <text
												class="his-persent text-green">
												@ {{item.peilv}}%</text>
										</view>
										<view class="cell cell-3" :data-title="$t('game17')" v-if="item.zd_type == 2">
											{{$t('public27')}} {{item.zd_fs}}-{{item.kd_fs}} <text
												class="his-persent text-green"> @ {{item.peilv}}%</text>
										</view>
										<view class="cell cell-3" :data-title="$t('分析师')" v-if="item.indemnity > 0">
											<text class="his-persent text-green"
												v-if="item.indemnity == 1">{{$t('game32')}}</text>
											<text class="his-persent text-green"
												v-if="item.indemnity == 2">{{$t('game48')}}</text>
										</view>
										<view class="cell cell-4" :data-title="$t('game10')"><text
												class="text-green">{{item.tz_price}}</text></view>
										<view class="cell cell-5" :data-title="$t('user51')"><text
												class="text-orange">{{item.remarks}}</text></view>
										<view class="cell cell-6" :data-title="$t('获利')"><text
												class="text-green">{{item.sy_res}}</text></view>
										<!-- 211232123232323 -->
										<view class="cell cell-6" :data-title="$t('赛事结果')"><text
												class="text-green">{{item.ls_res_zd_fs}}-{{item.ls_res_kd_fs}}</text>
										</view>
										<view class="cell cell-7" :data-title="$t('user34')">
											<view class="text-red" v-if="item.status == 1">{{$t('trade10')}}</view>
											<view class="text-orange" v-if="item.status == 2">{{$t('trade11')}}</view>
											<view class="text-green" v-if="item.status == 3">{{$t('trade13')}}</view>
											<view class="text-red" v-if="item.status == 4">{{$t('trade12')}}</view>
										</view>
									</view>
								</view>
							</view>
							<view class="load-more-box">
								<uni-load-more :status="status"></uni-load-more>
							</view>
						</view>
					</template>
					<template v-if="showEmpty == 0">
						<listEmpty :isDefault="true" text='暂无新充值' list='list' :listHighly='300'></listEmpty>
					</template>
				</view>
			</view>
			<!-- footer 移动端 -->
			<view class="m-footer trade-active">
				<uniNavFooter fIndex="3"></uniNavFooter>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			uniNavFooter,
			listEmpty,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				tradingList: [],
				page: 1,
				// tab
				status: 'more',
				total_money: "0.00",
				total_income: "0.00",
				date: '',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
			}
		},
		onLoad: function(options) {
			uni.setNavigationBarTitle({
				title: this.$t('menu3')
			});
			this.date = options.date
			this.getTrading();
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getTrading();
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			refresh() {
				this.page = 1;
				this.tradingList = [];
				this.getTrading();
			},
			async getTrading() {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.historList_p({
					date: this.date,
					page: this.page,
					limit: 10,
				});

				if (ret) {
					this.total_money = ret.data.total_money;
					this.total_income = ret.data.total_income;
					if (ret.data.list.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < ret.data.list.length; i++) {
							this.tradingList.push(ret.data.list[i]);
						}
						// 加载状态结束
						if (ret.data.list.length < 10) {
							this.status = "noMore";
						} else {
							this.status = "loading";
							this.page++;
						}
					} else {
						this.showEmpty = 0;
						this.status = "noMore";
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.trade-card {
		// background: url(../../static/images/trade/bg.png) no-repeat;
		background-image: var(--trading-card);
		background-size: cover;
		height: 120px;
		color: #FFFFFF;
		border-radius: 10px;
		padding: 30px;
		margin-bottom: 30px;

		.t-top {
			margin-bottom: 30px;

			.time {
				margin: 0 25px;
			}

			.icon-shuaxin {
				cursor: pointer;
			}
		}

		.trade-data {
			width: 100%;
		}

		.trade-data .col {
			width: 30%;

			.txt {
				margin-bottom: 12px;
			}

			.val {
				line-height: 1;
				font-size: 30px;
			}
		}
	}

	.trade-main {
		.cell-3 {
			width: 200px;
		}

		.cell-4 {
			min-width: 150px;
		}

		.cell-5 {
			min-width: 100px;
		}

		.cell-6 {
			min-width: 120px;
		}

		.cell-7 {
			width: 100px;
		}

		.icon-sandian {
			color: #999999;
		}
	}

	.bs-row {
		.item {
			padding: 2px 0;
		}
	}

	@media (max-width:750px) {
		.trade-card {
			height: 110px;
			padding: 16px;
			border-radius: 5px;
			margin-bottom: 10px;

			.t-top {
				margin-bottom: 15px;

				.time {
					margin: 0 15px;
				}
			}

			.trade-data .col {
				width: 50%;

				.txt {
					margin-bottom: 8px;
					font-size: 12px;
				}

				.val {
					line-height: 1;
					font-size: 22px;
				}
			}
		}
	}
</style>

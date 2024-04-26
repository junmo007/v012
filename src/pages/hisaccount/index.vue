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
			<view class="bs-content">
				<view class="ucenter-row">
					<view class="trade-card">
						<view class="top-tab-group">
							<view class="top-sm-tabs flex-center " style="width: 100%;">
								<view class="n-tab_item" @click="changeTab(index)"
									:class="current == index ? 'active':''" v-for="(item,index) in tabs">
									<text class="item-text">{{item.name}}</text>
								</view>
							</view>
						</view>
						<view class="trade-card_bd">
							<view class="trade-data flex-center ">
								<view class="col">
									<view class="txt">{{$t('trade2')}}</view>
									<view class="val ">{{total_money}}</view>
									<view class="t-line"></view>
								</view>
								<view class="col">
									<view class="txt">{{$t('agent60')}}</view>
									<view class="val ">{{total_income}}</view>
									<view class="t-line"></view>
								</view>
							</view>
						</view>
					</view>
					<!-- 账务列表 -->
					<view class="hisaccount-main">
						<view class="vs-game-cell" v-for="(item,index) in history" :key="`list${index}`"
							@click="goShow(index)">
							<view class="vs-card-group">
								<view class="vs-game-card vs-first-card">
									<view class="col">
										<view class="u-e-7 u-m-b-10">{{$t("trade7")}}</view>
										<view class="m-font-20">{{index}}</view>
									</view>
									<view class="col">
										<view class="u-e-7 u-m-b-10">{{$t("trade8")}}</view>
										<view class="m-font-20">{{item.valid_price}}</view>
									</view>
								</view>
								<view class="vs-game-card">
									<view class="col">
										<view class="u-e-7 u-m-b-10">{{$t("agent60")}}</view>
										<view class="m-font-20">{{item.win_price}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			pcBg
		},
		data() {
			return {
				href: '',
				sideshow: false,
				// tab
				current: 0,
				// 手风琴
				collapsevalue: '0',
				history: [],
				total_money: 0,
				total_income: 0,
				tabs: [{
					name: this.$t('user94')
				}, {
					name: this.$t('user95')
				}, {
					name: this.$t('agent3')
				}, {
					name: this.$t('agent4')
				}],
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('menu3')
			});
			this.getHistory(0);
		},
		methods: {
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getHistory(type) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let date_type = 1;
				if (type == 0) date_type = 1;
				if (type == 1) date_type = 2;
				if (type == 2) date_type = 3;
				if (type == 3) date_type = 4;
				let ret = await this.$u.api.history_p({
					date_type: date_type
				});
				if (ret) {
					this.history = ret.data.list;
					this.total_income = ret.data.total_income;
					this.total_money = ret.data.total_money;
				}
			},
			// tab
			changeTab(index) {
				this.getHistory(index);
				this.current = index;
			},
			// 跳转
			goShow(index) {
				let hisDate = index;
				if (index.indexOf('/') != -1) {
					hisDate = '';
					let D = index.substring(0, 2);
					let M = index.substring(3, 5);
					let Y = index.substring(6, 10);
					hisDate = Y + '-' + M + '-' + D;
				}
				uni.navigateTo({
					url: '/pages/hisaccount/hisDetail?date=' + hisDate
				});
			}
		}
	}
</script>

<style lang="scss">
	.trade-card {
		color: #FFFFFF;
		margin-bottom: 15px;

		.trade-card_bd {
			padding: 20px 5px;
		}

		.t-top {
			.text {
				font-size: 16px;
				font-weight: bold;
			}

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
			width: 50%;

			.txt {
				margin-bottom: 10px;
				color: #E7DBDE;
			}

			.val {
				line-height: 1;
				font-size: 24px;
				color: #FFFFFF;
			}
		}
	}

	// 9.10
	.card-tabs {
		background: rgb(53, 47, 47);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-tabs ::v-deep .v-tabs {
		width: auto;
	}

	.hisaccount-main {
		height: calc(100vh - 285px);
	}

	@media (min-width: 768px) {

		.hisaccount-main .bs-table {
			text-align: center;
		}

		.hisaccount-main .bs-table .bs-row .cell {
			width: 33.33%;
		}

		.hisaccount-main .bs-table .bs-row .cell:last-child {
			text-align: right;
			padding-right: 10%;
		}

		.hisaccount-main .bs-table .bs-row .cell:first-child {
			padding-left: 10%;
			white-space: nowrap;
		}
	}

	.mark-user-card {
		background-size: cover;
		color: #FFFFFF;
	}

	.hisa-right-panel {
		padding: 10px;
	}

	.his-list-cell {
		padding: 12px 0;
	}

	.trade-data .t-line {
		width: 106px;
		height: 6px;
		background: #B0294B;
		margin-top: 10px;
	}

	.trade-data .col:last-child .t-line {
		background: #0DA8AB;
	}


	.vs-game-card {
		text-align: left;
	}
</style>

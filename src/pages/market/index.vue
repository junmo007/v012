<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right">
				<pcSideBar :pageIndex="1" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<uni-collapse ref="collapse" v-model="filtervalue" class="u-m-b-32">
						<template>
							<uni-collapse-item class="collapseClass" open :marketV2="true">
								<template v-slot:title>
									<view class="u-flex">
										<text class="u-font-32">{{$t('市场列表')}}</text>
										<text class="u-font-32 u-m-l-20">{{$t('筛选')}}</text>
									</view>
								</template>
								<view class="pc-filter-tabs">
									<view class="filter-title u-font-36 u-m-b-20">
										{{$t('日期')}}
									</view>
									<u-tabs height="84" bar-height="6" bg-color="none" gutter="40"
										active-color="#ffffff" inactive-color="#9792B2" bar-width="100" :list="tabs"
										:current="current" @change="changeTab" :bar-style="barStyle">
									</u-tabs>
								</view>
							</uni-collapse-item>
						</template>
					</uni-collapse>
					<view class="mark-group">
						<template>
							<view class="mark-m-row">
								<template v-if="emtpy == 1">
									<uni-collapse ref="collapse" v-model="collvalue">
										<template>
											<uni-collapse-item class="collapseClass" :marketV2="true" v-if="item"
												v-for="(item,i) in arr_keys" :key="i" :open="collOpen">
												<template v-slot:title>
													<view class="u-flex">
														<text class="u-font-32">{{item}}</text>
														<text
															class="u-font-32 text-gray u-m-l-20">{{ls_match[item].length}}</text>
													</view>
												</template>
												<view class="market-pc-cell u-flex u-row-center"
													:class="res.is_vip == 1 ? 'market-m-vip-list' : ''"
													v-for="(res, index) in ls_match[item]" :key="`list1${index}`"
													@click="goList(res.sc_id)">
													<view class="market-pc-cell-left u-flex u-m-r-20">
														<view class="team-icon">
															<template v-if="res.zd_logo">
																<image :src="res.zd_logo" class="marketHeader">
																</image>
															</template>
															<template v-else>
																<image :src="marketHeaderZD" mode=""
																	class="marketHeader">
																</image>
															</template>
														</view>
														<view class="team-icon">
															<template v-if="res.kd_logo">
																<image :src="res.kd_logo" class="marketHeader">
																</image>
															</template>
															<template v-else>
																<image :src="marketHeaderKD" mode=""
																	class="marketHeader">
																</image>
															</template>
														</view>
													</view>
													<view class="flex_bd">
														<view class="u-flex u-m-b-10">
															<view class="col">
																<view class="team-tit">{{$t(res.zd_name)}}</view>
															</view>
															<view class="text-light u-font-36 u-p-l-20 u-p-r-20">
																<text>vs</text>
															</view>
															<view class="col">
																<view class="team-tit">{{$t(res.kd_name)}}</view>
															</view>
														</view>
														<view class="pc-tt-time"
															:class="res.bet_level > 0?'vip-green-color-e':''">
															{{res.sc_time}}
														</view>
													</view>
												</view>
											</uni-collapse-item>
										</template>
									</uni-collapse>
								</template>
								<template v-if="emtpy == 2">
									<listEmpty :isDefault="true"></listEmpty>
								</template>
							</view>
						</template>
					</view>
					<view v-if="orderList.length > 0">
						<view class="u-flex u-row-between u-m-b-20">
							<view class="m-font-b m-font-22 m-font-i main-skin-color">{{$t('快速跟投')}}</view>
							<view class="u-flex">
								<view class="cur_pointer"
									:class="quicklyKeys == 1 ? 'quickly-mar-tabs-active' : 'quickly-mar-tabs'"
									@click="quicklyChange(1)">{{$t('最新投注')}}</view>
								<view class="cur_pointer u-m-l-16"
									:class="quicklyKeys == 2 ? 'quickly-mar-tabs-active' : 'quickly-mar-tabs'"
									@click="quicklyChange(2)">{{$t('排行榜')}}</view>
							</view>
						</view>
						<template v-if="quicklyKeys == 1">
							<view class="u-flex u-row-between bs-table-header">
								<view>{{$t('赛事')}}</view>
								<view>{{$t('user33')}}</view>
							</view>
							<view v-for="(item,index) in orderList" :key="`orderList${index}`">
								<view class="u-flex u-row-between bs-table-bottom-item cur_pointer"
									@click="fastopen(item)">
									<view class="u-flex">
										<image :src="item.zd_logo" class="ksgt-1"></image>
										<image :src="item.kd_logo" class="ksgt-1 ksgt-2"></image>
										<view class="u-m-l-20">
											<view class="u-flex u-row-between">
												<view class="m-line-1" style="width: 7vw">{{item.zd_name}}</view>
												<view class="zd-fs-class">{{item.zd_fs}}</view>
											</view>
											<view class="u-flex u-row-between u-m-t-10">
												<view class="m-line-1" style="width: 7vw">{{item.kd_name}}</view>
												<view class="kd-fs-class">{{item.kd_fs}}</view>
											</view>
										</view>
									</view>
									<view class="bs-table-bottom-item-price">{{item.tz_price1}}
									</view>
								</view>
							</view>
						</template>
						<template v-if="quicklyKeys == 2">
							<view class="u-flex u-row-between bs-table-header u-m-t-40">
								<view>{{$t('用户名称')}}</view>
								<view>{{$t('总获利')}}</view>
							</view>
							<view v-for="(item,index) in ranking" :key="`ranking${index}`">
								<view class="u-flex u-row-between bs-table-bottom-item">
									<view class="u-flex">
										<view class="rankingClass" :class="`ranking${index}`"></view>
										<view>{{item.name}}</view>
									</view>
									<view class="bs-table-bottom-item-price">{{numberLimit(item.zhl)}}</view>
								</view>
							</view>
						</template>
					</view>
				</view>
				<view class="pc-right-bar">
					<pcSideTrade></pcSideTrade>
				</view>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content" :data-theme="themeMode">
				<view class="container">
					<uniNavHeader :title="this.$t('menu1')" ref="header" isback></uniNavHeader>
					<view class="gooLight">
						<view class="bs-wrapper">
							<view class="form-row u-flex u-m-b-20">
								<u-search bg-color="#3E3664" border-color="#3E3664" search-icon-color="#9792B2"
									placeholder-color="var(--link-color)" color="var(--body-color)" shape="square"
									height="88" :show-action="false" v-model="marketKey"
									:placeholder="$t('Please Enter')" @change="marketSearch" @clear="clearChange">
								</u-search>
							</view>
							<view class="result-banner u-flex u-row-right u-m-b-30"
								@click="$go('/pages/gameResults/index')">
								<view class="u-flex m-font-16">
									<view class="u-m-r-12">{{$t('menu5')}}</view>
									<view class="iconfont icon-right"></view>
								</view>
							</view>
							<view class="form-row u-m-b-20">
								<view class="game-tabs">
									<u-tabs height="64" bar-height="6" bar-width="80" bg-color="none" gutter="40"
										active-color="#ffffff" inactive-color="#9792B2" :list="tabs" :current="current"
										@change="changeTab">
									</u-tabs>
									<view class="iconfont icon-ssd u-m-l-16 m-font-xs" style="transition: .3s all;"
										:style="!collOpen?'transform: rotateZ(180deg);':'transform: rotateZ(0);'"
										@click="collOpen = !collOpen"></view>
								</view>
							</view>
							<view class="mark-group">
								<template>
									<view class="mark-m-row">
										<template v-if="emtpy == 1">
											<uni-collapse ref="collapse" v-model="collvalue">
												<uni-collapse-item class="collapseClass" :marketV2="true" v-if="item"
													v-for="(item,i) in arr_keys" :key="i" :open="collOpen">
													<template v-slot:title>
														<view class="flex-1 u-flex">
															<view>{{item}}</view>
															<view class="market-item-sum"
																v-if="ls_match[item] && ls_match[item].length > 0">
																{{ls_match[item].length}}
															</view>
														</view>
													</template>
													<view class="market-m-list"
														:class="res.is_vip == 1 ? 'market-m-vip-list' : ''"
														v-for="(res, index) in ls_match[item]" :key="`list1${index}`"
														@click="goList(res.sc_id)">
														<view class="market-game-card">
															<view class="col">
																<template v-if="res.zd_logo">
																	<image :src="res.zd_logo" class="marketHeader">
																	</image>
																</template>
																<template v-else>
																	<image :src="marketHeaderZD" mode=""
																		class="marketHeader">
																	</image>
																</template>
																<view class="team-tit u-m-t-10">{{$t(res.zd_name)}}
																</view>
															</view>
															<view class="vs-middle">
																<view class="vs-score">
																	<text class="vs-lg m-font-b">vs</text>
																</view>
																<view class="m-font-12">
																	{{res.sc_time}}
																</view>
															</view>
															<view class="col">
																<template v-if="res.kd_logo">
																	<image :src="res.kd_logo" class="marketHeader">
																	</image>
																</template>
																<template v-else>
																	<image :src="marketHeaderKD" mode=""
																		class="marketHeader">
																	</image>
																</template>
																<view class="team-tit u-m-t-10">{{$t(res.kd_name)}}
																</view>
															</view>
														</view>
													</view>
												</uni-collapse-item>
											</uni-collapse>
										</template>
										<template v-if="emtpy == 2">
											<listEmpty :isDefault="true"></listEmpty>
										</template>
									</view>
								</template>
							</view>
							<u-back-top :scroll-top="scrollTop" top="600" mode="square" tips="TOP" right="335"
								bottom="100" :custom-style="backStyle" :icon-style="backIconStyle"></u-back-top>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>
<script>
	import lxCalendar from '@/components/lx-calendar/lx-calendar.vue'
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	import {
		accMul,
		accAdd,
		changeTwoDecimal_f
	} from '@/common/tool.js'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			lxCalendar,
			listEmpty,
			pcNavHeader,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				href: '',
				sideshow: false,
				// list
				leagueList: [],
				matchList: [],
				matchList1: [],
				matchList2: [],
				// tab
				current: 0,
				status: 'more',
				tstatus: 'more',
				mstatus: 'more',
				gstatus: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				t_contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				m_contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				g_contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				ls_id: 0,
				page: 0,
				tpage: 1,
				mpage: 1,
				gpage: 1,
				type: 0,
				ygValue: 2,
				all_count: 0,
				today_count: 0,
				tomorrow_count: 0,
				enable: true,
				matchBg_data: '',
				marketKey: '',
				leagueKey: '',
				curDot: 0,
				leaguePop: false,
				customStyle: {
					"backgroundColor": "none"
				},
				current: 0,
				markValue: 0,
				markcurrent: 0,
				emtpy: null,
				emtpy1: null,
				emtpy2: null,
				collvalue: "0",
				ls_matchs: [],
				ls_match: [],
				arr_keys: [],
				arr_limit: 15,
				collOpen: true,
				scrollTop: 0,
				backStyle: {
					opacity: '.9',
					color: '#fff',
					fontWeight: 'bold',
					background: '#1d1737'
				},
				backIconStyle: {
					color: '#fff',
					fontSize: '17px',
					fontWeight: 'bold'
				},
				quicklyKeys: 1,
				orderList: [],
				ranking: [],
				filtervalue: 0,
				barStyle: {
					background: '#FFB800'
				},
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		computed: {
			tabs() {
				if (this.$helper.get('rule').match_time_num > 0) {
					return [{
						name: this.$t("game6") + " " + this.all_count
					}]
				} else {
					return [{
							name: this.$t("game6") + " " + this.all_count
						},
						{
							name: this.$t("game25") + " " + this.today_count
						},
						{
							name: this.$t("game26") + " " + this.tomorrow_count
						}
					]
				}
			},
		},
		onShow() {
			this.enable = true;
			uni.setNavigationBarTitle({
				title: this.$t('menu1')
			});
			this.getMathBg();
		},
		onHide() {
			this.enable = false;
		},
		async onLoad() {
			this.getMatchListLea_all();
			this.getMatchStat(); // 赛事数量
			// this.getOrderList();
			// this.getRanking();
		},
		onReachBottom() {
			this.page += 1;
			this.addPage();
		},
		methods: {
			parentMenu() {
				this.menuToggle()
			},
			getRanking() {
				this.$u.api.ranking_p().then(res => {
					if (res.data != null) {
						this.ranking = res.data;
					}
				});
			},
			clearChange() {
				this.page = 0;
				this.arr_limit = 15;
				this.addPage();
			},
			addPage() {
				let arr_key = [];
				if (this.marketKey) {
					arr_key = this.SearchDdata();
				} else {
					arr_key = Object.keys(this[`ls_matchs`]);
				}
				if (arr_key.length > 0) {
					this.arr_keys = this.arr_keys.concat(arr_key.slice(this.page * this.arr_limit, this.page * this
						.arr_limit + this.arr_limit));
				} else {
					this.arr_keys = [];
				}
			},
			SearchDdata() {
				let v = this.marketKey;
				if (v) {
					let arr_search = [];
					let arr_key = Object.keys(this[`ls_matchs`]);
					this.ls_match = [];
					for (let name_1 in this.ls_matchs) {
						let ls_teams = [];
						for (let name_2 in this.ls_matchs[name_1]) {
							// 主队名称搜索 || 客队名称搜索
							if (this.ls_matchs[name_1][name_2].zd_name.search(v) != -1 || this.ls_matchs[name_1][name_2]
								.kd_name.search(v) != -1) {
								ls_teams.push(this.ls_matchs[name_1][name_2]);
								if (!arr_search.includes(name_1)) {
									arr_search.push(name_1);
								}
							}
						}
						if (ls_teams.length > 0) {
							this.ls_match[name_1] = ls_teams;
						}
					}
					for (let i in arr_key) {
						// 联赛名称搜索
						if (arr_key[i].search(v) != -1) {
							arr_search.push(arr_key[i]);
						}
					}
					this.arr_keys = arr_search;
					return this.arr_keys
				}else {
					this.changeTab(this.current);
				}
			},
			quicklyChange(i) {
				this.quicklyKeys = i;
			},
			// 跟投
			async getOrderList() {
				let res = await this.$u.api.order_list_p({
					limit: 8
				});
				if (res && res.code == 1) {
					this.orderList = res.data;
				}
			},
			marketSearch() {
				this.SearchDdata();
			},
			async getMatchStat() {
				let res = await this.$u.api.match_stat_p({
					date: 'all'
				});
				if (res && res.code == 1) {
					this.all_count = res.data.all_count;
					this.today_count = res.data.today_count;
					this.tomorrow_count = res.data.tomorrow_count;
				}
			},
			// 日历
			calChange(e) {
				if (e.fulldate != e.olddate) {}
			},
			getMathBg() {
				if (this.$t('matchBg') != 'matchBg') {
					this.matchBg_data = this.$t('matchBg');
				} else {
					this.matchBg_data = '/static/images/bg/2_objects@2x.png';
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			goList(id) {
				if (this.$helper.get('token')) {
					if (this.isGoogle != 1) {
						this.$go(`/pages/market/marketContent?id=${id}`);
					}
				} else {
					this.$go('/pages/login/index');
				}
			},
			getMarLs(target) {
				let ls_ids = []
				for (let i in target) {
					if (ls_ids[target[i]['ls_id']]) {
						ls_ids[target[i]['ls_id']].push(target[i])
					} else {
						ls_ids[target[i]['ls_id']] = [target[i]]
					}
				}
				return ls_ids;
			},
			// tab
			changeTab(index) {
				this.collOpen = true;
				this.current = index;
				this.type = index;
				this.marketKey = '';
				this.page = 0;
				this.emtpy = null;
				this.ls_matchs = [];
				this.ls_match = [];
				this.arr_keys = [];
				if (index == 0) {
					this.getMatchListLea_all();
				} else if (index == 1) {
					this.getMatchListLea_today();
				} else {
					this.getMatchListLea_tomorrow();
				}
			},
			async getMatchListLea_all() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.match_list_all_g();
				if (res) {
					uni.hideLoading();
					this.ls_matchs = res.data;
					this.ls_match = res.data;
					this.addPage();
					if (this.arr_keys.length > 0) {
						this.emtpy = 1;
					} else {
						this.emtpy = 2;
					}
				}
			},
			async getMatchListLea_today() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.match_list_today_g();
				if (res) {
					uni.hideLoading();
					this.ls_matchs = res.data;
					this.ls_match = res.data;
					this.addPage();
					if (this.arr_keys.length > 0) {
						this.emtpy = 1;
					} else {
						this.emtpy = 2;
					}
				}
			},
			async getMatchListLea_tomorrow() {
				uni.showLoading({
					title: this.$t('loading')
				});
				let res = await this.$u.api.match_list_tomorrow_g();
				if (res) {
					uni.hideLoading();
					this.ls_matchs = res.data;
					this.ls_match = res.data;
					this.addPage();
					if (this.arr_keys.length > 0) {
						this.emtpy = 1;
					} else {
						this.emtpy = 2;
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.pc-filter-tabs {
		padding: 18px 0;
		color: #ffffff;

		.filter-title {
			padding: 0 18px;
		}

		::v-deep .u-tabs {
			font-size: 0;
			border-bottom: 1px solid #4D4886;
		}

		::v-deep .u-tab-item {
			cursor: pointer;
		}

		::v-deep .item-active::after {
			background-image: linear-gradient(to bottom, rgba(233, 174, 58, .02), rgba(233, 174, 58, .2));
			content: '';
			height: 100%;
			position: absolute;
			bottom: 0;
			left: 10px;
			right: 10px;
		}

		::v-deep .item-active {
			.u-tab-bar {
				border-radius: 10px 10px 0 0 !important;
			}
		}
	}

	.game-tabs {
		position: relative;
		margin-bottom: 15px;
		height: 68rpx;
		box-sizing: content-box;
		border-bottom: 2px solid #4D4886;

		::v-deep .u-tab-bar {
			background-color: #E9AE3A !important;
			border-radius: 6px 6px 0 0 !important;
			box-shadow: 1px -3px 6px #FFB80080;
			margin-bottom: -2px;
		}

		.icon-ssd {
			position: absolute;
			right: 0;
			top: 40%;
			color: #aca7e8;
			transform: translateY(-30%);
		}
	}

	.gooLight {
		background: var(--mar-bg);
		border-radius: 15px 15px 0 0;
	}

	.lenueg-class {
		background-color: var(--lenueg-class-bg);
		border-radius: 10px;
		border: 1px solid var(--lenueg-class-bg);
		padding: 10px;
		margin-bottom: 10px;
		color: var(--navbar-color);
		box-shadow: var(--shadow-bg);
	}

	.pc-game-tabs {
		::v-deep .u-tab-item {
			border-radius: 5px;
			cursor: pointer;
			margin-right: 10px;
			color: var(--main-skin-color) !important;
			border: 1px solid var(--pc-game-tabs-border);
		}

		::v-deep .item-active {
			background: var(--pc-game-tabs-active);
			border: none;
			color: #fff !important;
		}
	}

	.container {
		background: var(--mar-bg);
	}


	.pc-collapseClass {
		margin-bottom: 12px;
	}

	.collapseClass {
		margin-bottom: 12px;
		background: #312B4F;
		border-radius: 16px;
		overflow: hidden;
	}

	.collapseClass:last-child {
		margin-bottom: 0
	}

	.tt-time {
		background-color: transparent;
		font-size: 12px;
		color: #999;
	}

	.mark-m-row ::v-deep .market-box {
		color: #ffffff;
		cursor: pointer;
	}

	.form-row ::v-deep .u-content {
		border-radius: 16px !important;
	}

	.result-banner {
		width: 100%;
		height: 68px;
		padding: 15px;
		margin-top: 15px;
		border-radius: 16px;
		background-image: url('@/static/images/index/market-list-bg.png');
		background-repeat: no-repeat;
		background-size: cover;
	}

	.collapseClass ::v-deep .uni-collapse-item__wrap-content {
		border-radius: 0 0 16px 16px;
		background: #312B4F;
	}

	.collapseClass ::v-deep .uni-collapse-item__title-arrow {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #D1CCE9;
		border-radius: 50%;
		background-color: #4D4886;
	}

	.market-m-vip-list {
		border: 2px solid rgba(233, 174, 58, 1)
	}

	// pc
	.market-pc-cell {
		padding: 10px;
		text-align: left;
		color: #ffffff;
		border-bottom: 1px solid #4d4886;
	}

	.market-pc-cell:last-child {
		border-bottom: 0;
	}

	.team-icon {
		width: 40px;
		height: 40px;
		background-color: #312B4F;
		border: 1px solid #3e3664;
		border-radius: 40px;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 28px;
			height: 28px;
			border-radius: 28px;
		}
	}

	.collapseClass {
		.team-icon:last-child {
			margin-left: -10px;
		}
	}

	.market-item-sum {
		margin-left: 5px;
		font-size: 16px;
		font-weight: bold;
		color: rgba(151, 146, 178, 1);
	}
</style>

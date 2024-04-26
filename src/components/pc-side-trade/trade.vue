<template>
	<view class="pc-side-trade">
		<view class="side-title u-p-20 u-p-t-40">
			<text class="m-font-18">{{$t("我的注单")}}</text>
		</view>
		<view class="top-link-tabs flex-center " style="margin-bottom: 0;">
			<view class="n-tab_item" @click="changeTab(index)" :class="current == index ? 'active':''"
				v-for="(item,index) in tabs">
				<text class="item-text">{{item.name}}</text>
			</view>
		</view>
		<view class="bs-wrapper-two">
			<template v-if="current == 0">
				<view class="trade-main">
					<view class="tra-filter">
						<view class="flex_bd">
							<view class="tra-item" @click="show = true">
								<text>{{selectStatus}}</text>
								<text class="iconfont icon-sj-down u-font-xs u-m-l-10"
									style="color: #D1CCE9;"></text>
							</view>
						</view>
						<view class="u-flex tra-item" >
							<text class="iconfont icon-f_per_help"></text>
							<text class="u-m-l-10">{{$t('支持')}}</text>
						</view>
					</view>
					<template v-if="showEmpty == 1">
						<uni-collapse ref="collapse" v-model="collvalue">
							<uni-collapse-item class="collapseClass" v-for="(res,index) in tradingList"
								:class="res.is_vip == 1 ? 'vip-item' : ''" :key="`list1${index}`"
								:open="collOpen">
								<template v-slot:title>
									<view class="tra-title">
										<view class="col-status">
											{{res.status == 1 ?$t('进行中') : res.status == 2 ? $t('已撤单') : $t('已结算')}}
										</view>
										<view class="col-value">
											{{res.tz_price?res.tz_price+' ₽':'0.00 ₽'}}
										</view>
									</view>
									<view class="u-flex u-p-20">
										<view class="u-flex">
											<view class="team-icon">
												<image :src="res.zd_logo" v-if="res.zd_logo"></image>
												<image :src="marketHeaderZD" v-if="!res.zd_logo"></image>
											</view>
											<view class="team-icon">
												<image :src="res.kd_logo" v-if="res.kd_logo"></image>
												<image :src="marketHeaderKD" v-if="!res.kd_logo"></image>
											</view>
										</view>
										<view class="u-m-l-20">
											<view class="u-flex">
												<view>{{res.zd_name}}</view>
												<view class="u-c-9 u-m-l-10 u-m-r-10">VS</view>
												<view>{{res.kd_name}}</view>
											</view>
											<view class="vip-item-label u-m-t-14" v-if="res.is_vip == 1">
												<text class="iconfont icon-shoucang4 m-font-12 u-m-r-12"></text>
												<text>VIP</text>
											</view>
										</view>
									</view>
								</template>
								<view class="collapse-body">
									<view class="collapse-row" @click="common_copy(res.zd_number)">
										<view class="collapse-label">{{$t("trade4")}}</view>
										<view class="collapse-value">
											<text class="iconfont icon-fuzhi2"></text>
											<text>{{res.zd_number}}</text>
										</view>
									</view>
									<view class="collapse-row">
										<view class="collapse-label">{{$t("game53")}}</view>
										<view class="collapse-value">
											{{res.tz_price?res.tz_price+' ₽':'0.00 ₽'}}
										</view>
									</view>
									<view class="collapse-row">
										<view class="collapse-label">{{$t("下单时间")}}</view>
										<view class="collapse-value">{{res.add_time}}</view>
									</view>
									<view class="collapse-row">
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
											<text v-if="res.status == 3"
												style="color:#f00;">{{$t('输')}}</text>
											<text v-if="res.status == 4"
												style="color:green;">{{$t('赢')}}</text>
										</view>
									</view>
									<view class="collapse-row"
										v-if="showCel_order == 1 && res.status == 1">
										<view @click="revoke(res.id)" class="revokeBtn">
											{{$t("gencz1")}}
										</view>
									</view>
								</view>
							</uni-collapse-item>
						</uni-collapse>
					</template>
					<template v-if="showEmpty == 0">
						<view class="u-p-30">
							<listEmpty :isDefault="true" class="u-bd-8" :listHighly='500'>
							</listEmpty>
						</view>
					</template>
				</view>
			</template>
			<!-- 体育订单 -->
			<template v-if="current == 1">
				<view class="trade-main">
					<view class="tra-filter">
						<view class="u-flex u-time-bar u-m-auto" @click="dataShow = true">
							<view class="u-m-r-16">{{$t(sreachData)}}</view>
							<text class="iconfont icon-calendar" style="color: #D1CCE9;"></text>
						</view>
					</view>
					<template v-if="showEmptyC == 1">
						<uni-collapse ref="collapse" v-model="collvalue">
							<template>
								<uni-collapse-item class="collapseClass"
									v-for="(item,index) in gameList" :key="`list2${index}`"
									:open="collOpen">
									<template v-slot:title>
										<view class="tra-title">
											<view class="col-status " v-if="item.gb_winlose == 0">
												<image src="../../static/images/ArrowUp.png" mode="">
												</image>
												<text>{{$t('无效')}}</text>
											</view>
											<view class="col-status " v-if="item.gb_winlose == 1">
												<image src="../../static/images/plus-circle2.png"
													mode=""></image>
												<text>{{$t('user3')}}</text>
											</view>
											<view class="col-status " v-if="item.gb_winlose == 2">
												<image src="../../static/images/ArrowUp.png" mode="">
												</image>
												<text>{{$t('trade13')}}</text>
											</view>
											<view class="col-status " v-if="item.gb_winlose == 3">
												<image src="../../static/images/plus-circle2.png"
													mode=""></image>
												<text>{{$t('trade12')}}</text>
											</view>
											<view class="col-status " v-if="item.gb_winlose == 4">
												<image src="../../static/images/plus-circle2.png"
													mode=""></image>
												<text>{{$t('平')}}</text>
											</view>
											<view class="col-value">
												{{numberLimit(item.gb_price)}}
											</view>
										</view>
									</template>
									<view class="collapse-body">
										<view class="collapse-row" @click="common_copy(item.gb_sn)">
											<view class="collapse-label">{{$t("trade4")}}</view>
											<view class="collapse-value">
												<text class="iconfont icon-fuzhi2"></text>
												<text>{{item.gb_sn}}</text>
											</view>
										</view>
										<view class="collapse-row">
											<view class="collapse-label">{{$t("游戏厅")}}</view>
											<view class="collapse-value">{{$t(item.game_name)}}</view>
										</view>
										<view class="collapse-row">
											<view class="collapse-label">{{$t("获利")}}</view>
											<view class="collapse-value">
												{{numberLimit(item.gb_winprice)}}
											</view>
										</view>
										<view class="collapse-row">
											<view class="collapse-label">{{$t('类型')}}</view>
											<view class="collapse-value">
												{{res.money_type == 1?$t('余额'):$t('基金')}}
											</view>
										</view>
									</view>
								</uni-collapse-item>
							</template>
						</uni-collapse>
		
					</template>
					<template v-if="showEmptyC == 0">
						<view class="u-p-30">
							<listEmpty :isDefault="true" class="u-bd-8" :listHighly='500'>
							</listEmpty>
						</view>
					</template>
				</view>
			</template>
			<template v-if="current == 2">
				<view class="trade-main">
					<view class="tra-filter">
						<view class="u-flex u-time-bar u-m-auto" @click="dataShow = true">
							<view class="u-m-r-16">{{$t(sreachData)}}</view>
							<text class="iconfont icon-calendar" style="color: #D1CCE9;"></text>
						</view>
					</view>
					<template v-if="showEmptyC == 1">
						<uni-collapse ref="collapse" v-model="collvalue">
							<template>
								<uni-collapse-item class="collapseClass"
									v-for="(item,index) in gameList" :key="`list3${index}`"
									:open="collOpen">
									<template v-slot:title>
										<view class="tra-title">
											<view class="col-status " v-if="item.gb_winlose == 0">
												<image src="../../static/images/ArrowUp.png" mode="">
												</image>
												<text>{{$t('无效')}}</text>
											</view>
											<view class="col-status " v-if="item.gb_winlose == 1">
												<image src="../../static/images/plus-circle2.png"
													mode=""></image>
												<text>{{$t('user3')}}</text>
											</view>
											<view class="col-status " v-if="item.gb_winlose == 2">
												<image src="../../static/images/ArrowUp.png" mode="">
												</image>
												<text>{{$t('trade13')}}</text>
											</view>
											<view class="col-status " v-if="item.gb_winlose == 3">
												<image src="../../static/images/plus-circle2.png"
													mode=""></image>
												<text>{{$t('trade12')}}</text>
											</view>
											<view class="col-status " v-if="item.gb_winlose == 4">
												<image src="../../static/images/plus-circle2.png"
													mode=""></image>
												<text>{{$t('平')}}</text>
											</view>
											<view class="col-value">
												{{numberLimit(item.gb_winprice)}}
											</view>
										</view>
									</template>
									<view class="collapse-body">
										<view class="collapse-row" @click="common_copy(item.gb_sn)">
											<view class="collapse-label">{{$t("trade4")}}</view>
											<view class="collapse-value">
												<text class="iconfont icon-fuzhi2"></text>
												<text>{{item.gb_sn}}</text>
											</view>
										</view>
										<view class="collapse-row">
											<view class="collapse-label">{{$t("游戏厅")}}</view>
											<view class="collapse-value">{{$t(item.game_name)}}</view>
										</view>
		
										<view class="collapse-row">
											<view class="collapse-label">{{$t('类型')}}</view>
											<view class="collapse-value">
												{{res.money_type == 1?$t('余额'):$t('基金')}}
											</view>
										</view>
									</view>
								</uni-collapse-item>
							</template>
						</uni-collapse>
					</template>
					<template v-if="showEmptyC == 0">
						<view class="u-p-30">
							<listEmpty :isDefault="true" class="u-bd-8" :listHighly='500'>
							</listEmpty>
						</view>
					</template>
				</view>
			</template>
		</view>
		<u-calendar v-model="dataShow" color="#888" activeBgColor="var(--calendar-active-bg)"
			rangeColor="var(--calendar-active-bg)" rangeBgColor="var(--rangeBgColor-bg)" mode="range"
			@change="dataConfirm" :modeString="mobile_common?'bottom':'center'"></u-calendar>
		<u-popup v-model="tipShow" mode="center" class="u-popup-style" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup bs-tip-popup">
				<view class="bs-popup-hd">
					<view class="tt m-c-w">{{$t('提示')}}</view>
				</view>
				<view class="bs-popup-body">
					<view class="bs-tip">
						{{$t('你正在取消已下注单')}}
					</view>
					<view class="wt-btn-foot u-flex u-row-between u-m-t-60">
						<button class="btn btn--gray btn-bg" @click="tipShow = false">{{$t("public5")}}</button>
						<button class="btn btn--default" @click="cancelOrder">{{$t("public6")}}</button>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="show" mode="bottom" borderRadius="32">
			<view class="bs-popup-hd">
				<view class="tt">
					{{$t('请选择')}}
				</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode="" @click="show = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<scroll-view scroll-y="true" style="max-height: calc(100vh - 100px);">
					<view class="filter-cell" v-for="(item,index) in caterange" :key="`caterange${index}`"
						@click="catechange(item.value,item.text)">
						<view class="u-flex u-row-between">
							<view>{{item.text}}</view>
							<view class="iconfont icon-dui text-yellow" v-if="tradingKey == item.value"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
		</u-top-tips>
	</view>
</template>

<script>
	import listEmpty from '@/components/list-empty/list-empty.vue'
	export default {
		components: {
			listEmpty,
		},
		data() {
			return {
				sideshow: false,
				tradingList: [],
				page: 1,
				status: 'more',
				total_money: "0.00",
				total_profit: "0.00",
				time: '',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				contentTextC: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				turnShow: false, //刷新旋转样式
				showCel_order: null,
				showEmpty: null,
				showEmptyB: null,
				showEmptyC: 1,
				navBackground: {
					background: 'var(--ui-color-normal)'
				},
				itemData: {},
				cateValue: 1,
				caterange: [{
						value: 1,
						text: this.$t('全部')
					},
					{
						value: 2,
						text: this.$t('进行中')
					},
					{
						value: 3,
						text: this.$t('已撤单')
					},
					{
						value: 4,
						text: this.$t('已结算')
					}
				],
				sreachData: this.$t('选择日期'),
				dataShow: false,
				dataTime: '',
				tipShow: false,
				orderId: '',
				start_time: '',
				end_time: '',
				tradingKey: 1,
				current: 0,
				sport_page: 1,
				sport_status: 'more',
				sportList: [],
				sport_content: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				gameList: [],
				game_status: 'more',
				game_page: 1,
				game_content: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				show: false,
				collvalue: '',
				collOpen: false,
				selectStatus: this.$t('请选择')
			}
		},
		computed: {
			tabs() {
				return [{
						name: this.$t("逆向策略")
					},
					{
						name: this.$t("三方体育")
					}
				]
			},
		},
		async mounted() {
			await this.setHeadInfo();
			await this.setCapableTitle();
			uni.setNavigationBarTitle({
				title: this.$t('menu2')
			});
			this.getTrading('add');
			this.showCleOrder();
		},
		async onLoad(options) {
			
		},
		onReachBottom() {
			switch (this.current) {
				case 0:
					if (this.status == 'noMore') {
						return;
					}
					this.getTrading();
					break;
				case 1:
					if (this.game_status == 'noMore') {
						return;
					}
					this.getGameOrder();
					break;
				case 2:
					if (this.game_status == 'noMore') {
						return;
					}
					this.getGameOrder();
					break;
				default:
					break;
			}
		},
		methods: {
			scrolltolowerChnage() {
				switch (this.current) {
					case 0:
						if (this.status == 'noMore') {
							return;
						}
						this.getTrading();
						break;
					case 1:
						if (this.game_status == 'noMore') {
							return;
						}
						this.getGameOrder();
						break;
					case 2:
						if (this.game_status == 'noMore') {
							return;
						}
						this.getGameOrder();
						break;
					default:
						break;
				}
			},
			// 获取体育订单
			async getGameOrderSports(add) {
				let res = await this.$u.api.game_order_sports_p({
					page: this.sport_page,
					limit: 10,
					isday: 0,
					date: this.start_time ? this.start_time + '|' + this.end_time : ''
				});
				if (res) {
					if (add) {
						this.sportList = res.data;
					} else {
						this.sportList = this.sportList.concat(res.data)
					}
					if (res.data.length == 10) {
						this.sport_status = "loading";
						this.sport_page++;
					} else {
						this.sport_status = "noMore";
					}
					if (this.sportList.length > 0) {
						this.showEmptyB = 1;
					} else {
						this.showEmptyB = 0;
					}
				}
			},
			// 获取三方游戏订单
			async getGameOrder(add) {
				uni.showLoading({
					title: this.$t('loading')
				})
				let res = await this.$u.api.game_order_p({
					page: this.game_page,
					limit: 10,
					isday: 0,
					sports: this.current == 0 ? '' : this.current,
					date: this.start_time ? this.start_time + '|' + this.end_time : ''
				});
				if (res) {
					uni.hideLoading();
					if (add) {
						this.gameList = res.data;
					} else {
						this.gameList = this.gameList.concat(res.data)
					}
					if (res.data.length == 10) {
						this.game_status = "loading";
						this.game_page++;
					} else {
						this.game_status = "noMore";
					}
					if (this.gameList.length > 0) {
						this.showEmptyC = 1;
					} else {
						this.showEmptyC = 0;
					}
				}
			},
			changeTab(e) {
				this.start_time = '';
				this.end_time = '';
				this.sreachData = this.$t('选择日期');
				this.current = e;
				switch (e) {
					case 0:
						this.page = 1;
						this.status = 'loading';
						this.tradingList = [];
						this.getTrading('add');
						break;
					case 1:
						this.game_page = 1;
						this.game_status = 'loading';
						this.gameList = [];
						this.getGameOrder('add');
						break;
					case 2:
						this.game_page = 1;
						this.game_status = 'loading';
						this.gameList = [];
						this.getGameOrder('add');
						break;
					default:
						break;
				}
			},
			catechange(e, i) {
				this.selectStatus = i;
				this.start_time = '';
				this.end_time = '';
				this.sreachData = this.$t('选择日期');
				this.tradingKey = e;
				this.page = 1;
				this.status = 'loading';
				this.tradingList = [];
				this.getTrading('add');
				this.show = false;
			},
			//判断是否显示撤单功能
			showCleOrder() {
				let posi = this.$helper.get('rule');
				if (posi) {
					this.showCel_order = posi.revoke_order;
				}
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async cancelOrder() {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.matchrevoke_p({
					order_id: this.orderId
				});
				if (ret.code == 1) {
					this.tradingList = [];
					this.page = 1;
					this.getTrading();
					this.tipShow = false;
					this.getUserInfo_common();
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
				} else {
					this.$refs.uTips.show({
						title: this.$t(ret.msg)
					});
					this.tipShow = false;
				}
			},
			revoke(order_id) {
				this.orderId = '';
				this.tipShow = true;
				this.orderId = order_id;
			},
			async getTrading(add) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.trading_p({
					page: this.page,
					limit: 10,
					zd_type: this.tradingKey,
					start_time: this.start_time,
					end_time: this.end_time
				});
				if (ret) {
					this.total_money = ret.data.total_money;
					this.total_profit = ret.data.total_profit;
					this.time = ret.data.time;
					if (ret.data.list.length > 0) {
						this.showEmpty = 1;
					} else {
						this.showEmpty = 0;
					}
					if (add) {
						this.tradingList = ret.data.list;
					} else {
						this.tradingList = this.tradingList.concat(ret.data.list)
					}
					// 加载状态结束
					if (ret.data.list.length == 10) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
				} else {
					this.showEmpty = 0;
					this.status = "noMore";
				}
			},
			dataConfirm(e) {
				this.start_time = '';
				this.end_time = '';
				// this.sreachData = e.startDate_my + '-' + e.endDate_my;
				this.sreachData = e.startMonth + '/' + e.startDay + '/' + e.startYear + ' - ' + e.endMonth + '/' + e
					.endDay + '/' + e.endYear;
				this.start_time = e.startDate;
				this.end_time = e.endDate
				switch (this.current) {
					case 0:
						this.page = 1;
						this.status = 'loading';
						this.tradingList = [];
						this.getTrading('add');
						break;
					case 1:
						// this.sport_page = 1;
						// this.sport_status = 'loading';
						// this.sportList = [];
						// this.getGameOrderSports('add');
						this.game_page = 1;
						this.game_status = 'loading';
						this.gameList = [];
						this.getGameOrder('add');
						break;
					case 2:
						this.game_page = 1;
						this.game_status = 'loading';
						this.gameList = [];
						this.getGameOrder('add');
						break;
					default:
						break;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.team-icon{
		width: 40px;
		height: 40px;
		background-color: #312B4F;
		border-radius: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 28px;
			height: 28px;
			border-radius: 28px;
		}
	}
	.collapseClass {
		.team-icon:last-child{
			margin-left: -10px;
		}
	}
	.top-link-tabs .n-tab_item{
		margin: 0;
	}
	.tra-item{
		cursor: pointer;
		.icon-f_per_help{
			font-size: 14px;
		}
	}
	.bs-wrapper-two{
		padding: 15px 8px!important;
	}
	.vip-item {
		border: 2px solid rgba(233, 174, 58, 1);
	}

	.vip-item-label {
		padding: 2px 6px;
		border-radius: 6px;
		display: inline-block;
		background: linear-gradient(180deg, #F0B000 0%, #EC8D00 100%);
	}

	.collapseClass {
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
		::v-deep .uni-collapse-item__title{
			position: relative;
			cursor: pointer;
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
			position: absolute;
			right: 0px;
			top:10px;
		}
	}

	.tra-title {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 40px 12px 12px;
		height: 55px;
		.col-status {
			display: flex;
			align-items: center;
		}
		&::after{
			content: '';
			height: 1px;
			background-color: #4D4886;
			position: absolute;
			left: 10px;
			right: 10px;
			bottom: 0;
		}
	}


	.revokeBtn {
		width: 100%;
		padding: 12px 20px;
		border-radius: 12px;
		background: rgba(100, 76, 188, 1);
		text-align: center;
	}

	.riqiClass {
		color: #204BBB;
		font-size: 0;
	}

	.container {
		::v-deep .uni-navbar {
			background: var(--mar-bg);
		}
	}

	.btn-bg {
		background-color: var(--tradeing-on-bg) !important;
	}


	.gooLight {
		padding-top: 70px;
	}

	.tra-topbar .icon-zqline {
		width: 22px;
		height: 15px;
		background-image: url('@/static/images/skin/bluelight/traing-icon.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.tra-topbar .icon-zqline::before {
		display: none;
	}

	.pc-n-tab_item {
		min-width: 90px;
		height: 42px;
		background: #F6F7F9;
		border-radius: 3px;
		line-height: 42px;
		text-align: center;
		margin-right: 10px;
		cursor: pointer;
	}

	.pc-n-tab_item.active {
		color: #fff;
		background: var(--pc-n-tab_item-active);
	}

	.tra-select ::v-deep .uni-select .uni-select__input-text {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		white-space: inherit;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.tra-select ::v-deep .uni-select .uni-select__selector-item {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		white-space: inherit;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.filter-cell {
		padding: 16px;
		border-bottom: 1px solid #4c4882;
	}
	
	.pc-side-trade{
		border-left: 1px solid #3E3664;
		height: 100%;
	}
	
	
	
</style>

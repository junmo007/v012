<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<!-- 轮播图 -->
			<view class="pc-main">
				<u-row gutter="45" class="u-m-t-30 u-col-top" style="align-items: flex-start;">
					<u-col span="8">
						<view class="u-flex u-row-between u-p-b-12" style="border-bottom: 1px solid #111225;">
							<view class="main-skin-color m-font-b">{{$t('市场列表')}}</view>
							<view class="pc-game-tabs">
								<u-tabs height="64" bar-height="0" bg-color="none" gutter="40" active-color="#ffffff"
									inactive-color="#ffffff" :list="tabs" :current="current" @change="changeTab">
								</u-tabs>
							</view>
						</view>
						<view class="form-row u-flex u-m-b-30 u-m-t-30" style="width: 300px">
							<u-search bg-color="" border-color="#111225" search-icon-color="#999"
								placeholder-color="#999" color="#999" shape="square" height="70" :show-action="false"
								v-model="marketKey" :placeholder="$t('Please Enter')" @search="marketSearch"></u-search>
						</view>
						<view class="mark-group">
							<template v-if="current == 0">
								<view class="mark-m-row">
									<template v-if="emtpy == 1">
										<uni-collapse ref="collapse" v-model="collvalue">
											<template>
												<uni-collapse-item class="pc-collapseClass" :marketV2="true" v-if="item"
													v-for="(item,i) in arr_keys" :key="i" :open="collOpen">
													<template v-slot:title>
														<view class="flex-1">{{item}}</view>
													</template>
													<view style="height:8px;"></view>
													<view class="market-m-list"
														:class="res.bet_level > 0 ? 'market-m-vip-list' : ''"
														v-for="(res, index) in ls_match1[item]" :key="`list1${index}`"
														@click="goList(res.sc_id)">
														<view class="vip-market-left-icon" v-if="res.bet_level > 0">
														</view>
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
																<view class="team-tit">{{$t(res.zd_name)}}</view>
															</view>
															<view class="vs-middle">
																<view class="vs-score">
																	<text class="vs-lg m-font-b"
																		:class="res.bet_level > 0 ? 'market-vip-vs-color' : ''">vs</text>
																</view>
																<view class="tt-time"
																	:class="res.bet_level > 0?'vip-green-color-e':''">
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
																<view class="team-tit">{{$t(res.kd_name)}}</view>
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
							<template v-if="current == 1">
								<view class="mark-m-row">
									<template v-if="emtpy == 1">
										<uni-collapse ref="collapse" v-model="collvalue">
											<uni-collapse-item class="pc-collapseClass" :marketV2="true"
												:open="collOpen" v-for="(item,i) in arr_keys" :key="i">
												<template v-slot:title>
													<view class="flex-1">{{item}}</view>
												</template>
												<view class="market-m-list"
													:class="res.bet_level > 0 ? 'market-m-vip-list' : ''"
													v-for="(res, index) in ls_match2[item]" :key="`list2${index}`"
													@click="goList(res.sc_id)">
													<view class="vip-market-left-icon" v-if="res.bet_level > 0">
													</view>
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
															<view class="team-tit">{{$t(res.zd_name)}}</view>
														</view>
														<view class="vs-middle">
															<view class="vs-score">
																<text class="vs-lg main-skin-color m-font-b">vs</text>
															</view>
															<view class="u-font-xs"
																:class="res.bet_level > 0?'vip-green-color-e':''">
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
															<view class="team-tit">{{$t(res.kd_name)}}</view>
														</view>
													</view>
												</view>
												<view style="height:5px;"></view>
											</uni-collapse-item>
										</uni-collapse>
									</template>
									<template v-if="emtpy == 2">
										<listEmpty :isDefault="true"></listEmpty>
									</template>
								</view>
							</template>
							<template v-if="current == 2">
								<view class="mark-m-row">
									<template v-if="emtpy == 1">
										<uni-collapse ref="collapse" v-model="collvalue">
											<uni-collapse-item class="pc-collapseClass" :marketV2="true"
												:open="collOpen" v-for="(item,i) in arr_keys" :key="i">
												<template v-slot:title>
													<view class="flex-1">{{item}}</view>
												</template>
												<view class="market-m-list"
													:class="res.bet_level > 0 ? 'market-m-vip-list' : ''"
													v-for="(res, index) in ls_match3[item]" :key="`list3${index}`"
													@click="goList(res.sc_id)">
													<view class="vip-market-left-icon" v-if="res.bet_level > 0">
													</view>
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
															<view class="team-tit">{{$t(res.zd_name)}}</view>
														</view>
														<view class="vs-middle">
															<view class="vs-score">
																<text class="vs-lg main-skin-color m-font-b">vs</text>
															</view>
															<view class="u-font-xs"
																:class="res.bet_level > 0?'vip-green-color-e':''">
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
															<view class="team-tit">{{$t(res.kd_name)}}</view>
														</view>
													</view>
												</view>
												<view style="height:5px;"></view>
											</uni-collapse-item>
										</uni-collapse>
									</template>
									<template v-if="emtpy == 2">
										<listEmpty :isDefault="true"></listEmpty>
										</listEmpty>
									</template>
								</view>
							</template>
						</view>
					</u-col>
					<u-col span="4" v-if="orderList.length > 0">
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
										<!-- <image src="@/static/images/pc/kuea-market.png"
											style="min-width: 70px;width: 70px;height: 41px;margin-right: auto;">
										</image> -->
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
					</u-col>
				</u-row>
			</view>
		</template>
		<template v-if="mobile_common">
			<view class="content">
				<view class="container">
					<uniNavHeader :title="this.$t('VIP赛事')" ref="header" isback></uniNavHeader>
					<view class="bs-wrapper">
						<template v-if="listEmpty == 1">
							<view class="m-index-market" v-for="(item,index) in matchList" :key="`matchList${index}`"
								@click.stop="openList(item)"
								:class="[index>0?'u-m-t-20':'',item.is_vip == 1?'m-index-market-pwd':'']">
								<view class="top clickOver u-p-30"
									:class="item.is_pwd == 1 || item.is_vip == 1 ?'u-flex u-row-between':''">
									<view class="market-pwd m-c-w u-flex" v-if="item.is_pwd == 1 && item.is_vip == 2">
										<view class="iconfont icon-shoucang4"></view>
										<view class="iconfont icon-suoding u-m-l-20"></view>
									</view>
									<view class="market-pwd m-c-w u-flex"
										v-else-if="item.is_vip == 1 && item.is_pwd == 2">
										<view class="iconfont icon-shoucang4"></view>
										<view class="u-m-l-8 u-m-r-8 u-m-l-20">{{$t('VIP'+(Number(item.bet_level) - 1))}}</view>
									</view>
									<view class="market-pwd m-c-w u-flex"
										v-else-if="item.is_vip == 1 && item.is_pwd == 1">
										<view class="iconfont icon-shoucang4"></view>
										<view class="u-m-l-8 u-m-r-8">{{$t('VIP'+(Number(item.bet_level) - 1))}}</view>
										<view class="iconfont icon-suoding"></view>
									</view>
									<view class="u-flex u-row-center">
										<view>{{$t('比赛时间')}}</view>
										<view class="text-yellow u-m-l-10">{{item.sc_time}}</view>
									</view>
								</view>
								<view class="line clickOver"></view>
								<view class="center clickOver u-flex u-row-between u-p-30">
									<view class="left u-flex flex--direction u-row-center w_45">
										<template v-if="item.zd_logo">
											<u-image :src="item.zd_logo" width="40px" height="40px" borderRadius="50%">
											</u-image>
										</template>
										<template v-else>
											<u-image :src="marketHeaderZD" width="40px" height="40px"
												borderRadius="50%">
											</u-image>
										</template>
										<view class="m-line-1 u-m-t-20">{{item.zd_name}}</view>
									</view>
									<view class="vs m-font-24 m-font-b u-m-r-30 u-m-l-30 u-flex">
										<view>{{item.bd.zd}}</view>
										<view class="u-m-l-10 u-m-r-10 u-p-b-8">:</view>
										<view>{{item.bd.kd}}</view>
									</view>
									<view class="right u-flex flex--direction u-row-center w_45">
										<template v-if="item.kd_logo">
											<u-image :src="item.kd_logo" width="40px" height="40px" borderRadius="50%">
											</u-image>
										</template>
										<template v-else>
											<u-image :src="marketHeaderKD" width="40px" height="40px"
												borderRadius="50%">
											</u-image>
										</template>
										<view class="m-line-1 u-m-t-20">{{item.kd_name}}</view>
									</view>
								</view>
								<view class="line clickOver"></view>
								<view class="bottom clickOver u-flex u-row-between u-p-t-20 u-p-b-20 u-p-r-30 u-p-l-30">
									<view class="u-flex">
										<u-circle-progress active-color="rgba(233, 174, 58, 1)" :percent="item.bl"
											bg-color="" width="20">
										</u-circle-progress>
										<view class="u-m-l-14">
											{{item.count_zhudan_amount}}{{$t('game18')}}
										</view>
									</view>
									<view>{{item.bd.fbd_pl}}%</view>
								</view>
							</view>
							<u-back-top :scroll-top="scrollTop" top="600" mode="square" tips="TOP" right="335"
								bottom="100" :custom-style="backStyle" :icon-style="backIconStyle"></u-back-top>
						</template>
						<template v-if="listEmpty == 2">
							<listEmpty :isDefault="true" :listHighly='450'></listEmpty>
						</template>
					</view>
				</view>
			</view>
		</template>
		<uni-popup ref="marketPwd" type="bottom">
			<view class="uc-pop">
				<view class="u-p-40 pop-bottom">
					<view class="u-flex u-row-center flex--direction">
						<image src="@/static/images/dw/su.png" style="width: 88px;height: 88px;" mode=""></image>
						<view class="u-p-t-20 u-p-b-20">{{$t('提现成功')}}</view>
						<view class="u-m-t-20 u-c-9">{{$t('您的提现需求已发送')}}</view>
						<view class="w_100 btn--submit u-text-center u-p-20 u-m-t-30" @click="keepTipShow">
							<view class="m-line-1 m-font-b">{{$t('继续提现')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<Spin fix v-show="isSpinShow">
	<Icon type="load-c" size="30" class="demo-spin-icon-load"></Icon>
	<div>{{$t('Loading...')}}</div>
</Spin>
<script>
	import lxCalendar from '@/components/lx-calendar/lx-calendar.vue'
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			lxCalendar,
			listEmpty,
			pcNavHeader
		},
		data() {
			return {
				sideshow: false,
				matchList: [],
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				page: 1,
				scrollTop: 0,
				backStyle: {
					opacity: '.9',
					color: '#fff',
					fontWeight: 'bold',
					background: '#000'
				},
				backIconStyle: {
					color: '#fff',
					fontSize: '17px',
					fontWeight: 'bold'
				},
				listEmpty: null
			}
		},
		onLoad() {
			this.getmatch();
		},
		methods: {
			getmatch(add) {
				this.$u.api.match_vip_match_p().then(res => {
					this.matchList = res.data.list;
					if (this.matchList.length > 0) {
						this.listEmpty = 1;
					} else {
						this.listEmpty = 2;
					}
					for (let i in this.matchList) {
						let items = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
						this.matchList[i].bgImg = items[Math.floor(Math.random() * items.length)]
					}
				});
			},
			marketPwdChange() {
				this.$refs.marketPwd.open();
			},
			marketPwdClose() {
				this.$refs.marketPwd.close();
			},
			openList(i) {
				this.$go(`/pages/market/marketContent?id=${i.sc_id}&is_pwd=${i.is_pwd}`);
			}
		}
	}
</script>

<style lang="scss">
	.m-index-market {
		position: relative;
		background-color: #3E3E6C;
		border-radius: 16px;
	}
	
	.m-market-soon-1 {
		background: url('@/static/images/index/m-coon1.png') center no-repeat;
		background-size: cover;
	}
	
	.m-market-soon-2 {
		background: url('@/static/images/index/m-coon2.png') center no-repeat;
		background-size: cover;
	}
	
	.m-market-soon-3 {
		background: url('@/static/images/index/m-coon3.png') center no-repeat;
		background-size: cover;
	}

	.m-index-market-pwd {
		border: 2px solid rgba(233, 174, 58, 1);
	}

	.m-index-market .line {
		height: 1px;
		background-color: #312B4F;
	}

	.m-index-market::after {
		content: '';
		border-radius: 16px;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(53, 49, 103, 0.88), rgba(53, 49, 103, 0.88));
	}

	.market-pwd {
		padding: 3px 8px;
		border-radius: 4px;
		background: linear-gradient(to bottom, rgba(240, 176, 0, 1), rgba(236, 141, 0, 1));
	}
</style>

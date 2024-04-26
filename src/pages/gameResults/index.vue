<template>
	<view :class="isOpen?'pc-open':'pc-close'">
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view class="pc-main u-flex u-col-top pc-has-right" >
				<pcSideBar :pageIndex="5" @menu-event="parentMenu"></pcSideBar>
				<view class="pc-wrapper">
					<template v-if="showEmpty == 1">
						<view class="u-m-b-40" v-if="tradingList.length > 0">
							<view class="mm-action-tabs u-flex">
								<view class="ac-tt u-flex">
									<image src="../../static/images/emoji01.png" style="width: 20px;height: 20px;"
										mode=""></image>
									{{$t('最近注单')}}
								</view>
							</view>
							<view class="union-scroll">
							<scroll-view class="scroll-view_H" scroll-x="true" :scroll-left="scrollLeft" scroll-with-animation>
							    <view class="union-inblock" v-for="(item, index) in tradingList" :key="`list2${index}`">
							    	<view class="neay-union-box">
							    		<view class="ne-cell">
							    			<view class="team-icon">
							    				<template v-if="item.zd_logo">
							    					<image :src="item.zd_logo" >
							    					</image>
							    				</template>
							    				<template v-else>
							    					<!-- <view class="macthB macth_zd"></view> -->
							    					<image :src="marketHeaderZD" mode="" class="marketHeader">
							    					</image>
							    				</template>
							    			</view>
							    			<view class="team-icon">
							    				<template v-if="item.kd_logo">
							    					<image :src="item.kd_logo" >
							    					</image>
							    				</template>
							    				<template v-else>
							    					<!-- <view class="macthB macth_kd"></view> -->
							    					<image :src="marketHeaderKD" mode="" class="marketHeader">
							    					</image>
							    				</template>
							    			</view>
							    		</view>
							    		<view class="ne-row">
							    			<view class="flex_bd">
							    				<view class="zd-name-wrap">
							    					<view class="zd-name-content">
							    						<view class="zd-name-marquee">{{$t(item.zd_name)}}
							    						</view>
							    					</view>
							    				</view>
							    			</view>
							    			<view class="item">{{item.ls_res_zd_fs}}</view>
							    		</view>
							    		<view class="ne-row">
							    			<view class="flex_bd">
							    				<view class="zd-name-wrap">
							    					<view class="zd-name-content">
							    						<view class="zd-name-marquee">{{$t(item.kd_name)}}
							    						</view>
							    					</view>
							    				</view>
							    			</view>
							    			<view class="item">{{item.ls_res_kd_fs}}</view>
							    		</view>
							    	</view>
							    </view>
							  </scroll-view>
							  <view class="scroll-next cur_pointer" @click="scrollNext" v-if="tradingList.length > 7">
								<image src="../../static/images/pc/next.png" mode=""></image>
							  </view>
							</view>
							<!-- <view class="union-swiper">
								<swiper class="swiper-neay" circular :indicator-dots="false" :autoplay="false"
									display-multiple-items="6" next-margin="30px" :current="curDot" @change="swiperChange">
									<swiper-item v-for="(item, index) in tradingList" :key="`list2${index}`">
										<view class="neay-union-box">
											<view class="ne-cell">
												<template v-if="item.zd_logo">
													<image :src="item.zd_logo" class="macthB">
													</image>
												</template>
												<template v-else>
													<image :src="marketHeaderZD" mode="" class="marketHeader">
													</image>
												</template>
												<template v-if="item.kd_logo">
													<image :src="item.kd_logo" class="macthB">
													</image>
												</template>
												<template v-else>
													<image :src="marketHeaderKD" mode="" class="marketHeader">
													</image>
												</template>
											</view>
											<view class="ne-row">
												<view class="flex_bd">
													<view class="zd-name-wrap">
														<view class="zd-name-content">
															<view class="zd-name-marquee">{{$t(item.zd_name)}}
															</view>
														</view>
													</view>
												</view>
												<view class="item">{{item.ls_res_zd_fs}}</view>
											</view>
											<view class="ne-row">
												<view class="flex_bd">
													<view class="zd-name-wrap">
														<view class="zd-name-content">
															<view class="zd-name-marquee">{{$t(item.kd_name)}}
															</view>
														</view>
													</view>
												</view>
												<view class="item">{{item.ls_res_kd_fs}}</view>
											</view>
										</view>
									</swiper-item>
								</swiper>
							</view> -->
						</view>
						
						<!-- <view class="u-flex pc-results">
							<view class="top-select league-select" style="width: 300px;margin-right: 10px;">
								<uni-data-select v-model="leagueValue" :localdata="leagueList" @change="leaguechange"
									:placeholder="$t('请选择联赛')" :emptyTips="$t('无选项')" :clear="false">
								</uni-data-select>
							</view>
							<view class="top-select" style="width: 200px;margin-right: 10px;">
								<uni-data-select v-model="cateValue" :localdata="caterange" @change="catechange"
									:placeholder="$t('请选择')" :emptyTips="$t('无选项')" :clear="false">
								</uni-data-select>
							</view>
							<view class="top-select pc-top-searcch" style="width: 200px;">
								<u-search bg-color="var(--pc-top-searcch-bg)" border-color="#242F55" search-icon-color="#999"
									placeholder-color="#999" color="var(--main-skin-color)" shape="square" height="70"
									:show-action="false" v-model="marketKey" :placeholder="$t('Please Enter')"
									@search="marketSearch">
								</u-search>
							</view>
						</view> -->
					</template>
					<view class="mark-panel">
						<view class="mark-toggle-bar u-m-b-30" v-if="showEmpty == 1">
							<view class="mark-title u-font-36">{{$t('赛事列表')}}</view>
							<text class="iconfont icon-a-arrowDown" @click="pcbarToggle" :class="pcbarShow?'active':''"></text>
						</view>
						<template v-if="showEmpty == 1">
							<view class="mark-panel-main ">
								<view class="market-pc-list " v-for="(item,index) in matchList" :key="`list2${index}`">
									<view class="pc-vs-heading u-flex u-row-center u-font-28 u-m-b-10">
										<text class="u-m-r-16">{{item.sc_time}}</text>
										<text class="m-line-1 ">{{$t(item.ls_name)}}</text>
									</view>
									<view class="market-game-card">
										<view class="col col-left">
											<view class="team-title u-font-32">{{$t(item.zd_name)}}</view>
											<view class="team-icon	u-m-l-20">
												<template v-if="item.zd_logo">
													<image :src="item.zd_logo" class="marketHeader">
													</image>
												</template>
												<template v-else>
													<image :src="marketHeaderZD" mode="" class="marketHeader">
													</image>
												</template>
											</view>
										</view>
										<view class="vs-middle">
											<view class="mark-vs m-fong-b u-p-l-30 u-p-r-30">
												<text class="text">{{item.ls_res_zd_fs}}</text>
												<text class="lg-vs">:</text>
												<text class="text">{{item.ls_res_kd_fs}}</text>
											</view>
										</view>
										<view class="col col-right">
											<view class="team-icon u-m-r-20">
												<template v-if="item.kd_logo">
													<image :src="item.kd_logo" class="marketHeader">
													</image>
												</template>
												<template v-else>
													<image :src="marketHeaderKD" mode="" class="marketHeader">
													</image>
												</template>
											</view>
											<view class="team-title u-font-32">{{$t(item.kd_name)}}</view>
										</view>
									</view>
								</view>
								<view class="load-more-box u-flex u-row-center">
									<uni-load-more :status="status"></uni-load-more>
								</view>
							</view>
						</template>
						<template v-if="showEmpty == 0">
							<listEmpty :isDefault="true" text='暂时没有数据哟!' list='list' :listHighly='300'>
							</listEmpty>
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
				<view class="container" :class="sideshow?'is-mask':''">
					<uniNavHeader :title="$t('menu5')" isback search @clickLeft="menuClick"></uniNavHeader>
					<view class="bs-wrapper">
						<view class="gooLight-wrapper">
							<view class="union-card" v-if="tradingList.length > 0">
								<view class="mm-action-tabs u-flex">
									<view class="ac-tt u-flex">
										<image src="../../static/images/emoji01.png" style="width: 20px;height: 20px;"
											mode=""></image>
										<text class="u-m-l-10 u-c-g2">{{$t('最近注单')}}</text>
									</view>
								</view>
								<view class="union-swiper">
									<swiper class="swiper-neay" circular :indicator-dots="false" :autoplay="false"
										display-multiple-items="2" next-margin="80px" :current="curDot"
										@change="swiperChange">
										<swiper-item v-for="(item, index) in tradingList" :key="`list2${index}`">
											<view class="neay-union-box">
												<view class="ne-cell">
													<view class="u-flex">
														<view class="ksgt-1">
															<image :src="item.zd_logo" v-if="item.zd_logo"></image>
															<image :src="marketHeaderZD" v-if="!item.zd_logo"></image>
														</view>
														<view class="ksgt-1 ksgt-2">
															<image :src="item.kd_logo" v-if="item.kd_logo"></image>
															<image :src="marketHeaderKD" v-if="!item.kd_logo"></image>
														</view>
													</view>
												</view>
												<view class="ne-row">
													<view class="flex_bd">
														<view class="zd-name-wrap">
															<view class="zd-name-content">
																<view class="zd-name-marquee">{{$t(item.zd_name)}}
																</view>
															</view>
														</view>
													</view>
													<view class="item m-font-b">{{item.ls_res_zd_fs}}</view>
												</view>
												<view class="ne-row">
													<view class="flex_bd">
														<view class="zd-name-wrap">
															<view class="zd-name-content">
																<view class="zd-name-marquee">{{$t(item.kd_name)}}
																</view>
															</view>
														</view>
													</view>
													<view class="item m-font-b">{{item.ls_res_kd_fs}}</view>
												</view>
											</view>
										</swiper-item>
									</swiper>
								</view>
							</view>
						</view>
						<view class="gooLight">
							<view class="mm-action-list">
								<view class="mm-filter u-flex u-m-b-20">
									<view class="mm-filter-item m-font-16" @click="show = true">
										<text>{{leagueName}}</text><text
											class="iconfont icon-sj-down u-font-xs u-m-l-10 u-c-g"></text>
									</view>
									<view class="mm-filter-item m-font-16" @click="show2 = true">
										<text>{{leagueSelect}}</text><text class="iconfont u-c-g icon-sj-down u-font-xs u-m-l-10"></text>
									</view>
								</view>
								<view class="mark-m-row">
									<template v-if="showEmpty == 1">
										<view class="pane">
											<view class="market-event-card" v-for="(item,index) in matchList"
												:key="`list2${index}`">
												<view class="event-logos">
													<view class="ksgt-1">
														<image :src="item.zd_logo" v-if="item.zd_logo"></image>
														<image :src="marketHeaderZD" v-if="!item.zd_logo"></image>
													</view>
													<view class="ksgt-1 ksgt-2">
														<image :src="item.kd_logo" v-if="item.kd_logo"></image>
														<image :src="marketHeaderKD" v-if="!item.kd_logo"></image>
													</view>
												</view>
												<view class="flex_bd">
													<view class="event-title u-m-b-10 u-flex m-font-16">
														<view class="team-tit u-flex  ">
															<view class="zd-name-wrap">
																<view class="zd-name-content">
																	<view class="zd-name-marquee greendark-color">
																		{{$t(item.zd_name)}}
																	</view>
																</view>
															</view>
															<text class="u-m-l-10 m-font-b">{{item.ls_res_zd_fs}}</text>
														</view>
														<view class="m-font-b vs u-p-10">:</view>
														<view class="team-tit u-flex">
															<text class="u-m-r-10 m-font-b">{{item.ls_res_kd_fs}}</text>
															<view class="zd-name-wrap">
																<view class="zd-name-content">
																	<view class="zd-name-marquee greendark-color">
																		{{$t(item.kd_name)}}
																	</view>
																</view>
															</view>
														</view>
													</view>
													<view class="event-time">{{item.sc_time}}</view>
												</view>
											</view>
											<view class="load-more-box">
												<uni-load-more :status="status"></uni-load-more>
											</view>
										</view>
									</template>
									<template v-if="showEmpty == 0">
										<listEmpty :isDefault="true" :listHighly='300'>
										</listEmpty>
									</template>
								</view>
							</view>
						</view>
					</view>
					<u-back-top :scroll-top="scrollTop" top="600" mode="square" tips="TOP" right="335" bottom="100"
						:custom-style="backStyle" :icon-style="backIconStyle"></u-back-top>
					<!-- <u-calendar v-model="dataShow" color="#888" activeBgColor="#02CC50" rangeColor="#02CC50" mode="range"
			@change="dataConfirm"></u-calendar> -->
				</view>
				<pcBg></pcBg>
			</view>
		</template>
		<u-popup v-model="show" mode="bottom"
			borderRadius="32" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup-hd">
				<view class="tt">
					{{$t('请选择联赛')}}
				</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode="" @click="show = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<scroll-view scroll-y="true" style="max-height: 60vh;">
					<view class="filter-cell" v-for="(item,index) in leagueList" :key="`leagueList${index}`"
						@click="leaguechange(item.ls_id,item.name)">
						<view class="u-flex u-row-between">
							<view>{{item.name}}</view>
							<view class="iconfont icon-dui text-yellow" v-if="leagueIndex == item.ls_id"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-popup v-model="show2" mode="bottom"
			borderRadius="32" :mask-custom-style="uPopMaskCustomStyle">
			<view class="bs-popup-hd">
				<view class="tt">
					{{$t('请选择')}}
				</view>
				<image src="@/static/images/index/close.png"
					style="width: 32px;height: 32px;position: absolute;right: 15px;" mode="" @click="show2 = false">
				</image>
			</view>
			<view class="bs-popup-bd">
				<scroll-view scroll-y="true" style="max-height: calc(100vh - 400px);">
					<view class="filter-cell" v-for="(item,index) in caterange" :key="`caterange${index}`"
						@click="catechange(item.value,item.text)">
						<view class="u-flex u-row-between">
							<view>{{item.text}}</view>
							<view class="iconfont icon-dui text-yellow" v-if="cateKey == item.value"></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<live v-if="livePop" @closeLivePop="closeLivePop" :liveAddress="liveAddress"></live>
		<u-picker mode="time" v-model="dataShow" @confirm="dataConfirm"></u-picker>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniSideHeader from '@/components/uni-side-bar/uni-side-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import live from '@/components/live/live.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	import pcSideBar from "@/components/pc-side-bar/pc-side-bar.vue"
	import pcSideTrade from "@/components/pc-side-trade/trade.vue"
	export default {
		components: {
			uniNavHeader,
			uniSideHeader,
			uniNavFooter,
			listEmpty,
			live,
			pcBg,
			pcNavHeader,
			pcSideBar,
			pcSideTrade
		},
		data() {
			return {
				sideshow: false,
				page: 1,
				tradingList: [],
				matchList: [],
				matchList2: [],
				single: '',
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showEmpty: null,
				sreachData: this.$t('选择日期'),
				dataShow: false,
				dataTime: '',
				marketKey: '',
				cateValue: 0,
				caterange: [{
						value: 0,
						text: this.$t('game58')
					},
					{
						value: 1,
						text: this.$t('game59')
					},
				],
				cateKey: 0,
				leagueValue: 0,
				leagueList: [],
				curDot: 0,
				leagueIndex: '',
				liveAddress: '',
				livePop: false,
				triggered: false,
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
				show: false,
				show2: false,
				leagueName: this.$t('请选择联赛'),
				leagueSelect: this.$t('请选择'),
				scrollLeft: 0, // 控制滚动位置
				itemWidth: 162 ,// 假设每个item的宽度为100px
				pcbarShow:true,
			}
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getmatch();
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		async onLoad() {
			uni.setNavigationBarTitle({
				title: this.$t('menu5')
			});
			this.getmatch('', '', 'add');
			this.getTradingList();
			this.getleague();
		},

		methods: {
			parentMenu(){
				this.menuToggle()
			},
			scrollLower() {
				if (this.status == 'noMore') {
					return;
				}
				this.getmatch();
			},
			matchLive(id) {
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				this.liveAddress =
					// `https://www.isportslive8.com/football/detail.html?matchId=${id}&accessKey=5AQ3AcmjYeXWWiZl900EWpC0otHyEFOo`;
					`https://live.9d.games/football/detail.html?matchId=${id}&accessKey=5AQ3AcmjYeXWWiZl900EWpC0otHyEFOo&statsPanel=simple`;
				this.livePop = true;
			},
			closeLivePop() {
				this.livePop = false;
			},
			leaguechange(e,name) {
				this.leagueIndex = e;
				this.leagueName = name;
				this.page = 1;
				this.matchList = [];
				this.getmatch('', '', 'add', this.leagueList[e].ls_id, '');
				this.show = false
			},
			async getleague() {
				let ret = await this.$u.api.leaguelist_p({
					limit: 100
				});
				if (ret && ret.code == 1) {
					this.leagueList = ret.data.list;
					for (let i in this.leagueList) {
						this.leagueList[i].value = i;
						this.leagueList[i].text = this.leagueList[i].name;
					}
				}
			},
			marketSearch(e) {
				this.page = 1;
				this.matchList = [];
				this.getmatch('', '', 'add', this.leagueIndex ? this.leagueList[this.leagueIndex].ls_id : '', e);
			},
			catechange(e,i) {
				this.cateKey = e;
				this.leagueSelect = i;
				this.marketKey = '';
				this.leagueValue = 0;
				this.sreachData = this.$t('选择日期');
				this.page = 1;
				this.matchList = [];
				this.getmatch('', e, 'add', '', '');
				this.show2 = false
			},
			dataConfirm(e) {
				this.sreachData = e.year + '-' + e.month + '-' + e.day;
				this.page = 1;
				this.matchList = [];
				this.getmatch(this.sreachData, '', '', '', '');
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getmatch(date, type, add, ls_id, keywords) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.matchresult_p({
					date: date ? date : '',
					page: this.page,
					limit: 10,
					type: type ? type : 0,
					ls_id: ls_id ? ls_id : '',
					keywords: keywords ? keywords : ''
				});
				if (ret) {
					if (ret.data.list.length > 0) {
						this.showEmpty = 1;
						if (add) {
							this.matchList = ret.data.list;
						} else {
							this.matchList = this.matchList.concat(ret.data.list);
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
				}
			},
			async getTradingList() {
				let res = await this.$u.api.trading_p({
					limit: 8,
					zd_type: 1
				});
				if (res && res.code == 1) {
					this.tradingList = res.data.list;
				}
			},
			swiperChange(e) {
				this.curDot = e.detail.current;
			},
			leftImg() {
				let num = this.matchList.length - 1
				if (this.curDot <= 0) {
					this.curDot = num
				} else {
					this.curDot--
				}
			},
			rightImg() {
				let num = this.matchList.length - 1
				if (this.curDot >= num) {
					this.curDot = 0
				} else {
					this.curDot++
				}
			},
			scrollNext() {
				this.scrollLeft += this.itemWidth;
			},
			pcbarToggle(){
				this.pcbarShow = !this.pcbarShow
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mark-panel-main{
		transition: .3s all;
		overflow: hidden;
	}
	.mark-panel-main.hidden{
		height: 0;
	}
	.mark-toggle-bar{
		border-radius: 16px;
		padding: 0 16px;
		height: 58px;
		display: flex;
		align-items: center;
		background-color: #3E3664;
		.icon-a-arrowDown{
			background-color: #4D4886;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 34px;
			height: 34px;
			color: #d1cce9;
			border-radius: 35px;
			font-size: 14px;
			margin-left: auto;
			cursor: pointer;
			transition: .3s all;
		}
		.icon-a-arrowDown.active{
			transform: rotateZ(180deg);
		}
	}
	.table-heading ::v-deep .uni-table-loading {
		display: none !important;
	}

	.bs-wrapper {
		padding: 60px 15px 0 15px !important;
	}

	.scroll-Y {
		height: calc(100vh - 70px);
	}

	.reuslt-scroll-Y {
		height: calc(100vh - 275px);
	}

	.vsClass {
		padding: 5px 15px;
		color: #fff !important;
		border-radius: 4px;
		background-image: linear-gradient(to right, #fda740, #fbbb33);
	}

	.riqiClass {
		color: var(--body-color);
		font-size: 0;
	}

	.riqiClass image {
		width: 20px;
		height: 20px;
	}

	.n-tab_item {
		white-space: nowrap;
		padding: 0 15px;
	}

	.top-link-tabs .n-tab_item {
		min-width: 80px;
	}

	.sreachData-class {
		background-color: rgb(36, 41, 47);
		border-radius: 10px;
		border: 1px solid rgb(36, 41, 47);
		padding: 10px;
		margin-bottom: 10px;
	}

	.league-select ::v-deep .uni-select__selector-item {
		line-height: 20px;
		padding: 10px;
	}

	.bs-wrapper {
		padding: 60px 0 0 0 !important;
		background: var(--mar-bg);
	}

	.league-select ::v-deep .uni-select__selector-item.active {
		color: #ccc !important;
	}

	.gooLight-wrapper {
		padding: 15px 0 15px 15px;
	}

	.gooLight {
		padding: 15px;
		background-color: #312B4F;
		border-radius: 16px 16px 0 0;
	}

	.site-head {
		background: var(--mar-bg);
		// margin: -10px -16px 0 !important;
		padding: 0 15px;
	}

	.ret-select ::v-deep .uni-select__selector-item.active {
		color: #fff;
	}

	.mm-action-list ::v-deep .uni-select .uni-select__input-text {
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		white-space: inherit;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	@media (min-width: 750px) {
		.pc-results ::v-deep .uni-select {
			height: 35px;
			border-radius: 5px;
			color: #999;
			border: 1px solid #242F55 !important;
			background-color: var(--pc-results-uni-select-bg) !important;
		}

		.pc-results ::v-deep .uni-select .uni-select__input-text {
			color: var(--pc-results-uni-select-color) !important;
		}

		.pc-results ::v-deep .uni-select .uni-select__selector {
			background-color: var(--pc-results-uni-select-selector-bg) !important;
		}

		.pc-results ::v-deep .uni-select .uni-select__selector-item.active {
			background-color: var(--pc-results-uni-select-selector-active-bg) !important;
		}
	}

	.market-event-card {
		display: flex;
		align-items: center;
		padding: 16px;
		margin-bottom: 7px;
		background-color: #413D71;
		border-radius: 16px;
	}

	.event-logos {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
	}


	.event-time {
		color: #D1CCE9;
	}

	.team-tit {
		max-width: 120px;
	}

	.mm-filter {
		justify-content: space-between;
	}

	.filter-cell {
		padding: 16px 16px 16px 16px;
		border-bottom: 1px solid rgb(65, 61, 113);
	}
	
	.filter-cell:last-child {
		margin-bottom: 30px;
		border-bottom: 1px solid rgb(65, 61, 113);
	}
	.market-pc-list{
		width: 100%;
	}
	.market-game-card .col-left{
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.market-game-card .col-right{
		display: flex;
		align-items: center;
	}
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
	.ne-cell {
		.team-icon:last-child{
			margin-left: -10px;
		}
	}
	.pc-vs-heading{
		color: #D1CCE9;
	}
	.union-inblock{
		display: inline-flex;
		min-width: 152px;
		.neay-union-box{
			width: 100%;
		}
	}
	.union-scroll{
		position: relative;
		.scroll-next{
			position: absolute;
			right: -20px;
			top: 50%;
			transform: translateY(-50%);
			cursor: pointer;
			font-size: 0;
			image{
				width: 40px;
				height: 40px;
			}
		}
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	
	
	
	
	
	
	
</style>

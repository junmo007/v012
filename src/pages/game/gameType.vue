<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<view class="container u-skeleton">
				<uniNavHeader :title="this.$t('web_name')" @headerPwd="headerPwd" ref="header">
				</uniNavHeader>
				<view class="bs-wrapper-nohid">
					<view class="site-head u-flex u-skeleton-fillet">
						<view class="site-tit">
							<text>{{$t('All Games')}}</text>
							<view class="line"></view>
						</view>
						<view class="site-back" @click="common_login_back">
							<text class="iconfont icon-close"></text>
						</view>
					</view>
					<view class="gooLight-box">
						<view class="gooLight">
							<view class="fan-card type-card u-skeleton-fillet u-m-b-28">
								<view class="form-row u-m-b-20">
									<view class="data-select">
										<view class="data-select-input" @click="cateToggle">
											<text class="type-ico" :class="cateIco"></text>
											<text>{{$t(cateValue)}}</text>
											<text class="iconfont icon-down" :class="cateShow?'on':''"></text>
										</view>
										<view class="data-dropdown-select" v-if="cateShow">
											<scroll-view scroll-y="true" style="height: 240px;">
												<view class="select-item u-flex" :class="cateCur == index ?'active':''"
													v-for="(item,index) in caterange" :key="index"
													@click="catechange(index,item.name,item.icon,item.id)">
													<text class="type-ico" :class="item.icon" v-if="item.icon"></text>
													<text>{{$t(item.name)}}</text>
												</view>
											</scroll-view>
										</view>
									</view>
								</view>
								<view class="form-row u-m-b-20">
									<u-search bg-color="var(--form-main-uni-easyinput__content)"
										border-color="var(--border-color)" search-icon-color="var(--link-color)"
										placeholder-color="var(--link-color)" color="#000" shape="square" height="100"
										:show-action="false" v-model="keyword" @search="gameSearch"
										:placeholder="$t('Search your like Game')">
									</u-search>
								</view>
								<view class="u-flex u-row-right">
									<view class="iconfont icon-shaixuan2 filter-icon m-rela" @click="closeFilterGame">
										<u-icon name="close" size="16" class="shaixuanCon"></u-icon>
									</view>
									<!-- <view class="u-flex filter-icon u-m-l-20 m-rela" @click="gameType = true"> -->
									<view class="u-flex filter-icon u-m-l-20 m-rela" @click="gameTypeChnage">
										<view class="iconfont icon-sx1 u-m-r-10"></view>
										<view>{{$t('Filter')}}</view>
										<view class="filter-badge" v-if="gameTypeNum > 0">{{gameTypeNum}}</view>
									</view>
								</view>
							</view>
							<view class="game-main">
								<view class="game-panel">
									<view class="game-list u-skeleton-fillet">
										<template v-if="empty == 1">
											<u-row gutter="20">
												<u-col span="4" v-for="(item,index) in gameList" :key="index">
													<view class="u-m-b-12 game-card">
														<view class="card-bg"
															:style="{backgroundImage:'url('+item.icon+')'}">
														</view>
														<template v-if="mobile_common">
															<u-image :src="item.icon" mode="widthFix" width="230rpx"
																height="302rpx" borderRadius="var(--card-radius)"
																@click="gamePop(item.id)">
																<u-loading slot="loading"></u-loading>
															</u-image>
														</template>
														<view class="palyBtn u-text-center" @click="gamePop(item.id)">
															<text class="palyBtnText">{{$t('PLAY')}}</text>
														</view>
													</view>
												</u-col>
											</u-row>
											<view class="load-more-box">
												<uni-load-more :status="status" :contentText="contentText">
												</uni-load-more>
											</view>
										</template>
										<template v-if="empty == 0">
											<listEmpty :isDefault="true" class="u-bd-8" :listHighly='300'>
											</listEmpty>
										</template>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-popup v-model="gamePay" mode="bottom" border-radius="35" :mask-custom-style="uPopMaskCustomStyle"
					@close="gamePayClose">
					<view class="u-p-40">
						<view class="u-flex u-col-top">
							<!-- <view style="min-width: 220rpx;">
								<u-image :src="gameDetail.g_icon" mode="widthFix" width="100%"
									borderRadius="var(--card-radius)" @click="gamePop">
									<u-loading slot="loading"></u-loading>
								</u-image>
							</view> -->
							<view class="u-m-b-12 game-card" style="min-width: 220rpx;">
								<view class="card-bg" :style="{backgroundImage:'url('+gameDetail.g_icon+')'}">
								</view>
								<u-image :src="gameDetail.g_icon" mode="widthFix" width="230rpx" height="302rpx"
									borderRadius="var(--card-radius)" @click="gamePop(gameDetail.id)">
									<u-loading slot="loading"></u-loading>
								</u-image>
							</view>
							<view class="w_100 h_100 u-m-l-30 famePayRight">
								<view class="u-flex u-row-right">
									<template v-if="gameDetail.collect == 0">
										<u-icon name="star" color="#999" size="36" :class="showCss3?'my_xing':''"
											@click="gameCollection(gameDetail.id)"></u-icon>
									</template>
									<template v-if="gameDetail.collect == 1">
										<u-icon name="star-fill" color="var(--bar-bg)" size="36"
											@click="gameCollection(gameDetail.id)" :class="showCss3?'my_xing':''">
										</u-icon>
									</template>
								</view>
								<view class="">
									<view class="game-name">{{$t(gameDetail.gi_name)}}</view>
									<view class="u-m-t-6">{{$t(gameDetail.tc_name)}}</view>
								</view>
								<!-- @click="gameListClisk_common(gameDetail.tc_name,gameDetail.g_tcid,gameDetail.id,gameDetail.g_state,gameDetail.tc_code)"> -->
								<uni-button class="game-btn btn--market--right m-font-b" type="default"
									@click="gameClick(gameDetail.tc_code)">
									{{$t('PLAY')}}
								</uni-button>
							</view>
						</view>
					</view>
				</u-popup>
				<uni-popup ref="gameType" type="bottom">
					<view style="margin: 60px 0 0 0; border-radius: 15px 0 0 10px;">
						<view class="bs-popup-hd gameType-border1">
							<view class="m-c-w">
								<text>{{$t("Filters")}}</text>
								<text v-if="gameTypeNum > 0">{{' (' + gameTypeNum + ')'}}</text>
							</view>
							<view class="iconfont icon-close m-c-w" @click="gameTypeClose"></view>
						</view>
						<view class="gameType-border2-box">
						<view class="gameType-border2 u-flex flex--direction u-row-between">
							<view class="u-p-l-20">
								
								<view class="">{{$t('Game Features')}}</view>
								<view class="u-flex u-flex-wrap u-row-between w_100">
									<view v-for="(item,index) in featuresArr" :key="`featuresArr${index}`"
										@click="featuresChange(index)"
										:class="index == featuresActive ? 'featuresActive' : ''"
										class="featuresItem2 u-m-t-20 w_48">
										<view class="m-line-1">{{item.type}}</view>
									</view>
								</view>
								<view class="u-m-t-20">{{$t('游戏供应商')}}</view>
								<view class="u-flex u-flex-wrap u-row-between w_100">
									<view v-for="(item,index) in feaGame" :key="`feaGame${index}`"
										@click="feaGameChange(index)"
										:class="index == feaGameActive ? 'featuresActive' : ''"
										class="featuresItem u-m-t-20 w_48 m-line-1">
											<image :src="item.tc_logo" mode="heightFix" style="height: 20px;max-width: 100px;"></image>
											<view class="u-m-t-10 m-line-1">{{$t(item.tc_name)+ (index>0?'('+ item.game_count +')':'') }}</view>
									</view>
								</view>
							</view>
							<view class="u-flex u-row-between w_100 u-m-t-50">
								<view class="w_50 game-btn btn--market--left u-m-l-20 m-line-1" @click="closeGame">
									{{$t('重置')}}
								</view>
								<view class="w_50 game-btn btn--market--right u-m-l-20 m-line-1"
									@click="gameScr(feaGameActive,featuresActive)">{{$t('筛选')}}</view>
							</view>
						</view>
						</view>
					</view>
				</uni-popup>
				<!-- <u-popup v-model="gameType" mode="bottom" border-radius="35" :mask-custom-style="uPopMaskCustomStyle">
					<view class="bs-popup-hd">
						<view class="m-c-w">
							<text>{{$t("Filters")}}</text>
							<text v-if="gameTypeNum > 0">{{' (' + gameTypeNum + ')'}}</text>
						</view>
						<view class="iconfont icon-close m-c-w" @click="gameType = false"></view>
					</view>
					<view class="u-p-l-10 u-p-r-30 u-p-t-30 u-p-b-30">
						<view class="u-p-l-20">{{$t('游戏供应商')}}</view>
						<view class="u-flex u-flex-wrap">
							<view v-for="(item,index) in feaGame" :key="`feaGame${index}`" @click="feaGameChange(index)"
								:class="index == feaGameActive ? 'featuresActive' : ''"
								class="featuresItem u-m-t-20 u-m-l-20">
								<template v-if="item.tc_logo">
									<image :src="item.tc_logo" mode="heightFix" style="height: 32px;"></image>
								</template>
								<template v-if="!item.tc_logo">
									{{$t(item.tc_name)}}
								</template>
							</view>
						</view>
						<view class="u-p-l-20 u-m-t-20">{{$t('Game Features')}}</view>
						<view class="u-flex u-flex-wrap">
							<view v-for="(item,index) in featuresArr" :key="`featuresArr${index}`"
								@click="featuresChange(index)" :class="index == featuresActive ? 'featuresActive' : ''"
								class="featuresItem u-m-t-20 u-m-l-20">
								{{item.type}}
							</view>
						</view>
						<view class="u-flex u-row-between w_100 u-m-t-40">
							<view class="w_30 game-btn btn--market--left u-m-l-20 m-line-1" @click="closeGame">
								{{$t('重置')}}
							</view>
							<view class="w_70 game-btn btn--market--right u-m-l-20 m-line-1"
								@click="gameScr(feaGameActive,featuresActive)">{{$t('筛选')}}</view>
						</view>
					</view>
				</u-popup> -->
				<u-popup v-model="thirdGame" mode="center" :mask-close-able="false" :mask="false"
					:mask-custom-style="uPopMaskCustomStyle">
					<gameIframe :iframeUrl="gameUrl" @gameMenuClose="gameMenuClose"></gameIframe>
				</u-popup>
				<u-skeleton :loading="loading" :animation="true" bgColor="var(--body-bg)" el-color="var(--u-skeletonA)"
					bg-color="var(--u-skeletonB)"></u-skeleton>
				<!-- main -->
				<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
				</u-top-tips>
			</view>
		</view>
		<pcBg></pcBg>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import uniNavFooter from '@/components/uni-foot-bar/uni-foot-bar.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import gameIframe from "@/components/game-iframe/game-iframe.vue"
	import {
		accMul,
		accAdd,
		changeTwoDecimal_f
	} from '@/common/tool.js'
	export default {
		components: {
			uniNavHeader,
			uniNavFooter,
			listEmpty,
			pcBg,
			gameIframe
		},
		data() {
			return {
				// 2.0
				loading: true, // 是否显示骨架屏组件
				bannerList: [],
				findex: 3,
				swiperCurrent: 0,
				current: 0,
				tabslist: [],
				page: 1,
				sortId: 0, //游戏分类id
				keyword: '', //搜索
				cateCur: 0,
				cateShow: false,
				cateValue: this.$t('全部游戏'),
				cateIco: "type-all",
				caterange: [],
				page: 1,
				empty: null,
				gameList: [],
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				cateid: '',
				gamePay: false,
				gameType: false,
				gameDetail: {},
				gameCollect: false,
				featuresArr: [{
					type: this.$t('全部')
				}, {
					type: this.$t('最热游戏')
				}, {
					type: this.$t('最新游戏')
				}, {
					type: this.$t('收藏')
				}],
				feaGame: [],
				feaGameActive: 0,
				featuresActive: 0,
				gameTypeNum: 0,
				gameHot: 0,
				gameNew: 0,
				gameCollet: 0,
				gameUrl: '',
				thirdGame: false,
				showCss3: false
			}
		},
		async onLoad(t_id) {
			if (t_id) {
				this.cateid = t_id.t_id;
				this.getGame('add', t_id.t_id, '', '');
			} else {
				this.getGame('add');
			}
			await this.gameGetType(); //游戏分类
			this.getGameThird(); //游戏平台
		},
		mounted() {},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getGame('', this.cateid, this.sortId, '');
		},
		methods: {
			gameTypeChnage() {
				this.$refs.gameType.open();
			},
			gameTypeClose() {
				this.$refs.gameType.close();
			},
			gameMenuClose() {
				this.thirdGame = false;
			},
			gamePayClose() {
				this.showCss3 = false;
			},
			closeFilterGame() {
				this.cateid = '';
				this.sortId = 0;
				this.cateIco = "type-all";
				this.cateValue = this.$t('全部游戏');
				this.getGame('add', '', '', '', true);
			},
			gameClick(tc_code) {
				let api = this.$helper.get('rule').game_url;
				if (api) {
					this.getGameUrl(this.gameDetail.id, api + '/game/login_game', tc_code);
				} else {
					this.successChange(this.gameDetail.id, tc_code);
				}
			},
			async getGameUrl(gid, api, tc_code) {
				uni.showLoading({
					title: this.$t('loading')
				});
				this.$u.post(api, {
					platform: 2,
					gid
				}).then(async res => {
					uni.hideLoading();
					if (res && res.code == 1) {
						if (tc_code == 'ZB') {
							location.href = res.data;
						} else {
							this.gamePay = false;
							this.thirdGame = true;
							this.gameUrl = res.data;
						}
					} else {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				});
			},
			async successChange(gid, tc_code) {
				let res = await this.$u.api.game_login_game_p({
					platform: 2,
					gid
				});
				if (res && res.code == 1) {
					if (tc_code == 'ZB') {
						location.href = res.data;
					} else {
						this.gamePay = false;
						this.thirdGame = true;
						this.gameUrl = res.data;
					}
				} else {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			},
			feaGameChange(index) {
				this.feaGameActive = index;
				if (index > 0 && this.gameTypeNum == 0) {
					this.gameTypeNum++;
				}
				if (index > 0 && this.gameTypeNum == 1 && this.featuresActive > 0) {
					this.gameTypeNum++;
				}
				if (index == 0 && this.gameTypeNum > 0) {
					this.gameTypeNum--;
				}
			},
			featuresChange(index) {
				this.featuresActive = index;
				if (index > 0 && this.gameTypeNum == 0) {
					this.gameTypeNum++;
				}
				if (index > 0 && this.gameTypeNum == 1 && this.feaGameActive > 0) {
					this.gameTypeNum++;
				}
				if (index == 0 && this.gameTypeNum > 0) {
					this.gameTypeNum--;
				}
			},
			async gamePop(g_id) {
				if (this.$helper.get('token')) {
					let res = await this.$u.api.game_get_detail_p({
						g_id
					});
					if (res && res.code == 1) {
						this.gamePay = true;
						this.gameDetail = res.data;
					}
				} else {
					this.$go('/pages/login/index');
				}
			},
			// 游戏收藏
			async gameCollection(g_id) {
				let res = await this.$u.api.game_game_collect_p({
					g_id
				});
				if (res && res.code == 1) {
					this.showCss3 = true;
					this.gamePop(g_id);
				}
			},
			catechange(index, name, icon, id) {
				this.cateCur = index;
				this.cateValue = name;
				this.cateIco = icon;
				this.cateShow = false;
				this.keyword = '';
				this.page = 1;
				this.empty = null;
				this.gameList = [];
				this.cateid = id;
				this.status = 'loading';
				if (this.current == 0) {
					this.getGame('add', this.cateid, '', '');
				} else {
					this.getGame('add', this.cateid, this.sortId, '');
				}
			},
			cateToggle() {
				this.cateShow = !this.cateShow
			},
			changeTab(index) {
				this.cateid = '';
				this.current = index;
				this.sortId = this.tabslist[index].tc_id;
				this.cateCur = 0;
				this.cateValue = this.$t('全部游戏');
				this.cateIco = 'type-all';
				this.page = 1;
				this.keyword = '';
				this.empty = null;
				this.gameList = [];
				this.status = 'loading';
				this.getGame('add', '', this.tabslist[index].tc_id);
			},
			gameSearch(value) {
				this.page = 1;
				this.empty = null;
				this.gameList = [];
				this.status = 'loading';
				this.getGame('add', '', '', value);
			},
			closeGame() {
				this.gameTypeNum = 0;
				this.feaGameActive = 0;
				this.featuresActive = 0;
			},
			gameScr(feaGameActive, featuresActive) {
				this.cateid = '';
				this.sortId = this.feaGame[feaGameActive].tc_id;
				this.cateCur = 0;
				this.cateValue = this.$t('全部游戏');
				this.cateIco = 'type-all';
				this.page = 1;
				this.keyword = '';
				this.empty = null;
				this.gameList = [];
				this.status = 'loading';
				this.getGame('add', '', this.feaGame[feaGameActive].tc_id);
			},
			async getGame(add, t_id, tc_id, value, close) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let parme = {};
				if (close) {
					this.page = 1;
					this.closeGame();
					this.featuresActive = 0;
				}
				if (t_id && !tc_id) {
					parme = {
						page: this.page,
						limit: 20,
						t_id: t_id ? t_id : '',
						keywords: value ? value : '',
						hot: this.featuresActive == 1 ? 1 : 0,
						new: this.featuresActive == 2 ? 1 : 0,
						collect: this.featuresActive == 3 ? 1 : 0
					}
				} else if (tc_id && !t_id) {
					parme = {
						limit: 20,
						page: this.page,
						tc_id: tc_id ? tc_id : '',
						keywords: value ? value : '',
						hot: this.featuresActive == 1 ? 1 : 0,
						new: this.featuresActive == 2 ? 1 : 0,
						collect: this.featuresActive == 3 ? 1 : 0
					}
				} else if (t_id && tc_id) {
					parme = {
						page: this.page,
						limit: 20,
						t_id: t_id ? t_id : '',
						tc_id: tc_id ? tc_id : '',
						keywords: value ? value : '',
						hot: this.featuresActive == 1 ? 1 : 0,
						new: this.featuresActive == 2 ? 1 : 0,
						collect: this.featuresActive == 3 ? 1 : 0
					}
				} else {
					parme = {
						page: this.page,
						limit: 20,
						keywords: value ? value : '',
						hot: this.featuresActive == 1 ? 1 : 0,
						new: this.featuresActive == 2 ? 1 : 0,
						collect: this.featuresActive == 3 ? 1 : 0
					}
				}
				// let res = await this.$u.api.game_get_game_url_p(parme);
				let res = await this.$u.api.game_list_p(parme);
				if (res) {
					this.gameTypeClose();
					this.loading = false;
					uni.hideLoading();
					if (add) {
						this.gameList = res.data;
					} else {
						this.gameList = this.gameList.concat(res.data);
					}
					if (res.data.length == 20) {
						this.status = "loading";
						this.page++;
					} else {
						this.status = "noMore";
					}
					if (this.gameList.length > 0) {
						this.empty = 1;
					} else {
						this.empty = 0;
					}
				}
			},
			async gameListClisk(name, tid, gid, key, tcCode) {
				let this_ = this;
				if (this_.userToken_common) {
					if (key == 1) {
						if (tcCode == 'PB') {
							this.commonPBchange();
						}
						// 平博三方 IOS 特殊处理
						if (tcCode == 'PB' && uni.getSystemInfoSync().platform == 'ios') {
							uni.showLoading({
								title: this_.$t('loading')
							});
							let PB_res = await this_.$u.api.game_login_game_p({
								platform: 2,
								back_url: window.location.href,
								gid
							});
							if (PB_res && PB_res.code == 1) {
								uni.hideLoading();
								location.href = PB_res.data;
							} else {
								this.$refs.uTips.show({
									title: this.$t('请联系客服')
								});
							}
						} else {
							if (name == 'SaBa') {
								uni.showLoading({
									title: this_.$t('loading')
								});
								let query = {
									platform: this_.mobile_common ? 2 : 1,
									gid
								}
								let res = await this_.$u.api.game_get_api(query);
								if (res) {
									uni.hideLoading();
									if (res.code == 1) {
										if (res.data.url) {
											location.href = res.data.url;
										} else {
											location.href = res.data;
										}
									} else {
										this_.$refs.uTips.show({
											title: this_.$t(res.msg)
										});
									}
								}
							} else if (name == 'Pilot') {
								this_.$go('/pages/pilot/index?gid=' + gid);
							} else {
								uni.navigateTo({
									url: '/pages/otherGame/otherGame?tid=' + tid + '&gid=' + gid
								})
							}
						}
					} else {
						this.$refs.uTips.show({
							title: this.$t('待开放')
						});
					}
				} else {
					this.$go('/pages/login/index');
				}
			},
			// 获取游戏分类
			async gameGetType() {
				let res = await this.$u.api.game_get_type_p();
				if (res && res.code == 1) {
					// 关闭骨架屏
					this.loading = false;
					this.caterange = res.data;
					this.caterange.unshift({
						icon: "type-all",
						id: 0,
						name: this.$t('全部游戏'),
						sort: 0
					});
					for (let i in this.caterange) {
						if (this.caterange[i].id == this.cateid) {
							this.cateCur = i;
							this.cateValue = this.caterange[i].name;
							this.cateIco = this.caterange[i].icon;
						}
					}
				}
			},
			// 获取游戏平台
			async getGameThird() {
				let res = await this.$u.api.game_third_p();
				if (res && res.code == 1) {
					let arr = res.data;
					for (let i in arr) {
						arr[i].name = arr[i].tc_name;
					}
					this.tabslist = arr;
					this.tabslist.unshift({
						icon: "",
						id: 0,
						name: this.$t('全部'),
						tc_name: this.$t('全部'),
						sort: 0
					});
					this.feaGame = res.data;
				}
			},
			leftChange() {
				if (this.swiperCurrent > 0) {
					this.swiperCurrent--
				}
			},
			rightChange() {
				if (this.swiperCurrent < this.hotlist.length - 1) {
					this.swiperCurrent++
				}
			},

		}
	}
</script>

<style lang="scss">
	.game-card {
		margin-bottom: 30rpx;
		overflow: hidden;
	}

	// .game-filter::before {
	// 	content: "";
	// 	position: absolute;
	// 	top: 0;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	background: url("https://i0.wp.com/airlinkalaska.com/wp-content/uploads//aurora-2.jpg?resize=1024%2C683&ssl=1");
	// 	background-size: cover;
	// 	filter: blur(150px);
	// 	transform: scale(3);
	// }

	.type-card {
		padding: 30rpx;
		overflow: visible;

		::v-deep .u-content {
			border-radius: var(--card-radius) !important;
		}

		.data-select-input {}
	}

	.game-tabs {
		::v-deep .u-tab-item {
			border-radius: var(--tab-radius);
			background: var(--tab-item-bg);
			margin-right: 10px;
			color: var(--tab-item-color) !important;
		}

		::v-deep .item-active {
			background: var(--tab-active);
			color: #ffffff !important;
			height: 36px !important;
			line-height: 36px !important;
		}
	}


	.site-head {
		background: var(--mar-bg);
		// margin: -10px -16px 0 !important;
		padding: 0 15px 15px;
	}

	.bs-wrapper-nohid {
		background: var(--mar-bg);
		padding: 60px 0 0 0 !important;
	}

	.gooLight-box {
		background: var(--mar-bg);
	}

	.gooLight {
		background-color: #ebeff6;
		border-radius: 15px 15px 0 0;
		padding: 15px;
		border-top: 1px solid #e9e6e5;
	}


	.filter-icon {
		background-color: var(--form-main-uni-easyinput__content);
		border: var(--easyinput__border);
		box-shadow: var(--shadow-bg);
		color: var(--easyinput__color);
		padding: 0 15px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: var(--card-radius);
	}

	.icon-shaixuan2 {
		font-size: 20px;
	}

	.icon-shaixuan2 .shaixuanCon {
		position: absolute;
		right: 22rpx;
		bottom: 8px;
		transform: scale(.6);
	}


	.filter-badge {
		border-radius: 50%;
		width: 18px;
		height: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		position: absolute;
		right: -4px;
		top: -5px;
		transform: scale(.8);
		font-size: 10px;
		background-color: var(--mar-bg);
		color: var(--bar-color);
	}

	.featuresItem {
		background-color: #ECEAEB;
		box-shadow: var(--shadow-bg);
		color: var(--easyinput__color);
		padding: 8px 15px;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 50px;
	}
	
	.featuresItem2 {
		background-color: #ECEAEB;
		box-shadow: var(--shadow-bg);
		color: var(--easyinput__color);
		padding: 15px 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 50px;
	}
	
	// .featuresItem {
	// 	background-color: #ECEAEB;
	// 	border: var(--easyinput__border);
	// 	box-shadow: var(--shadow-bg);
	// 	color: var(--easyinput__color);
	// 	padding: 10px 15px;
	// 	height: 40px;
	// 	display: flex;
	// 	justify-content: center;
	// 	align-items: center;
	// 	text-align: center;
	// 	border-radius: 50px;
	// }

	.featuresActive {
		background: linear-gradient(var(--btn-submit-bg-1), var(--btn-submit-bg-2));
		box-shadow: var(--btn--submit--shadow);
		border-radius: 50px;
		color: #fff;
	}

	.game-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		height: 41px;
		margin: 0;
		padding: 0 10px;
		font-size: 14px;
		text-align: center;
		border-radius: var(--card-radius);
		cursor: pointer;
		-webkit-transition: opacity 0.2s;
		transition: opacity 0.2s;
		-webkit-appearance: none;
	}

	.famePayRight {
		height: 157px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.famePayRight .game-name {
		font-size: 20px;
		font-weight: bold;
	}

	@keyframes xing {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.2);
		}

		100% {
			transform: scale(1);
		}
	}

	.my_xing {
		-webkit-animation-name: xing;
		-webkit-animation-timing-function: ease-in-out;
		-webkit-animation-iteration-count: 1;
		-webkit-animation-duration: .8s;
		animation-iteration-count: 1;
	}

	.container ::v-deep .uni-navbar {
		background: var(--mar-bg);
	}

	.gameType-border1 {
		border-radius: 15px 15px 0 0;
	}
	
	.gameType-border2-box {
		background-color: var(--bs-popup-hd);
	}

	.gameType-border2 {
		height: 80vh;
		overflow-y: scroll;
		background-color: #fff;
		padding: 15px 15px 15px 5px;
		border-radius: 15px 15px 0 0;
	}
</style>

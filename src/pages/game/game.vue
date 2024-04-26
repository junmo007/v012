<template>
	<view>
		<view class="content" :data-theme="themeMode">
			<view class="u-skeleton" :class="headerBg ? 'containerClass' : 'container'">
				<uniNavHeader :title="this.$t('web_name')" @clickLeft="menuClick" @headerPwd="headerPwd" ref="header" :pageActive="1">
				</uniNavHeader>
				<view class="game-tabs-active">
					<template v-if="tabslist.length > 0">
						<image :src="tabslist[current].banner"></image>
					</template>
				</view>
				<view class="bs-wrapper">
					<!-- <swiper class="game-banner u-skeleton-fillet" :indicator-dots="true" :autoplay="true"
						:interval="7000" :duration="500">
						<swiper-item v-for="(item,index) in gameBannerList" :key="`gameBannerList${index}`"
							@click="jump(item)">
							<u-image :src="item.img" height="156px" width="100%" borderRadius="var(--card-radius)"
								mode="aspectFill">
								<u-loading slot="loading"></u-loading>
							</u-image>
						</swiper-item>
					</swiper> -->
					<!-- gameType -->
					<!-- <view class="u-m-l-30 u-m-r-30 u-m-b-30">
						<u-image :src="$t('game_banner_img')" width="100%" borderRadius="10px"
							mode="widthFix">
							<u-loading slot="loading"></u-loading>
						</u-image>
					</view> -->
					<view class="game-main">
						<view class="game-tabs u-m-b-30 u-skeleton-fillet">
							<u-tabs height="64" bar-height="0" bg-color="none" gutter="40" active-color="#ffffff"
								inactive-color="#ffffff" :list="tabslist" :current="current" @change="changeTab"
								isImg="2">
							</u-tabs>
						</view>
						<template v-if="cateCurrent == 1">
							<view class="game-panel u-skeleton-fillet">
								<view class="game-head u-flex" v-if="hotlist.length > 0">
									<view class="u-flex">
										<view class="g-line"></view>
										<view class="g-tit">{{$t("热门游戏")}}</view>
									</view>
									<view class="u-flex boxRight">
										<view class="arr-item clickOver" :class="swiperCurrent>0?'activeLeft':''"
											@click="leftChange">
											<text class="iconfont icon-sanjiao4"
												:class="swiperCurrent>0?'':'arrowdisable'"></text>
										</view>
										<view class="arr-item">{{swiperCurrent + 1}}</view>
										<view class="arr-item clickOver"
											:class="swiperCurrent<hotlist.length-1?'activeRight':''"
											@click="rightChange">
											<text class="iconfont icon-sanjiao3"
												:class="swiperCurrent<hotlist.length-1?'':'arrowdisable'"></text>
										</view>
									</view>
								</view>
								<view class="game-list">
									<swiper class="game-swiper" display-multiple-items="3" :current="swiperCurrent">
										<swiper-item v-for="(item,index) in hotlist" :key="index">
											<view class="game-card u-skeleton-fillet">
												<view class="card-bg" :style="{backgroundImage:'url('+item.icon+')'}">
												</view>
												<template v-if="mobile_common">
													<!-- @click="gameListClisk_common(item.game_name,item.g_tcid,item.id,item.game_status,item.tc_code)"> -->
													<u-image :src="item.icon" mode="widthFix" width="230rpx"
														height="302rpx" borderRadius="var(--card-radius)"
														@click="gamePop(item.id)">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<template v-if="!mobile_common">
													<u-image :src="item.icon" mode="widthFix" width="275rpx"
														height="408rpx" borderRadius="var(--card-radius)"
														@click="gamePop(item.id)">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<view class="palyBtn u-text-center">
													<text class="palyBtnText"
														@click="gamePop(item.id)">{{$t('PLAY')}}</text>
												</view>
												<!-- <view class="game-hot-tag">HOT</view> -->
											</view>
										</swiper-item>
									</swiper>
								</view>
							</view>
							<view class="game-panel u-skeleton-fillet" v-if="newlist.length > 0">
								<view class="game-head u-flex">
									<view class="u-flex">
										<view class="g-line"></view>
										<view class="g-tit">{{$t("最新游戏")}}</view>
									</view>
									<view class="u-flex boxRight">
										<view class="arr-item clickOver" :class="swiperCurrent2>0?'activeLeft':''"
											@click="leftChange2">
											<text class="iconfont icon-sanjiao4"
												:class="swiperCurrent2>0?'':'arrowdisable'"></text>
										</view>
										<view class="arr-item">{{swiperCurrent2 + 1}}</view>
										<view class="arr-item clickOver"
											:class="swiperCurrent2<newlist.length-1?'activeRight':''"
											@click="rightChange2">
											<text class="iconfont icon-sanjiao3"
												:class="swiperCurrent2<newlist.length-1?'':'arrowdisable'"></text>
										</view>
									</view>
								</view>
								<view class="game-list">
									<swiper class="game-swiper" display-multiple-items="3" :current="swiperCurrent2">
										<swiper-item v-for="(item,index) in newlist" :key="index">
											<view class="game-card u-skeleton-fillet">
												<view class="card-bg" :style="{backgroundImage:'url('+item.icon+')'}">
												</view>
												<template v-if="mobile_common">
													<!-- @click="gameListClisk_common(item.game_name,item.g_tcid,item.id,item.game_status,item.tc_code)"> -->
													<u-image :src="item.icon" mode="widthFix" width="230rpx"
														height="302rpx" borderRadius="var(--card-radius)"
														@click="gamePop(item.id)">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<template v-if="!mobile_common">
													<u-image :src="item.icon" mode="widthFix" width="275rpx"
														height="408rpx" borderRadius="var(--card-radius)"
														@click="gamePop(item.id)">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<view class="palyBtn u-text-center">
													<text class="palyBtnText"
														@click="gamePop(item.id)">{{$t('PLAY')}}</text>
												</view>
												<!-- <view class="game-new-tag">NEW</view> -->
											</view>
										</swiper-item>
									</swiper>
								</view>
							</view>

							<view class="game-panel" v-for="(item,index) in gameData" :key="`game${index}`"
								:id="`game${item.id}`" v-show="item.game.length>0">
								<view class="game-head u-flex clickOver">
									<view class="u-flex">
										<view class="g-line"></view>
										<view class="g-tit">{{$t(item.name)}}</view>
									</view>
									<view class="g-more" @click="$go('/pages/game/gameType')">
										<text class="u-c-b">{{$t("public7")}}</text>
										<text class="iconfont icon"></text>
									</view>
								</view>
								<view class="game-list">
									<u-row gutter="30">
										<u-col span="4" v-for="(it_it,id_id) in item.game" :key="id_id">
											<view class="game-card u-skeleton-fillet">
												<view class="card-bg" :style="{backgroundImage:'url('+it_it.icon+')'}">
												</view>
												<template v-if="mobile_common">
													<!-- gameListClisk_common(it_it.game_name,it_it.g_tcid,it_it.id,it_it.game_status,it_it.tc_code) -->
													<u-image :src="it_it.icon" mode="widthFix" width="230rpx"
														height="302rpx" borderRadius="var(--card-radius)"
														@click="gamePop(it_it.id)">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<template v-if="!mobile_common">
													<u-image :src="it_it.icon" mode="widthFix" width="275rpx"
														height="408rpx" borderRadius="var(--card-radius)"
														@click="gamePop(it_it.id)">
														<u-loading slot="loading"></u-loading>
													</u-image>
												</template>
												<view class="palyBtn u-text-center">
													<text class="palyBtnText"
														@click="gamePop(it_it.id)">{{$t('PLAY')}}</text>
												</view>
											</view>
										</u-col>
									</u-row>
								</view>
							</view>
						</template>
						<template v-if="cateCurrent == 2">
							<view class="game-panel">
								<view class="game-list u-skeleton-fillet">
									<template v-if="curEmpty == 1">
										<view class="game-head-name">{{$t(sortName)}}</view>
										<u-row gutter="30">
											<u-col span="4" v-for="(item,index) in gameList" :key="index">
												<view class="u-m-b-28 game-card">
													<view class="card-bg"
														:style="{backgroundImage:'url('+item.icon+')'}"></view>
													<template v-if="mobile_common">
														<u-image :src="item.icon" mode="widthFix" width="230rpx"
															height="302rpx" borderRadius="var(--card-radius)"
															@click="gamePop(item.id)">
															<u-loading slot="loading"></u-loading>
														</u-image>
													</template>
													<template v-if="!mobile_common">
														<u-image :src="item.icon" mode="widthFix" width="275rpx"
															height="408rpx" borderRadius="var(--card-radius)"
															@click="gamePop(item.id)">
															<u-loading slot="loading"></u-loading>
														</u-image>
													</template>
													<view class="palyBtn u-text-center">
														<text class="palyBtnText"
															@click="gamePop(item.id)">{{$t('PLAY')}}</text>
													</view>
												</view>
											</u-col>
										</u-row>
										<view class="load-more-box">
											<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
										</view>
									</template>
									<template v-if="curEmpty == 0">
										<listEmpty :isDefault="true">
										</listEmpty>
									</template>
								</view>
							</view>
						</template>
						<view class="game-panel" v-if="gameOrderList.length > 0">
							<view class="game-head u-flex u-skeleton-fillet">
								<view class="g-tit">{{$t("实时投注")}}</view>
							</view>
							<view class="fan-card bet-table u-skeleton-fillet">
								<view class="b-table-head">
									<view class="b-row">
										<view class="b-th no-flex">{{$t("实时投注")}}</view>
										<view class="b-th no-flex">{{$t("玩家")}}</view>
										<view class="b-th no-flex">{{$t("获利")}}</view>
									</view>
								</view>
								<view class="b-line"></view>
								<view class="b-table-body scrollBody">
									<view class="b-row" v-for="(item,index) in gameOrderList" :key="`luckitem${index}`">
										<view class="b-tb">
											<view class="b-item">{{$t(item.game_name)}}</view>
										</view>
										<view class="b-tb">
											<view class="b-item">{{item.username}}</view>
										</view>
										<view class="b-tb">
											<view class="b-item">{{item.gb_winprice}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<uniNavFooter fIndex="2"></uniNavFooter>
				<u-skeleton :loading="loading" :animation="true" bgColor="var(--body-bg)" el-color="var(--u-skeletonA)"
					bg-color="var(--u-skeletonB)"></u-skeleton>
				<!-- main -->
				<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
				</u-top-tips>
				<u-popup v-model="gamePay" mode="bottom" border-radius="35" :mask-custom-style="uPopMaskCustomStyle"
					@close="gamePayClose">
					<view class="u-p-40">
						<view class="u-flex u-col-top">
							<view style="min-width: 220rpx;">
								<u-image :src="gameDetail.g_icon" mode="widthFix" width="100%"
									borderRadius="var(--card-radius)" @click="gamePop">
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
				<u-popup v-model="thirdGame" mode="center" :mask-close-able="false" :mask="false"
					:mask-custom-style="uPopMaskCustomStyle">
					<gameIframe :iframeUrl="gameUrl" @gameMenuClose="gameMenuClose"></gameIframe>
				</u-popup>
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
			gameIframe,
			pcBg
		},
		data() {
			return {
				// 2.0
				loading: true, // 是否显示骨架屏组件
				bannerList: [],
				findex: 3,
				swiperCurrent: 0,
				swiperCurrent2: 0,
				hotlist: [],
				newlist: [],
				current: 0,
				tabslist: [],
				sortId: 0, //游戏分类id
				sortName: '',
				gameList: [],
				gameOrderList: [], //游戏订单
				animationData: {},
				scrollStart: null,
				j_total: 0,
				page: 1,
				status: 'more',
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				empty: null,
				curEmpty: null,
				gameData: [],
				cateCurrent: 1,
				keletonHotlist: 1, //热门游戏骨架
				gameBannerList: [],
				gamePay: false,
				gameDetail: {},
				showCss3: false,
				gameUrl: '',
				thirdGame: false,
				gameType: [],
				headerBg: false
			}
		},
		// onShow() {
		// 	let animation = uni.createAnimation({
		// 		transformOrigin: "50% 50%",
		// 		duration: 1000,
		// 		timingFunction: "linear",
		// 		delay: 0
		// 	})
		// 	this.animation = animation;
		// },
		destroyed() {
			this.scrollStart = null;
		},
		async onLoad() {
			this.getGameIndex();
			// this.getGameGetType();
			// this.getGame('add');
			this.getgameOrderList();
			this.gameGetType();
			// this.getBanner();
		},
		onReachBottom() {
			if (this.current > 0) {
				if (this.status == 'noMore') {
					return;
				}
				this.getGame('', this.sortId);
			}
		},
		onPageScroll(e) {
			if(e.scrollTop >= 150){
				this.headerBg = true;
			}else {
				this.headerBg = false;
			}
		},
		mounted() {},
		computed: {},
		methods: {
			async getGameGetType() {
				let res = await this.$u.api.game_get_type_p();
				if (res && res.code == 1) {
					this.gameType = res.data;
				}
			},
			gameMenuClose() {
				this.thirdGame = false;
			},
			gameClick(tc_code) {
				let api = this.$helper.get('rule').game_url;
				if (api) {
					this.getGameUrl(this.gameDetail.id, api + '/game/login_game',tc_code);
				} else {
					this.successChange(this.gameDetail.id,tc_code);
				}
			},
			async getGameUrl(gid, api,tc_code) {
				uni.showLoading({
					title: this.$t('loading')
				});
				this.$u.post(api, {
					platform: 2,
					gid
				}).then(async res => {
					uni.hideLoading();
					if (res && res.code == 1) {
						if(tc_code == 'ZB'){
							location.href = res.data;
						}else {
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
			async successChange(gid,tc_code) {
				let res = await this.$u.api.game_login_game_p({
					platform: 2,
					gid
				});
				if (res && res.code == 1) {
					if(tc_code == 'ZB'){
						location.href = res.data;
					}else {
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
			gamePayClose() {
				this.showCss3 = false;
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
			getBanner() {
				this.$u.api.banner_p().then(ret => {
					if (ret && ret.code == 1) {
						if (!this._isMobile()) {
							for (let key in ret.data['mobile']) {
								if (ret.data['mobile'][key].lang == this.$helper.getLang() && ret.data['mobile'][
										key
									].show_position == 2) {
									this.gameBannerList.push(ret.data.mobile[key]);
								}
							}
						} else {
							if (ret.data['mobile'].length > 0) {
								for (let key in ret.data['mobile']) {
									if (ret.data['mobile'][key].lang == this.$helper.getLang() && ret.data[
											'mobile'][key].show_position == 2) {
										this.gameBannerList.push(ret.data.mobile[key]);
									}
								}
							}
						}
					}
				});
			},
			jump(item) {
				window.location.href = item.url;
			},
			async getGameIndex() {
				// let res = await this.$u.api.game_index_p();
				let res = await this.$u.api.game_index_new_p();
				if (res && res.code == 1) {
					this.gameData = res.data;
					this.hotlist = res.hot;
					this.newlist = res.new;
					if (this.hotlist.length > 0) {
						this.keletonHotlist = 1;
					} else {
						this.keletonHotlist = 0;
					}
				}
				this.loading = false;
			},
			menuClick() {
				this.sideshow = !this.sideshow
			},
			async getgameOrderList() {
				let res = await this.$u.api.game_order_t_p({
					limit: 5,
					page: 1,
					is_new: 1
				});
				if (res && res.code == 1) {
					this.gameOrderList = res.data;
				}
			},
			changeTab(index) {
				this.current = index;
				this.sortId = this.tabslist[index].id;
				this.sortName = this.tabslist[index].name;
				if (index == 0) {
					this.cateCurrent = 1;
				} else {
					this.cateCurrent = 2;
					this.page = 1;
					this.empty = null;
					this.gameList = [];
					this.status = 'loading';
					this.getGame('add', this.tabslist[index].id);
				}


				// if (this.tabslist[index].id == 0) {
				// 	document.body.scrollTop = document.documentElement.scrollTop = 0;
				// } else {
				// 	document.querySelector(`#game${this.tabslist[index].id}`).scrollIntoView({
				// 		behavior: "smooth",
				// 		block: "center",
				// 		inline: "nearest"
				// 	})
				// }


			},
			async getGame(add, t_id) {
				let parme = {};
				if (t_id) {
					parme = {
						page: this.page,
						limit: 20,
						t_id: t_id ? t_id : ''
					}
				} else {
					parme = {
						page: this.page,
						limit: 20,
					}
				}
				// let res = await this.$u.api.game_get_game_url_p(parme);
				let res = await this.$u.api.game_list_p(parme);
				if (res) {
					this.loading = false;
					// this.gameList = res.data;
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
						this.curEmpty = 1;
					} else {
						this.curEmpty = 0;
					}
				}
			},
			// 滚动
			animations(stauts) {
				let i = -1;
				let j = this.j_total;
				let sum = this.gameOrderList.length;
				this.scrollStart = setInterval(() => {
					if (i == this.sum) {
						i = 0;
					}
					setTimeout(() => {
						let arr = this.gameOrderList.splice(i, 1)[0];
						this.gameOrderList.push(arr);
						this.gameOrderList.splice(i, 0, arr);
						this.j_total = j;
					}, 500)
					i++;
					j++;

					this.animation.translateY(-24 * j).step();
					this.animationData = this.animation.export();
				}, 1000)
			},
			// 获取游戏分类
			async gameGetType() {
				let res = await this.$u.api.game_get_type_p();
				if (res && res.code == 1) {
					// 关闭骨架屏
					this.loading = false;
					this.tabslist = res.data;
					if (this.tabslist.length > 0) {
						this.tabslist.unshift({
							icon: this.$t('iconImg1'),
							icon2: this.$t('iconImg2'),
							id: 0,
							banner: this.$t('GameBanner'),
							name: this.$t('大厅'),
							sort: 0
						})
					}
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
			leftChange2() {
				if (this.swiperCurrent2 > 0) {
					this.swiperCurrent2--
				}
			},
			rightChange2() {
				if (this.swiperCurrent2 < this.newlist.length - 1) {
					this.swiperCurrent2++
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
		}
	}
</script>

<style lang="scss">
	// .bs-wrapper {
	// 	padding: 70px 0 0 0 !important;
	// 	background: var(--mar-bg) !important;
	// }
	
	.bs-wrapper {
		padding: 0 0 0 0 !important;
		background: none !important;
		margin: -130px 0 0 0;
	}

	.game-main {
		background-color: #ebeff6;
		border-radius: 20px 20px 0 0;
		padding: 0 15px 15px 15px !important;
		position: relative;
		z-index: 99;
	}

	.index-main {
		padding-top: 60px;
	}

	.b-row .b-th:nth-child(1),
	.b-row .b-tb:nth-child(1) {
		width: 33%;
	}

	.b-row .b-th:nth-child(2),
	.b-row .b-tb:nth-child(2) {
		width: 33%;
	}

	.b-row .b-th:nth-child(3),
	.b-row .b-tb:nth-child(3) {
		width: 33%;
	}

	// .b-row .b-th:nth-child(4),
	// .b-row .b-tb:nth-child(4) {
	// 	width: 21%;
	// }

	.bkc-body {
		background-image: url(@/static/images/skin/default/qout-card-bg.jpg);
	}

	.game-banner {
		height: 156px;
		overflow: hidden;
		margin-bottom: 15px;
	}

	.game-banner .game-banner-item {
		height: 300rpx;
		border-radius: 8px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}

	.game-tabs {
		background: #fff;
		margin: 0 -15px 15px !important;
		border-radius: 20px 20px 0 0 !important;
		padding: 10px 10px 0 10px;
		position: relative;
		z-index: 1099;


		::v-deep .u-tab-item {
			border-radius: 35px;
			min-width: 100px;
			text-align: center;
			margin-right: 10px;
			color: var(--tab-active) !important;
			height: 60px !important;
			line-height: 13px !important;
		}

		::v-deep .item-active {
			color: #0088EC !important;
			height: 60px !important;
			line-height: 13px !important;
			font-weight: bold;
		}
	}

	.game-head-name {
		padding: 0 12px;
		font-size: 14px;
		font-weight: bold;
		height: 20px;
		line-height: 20px;
		margin: 0 0 10px auto;
		border-radius: 3px;
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

	.game-new-tag {
		position: absolute;
		left: -22px;
		top: -10px;
		z-index: 88;
		font-size: 8px;
		padding: 14px 30px 5px 17px;
		background: var(--gradient-color) !important;
		transform: rotate(-45deg);
		font-style: italic;
	}

	.container {
		position: relative;

		::v-deep .uni-navbar {
			background: none;
			position: relative;
			z-index: 666 !important;
		}

		.game-tabs-active {
			height: 420px;
			margin-top: -60px;
			background: var(--mar-bg);
		}
	}
	
	.containerClass ::v-deep .uni-navbar {
	    background: var(--mar-bg);
	}
	
	.game-tabs-active image {
		width: 100%;
		height: 420px;
	}
</style>

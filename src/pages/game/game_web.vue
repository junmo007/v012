<template>
	<view>
		<template v-if="!mobile_common">
			<pcNavHeader></pcNavHeader>
			<view style="background: var(--pc-main);">
				<image :src="$t('gam-web-top')" mode="" style="height: 230px;width: 100%;"></image>
			</view>
			<view class="pc-main u-flex u-col-top">
				<view class="flex_bd game-web-left">
					<swiper :circular="false" :indicator-dots="false" :autoplay="false"
						:display-multiple-items="swiperMultiple" style="height: 45px">
						<swiper-item v-for="(item,index) in sanf" :key="`sanf${index}`" @click="sanfChang(item.tc_id)">
							<view class="sanfItem u-flex game_web_item u-row-center"
								:class="[cateTC_id == item.tc_id ?'game_web_active_item':'',item.tc_logo ?'game_web_item_image':'game_web_item_text']">
								<image :src="$t('iconImg1')" style="width:22px;height: 22px;" v-if="index == 0"></image>
								<template v-if="item.tc_logo">
									<image :src="item.tc_logo" mode="heightFix" style="height: 32px;"></image>
								</template>
								<template v-if="!item.tc_logo">
									<view class="game-type u-m-l-12">
										<view class="game-tabs-item-name">
											<view class="game-tabs-item-marquee">
												{{$t(item.tc_name)}}
											</view>
										</view>
									</view>
								</template>
							</view>
						</swiper-item>
					</swiper>
					<view class="u-flex u-flex-wrap u-m-t-40">
						<view class="u-flex u-row-center game_web_item  u-m-t-20 u-m-r-26 game_web_item_text widthItem2"
							v-for="(item,index) in caterange" :key="`caterange${index}`"
							:class="cateT_id == item.id ?'game_web_active_item':''" @click="cateChang(item.id)">
							<image :src="item.icon" style="width:22px;height: 22px;"></image>
							<!-- <view class="u-m-l-12 m-font-16">{{$t(item.name)}}</view> -->
							<view class="game-type u-m-l-12">
								<view class="game-tabs-item-name">
									<view class="game-tabs-item-marquee">
										{{$t(item.name)}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="u-flex u-m-t-40 u-row-between u-m-r-32">
						<view class="u-flex u-flex-wrap">
							<view v-for="(item,index) in featuresArr" :key="`featuresArr${index}`"
								class="featu-item u-m-t-20 u-m-r-26 featuresItem m-font-16 u-flex u-row-center widthItem2"
								:class="index == featuresActive ? 'featuresActive' : ''" @click="featuresChange(index)">
								<image :src="$t('iconImg1')" style="width:22px;height: 22px;margin-right: 6px;"
									v-if="index == 0"></image>
								<!-- <view>{{item.type}}</view> -->
								<view class="game-type">
									<view class="game-tabs-item-name">
										<view class="game-tabs-item-marquee">
											{{$t(item.type)}}
										</view>
									</view>
								</view>
							</view>
						</view>
						<u-search bg-color="#09102A" border-color="#0D183B" search-icon-color="#999"
							placeholder-color="var(--link-color)" color="#fff" shape="square" height="80"
							:show-action="false" v-model="keyword" @search="gameSearch"
							:placeholder="$t('Search your like Game')" class="u-m-t-20" style="max-width: 300px;">
						</u-search>
					</view>
					<template v-if="empty == 1">
						<view class="u-flex u-flex-wrap u-m-t-40 w_100">
							<view class="game-item" v-for="(item,index) in gameList" :key="`gameList${index}`">
								<view class="game-item-img" @click="gameClick(item.id,item.tc_code)">
									<image :src="item.icon" style="width:207px;height: 265px;"></image>
								</view>
								<view class="u-flex u-row-between w_100 u-p-10 hoverClass">
									<view class="game-type u-m-r-30">
										<view class="game-tabs-item-name">
											<view class="game-tabs-item-marquee">
												{{$t(item.game_name)}}
											</view>
										</view>
									</view>
									<template v-if="item.my_collect == 0">
										<u-icon name="star" color="#999" size="36" :class="showCss3?'my_xing':''"
											@click="gameCollection(item.id)"></u-icon>
									</template>
									<template v-if="item.my_collect == 1">
										<u-icon name="star-fill" color="var(--bar-bg)" size="36"
											@click="gameCollection(item.id)" :class="showCss3?'my_xing':''">
										</u-icon>
									</template>
								</view>
							</view>
						</view>
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
				<view class="u-m-l-40">
					<view class="game-panel-card" :class="pageScroll >= 240 ?'game-panel-fixed' :''">
						<view class="u-text-center m-font-b game-panel-card-head">{{$t('实时投注')}}</view>
						<swiper circular class="game-panel-card-swiper" vertical :indicator-dots="false"
							:autoplay="true" :interval="2000" :duration="1000" :display-multiple-items="8">
							<swiper-item v-for="(item,index) in gameOrderList" :key="`gameOrderList${index}`">
								<view class="game-panel-card-item u-flex u-row-between u-m-t-16">
									<view class="u-flex">
										<image :src="item.game_icon" style="width: 36px;height: 36px" mode=""></image>
										<view class="u-m-l-20">
											<view>{{item.game_name}}</view>
											<view class="u-c-b u-m-t-8">{{item.username}}</view>
										</view>
									</view>
									<view class="u-text-right">
										<view>{{$t("获利")}}</view>
										<view class="u-c-r u-m-t-8">{{item.gb_winprice}}</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10080">
			</u-top-tips>
		</template>
	</view>
</template>

<script>
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcNavHeader from '@/components/pc-head-bar/pc-head-bar.vue'
	export default {
		components: {
			listEmpty,
			pcNavHeader
		},
		data() {
			return {
				sanf: [],
				featuresArr: [{
					type: this.$t('全部')
				}, {
					type: this.$t('最热游戏')
				}, {
					type: this.$t('最新游戏')
				}, {
					type: this.$t('收藏')
				}],
				caterange: [],
				featuresActive: 0,
				gameList: [],
				status: 'more',
				page: 1,
				cateT_id: 0,
				cateTC_id: 0,
				empty: null,
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				showCss3: false,
				gameOrderList: [],
				keyword: '', //搜索
				innerWidth: 0,
				swiperMultiple: 7,
				pageScroll: 0
			}
		},
		onReachBottom(e) {
			if (this.status == 'noMore') {
				return;
			}
			this.getGame('', this.cateT_id, this.cateTC_id, '');
		},
		onPageScroll(e) {
			this.pageScroll = e.scrollTop;
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: this.$t('All Games')
			});
			this.innerWidth = window.innerWidth;
			if (this.innerWidth > 1555) {
				this.swiperMultiple = 7;
			} else {
				this.swiperMultiple = 6;
			}
			if (this.innerWidth < 1480) {
				this.swiperMultiple = 5;
			}

			if (this.innerWidth < 1300) {
				this.swiperMultiple = 4;
			}
			if (option.t_id) {
				this.cateT_id = JSON.parse(option.t_id);
				this.cateTC_id = JSON.parse(option.tc_id);
				this.gameGetType(); //游戏分类
				this.gameGetTypeThird();
				this.getGame('add', this.cateT_id, this.cateTC_id, '');
				this.getgameOrderList();
			} else {
				this.paBackHome();
			}
		},
		methods: {
			async getgameOrderList() {
				let res = await this.$u.api.game_order_t_p({
					limit: 50,
					page: 1,
					is_new: 1
				});
				if (res && res.code == 1) {
					this.gameOrderList = res.data;
				}
			},
			async gameCollection(g_id) {
				let res = await this.$u.api.game_game_collect_p({
					g_id
				});
				if (res && res.code == 1) {
					for (let i in this.gameList) {
						if (this.gameList[i].id == g_id) {
							if (this.gameList[i].my_collect == 0) {
								this.gameList[i].my_collect = 1;
							} else {
								this.gameList[i].my_collect = 0;
							}
						}
					}
					this.showCss3 = true;
					this.$forceUpdate();
				}
			},
			changeURLArg(url, arg, arg_val) {
				var pattern = arg + '=([^&]*)';
				var replaceText = arg + '=' + arg_val;
				if (url.match(pattern)) {
					var tmp = '/(' + arg + '=)([^&]*)/gi';
					tmp = url.replace(eval(tmp), replaceText);
					return tmp;
				} else {
					if (url.match('[\?]')) {
						return url + '&' + replaceText;
					} else {
						return url + '?' + replaceText;
					}
				}
			},
			// 获取游戏三分
			async gameGetTypeThird() {
				let res = await this.$u.api.game_third_p();
				if (res && res.code == 1) {
					this.sanf = res.data;
					if (this.sanf.length > 0) {
						this.sanf.unshift({
							icon: this.$t('iconImg3'),
							icon2: this.$t('iconImg4'),
							tc_id: 0,
							tc_name: this.$t('全部'),
							sort: 0
						})
					}
				}
			},
			// 获取游戏分类
			async gameGetType() {
				let res = await this.$u.api.game_get_type_p();
				if (res && res.code == 1) {
					this.caterange = res.data;
					if (this.caterange.length > 0) {
						this.caterange.unshift({
							icon: this.$t('iconImg1'),
							icon2: this.$t('iconImg2'),
							id: 0,
							name: this.$t('全部'),
							sort: 0
						})
					}
				}
			},
			featuresChange(index) {
				this.featuresActive = index;
				this.page = 1;
				this.gameList = [];
				this.cateT_id = 0;
				this.cateTC_id = 0;
				this.getGame('add', '', '', '');
			},
			async getGame(add, t_id, tc_id, value) {
				uni.showLoading({
					title: this.$t('loading')
				});
				let parme = {};
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
				let res = await this.$u.api.game_list_p(parme);
				if (res) {
					this.gameType = false;
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
					if (this.gameList.length > 0) {
						for (let m in this.gameList) {
							this.gameList[m].my_collect = this.gameList[m].is_collect;
						}
					}
				}
			},
			cateChang(id) {
				this.cateT_id = id;
				this.page = 1;
				this.keyword = '';
				this.gameList = [];
				this.getGame('add', this.cateT_id, this.cateTC_id, '');
			},
			sanfChang(id) {
				this.cateTC_id = id;
				this.page = 1;
				this.gameList = [];
				this.getGame('add', this.cateT_id, this.cateTC_id, '');
				this.$forceUpdate();
			},
			gameSearch(value) {
				this.page = 1;
				this.empty = null;
				this.gameList = [];
				this.status = 'loading';
				this.getGame('add', this.cateT_id, this.cateTC_id, value);
			},
			gameClick(gid, tc_code) {
				let api = this.$helper.get('rule').game_url;
				if (api) {
					this.getGameUrl(gid, api + '/game/login_game', tc_code);
				} else {
					this.successChange(gid, tc_code);
				}
			},
			async getGameUrl(gid, api, tc_code) {
				uni.showLoading({
					title: this.$t('loading')
				});
				this.$u.post(api, {
					platform: 1,
					gid
				}).then(async res => {
					uni.hideLoading();
					if (res && res.code == 1) {
						location.href = res.data;
					} else {
						this.$refs.uTips.show({
							title: this.$t(res.msg)
						});
					}
				});
			},
			async successChange(gid, tc_code) {
				let res = await this.$u.api.game_login_game_p({
					platform: 1,
					gid
				});
				if (res && res.code == 1) {
					location.href = res.data;
				} else {
					this.$refs.uTips.show({
						title: this.$t(res.msg)
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.game_web_item {
		color: #2557C7;
		background: #1a254c;
		border-radius: 6px;
		cursor: pointer;
		min-height: 42px;
	}

	.game_web_item_image {
		padding: 5px 15px;
	}

	.game_web_item_text {
		padding: 10px 15.6px;
	}

	.game_web_active_item {
		color: #fff;
		background: #2F6FEC;
		border-radius: 6px;
		// padding: 5px 15px;
	}

	.featu-item {
		background: #1a254c;
		border-radius: 6px;
		padding: 0 15px;
		cursor: pointer;
		height: 42px;
		line-height: 42px;
	}

	.featuresItem {
		color: #fff;
	}

	.featuresActive {
		color: #2F6FEC;
	}

	.game-item {
		margin-top: 20px;
		position: relative;
		margin-right: 18px;
		// display: flex;
		// flex-direction: column;
		// justify-content: center;
		// align-items: center;
		color: #000;
		overflow: hidden;
		height: 265px;
		cursor: pointer;
		width: 207px;
	}



	.game-item .game-item-img {
		height: 265px;
		overflow: hidden;
		border-radius: 10px;
		background-image: linear-gradient(175deg, #0C1532, #172857);
	}

	.game-item .game-item-img {
		border-radius: 10px;
	}

	// .game-item .game-item-img:hover {
	// 	border-radius: 10px 10px 0 0;
	// }

	.game-item .hoverClass {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 50px;
		color: #fff;
		border-radius: 0 0 10px 10px;
		// opacity: 1;
		// background: rgba(0, 0, 0, .75);
		background: linear-gradient(to top, rgba(0, 0, 0, .64) 80%, rgba(0, 0, 0, 0) 100%);
		// transition: all 0.5s ease;
	}

	.my_xing {
		-webkit-animation-name: xing;
		-webkit-animation-timing-function: ease-in-out;
		-webkit-animation-iteration-count: 1;
		-webkit-animation-duration: .8s;
		animation-iteration-count: 1;
	}

	.game-panel-card {
		color: #fff;
		border-radius: var(--card-radius);
		background: #111b38;
		box-shadow: var(--card-shadow);
		width: 380px;
	}

	.game-panel-fixed {
		position: fixed;
		top: 120px;
	}


	.game-type {
		overflow: hidden;
		padding: 0 2px;
	}

	.game-type .game-tabs-item-name {
		width: 100%;
		animation: marquee-wrap 5s infinite linear;
	}

	.game-type .game-tabs-item-marquee {
		font-weight: bold;
		float: left;
		white-space: nowrap;
		min-width: 100%;
		animation: marquee-content 5s infinite linear;
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

	@keyframes marquee-wrap {

		0%,
		30% {
			transform: translateX(0);
		}

		70%,
		100% {
			transform: translateX(100%);
		}
	}

	@keyframes marquee-content {

		0%,
		30% {
			transform: translateX(0);
		}

		70%,
		100% {
			transform: translateX(-100%);
		}
	}

	.game-panel-card-head {
		padding: 15px;
		background-color: #3270E0;
		border-radius: 12px 12px 0 0;
	}

	.game-panel-card-item {
		margin: 15px;
		padding-bottom: 15px;
		border-bottom: 1px solid #152659;
	}

	.game-panel-card-item:last-child {
		border-bottom: 0;
	}

	.game-panel-card-swiper {
		height: 470px;
	}

	.sanfItem {
		width: 6vw;
		min-width: 100px;
		margin-right: 20px;
	}

	.game-web-left {
		max-width: 67%;
		flex: 1;
	}

	.widthItem2 {
		width: 6vw;
		min-width: 100px;
	}
</style>

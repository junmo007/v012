<template>
	<view class="content" :data-theme="themeMode">
		<view class="container" :class="sideshow?'is-mask':''">
			<u-navbar height="60" :background="navBackground" :title="$t('Personal Center')" :custom-back="back"
				back-icon-color="#fff" title-color="#fff">
			</u-navbar>
			<!-- sidebar -->
			<view class="sidebar" :class="sideshow?'is-show':''">
				<uniSideHeader @menuClick="menuClick" nIndex="6"></uniSideHeader>
			</view>
			<view class="mask" :class="sideshow?'is-show':''" @click="menuClick"></view>
			<!-- main -->



			<view class="main">
				<view class="topConent"></view>
				<view class="conent">
					<!-- 余额展示 -->
					<view class="topConent_two">
						<view class="u-text-center u-p-t-40">
							<view>{{$t('total score')}}</view>
							<view>{{flyerGameListUserinfo.flyer_money}}</view>
						</view>
						<view class="u-flex u-row-around u-m-t-50">
							<view class="u-text-center">
								<view>{{$t('Yesterday earnings')}}</view>
								<view class="ureText">{{flyerGameListTotal.yesterday_total}}</view>
							</view>
							<view class="u-text-center">
								<view>{{$t('Earnings today')}}</view>
								<view class="ureText">{{flyerGameListTotal.today_total}}</view>
							</view>
							<view class="u-text-center">
								<view>{{$t('Cumulative income')}}</view>
								<view class="ureText">{{flyerGameListTotal.all_total}}</view>
							</view>
						</view>


						<view class="u-flex u-row-around u-m-t-80 u-m-l-40 u-m-r-40">
							<view class="btn active" @click="intoShow">{{$t('transfer in')}}</view>
							<view class="btn" @click="outShow">{{$t('transfer out')}}</view>
						</view>
					</view>
					<template v-if="showEmpty == 1">
						<!-- 数据表 -->
						<view class="u-m-t-30 m-shadow u-bd-8">
							<!-- 表头 -->
							<view class="u-flex u-row-between w_100 singular-bg u-bd-8 u-p-t-26 u-p-b-26">
								<view class="w_25 u-text-center">
									{{$t('Note number')}}
								</view>
								<view class="w_25 u-text-center">
									{{$t('Bet amount')}}
								</view>
								<view class="w_25 u-text-center">
									{{$t('Income amount')}}
								</view>
								<view class="w_25 u-text-center">
									{{$t('User balance')}}
								</view>
							</view>
							<view class="u-flex u-row-between w_100 th-bg u-p-t-26 u-p-b-26"
								v-for="(item,index) in flyerGameZhudan" :key="index"
								:class="index%2==0?'':'singular-bg'">
								<view class="w_25 u-text-center">{{item.id}}</view>
								<view class="w_25 u-text-center">{{item.bets_coin}}</view>
								<view class="w_25 u-text-center">{{item.reward_coin}}</view>
								<view class="w_25 u-text-center">{{item.after_coin}}</view>
							</view>
						</view>
						<view class="load-more-box">
							<uni-load-more :status="status" :contentText="contentText"></uni-load-more>
						</view>
					</template>
					<template v-if="showEmpty == 0">
						<listEmpty :isDefault="true" class="u-bg-w u-bd-8 u-m-t-30 m-shadow" :listHighly='300'>
						</listEmpty>
					</template>
					<!-- <view style="height: 30px;"></view> -->
				</view>
			</view>


			<!-- 转入 -->
			<uni-popup ref="into" type="center">
				<view class="w_95 u-bd-8 u-bg-w">

					<view class="u-text-center u-font-34 m-font-b">{{$t('transfer in')}}</view>
					<view class="u-flex u-rela u-m-t-50 u-m-b-50">
						<!-- <image src="../../static/images/pilot/inputLeftIcon.png" class="inputLeftIcon" mode=""></image> -->
						<u-input :placeholder="$t('Please enter the transfer amount')" height="80" v-model="enterPrice"
							type="number" :clearable="false" :customStyle="customStyle" />
					</view>
					<view class="u-flex u-row-between u-p-b-20">
						<view class="btn active" @click="intoOnClick(enterPrice)">{{$t('confirm')}}</view>
						<view class="btn" @click="intoOn">{{$t('cancel')}}</view>
					</view>
				</view>
				<view class="iconfont icon-guanbi m-c-w u-text-center u-m-t-50" style="font-size: 35px;"
					@click="intoOn">
				</view>
			</uni-popup>





			<!-- 转出 -->
			<uni-popup ref="out" type="center">
				<view class="w_95 u-bd-8 u-bg-w">
					<view class="u-text-center u-font-34 m-font-b">{{$t('transfer out')}}</view>
					<view class="u-flex u-rela u-m-t-50 u-m-b-50">
						<!-- <image src="../../static/images/pilot/inputLeftIcon.png" class="inputLeftIcon" mode=""></image> -->
						<u-input :placeholder="$t('Please enter the transfer out amount')" height="80"
							v-model="outPrice" type="number" :clearable="false" :customStyle="customStyle" />
					</view>
					<view class="u-flex u-row-between u-p-b-20">
						<view class="btn active" @click="outPriceClick(outPrice)">{{$t('confirm')}}</view>
						<view class="btn" @click="outOn">{{$t('cancel')}}</view>
					</view>
				</view>
				<view class="iconfont icon-guanbi m-c-w u-text-center u-m-t-50" style="font-size: 35px;" @click="outOn">
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
				// 加载
				showEmpty: null,
				navBackground: {
					background: '#af0032'
				},
				customStyle: {
					paddingLeft: '40px',
					borderRadius: '6px',
					backgroundColor: '#F6F7FB',
				},
				contentText: {
					contentdown: this.$t('public16'),
					contentrefresh: this.$t('public15'),
					contentnomore: this.$t('public14')
				},
				status: 'more',
				page: 1,
				flyerGameListTotal: {},
				flyerGameListUserinfo: {},
				flyerGameZhudan: [],
				enterPrice: '',
				outPrice: ''
			}
		},
		onLoad() {
			this.getFlyerGameList();
			this.getFlyerGameZhudan();
		},
		async onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('Personal Center')
			});
		},
		onReachBottom() {
			if (this.status == 'noMore') {
				return;
			}
			this.getFlyerGameZhudan();
		},
		methods: {
			// 初始数据
			async getFlyerGameList() {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let res = await this.$u.api.flyer_game_list_p();
				if (res) {
					this.flyerGameListTotal = res.data.total;
					this.flyerGameListUserinfo = res.data.userinfo;
					uni.hideLoading();
				}
			},
			// 注单记录
			async getFlyerGameZhudan() {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let ret = await this.$u.api.flyer_game_zhudan_p({
					page: this.page,
					limit: 10,
				});
				if (ret) {
					uni.hideLoading();
					if (ret.data.length > 0) {
						this.showEmpty = 1;
						for (let i = 0; i < ret.data.length; i++) {
							this.flyerGameZhudan.push(ret.data[i]);
						}
						// 加载状态结束
						if (ret.data.length < 10) {
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
			// 转入
			async intoOnClick(price) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let res = await this.$u.api.flyer_game_flyer_in_p({
					price
				});
				if (res) {
					uni.hideLoading();
					if (res.code == 1) {
						this.getFlyerGameList();
						this.intoOn();
						this.enterPrice = '';
						this.$u.toast(this.$t(res.msg));
					} else {
						this.$u.toast(this.$t(res.msg));
					}
				}
			},
			// 转出
			async outPriceClick(price) {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let res = await this.$u.api.flyer_game_flyer_out_p({
					price
				});
				if (res) {
					uni.hideLoading();
					if (res.code == 1) {
						this.getFlyerGameList();
						this.outOn();
						this.outPrice = '';
						this.$u.toast(this.$t(res.msg));
					} else {
						this.$u.toast(this.$t(res.msg));
					}
				}
			},
			intoShow() {
				this.$refs.into.open();
			},
			intoOn() {
				this.$refs.into.close();
			},
			outShow() {
				this.$refs.out.open();
			},
			outOn() {
				this.$refs.out.close();
				this.outPrice = '';
			},
			async back() {
				uni.showLoading({
					mask: true,
					title: this.$t("loading")
				});
				let res = await this.$u.api.flyer_game_login_p();
				if (res) {
					// uni.$emit('updateData', res.url);
					location.href = res.url;
				} else {
					this.$u.toast($t(res.msg));
				}
				uni.hideLoading();
				let pages = getCurrentPages();
				if (pages && pages.length > 1) {
					uni.navigateBack({
						delta: 1,
					});
				} else {
					history.back();
				}
			},
		}
	}
</script>

<style lang="scss">
	.main {
		min-height: calc(100vh - 120px);
		min-width: 100vw;
		position: relative;
	}

	.topConent {
		// background-image: url('../../static/images/pilot/oneTopBg.png');
		height: 250px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	.conent {
		position: absolute;
		top: 15px;
		left: 15px;
		right: 15px;
		border-radius: 5px;
	}

	.topConent_two {
		// background-image: url('../../static/images/pilot/twoTopBg.png');
		height: 230px;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.ureText {
		color: #9C0331;
	}

	.btn {
		width: 40%;
		// margin: 0 30px;
		border-radius: 5px;
		border: 1px solid #282828;
	}

	.active {
		border: 0;
		color: #fff;
		background-color: #9C0331;
	}

	.w_25 {
		width: 25%;
	}

	.w_95 {
		width: 90vw;
		padding: 10px;
	}

	.singular-bg {
		background-color: #D8DCE8;
	}
</style>

<template>
	<view class="content" :data-theme="themeMode">
		<view class="container">
			<u-navbar title="" :background="background" height="60" back-icon-color="#fff" :custom-back="common_back" :border-bottom="false">
				<view class="u-flex u-row-center w-100-80">
					<view class="u-flex" v-if="matchObj.lg.na">
						<view class="m-font-14 m-c-w">{{matchObj.lg.na}}</view>
						<!-- <view class="iconfont icon-down u-m-l-16 m-font-12"></view> -->
					</view>
				</view>
			</u-navbar>
			<!-- main -->
			<view class="matchDetailMain">
				<u-sticky h5-nav-height="60" :enable="enable" bg-color="var(--sports-details-bg)">
					<view v-show="matchObj.vs.m3u8SD && asFlvSD">
						<view class="sportsLiveClass">
							<view v-show="matchObj.vs.m3u8SD && asFlvSD" class="u-abso iconfont icon-close"
								style="top: 5px;left: 5px;z-index: 75;" @click="asFlvSDChange">
							</view>
							<sportsLive ref="sportsLiveRef"></sportsLive>
						</view>
					</view>
					<view v-if="matchObj.as && asSta" class="conIframeClass">
						<comIframe :iframeUrl="matchObj.as[0]"></comIframe>
					</view>
					<view v-if="matchObj.as && asSta" class="u-abso iconfont icon-close"
						style="top: 5px;left: 5px;z-index: 70;" @click="asChange">
					</view>
				</u-sticky>
				<view class="matchDetailTop" :class="asSta ? 'minH-280' : ''">
					<view class="matchDetail">
						<view class="left u-flex u-row-right" v-if="matchObj.ts[0]">
							<view class="u-m-r-14">{{matchObj.ts[0].na}}</view>
							<image :src="matchObj.ts[0].lurl" mode="widthFix"></image>
						</view>
						<view class="vs u-flex u-row-center" v-if="matchObj.ts[0]">VS</view>
						<view class="right u-flex u-row-left" v-if="matchObj.ts[1]">
							<image :src="matchObj.ts[1].lurl" mode="widthFix"></image>
							<view class="u-m-l-14">{{matchObj.ts[1].na}}</view>
						</view>
					</view>
					<view class="u-flex u-row-center flex--direction">
						<view class="matchTime" v-if="matchObj.bt">{{timestampToTime(matchObj.bt)}}</view>
						<view class="marchStatus">
							{{matchObj.ms == 0 ? $t('已结束') : matchObj.ms == 1 ? $t('推迟') : matchObj.ms == 2 ? $t('中断') : matchObj.ms == 3 ? $t('取消') : matchObj.ms == 4 ? $t('未开赛') : matchObj.ms == 5 ? $t('进行中') : matchObj.ms == 6 ? $t('推迟') : matchObj.ms == 7 ? $t('废弃') : matchObj.ms == 8 ? $t('暂停') : ''}}
						</view>
					</view>
					<view class="match-tab">
						<view class="match-select u-flex u-row-center u-col-center">
							<!-- <view class="flex-1 tab-btn" v-if="matchObj.vs.have && !asFlvSD" @click="addAsFlvSD">
								{{$t('视频')}}
							</view> -->
							<view class="flex-1 tab-btn" v-if="matchObj.as && !asSta" @click="addAS">{{$t('动画')}}</view>
						</view>
					</view>
				</view>
				<view class="matchDetailBottom">
					<u-sticky h5-nav-height=""
						:offset-top="asSta && !asFlvSD ? '645' : !asSta && asFlvSD ? '588' : !asSta && !asFlvSD ? '110' : ''"
						index="8" :enable="enable" bg-color="var(--sports-details-bg)" v-if="matchObj.mg.length > 0">
						<view class="sticky-nav u-flex">
							<view class="iconfont icon-ssd all-btn" v-if="matchObj.mg.length > 1"
								@click="typeChoose == 1 ? allChooseStatus1() : allChooseStatus2()"></view>
							<view class="tab-item" :class="activeM_id == item.my_id ? 'tab-item-active' : ''"
								v-for="(item,index) in matchObj.mg" @click="payChange(item.my_id)" v-if="item.nm">
								{{item.nm}}
							</view>
						</view>
					</u-sticky>
					<view class="matchDetailBottom-item" v-for="(item,index) in matchObj.mg" :key="`mg${index}`"
						v-if="item.my_id != 0" :id="`matchView${item.my_id}`">
						<view class="top u-flex u-row-between" :class="!item.choose ? 'no-bottom' : ''"
							@click="chooseStatus(index)">
							<view class="u-flex">
								<view class="iconfont icon-up m-font-12 is-bottom" v-if="matchObj.mg.length > 1"
									:class="!item.choose ? 'up-no-bottom' : ''"></view>
								<view class="u-m-l-16 m-font-14" v-if="item.nm">{{item.nm}}</view>
							</view>
							<view class="iconfont icon-ssd" v-if="matchObj.mg.length > 1"></view>
						</view>
						<view class="bottom" v-show="item.choose">
							<view class="bottom-box">
								<view class="u-flex u-col-center u-row-between">
									<view class="matchTeam m-font-b box-item-48">
										<view class="country-img u-flex u-col-center" v-if="matchObj.ts[0]">
											<image style="width: 20px;max-height: 40px;" :src="matchObj.ts[0].lurl"
												mode="widthFix">
											</image>
											<text class="u-m-l-10">{{matchObj.ts[0].na}}</text>
										</view>
									</view>
									<view class="matchTeam m-font-b box-item-48 u-flex u-col-center">
										<view class="country-img u-flex u-col-center" v-if="matchObj.ts[1]">
											<image style="width: 20px;max-height: 40px;" :src="matchObj.ts[1].lurl"
												mode="widthFix">
											</image>
											<text class="u-m-l-10">{{matchObj.ts[1].na}}</text>
										</view>
									</view>
								</view>
								<view class="box-item-100 u-flex u-flex-wrap" :class="it>0?'u-m-t-10':'u-m-t-20'"
									v-for="(im,it) in item.mks" :key="`it1${it}`" v-if="im.op[0]">
									<view v-for="(iim,iit) in im.op" :key="`iit${iit}`"
										class="u-m-l-4 u-m-r-4"
										:class="im.op.length < 3 ? 'box-item-data-2' : 'box-item-data-3'"
										@click="payMarChange(item.mks[it].id,im.op[iit].ty,index)">
										<view class="left-text">{{iim.nm}}</view>
										<view class="right-text">{{iim.od}}</view>
									</view>
								</view>
								<!-- <view class="box-item-100 u-flex u-row-between flex--direction u-m-l-6">
										<view class="box-item-100 box-item-data u-flex u-row-between"
											v-for="(im,it) in item.mks" :key="`it2${it}`" v-if="im.op[1]"
											@click="payMarChange(item.mks[it].id,im.op[1].ty,index)">
											<view class="left-text">{{im.op[1].nm}}</view>
											<view class="right-text">{{im.op[1].od}}</view>
										</view>
									</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-popup v-model="payMarPopup" :mode="payMarMode" border-radius="16" :mask-custom-style="uPopMaskCustomStyle"
				@close="payMarClose">
				<view class="bs-popup bs-dist-popup no-border">
					<view class="bs-popup-hd">
						<view class="m-c-w">{{$t("投注单")}}</view>
						<view class="iconfont icon-close m-c-w" @click="payMarClose"></view>
					</view>
					<scroll-view scroll-y="true" style="max-height: 63vh;" class="m-bg-w">
						<view class="payOrder" v-for="(item,index) in betMatchMarketListArr.bms" :key="`order${index}`">
							<view class="u-flex u-row-between">
								<view>{{item.op.na}}</view>
								<view class="color-fb-skin">
									@ <text class="m-font-18 m-font-b">{{item.op.od}}</text>
								</view>
							</view>
							<view class="m-m-t-10">{{typeDate.lgNa}}</view>
							<view class="m-m-t-5" v-if="typeDate.nm">{{typeDate.nm}}</view>
							<view class="u-flex u-row-right rightBtn">
								<view class="hanClose" v-if="item.ss == 0">{{$t('盘口已关闭')}}</view>
								<view class="hanDelete" @click="payMarClose">{{$t('删除')}}</view>
							</view>
						</view>
						<!-- 金额输入框 -->
						<view class="u-flex u-row-between m-m-8 footer-input"
							v-for="(item,index) in betMatchMarketListArr.bms" :key="`input${index}`">
							<view class="input-item">
								<text class="input-value">{{ payPrice }}</text>
							</view>
							<!-- <view class="pro-btn">+预约</view> -->
							<view class="placeholder">{{'限额'+' '+item.smin+'-'+item.smax}}</view>
						</view>
						<view class="compter-box m-m-8 u-flex u-row-between u-col-center">
							<view class="compter-left u-flex u-col-center u-row-between u-flex-wrap">
								<view class="value" v-for="i in numKeypad" :key="i" @click="addKeypad(i)">{{i}}</view>
							</view>
							<view class="compter-right u-flex u-col-center u-row-between flex--direction">
								<view class="value" @click="addPayPrice(100)">100</view>
								<view class="value" @click="addPayPrice(200)">200</view>
								<view class="value" @click="addPayPrice(300)">300</view>
								<view class="value bg-value" @click="addPayPrice(500)">500</view>
							</view>
						</view>
					</scroll-view>
					<view class="bottom-btn m-bg-w">
						<view class="u-flex u-row-right u-col-center principal">
							{{$t('本金')}}: <text class="m-c-0">{{ payPrice?payPrice:'0' }}</text>
						</view>
						<view class="u-flex u-row-between u-col-center">
							<view class="add" @click="payMarClose">{{$t('清除')}}</view>
							<view class="getMoney-btn" @click="userSinglePass">
								{{'投注'}}
								<text>{{'可赢额:'+availablePrice}}</text>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
			<pcBg></pcBg>
			<u-top-tips ref="uTips" :isType="false" navbar-height="70" tipsBorderRadius="10" zIndex="10999">
			</u-top-tips>
		</view>
	</view>
</template>

<script>
	import uniNavHeader from '@/components/uni-head-bar/uni-head-bar.vue'
	import comIframe from '@/components/iframe/iframe.vue'
	import listEmpty from '@/components/list-empty/list-empty.vue'
	import pcBg from "@/components/pc-bg/bg.vue"
	import sportsLive from "@/components/sports-live/sports-live.vue"
	export default {
		components: {
			uniNavHeader,
			listEmpty,
			pcBg,
			comIframe,
			sportsLive
		},
		data() {
			return {
				background: {
					backgroundColor: '#3270E0',
				},
				enable: true,
				matchId: 0,
				activeM_id: 0,
				matchObj: {
					as: [],
					vs: {
						have: false,
						flvSD: ''
					},
					lg: {
						na: ''
					},
					mg: [{
						msk: []
					}],
					ts: [{
						na: '',
						lurl: ''
					}, {
						na: '',
						lurl: ''
					}]
				},
				typeChoose: 1,
				asSta: false,
				asFlvSD: false,
				payMarPopup: false,
				numKeypad: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'X'],
				betMatchMarketListArr: [],
				betMatchMarketListType: [],
				payPrice: '',
				typeDate: {
					lgNa: '',
					nm: '',
					od: 0
				},
				availablePrice: 0,
				payOdKey: 0,
				payMarChangeTime: null,
				getMatchDetailDataSet: null,
				payMarMode: 'center'
			}
		},
		onPageScroll(e){
			if(e.onPageScroll > 140){
				this.background.backgroundColor = '#3270E0';
			}
		},
		onLoad(options) {
			if (options.matchId) {
				this.matchId = options.matchId;
				this.getMatchDetailData(options.matchId);
			} else {
				this.common_back();
			}
		},
		onShow() {
			this.enable = true;
			this.onLoadChange();
		},
		onHide() {
			this.enable = false;
			this.payMarClose();
			clearTimeout(this.getMatchDetailDataSet);
		},
		onUnload() {
			this.enable = false;
			this.payMarClose();
			clearTimeout(this.getMatchDetailDataSet);
		},
		watch: {
			payPrice(newV, oldV) {
				this.availablePrice = (newV * this.typeDate.od).toFixed(2);
			}
		},
		computed: {},
		methods: {
			onLoadChange(){
				// #ifdef MY-SKIN-DEFAULT
				this.payMarMode = 'center';
				// #endif
				// #ifdef MY-SKIN-GREEN
				this.payMarMode = 'bottom';
				// #endif
			},
			payMarClose() {
				this.payPrice = '';
				this.payMarPopup = false;
				clearTimeout(this.payMarChangeTime);
			},
			asChange() {
				this.asSta = false;
			},
			asFlvSDChange() {
				this.asFlvSD = false;
			},
			addAS() {
				this.asSta = true;
			},
			addAsFlvSD() {
				this.asFlvSD = true;
				this.$refs.sportsLiveRef.dplayerChange(this.matchObj.vs.flvSD);
			},
			chooseStatus(key) {
				this.matchObj.mg[key].choose = !this.matchObj.mg[key].choose;
				this.$forceUpdate();
			},
			addKeypad(i) {
				if (this.payPrice.length > 0) {
					if (i == 'X') {
						this.payPrice = this.payPrice.slice(0, this.payPrice.length - 1);
					} else {
						if (!this.payPrice.includes('.')) {
							this.payPrice = this.payPrice + i + '';
						}
					}
				} else {
					if (i != 'X') {
						this.payPrice = this.payPrice + i + '';
					}
				}
			},
			addPayPrice(i) {
				this.payPrice = (Number(this.payPrice) + i) + '';
			},
			userSinglePass() {
				uni.showLoading({
					title: this.$t('loading')
				})
				this.singlePassType = [{
					betOptionList: [{
						marketId: this.marketId,
						odds: this.typeDate.od,
						oddsFormat: 1,
						optionType: this.marType,
					}],
					oddsChange: 1,
					unitStake: this.payPrice
				}]
				uni.request({
					url: `${this.$helper.get("sportsURL")}/v1/order/bet/singlePass`,
					method: 'POST',
					data: {
						languageType: "CMN",
						singleBetList: this.singlePassType,
						currencyId: this.$helper.get("sportsCurrencyId"),
					},
					header: {
						'Authorization': this.$helper.get("sportsToken"),
					},
					success: (res) => {
						if (res.data.success) {
							this.payMarClose();
							this.$refs.uTips.show({
								title: this.$t('下注成功')
							});
						} else {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
					fail: (err) => {
						if (err) {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
					complete: (e) => {
						uni.hideLoading();
					}
				});
			},
			payMarChange(marketId, ty, key) {
				this.marketId = marketId;
				this.payOdKey = key;
				this.typeDate.lgNa = this.matchObj.lg.na;
				this.typeDate.nm = this.matchObj.nm;
				this.marType = ty;
				this.betMatchMarketListType = [{
					matchId: this.matchId,
					marketId,
					type: this.marType,
				}]
				uni.request({
					url: `${this.$helper.get("sportsURL")}/v1/order/batchBetMatchMarketOfJumpLine`,
					method: 'POST',
					data: {
						betMatchMarketList: this.betMatchMarketListType,
						languageType: "CMN",
						currencyId: this.$helper.get("sportsCurrencyId"),
						isSelectSeries: false
					},
					header: {
						'Authorization': this.$helper.get("sportsToken"),
					},
					success: (res) => {
						if (res.data.success) {
							this.payMarPopup = true;
							this.betMatchMarketListArr = res.data.data;
							this.typeDate.od = res.data.data.bms[0].op.od;
							if (this.payMarPopup) {
								this.payMarChangeTime = setTimeout(() => {
									this.payMarChange(this.marketId, this.marType, this.payOdKey);
								}, 3000);
							} else {
								this.payMarClose();
							}
						} else {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
					fail: (err) => {
						if (err) {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
				});
			},
			allChooseStatus1() {
				this.typeChoose = 2;
				for (let j in this.matchObj.mg) {
					if (this.matchObj.mg[j].choose == false) {
						this.matchObj.mg[j].choose = true;
					} else {
						this.matchObj.mg[j].choose = true;
					}
				}
				this.$forceUpdate();
			},
			allChooseStatus2() {
				this.typeChoose = 1;
				for (let j in this.matchObj.mg) {
					if (this.matchObj.mg[j].choose == true) {
						this.matchObj.mg[j].choose = false;
					} else {
						this.matchObj.mg[j].choose = false;
					}
				}
				this.$forceUpdate();
			},
			payChange(my_id) {
				this.activeM_id = my_id;
				if (my_id == '0') {
					this.toTop();
				} else {
					document.querySelector(`#matchView${my_id}`).scrollIntoView({
						behavior: "smooth",
						block: "center",
						inline: "nearest"
					});
				}
			},
			getMatchDetailData(matchId) {
				uni.request({
					url: `${this.$helper.get("sportsURL")}/v1/match/getMatchDetail`,
					method: 'POST',
					data: {
						matchId,
						languageType: "CMN",
					},
					header: {
						'Authorization': this.$helper.get("sportsToken"),
					},
					success: (res) => {
						if (res.data.success) {
							this.matchObj = res.data.data;
							for (let a in this.matchObj.mg) {
								this.matchObj.mg[a].my_id = (a * 1) + 1;
								this.matchObj.mg[a].choose = true;
							}
							if (this.matchObj.mg.length > 0) {
								this.matchObj.mg.unshift({
									my_id: 0,
									nm: "全部"
								})
							}
							this.getMatchDetailDataSet = setTimeout(() => {
								this.getMatchDetailData(this.matchId);
							}, 3000);
						} else {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					},
					fail: (err) => {
						if (err) {
							this.$refs.uTips.show({
								title: this.$t(res.data.message)
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-image: url('@/static/images/sports/fb-martch-detail.png');
		background-repeat: no-repeat;
		background-size: 100% 300px;
		
	}
	
	.sports-panel {
		padding: 70px 0 0 0;
		padding: calc(70px + env(safe-area-inset-top)) 0 0 0;
	}

	.w-100-80 {
		width: 100%;
		margin: 0 40px 0 4px;
	}

	.matchDetailMain {
		position: relative;

		.icon-close {
			padding: 5px;
			border-radius: 50%;
			background: rgba(0, 0, 0, .7);
		}

		.conIframeClass {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 65;
		}

		.sportsLiveClass {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 65;
		}
	}

	.matchDetailTop {
		width: 100%;
		position: relative;
		padding: 40px 20px;
		background: var(--sports-details-bg);
	}

	.minH-280 {
		min-height: 250px !important;
	}

	.matchDetail {
		width: 100%;
		display: flex;
	}

	.matchDetail .left {
		width: 48%;
		font-size: 16px;
		color: #fff;
		font-weight: 600;

		image {
			width: 28px;
			height: 28px;
		}
	}

	.matchDetail .right {
		width: 48%;
		font-size: 16px;
		color: #fff;
		font-weight: 600;

		image {
			width: 28px;
			height: 28px;
		}
	}

	.matchDetail .vs {
		color: var(--sports-matchDetail-vs-color);
		padding: 10px;
		font-size: 18px;
		font-weight: 600;
	}

	.matchDetailTop .matchTime {
		color: #fff;
		margin-top: 16px;
		padding: 3px 10px;
		border-radius: 5px;
		display: inline-block;
		background: #E20B0B;
	}

	.matchDetailTop .marchStatus {
		color: #fff;
		margin-top: 10px;
	}

	.match-tab {
		position: absolute;
		bottom: -20px;
		padding-left: 10px;
		width: calc(100% - 41px);
	}

	.match-tab .match-select {
		color: #fff;
		padding: 10px 0;
		border-radius: 20px;
		text-align: center;
		background: var(--match-tab-match-select-bg);
	}

	.match-tab .match-select .tab-btn {
		position: relative;
	}

	.match-tab .match-select .tab-btn:not(:last-child)::before {
		content: "";
		position: absolute;
		right: 0;
		width: 1px;
		height: 15px;
		background: hsla(0, 0%, 100%, .6);
	}

	.is-bottom {
		transition: all .6s;
		transform: rotate(0) !important;
	}

	.up-no-bottom {
		transform: rotate(180deg) !important;
	}

	.matchDetailBottom {
		margin-top: 41px;
		position: relative;
		padding: 0 0 20px 0;
	}

	.matchDetailBottom .sticky-nav {
		padding: 10px 0;
		padding-left: 35px;
		border-radius: 16px 16px 0 0;
		overflow: scroll;
		background: #fff;
		margin-top: -7px;
	}

	.matchDetailBottom .sticky-nav .tab-item {
		padding: 4px 14px;
		white-space: nowrap;
		border-radius: var(--sports-matchDetailBottom-bd);
	}

	.matchDetailBottom .sticky-nav .tab-item-active {
		color: #3270E0;
		// background: var(--sports--details-tab-active);
	}

	.matchDetailBottom .sticky-nav .all-btn {
		position: absolute;
		left: 0;
		width: 35px;
		height: 27px;
		text-align: center;
		line-height: 27px;
		background: var(--sports-details-bg);
	}

	.matchDetailBottom-item {
		margin: 20px 12px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.3);
	}

	.matchDetailBottom-item .top {
		padding: 10px 15px;
		border-radius: 10px 10px 0 0;
		background: var(--sports-details-bg);
		border-bottom: 1px solid rgba(255, 255, 255, .1);
	}

	.matchDetailBottom-item .no-bottom {
		border-radius: 10px !important;
		border-bottom: none !important;
	}

	.matchDetailBottom-item .bottom {
		padding: 10px 15px;
		border-radius: 0 0 10px 10px;
		background: var(--sports-details-bg);
	}

	.matchDetailBottom-item .bottom {
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}

	.bottom-box .box-item-48 {
		width: 48%;
		margin-top: 3px;
		font-size: 14px;
	}

	.bottom-box .box-item-data {
		background: var(--sports-detail-item-data-bg);
		border-radius: var(--sports-detail-item-data-bd);
		padding: 8px 15px;
		display: flex;
		width: 32%;
		margin-top: 4px;
		justify-content: space-between;
	}


	.bottom-box .box-item-data-2 {
		background: var(--sports-detail-item-data-bg);
		border-radius: var(--sports-detail-item-data-bd);
		padding: 8px 15px;
		display: flex;
		width: 48.5%;
		margin-top: 4px;
		justify-content: space-between;
	}

	.bottom-box .box-item-data-3 {
		background: var(--sports-detail-item-data-bg);
		border-radius: var(--sports-detail-item-data-bd);
		padding: 8px 15px;
		display: flex;
		width: 32%;
		margin-top: 4px;
		justify-content: space-between;
	}

	.bottom-box .box-item-100 {
		width: 100%;
		margin-top: 5px;
		font-size: 13px;
	}

	.payOrder {
		margin: 8px;
		padding: 10px;
		border-radius: var(--sports-color-fb-skin-bd);
		position: relative;
		background-color: var(--sports-details-payOrder-bg);
	}

	.rightBtn {
		background: #ccc;
		border-radius: 27px 0 17px 0;
		position: absolute;
		bottom: 0;
		right: 0;
		height: 26px;
	}

	.hanClose {
		position: relative;
		border-radius: 27px 0 17px 0;
		font-size: 12px;
		z-index: 1;
		background: red;
		color: #fff;
		padding: 5px 10px;
	}

	.hanDelete {
		position: relative;
		z-index: 2;
		font-size: 13px;
		color: rgba(0, 0, 0, .8);
		padding: 5px 10px;
	}

	.footer-input {
		position: relative;
	}

	.m-m-8 {
		margin: 8px;
	}

	.m-p-10 {
		padding: 0 10px 10px 10px;
	}

	.m-m-t-10 {
		margin-top: 10px;
	}

	.m-m-t-20 {
		margin-top: 20px;
	}

	.m-m-t-5 {
		margin-top: 5px;
	}

	.m-rl-5 {
		margin: 0 5px;
	}

	.pro-btn {
		font-size: 16px;
		font-weight: 600;
		padding: 8px 12px;
		background: #1AEACB;
		border-radius: 10px;
		color: #fff;
	}

	.placeholder {
		position: absolute;
		right: 104px;
		color: #ccc;
		font-size: 13px;
		right: 10px;
	}

	.footer-input .input-item {
		position: relative;
		border: 1px solid var(--sports-color-fb-skin);
		height: 37px;
		padding-left: 8px;
		border-radius: var(--sports-color-fb-skin-bd);
		line-height: 37px;
		width: 100%;
		// width: calc(100% - 83px);
	}

	.input-value ::after {
		position: absolute;
		content: "";
		margin-left: 4px;
		width: 2px;
		height: 20px;
		border-radius: 1px;
		top: 8px;
		background: #44ad44;
		animation: input-data-value 1.5s linear infinite;
	}

	@keyframes input-data-value {
		0% {
			background: var(--sports-color-fb-skin);
		}

		50% {
			background: var(--sports-details-bg);
		}

		100% {
			background: var(--sports-color-fb-skin);
		}
	}

	.compter-box .value {
		height: 41px;
		margin-top: 10px;
		font-size: 18px;
		font-weight: 600;
		width: 62px;
		background: var(--psorts-compter-box-value-bg);
		border-radius: var(--psorts-compter-box-value-bd);
		color: var(--psorts-compter-box-value-color);
		text-align: center;
		line-height: 41px;
	}

	.compter-box .compter-left {
		padding: 10px;
		padding-top: 0;
		width: calc(100% - 93px);
		background: var(--sports-compter-left-bg);
		border-radius: var(--sports-color-fb-skin-bd);
	}

	.compter-box .compter-left .value {
		width: 32%;
		text-align: center;
	}

	.compter-box .compter-right {
		padding: 10px;
		padding-top: 0;
		border-radius: var(--sports-color-fb-skin-bd);
		background: var(--sports-compter-left-bg);
	}


	.bottom-btn {
		padding: 0 8px;
		padding-bottom: 10px;
		border-radius: 0 0 15px 15px;
	}

	.bottom-btn .principal {
		font-size: 13px;
		color: #000;
		padding: 5px 10px;
	
		.m-c-0 {
			color: #BA9870;
			font-size: 13px;
			font-weight: bold;
		}
	}

	.bottom-btn .add {
		background: var(--sports-details-btn-bg-1);
		border-radius: var(--sports-detail-item-data-bd);
		padding: 8px 0;
		color: var(--sports-details-btn-color-1);
		font-size: 14px;
		width: 104px;
		text-align: center;
	}

	.bottom-btn .getMoney-btn {
		background: var(--sports-details-btn-bg-2);
		padding: 8px 0;
		border-radius: var(--sports-detail-item-data-bd);
		font-size: 14px;
		color: #fff;
		text-align: center;
		width: calc(100% - 120px);
	}

	.color-fb-skin {
		color: var(--sports-color-fb-skin);
		
	}
</style>
